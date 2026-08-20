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
    <footer className="bg-charcoal py-14">
      <div className="mx-auto max-w-content px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
          <div>
            <img
              src="/images/IREI_SENSEI_LOGO_PRINCIPAL.png"
              alt="IREI SENSEI Personal Trainer"
              className="h-10 w-auto object-contain"
            />
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-display text-xs uppercase tracking-[0.1em] text-ivory/55 hover:text-ivory"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="https://www.instagram.com/irei.sensei/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xs uppercase tracking-[0.1em] text-hinomaru"
          >
            @irei.sensei
          </a>
        </div>

        <p className="mt-8 font-serif text-sm italic text-ivory/40">
          Entrena tu cuerpo. Forja tu disciplina.
        </p>
      </div>
    </footer>
  );
}
