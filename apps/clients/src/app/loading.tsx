export default function Loading() {
  return (
    <div className="statepage" role="status" aria-live="polite">
      <span className="spinner" aria-hidden />
      <p>Loading…</p>
    </div>
  );
}
