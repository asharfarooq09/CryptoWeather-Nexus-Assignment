"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchCryptoDetail } from "@/utils/api";
import useLoading from "@/hooks/useLoading";
import Spinner from "@/components/Spinner";
import { useFavorites } from "@/hooks/useFavorites";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

export default function CryptoDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { loading, startLoading, stopLoading } = useLoading();
  const { isCryptoFavorite, toggleCrypto } = useFavorites();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        startLoading();
        const res = await fetchCryptoDetail(id);
        setData(res);
      } catch (error) {
        console.error("Error fetching crypto details:", error);
      } finally {
        stopLoading();
      }
    };

    fetchDetails();
  }, [id]);

  if (loading || !data) return <Spinner message="Loading Crypto..." />;

  const priceHistory = {
    labels: ["1D", "2D", "3D", "4D", "5D", "6D", "7D"].reverse(),
    datasets: [
      {
        label: "Price (USD)",
        data: [
          data.market_data.current_price.usd * 0.95,
          data.market_data.current_price.usd * 0.97,
          data.market_data.current_price.usd * 0.93,
          data.market_data.current_price.usd * 0.98,
          data.market_data.current_price.usd * 1.02,
          data.market_data.current_price.usd * 0.99,
          data.market_data.current_price.usd,
        ].reverse(),
        borderColor: "#60A5FA",
        backgroundColor: "rgba(96, 165, 250, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
          callback: (value) => "$" + value.toLocaleString(),
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
    },
    interaction: {
      intersect: false,
    },
  };

  return (
    <div className="min-h-screen bg-[#0f1123] text-white px-4 py-8">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-5xl">
              {getCryptoIcon(data.symbol.toUpperCase())}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold text-white">{data.name}</h1>
                <button
                  onClick={() => toggleCrypto(id)}
                  className="text-3xl transition-all duration-300 hover:scale-110 focus:outline-none"
                >
                  {isCryptoFavorite(id) ? (
                    <span className="text-yellow-400">★</span>
                  ) : (
                    <span className="text-gray-400 hover:text-yellow-400">
                      ☆
                    </span>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-md">
                  {data.symbol.toUpperCase()}
                </span>
                <span className="text-sm font-medium text-purple-400 bg-purple-400/10 px-2 py-1 rounded-md">
                  Rank #{data.market_cap_rank}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-4xl font-bold">
              ${data.market_data.current_price.usd.toLocaleString()}
            </div>
            <div
              className={`text-lg font-semibold ${
                data.market_data.price_change_percentage_24h >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {data.market_data.price_change_percentage_24h >= 0 ? "↗" : "↘"}{" "}
              {Math.abs(data.market_data.price_change_percentage_24h).toFixed(
                2
              )}
              %<span className="text-gray-400 text-sm ml-1">24h</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1a1c35] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Price Chart</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-sm">
                  7D
                </button>
                <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 text-sm">
                  1M
                </button>
                <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 text-sm">
                  1Y
                </button>
              </div>
            </div>
            <div className="h-[300px]">
              <Line data={priceHistory} options={chartOptions} />
            </div>
          </div>

          <div className="bg-[#1a1c35] rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-4">Market Stats</h3>
            <div className="space-y-6">
              <table className="w-full">
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="py-3 text-gray-400">Market Cap</td>
                    <td className="py-3 text-right text-white font-semibold">
                      {formatNumber(data.market_data.market_cap.usd)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-400">24h Volume</td>
                    <td className="py-3 text-right text-white font-semibold">
                      {formatNumber(data.market_data.total_volume.usd)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-400">24h High</td>
                    <td className="py-3 text-right text-green-400 font-semibold">
                      ${data.market_data.high_24h.usd.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-400">24h Low</td>
                    <td className="py-3 text-right text-red-400 font-semibold">
                      ${data.market_data.low_24h.usd.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-400">Circulating Supply</td>
                    <td className="py-3 text-right text-white font-semibold">
                      {data.market_data.circulating_supply.toLocaleString()}{" "}
                      {data.symbol.toUpperCase()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-400">Max Supply</td>
                    <td className="py-3 text-right text-white font-semibold">
                      {data.market_data.max_supply
                        ? data.market_data.max_supply.toLocaleString()
                        : "∞"}{" "}
                      {data.symbol.toUpperCase()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-2 bg-[#1a1c35] rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-4">About {data.name}</h3>
            <div
              className="text-gray-300 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{
                __html: data.description.en,
              }}
            />
          </div>

          <div className="bg-[#1a1c35] rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-4">Links & Resources</h3>
            <div className="space-y-4">
              {data.links?.homepage?.[0] && (
                <a
                  href={data.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <span className="text-gray-400">Website</span>
                  <span className="text-blue-400">↗</span>
                </a>
              )}
              {data.links?.blockchain_site?.[0] && (
                <a
                  href={data.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <span className="text-gray-400">Explorer</span>
                  <span className="text-blue-400">↗</span>
                </a>
              )}
              {data.links?.official_forum_url?.[0] && (
                <a
                  href={data.links.official_forum_url[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <span className="text-gray-400">Forum</span>
                  <span className="text-blue-400">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
