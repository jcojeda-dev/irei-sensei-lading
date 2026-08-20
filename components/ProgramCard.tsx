import type { Program } from "@/data/programs";

export default function ProgramCard({ program }: { program: Program }) {
  const featured = program.featured;

  return (
    <div
      className={`group relative flex h-full flex-col border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ${
        featured
          ? "border-hinomaru/60 bg-graphite md:scale-105 md:py-10"
          : "border-white/12 bg-charcoal hover:border-hinomaru/40"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-8 bg-hinomaru px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-ivory">
          Más elegido
        </span>
      )}

      <span className="font-brush text-3xl text-hinomaru/70">{program.kanji}</span>
      <h3 className="mt-3 font-display text-3xl font-black uppercase tracking-wide text-ivory">
        {program.name}
      </h3>
      <p className="mt-1 font-display text-[11px] uppercase tracking-[0.18em] text-ivory/50">
        {program.subtitle}
      </p>

      <p className="mt-5 font-serif italic leading-relaxed text-ivory/70">“{program.quote}”</p>

      <div className="mt-7 flex items-baseline gap-2">
        <span className="font-display text-3xl font-black text-ivory">{program.price}</span>
      </div>
      <p className="mt-1 font-display text-xs uppercase tracking-[0.1em] text-ivory/55">
        {program.sessions} · {program.validity}
      </p>
      {program.priceNote && (
        <p className="mt-1 font-serif text-[11px] italic text-ivory/40">{program.priceNote}</p>
      )}
      {program.detail && (
        <p className="mt-4 font-serif text-sm leading-relaxed text-ivory/60">{program.detail}</p>
      )}

      <ul className="mt-7 flex-1 space-y-2.5 border-t border-white/10 pt-6">
        {program.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 font-display text-[13px] text-ivory/75">
            <span className="mt-[3px] text-hinomaru">✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contacto"
        className={`mt-8 block px-6 py-4 text-center font-display text-sm font-bold uppercase tracking-[0.12em] transition ${
          featured
            ? "bg-hinomaru text-ivory hover:bg-hinomaru2"
            : "border border-ivory/25 text-ivory/85 hover:border-hinomaru hover:text-hinomaru"
        }`}
      >
        {program.cta}
      </a>
    </div>
  );
}
