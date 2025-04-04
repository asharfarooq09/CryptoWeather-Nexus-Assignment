"use client";
import React from "react";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";

const formatNumber = (num) => {
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`;
  }
  return `$${num.toLocaleString()}`;
};

const getCryptoIcon = (symbol) => {
  const icons = {
    BTC: "₿",
    ETH: "Ξ",
    SOL: "◎",
    USDT: "₮",
    BNB: "Ƀ",
    XRP: "✕",
    ADA: "₳",
    DOGE: "Ð",
    DOT: "●",
  };
  return icons[symbol] || "🪙";
};

export default function CryptoCard({ coin, index, price }) {
  const { toggleCrypto, isCryptoFavorite } = useFavorites();

  const handleFavoriteClick = (e, coinId) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCrypto(coinId);
  };

  return (
    <Link
      href={`/crypto/${coin.id}`}
      className="block group flex-none"
      style={{ width: "380px" }}
    >
      <div
        className="relative h-full bg-[#1a1c35] rounded-3xl p-1 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
        style={{
          animationDelay: `${index * 0.1}s`,
          background:
            "linear-gradient(45deg, rgba(26,28,53,0.9), rgba(17,18,36,0.9))",
        }}
      >
        <div className="absolute inset-0.5 rounded-[22px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative bg-[#1a1c35] rounded-[22px] p-6 h-full">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-3xl text-white/90">
                {getCryptoIcon(coin.symbol.toUpperCase())}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {coin.name}
                </h3>
                <span className="text-sm font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-md">
                  {coin.symbol.toUpperCase()}
                </span>
              </div>
            </div>
            <button
              onClick={(e) => handleFavoriteClick(e, coin.id)}
              className="text-2xl transition-all duration-300 hover:scale-110 focus:outline-none mt-1"
            >
              {isCryptoFavorite(coin.id) ? (
                <span className="text-yellow-400">★</span>
              ) : (
                <span className="text-gray-400 group-hover:text-yellow-400">
                  ☆
                </span>
              )}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">
                  $
                  {price
                    ? parseFloat(price).toFixed(2)
                    : coin.current_price?.toFixed(2) ?? "N/A"}
                </span>
                <div
                  className={`px-2.5 py-1 rounded-lg text-sm font-semibold ${
                    coin.price_change_percentage_24h >= 0
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {coin.price_change_percentage_24h >= 0 ? "↗" : "↘"}{" "}
                  {Math.abs(coin.price_change_percentage_24h?.toFixed(2) ?? 0)}%
                </div>
              </div>
              <span className="text-sm text-gray-400">24h Change</span>
            </div>

            <div className="flex items-center justify-between py-4 px-4 rounded-xl bg-white/5">
              <span className="text-sm text-gray-400">Market Cap</span>
              <span className="text-sm font-semibold text-white">
                {formatNumber(coin.market_cap)}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 p-[1px]">
              <div className="relative bg-[#1a1c35] rounded-xl transition-all duration-300 group-hover:bg-transparent">
                <div className="px-4 py-3 text-center text-white font-medium">
                  View Details
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
