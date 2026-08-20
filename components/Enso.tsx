type EnsoProps = {
  className?: string;
  static?: boolean;
};

export default function Enso({ className = "", static: isStatic = false }: EnsoProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M120 24c47 0 92 30 92 88 0 40-24 74-58 92-10 5-14-3-6-10 30-18 48-48 48-82 0-50-38-76-76-76-46 0-84 32-84 82 0 36 20 62 48 76 9 5 5 13-5 10-40-16-65-50-65-88 0-58 48-92 106-92z"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        className={`enso-path ${isStatic ? "enso-static" : ""}`}
      />
    </svg>
  );
}
