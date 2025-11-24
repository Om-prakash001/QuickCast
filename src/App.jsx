import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import { getWeatherByCity, getWeatherByCoords } from "./services/WeatherService";

export default function App() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("New Delhi");
  const [units, setUnits] = useState("metric");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");


  useEffect(() => {
    handleFetchCity(city);
  }, [city, units]);

  async function handleFetchCity(cityName) {
    setLoading(true);
    setError(null);
    try {
      const weather = await getWeatherByCity(cityName, units);
      setData(weather);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
      setData(null);
    }
    setLoading(false);
  }

  function submitSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      setCity(query.trim());
      setQuery("");
    }
  }

  function toggleUnits() {
    setUnits((u) => (u === "metric" ? "imperial" : "metric"));
  }

  function fetchByLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setLoading(true);
        try {
          const weather = await getWeatherByCoords(
            pos.coords.latitude,
            pos.coords.longitude,
            units
          );
          setData(weather);
          setCity(weather.name);
          setLastUpdated(new Date().toLocaleTimeString());
        } catch (err) {
          setError(err.message);
        }
        setLoading(false);
      },
      (err) => setError(err.message)
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white flex flex-col items-center justify-center p-4 ">
      
      {/* HEADER */}
      <Header units={units} toggleUnits={toggleUnits} useLocation={fetchByLocation} />

      {/* SEARCH BAR */}
      <SearchBar query={query} setQuery={setQuery} submitSearch={submitSearch} />

      {/* LOADER */}
      {loading && <Loader />}

      {/* ERROR */}
      {error && (
        <p className="text-red-400 mt-4 bg-red-900 bg-opacity-20 p-2 rounded-lg">
          {error}
        </p>
      )}

      {/* WEATHER CARD */}
      {data && !loading && <WeatherCard weather={data} units={units} />}

      {/* SHOW LAST UPDATED TIME */}
      {lastUpdated && (
        <p className="text-gray-300 mt-3 text-sm">
          Last updated: {lastUpdated}
        </p>
      )}
    </div>
  );
}
