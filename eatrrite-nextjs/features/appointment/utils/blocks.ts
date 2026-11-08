import type { Block, OccupiedSlot } from "@/features/appointment/types/slots";
import { parseClock, toMinutes } from "@/features/appointment/utils/clock";

// The span one booking occupies: its start plus the call and prep time.
export function blockOf(time: string, blockMinutes: number): Block {
  const start = toMinutes(time);
  return [start, start + blockMinutes];
}

// Touching blocks do not overlap: one may end at the minute the next begins.
export function blocksOverlap(a: Block, b: Block): boolean {
  return a[0] < b[1] && b[0] < a[1];
}

// Two start times clash when their blocks overlap.
export function timesOverlap(timeA: string, timeB: string, blockMinutes: number): boolean {
  return blocksOverlap(blockOf(timeA, blockMinutes), blockOf(timeB, blockMinutes));
}

export function overlapsAny(block: Block, blocks: Block[]): boolean {
  return blocks.some((other) => blocksOverlap(block, other));
}

// Sorts blocks and joins any that overlap or touch.
export function mergeBlocks(blocks: Block[]): Block[] {
  const sorted = [...blocks].sort((a, b) => a[0] - b[0]);
  const merged: Block[] = [];
  for (const block of sorted) {
    const last = merged[merged.length - 1];
    if (last && block[0] <= last[1]) last[1] = Math.max(last[1], block[1]);
    else merged.push([block[0], block[1]]);
  }
  return merged;
}

// The blocks already taken on one date. Rows with an unreadable time are ignored.
export function occupiedBlocks(date: string, occupied: OccupiedSlot[], blockMinutes: number): Block[] {
  const blocks: Block[] = [];
  for (const row of occupied) {
    const time = row.date === date ? parseClock(row.time) : null;
    if (time) blocks.push(blockOf(time, blockMinutes));
  }
  return mergeBlocks(blocks);
}
