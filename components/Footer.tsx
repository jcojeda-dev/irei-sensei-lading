const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Programas", href: "#programas" },
  { label: "Método", href: "#metodo" },
  { label: "Sobre Irei", href: "#sobre-irei" },
  { label: "Resultados", href: "#resultados" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-[#121212] border-t border-white/10 py-6 text-ivory/60 font-display text-[11px]">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 px-6 md:px-12">
        <div className="flex flex-wrap items-center gap-6">
          <a href="https://wa.me/51947864029" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-ivory">
            <span className="text-hinomaru">💬</span> [WHATSAPP] +51 947 864 029
          </a>
          <a href="mailto:isamuirei@gmail.com" className="flex items-center gap-1.5 hover:text-ivory">
            <span className="text-hinomaru">✉</span> [EMAIL] isamuirei@gmail.com
          </a>
          <span className="flex items-center gap-1.5">
            <span className="text-hinomaru">📍</span> [UBICACIÓN] San Miguel, Lima - Perú
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com/irei.sensei/" target="_blank" rel="noopener noreferrer" className="hover:text-ivory text-hinomaru font-bold">
            @irei.sensei
          </a>
          <span>© 2024 Irei Sensei. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
