/* ─── Input — editorial underline field ─── */
export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  min,
  max,
}) {
  return (
    <div className="border-b border-royal-border pb-0 pt-2">
      {label && (
        <label htmlFor={name} className="text-[10px] font-medium uppercase tracking-[0.18em] text-royal-muted">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        min={min}
        max={max}
        className="input-field w-full"
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}