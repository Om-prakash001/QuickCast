export const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "";

export async function getWeatherByCity(city, units = "metric") {
if (!API_KEY) throw new Error("Missing OpenWeather API Key");


const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
city
)}&units=${units}&appid=${API_KEY}`;


const res = await fetch(url);
if (!res.ok) throw new Error("City not found");
return res.json();
}


export async function getWeatherByCoords(lat, lon, units = "metric") {
if (!API_KEY) throw new Error("Missing OpenWeather API Key");


const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;


const res = await fetch(url);
if (!res.ok) throw new Error("Failed to fetch location weather");
return res.json();
}