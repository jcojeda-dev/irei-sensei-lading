"use client";

export default function Contact() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nombre = (formData.get("nombre") as string) || "";
    const edad = (formData.get("edad") as string) || "";
    const objetivo = (formData.get("objetivo") as string) || "";
    const experiencia = (formData.get("experiencia") as string) || "";
    const dias = (formData.get("dias") as string) || "";
    const whatsapp = (formData.get("whatsapp") as string) || "";

    const message = `Hola Isamu, quiero solicitar mi evaluación.\nNombre: ${nombre}\nEdad: ${edad}\nObjetivo: ${objetivo}\nExperiencia: ${experiencia}\nDías disponibles: ${dias}\nMi WhatsApp: ${whatsapp}`;
    const encodedUrl = `https://wa.me/51947864029?text=${encodeURIComponent(message)}`;
    window.open(encodedUrl, "_blank");
  }

  return (
    <section id="contacto" className="paper-texture-light py-24 text-charcoal md:py-32">
      <div className="mx-auto grid max-w-content gap-14 px-6 md:grid-cols-2 md:gap-20 md:px-12">
        <div>
          <p className="font-serif text-sm uppercase tracking-widest2 text-hinomaru">Contacto</p>
          <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight md:text-4xl">
            Quiero mi evaluación
          </h2>
          <p className="mt-4 max-w-sm font-serif text-charcoal/65">
            Cuéntanos tu objetivo y disponibilidad. Te contactamos para definir tu punto de partida.
          </p>

          <div className="mt-10 space-y-3 border-t border-charcoal/15 pt-6 font-display text-sm">
            <p className="text-charcoal/70">WhatsApp: <a href="https://wa.me/51947864029" target="_blank" rel="noopener noreferrer" className="text-hinomaru">+51 947 864 029</a></p>
            <p className="text-charcoal/70">Instagram: <a href="https://www.instagram.com/irei.sensei/" target="_blank" rel="noopener noreferrer" className="text-hinomaru">@irei.sensei</a></p>
            <p className="text-charcoal/70">Email: <a href="mailto:isamuirei@gmail.com" className="text-hinomaru">isamuirei@gmail.com</a></p>
            <p className="text-charcoal/70">Ubicación: <span className="text-charcoal/40">San Miguel, Lima - Perú</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Nombre", type: "text", name: "nombre" },
            { label: "Edad", type: "number", name: "edad" },
            { label: "Objetivo", type: "text", name: "objetivo" },
            { label: "Experiencia entrenando", type: "text", name: "experiencia" },
            { label: "Días disponibles", type: "text", name: "dias" },
            { label: "WhatsApp", type: "tel", name: "whatsapp" },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-1.5 block font-display text-[11px] uppercase tracking-[0.12em] text-charcoal/55"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                required
                className="w-full border-b border-charcoal/25 bg-transparent py-2.5 font-serif text-charcoal outline-none transition focus:border-hinomaru"
              />
            </div>
          ))}

          <button
            type="submit"
            className="mt-4 w-full bg-charcoal px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-ivory transition hover:bg-hinomaru"
          >
            Quiero mi evaluación
          </button>
        </form>
      </div>
    </section>
  );
}
