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
  LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "primary" | "accent" | "secondary";
};

const features: Feature[] = [
  {
    icon: LineChart,
    title: "Mide tu rendimiento como un PRO",
    description:
      "Registra y analiza tus estadísticas clave de fútbol. Identifica mejoras y alcanza tus metas.",
    accent: "primary",
  },
  {
    icon: Users,
    title: "Conecta con tu comunidad",
    description:
      "Encuentra jugadores, equipos y grupos con tus mismos intereses aquí en Manizales.",
    accent: "accent",
  },
  {
    icon: CalendarCheck,
    title: "Organiza partidos fácil",
    description:
      "Coordina horarios, confirma asistencia y mantén a tu equipo informado sin complicaciones.",
    accent: "secondary",
  },
  {
    icon: MapPin,
    title: "Descubre dónde jugar",
    description:
      "Accede a un directorio de canchas y escenarios locales. Info, reseñas y pronto reservas.",
    accent: "primary",
  },
  {
    icon: Trophy,
    title: "Motívate con retos",
    description:
      "Participa en desafíos, compite en tablas de clasificación locales y gana insignias.",
    accent: "accent",
  },
  {
    icon: BookOpen,
    title: "Recursos para mejorar",
    description:
      "Planes de entrenamiento, consejos y expertos para llevar tu juego al siguiente nivel.",
    accent: "secondary",
  },
];

const accentStyles = {
  primary: {
    ring: "hover:border-primary/60",
    glow: "bg-primary/15",
    icon: "text-primary",
  },
  accent: {
    ring: "hover:border-accent/60",
    glow: "bg-accent/15",
    icon: "text-accent",
  },
  secondary: {
    ring: "hover:border-secondary/60",
    glow: "bg-secondary/15",
    icon: "text-secondary",
  },
} as const;

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".features-eyebrow",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
      .fromTo(
        ".features-title",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ".features-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: (i % 3) * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Glows sutiles para profundidad */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/5 w-72 h-72 bg-accent/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <span className="features-eyebrow inline-block text-xs md:text-sm font-display tracking-[0.3em] uppercase text-accent mb-5">
            Qué incluye PRO
          </span>
          <h2 className="features-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display uppercase tracking-tight text-foreground">
            Todo tu juego,{" "}
            <span className="text-logo-gradient">en un solo lugar</span>
          </h2>
          <p className="features-subtitle text-lg md:text-xl text-muted-foreground leading-relaxed">
            Las herramientas que transforman tu pasión en una experiencia de nivel profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const a = accentStyles[feature.accent];
            return (
              <motion.div
                key={index}
                className={`feature-card group relative rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-7 transition-all duration-300 ${a.ring}`}
                data-index={index}
                whileHover={{ y: -4 }}
                onMouseEnter={() => setActiveCard(index)}
              >
                <div
                  className={`mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl ${a.glow}`}
                >
                  <feature.icon size={28} className={a.icon} />
                </div>

                <h3 className="text-xl font-bold mb-3 font-display uppercase tracking-wide text-foreground">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
