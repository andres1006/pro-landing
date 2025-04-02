"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Calendar, Activity, Map } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/components/theme-provider";

// Registramos el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function ChallengeSection() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Animación al hacer scroll
  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 100%",
        end: "bottom 100%",
        scrub: 1,
      },
    });

    tl.fromTo(
      ".challenge-title",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
      .fromTo(
        ".challenge-text",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        ".challenge-icon",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.2, duration: 0.5 },
        "-=0.4"
      )
      .fromTo(
        ".challenge-image",
        { opacity: 0, x: 50 },
        { opacity: theme === "dark" ? 0.9 : 0.9, x: 0, duration: 0.1 },
        "-=0.4"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [theme]);

  // Animación al mover el mouse sobre los iconos
  useEffect(() => {
    if (!iconsRef.current) return;

    const icons = iconsRef.current.querySelectorAll(".challenge-icon");

    icons.forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          y: -10,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, []);

  // Animación para la imagen de fondo
  useEffect(() => {
    if (!imageRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX / window.innerWidth - 0.5;
      const moveY = clientY / window.innerHeight - 0.5;

      gsap.to(".challenge-image", {
        x: moveX * 20,
        y: moveY * 20,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-background to-background/50 relative overflow-hidden challenge-section"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      {/* Imagen de fondo */}
      <div
        ref={imageRef}
        className="challenge-image absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full hidden lg:block"
      >
        <div className="relative h-full">
          <Image
            src="/assets/male-soccer-player-with-ball-grass-field.jpg"
            alt="Jugador de fútbol en Manizales"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background"></div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="challenge-title text-4xl md:text-5xl font-bold mb-8 font-heading">
            Tu Pasión Merece Más, ¿Verdad?
          </h2>

          <p className="challenge-text text-xl md:text-2xl mb-16">
            En Manizales amamos el deporte, pero organizar partidos, encontrar
            gente para jugar, saber dónde entrenar y medir tu progreso como los
            profesionales puede ser un reto. Te falta la herramienta que
            centralice tu vida deportiva.
          </p>

          {/* Iconos animados */}
          <div
            ref={iconsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            {/* Icono 1: Calendario caótico */}
            <div className="challenge-icon flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <Calendar size={64} className="text-primary animate-float" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Organización Caótica</h3>
              <p className="text-muted-foreground">
                Coordinar horarios y confirmar asistencia se vuelve una
                pesadilla
              </p>
            </div>

            {/* Icono 2: Gráfico estancado */}
            <div className="challenge-icon flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-accent/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <Activity
                    size={64}
                    className="text-accent animate-float animation-delay-1000"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Progreso Invisible</h3>
              <p className="text-muted-foreground">
                Sin forma de medir tu evolución, es difícil mejorar tus
                habilidades
              </p>
            </div>

            {/* Icono 3: Mapa de Manizales con signos de interrogación */}
            <div className="challenge-icon flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-secondary/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <Map
                    size={64}
                    className="text-secondary animate-float animation-delay-2000"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Dónde Jugar</h3>
              <p className="text-muted-foreground">
                Encontrar los mejores escenarios deportivos en Manizales
                requiere tiempo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
