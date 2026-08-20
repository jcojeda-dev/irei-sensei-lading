type Item = { label: string; src?: string };

const items: Item[] = [
  { label: "Entrenamiento", src: "https://images.unsplash.com/photo-1541600383005-565c949cf777?fm=jpg&q=75&w=900&auto=format&fit=crop" },
  { label: "Ejercicio / técnica" },
  { label: "Interacción entrenador/cliente" },
  { label: "Preparación", src: "https://images.unsplash.com/photo-1672344048213-76b6e77304bd?fm=jpg&q=75&w=900&auto=format&fit=crop" },
  { label: "Mediciones" },
  { label: "Alimentación" },
  { label: "Lifestyle" },
  { label: "Entrenamiento" },
];

export default function Gallery() {
  return (
    <section className="bg-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-12">
        <p className="font-serif text-sm uppercase tracking-widest2 text-hinomaru">Galería</p>
        <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight text-ivory md:text-4xl">
          El proceso, en imágenes
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden bg-graphite">
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.label}
                  className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center border border-dashed border-ivory/15">
                  <span className="px-3 text-center font-display text-[11px] uppercase tracking-[0.08em] text-ivory/35">
                    [{item.label}]
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
