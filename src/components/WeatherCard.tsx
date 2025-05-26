import WeatherIndicators from "./WeatherIndicators";
import WeatherIcon from "./WeatherIcons";
import { LocationBadge, RainBadge } from "./WeatherBadges";
import { getTemperatureColor } from "../lib/weather-utils";

interface WeatherCardProps {
  day: string;
  date: string;
  tempMin: number;
  tempMax: number;
  condition: string;
  icon: string;
  location?: string;
  weather_icon?: string;
  humidity?: number;
  wind_speed?: number;
  rain?: boolean;
}

export default function WeatherCard({
  day,
  date,
  tempMin,
  tempMax,
  condition,
  icon,
  location,
  weather_icon,
  humidity,
  wind_speed,
  rain,
}: WeatherCardProps) {
  return (
    <div className="group relative cursor-pointer transition-transform duration-500 hover:scale-[1.02]">
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 transition-all duration-500 hover:bg-white/15 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

        {/* Badges */}
        {location && <LocationBadge location={location} />}
        {rain && <RainBadge />}

        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-white/90 font-medium text-sm">{day}</p>
          <p className="text-white/60 text-xs mt-1">{date}</p>
        </div>

        {/* Weather Icon */}
        <div className="flex justify-center mb-6">
          <WeatherIcon
            icon={icon}
            condition={condition}
            weather_icon={weather_icon}
          />
        </div>

        {/* Temperatures */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm font-medium">Máx</span>
            <span
              className={`text-xl font-bold ${getTemperatureColor(tempMax)}`}
            >
              {Math.round(tempMax)}°
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm font-medium">Mín</span>
            <span
              className={`text-lg font-semibold ${getTemperatureColor(
                tempMin,
                true
              )}`}
            >
              {Math.round(tempMin)}°
            </span>
          </div>
        </div>

        {/* Weather Indicators */}
        <WeatherIndicators humidity={humidity} wind_speed={wind_speed} />

        {/* Condition */}
        <div className="mt-4 pt-3 border-t border-white/20">
          <p className="text-white/80 text-center text-sm font-medium capitalize">
            {condition}
          </p>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
}
