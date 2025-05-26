import { useEffect, useState } from "react";

import { WeatherCarousel } from "./WeatherCarousel";
import BuscarPrevisoes from "./BuscarPrevisoes";
import BackgroundParticles from "./BackgroundParticles";
import Sidebar from "./SideBar";
import DashboardHeader from "./DashboardHeader";
import CurrentWeather from "./CurrentWeather";
import {
  getTodayForecast,
  groupForecastsByDay,
} from "../lib/weather-data-utils";

interface Previsao {
  timestamp: string;
  temperature: number;
  temperature_min: number;
  temperature_max: number;
  humidity: number;
  weather: string;
  wind_speed: number;
  rain: boolean;
  location: string;
  weather_icon?: string;
}

export default function WeatherDashboard() {
  const [activeTab, setActiveTab] = useState("daily");
  const [previsoes, setPrevisoes] = useState<Previsao[]>([]);
  const [loading, setLoading] = useState(false);
  const [horaAtual, setHoraAtual] = useState(new Date());

  const buscarPrevisoes = async () => {
    setLoading(true);
    try {
      const resposta = await fetch(
        "https://whitenights.onrender.com/weatherList"
      );
      const dados = await resposta.json();
      setPrevisoes(dados);
    } catch (erro) {
      console.error("Erro ao buscar previsões:", erro);
    } finally {
      setLoading(false);
    }
  };

  const previsoesAgrupadasPorDia = groupForecastsByDay(previsoes);
  const previsaoHoje = getTodayForecast(previsoesAgrupadasPorDia);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraAtual(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 p-4 md:p-8 flex items-center justify-center">
      <BackgroundParticles />

      <div className="w-full max-w-6xl bg-indigo-950/30 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-indigo-800/30">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentTime={horaAtual}
        />

        {/* Main Content */}
        <div className="flex-1 p-6 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute -right-40 -top-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

          <DashboardHeader>
            <div className="flex items-center gap-4">
              <BuscarPrevisoes
                onAtualizar={buscarPrevisoes}
                loading={loading}
              />
            </div>
          </DashboardHeader>

          {previsaoHoje && <CurrentWeather forecast={previsaoHoje} />}

          {/* Weather Carousel */}
          <div className="w-full overflow-hidden relative z-10">
            <WeatherCarousel previsoes={previsoesAgrupadasPorDia} />
          </div>
        </div>
      </div>
    </div>
  );
}
