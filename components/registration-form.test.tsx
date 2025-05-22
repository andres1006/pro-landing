// At the VERY TOP of components/registration-form.test.tsx
const mockRadixSelectOnValueChange = jest.fn();
let mockRadixSelectCurrentValue: string | null = null; 

jest.mock('@radix-ui/react-select', () => {
  const React = jest.requireActual('react'); 

  return {
    __esModule: true, 
    Root: jest.fn(({ children, value, onValueChange }) => {
      React.useEffect(() => {
        if (onValueChange) {
          mockRadixSelectOnValueChange.mockImplementation((val: string) => {
            mockRadixSelectCurrentValue = val; 
            onValueChange(val); 
          });
        }
        mockRadixSelectCurrentValue = value;
      }, [onValueChange, value]);
      return <div data-testid="radix-select-root">{children}</div>;
    }),
    Trigger: jest.fn(React.forwardRef(({ children, 'aria-label': ariaLabel, ...props }: any, ref: any) => ( 
      <button {...props} ref={ref} data-testid="radix-select-trigger" aria-label={ariaLabel || 'Tu Deporte Principal'}>
        {children}
      </button>
    ))),
    Value: jest.fn((props) => (
      <span data-testid="radix-select-value">{mockRadixSelectCurrentValue || props.placeholder}</span>
    )),
    Content: jest.fn(({ children, ...props }) => <div data-testid="radix-select-content" {...props} style={{ display: 'block' }}>{children}</div>), // Keep content visible
    Item: jest.fn(React.forwardRef(({ children, value, ...props }: any, ref: any) => ( 
      <div
        {...props}
        ref={ref}
        data-testid={`radix-select-item-${value}`}
        role="option" 
        aria-label={children} 
        onClick={() => {
            if(mockRadixSelectOnValueChange) { 
                 mockRadixSelectOnValueChange(value);
            }
        }} 
      >
        {children}
      </div>
    ))),
  };
});

// Mock Supabase client
const mockInsertFunction = jest.fn();
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      insert: mockInsertFunction, 
    }),
  },
}));


import { z } from 'zod';
import { formSchema, RegistrationForm } from '@/components/registration-form'; 
import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock non-essential dependencies
jest.mock('react-confetti', () => () => <div data-testid="confetti" />);
jest.mock('lucide-react', () => ({
  Loader2: (props: any) => <div data-testid="loader-icon" {...props} />,
  CheckCircle2: (props: any) => <div data-testid="checkcircle-icon" {...props} />,
}));
jest.mock('framer-motion', () => ({
   ...jest.requireActual('framer-motion'),
   AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
   motion: {
       div: jest.fn(({ children, ...rest }) => <div {...rest}>{children}</div>),
       form: jest.fn(({ children, ...rest }) => <form {...rest}>{children}</form>),
       button: jest.fn(({ children, ...rest }) => <button {...rest}>{children}</button>),
       svg: jest.fn(({ children, ...rest }) => <svg {...rest}>{children}</svg>),
       path: jest.fn(({ children, ...rest }) => <path {...rest}>{children}</path>),
       h2: jest.fn(({ children, ...rest }) => <h2 {...rest}>{children}</h2>),
       p: jest.fn(({ children, ...rest }) => <p {...rest}>{children}</p>),
   }
}));

describe('RegistrationForm Schema', () => {
  it('should validate a correct email', () => {
    const result = formSchema.safeParse({ email: 'test@example.com' });
    expect(result.success).toBe(true);
  });
  it('should invalidate an incorrect email', () => {
    const result = formSchema.safeParse({ email: 'test' });
    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.email).toContain('El correo electrónico no es válido');
  });
  it('should allow name to be optional', () => {
    const result = formSchema.safeParse({ email: 'test@example.com' });
    expect(result.success).toBe(true);
    if (result.success) { expect(result.data.name).toBeUndefined(); }
  });
  it('should allow sport to be optional', () => {
    const result = formSchema.safeParse({ email: 'test@example.com' });
    expect(result.success).toBe(true);
    if (result.success) { expect(result.data.sport).toBeUndefined(); }
  });
  it('should allow acceptTerms to be optional', () => {
    const result = formSchema.safeParse({ email: 'test@example.com' });
    expect(result.success).toBe(true);
    if (result.success) { expect(result.data.acceptTerms).toBeUndefined(); }
  });
  it('should accept all fields if provided correctly', () => {
    const result = formSchema.safeParse({
      email: 'test@example.com', name: 'Test User', sport: 'Fútbol', acceptTerms: true,
    });
    expect(result.success).toBe(true);
  });
});

