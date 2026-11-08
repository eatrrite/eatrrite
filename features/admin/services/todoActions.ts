"use server";

import { assertAdmin } from "@/features/auth/services/session";
import { db } from "@/services/database";
import type { Todo } from "@/types/admin/todo";
import { attempt, type ActionResult } from "@/utils/actionResult";

// The dashboard to-do list. Each action checks the session first.
export async function addTodoAction(todo: Todo): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    const label = todo.label.trim();
    if (!label) throw new Error("Write what needs doing.");
    await db()`insert into er_todos (id, label, done, date) values (${todo.id}, ${label}, ${todo.done}, ${todo.date}::date)`;
    return {};
  }, "Could not add the to-do.");
}

export async function updateTodoAction(id: string, label: string): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    if (!label.trim()) throw new Error("Write what needs doing.");
    await db()`update er_todos set label = ${label.trim()} where id = ${id}`;
    return {};
  }, "Could not update the to-do.");
}

export async function setTodoDoneAction(id: string, done: boolean): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    await db()`update er_todos set done = ${done} where id = ${id}`;
    return {};
  }, "Could not update the to-do.");
}

export async function deleteTodoAction(id: string): Promise<ActionResult> {
  return attempt(async () => {
    await assertAdmin();
    await db()`delete from er_todos where id = ${id}`;
    return {};
  }, "Could not delete the to-do.");
}
