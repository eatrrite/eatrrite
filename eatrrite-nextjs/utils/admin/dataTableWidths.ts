/** Scale column widths so they always total exactly 100%. */
export function normalizeColumnWidths(widths: number[]): number[] {
  const total = widths.reduce((sum, width) => sum + width, 0);
  if (total <= 0) {
    const even = 100 / Math.max(widths.length, 1);
    return widths.map(() => even);
  }
  return widths.map((width) => (width / total) * 100);
}
