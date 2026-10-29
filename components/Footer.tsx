import Enso from "./Enso";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Programas", href: "#programas" },
  { label: "Método", href: "#metodo" },
  { label: "Sobre Irei", href: "#sobre-irei" },
  { label: "Resultados", href: "#resultados" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] border-t border-white/10 py-10 text-ivory/60 font-display text-[11px]">
      <div className="mx-auto max-w-content px-6 md:px-12">
        {/* Logo con Ensō rojo centrado detrás */}
        <div className="mb-8 flex flex-col items-center justify-between gap-6 border-b border-white/10 pb-8 md:flex-row">
          <div className="relative flex items-center justify-center">
            <Enso
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 text-hinomaru opacity-55 z-0"
              static
            />
            <img
              src="/images/IREI_SENSEI_LOGO_PRINCIPAL.png"
              alt="IREI SENSEI"
              className="relative z-10 h-12 w-auto object-contain drop-shadow md:h-14"
            />
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-ivory/70 transition hover:text-ivory uppercase tracking-widest text-[11px]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact info & legal */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <a href="https://wa.me/51942181498" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-ivory">
              <span className="text-hinomaru">💬</span> [WHATSAPP] +51 942 181 498
            </a>
            <a href="mailto:isamuirei@gmail.com" className="flex items-center gap-1.5 hover:text-ivory">
              <span className="text-hinomaru">✉</span> [EMAIL] isamuirei@gmail.com
            </a>
            <span className="flex items-center gap-1.5">
              <span className="text-hinomaru">📍</span> [UBICACIÓN] San Miguel, Lima - Perú
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="/politica-de-privacidad" className="hover:text-ivory text-ivory/70 underline flex items-center gap-1">
              <span>🔒</span> Política de Privacidad (Datos Cifrados)
            </a>
            <a href="https://www.instagram.com/irei.sensei/" target="_blank" rel="noopener noreferrer" className="hover:text-ivory text-hinomaru font-bold">
              @irei.sensei
            </a>
            <span>© {currentYear} Irei Sensei. Todos los derechos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
