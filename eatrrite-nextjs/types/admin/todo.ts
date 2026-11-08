export type Todo = {
  id: string;
  label: string;
  done: boolean;
  /** The India date (YYYY-MM-DD) the to-do belongs to. */
  date: string;
};

export type TodoInput = {
  label: string;
};
