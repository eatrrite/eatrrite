export type OverlapInput = { id: string; topPx: number; heightPx: number };
export type OverlapSlot = { col: number; cols: number };

/**
 * Side-by-side columns for blocks that overlap in time, so none covers another.
 * Blocks that touch only at an edge do not overlap. Each group of chained overlaps is split
 * into as many equal columns as it needs; a lone block keeps the full width.
 */
export function layoutOverlaps(items: OverlapInput[]): Map<string, OverlapSlot> {
  const sorted = [...items].sort(
    (a, b) => a.topPx - b.topPx || b.heightPx - a.heightPx || a.id.localeCompare(b.id),
  );
  const result = new Map<string, OverlapSlot>();
  let group: { id: string; col: number }[] = [];
  let columnEnds: number[] = [];
  let groupEnd = -Infinity;

  const closeGroup = () => {
    for (const member of group) result.set(member.id, { col: member.col, cols: columnEnds.length });
    group = [];
    columnEnds = [];
  };

  for (const item of sorted) {
    const end = item.topPx + item.heightPx;
    if (group.length && item.topPx >= groupEnd) {
      closeGroup();
      groupEnd = -Infinity;
    }
    let col = columnEnds.findIndex((columnEnd) => columnEnd <= item.topPx);
    if (col === -1) col = columnEnds.length;
    columnEnds[col] = end;
    group.push({ id: item.id, col });
    groupEnd = Math.max(groupEnd, end);
  }
  closeGroup();
  return result;
}

/** Left and width inside a lane of `padPx` side padding, with a small gap between columns. */
export function columnStyle(slot: OverlapSlot | undefined, padPx: number) {
  const { col, cols } = slot ?? { col: 0, cols: 1 };
  const room = `(100% - ${padPx * 2}px)`;
  return {
    left: `calc(${padPx}px + ${room} * ${col} / ${cols})`,
    width: `calc(${room} / ${cols} - ${cols > 1 ? 2 : 0}px)`,
  };
}
