"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Globe, Instagram, Facebook, Twitter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Footer() {
  const [language, setLanguage] = useState("es");

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // Aquí se implementaría la lógica para cambiar el idioma
    console.log("Idioma cambiado a:", value);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-background border-t border-white/10 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-manizales-green/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-manizales-coffee/5 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo y texto */}
          <div className="md:col-span-4 flex flex-col">
            <div className="mb-4">
              <Image
                src="/assets/LOGO.png"
                alt="PRO Manizales"
                width={100}
                height={100}
              />
            </div>

            <p className=" mb-6 text-black dark:text-white">
              © {currentYear} PRO Manizales. Pasión deportiva local.
            </p>

            {/* Selector de idioma */}
            {/*          <div className="flex items-center space-x-2 mt-auto text-black dark:text-white">
              <Globe size={18} className="text-gray-400 dark:text-white" />
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-32 bg-transparent border-gray-400 dark:border-white text-black dark:text-white focus:ring-0">
                  <SelectValue placeholder="Idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>

          {/* Enlaces */}
          {/*      <div className="md:col-span-2">
            <h4 className="text-black dark:text-white font-bold mb-4">PRO</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white hover:text-manizales-tech transition-colors"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white hover:text-manizales-tech transition-colors"
                >
                  Deportes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white hover:text-manizales-tech transition-colors"
                >
                  Comunidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white hover:text-manizales-tech transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div> */}

          {/*          <div className="md:col-span-2">
            <h4 className="text-black dark:text-white font-bold mb-4">Ayuda</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white hover:text-manizales-tech transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white hover:text-manizales-tech transition-colors"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white hover:text-manizales-tech transition-colors"
                >
                  Soporte
                </a>
              </li>
            </ul>
          </div> */}

          {/*           <div className="md:col-span-2">
            <h4 className="text-black dark:text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white hover:text-manizales-tech transition-colors"
                >
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white hover:text-manizales-tech transition-colors"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white hover:text-manizales-tech transition-colors"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div> */}

          {/* Redes sociales */}
          {/*           <div className="md:col-span-2">
            <h4 className="text-black dark:text-white font-bold mb-4">
              Conecta
            </h4>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                className="text-gray-700 dark:text-white hover:text-manizales-coffee"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                className="text-gray-700 dark:text-white hover:text-manizales-tech"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                className="text-gray-700 dark:text-white hover:text-manizales-green"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                className="text-gray-700 dark:text-white hover:text-gray-200"
                aria-label="Github"
              >
                <Github size={20} />
              </motion.a>
            </div>
          </div> */}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>Diseñado con ♥ para la comunidad deportiva de Manizales</p>
        </div>
      </div>
    </footer>
  );
}
