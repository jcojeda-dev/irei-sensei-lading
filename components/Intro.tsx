import Enso from "./Enso";

export default function Intro() {
  return (
    <section className="paper-texture-light relative overflow-hidden py-24 text-charcoal md:py-32">
      <Enso className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 text-charcoal/[0.06]" static />

      <div className="mx-auto max-w-content px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <h2 className="font-display text-4xl font-black uppercase leading-[1.05] md:text-5xl">
            No es solo
            <br />
            entrenar.
          </h2>

          <div>
            <p className="font-serif text-xl leading-relaxed text-charcoal/85 md:text-2xl">
              Es construir disciplina.
              <br />
              Es conocer tu cuerpo.
              <br />
              Es aprender a superar tus propios límites.
            </p>
            <p className="mt-8 border-l-2 border-hinomaru pl-5 font-display text-sm uppercase tracking-[0.08em] text-charcoal/70">
              Tu transformación no debería depender de la improvisación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
