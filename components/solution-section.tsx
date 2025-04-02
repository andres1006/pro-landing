"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import Image from "next/image";

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
        start: "top 100%",
        end: "bottom 100%",
        scrub: 1,
      },
    });

    tl.fromTo(
      ".solution-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
      .fromTo(
        ".solution-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        ".solution-image",
        { opacity: 0, x: 90 },
        { opacity: theme === "dark" ? 0.9 : 0.9, x: 0, duration: 0.15 },
        "-=0.4"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [theme]);

  // Animación para la imagen de fondo
  useEffect(() => {
    if (!imageRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX / window.innerWidth - 0.5;
      const moveY = clientY / window.innerHeight - 0.5;

      gsap.to(".solution-image", {
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
      className="py-20 md:py-32 bg-gradient-to-b from-background to-background/50 relative overflow-hidden solution-section"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      {/* Imagen de fondo */}
      <div
        ref={imageRef}
        className="solution-image absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full hidden lg:block -z-1"
      >
        <div className="relative h-full">
          <Image
            src="/assets/sportsman-sitting-grass-holding-football-dusk.jpg"
            alt="Deportista en Manizales al atardecer"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="solution-title text-4xl md:text-5xl font-bold mb-8 font-heading text-black dark:text-white">
            La Solución que Necesitas
          </h2>

          <p className="solution-text text-xl md:text-2xl mb-16">
            PRO Manizales es la plataforma que centraliza tu vida deportiva. Con
            nuestra app, podrás organizar partidos, encontrar jugadores,
            reservar escenarios y medir tu progreso como los profesionales.
          </p>

          {/* Características principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-black dark:text-white z-10">
            {/* Característica 1 */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white z-10">
                Organiza Partidos
              </h3>
              <p className="text-muted-foreground text-black dark:text-white z-10">
                Crea y gestiona partidos con facilidad
              </p>
            </div>

            {/* Característica 2 */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-accent/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-accent">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white z-10">
                Encuentra Jugadores
              </h3>
              <p className="text-muted-foreground text-black dark:text-white z-10">
                Conecta con otros deportistas
              </p>
            </div>

            {/* Característica 3 */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-secondary/20 rounded-2xl backdrop-blur-md"></div>
                <div className="relative h-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-secondary">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                Mide tu Progreso
              </h3>
              <p className="text-muted-foreground text-black dark:text-white">
                Sigue tu evolución deportiva
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
