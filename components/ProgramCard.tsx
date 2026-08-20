import type { Program } from "@/data/programs";

export default function ProgramCard({ program }: { program: Program }) {
  const featured = program.featured;

  return (
    <div
      className={`group relative flex h-full flex-col border p-8 transition-all duration-300 hover:-translate-y-1.5 shadow-md ${
        featured
          ? "border-hinomaru bg-charcoal text-ivory md:-translate-y-2 md:py-10 shadow-2xl"
          : "border-charcoal/20 bg-[#F2EDE4] text-charcoal hover:border-charcoal/40"
      }`}
    >
      {featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-hinomaru px-4 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ivory shadow">
          MÁS ELEGIDO
        </span>
      )}

      <div className="text-center">
        <span className={`font-brush text-3xl ${featured ? "text-hinomaru" : "text-charcoal/70"}`}>
          {program.kanji}
        </span>
        <h3 className={`mt-2 font-display text-3xl font-black uppercase tracking-wider ${featured ? "text-ivory" : "text-charcoal"}`}>
          {program.name}
        </h3>
        <p className={`mt-1 font-display text-[10px] font-bold uppercase tracking-[0.18em] ${featured ? "text-hinomaru" : "text-hinomaru"}`}>
          {program.subtitle}
        </p>

        <p className={`mt-4 font-serif text-sm italic leading-relaxed ${featured ? "text-ivory/80" : "text-charcoal/75"}`}>
          “{program.quote}”
        </p>
      </div>

      <div className={`mt-6 flex items-center justify-center gap-6 border-y py-4 ${featured ? "border-white/10" : "border-charcoal/15"}`}>
        <div className="text-center">
          <span className="font-display text-2xl font-black">{program.sessions.split(" ")[0]}</span>
          <span className="block font-display text-[9px] uppercase tracking-[0.1em] opacity-60">SESIONES</span>
        </div>
        <div className="h-7 w-[1px] bg-current opacity-20" />
        <div className="text-center">
          <span className="font-display text-sm font-bold uppercase">{program.validity.replace("Vigencia: ", "")}</span>
          <span className="block font-display text-[9px] uppercase tracking-[0.1em] opacity-60">VIGENCIA</span>
        </div>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {program.benefits.map((b) => (
          <li key={b} className={`flex items-start gap-2.5 font-serif text-xs ${featured ? "text-ivory/85" : "text-charcoal/80"}`}>
            <span className="mt-[1px] text-hinomaru font-bold">✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <p className={`font-display text-3xl font-black tracking-tight ${featured ? "text-ivory" : "text-charcoal"}`}>
          {program.price}
        </p>
        <a
          href="#contacto"
          className={`mt-4 block w-full py-4 text-center font-display text-xs font-bold uppercase tracking-[0.14em] transition ${
            featured
              ? "bg-hinomaru text-ivory hover:bg-hinomaru2 shadow"
              : "border border-charcoal/30 bg-transparent text-charcoal hover:bg-charcoal hover:text-ivory"
          }`}
        >
          {program.cta}
        </a>
      </div>
    </div>
  );
}
