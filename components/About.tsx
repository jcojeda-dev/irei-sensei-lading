import Image from "next/image";

export default function About() {
  return (
    <section id="sobre-irei" className="bg-charcoal py-24 md:py-32">
      <div className="mx-auto grid max-w-content gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
        <div className="relative aspect-[4/5] overflow-hidden border border-ivory/20 bg-graphite shadow-2xl">
          <Image
            src="/images/Irei sensei trainer.jpg"
            alt="Isamu Irei - Irei Sensei"
            fill
            className="object-cover object-top transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-serif text-sm uppercase tracking-widest2 text-hinomaru">Sobre Irei Sensei</p>
          <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight text-ivory md:text-4xl">
            Conoce a Isamu Irei
          </h2>

          <p className="mt-6 font-serif text-xl italic leading-relaxed text-ivory/80">
            “Mi objetivo no es solamente ayudarte a entrenar. Es ayudarte a construir una
            disciplina que puedas mantener.”
          </p>

          <dl className="mt-8 space-y-4 border-t border-white/10 pt-6">
            {[
              ["Biografía", "Entrenador personal enfocado en la transformación física y mental a través de un sistema de disciplina, fuerza y hábitos sostenibles."],
              ["Certificaciones", "Certificación Internacional en Personal Training, Especialista en Recomposición Corporal & Nutrición Deportivo-Funcional."],
              ["Experiencia", "+6 años asesorando a alumnos en hipertrofia, pérdida de grasa y acondicionamiento de alto rendimiento."],
              ["Filosofía de entrenamiento", "Constancia sobre intensidad. Construir un hábito sólido para lograr resultados duraderos sin lesiones."],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-48 shrink-0 font-display text-[11px] uppercase tracking-[0.12em] text-ivory/45">
                  {label}
                </dt>
                <dd className="font-serif text-sm text-ivory/60">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
