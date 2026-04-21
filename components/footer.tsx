"use client";

import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full pt-16 pb-10 overflow-hidden">
      {/* Glow sutil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-4">
          <Image
            src="/assets/LOGO.png"
            alt="PRO Manizales"
            width={80}
            height={80}
          />
          <p className="font-display uppercase tracking-[0.25em] text-sm text-foreground">
            PRO Manizales
          </p>
          <p className="text-sm text-muted-foreground max-w-md">
            Diseñado con pasión para la comunidad deportiva de Manizales.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 text-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} PRO Manizales. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
