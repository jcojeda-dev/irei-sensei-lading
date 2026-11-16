"use client";

import { useEffect, useState } from "react";

const PROGRAMAS = [
  { value: "no_se", label: "Aún no lo sé" },
  { value: "hajimete", label: "Hajimete" },
  { value: "tanren", label: "Tanren" },
  { value: "samurai", label: "Samurai" },
];

export default function Contact() {
  const [programa, setPrograma] = useState("no_se");

  // Los botones de los planes avisan aquí cuál eligió la persona.
  useEffect(() => {
    function alElegirPlan(e: Event) {
      const id = (e as CustomEvent<string>).detail;
      if (PROGRAMAS.some((p) => p.value === id)) setPrograma(id);
    }
    window.addEventListener("seleccionar-plan", alElegirPlan);
    return () => window.removeEventListener("seleccionar-plan", alElegirPlan);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nombre = (formData.get("nombre") as string) || "";
    const edad = (formData.get("edad") as string) || "";
    const objetivo = (formData.get("objetivo") as string) || "";
    const experiencia = (formData.get("experiencia") as string) || "";
    const dias = (formData.get("dias") as string) || "";
    const whatsapp = (formData.get("whatsapp") as string) || "";
    const etiquetaPrograma = PROGRAMAS.find((p) => p.value === programa)?.label ?? "Aún no lo sé";

    // Aviso al servidor para que Isamu se entere aunque la persona no termine
    // de enviar el mensaje en WhatsApp. No bloquea ni impide abrir WhatsApp.
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          edad,
          objetivo,
          experiencia,
          dias,
          whatsapp,
          programa,
          // Campo trampa: las personas no lo ven; los bots suelen llenarlo.
          sitio_web: (formData.get("sitio_web") as string) || "",
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* si falla, el flujo de WhatsApp sigue funcionando igual */
    }

    const lines = [
      "Hola Isamu, quiero solicitar mi evaluación.",
      `Nombre: ${nombre}`,
      `Edad: ${edad}`,
      `Objetivo: ${objetivo}`,
      `Experiencia: ${experiencia}`,
      `Días disponibles: ${dias}`,
      `Programa de interés: ${etiquetaPrograma}`,
      `Mi WhatsApp: ${whatsapp}`,
    ];

    const messageText = lines.join("\r\n");
    const encodedUrl = `https://api.whatsapp.com/send?phone=51942181498&text=${encodeURIComponent(messageText)}`;
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
            <p className="text-charcoal/70">WhatsApp: <a href="https://wa.me/51942181498" target="_blank" rel="noopener noreferrer" className="text-hinomaru">+51 942 181 498</a></p>
            <p className="text-charcoal/70">Instagram: <a href="https://www.instagram.com/isamuirei" target="_blank" rel="noopener noreferrer" className="text-hinomaru">@isamuirei</a></p>
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
                maxLength={field.type === "number" ? undefined : 200}
                className="w-full border-b border-charcoal/25 bg-transparent py-2.5 font-serif text-charcoal outline-none transition focus:border-hinomaru"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="programa"
              className="mb-1.5 block font-display text-[11px] uppercase tracking-[0.12em] text-charcoal/55"
            >
              Programa de interés
            </label>
            <select
              id="programa"
              name="programa"
              value={programa}
              onChange={(e) => setPrograma(e.target.value)}
              className="w-full border-b border-charcoal/25 bg-transparent py-2.5 font-serif text-charcoal outline-none transition focus:border-hinomaru"
            >
              {PROGRAMAS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Campo trampa anti-bots: oculto para personas. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="sitio_web">No llenar este campo</label>
            <input id="sitio_web" name="sitio_web" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-charcoal px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-ivory transition hover:bg-hinomaru"
          >
            Quiero mi evaluación
          </button>

          <p className="mt-3 text-center font-serif text-[11px] text-charcoal/60">
            🔒 Tus datos están protegidos con cifrado SSL de 256 bits conforme a las políticas de Meta. Al enviar, aceptas que Irei Sensei use tus datos para contactarte. Lee nuestra{" "}
            <a href="/politica-de-privacidad" className="text-hinomaru underline">
              Política de Privacidad
            </a>.
          </p>
        </form>
      </div>
    </section>
  );
}
