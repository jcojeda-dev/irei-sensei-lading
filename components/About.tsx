import Image from "next/image";

export default function About() {
  return (
    <section id="sobre-irei" className="bg-charcoal py-24 text-ivory md:py-32">
      <div className="mx-auto grid max-w-content gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
        {/* Left Photo */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-graphite shadow-2xl">
          <Image
            src="/images/Irei sensei trainer.jpg"
            alt="Isamu Irei - Personal Trainer"
            fill
            className="object-cover object-top filter brightness-95 contrast-105"
            priority
          />
        </div>

        {/* Right Info */}
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl font-black uppercase leading-tight md:text-4xl">
            CONOCE A IREI SENSEI
          </h2>

          <ul className="mt-8 space-y-4 font-display text-xs uppercase tracking-[0.12em] text-ivory/70">
            <li className="border-b border-white/10 pb-2">
              <span className="text-hinomaru font-bold">[</span> BIOGRAFÍA BREVE <span className="text-hinomaru font-bold">]</span>
              <p className="mt-1 font-serif text-sm normal-case text-ivory/80">Entrenador personal enfocado en la transformación física y mental a través de un sistema de disciplina y fuerza.</p>
            </li>
            <li className="border-b border-white/10 pb-2">
              <span className="text-hinomaru font-bold">[</span> CERTIFICACIONES <span className="text-hinomaru font-bold">]</span>
              <p className="mt-1 font-serif text-sm normal-case text-ivory/80">Certificación Internacional en Personal Training, Nutrición Deportiva & Recomposición Corporal.</p>
            </li>
            <li className="border-b border-white/10 pb-2">
              <span className="text-hinomaru font-bold">[</span> EXPERIENCIA <span className="text-hinomaru font-bold">]</span>
              <p className="mt-1 font-serif text-sm normal-case text-ivory/80">+6 años asesorando a alumnos en hipertrofia y acondicionamiento físico.</p>
            </li>
            <li className="pb-2">
              <span className="text-hinomaru font-bold">[</span> FILOSOFÍA DE ENTRENAMIENTO <span className="text-hinomaru font-bold">]</span>
              <p className="mt-1 font-serif text-sm normal-case text-ivory/80">Constancia sobre intensidad. Construir hábitos sólidos para lograr resultados duraderos.</p>
            </li>
          </ul>

          <div className="mt-8 flex items-start gap-4 border-t border-white/10 pt-6">
            <span className="font-serif text-4xl leading-none text-hinomaru">“</span>
            <div>
              <p className="font-serif text-base italic leading-relaxed text-ivory/90">
                Mi objetivo no es solamente ayudarte a entrenar. Es ayudarte a construir una disciplina que puedas mantener.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-block rounded-sm bg-hinomaru px-1.5 py-0.5 text-[10px] font-bold text-ivory">印</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
