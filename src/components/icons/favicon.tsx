export function FaviconIcon({
  className,
  width,
  height,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  const size = width || height || 32;
  return (
    <img
      src="/favicon.ico"
      alt="Logo"
      width={size}
      height={size}
      className={className}
    />
  );
}

