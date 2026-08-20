import Enso from "./Enso";

export default function CTAFinal() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-graphite via-charcoal to-charcoal" />
      <Enso
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140vw] w-[140vw] -translate-x-1/2 -translate-y-1/2 text-hinomaru/[0.07] md:h-[60vw] md:w-[60vw]"
        static
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center flex flex-col items-center">
        <img
          src="/images/IREI_SENSEI_LOGO_PRINCIPAL.png"
          alt="IREI SENSEI - Personal Trainer"
          className="mb-8 h-16 w-auto object-contain"
        />

        <h2 className="font-display text-3xl font-black uppercase leading-[1.05] text-ivory md:text-5xl">
          TU CAMINO COMIENZA HOY.
        </h2>
        <p className="mx-auto mt-4 max-w-md font-serif text-sm leading-relaxed text-ivory/70 md:text-base">
          No necesitas estar en forma para comenzar. Necesitas comenzar para transformarte.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#contacto"
            className="bg-hinomaru px-7 py-4 font-display text-xs font-bold uppercase tracking-[0.14em] text-ivory transition hover:bg-hinomaru2 shadow-lg"
          >
            QUIERO COMENZAR MI CAMINO
          </a>
          <a
            href="#contacto"
            className="border border-ivory/30 bg-graphite/40 px-7 py-4 font-display text-xs font-bold uppercase tracking-[0.14em] text-ivory/90 transition hover:border-ivory"
          >
            HABLAR CON IREI
          </a>
        </div>
      </div>
    </section>
  );
}
