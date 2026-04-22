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
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".challenge-title",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        ".challenge-text",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ".challenge-icon",
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(
        ".challenge-image",
        { opacity: 0, x: 100 },
        { opacity: theme === "dark" ? 0.9 : 0.9, x: 0, duration: 1.2, ease: "power2.out" },
        "-=0.8"
      );

    // Animación sutil extra para la imagen ligada al scroll
    gsap.to(".challenge-image img", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      scale: 1.1,
      y: 20,
      ease: "none"
    });

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
          y: -5,
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
        <div className="relative h-full rounded-l-[4rem] overflow-hidden shadow-2xl">
          <Image
            src="/assets/male-soccer.webp"
            alt="Jugador de fútbol en Manizales"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-background/60 to-background z-10"></div>
          {/* Overlay oscuro para mejorar contraste */}
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30 z-0"></div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="challenge-title text-4xl md:text-5xl font-bold mb-8 font-heading">
            Tu pasión merece más ¿verdad?
          </h2>

          <p className="challenge-text text-xl md:text-2xl mb-16">
            Si te apasiona el deporte, sabrás que organizar tus actividades,
            encontrar personas con quien practicar o competir, ubicar lugares
            para entrenar y seguir tu progreso como los atletas de alto nivel
            puede ser complicado.
            <br></br>
            Te falta la plataforma que reúna todo lo que necesitas para tu vida
            deportiva.
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
              <h3 className="text-xl font-bold mb-2">
                ¡Más juego, menos estrés!{" "}
              </h3>
              <p className="text-muted-foreground">
                Encontrar y programar eventos deportivos, nunca fue tan fácil.
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
              <h3 className="text-xl font-bold mb-2">Progreso Visible</h3>
              <p className="text-muted-foreground">
                Transformamos tus logros deportivos en inspiración para seguir
                creciendo.
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
              <h3 className="text-xl font-bold mb-2">Retos deportivos</h3>
              <p className="text-muted-foreground">
                ¡Vive la emoción de superar desafíos junto a tus amigos y/o
                equipo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
