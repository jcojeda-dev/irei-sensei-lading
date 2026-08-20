import { programs } from "@/data/programs";
import ProgramCard from "./ProgramCard";

export default function Programs() {
  return (
    <section id="programas" className="washi-texture bg-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-12">
        <div className="max-w-2xl">
          <p className="font-serif text-sm uppercase tracking-widest2 text-hinomaru">Programas</p>
          <h2 className="mt-3 font-display text-4xl font-black uppercase leading-[1.05] text-ivory md:text-5xl">
            Tu camino. Tu elección.
          </h2>
          <p className="mt-4 font-serif text-lg text-ivory/65">
            3 programas. 3 niveles de compromiso. Un mismo propósito.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:items-center md:gap-6">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        <p className="mt-12 max-w-xl font-serif text-sm italic text-ivory/40">
          * Los precios de HAJIMETE y SAMURAI son propuestas comerciales y deben validarse
          comercialmente. El precio confirmado para el paquete de 20 sesiones (TANREN) es S/ 1,700.
        </p>
      </div>
    </section>
  );
}
