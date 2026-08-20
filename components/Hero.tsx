import Enso from "./Enso";

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen flex-col overflow-hidden bg-charcoal pt-20 md:flex-row md:pt-24">
      {/* Background Image header fondo.png */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/images/header fondo.png"
          alt="Header Background"
          className="h-full w-full object-cover object-center opacity-65 filter brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />
      </div>

      {/* Background Japanese Enso Art */}
      <Enso className="pointer-events-none absolute -left-20 top-1/4 z-0 h-[90vw] w-[90vw] max-w-[650px] text-hinomaru/20 md:-left-10 md:h-[500px] md:w-[500px]" static />

      {/* Contenido Izquierda */}
      <div className="relative z-10 flex w-full flex-col justify-center px-6 py-12 md:w-[50%] md:px-12 lg:px-16">
        <div className="flex items-center gap-3">
          <p className="font-serif text-xs uppercase tracking-widest2 text-ivory/90">
            CUERPO · MENTE · ESPÍRITU
          </p>
          <span className="font-serif text-xs text-ivory/50">身体 · 心 · 魂</span>
          <span className="inline-block rounded-sm bg-hinomaru px-1.5 py-0.5 text-[10px] font-bold text-ivory">印</span>
        </div>

        <h1 className="mt-6 font-display text-4xl font-black uppercase leading-[0.98] tracking-tight text-ivory md:text-5xl lg:text-6xl drop-shadow-md">
          ENTRENA TU CUERPO.
          <br />
          FORJA TU <span className="text-hinomaru">DISCIPLINA.</span>
        </h1>

        <p className="mt-5 max-w-md font-serif text-base text-ivory/80 md:text-lg">
          Entrenamiento personalizado orientado a resultados.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contacto"
            className="flex items-center justify-center gap-2 bg-hinomaru px-7 py-4 font-display text-xs font-bold uppercase tracking-[0.14em] text-ivory transition hover:bg-hinomaru2 shadow-xl"
          >
            COMIENZA TU CAMINO <span>&gt;</span>
          </a>
          <a
            href="#programas"
            className="flex items-center justify-center border border-ivory/30 bg-graphite/60 backdrop-blur-sm px-7 py-4 font-display text-xs font-bold uppercase tracking-[0.14em] text-ivory/90 transition hover:border-ivory"
          >
            CONOCE LOS PROGRAMAS
          </a>
        </div>
      </div>

      {/* Imagen & Caligrafía Japonesa Derecha */}
      <div className="relative flex min-h-[450px] w-full items-end justify-center overflow-hidden md:min-h-screen md:w-[50%]">
        <img
          src="/images/Irei sensei trainer 2.jpg"
          alt="Isamu Irei - Personal Trainer"
          className="relative z-10 h-full max-h-[85vh] w-auto object-cover object-top filter brightness-95 contrast-105 drop-shadow-2xl"
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-charcoal/80 via-transparent to-transparent pointer-events-none hidden md:block" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-charcoal via-transparent to-transparent pointer-events-none" />

        {/* Vertical Japanese Calligraphy on Far Right */}
        <div className="absolute right-6 top-28 z-30 hidden flex-col items-center gap-4 text-ivory/70 lg:flex">
          <span className="font-serif text-2xl tracking-widest text-ivory/90 [writing-mode:vertical-rl] drop-shadow">
            継続は力なり
          </span>
          <span className="font-display text-[10px] uppercase tracking-[0.2em] text-ivory/50">
            LA CONSTANCIA ES PODER
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-hinomaru text-xs font-bold text-ivory shadow">
            印
          </span>
        </div>
      </div>
    </section>
  );
}
