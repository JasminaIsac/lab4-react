// src/components/ThemeWrapper.jsx
import { useEffect } from "react";
import { useThemeContext } from "@context/ThemeContext";

const ThemeWrapper = ({ children }) => {
  const { theme } = useThemeContext();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return children;
};

export default ThemeWrapper;
