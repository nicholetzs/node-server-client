"use client";

import { motion } from "framer-motion";

interface CurrentWeatherProps {
  forecast: {
    location: string;
    date: Date;
    temperature_min: number;
    temperature_max: number;
    condition: string;
    average_humidity: number;
    average_wind_speed: number;
  };
}

const WeatherIcon = () => (
  <div className="absolute -left-12 top-1/2 -translate-y-1/2">
    <div className="w-16 h-16 flex items-center justify-center">
      <motion.div
        className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full absolute top-1 left-1 shadow-lg shadow-yellow-500/20"
        animate={{
          boxShadow: [
            "0 0 10px 2px rgba(250, 204, 21, 0.3)",
            "0 0 20px 4px rgba(250, 204, 21, 0.4)",
            "0 0 10px 2px rgba(250, 204, 21, 0.3)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
      <motion.div
        className="w-12 h-6 bg-blue-100/80 backdrop-blur-sm rounded-full absolute bottom-1 right-0 shadow-md"
        animate={{ x: [0, 5, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  </div>
);

const WeatherStats = ({
  forecast,
}: {
  forecast: CurrentWeatherProps["forecast"];
}) => (
  <div className="flex justify-center gap-8 mt-4 text-sm text-blue-200">
    <div className="text-center">
      <p>Min: {Math.round(forecast.temperature_min)}°C</p>
      <p>Max: {Math.round(forecast.temperature_max)}°C</p>
      <p>
        Sensação:{" "}
        {Math.round((forecast.temperature_min + forecast.temperature_max) / 2)}
        °C
      </p>
    </div>
    <div className="text-center">
      <p>Vento: {Math.round(forecast.average_wind_speed)} km/h</p>
      <p>Umidade: {Math.round(forecast.average_humidity)}%</p>
      <p>Chuva: —</p>
    </div>
  </div>
);

export default function CurrentWeather({ forecast }: CurrentWeatherProps) {
  const averageTemp = Math.round(
    (forecast.temperature_min + forecast.temperature_max) / 2
  );

  return (
    <div className="text-center mb-8 relative z-10">
      {/* Location and Date */}
      <h2 className="text-xl text-white mb-1">{forecast.location}</h2>
      <p className="text-sm text-blue-200/70 mb-2">
        {forecast.date.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "America/Sao_Paulo",
        })}
      </p>

      {/* Temperature Display */}
      <div className="flex justify-center items-center mb-2">
        <div className="relative">
          <WeatherIcon />
          <span className="text-7xl font-light text-blue-300">
            {averageTemp}
          </span>
          <span className="text-xl align-top text-blue-300">°C</span>
        </div>
      </div>

      {/* Weather Condition */}
      <p className="text-blue-200 capitalize">{forecast.condition}</p>

      {/* Weather Statistics */}
      <WeatherStats forecast={forecast} />
    </div>
  );
}
