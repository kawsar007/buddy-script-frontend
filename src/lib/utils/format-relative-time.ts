const UNITS: { limit: number; divisor: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { limit: 60, divisor: 1, unit: 'second' },
  { limit: 3600, divisor: 60, unit: 'minute' },
  { limit: 86400, divisor: 3600, unit: 'hour' },
  { limit: 604800, divisor: 86400, unit: 'day' },
  { limit: 2629800, divisor: 604800, unit: 'week' },
  { limit: 31557600, divisor: 2629800, unit: 'month' },
];

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

/** "5 minutes ago", "2 hours ago", falling back to a plain date beyond ~1 year. */
export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const seconds = Math.round((date.getTime() - Date.now()) / 1000);
  const absSeconds = Math.abs(seconds);

  for (const { limit, divisor, unit } of UNITS) {
    if (absSeconds < limit) {
      return rtf.format(Math.round(seconds / divisor), unit);
    }
  }

  return date.toLocaleDateString();
}
