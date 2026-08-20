const steps = [
  "01 EVALUAMOS",
  "02 MEDIMOS",
  "03 PLANIFICAMOS",
  "04 ENTRENAMOS",
  "05 AJUSTAMOS",
  "06 EVOLUCIONAMOS",
];

export default function MethodBar() {
  return (
    <div className="border-y border-white/10 bg-graphite py-4 md:py-5">
      <div className="mx-auto grid max-w-content grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:flex md:flex-nowrap md:items-center md:justify-between md:px-10">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center justify-center gap-2 border border-white/5 bg-charcoal/40 py-2 px-2.5 md:border-none md:bg-transparent md:py-0 md:px-0">
            <span className="whitespace-nowrap font-display text-[10px] font-bold uppercase tracking-[0.14em] text-ivory/80 md:text-[11px] md:tracking-[0.16em]">
              {step}
            </span>
            {i < steps.length - 1 && <span className="hidden text-hinomaru/60 md:inline">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
