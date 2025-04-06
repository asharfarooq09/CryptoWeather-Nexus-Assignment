"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useFavorites } from "@/hooks/useFavorites";
import Spinner from "./Spinner";
import CardWrapper from "./items/CardWrapper";
import GradientButton from "./items/GradientButton";

const getWeatherIcon = (condition) => {
  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
    Drizzle: "🌦️",
    Mist: "🌫️",
    Smoke: "🌫️",
    Haze: "🌫️",
    Dust: "🌫️",
    Fog: "🌫️",
    Sand: "🌫️",
    Ash: "🌫️",
    Squall: "💨",
    Tornado: "🌪️",
  };
  return icons[condition] || "🌡️";
};

const getTemperatureColor = (temp) => {
  if (temp < 0) return "text-blue-500";
  if (temp < 10) return "text-blue-400";
  if (temp < 20) return "text-green-500";
  if (temp < 30) return "text-yellow-500";
  return "text-red-500";
};

export default function WeatherCard({ city }) {
  const { isCityFavorite, toggleCity } = useFavorites();
  const data = useSelector((state) => state.weather.data[city]);
  const loading = useSelector((state) => state.weather.loading[city]);

  if (loading || !data) {
    return <Spinner message={`Loading ${city} weather...`} />;
  }

  const temp = data.main?.temp;
  const tempColor = getTemperatureColor(temp);
  const weatherIcon = getWeatherIcon(data.weather?.[0]?.main);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCity(city);
  };

  return (
    <Link
      href={`/weather/${city}`}
      className="block group w-full sm:w-[380px] shrink-0"
    >
      <CardWrapper>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-3xl">
              {weatherIcon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
              </h3>
              <span className="text-sm font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-md">
                {data.weather?.[0]?.main}
              </span>
            </div>
          </div>
          <button
            onClick={handleFavoriteClick}
            className="text-2xl transition-all duration-300 hover:scale-110 focus:outline-none mt-1"
          >
            {isCityFavorite(city) ? (
              <span className="text-yellow-400">★</span>
            ) : (
              <span className="text-gray-400 group-hover:text-yellow-400">
                ☆
              </span>
            )}
          </button>
        </div>

        {/* Temperature Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className={`text-4xl font-bold ${tempColor}`}>
                {temp}°C
              </span>
            </div>
            <span className="text-sm text-gray-400">Temperature</span>
          </div>

          <div className="flex items-center justify-between py-4 px-4 rounded-xl bg-white/5">
            <span className="text-sm text-gray-400">Humidity</span>
            <span className="text-sm font-semibold text-white">
              {data.main?.humidity}%
            </span>
          </div>
        </div>

        {/* View Button */}
        <div className="mt-6">
          <GradientButton>View Details</GradientButton>
        </div>
      </CardWrapper>
    </Link>
  );
}
