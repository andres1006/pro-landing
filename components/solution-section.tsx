"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/components/theme-provider";

// Registramos el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function SolutionSection() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
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
      ".solution-title",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        ".solution-text",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ".solution-image",
        { opacity: 0, x: -100 },
        { opacity: theme === "dark" ? 0.9 : 0.9, x: 0, duration: 1.2, ease: "power2.out" },
        "-=0.8"
      );

    // Animación de los números de las características
    gsap.fromTo(
      ".solution-feature",
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".solution-features-container",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Animación parallax para el fondo
    gsap.to(".solution-section .bg-fixed", {
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


  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-40 relative overflow-hidden solution-section"
    >
      {/* Imagen de fondo completa y fija */}
      <div className="absolute inset-0 z-0 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/assets/sportsman.webp')" }}>
        {/* Overlay oscuro para garantizar contraste */}
        <div className="absolute inset-0 bg-black/75 md:bg-black/80"></div>
      </div>

      {/* Elementos decorativos sutiles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="solution-title text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-heading text-white drop-shadow-lg">
            La Solución que Necesitas
          </h2>

          <p className="solution-text text-xl md:text-2xl mb-16 text-gray-200 drop-shadow">
            PRO Manizales es la plataforma que centraliza tu vida deportiva. Con
            nuestra app, podrás organizar partidos, encontrar jugadores,
            reservar escenarios y medir tu progreso como los profesionales.
          </p>

          {/* Características principales */}
          <div className="solution-features-container grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-white z-10">
            {/* Característica 1 */}
            <div className="solution-feature flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-[#64ffda]">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white z-10">
                Organiza Partidos
              </h3>
              <p className="text-gray-300 z-10">
                Crea y gestiona partidos con facilidad
              </p>
            </div>

            {/* Característica 2 */}
            <div className="solution-feature flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-[#b794f4]">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white z-10">
                Encuentra Jugadores
              </h3>
              <p className="text-gray-300 z-10">
                Conecta con otros deportistas
              </p>
            </div>

            {/* Característica 3 */}
            <div className="solution-feature flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-[#64ffda]">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                Mide tu Progreso
              </h3>
              <p className="text-gray-300">
                Sigue tu evolución deportiva
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
