"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, ChevronDown, Link } from "lucide-react";
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
            accept_terms: !!acceptTerms || false,
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
    "Tenis",
    "Ciclismo",
    "Natación",
    "Baloncesto",
    "Otro",
  ];

  return (
    <section
      id="registro"
      className="py-24 md:py-32 bg-gradient-to-b from-background/95 to-background relative overflow-hidden"
    >
      {/* Confetti en caso de éxito */}
      {showConfetti && windowSize.width > 0 && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={["#64ffda", "#b794f4", "#b794f4"]}
        />
      )}

      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#64ffda]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#b794f4]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white font-heading">
              ¿ Listo para Ser Parte de la Revolución Deportiva en Manizales ?
            </h2>
            <p className="text-xl text-black dark:text-white">
              Únete AHORA a la lista de espera de PRO Manizales. Serás el
              primero en saber cuándo lanzamos, tendrás acceso anticipado y
              beneficios exclusivos por ser fundador. ¡No te quedes por fuera!
            </p>
          </motion.div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-white/10 shadow-xl relative overflow-hidden">
            {/* Efecto de brillo en el borde */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#64ffda]/30 via-[#b794f4]/30 to-[#64ffda]/30 opacity-20 animate-shimmer bg-[length:200%_100%]"></div>

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

                  <h3 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">
                    ¡Genial {watchedName ? `, ${watchedName}` : ""}!
                  </h3>
                  <p className="text-lg text-black dark:text-white mb-8 text-center">
                    Ya estás en la lista para PRO Manizales. Te avisaremos
                    pronto.{" "}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // accion para copiar url y compartir url
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => {
                        setIsSuccess(false);
                        reset();
                      }, 5000);
                    }}
                    className="z-10 bg-transparent cursor-pointer border-white/20 hover:bg-white/10 text-white transition-all duration-300"
                  >
                    Compartir con tus amigos
                  </Button>
                  {copied && (
                    <p className="text-sm text-green-500">
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
                    <Label
                      htmlFor="email"
                      className="text-black dark:text-white font-medium"
                    >
                      Tu Correo Electrónico{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tucorreo@ejemplo.com"
                      {...register("email")}
                      className="bg-white/10 border-gray-400 dark:border-white text-black dark:text-white placeholder:text-gray-400 focus:ring-[#64ffda] focus:border-[#64ffda]"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Nombre - Campo opcional */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-black dark:text-white font-medium"
                    >
                      Tu Nombre{" "}
                      <span className="text-gray-400 text-sm">(Opcional)</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      {...register("name")}
                      className="bg-white/10 border-gray-400 dark:border-white text-black dark:text-white placeholder:text-gray-400 focus:ring-[#64ffda] focus:border-[#64ffda]"
                    />
                  </div>

                  {/* Deporte Principal - Campo opcional */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="sport"
                      className="text-black dark:text-white font-medium"
                    >
                      Tu Deporte Principal{" "}
                      <span className="text-gray-400 text-sm">(Opcional)</span>
                    </Label>
                    <Select
                      value={watchedSport}
                      onValueChange={(value) => setValue("sport", value)}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-black dark:text-white placeholder:text-black dark:placeholder:text-white border-gray-400 dark:border-white">
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
                      {...register("acceptTerms")}
                      className="border-gray-400 dark:border-white data-[state=checked]:bg-[#64ffda] data-[state=checked]:border-[#64ffda]"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none text-black dark:text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Acepto recibir comunicaciones sobre PRO.
                      </label>
                      {errors.acceptTerms && (
                        <p className="text-red-400 text-sm">
                          {errors.acceptTerms.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Botón de envío */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-2"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#64ffda] via-[#b794f4] to-[#64ffda] hover:from-[#64ffda]/90 hover:via-[#b794f4]/90 hover:to-[#64ffda]/90 text-white text-lg py-6 rounded-xl transition-all duration-300 relative overflow-hidden group"
                    >
                      <span className="relative z-10">
                        {isSubmitting
                          ? "Registrando..."
                          : "¡Quiero mi Acceso Anticipado!"}
                      </span>

                      {/* Efecto de hover */}
                      <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#b794f4] via-[#64ffda] to-[#b794f4] [mask-image:radial-gradient(circle,transparent_50%,black_100%)] group-hover:[mask-image:radial-gradient(circle,black_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-all duration-700"></span>

                      {isSubmitting && (
                        <Loader2
                          size={20}
                          className="ml-2 animate-spin absolute right-4"
                        />
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-sm text-center text-gray-400 pt-4">
                    Invita a tus amigos y compañeros de equipo. ¡Mientras más
                    seamos, mejor será la comunidad PRO en Manizales!
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
