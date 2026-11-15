export type Program = {
  id: string;
  name: string;
  kanji: string;
  subtitle: string;
  quote: string;
  price: string;
  priceNote?: string;
  sessions: string;
  validity: string;
  detail?: string;
  benefits: string[];
  cta: string;
  featured?: boolean;
};

export const programs: Program[] = [
  {
    id: "hajimete",
    name: "HAJIMETE",
    kanji: "始めて",
    subtitle: "EL COMIENZO",
    quote: "Todo gran camino comienza con un primer paso.",
    price: "S/ 850",
    priceNote: "Propuesta comercial sujeta a validación.",
    sessions: "8 sesiones",
    validity: "Vigencia: 30 días",
    benefits: [
      "Entrenamiento personalizado",
      "Seguimiento básico",
      "Ajustes en el entrenamiento",
    ],
    cta: "ELIGE ESTE CAMINO",
  },
  {
    id: "tanren",
    name: "TANREN",
    kanji: "鍛錬",
    subtitle: "DISCIPLINA Y CONSTANCIA",
    quote: "La disciplina de hoy construye la versión de mañana.",
    price: "S/ 1,200",
    sessions: "12 sesiones",
    validity: "Vigencia: hasta 45 días",
    detail:
      "Diseñado idealmente para una frecuencia de hasta 5 sesiones semanales, con flexibilidad para completar las 12 sesiones dentro del plazo máximo establecido.",
    benefits: [
      "Entrenamiento personalizado",
      "Evaluación inicial",
      "Medición corporal mensual",
      "Planificación / orientación alimentaria personalizada*",
      "Seguimiento de evolución",
      "Ajustes según progreso",
      "Acompañamiento por WhatsApp",
    ],
    cta: "QUIERO ESTE CAMINO",
    featured: true,
  },
  {
    id: "samurai",
    name: "SAMURAI",
    kanji: "侍",
    subtitle: "MAESTRÍA Y EXCELENCIA",
    quote: "El verdadero desafío no es vencer a otros. Es superarte a ti mismo.",
    price: "S/ 1,700",
    priceNote: "Propuesta comercial sujeta a validación.",
    sessions: "20 sesiones",
    validity: "Vigencia: hasta 45 días",
    benefits: [
      "Entrenamiento personalizado",
      "Evaluación inicial",
      "Medición corporal mensual",
      "Planificación / orientación alimentaria personalizada*",
      "Seguimiento de evolución",
      "Acompañamiento prioritario",
      "Ajustes avanzados",
    ],
    cta: "QUIERO ESTE CAMINO",
  },
];
