export default function Eyebrow({ children }) {
  return (
    <p className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-royal-muted">
      <span className="h-px w-6 bg-royal-muted" />
      {children}
    </p>
  );
}