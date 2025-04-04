"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "@/redux/slice/weatherSlice";
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

const getWindDirection = (deg) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(deg / 45) % 8];
};

export default function WeatherDetailPage() {
  const { city } = useParams();
  const dispatch = useDispatch();
  const { isCityFavorite, toggleCity } = useFavorites();
  const weatherData = useSelector((state) => state.weather.data[city]);
  const reduxLoading = useSelector((state) => state.weather.loading);

  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (!weatherData && city) {
      startLoading();
      dispatch(getWeather(city)).finally(stopLoading);
    }
  }, [city, dispatch, weatherData]);

  if (loading || reduxLoading || !weatherData) {
    return <Spinner message={`Loading weather for ${city}...`} />;
  }

  const temp = weatherData.main?.temp;
  const tempColor = getTemperatureColor(temp);
  const weatherIcon = getWeatherIcon(weatherData.weather?.[0]?.main);

  const chartData = {
    labels: [
      "00:00",
      "03:00",
      "06:00",
      "09:00",
      "12:00",
      "15:00",
      "18:00",
      "21:00",
    ],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [19, 18, 17, 20, 23, 25, 22, 20],
        borderColor: "#60A5FA",
        backgroundColor: "rgba(96, 165, 250, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Feels Like (°C)",
        data: [18, 17, 16, 19, 24, 26, 21, 19],
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
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
  };

  return (
    <div className="min-h-screen bg-[#0f1123] text-white px-4 py-8">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-5xl">
              {weatherIcon}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold text-white">
                  {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
                </h1>
                <button
                  onClick={() => toggleCity(city)}
                  className="text-3xl transition-all duration-300 hover:scale-110 focus:outline-none"
                >
                  {isCityFavorite(city) ? (
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
                  {weatherData.weather?.[0]?.main}
                </span>
                <span className="text-sm font-medium text-gray-400">
                  Last updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-6xl font-bold ${tempColor}`}>{temp}°C</div>
            <div className="text-gray-400 mt-2">
              Feels like {weatherData.main?.feels_like}°C
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1a1c35] rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-4">Temperature Trend</h3>
            <div className="h-[300px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-[#1a1c35] rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-4">Weather Details</h3>
            <div className="space-y-6">
              <table className="w-full">
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="py-3 text-gray-400">Humidity</td>
                    <td className="py-3 text-right text-white font-semibold">
                      {weatherData.main?.humidity}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-400">Wind Speed</td>
                    <td className="py-3 text-right text-white font-semibold">
                      {weatherData.wind?.speed} m/s
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-400">Wind Direction</td>
                    <td className="py-3 text-right text-white font-semibold">
                      {getWindDirection(weatherData.wind?.deg)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-400">Pressure</td>
                    <td className="py-3 text-right text-white font-semibold">
                      {weatherData.main?.pressure} hPa
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-400">Visibility</td>
                    <td className="py-3 text-right text-white font-semibold">
                      {(weatherData.visibility / 1000).toFixed(1)} km
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-400">Cloud Cover</td>
                    <td className="py-3 text-right text-white font-semibold">
                      {weatherData.clouds?.all}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-3 bg-[#1a1c35] rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-4">3-Hour Forecast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-xl p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-sm text-gray-400">
                    {chartData.labels[i]}
                  </div>
                  <div className="text-2xl my-2">
                    {getWeatherIcon(weatherData.weather?.[0]?.main)}
                  </div>
                  <div className="text-lg font-semibold">
                    {chartData.datasets[0].data[i]}°C
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
