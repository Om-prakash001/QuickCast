import { useState, useEffect } from "react";
import { getWeatherByCity, getWeatherByCoords } from "../services/WeatherService";

export function useWeather(initialCity = "New Delhi", initialUnits = "metric") {
  const [city, setCity] = useState(initialCity);
  const [units, setUnits] = useState(initialUnits);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  // Fetch weather by city
  const fetchCity = async (cityName) => {
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
  };

  // Fetch weather by coords
  const fetchCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const weather = await getWeatherByCoords(lat, lon, units);
      setData(weather);
      setCity(weather.name);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
      setData(null);
    }
    setLoading(false);
  };

  // Geolocation handler
  const fetchByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchCoords(pos.coords.latitude, pos.coords.longitude),
      (err) => setError(err.message)
    );
  };

  // Fetch on city or units change
  useEffect(() => {
    fetchCity(city);
  }, [city, units]);

  const toggleUnits = () => setUnits(u => (u === "metric" ? "imperial" : "metric"));

  return {
    city,
    setCity,
    units,
    toggleUnits,
    data,
    loading,
    error,
    lastUpdated,
    setQueryCity: setCity,
    fetchByLocation,
  };
}
