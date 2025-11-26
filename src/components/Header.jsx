import React from "react";
import { CloudSun, Thermometer, MapPin } from "lucide-react";

export default function Header({ units, toggleUnits, useLocation }) {
  return (
    <header className="mb-8 flex flex-col md:flex-row items-center justify-between w-full max-w-3xl mx-auto px-4">
      
      <div className="flex items-center gap-3 mb-4 md:mb-0">
        <CloudSun className="w-10 h-10 text-yellow-400" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          QuickCast
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleUnits}
          className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl hover:bg-white/20 transition text-white"
        >
          <Thermometer size={18} />
          <span className="font-semibold">{units === "metric" ? "°C" : "°F"}</span>
        </button>

        <button
          onClick={useLocation}
          className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition text-white"
        >
          <MapPin size={18} />
          <span className="font-semibold">Use current location</span>
        </button>
      </div>
    </header>
  );
}
