// jest.setup.js
if (typeof window !== 'undefined' && !window.PointerEvent) {
  class PointerEvent extends MouseEvent {
    constructor(type, params) {
      super(type, params);
      this.pointerId = params.pointerId === undefined ? 0 : params.pointerId;
      this.width = params.width === undefined ? 1 : params.width;
      this.height = params.height === undefined ? 1 : params.height;
      this.pressure = params.pressure === undefined ? 0 : params.pressure;
      this.tangentialPressure = params.tangentialPressure === undefined ? 0 : params.tangentialPressure;
      this.tiltX = params.tiltX === undefined ? 0 : params.tiltX;
      this.tiltY = params.tiltY === undefined ? 0 : params.tiltY;
      this.twist = params.twist === undefined ? 0 : params.twist;
      this.pointerType = params.pointerType === undefined ? 'mouse' : params.pointerType;
      this.isPrimary = params.isPrimary === undefined ? true : params.isPrimary;
    }
  }
  window.PointerEvent = PointerEvent;
}

if (typeof Element !== 'undefined' && !Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = function(pointerId) {
    // Simple mock, assuming no pointer capture by default
    return false; 
  };
  Element.prototype.setPointerCapture = function(pointerId) {};
  Element.prototype.releasePointerCapture = function(pointerId) {};
}

// Ensure requestAnimationFrame is available for tests involving animations or UI updates.
if (typeof window !== 'undefined' && !window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 0);
  };
  window.cancelAnimationFrame = (id) => {
    clearTimeout(id);
  };
}

// Global mock for navigator.clipboard
// Ensure navigator object exists
if (typeof global.navigator === 'undefined') {
  global.navigator = {};
}

// Define or redefine navigator.clipboard.writeText as a Jest mock function
// This ensures it's a Jest mock and can be cleared.
// Check if clipboard is already defined and if writeText is already a mock.
if (!global.navigator.clipboard || !jest.isMockFunction(global.navigator.clipboard.writeText)) {
  Object.defineProperty(global.navigator, 'clipboard', {
    value: {
      writeText: jest.fn().mockResolvedValue(undefined),
      // You can add other clipboard methods here if needed, e.g., readText: jest.fn()
    },
    configurable: true, 
    writable: true      
  });
}
