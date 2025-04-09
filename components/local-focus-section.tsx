"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Deportes principales de Manizales
const sports = [
  { name: "", image: "/assets/img-1.png" },
  { name: "", image: "/assets/img-3.jpeg" },
];

export function LocalFocusSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Configuración de animaciones ScrollTrigger
  useEffect(() => {
    if (!sectionRef.current) return;

    /*     const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "center center",
        scrub: 1,
      },
    });
 */
    /*    tl.fromTo(
      ".local-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
      .fromTo(
        ".local-text",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.6"
      )
      .fromTo(
        ".city-map",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8 },
        "-=0.4"
      ); */

    // Animación para los iconos de deportes
    /*     gsap.fromTo(
      ".sport-icon",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".sports-container",
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      }
    ); */

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Efecto de hover para el mapa
  useEffect(() => {
    if (!mapRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const map = mapRef.current;
      if (!map) return;

      const { left, top, width, height } = map.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      // Efecto parallax para los elementos del mapa
      /*       gsap.to(".map-element", {
        x: x * 20,
        y: y * 20,
        duration: 1,
        ease: "power2.out",
      });

      // Rotación sutil del mapa
      gsap.to(".city-map", {
        rotationY: x * 5,
        rotationX: -y * 5,
        duration: 1,
        ease: "power2.out",
      }); */
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-background/90 to-background/100 relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-[#64ffda]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#b794f4]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-16">
          {/* Sección de texto */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="local-title text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-black dark:text-white font-heading">
              Pensado para deportistas apasionados
            </h2>

            <p className="local-text text-lg sm:text-xl text-black dark:text-white leading-relaxed mb-6 sm:mb-8">
              <span className="font-bold">PRO</span> nace del corazón y la
              pasión por el deporte en nuestra ciudad. Creemos que cada gota de
              sudor, cada minuto de entrenamiento y cada sueño deportivo merece
              brillar. Estamos aquí para conectar almas apasionadas, celebrar
              victorias personales y construir una comunidad donde el espíritu
              deportivo trascienda más allá de las canchas. ¡Porque tu pasión
              deportiva merece una plataforma a su altura!
            </p>

            {/* Grid de deportes con imágenes */}
            <div className="sports-container grid grid-cols-2 sm:grid-cols-2 gap-4 mt-8 sm:mt-10">
              {sports.map((sport, index) => (
                <motion.div
                  key={index}
                  className="sport-icon group relative overflow-hidden rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={sport.image}
                      alt={sport.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-white font-medium text-sm sm:text-base">
                        {sport.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mapa estilizado de Manizales */}
          <div ref={mapRef} className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="city-map relative aspect-square max-w-sm sm:max-w-lg mx-auto perspective-1000 transform-gpu">
              {/* Fondo del mapa */}
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-white/10">
                <div className="absolute inset-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.288150474109!2d-75.49168783772532!3d5.056967311029084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e47657c8b8223b9%3A0x6b14d6b82cf52c2a!2sEstadio%20Palogrande!5e0!3m2!1ses!2sco!4v1743211158315!5m2!1ses!2sco"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-background via-[#64ffda]/10 to-[#b794f4]/10"></div>

                {/* Contenido del mapa */}
                <div className="absolute inset-0 p-4 sm:p-8 flex items-center justify-center">
                  {/* Silueta de Manizales */}
                  <div className="w-3/4 h-3/4 relative">
                    <div className="absolute inset-0 border-2 sm:border-4 border-white/20 rounded-full"></div>

                    {/* Puntos de interés en el mapa */}
                    <div className="map-element absolute top-1/3 left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-[#64ffda] rounded-full shadow-[0_0_10px_rgba(100,255,218,0.8)]"></div>
                    <div className="map-element absolute top-2/3 right-1/3 w-3 h-3 sm:w-4 sm:h-4 bg-[#b794f4] rounded-full shadow-[0_0_10px_rgba(183,148,244,0.8)]"></div>
                    <div className="map-element absolute bottom-1/4 left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-[#64ffda] rounded-full shadow-[0_0_10px_rgba(100,255,218,0.8)]"></div>

                    {/* Etiquetas */}
                    <div className="map-element absolute top-1/3 left-1/2 -translate-y-6 sm:-translate-y-8 text-[10px] sm:text-xs bg-white/50 dark:bg-black/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                      Estadio
                    </div>
                    <div className="map-element absolute top-2/3 right-1/3 translate-x-4 sm:translate-x-6 text-[10px] sm:text-xs bg-white/50 dark:bg-black/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                      Baloncesto
                    </div>
                  </div>
                </div>
              </div>

              {/* Efectos de overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-20 rounded-xl sm:rounded-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
