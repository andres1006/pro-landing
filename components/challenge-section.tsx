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
      );

    // Animación parallax para el fondo
    gsap.to(".challenge-section .bg-fixed", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      backgroundPosition: "50% 100%",
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


  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-40 relative overflow-hidden challenge-section"
    >
      {/* Imagen de fondo completa y fija */}
      <div className="absolute inset-0 z-0 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/assets/male-soccer.webp')" }}>
        {/* Overlay oscuro para garantizar contraste */}
        <div className="absolute inset-0 bg-black/75 md:bg-black/80"></div>
      </div>

      {/* Elementos decorativos sutiles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="challenge-title text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-heading text-white drop-shadow-lg">
            Tu pasión merece más ¿verdad?
          </h2>

          <p className="challenge-text text-xl md:text-2xl mb-16 text-gray-200 drop-shadow">
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
                <div className="absolute inset-0 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <Calendar size={64} className="text-[#64ffda] animate-float" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                ¡Más juego, menos estrés!{" "}
              </h3>
              <p className="text-gray-300">
                Encontrar y programar eventos deportivos, nunca fue tan fácil.
              </p>
            </div>

            {/* Icono 2: Gráfico estancado */}
            <div className="challenge-icon flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <Activity
                    size={64}
                    className="text-[#b794f4] animate-float animation-delay-1000"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Progreso Visible</h3>
              <p className="text-gray-300">
                Transformamos tus logros deportivos en inspiración para seguir
                creciendo.
              </p>
            </div>

            {/* Icono 3: Mapa de Manizales con signos de interrogación */}
            <div className="challenge-icon flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <Map
                    size={64}
                    className="text-[#64ffda] animate-float animation-delay-2000"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Retos deportivos</h3>
              <p className="text-gray-300">
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
