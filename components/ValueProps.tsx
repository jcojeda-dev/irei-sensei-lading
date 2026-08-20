const props = [
  { title: "Entrenamiento personalizado", text: "Cada sesión responde a tus objetivos." },
  { title: "Seguimiento corporal", text: "Medimos tu evolución periódicamente." },
  { title: "Planificación alimentaria*", text: "Orientación adaptada a tus objetivos." },
  { title: "Acompañamiento", text: "No estás solo entre una sesión y otra." },
  { title: "Flexibilidad", text: "Tus sesiones se distribuyen dentro de la vigencia correspondiente." },
];

export default function ValueProps() {
  return (
    <section className="paper-texture-light py-24 text-charcoal md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-12">
        <h2 className="font-display text-3xl font-black uppercase leading-tight md:text-4xl">
          Lo que hace diferente tu camino
        </h2>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {props.map((p) => (
            <div key={p.title} className="border-t-2 border-hinomaru pt-4">
              <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.03em]">
                {p.title}
              </h3>
              <p className="mt-2 font-serif text-sm leading-relaxed text-charcoal/65">{p.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 font-serif text-xs italic text-charcoal/45">
          * Si se trata de prescripción nutricional clínica o terapéutica, debe intervenir un
          profesional de nutrición habilitado.
        </p>
      </div>
    </section>
  );
}
