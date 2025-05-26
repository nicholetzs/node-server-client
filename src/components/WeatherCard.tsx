import { Droplets, Wind, MapPin } from "lucide-react";

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
  // Função para determinar a cor da temperatura máxima (mais moderna)
  const getMaxTempColor = (temp: number) => {
    if (temp >= 30) return "text-orange-400";
    if (temp >= 25) return "text-yellow-400";
    if (temp >= 20) return "text-emerald-400";
    if (temp >= 15) return "text-blue-400";
    return "text-indigo-400";
  };

  // Função para determinar a cor da temperatura mínima
  const getMinTempColor = (temp: number) => {
    if (temp >= 25) return "text-orange-300";
    if (temp >= 20) return "text-yellow-300";
    if (temp >= 15) return "text-emerald-300";
    if (temp >= 10) return "text-blue-300";
    return "text-indigo-300";
  };

  // Função para cor da umidade
  const getHumidityColor = (humidity = 50) => {
    if (humidity >= 80) return "bg-blue-500";
    if (humidity >= 60) return "bg-blue-400";
    if (humidity >= 40) return "bg-cyan-400";
    return "bg-teal-400";
  };

  // Função para cor do vento
  const getWindColor = (speed = 10) => {
    if (speed >= 30) return "bg-purple-500";
    if (speed >= 20) return "bg-indigo-400";
    if (speed >= 10) return "bg-blue-400";
    return "bg-cyan-400";
  };

  // Determina se deve mostrar a seção expandida
  const showExpandedSection =
    location ||
    humidity !== undefined ||
    wind_speed !== undefined ||
    rain !== undefined;

  return (
    <div className="group relative">
      {/* Card principal com glassmorphism */}
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 transition-all duration-500 hover:bg-white/15 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
        {/* Gradiente de fundo sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

        {/* Localização com design minimalista */}
        {location && (
          <div className="absolute -top-2 -left-2 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/30">
            <div className="flex items-center gap-1">
              <MapPin size={10} className="text-white/80" />
              <span className="text-[10px] font-medium text-white/90">
                {location}
              </span>
            </div>
          </div>
        )}

        {/* Indicador de chuva moderno */}
        {rain && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500/30 backdrop-blur-sm rounded-full border border-blue-400/50 flex items-center justify-center">
            <div className="w-3 h-3 relative">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-1 bg-blue-300 rounded-full animate-bounce"
                  style={{
                    left: `${i * 1}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Header: Dia e Data */}
        <div className="text-center mb-4">
          <p className="text-white/90 font-medium text-sm">{day}</p>
          <p className="text-white/60 text-xs mt-1">{date}</p>
        </div>

        {/* Ícone do clima moderno */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center relative">
            {weather_icon ? (
              <img
                src={weather_icon}
                alt={condition}
                className="w-12 h-12 object-contain filter drop-shadow-lg"
              />
            ) : (
              <div className="relative">
                {/* Ícones redesenhados de forma mais limpa */}
                {icon === "partly-sunny" && (
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-3 bg-white/80 rounded-full"></div>
                  </div>
                )}

                {icon === "sunny" && (
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse">
                      {/* Raios simplificados */}
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-0.5 h-2 bg-yellow-400 rounded-full"
                          style={{
                            left: "50%",
                            top: "50%",
                            transform: `translate(-50%, -50%) rotate(${
                              i * 45
                            }deg) translateY(-7px)`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {(icon === "light-rain" ||
                  icon === "moderate-rain" ||
                  icon === "rain") && (
                  <div className="relative">
                    <div className="w-10 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-lg"></div>
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{
                          left: `${4 + i * 3}px`,
                          top: "20px",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {icon === "heavy-rain" && (
                  <div className="relative">
                    <div className="w-10 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-lg"></div>
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-3 bg-blue-500 rounded-full animate-bounce"
                        style={{
                          left: `${2 + i * 2}px`,
                          top: "18px",
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {icon === "cloudy" && (
                  <div className="relative">
                    <div className="w-12 h-8 relative">
                      <div className="absolute w-8 h-4 bg-gray-300 rounded-full top-0 left-0"></div>
                      <div className="absolute w-6 h-3 bg-gray-400 rounded-full top-2 right-0"></div>
                      <div className="absolute w-7 h-4 bg-gray-200 rounded-full bottom-0 left-1"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Temperaturas com design limpo */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm font-medium">Máx</span>
            <span className={`text-xl font-bold ${getMaxTempColor(tempMax)}`}>
              {Math.round(tempMax)}°
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm font-medium">Mín</span>
            <span
              className={`text-lg font-semibold ${getMinTempColor(tempMin)}`}
            >
              {Math.round(tempMin)}°
            </span>
          </div>
        </div>

        {/* Detalhes expandidos redesenhados */}
        {showExpandedSection && (
          <div className="border-t border-white/20 pt-4 space-y-3">
            {humidity !== undefined && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets size={14} className="text-blue-400" />
                  <span className="text-white/80 text-sm">Umidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getHumidityColor(
                        humidity
                      )} rounded-full transition-all duration-500`}
                      style={{ width: `${humidity}%` }}
                    />
                  </div>
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
                  <div className="flex items-end gap-0.5 h-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 ${getWindColor(
                          wind_speed
                        )} rounded-sm transition-all duration-300`}
                        style={{
                          height:
                            i < Math.ceil(wind_speed / 10)
                              ? `${Math.min(100, (i + 1) * 20)}%`
                              : "20%",
                          opacity: i < Math.ceil(wind_speed / 10) ? 1 : 0.3,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-white/90 text-sm font-medium min-w-[45px]">
                    {wind_speed} km/h
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Condição do clima */}
        <div className="mt-4 pt-3 border-t border-white/20">
          <p className="text-white/80 text-center text-sm font-medium capitalize">
            {condition}
          </p>
        </div>

        {/* Efeito de hover sutil */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
}
