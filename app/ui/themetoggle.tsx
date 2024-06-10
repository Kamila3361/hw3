"use client";
import { useTheme } from "../context/theme";

export default function Themetoggle (){
    const { theme, toggleTheme } = useTheme();

    return (
      <button onClick={toggleTheme} className="px-4 py-2 bg-blue-500 text-white rounded">
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    );
}
