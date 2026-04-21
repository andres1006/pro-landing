"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const sports = [
  { name: "", image: "/assets/img-1.webp" },
  { name: "", image: "/assets/img-3.webp" },
];

export function LocalFocusSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
      ".local-eyebrow",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
      .fromTo(
        ".local-title",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ".local-text",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

    gsap.fromTo(
      ".sport-icon",
      { opacity: 0, y: 24, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sports-container",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".city-map",
      { opacity: 0, scale: 0.94 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".city-map",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Glows sutiles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Sección de texto */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <span className="local-eyebrow inline-block text-xs md:text-sm font-display tracking-[0.3em] uppercase text-accent mb-5">
              Hecho en Manizales
            </span>
            <h2 className="local-title text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground font-display uppercase tracking-tight">
              Para deportistas{" "}
              <span className="text-logo-gradient">apasionados</span>
            </h2>

            <p className="local-text text-lg text-muted-foreground leading-relaxed mb-8">
              <span className="font-bold text-foreground">PRO</span> nace del corazón
              deportivo de nuestra ciudad. Conectamos almas apasionadas, celebramos
              victorias personales y construimos la comunidad que el deporte
              aficionado de Manizales se merece.
            </p>

            {/* Grid de deportes con imágenes */}
            <div className="sports-container grid grid-cols-2 gap-4">
              {sports.map((sport, index) => (
                <motion.div
                  key={index}
                  className="sport-icon group relative overflow-hidden rounded-xl border border-border/60"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={sport.image}
                      alt={sport.name || "Deporte en Manizales"}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mapa */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="city-map relative aspect-square max-w-lg mx-auto">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/60 shadow-[0_20px_60px_-15px_rgba(107,56,182,0.35)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.288150474109!2d-75.49168783772532!3d5.056967311029084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e47657c8b8223b9%3A0x6b14d6b82cf52c2a!2sEstadio%20Palogrande!5e0!3m2!1ses!2sco!4v1743211158315!5m2!1ses!2sco"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.6) contrast(1.05) brightness(0.85)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de Manizales"
                ></iframe>
                {/* Overlay con tinte de la paleta */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/20 via-transparent to-accent/20 mix-blend-overlay"></div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/40 via-transparent to-transparent"></div>
              </div>

              {/* Badge "Manizales" flotante */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-md border border-border rounded-full px-5 py-2 text-sm font-display uppercase tracking-[0.25em] text-foreground shadow-lg">
                Manizales · Caldas
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
