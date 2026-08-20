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
    <div className="border-y border-white/10 bg-graphite py-5">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-3 gap-y-3 px-6 md:flex-nowrap md:justify-between">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <span className="whitespace-nowrap font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ivory/70">
              {step}
            </span>
            {i < steps.length - 1 && <span className="text-hinomaru/60">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
