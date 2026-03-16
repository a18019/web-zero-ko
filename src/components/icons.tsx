export function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="7"
      viewBox="0 0 14 7"
      fill="none"
      className={className}
    >
      <path d="M1 1L7 6L13 1" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}

export function ChevronUp({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="7"
      viewBox="0 0 14 7"
      fill="none"
      className={className}
    >
      <path d="M1 6L7 1L13 6" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}

export function ArrowLeft() {
  return (
    <svg width="7" height="14" viewBox="0 0 7 14" fill="none">
      <path d="M6 1L1 7L6 13" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}

export function ArrowRight() {
  return (
    <svg width="7" height="14" viewBox="0 0 7 14" fill="none">
      <path d="M1 1L6 7L1 13" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}
