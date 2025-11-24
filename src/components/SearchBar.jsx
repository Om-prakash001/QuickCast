import React from "react";

export default function SearchBar({ query, setQuery, submitSearch }) {
  return (
    <form
      onSubmit={submitSearch}
      className="mb-6 flex flex-col md:flex-row gap-3 w-full max-w-3xl"
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city (e.g. Mumbai, London)"
        className="flex-1 px-4 py-2 rounded-xl bg-white/20 placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white shadow-md"
      >
        Search
      </button>
    </form>
  );
}
