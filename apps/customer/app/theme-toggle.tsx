"use client";

import { useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    const nextTheme = dark ? "light" : "dark";

    document.documentElement.setAttribute(
      "data-theme",
      nextTheme
    );

    setDark(!dark);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-2 text-[var(--color-text)]"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}