describe('RegistrationForm Component', () => {
   beforeEach(() => {
    mockInsertFunction.mockClear();
    mockInsertFunction.mockReset();
    
    mockRadixSelectOnValueChange.mockClear();
    mockRadixSelectCurrentValue = null;

    // Directly re-assign navigator.clipboard.writeText to a new Jest mock function
    if (navigator.clipboard) {
      navigator.clipboard.writeText = jest.fn().mockResolvedValue(undefined);
    }
   });

   afterEach(() => {
    jest.clearAllMocks(); 
   });

   it('should render initial form fields', () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText(/Tu Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tu Nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/Tu Deporte Principal/i)).toBeInTheDocument(); 
    expect(screen.getByTestId('radix-select-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('radix-select-value')).toHaveTextContent('Selecciona un deporte');
    expect(screen.getByLabelText(/Acepto recibir comunicaciones sobre PRO./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /¡Quiero mi Acceso Anticipado!/i })).toBeInTheDocument();
   });

   it('allows users to input data into form fields and select a sport', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/Tu Correo Electrónico/i), 'test@example.com');
    await user.type(screen.getByLabelText(/Tu Nombre/i), 'Test User');
    
    // Simulate sport selection by directly calling the captured onValueChange
    act(() => {
        mockRadixSelectOnValueChange('Fútbol');
    });
    
    await waitFor(() => expect(screen.getByTestId('radix-select-value')).toHaveTextContent('Fútbol'));

    const termsCheckbox = screen.getByLabelText(/Acepto recibir comunicaciones sobre PRO./i);
    await user.click(termsCheckbox); // This click is on a standard HTML checkbox, should be fine.
    expect(termsCheckbox).toBeChecked();

    mockInsertFunction.mockResolvedValueOnce({ error: null });
    await user.click(screen.getByRole('button', { name: /¡Quiero mi Acceso Anticipado!/i }));
    await waitFor(() => expect(mockInsertFunction).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ sport: 'Fútbol' })
    ])));
   });

   it('shows email validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);
    await user.type(screen.getByLabelText(/Tu Correo Electrónico/i), 'invalidemail');
    await user.click(screen.getByRole('button', { name: /¡Quiero mi Acceso Anticipado!/i }));
    expect(await screen.findByText('El correo electrónico no es válido')).toBeInTheDocument();
   });

   it('handles successful form submission', async () => {
    const user = userEvent.setup();
    mockInsertFunction.mockResolvedValueOnce({ error: null });
    render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/Tu Correo Electrónico/i), 'success@example.com');
    await user.type(screen.getByLabelText(/Tu Nombre/i), 'Success User');
    
    act(() => {
        mockRadixSelectOnValueChange('Baloncesto');
    });
    await waitFor(() => expect(screen.getByTestId('radix-select-value')).toHaveTextContent('Baloncesto'));

    await user.click(screen.getByLabelText(/Acepto recibir comunicaciones sobre PRO./i));
    await user.click(screen.getByRole('button', { name: /¡Quiero mi Acceso Anticipado!/i }));

    expect(screen.getByRole('button', { name: /Registrando.../i })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('confetti')).toBeInTheDocument());
    expect(await screen.findByText(/¡Genial, Success User!/i)).toBeInTheDocument();
    expect(mockInsertFunction).toHaveBeenCalledTimes(1);
    expect(mockInsertFunction).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({
        email: 'success@example.com', name: 'Success User', sport: 'Baloncesto', accept_terms: true
      })
    ]));
   });

   it('handles form submission failure from Supabase', async () => {
    const user = userEvent.setup();
    mockInsertFunction.mockResolvedValueOnce({ error: { message: 'Test Supabase error' } });
    render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/Tu Correo Electrónico/i), 'failure@example.com');
    await user.click(screen.getByLabelText(/Acepto recibir comunicaciones sobre PRO./i));
    
    act(() => {
        mockRadixSelectOnValueChange('Tenis');
    });
    await waitFor(() => expect(screen.getByTestId('radix-select-value')).toHaveTextContent('Tenis'));
    
    await user.click(screen.getByRole('button', { name: /¡Quiero mi Acceso Anticipado!/i }));

    expect(screen.getByRole('button', { name: /Registrando.../i })).toBeInTheDocument();
    expect(await screen.findByText(/Hubo un error al registrar. Por favor, intenta de nuevo./i)).toBeInTheDocument();
    expect(mockInsertFunction).toHaveBeenCalledTimes(1); 
   });

   it('handles share button functionality after successful submission', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    jest.useFakeTimers();
    mockInsertFunction.mockResolvedValueOnce({ error: null });
    render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/Tu Correo Electrónico/i), 'share@example.com');
    await user.type(screen.getByLabelText(/Tu Nombre/i), 'Share User');
    act(() => {
        mockRadixSelectOnValueChange('Ciclismo');
    });
    await waitFor(() => expect(screen.getByTestId('radix-select-value')).toHaveTextContent('Ciclismo'));
    await user.click(screen.getByLabelText(/Acepto recibir comunicaciones sobre PRO./i));
    await user.click(screen.getByRole('button', { name: /¡Quiero mi Acceso Anticipado!/i }));
    
    const shareButton = await screen.findByRole('button', { name: /Compartir con tus amigos/i });
    await user.click(shareButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href);
    expect(await screen.findByText(/URL copiada al portapapeles/i)).toBeInTheDocument();
    
    act(() => { jest.advanceTimersByTime(5000); });
    
    await waitFor(() => expect(screen.queryByText(/¡Genial, Share User!/i)).not.toBeInTheDocument());
    expect(screen.getByLabelText(/Tu Correo Electrónico/i)).toBeInTheDocument();

    jest.useRealTimers();
   });
});
