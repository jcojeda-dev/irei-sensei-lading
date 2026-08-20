import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "César M.",
    image: "/images/Cesar despues.jpg",
    quote: "El método de Isamu me permitió reducir grasa y ganar definición sin dietas extremas. Lo mejor fue aprender a entrenar con la técnica correcta.",
    result: "-10 kg & Recomposición Corporal",
  },
  {
    id: 2,
    name: "Andrea R.",
    image: "/images/Irei sensei trainer 2.jpg",
    quote: "Pensaba que no tenía tiempo para el gimnasio, pero con la estructura personalizada logré crear el hábito de entrenar 4 veces por semana sin lesionarme.",
    result: "Fuerza & Hábito Sostenible",
  },
  {
    id: 3,
    name: "Diego S.",
    image: "/images/Cesar antes.jpg",
    quote: "Superé un estancamiento de más de un año. El seguimiento constante y la progresión de cargas hicieron toda la diferencia en mis resultados.",
    result: "+6 kg Masa Muscular",
  },
];

export default function Results() {
  return (
    <section id="resultados" className="paper-texture-light py-24 text-charcoal md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-12">
        <h2 className="font-display text-3xl font-black uppercase leading-tight md:text-4xl">
          Resultados reales.
          <br />
          Personas reales.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="border border-charcoal/15 bg-ivory/60 p-6 flex flex-col justify-between">
              <div>
                <div className="relative aspect-square w-full overflow-hidden border border-charcoal/20 bg-charcoal/10">
                  <Image
                    src={t.image}
                    alt={`Resultado de ${t.name}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.06em] text-charcoal/80">
                  {t.name}
                </p>
                <p className="mt-2 font-serif text-sm italic leading-relaxed text-charcoal/70">
                  “{t.quote}”
                </p>
              </div>
              <p className="mt-4 font-display text-xs font-bold uppercase tracking-[0.08em] text-hinomaru">
                {t.result}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 font-serif text-xs italic text-charcoal/45">
          Resultados individuales pueden variar según constancia y punto de partida.
        </p>
      </div>
    </section>
  );
}
