"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Asegurarse de que el video se carga y reproduce correctamente
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error reproduciendo el video:", error);
        });
      }
    }
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(".hero-overlay", {
      opacity: theme === "dark" ? 0.7 : 0.5,
      duration: 2,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [theme]);

  // Simulamos un evento mousemove para hacer que los elementos flotantes se muevan
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX / window.innerWidth - 0.5;
      const moveY = clientY / window.innerHeight - 0.5;

      gsap.to(".floating-element", {
        x: moveX * 30,
        y: moveY * 30,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden pt-14 hero-section"
    >
      {/* Video de fondo */}
      <div className="absolute inset-0 z-0 pt-14">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src="/assets/hero-3.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        {/* Overlay para mejorar la visibilidad del contenido */}
        <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/55 z-10"></div>
      </div>

      {/* Elementos flotantes (efectos visuales) */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none pt-14">
        <div className="floating-element absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-primary/30 blur-xl animate-float"></div>
        <div className="floating-element absolute bottom-1/3 right-1/3 w-32 h-32 rounded-full bg-accent/30 blur-xl animate-float animation-delay-1000"></div>
        <div className="floating-element absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-secondary/30 blur-xl animate-float animation-delay-2000"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <Image
            src="/assets/LOGO.png"
            alt="PRO Manizales"
            width={350}
            height={350}
          />
        </motion.div>

        {/* Título y subtítulo */}
        <div ref={titleRef} className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold mb-4 font-heading text-white text-shadow-lg"
          >
            Vive el Deporte Aficionado como un profesional
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-xl text-gray-100 mt-6 max-w-3xl mx-auto text-shadow"
          >
            La app para conectar, organizar, medir tu rendimiento y elevar tu
            pasión por el deporte aquí, en nuestra ciudad.
          </motion.p>
        </div>

        {/* Botón CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center"
        >
          <a href="#registro">
            <Button
              size="lg"
              className="flex items-center justify-center btn-register bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-full px-8 py-6 text-lg font-bold transition-all duration-500 hover:scale-110 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-2 animate-pulse">🚀</span>
                <span className="bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white transition-all duration-500">
                  ¡Regístrate Gratis!
                </span>
              </span>
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-secondary via-accent to-primary [mask-image:radial-gradient(circle,transparent_60%,black_100%)] group-hover:[mask-image:radial-gradient(circle,black_60%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-all duration-700"></span>
              <span className="absolute top-0 left-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent transform translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
            </Button>
          </a>
          <p className="text-sm text-gray-300 mt-3">
            Acceso anticipado exclusivo para la comunidad deportiva de
            Manizales.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
