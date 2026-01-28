import { useEffect, useState } from "react";

type Theme = "light" | "dark";

// get user's default theme, from local storage or browser settings
const getDefaultTheme = (): Theme => {
    const savedTheme = localStorage.getItem("theme") ?? "";
    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(getDefaultTheme());

    // update theme in document classes when state updates
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    return {
        theme,
        toggleTheme: () =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    };
}
