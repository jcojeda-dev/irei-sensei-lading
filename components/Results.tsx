import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "MARÍA F.",
    imgBefore: "/images/Cesar antes.jpg",
    imgAfter: "/images/Cesar despues.jpg",
    quote: "Irei me ayudó a construir disciplina y a transformar mi cuerpo sin dietas extremas.",
    stat1Label: "PESO",
    stat1Val: "-7 KG",
    stat2Label: "GRASA",
    stat2Val: "-6%",
    stat3Label: "SESIONES",
    stat3Val: "20",
  },
  {
    id: 2,
    name: "ANDRÉS T.",
    imgBefore: "/images/Cesar antes.jpg",
    imgAfter: "/images/Cesar despues.jpg",
    quote: "Más que un entrenador, es un mentor. El plan de entrenamiento me cambió por completo.",
    stat1Label: "MÚSCULO",
    stat1Val: "+3.8 KG",
    stat2Label: "CINTURA",
    stat2Val: "-5 CM",
    stat3Label: "SESIONES",
    stat3Val: "30",
  },
  {
    id: 3,
    name: "VALERIA A.",
    imgBefore: "/images/Cesar antes.jpg",
    imgAfter: "/images/Cesar despues.jpg",
    quote: "Entrenar se volvió parte de mi vida. Los resultados fueron increíbles.",
    stat1Label: "PESO",
    stat1Val: "-5 KG",
    stat2Label: "GRASA",
    stat2Val: "-4%",
    stat3Label: "SESIONES",
    stat3Val: "24",
  },
];

export default function Results() {
  return (
    <section id="resultados" className="bg-[#DED6C9] py-24 text-charcoal md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-12">
        <div className="text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-hinomaru">
            RESULTADOS REALES. PERSONAS REALES.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="border border-charcoal/15 bg-[#F4EFE6] p-5 shadow-sm flex flex-col justify-between">
              <div>
                {/* Before / After split image container */}
                <div className="grid grid-cols-2 gap-1 overflow-hidden border border-charcoal/20 bg-charcoal/10">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={t.imgBefore}
                      alt="Antes"
                      fill
                      className="object-cover filter grayscale contrast-110"
                    />
                    <span className="absolute bottom-1 left-1 bg-charcoal/80 px-1.5 py-0.5 font-display text-[9px] text-ivory uppercase">
                      Antes
                    </span>
                  </div>
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={t.imgAfter}
                      alt="Después"
                      fill
                      className="object-cover filter contrast-105"
                    />
                    <span className="absolute bottom-1 right-1 bg-hinomaru px-1.5 py-0.5 font-display text-[9px] text-ivory uppercase">
                      Después
                    </span>
                  </div>
                </div>

                <p className="mt-4 font-serif text-xs italic leading-relaxed text-charcoal/80">
                  “{t.quote}”
                </p>
                <p className="mt-2 font-display text-xs font-bold uppercase tracking-wider text-charcoal/60">
                  – {t.name}
                </p>
              </div>

              {/* Stats Bar */}
              <div className="mt-5 grid grid-cols-3 border-t border-charcoal/15 pt-3 text-center">
                <div>
                  <span className="block font-display text-sm font-black text-hinomaru">{t.stat1Val}</span>
                  <span className="block font-display text-[9px] uppercase tracking-widest text-charcoal/60">{t.stat1Label}</span>
                </div>
                <div className="border-x border-charcoal/15">
                  <span className="block font-display text-sm font-black text-hinomaru">{t.stat2Val}</span>
                  <span className="block font-display text-[9px] uppercase tracking-widest text-charcoal/60">{t.stat2Label}</span>
                </div>
                <div>
                  <span className="block font-display text-sm font-black text-charcoal">{t.stat3Val}</span>
                  <span className="block font-display text-[9px] uppercase tracking-widest text-charcoal/60">{t.stat3Label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-serif text-[11px] italic text-charcoal/50">
          *Resultados individuales pueden variar según constancia y punto de partida.
        </p>
      </div>
    </section>
  );
}
