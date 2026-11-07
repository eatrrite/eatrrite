import { NextResponse } from "next/server";

// Short helpers so every API route answers in the same shape.
export const ok = <T extends object>(data: T) => NextResponse.json({ ok: true, ...data });

export const fail = (message: string, status = 400) =>
  NextResponse.json({ ok: false, error: message }, { status });
