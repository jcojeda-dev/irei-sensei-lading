import Image from "next/image";

const stages = [
  { n: "01", title: "EVALUAMOS", text: "Analizamos tu estado actual, objetivos y experiencia.", img: "/images/Irei sensei trainer 2.jpg" },
  { n: "02", title: "MEDIMOS", text: "Registramos indicadores de evolución disponibles y confiables.", img: "/images/Maria F. despues gym.png" },
  { n: "03", title: "PLANIFICAMOS", text: "Diseñamos el entrenamiento y plan nutricional según tus objetivos.", img: "/images/Irei sensei trainer.jpg" },
  { n: "04", title: "ENTRENAMOS", text: "Sesiones personalizadas enfocadas en técnica, fuerza y progreso.", img: "/images/Cesar despues.jpg" },
  { n: "05", title: "AJUSTAMOS", text: "Revisamos tu evolución y adaptamos el programa cuando es necesario.", img: "/images/Valeria A despues gym.png" },
  { n: "06", title: "EVOLUCIONAMOS", text: "Resultados reales, nuevos hábitos y nuevas metas.", img: "/images/Cesar despues.jpg" },
];

export default function Method() {
  return (
    <section id="metodo" className="bg-charcoal py-24 text-ivory md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column Text */}
          <div className="flex flex-col justify-center lg:col-span-4">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-hinomaru">
              NUESTRO MÉTODO
            </p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight md:text-4xl">
              TU TRANSFORMACIÓN NO ES SUERTE.
              <br />
              <span className="text-hinomaru">ES MÉTODO.</span>
            </h2>
            <p className="mt-5 font-serif text-sm leading-relaxed text-ivory/70">
              Cada paso tiene un propósito. Cada decisión te acerca a tu mejor versión.
            </p>
          </div>

          {/* Right Column Grid Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {stages.map((s, idx) => (
              <div key={s.n} className="group relative flex flex-col justify-between border border-white/10 bg-graphite/60 p-4 transition hover:border-hinomaru/40">
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 bg-charcoal">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      className="object-cover filter contrast-105 grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <span className="absolute bottom-2 left-2 bg-charcoal/80 px-2 py-0.5 font-display text-[10px] font-bold text-hinomaru">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xs font-bold uppercase tracking-wider text-ivory">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 font-serif text-[11px] leading-snug text-ivory/60">
                    {s.text}
                  </p>
                </div>
                {idx < stages.length - 1 && (
                  <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xs text-hinomaru lg:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
