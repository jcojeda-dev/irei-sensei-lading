import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://irei-sensei.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Irei Sensei | Personal Trainer & Entrenamiento Personalizado en Lima",
    template: "%s | Irei Sensei",
  },
  description:
    "Entrena tu cuerpo y forja tu disciplina con Irei Sensei. Entrenamiento personalizado orientado a resultados en San Miguel y Lima, Perú. Programas Hajimete, Tanren y Samurai.",
  keywords: [
    "personal trainer lima",
    "entrenador personal san miguel",
    "irei sensei",
    "entrenamiento personalizado lima",
    "preparador fisico lima",
    "recomposicion corporal lima",
    "rutina gimnasio personalizada lima",
    "evaluacion fisica lima",
    "isamu irei",
  ],
  authors: [{ name: "Isamu Irei", url: siteUrl }],
  creator: "Isamu Irei",
  publisher: "Irei Sensei Personal Training",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteUrl,
    siteName: "Irei Sensei Personal Training",
    title: "Irei Sensei | Personal Trainer & Entrenamiento Personalizado en Lima",
    description:
      "Entrena tu cuerpo. Forja tu disciplina. Entrenamiento personalizado orientado a resultados en San Miguel y Lima, Perú.",
    images: [
      {
        url: "/images/IREI_SENSEI_LOGO_PRINCIPAL.png",
        width: 1200,
        height: 630,
        alt: "Irei Sensei Personal Trainer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Irei Sensei | Personal Trainer en Lima",
    description:
      "Entrenamiento personalizado orientado a resultados en San Miguel, Lima - Perú.",
    images: ["/images/IREI_SENSEI_LOGO_PRINCIPAL.png"],
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
  other: {
    "geo.region": "PE-LIM",
    "geo.placename": "San Miguel, Lima, Perú",
    "geo.position": "-12.0775;-77.0864",
    ICBM: "-12.0775, -77.0864",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SportsClub", "HealthAndBeautyBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "Irei Sensei Personal Training",
      url: siteUrl,
      logo: `${siteUrl}/images/IREI_SENSEI_LOGO_PRINCIPAL.png`,
      image: `${siteUrl}/images/Irei%20sensei%20trainer%202.jpg`,
      telephone: "+51942181498",
      email: "isamuirei@gmail.com",
      priceRange: "$$",
      currenciesAccepted: "PEN",
      paymentAccepted: "Cash, Credit Card, Bank Transfer, Yape, Plin",
      address: {
        "@type": "PostalAddress",
        streetAddress: "San Miguel",
        addressLocality: "San Miguel",
        addressRegion: "Lima",
        addressCountry: "PE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -12.0775,
        longitude: -77.0864,
      },
      areaServed: [
        "San Miguel",
        "Magdalena del Mar",
        "Pueblo Libre",
        "Jesús María",
        "Miraflores",
        "San Isidro",
        "Lima",
      ],
      sameAs: ["https://www.instagram.com/irei.sensei/"],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#trainer`,
      name: "Isamu Irei",
      jobTitle: "Personal Trainer & Preparador Físico",
      worksFor: { "@id": `${siteUrl}/#organization` },
      image: `${siteUrl}/images/Irei%20sensei%20trainer%202.jpg`,
      description:
        "Entrenador personal orientado a resultados, recomposición corporal y disciplina física en Lima, Perú.",
    },
    {
      "@type": "OfferCatalog",
      name: "Programas de Entrenamiento Personalizado",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Programa Hajimete",
          description: "12 sesiones de entrenamiento personalizado con evaluación inicial y medición.",
          price: "1150",
          priceCurrency: "PEN",
          url: `${siteUrl}/#programas`,
        },
        {
          "@type": "Offer",
          name: "Programa Tanren (Más elegido)",
          description: "20 sesiones con planificación nutricional, medición corporal y seguimiento por WhatsApp.",
          price: "1700",
          priceCurrency: "PEN",
          url: `${siteUrl}/#programas`,
        },
        {
          "@type": "Offer",
          name: "Programa Samurai",
          description: "24 sesiones con acompañamiento prioritario, ajustes avanzados y maestría física.",
          price: "2100",
          priceCurrency: "PEN",
          url: `${siteUrl}/#programas`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Quién es Irei Sensei y dónde entrena?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Isamu Irei (Irei Sensei) es un entrenador personal en Lima, Perú, especializado en entrenamiento de fuerza, recomposición corporal y disciplina. Atiende principalmente en San Miguel y distritos aledaños de Lima.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuáles son los programas y tarifas de Irei Sensei?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ofrece 3 programas adaptados: Hajimete (12 sesiones por S/ 1,150), Tanren (20 sesiones por S/ 1,700) y Samurai (24 sesiones por S/ 2,100), todos con evaluación y seguimiento individualizado.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo se protegen los datos personales de los clientes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La plataforma cuenta con cifrado SSL/TLS de 256 bits, cabeceras de seguridad HTTP anti-hackers y comunicación directa de extremo a extremo por WhatsApp, cumpliendo con las normativas de Meta y la ley de protección de datos personales.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
