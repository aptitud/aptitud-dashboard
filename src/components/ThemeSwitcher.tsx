"use client";

import { useTheme } from "@/context/ThemeContext";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(event.target.value);
    };

    return (
        <div>
            <label htmlFor="theme-select">Select Theme:</label>
            <select id="theme-select" value={theme} onChange={handleChange}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
            </select>
        </div>
    );
}
