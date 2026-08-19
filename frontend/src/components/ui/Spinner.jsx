const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-4",
  lg: "h-12 w-12 border-4",
};

const Spinner = ({ size = "md", label = "Carregando...", className = "" }) => {
  const sizeClass = sizes[size] ?? sizes.md;

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span
        className={`inline-block animate-spin rounded-full border-gray-200 border-t-blue-600 ${sizeClass}`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Spinner;
