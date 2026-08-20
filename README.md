# Irei Sensei — Landing Page

Landing one-page en Next.js 14 + Tailwind CSS, basada en el prompt maestro
(Personal Training premium + estética japonesa contemporánea).

## Instalación

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Estructura

- `app/page.tsx` — ensambla todas las secciones (one-page).
- `components/` — un componente por sección (Hero, Programs, Method, etc.).
- `data/programs.ts` — datos de los 3 programas (HAJIMETE / TANREN / SAMURAI).
  Edita nombre, precio, sesiones, beneficios, badge o CTA sin tocar la UI.

## Pendiente de reemplazar (marcado explícitamente en el código)

- `[PHOTO OF TRAINER]`, `[SHORT BIO]`, `[CERTIFICATIONS]`, `[EXPERIENCE]`,
  `[TRAINING PHILOSOPHY]` en `components/About.tsx`.
- `[CLIENT PHOTO]`, `[CLIENT NAME]`, `[REAL TESTIMONIAL]`, `[REAL RESULT]`
  en `components/Results.tsx`.
- `[WHATSAPP]`, `[EMAIL]`, `[LOCATION]` en `components/Contact.tsx`.
- Casillas `[Ejercicio / técnica]`, `[Mediciones]`, `[Alimentación]`, `[Lifestyle]`
  en `components/Gallery.tsx` — reemplazar por fotos reales del negocio.
- El logo de IREI SENSEI (actualmente es texto tipográfico en `Navbar.tsx` y `Footer.tsx`).

## Imágenes temporales

Dos fotos de stock (libres de uso, licencia Unsplash) se usan como placeholders
visuales en el Hero y la Galería, mientras no haya fotografía real de Irei Sensei:

- Hero: foto de Gold's Gym Nepal (Unsplash, licencia gratuita).
- Galería: foto de Alora Griffiths y Paweł Bulwan (Unsplash, licencia gratuita).

Reemplázalas por fotos reales del negocio en cuanto estén disponibles
(`components/Hero.tsx` y `components/Gallery.tsx`).

## Precios

El único precio confirmado por el negocio es **S/ 1,700** para TANREN (20 sesiones).
Los precios de HAJIMETE y SAMURAI son propuestas comerciales sujetas a validación
(ver nota al pie de `components/Programs.tsx`).
