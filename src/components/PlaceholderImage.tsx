export function PlaceholderImage({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`placeholder-img ${className ?? ""}`.trim()}>
      <span>{label}</span>
    </div>
  );
}
