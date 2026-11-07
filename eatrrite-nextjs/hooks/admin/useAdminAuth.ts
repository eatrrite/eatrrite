"use client";

import { useSyncExternalStore } from "react";
import { ADMIN_PASSWORD, ADMIN_SESSION_KEY } from "@/constants/admin/admin";

let cached: boolean | null = null;
const listeners = new Set<() => void>();

function readAuthorized() {
  if (cached === null) {
    cached = sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  }
  return cached;
}

function writeAuthorized(value: boolean) {
  cached = value;
  if (value) sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  else sessionStorage.removeItem(ADMIN_SESSION_KEY);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAdminAuth() {
  const authorized = useSyncExternalStore(
    subscribe,
    readAuthorized,
    () => false,
  );

  const login = (password: string) => {
    if (password !== ADMIN_PASSWORD) return false;
    writeAuthorized(true);
    return true;
  };

  const logout = () => writeAuthorized(false);

  return { authorized, login, logout };
}
