import { Metadata } from "next";

export const metadata: Metadata = {
    title: "PRO Manizales | Plataforma Deportiva para Atletas",
    description: "PRO Manizales es la plataforma deportiva que conecta atletas, organiza eventos y potencia el deporte en Manizales. Únete a la comunidad deportiva más grande de la ciudad.",
    keywords: "deportes manizales, atletas manizales, eventos deportivos, fútbol manizales, baloncesto manizales, deportes caldas, comunidad deportiva",
    authors: [{ name: "PRO Manizales" }],
    creator: "PRO Manizales",
    publisher: "PRO Manizales",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "es_CO",
        url: "https://promanizales.com",
        siteName: "PRO Manizales",
        title: "PRO Manizales | Plataforma Deportiva para Atletas",
        description: "PRO Manizales es la plataforma deportiva que conecta atletas, organiza eventos y potencia el deporte en Manizales. Únete a la comunidad deportiva más grande de la ciudad.",
        images: [
            {
                url: "/assets/sportsman-sitting-grass-holding-football-dusk.jpg",
                width: 1200,
                height: 630,
                alt: "Deportista en Manizales al atardecer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "PRO Manizales | Plataforma Deportiva para Atletas",
        description: "PRO Manizales es la plataforma deportiva que conecta atletas, organiza eventos y potencia el deporte en Manizales.",
        images: ["/assets/sportsman-sitting-grass-holding-football-dusk.jpg"],
        creator: "@promanizales",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "tu-codigo-de-verificacion-google",
    },
    alternates: {
        canonical: "https://promanizales.com",
    },
}; 