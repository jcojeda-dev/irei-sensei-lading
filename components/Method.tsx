const stages = [
  { n: "01", title: "Evaluamos", text: "Analizamos tu estado actual, objetivos, experiencia y contexto." },
  { n: "02", title: "Medimos", text: "Registramos indicadores de evolución disponibles y confiables." },
  { n: "03", title: "Planificamos", text: "Diseñamos el entrenamiento de acuerdo con tus objetivos." },
  { n: "04", title: "Entrenamos", text: "Sesiones personalizadas enfocadas en técnica, fuerza y progreso." },
  { n: "05", title: "Ajustamos", text: "Revisamos la evolución y adaptamos el programa." },
  { n: "06", title: "Evolucionamos", text: "Resultados reales, nuevos hábitos y nuevas metas." },
];

export default function Method() {
  return (
    <section id="metodo" className="bg-graphite py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-12">
        <h2 className="max-w-2xl font-display text-4xl font-black uppercase leading-[1.05] text-ivory md:text-5xl">
          Tu transformación no es suerte.
          <br />
          <span className="text-hinomaru">Es método.</span>
        </h2>

        <div className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-3">
          {stages.map((s) => (
            <div key={s.n} className="border-t border-white/15 pt-6">
              <span className="font-serif text-sm text-hinomaru">{s.n}</span>
              <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-wide text-ivory">
                {s.title}
              </h3>
              <p className="mt-2 font-serif text-[15px] leading-relaxed text-ivory/60">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
