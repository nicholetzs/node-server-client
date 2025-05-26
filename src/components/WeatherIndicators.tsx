import { Droplets, Wind } from "lucide-react";
import { getHumidityColor, getWindColor } from "../lib/weather-utils";

interface ProgressBarProps {
  value: number;
  colorClass: string;
}

const ProgressBar = ({ value, colorClass }: ProgressBarProps) => (
  <div className="w-12 h-2 bg-white/20 rounded-full overflow-hidden">
    <div
      className={`h-full ${colorClass} rounded-full transition-all duration-500`}
      style={{ width: `${value}%` }}
    />
  </div>
);

interface WindIndicatorProps {
  speed: number;
}

const WindIndicator = ({ speed }: WindIndicatorProps) => (
  <div className="flex items-end gap-0.5 h-3">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`w-1 ${getWindColor(
          speed
        )} rounded-sm transition-all duration-300`}
        style={{
          height:
            i < Math.ceil(speed / 10)
              ? `${Math.min(100, (i + 1) * 20)}%`
              : "20%",
          opacity: i < Math.ceil(speed / 10) ? 1 : 0.3,
        }}
      />
    ))}
  </div>
);

interface WeatherIndicatorsProps {
  humidity?: number;
  wind_speed?: number;
}

export default function WeatherIndicators({
  humidity,
  wind_speed,
}: WeatherIndicatorsProps) {
  if (!humidity && !wind_speed) return null;

  return (
    <div className="border-t border-white/20 pt-4 space-y-3">
      {humidity !== undefined && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets size={14} className="text-blue-400" />
            <span className="text-white/80 text-sm">Umidade</span>
          </div>
          <div className="flex items-center gap-2">
            <ProgressBar
              value={humidity}
              colorClass={getHumidityColor(humidity)}
            />
            <span className="text-white/90 text-sm font-medium min-w-[35px]">
              {humidity}%
            </span>
          </div>
        </div>
      )}

      {wind_speed !== undefined && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind size={14} className="text-cyan-400" />
            <span className="text-white/80 text-sm">Vento</span>
          </div>
          <div className="flex items-center gap-2">
            <WindIndicator speed={wind_speed} />
            <span className="text-white/90 text-sm font-medium min-w-[45px]">
              {wind_speed} km/h
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
