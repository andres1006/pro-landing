"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Activity, Map } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/components/theme-provider";

gsap.registerPlugin(ScrollTrigger);

export function ChallengeSection() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Entrada del fondo: fade-in cuando la sección entra al viewport (no scrub).
    gsap.fromTo(
      ".challenge-image",
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

    // Parallax vertical suave atado al scroll de la sección.
    gsap.to(".challenge-image", {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    // Entrada del texto + iconos en cascada (no scrub).
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".challenge-eyebrow",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    )
      .fromTo(
        ".challenge-title",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ".challenge-text",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".challenge-icon",
        { opacity: 0, y: 20, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [theme]);

  useEffect(() => {
    if (!iconsRef.current) return;
    const icons = iconsRef.current.querySelectorAll(".challenge-icon");

    icons.forEach((icon) => {
      const onEnter = () =>
        gsap.to(icon, { y: -6, scale: 1.05, duration: 0.3, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(icon, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
      icon.addEventListener("mouseenter", onEnter);
      icon.addEventListener("mouseleave", onLeave);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 overflow-hidden challenge-section"
    >
      {/* Imagen de fondo full-bleed con overlay cinemático */}
      <div
        ref={imageRef}
        className="challenge-image absolute inset-0 pointer-events-none"
      >
        <Image
          src="/assets/male-soccer.webp"
          alt="Jugador de fútbol en Manizales"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 md:opacity-50"
          priority={false}
        />
        {/* Vignette oscuro para legibilidad y respirar con el backdrop global */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-background/90"></div>
      </div>

      {/* Glows morado/teal muy sutiles para marcar profundidad */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="challenge-eyebrow inline-block text-xs md:text-sm font-display tracking-[0.3em] uppercase text-accent mb-5">
            El problema
          </span>
          <h2 className="challenge-title text-4xl md:text-6xl font-bold mb-6 font-display uppercase tracking-tight text-foreground">
            El deporte en Manizales{" "}
            <span className="text-logo-gradient">merece más</span>
          </h2>
          <p className="challenge-text text-lg md:text-xl text-muted-foreground leading-relaxed">
            Organizar partidos por WhatsApp, encontrar canchas disponibles,
            medir tu progreso... hoy cada cosa vive en una app distinta.
            Tu pasión se pierde en la fricción.
          </p>
        </div>

        <div
          ref={iconsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-16 md:mt-24 max-w-5xl mx-auto"
        >
          {/* Card 1 */}
          <div className="challenge-icon group relative rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-7 flex flex-col items-start hover:border-primary/40 transition-colors">
            <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/15 text-primary">
              <Calendar size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 font-display uppercase tracking-wide text-foreground">
              Organización caótica
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Encontrar y programar eventos deportivos nunca debería ser tan complicado.
            </p>
          </div>

          {/* Card 2 */}
          <div className="challenge-icon group relative rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-7 flex flex-col items-start hover:border-accent/40 transition-colors">
            <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/15 text-accent">
              <Activity size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 font-display uppercase tracking-wide text-foreground">
              Progreso invisible
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Tus goles, tus tiempos, tus partidos: todo se pierde sin registro.
            </p>
          </div>

          {/* Card 3 */}
          <div className="challenge-icon group relative rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-7 flex flex-col items-start hover:border-secondary/40 transition-colors">
            <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/15 text-secondary">
              <Map size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 font-display uppercase tracking-wide text-foreground">
              Retos dispersos
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Sin comunidad local fuerte, es difícil mantener la motivación alta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
