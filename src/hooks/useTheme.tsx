import { useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";
const KEY = "theme";

const apply = (t: Theme) => {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(t);
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(
    () => (typeof window !== "undefined" && (localStorage.getItem(KEY) as Theme)) || "dark"
  );

  useEffect(() => {
    apply(theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => setTheme(t => (t === "dark" ? "light" : "dark")), []);
  return { theme, toggle, setTheme };
};
