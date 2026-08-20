import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Irei Sensei | Personal Training",
  description:
    "Entrenamiento personalizado orientado a resultados. Evalúa, mide, entrena y evoluciona con Irei Sensei.",
  openGraph: {
    title: "Irei Sensei | Personal Training",
    description:
      "Entrenamiento personalizado orientado a resultados. Evalúa, mide, entrena y evoluciona con Irei Sensei.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
