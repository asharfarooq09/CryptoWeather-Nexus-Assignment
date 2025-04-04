"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "@/redux/slice/weatherSlice";
import { getCryptos } from "@/redux/slice/cryptoSlice";
import { getNews } from "@/redux/slice/newsSlice";
import WeatherCard from "@/components/WeatherCard";
import CryptoCard from "@/components/CryptoCard";
import CryptoRow from "@/components/CryptoRow";
import NewsCard from "@/components/NewsCard";
import useWebSocket from "@/hooks/useWebSocket";
import Spinner from "@/components/Spinner";

export default function HomePage() {
  const dispatch = useDispatch();
  useWebSocket();

  const { favorites } = useSelector((state) => state.preferences);
  const cryptoData = useSelector((state) => state.crypto.data);
  const { prices } = useSelector((state) => state.crypto);
  const weatherData = useSelector((state) => state.weather.data);

  const weatherLoading = useSelector((state) => state.weather.loading);
  const cryptoLoading = useSelector((state) => state.crypto.loading);
  const newsLoading = useSelector((state) => state.news.loading);

  useEffect(() => {
    dispatch(getWeather("india"));
    dispatch(getWeather("london"));
    dispatch(getWeather("tokyo"));
    dispatch(getCryptos());
    dispatch(getNews());
  }, [dispatch]);

  const renderFavorites = () => {
    if (favorites.length === 0) {
      return (
        <div className="text-gray-400 text-center py-8">
          No favorites yet. Add some weather locations or cryptocurrencies to
          track them here!
        </div>
      );
    }

    const sortedFavorites = [...favorites].sort(
      (a, b) => b.timestamp - a.timestamp
    );

    return (
      <div className="overflow-x-auto overflow-y-hidden hide-scrollbar">
        <div className="inline-flex gap-8 p-2">
          {sortedFavorites.map((favorite, index) => {
            if (favorite.type === "weather") {
              return (
                <WeatherCard
                  key={`weather-${favorite.id}`}
                  city={favorite.id}
                />
              );
            } else if (favorite.type === "crypto") {
              const coin = cryptoData.find((c) => c.id === favorite.id);
              if (!coin) return null;
              return (
                <CryptoCard
                  key={`crypto-${favorite.id}`}
                  coin={coin}
                  index={index}
                  price={prices[coin.id]}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#0f1123] text-white">
      <div className="max-w-[1920px] mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4 gradient-text">
          🌍 CryptoWeather Nexus
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Your one-stop dashboard for weather and crypto updates
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 px-2 flex items-center gap-2">
              <span className="text-amber-400">⭐</span> Favorites
            </h2>
            <div className="relative">{renderFavorites()}</div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 px-2 flex items-center gap-2">
              <span className="text-blue-400">🌤</span> Weather Updates
            </h2>
            <div className="relative">
              <div className="overflow-x-auto overflow-y-hidden hide-scrollbar">
                <div className="inline-flex gap-8 p-2">
                  <WeatherCard city="india" />
                  <WeatherCard city="london" />
                  <WeatherCard city="tokyo" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 px-2 flex items-center gap-2">
              <span className="text-yellow-400">💰</span> Crypto Market
            </h2>
            <CryptoRow />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 px-2 flex items-center gap-2">
              <span className="text-purple-400">📰</span> Latest News
            </h2>
            {newsLoading ? (
              <Spinner message="Fetching latest crypto news..." />
            ) : (
              <NewsCard />
            )}
          </section>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .gradient-text {
          background: linear-gradient(to right, #60a5fa, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </main>
  );
}
