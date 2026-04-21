"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactConfetti from "react-confetti";
import { supabase } from "@/lib/supabase";

// Validación del formulario con Zod
const formSchema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  name: z.string().optional(),
  sport: z.string().optional(),
  acceptTerms: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  // Efecto para obtener las dimensiones de la ventana
  useEffect(() => {
    function updateWindowSize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    // Inicializar dimensiones
    updateWindowSize();

    // Actualizar al cambiar el tamaño de ventana
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      sport: "",
      acceptTerms: false,
    },
  });

  const watchedName = watch("name");
  const watchedSport = watch("sport");
  const acceptTerms = watch("acceptTerms");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Insertar datos en Supabase
      const { error: supabaseError } = await supabase
        .from("user-register")
        .insert([
          {
            email: data.email,
            name: data.name || null,
            sport: watchedSport || null,
            accept_terms: acceptTerms || false,
          },
        ]);

      if (supabaseError) {
        throw supabaseError;
      }

      setIsSuccess(true);
      setShowConfetti(true);
      //reset();

      // Ocultamos el confetti después de unos segundos
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setError("Hubo un error al registrar. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Lista de deportes
  const sports = [
    "Fútbol",
    "Baloncesto",
    "Voleybol",
    "Tenis",
    "Ciclismo",
    "Natación",
    "Running",
    "Atletismo",
    "Ultimate",
    "Crossfit",
    "Gym",
    "Patinaje",
    "Triatlón",
  ];

  return (
    <section
      id="registro"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Confetti en caso de éxito */}
      {showConfetti && windowSize.width > 0 && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={["#22B2C9", "#388DC1", "#6B38B6", "#7A2BB5"]}
        />
      )}

      {/* Glows decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <span className="inline-block text-xs md:text-sm font-display tracking-[0.3em] uppercase text-accent mb-5">
              Únete a la lista
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-display uppercase tracking-tight">
              Sé parte de la{" "}
              <span className="text-logo-gradient">revolución deportiva</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Acceso anticipado, beneficios de fundador y ser el primero en saber
              cuándo lanzamos.
            </p>
          </motion.div>

          <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-primary/60 via-secondary/40 to-accent/60">
            <div className="bg-card/90 backdrop-blur-xl rounded-2xl p-8 md:p-10 relative overflow-hidden">

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-10 flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay: 0.2,
                    }}
                    className="mx-auto mb-6 text-[#64ffda]"
                  >
                    <CheckCircle2 size={80} strokeWidth={1.5} />
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground text-center font-display uppercase tracking-tight">
                    ¡Genial {watchedName ? `, ${watchedName}` : ""}!
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8 text-center">
                    Ya estás en la lista para PRO Manizales. Te avisaremos pronto.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => {
                        setIsSuccess(false);
                        reset();
                      }, 5000);
                    }}
                    className="z-10 bg-transparent cursor-pointer border-border hover:bg-muted text-foreground transition-all duration-300"
                  >
                    Compartir con tus amigos
                  </Button>
                  {copied && (
                    <p className="text-sm text-accent mt-3">
                      URL copiada al portapapeles
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 relative z-10"
                >
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Email - Campo obligatorio */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Tu correo electrónico{" "}
                      <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tucorreo@ejemplo.com"
                      {...register("email")}
                      className="bg-muted/60 border-border text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Nombre - Campo opcional */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Tu nombre
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      {...register("name")}
                      className="bg-muted/60 border-border text-foreground placeholder:text-muted-foreground focus:ring-accent focus:border-accent"
                    />
                  </div>

                  {/* Deporte Principal - Campo opcional */}
                  <div className="space-y-2">
                    <Label htmlFor="sport" className="text-foreground font-medium">
                      Tu deporte principal
                    </Label>
                    <Select
                      value={watchedSport}
                      onValueChange={(value) => setValue("sport", value)}
                    >
                      <SelectTrigger className="bg-muted/60 border-border text-foreground">
                        <SelectValue placeholder="Selecciona un deporte" />
                      </SelectTrigger>
                      <SelectContent>
                        {sports.map((sport) => (
                          <SelectItem key={sport} value={sport}>
                            {sport}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Checkbox Terms */}
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms ?? false}
                      onCheckedChange={(checked) =>
                        setValue("acceptTerms", checked === true, {
                          shouldValidate: true,
                        })
                      }
                      className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent mt-0.5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Acepto recibir comunicaciones sobre PRO.
                      </label>
                      {errors.acceptTerms && (
                        <p className="text-destructive text-sm">
                          {errors.acceptTerms.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Botón de envío */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-2"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-logo-gradient text-white text-lg py-6 rounded-xl transition-all duration-300 relative overflow-hidden group hover:brightness-110 font-display uppercase tracking-wide"
                    >
                      <span className="relative z-10">
                        {isSubmitting
                          ? "Registrando..."
                          : "Quiero mi acceso anticipado"}
                      </span>
                      {isSubmitting && (
                        <Loader2
                          size={20}
                          className="ml-2 animate-spin absolute right-4"
                        />
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-sm text-center text-muted-foreground pt-2">
                    Invita a tus amigos. Mientras más seamos, mejor será la comunidad PRO.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
