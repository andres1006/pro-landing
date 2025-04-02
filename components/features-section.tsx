"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  LineChart,
  Users,
  CalendarCheck,
  MapPin,
  Trophy,
  BookOpen,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Datos de las características
const features = [
  {
    icon: LineChart,
    title: "Mide tu Rendimiento como un PRO",
    description:
      "Registra y analiza tus estadísticas clave en Fútbol, Ciclismo, Running (¡y pronto más!). Identifica mejoras y alcanza tus metas.",
    color: "from-manizales-tech/20 to-manizales-tech/5",
  },
  {
    icon: Users,
    title: "Conecta con Tu Comunidad Deportiva Local",
    description:
      "Encuentra jugadores, equipos y grupos con tus mismos intereses aquí en Manizales. ¡Amplía tu red deportiva!",
    color: "from-[#b794f4]/20 to-[#b794f4]/5",
  },
  {
    icon: CalendarCheck,
    title: "Organiza Partidos y Entrenos Fácilmente",
    description:
      "Coordina horarios, confirma asistencia y mantén a tu equipo o grupo informado sin complicaciones.",
    color: "from-manizales-tech/20 to-manizales-tech/5",
  },
  {
    icon: MapPin,
    title: "Descubre Dónde Jugar en Manizales",
    description:
      "Accede a un directorio de canchas y escenarios deportivos locales. Consulta disponibilidad, info y reseñas (¡pronto reservas!).",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Trophy,
    title: "Motívate con Retos y Gamificación",
    description:
      "Participa en desafíos, compite en tablas de clasificación locales y gana insignias por tus logros deportivos.",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    icon: BookOpen,
    title: "Recursos para Mejorar [Próximamente]",
    description:
      "Accede a planes de entrenamiento, consejos y conecta con expertos para llevar tu juego al siguiente nivel.",
    color: "from-accent/20 to-accent/5",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  // Configuración de las animaciones con ScrollTrigger
  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    });

    /*   tl.fromTo(
      ".features-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    ); */

    // Animamos las tarjetas de forma secuencial
    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "bottom 70%",
            scrub: 1,
          },
          delay: i * 0.1,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Efectos interactivos para las tarjetas
  const handleCardHover = (index: number) => {
    setActiveCard(index);
  };

  // Animación de desplazamiento para leer más tarjetas
  useEffect(() => {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Cuando una tarjeta entra en la vista, activamos su clase de animación
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setActiveCard(index);
          }
        });
      },
      { threshold: 0.7 }
    );

    document.querySelectorAll(".feature-card").forEach((card) => {
      scrollObserver.observe(card);
    });

    return () => {
      document.querySelectorAll(".feature-card").forEach((card) => {
        scrollObserver.unobserve(card);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-25 bg-gradient-to-b from-background to-background/90 relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute top-2/3 right-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-manizales-tech/10 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="features-title text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white ">
            Todo lo que Necesitas para Brillar en Manizales
          </h2>
          <p className="text-xl  max-w-3xl mx-auto text-black dark:text-white">
            PRO está diseñado para potenciar tu experiencia deportiva con
            herramientas que realmente necesitas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`feature-card bg-gradient-to-br ${feature.color} p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full`}
              data-index={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              onMouseEnter={() => handleCardHover(index)}
            >
              <div
                className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${
                  activeCard === index
                    ? "from-[#b794f4] via-[#b794f4] to-[#28cbe8]"
                    : feature.color
                } shadow-inner`}
              >
                <feature.icon
                  size={32}
                  className={`text-white ${
                    activeCard === index ? "animate-pulse-slow" : ""
                  }`}
                />
              </div>

              <h3 className="text-xl font-bold mb-3 font-heading text-black dark:text-white">
                {feature.title}
              </h3>

              <p className=" text-black dark:text-white">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
