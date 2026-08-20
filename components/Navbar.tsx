"use client";

import { useState } from "react";

import { motion } from "framer-motion";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Programas", href: "#programas" },
  { label: "Método", href: "#metodo" },
  { label: "Sobre Irei", href: "#sobre-irei" },
  { label: "Resultados", href: "#resultados" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-charcoal/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3 md:px-10">
        <a href="#inicio" className="flex items-center gap-3">
          <motion.img
            initial={{ opacity: 0, scale: 0.9, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.06, filter: "brightness(1.15)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            src="/images/IREI_SENSEI_LOGO_PRINCIPAL.png"
            alt="IREI SENSEI Personal Trainer"
            className="h-12 w-auto object-contain md:h-14 lg:h-16 drop-shadow-lg"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-[13px] font-medium uppercase tracking-[0.14em] text-ivory/70 transition hover:text-ivory"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden shrink-0 border border-hinomaru px-5 py-2 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-hinomaru transition hover:bg-hinomaru hover:text-ivory md:inline-block"
        >
          Empieza ahora
        </a>

        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-[1.5px] w-6 bg-ivory transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-[1.5px] w-6 bg-ivory transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-[1.5px] w-6 bg-ivory transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-charcoal px-5 pb-6 md:hidden">
          <nav className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-4 font-display text-sm uppercase tracking-[0.14em] text-ivory/80"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-5 border border-hinomaru px-5 py-3 text-center font-display text-sm font-bold uppercase tracking-[0.14em] text-hinomaru"
            >
              Empieza ahora
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
