import Image from "next/image";

const igPosts = [
  "/images/Irei sensei trainer.jpg",
  "/images/Maria F. despues gym.png",
  "/images/Cesar despues.jpg",
  "/images/Valeria A despues gym.png",
  "/images/Irei sensei trainer 2.jpg",
  "/images/Maria F. Antes del gym.png",
  "/images/Valeria A Antes del gym.png",
];

export default function InstagramSection() {
  return (
    <section className="bg-charcoal py-20 border-t border-white/10">
      <div className="mx-auto max-w-content px-6 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row mb-10">
          <div>
            <h2 className="font-display text-2xl font-black uppercase text-ivory tracking-wider">
              SIGUE EL CAMINO
            </h2>
            <p className="font-display text-xs text-hinomaru tracking-widest mt-1">@irei.sensei</p>
          </div>

          <a
            href="https://www.instagram.com/irei.sensei/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-hinomaru px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.14em] text-ivory transition hover:bg-hinomaru2"
          >
            VER EN INSTAGRAM
          </a>
        </div>

        {/* 7 Image Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {igPosts.map((src, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden border border-white/10 bg-graphite">
              <Image
                src={src}
                alt={`Instagram Post ${i + 1}`}
                fill
                className="object-cover filter contrast-105 transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-hinomaru/20 opacity-0 transition duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
