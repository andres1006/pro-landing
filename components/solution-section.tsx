"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/components/theme-provider";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function SolutionSection() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".solution-image",
      { opacity: 0, scale: 1.08 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.to(".solution-image", {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".solution-eyebrow",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
      .fromTo(
        ".solution-title",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ".solution-text",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".solution-step",
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [theme]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 overflow-hidden solution-section"
    >
      {/* Imagen de fondo full-bleed con overlay cinemático */}
      <div
        ref={imageRef}
        className="solution-image absolute inset-0 pointer-events-none"
      >
        <Image
          src="/assets/sportsman.webp"
          alt="Deportista en Manizales al atardecer"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 md:opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/75 to-background"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-background/40 to-background/90"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="solution-eyebrow inline-block text-xs md:text-sm font-display tracking-[0.3em] uppercase text-accent mb-5">
            La solución
          </span>
          <h2 className="solution-title text-4xl md:text-6xl font-bold mb-6 font-display uppercase tracking-tight text-foreground">
            <span className="text-logo-gradient">PRO Manizales</span>
            <br />
            tu deporte en un solo lugar
          </h2>
          <p className="solution-text text-lg md:text-xl text-muted-foreground leading-relaxed">
            La plataforma que centraliza tu vida deportiva: organiza partidos,
            encuentra jugadores cerca, reserva canchas y mide tu progreso como
            los profesionales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-16 md:mt-24 max-w-5xl mx-auto">
          {[
            {
              n: "01",
              title: "Organiza",
              desc: "Partidos, entrenos y eventos con un solo toque.",
              numberClass: "text-primary",
            },
            {
              n: "02",
              title: "Conecta",
              desc: "Encuentra jugadores con tu mismo nivel en Manizales.",
              numberClass: "text-accent",
            },
            {
              n: "03",
              title: "Progresa",
              desc: "Tus estadísticas, goles y logros en una sola app.",
              numberClass: "text-secondary",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="solution-step relative rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-7 flex flex-col items-start"
            >
              <span
                className={`font-display text-5xl md:text-6xl font-bold leading-none mb-4 ${step.numberClass}`}
              >
                {step.n}
              </span>
              <h3 className="text-xl font-bold mb-2 font-display uppercase tracking-wide text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
