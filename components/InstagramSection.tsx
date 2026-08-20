export default function InstagramSection() {
  return (
    <section className="bg-graphite py-24 md:py-28">
      <div className="mx-auto max-w-content px-6 text-center md:px-12">
        <h2 className="font-display text-3xl font-black uppercase text-ivory md:text-4xl">
          Sigue el camino
        </h2>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-2 sm:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center border border-dashed border-ivory/15 bg-charcoal"
            >
              <span className="font-display text-[10px] text-ivory/30">IG</span>
            </div>
          ))}
        </div>

        <a
          href="https://www.instagram.com/irei.sensei/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block border border-hinomaru px-7 py-3 font-display text-sm font-bold uppercase tracking-[0.12em] text-hinomaru transition hover:bg-hinomaru hover:text-ivory"
        >
          Ver @irei.sensei
        </a>
      </div>
    </section>
  );
}
