"use client";

import type { ReactNode } from "react";

/**
 * Botón de cada plan: baja al formulario (#contacto) y le avisa al formulario
 * qué programa eligió la persona, para que quede preseleccionado.
 */
export default function PlanCTA({
  programId,
  className,
  children,
}: {
  programId: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#contacto"
      className={className}
      onClick={() =>
        window.dispatchEvent(new CustomEvent("seleccionar-plan", { detail: programId }))
      }
    >
      {children}
    </a>
  );
}
