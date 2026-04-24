"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Activity, Map } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

// Registramos el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function ChallengeSection() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

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


  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-background relative overflow-hidden challenge-section"
    >
      {/* Elementos decorativos (Partículas/Blobs) más grandes y dinámicos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/10 dark:bg-primary/20 rounded-full blur-[80px] animate-float"></div>
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-accent/10 dark:bg-accent/20 rounded-full blur-[100px] animate-float animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-[80px] animate-float animation-delay-4000"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="challenge-title text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-heading text-black dark:text-white drop-shadow-sm">
            Tu pasión merece más ¿verdad?
          </h2>

          <p className="challenge-text text-xl md:text-2xl mb-16 text-gray-800 dark:text-gray-200">
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
                <div className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <Calendar size={64} className="text-primary animate-float" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                ¡Más juego, menos estrés!{" "}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Encontrar y programar eventos deportivos, nunca fue tan fácil.
              </p>
            </div>

            {/* Icono 2: Gráfico estancado */}
            <div className="challenge-icon flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <Activity
                    size={64}
                    className="text-accent animate-float animation-delay-1000"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Progreso Visible</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Transformamos tus logros deportivos en inspiración para seguir
                creciendo.
              </p>
            </div>

            {/* Icono 3: Mapa de Manizales con signos de interrogación */}
            <div className="challenge-icon flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-secondary/10 border border-secondary/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <Map
                    size={64}
                    className="text-secondary animate-float animation-delay-2000"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Retos deportivos</h3>
              <p className="text-gray-600 dark:text-gray-300">
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
