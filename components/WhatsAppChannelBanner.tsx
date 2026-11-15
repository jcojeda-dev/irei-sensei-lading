import React from "react";
import { WHATSAPP_CHANNEL_URL } from "@/data/social";

export default function WhatsAppChannelBanner() {
  return (
    <section className="relative overflow-hidden bg-[#12100E] py-16 text-ivory border-y border-white/10">
      {/* Elementos decorativos de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 select-none font-serif text-[140px] font-black text-white/[0.02] md:text-[200px]"
      >
        仲間
      </div>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[1px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-hinomaru/40 to-transparent" />

      <div className="relative mx-auto max-w-content px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-white/10 bg-gradient-to-br from-charcoal/90 via-[#1A1815] to-[#12100E] p-8 shadow-2xl md:flex-row md:items-center md:p-12">
          
          {/* Contenido textual */}
          <div className="max-w-2xl">
            {/* Badge con indicador activo */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-3.5 py-1 text-xs font-semibold text-[#25D366]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]"></span>
              </span>
              <span className="font-display tracking-[0.15em] uppercase">
                Canal Oficial de WhatsApp
              </span>
            </div>

            <h2 className="mt-4 font-display text-2xl font-black uppercase tracking-wider text-ivory sm:text-3xl md:text-4xl">
              Entrena tu mente y cuerpo <span className="text-hinomaru">cada día</span>
            </h2>

            <p className="mt-3 font-serif text-sm leading-relaxed text-ivory/75 md:text-base">
              Únete a la comunidad de Isamu Irei. Recibe reflexiones de disciplina samurái,
              tips técnicos de biomecánica, nutrición sin engaños y acceso prioritario
              a cupos para asesoría personalizada antes de que se abran al público.
            </p>

            {/* Micro beneficios en pills */}
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs text-ivory/80 font-display">
              <div className="flex items-center gap-2">
                <span className="text-hinomaru">▸</span> Correcciones técnicas y hábitos reales
              </div>
              <div className="flex items-center gap-2">
                <span className="text-hinomaru">▸</span> Nutrición sostenible sin extremos
              </div>
              <div className="flex items-center gap-2">
                <span className="text-hinomaru">▸</span> Mentalidad y constancia diaria
              </div>
              <div className="flex items-center gap-2">
                <span className="text-hinomaru">▸</span> Prioridad exclusiva en nuevos cupos
              </div>
            </div>
          </div>

          {/* Botón de acción */}
          <div className="flex w-full shrink-0 flex-col items-center gap-2 md:w-auto">
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 font-display text-xs font-bold uppercase tracking-[0.14em] text-[#0A180E] shadow-xl shadow-[#25D366]/20 transition-all duration-300 hover:bg-[#20bd5a] hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#25D366]/30 active:scale-95 md:w-auto"
            >
              <svg
                className="h-5 w-5 fill-current transition-transform duration-300 group-hover:rotate-6"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Unirme al Canal en WhatsApp
            </a>
            <span className="font-serif text-[11px] text-ivory/45">
              *Acceso 100% libre · Silencia o retírate cuando quieras
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
