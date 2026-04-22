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

    // Animación del título y descripción
    gsap.fromTo(
      ".features-title, .features-desc",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animamos las tarjetas de forma secuencial
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

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
            Todo lo que necesitas para vivir tu pasión como un profesional
          </h2>
          <p className="features-desc text-xl max-w-3xl mx-auto text-black dark:text-white">
            PRO está diseñado para potenciar tu experiencia deportiva con
            herramientas que realmente necesitas.
          </p>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card relative overflow-hidden bg-white/50 dark:bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-black/5 dark:border-white/10 transition-all duration-500 h-full transform cursor-default group`}
              data-index={index}
              onMouseEnter={() => handleCardHover(index)}
              style={{
                boxShadow: activeCard === index
                  ? "0 20px 40px -10px rgba(0,0,0,0.1), 0 0 20px -5px var(--card-glow, rgba(107,70,193,0.2))"
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                transform: activeCard === index ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
              }}
            >
              {/* Fondo degradado al hacer hover / estar activo */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-500 z-0 ${activeCard === index ? 'opacity-20' : 'group-hover:opacity-10'}`}
              ></div>

              <div className="relative z-10">
                <div
                  className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br transition-all duration-500 ${
                    activeCard === index
                      ? "from-[#b794f4] via-[#b794f4] to-[#28cbe8] shadow-[0_0_20px_rgba(183,148,244,0.5)] scale-110"
                      : "from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <feature.icon
                    size={32}
                    className={`transition-colors duration-500 ${
                      activeCard === index ? "text-white animate-pulse-slow" : "text-gray-600 dark:text-gray-400 group-hover:text-primary"
                    }`}
                  />
                </div>

                <h3 className="text-xl font-bold mb-3 font-heading text-black dark:text-white transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-black/80 dark:text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
