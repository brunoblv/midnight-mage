export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="38" fill="#A855F7" />
      <circle cx="66" cy="38" r="34" fill="#08050D" />
      <rect
        x="70"
        y="12"
        width="9"
        height="9"
        fill="#D8B4FE"
        transform="rotate(45 74.5 16.5)"
      />
    </svg>
  );
}
