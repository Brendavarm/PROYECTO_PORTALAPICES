const formatter = new Intl.NumberFormat('es-BO', {
  style: 'currency',
  currency: 'BOB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Formatea montos en bolivianos (Bs). */
export function formatBs(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value)) return 'Bs 0';
  return formatter.format(value);
}
