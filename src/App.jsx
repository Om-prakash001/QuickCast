import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import { useWeather } from "./hook/useWeather";

export default function App() {
  const [query, setQuery] = useState("");
  const {
    units,
    toggleUnits,
    data,
    loading,
    error,
    lastUpdated,
    fetchByLocation,
    setQueryCity,
  } = useWeather("New Delhi");

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setQueryCity(query.trim());
      setQuery("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white flex flex-col items-center justify-center p-4">
      <Header units={units} toggleUnits={toggleUnits} useLocation={fetchByLocation} />
      <SearchBar query={query} setQuery={setQuery} submitSearch={submitSearch} />
      {loading && <Loader />}
      {error && (
        <p className="text-red-400 mt-4 bg-red-900 bg-opacity-20 p-2 rounded-lg">{error}</p>
      )}
      {data && !loading && <WeatherCard weather={data} units={units} />}
      {lastUpdated && <p className="text-gray-300 mt-3 text-sm">Last updated: {lastUpdated}</p>}
    </div>
  );
}
