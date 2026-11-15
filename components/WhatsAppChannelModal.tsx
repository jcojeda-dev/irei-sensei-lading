"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WHATSAPP_CHANNEL_URL } from "@/data/social";

export default function WhatsAppChannelModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Si el usuario ya lo cerró en esta sesión, no volver a molestarlo
    const isDismissed = sessionStorage.getItem("irei_wa_channel_modal_dismissed");
    if (isDismissed) return;

    // Mostrar el pop-up tras 5 segundos de navegación
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("irei_wa_channel_modal_dismissed", "true");
  };

  const handleOpenChannel = () => {
    sessionStorage.setItem("irei_wa_channel_modal_dismissed", "true");
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop con desenfoque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Tarjeta del Pop-up */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#1E1B17] via-[#14120F] to-[#0D0B0A] p-7 text-ivory shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] md:p-8"
          >
            {/* Marca de agua kanji japonesa de fondo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -right-6 select-none font-serif text-[130px] font-black text-white/[0.03]"
            >
              道
            </div>

            {/* Línea decorativa superior Hinomaru */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-hinomaru via-[#25D366] to-hinomaru" />

            {/* Botón X de cerrar en la esquina superior derecha */}
            <button
              onClick={handleClose}
              type="button"
              aria-label="Cerrar modal"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ivory/70 transition-all hover:border-white/30 hover:bg-white/15 hover:text-ivory active:scale-90"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Badge de encabezado */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]"></span>
              </span>
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[#25D366]">
                Canal Exclusivo · Isamu Irei
              </span>
            </div>

            {/* Título */}
            <h3
              id="modal-title"
              className="mt-3 font-display text-xl font-black uppercase tracking-wider text-ivory sm:text-2xl"
            >
              El camino no se recorre <span className="text-hinomaru">solo</span>
            </h3>

            {/* Descripción */}
            <p className="mt-3 font-serif text-sm leading-relaxed text-ivory/80">
              Únete gratis a nuestro canal privado de WhatsApp y recibe lecciones diarias de
              disciplina, tips biomecánicos de entrenamiento, nutrición sin engaños y acceso
              prioritario a cupos de evaluación personalizada.
            </p>

            {/* Caja de beneficios */}
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-ivory/85 font-display space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[#25D366] font-bold">✓</span> Contenido práctico y directo al punto
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#25D366] font-bold">✓</span> Sin grupos ruidosos: solo novedades de valor
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#25D366] font-bold">✓</span> Prioridad antes de abrir plazas al público
              </div>
            </div>

            {/* Botón CTA para unirse al canal */}
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOpenChannel}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-[#0A180E] shadow-lg shadow-[#25D366]/25 transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/35 active:scale-98"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Unirme al Canal de WhatsApp
            </a>

            {/* Botón secundario para descartar */}
            <button
              onClick={handleClose}
              type="button"
              className="mt-3 w-full text-center font-display text-[11px] font-medium tracking-widest text-ivory/50 transition hover:text-ivory/90"
            >
              Quizás más tarde
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
