import Enso from "./Enso";

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen flex-col bg-charcoal pt-20 md:flex-row md:pt-24">
      {/* Contenido */}
      <div className="relative z-10 flex w-full flex-col justify-center px-6 py-14 md:w-[45%] md:px-12 lg:px-16">
        <div className="mb-4">
          <img
            src="/images/IREI_SENSEI_LOGO_PRINCIPAL.png"
            alt="IREI SENSEI - Personal Trainer"
            className="h-12 w-auto object-contain md:h-14"
          />
        </div>

        <h1 className="mt-4 font-display text-[13vw] font-black uppercase leading-[0.98] text-ivory md:text-[3.4vw] lg:text-6xl">
          Entrena tu cuerpo.
          <br />
          Forja tu <span className="text-hinomaru">disciplina</span>.
        </h1>

        <p className="mt-6 max-w-md font-serif text-lg text-ivory/75">
          Entrenamiento personalizado orientado a resultados.
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <a
            href="#programas"
            className="bg-hinomaru px-7 py-4 text-center font-display text-sm font-bold uppercase tracking-[0.14em] text-ivory transition hover:bg-hinomaru2"
          >
            Comienza tu camino
          </a>
          <a
            href="#programas"
            className="border border-ivory/30 px-7 py-4 text-center font-display text-sm font-bold uppercase tracking-[0.14em] text-ivory/85 transition hover:border-ivory"
          >
            Conoce los programas
          </a>
        </div>

        <div className="mt-10 flex items-center gap-3 text-ivory/50">
          <span className="hairline w-10" />
          <p className="font-serif text-sm tracking-wide">
            Cuerpo · Mente · Espíritu
            <span className="ml-2 font-brush text-base text-ivory/40">身体 · 心 · 魂</span>
          </p>
        </div>
      </div>

      {/* Imagen */}
      <div className="relative h-[52vh] w-full overflow-hidden md:h-auto md:w-[55%]">
        <img
          src="/images/Irei sensei trainer 2.jpg"
          alt="Isamu Irei - Personal Trainer"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/20 to-transparent md:bg-gradient-to-r md:from-charcoal md:via-transparent md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

        <Enso className="pointer-events-none absolute bottom-8 right-8 h-28 w-28 text-hinomaru/40 md:h-40 md:w-40" />
      </div>
    </section>
  );
}
