const props = [
  {
    icon: (
      <svg className="h-7 w-7 text-charcoal/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "ENTRENAMIENTO PERSONALIZADO",
    text: "Cada sesión responde a tus objetivos.",
  },
  {
    icon: (
      <svg className="h-7 w-7 text-charcoal/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "SEGUIMIENTO CORPORAL",
    text: "Medimos tu evolución periódicamente.",
  },
  {
    icon: (
      <svg className="h-7 w-7 text-charcoal/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "PLANIFICACIÓN ALIMENTARIA",
    text: "Orientación adaptada a tus objetivos.",
  },
  {
    icon: (
      <svg className="h-7 w-7 text-charcoal/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "ACOMPAÑAMIENTO",
    text: "No estás solo entre una sesión y otra.",
  },
  {
    icon: (
      <svg className="h-7 w-7 text-charcoal/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "FLEXIBILIDAD",
    text: "Tus sesiones se pueden distribuir dentro de la vigencia correspondiente.",
  },
];

export default function ValueProps() {
  return (
    <section className="bg-[#DED6C9] py-20 text-charcoal">
      <div className="mx-auto max-w-content px-6 md:px-12">
        <h2 className="text-center font-display text-2xl font-black uppercase tracking-wider md:text-3xl">
          LO QUE HACE DIFERENTE TU CAMINO
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {props.map((p) => (
            <div key={p.title} className="border border-charcoal/15 bg-[#F4EFE6] p-5 text-center shadow-sm">
              <div className="flex justify-center mb-3">{p.icon}</div>
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-charcoal">
                {p.title}
              </h3>
              <p className="mt-2 font-serif text-[11px] leading-relaxed text-charcoal/70">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
