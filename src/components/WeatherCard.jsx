import React from "react";
import { 
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning,
  Gauge, Droplets, Wind, Clock
} from "lucide-react";

export default function WeatherCard({ weather, units, lastUpdated }) {
  if (!weather || !weather.weather) return null;

  const tempUnit = units === "metric" ? "°C" : "°F";

  // Select icon based on weather
  const getWeatherIcon = () => {
    const main = weather.weather[0]?.main.toLowerCase();
    switch (main) {
      case "clear":
        return <Sun className="w-16 h-16 text-yellow-400 mx-auto mb-4" />;
      case "clouds":
        return <Cloud className="w-16 h-16 text-gray-300 mx-auto mb-4" />;
      case "rain":
      case "drizzle":
        return <CloudRain className="w-16 h-16 text-blue-400 mx-auto mb-4" />;
      case "snow":
        return <CloudSnow className="w-16 h-16 text-white mx-auto mb-4" />;
      case "thunderstorm":
        return <CloudLightning className="w-16 h-16 text-yellow-300 mx-auto mb-4" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-400 mx-auto mb-4" />;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-3xl text-center transition transform hover:scale-105">

      {getWeatherIcon()}

      {/* City name */}
      <h2 className="text-3xl font-bold mb-2 text-white">{weather.name}</h2>

      {/* Weather condition */}
      <p className="text-xl mb-1 text-gray-200">{weather.weather[0]?.main}</p>

      {/* Temperature */}
      <p className="text-5xl font-semibold mb-4 text-white">
        {weather.main?.temp}{tempUnit}
      </p>

      {/* Details Row with Icons */}
      <div className="flex flex-col md:flex-row justify-around text-sm text-gray-300 mt-4 gap-4">
        
        {/* Feels Like */}
        <div className="flex items-center gap-2 justify-center">
          <Gauge className="w-5 h-5 text-yellow-300" />
          <p>Feels: {weather.main?.feels_like}{tempUnit}</p>
        </div>

        {/* Humidity */}
        <div className="flex items-center gap-2 justify-center">
          <Droplets className="w-5 h-5 text-blue-300" />
          <p>Humidity: {weather.main?.humidity}%</p>
        </div>

        {/* Wind */}
        <div className="flex items-center gap-2 justify-center">
          <Wind className="w-5 h-5 text-green-300" />
          <p>Wind: {weather.wind?.speed} {units === "metric" ? "m/s" : "mph"}</p>
        </div>

      </div>

      {/* Last Updated Time */}
      {lastUpdated && (
        <p className="text-gray-300 text-xs mt-5 flex justify-center items-center gap-1">
          <Clock size={14} />
          Last updated: {lastUpdated}
        </p>
      )}

    </div>
  );
}
