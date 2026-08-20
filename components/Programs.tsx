import { programs } from "@/data/programs";
import ProgramCard from "./ProgramCard";

export default function Programs() {
  return (
    <section id="programas" className="relative overflow-hidden bg-[#DED6C9] py-24 text-charcoal md:py-32">
      {/* Background Samurai Left */}
      <img
        src="/images/Samurai izquierda.png"
        alt="Samurai Izquierda"
        className="pointer-events-none absolute -left-12 top-10 z-0 h-[380px] w-auto opacity-25 mix-blend-multiply sm:h-[480px] md:opacity-40 lg:opacity-60 xl:-left-10 xl:top-16 xl:h-[650px] object-contain"
      />
      {/* Background Samurai Right */}
      <img
        src="/images/samurai derecha.png"
        alt="Samurai Derecha"
        className="pointer-events-none absolute -right-12 bottom-10 z-0 h-[380px] w-auto opacity-25 mix-blend-multiply sm:h-[480px] md:opacity-40 lg:opacity-60 xl:-right-10 xl:top-16 xl:h-[650px] object-contain"
      />

      <div className="relative z-10 mx-auto max-w-content px-6 md:px-12">
        <div className="text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-hinomaru">
            TU CAMINO. TU ELECCIÓN.
          </p>
          <h2 className="mt-2 font-display text-3xl font-black uppercase leading-tight md:text-5xl">
            3 PROGRAMAS. 3 NIVELES DE COMPROMISO. UN MISMO PROPÓSITO.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:items-stretch md:gap-6">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
