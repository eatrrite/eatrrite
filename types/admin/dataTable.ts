import type { ReactNode } from "react";

export type DataTableAlign = "left" | "center" | "right";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  /** Column share of the row. Values are normalized to total 100%. */
  width: number;
  align?: DataTableAlign;
  cell: (row: T) => ReactNode;
};
