import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidad | Irei Sensei Personal Training",
  description: "Política de Privacidad y protección de datos con cifrado SSL/TLS de 256 bits conforme a los estándares de Meta y la ley de protección de datos personales.",
};

export default function PoliticaDePrivacidad() {
  return (
    <main className="min-h-screen bg-charcoal text-ivory">
      <Navbar />

      <article className="mx-auto max-w-4xl px-6 py-28 md:px-12 md:py-36">
        {/* Cabecera */}
        <div className="border-b border-white/10 pb-8">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-hinomaru">
            PROTECCIÓN DE DATOS Y SEGURIDAD
          </p>
          <h1 className="mt-3 font-display text-3xl font-black uppercase leading-tight md:text-5xl">
            Política de Privacidad
          </h1>
          <p className="mt-4 font-serif text-sm italic text-ivory/60">
            Última actualización: Septiembre 2026. Conforme a los estándares de seguridad de Meta (Facebook/Instagram) y regulación internacional.
          </p>
        </div>

        {/* Banner de Cifrado Meta Compliance */}
        <div className="my-8 flex flex-col items-start gap-4 border border-hinomaru/40 bg-graphite/60 p-6 md:flex-row md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hinomaru/20 text-hinomaru">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ivory">
                Tus datos están 100% cifrados
              </h3>
              <p className="font-serif text-xs leading-relaxed text-ivory/75">
                Utilizamos protocolo de cifrado de alta seguridad **SSL/TLS de 256 bits** para proteger toda la información transmitida en nuestra plataforma y formularios de evaluación.
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded bg-hinomaru/30 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-ivory border border-hinomaru/50">
            Meta Compliant
          </span>
        </div>

        {/* Contenido Legal */}
        <div className="space-y-10 font-serif text-sm leading-relaxed text-ivory/80">
          <section>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ivory">
              1. Responsable del Tratamiento de Datos
            </h2>
            <p className="mt-2">
              El responsable del tratamiento de los datos personales recopilados a través de esta plataforma es **Isamu Irei (Irei Sensei Personal Training)**, con correo de contacto directo: <a href="mailto:isamuirei@gmail.com" className="text-hinomaru underline">isamuirei@gmail.com</a> y WhatsApp oficial: <a href="https://wa.me/51942181498" target="_blank" rel="noopener noreferrer" className="text-hinomaru underline">+51 942 181 498</a> (San Miguel, Lima - Perú).
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ivory">
              2. Datos Recopilados y Finalidad
            </h2>
            <p className="mt-2">
              Recopilamos únicamente la información necesaria que el usuario proporciona de forma voluntaria al solicitar su evaluación de entrenamiento personal:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-ivory/70">
              <li>**Nombre completo**: Para dirigirme de forma personalizada a ti.</li>
              <li>**Edad y Experiencia**: Para evaluar de manera segura tu nivel físico de partida.</li>
              <li>**Objetivo físico y Días disponibles**: Para estructurar una propuesta de entrenamiento a tu medida.</li>
              <li>**Número de WhatsApp y Email**: Para comunicarnos directamente contigo y coordinar tu evaluación.</li>
            </ul>
            <p className="mt-3">
              **Finalidad exclusiva**: Los datos recopilados se utilizan únicamente para la gestión de consultas, evaluación inicial física, seguimiento de alumnos y envío de propuestas personalizadas de entrenamiento. **No vendemos, alquilamos ni cedemos tus datos personales a terceros bajo ninguna circunstancia.**
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ivory">
              3. Cifrado y Medidas de Seguridad (Estándar Meta)
            </h2>
            <p className="mt-2">
              En cumplimiento estricto con los requerimientos de seguridad exigidos por las plataformas de Meta (Facebook Ads, Instagram Ads y WhatsApp Business API):
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-ivory/70">
              <li>Toda la transferencia de datos entre tu dispositivo y nuestros servidores está protegida mediante **cifrado SSL/TLS de 256 bits**.</li>
              <li>Los mensajes enviados vía WhatsApp se procesan a través de protocolos con cifrado de extremo a extremo.</li>
              <li>Implementamos controles de acceso restrictivos para garantizar la confidencialidad, integridad y disponibilidad de la información almacenada.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ivory">
              4. Cookies y Meta Pixel
            </h2>
            <p className="mt-2">
              Este sitio web utiliza cookies y herramientas de análisis como **Meta Pixel** para medir la efectividad de nuestras campañas publicitarias en Facebook e Instagram y optimizar la experiencia de navegación. Puedes configurar o desactivar el uso de cookies en cualquier momento desde las opciones de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ivory">
              5. Derechos ARCO (Acceso, Rectificación, Cancelación y Eliminación)
            </h2>
            <p className="mt-2">
              Tienes derecho a acceder, rectificar, actualizar o solicitar la **eliminación total de tus datos personales** de nuestros registros en cualquier momento.
            </p>
            <p className="mt-2">
              Para solicitar la eliminación o modificación de tus datos, solo debes enviar un mensaje con el asunto *"Solicitud de eliminación de datos"* a <a href="mailto:isamuirei@gmail.com" className="text-hinomaru underline">isamuirei@gmail.com</a> o escribirnos directamente a nuestro <a href="https://wa.me/51942181498" target="_blank" rel="noopener noreferrer" className="text-hinomaru underline">WhatsApp +51 942 181 498</a>. Responderemos a tu solicitud en un plazo máximo de 24 a 48 horas.
            </p>
          </section>
        </div>

        {/* Botón de Retorno */}
        <div className="mt-14 border-t border-white/10 pt-8 text-center">
          <a
            href="/"
            className="inline-block bg-hinomaru px-8 py-4 font-display text-xs font-bold uppercase tracking-[0.14em] text-ivory transition hover:bg-hinomaru2"
          >
            Volver a Inicio
          </a>
        </div>
      </article>

      <Footer />
    </main>
  );
}
