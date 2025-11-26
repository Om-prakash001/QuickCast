import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Sun, Moon } from "lucide-react";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Apply theme to <html>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const submitSearch = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000); // Mock API call
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start transition-colors duration-500
        bg-gradient-to-br from-indigo-400 via-pink-400 to-purple-400
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900`}
    >
      {/* Theme Toggle */}
      <div className="w-full max-w-3xl flex justify-end p-6">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 transition"
        >
          {theme === "light" ? <Moon className="text-black" /> : <Sun className="text-yellow-400" />}
        </button>
      </div>

      {/* Search Bar */}
      <SearchBar query={query} setQuery={setQuery} submitSearch={submitSearch} isLoading={isLoading} />
    </div>
  );
}
