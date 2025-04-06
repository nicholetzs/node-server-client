import { useState } from "react";
import { Home, Map, Lock, Star, CloudRainIcon } from "lucide-react";
import AtualizarPrevisoes from "./AtualizarPrevisoes";
import { motion } from "framer-motion";
import { WeatherCarousel } from "./WeatherCarousel";

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

  const atualizarPrevisoes = async () => {
    try {
      await fetch("https://whitenights.onrender.com/weatherSave", {
        method: "POST",
      });
    } catch (erro) {
      console.error("Erro ao atualizar previsões:", erro);
    }
  };

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

  // Agrupa as previsões por data e formata os dados
  // Exemplo de agrupamento:
  /* "04/04/2025": [ previsao1, previsao2, ..., previsao7 ],
   "05/04/2025": [ previsao1, ..., previsao8 ]
}*/

  const previsoesAgrupadas = previsoes.reduce(
    (acc: Record<string, Previsao[]>, curr) => {
      const data = new Date(curr.timestamp).toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });

      if (!acc[data]) acc[data] = [];
      acc[data].push(curr);

      return acc;
    },
    {}
  );

  const previsoesAgrupadasPorDia = Object.entries(previsoesAgrupadas)
    .map(([dataPtBr, previsoesDoDia]) => {
      const primeira = previsoesDoDia[0];

      const temperaturas = previsoesDoDia.map((p) => Number(p.temperature));
      const tempMin = Math.min(...temperaturas);
      const tempMax = Math.max(...temperaturas);

      const umidades = previsoesDoDia.map((p) => Number(p.humidity));
      const mediaUmidade =
        umidades.reduce((a, b) => a + b, 0) / umidades.length;

      const ventos = previsoesDoDia.map((p) => Number(p.wind_speed));
      const mediaVento = ventos.reduce((a, b) => a + b, 0) / ventos.length;

      // Usando o timestamp da primeira previsão para criar a data ordenável
      const dateObj = new Date(primeira.timestamp);

      return {
        date: dateObj,
        weekday: dateObj.toLocaleDateString("pt-BR", {
          weekday: "short",
          timeZone: "America/Sao_Paulo",
        }),
        temperature_min: tempMin,
        temperature_max: tempMax,
        average_humidity: Number(mediaUmidade.toFixed(1)),
        average_wind_speed: Number(mediaVento.toFixed(1)),
        condition: primeira.weather,
        icon: primeira.weather_icon,
        location: primeira.location,
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const hoje = new Date();
  const previsaoHoje = previsoesAgrupadasPorDia.find((p) => {
    const dataP = new Date(p.date);
    return (
      dataP.getDate() === hoje.getDate() &&
      dataP.getMonth() === hoje.getMonth() &&
      dataP.getFullYear() === hoje.getFullYear()
    );
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 p-4 md:p-8 flex items-center justify-center">
      {/* Partículas estelares */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl bg-indigo-950/30 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-indigo-800/30">
        {/* Sidebar - Estilo Cósmico */}
        <div className="w-full md:w-64 bg-indigo-950/40 backdrop-blur-md p-6 flex flex-col border-r border-indigo-800/30">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-10 flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-300" />
            Forecast
          </h2>

          <nav className="space-y-6 flex-1">
            <button
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-blue-200 hover:bg-indigo-800/30 transition-colors"
              onClick={() => setActiveTab("home")}
            >
              <Home size={18} />
              <span>Home</span>
            </button>

            <button
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors ${
                activeTab === "daily"
                  ? "bg-blue-500/20 text-blue-100 border-l-2 border-blue-400"
                  : "text-blue-200 hover:bg-indigo-800/30"
              }`}
              onClick={() => setActiveTab("daily")}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-current rounded-sm flex items-center justify-center">
                  <div
                    className={`w-2 h-2 ${
                      activeTab === "daily" ? "bg-blue-300" : "bg-transparent"
                    } rounded-sm`}
                  ></div>
                </div>
              </div>
              <span>Daily</span>
            </button>

            <button
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-blue-200 hover:bg-indigo-800/30 transition-colors"
              onClick={() => setActiveTab("maps")}
            >
              <Map size={18} />
              <span>Maps</span>
            </button>
          </nav>

          {/* Upgrade Card - Estilo Cósmico */}
          <div className="mt-auto pt-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-800/30 backdrop-blur-md rounded-xl p-4 relative overflow-hidden border border-blue-700/30">
              {/* Efeito de Nebulosa */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -left-5 -bottom-5 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>

              <div className="absolute top-4 right-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Lock className="text-white" size={18} />
                  </div>
                  <Star
                    className="text-yellow-300 absolute -top-1 -right-1 animate-pulse"
                    size={14}
                  />
                  <Star
                    className="text-yellow-300 absolute top-2 -right-3 animate-pulse-slow"
                    size={10}
                  />
                </div>
              </div>
              <div className="pt-14 pb-2 relative z-10">
                <p className="text-sm font-medium text-blue-200">
                  Upgrade to{" "}
                  <span className="font-bold text-blue-100">PRO</span> for more
                  features
                </p>

                <button className="mt-3 w-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 text-white py-2 rounded-lg transition-all duration-300 shadow-lg">
                  Upgrade
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-indigo-800/30">
            <div className="text-xs text-blue-200/70 mb-2">
              Observatório Temporal
            </div>
            <div className="font-mono text-sm text-blue-300">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Main Content - Estilo Cósmico */}
        <div className="flex-1 p-6 relative overflow-hidden">
          {/* Efeito de Nebulosa de Fundo */}
          <div className="absolute -right-40 -top-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>

          {/* Cabeçalho Cósmico */}
          <div className="text-center mb-2 w-full relative z-10">
            <div className="flex items-center justify-center gap-3 mb-1">
              <CloudRainIcon className="h-6 w-6 text-blue-300" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Previsão Diária
              </h2>
            </div>
            <p className="text-sm text-blue-200/80 italic">
              (dados em blocos de 3h) da API OpenWeather
            </p>
          </div>

          {/* Tempo atual - Estilo Cósmico */}
          {previsaoHoje && (
            <div className="text-center mb-8 relative z-10">
              {/* Local e horário */}
              <h2 className="text-xl text-white mb-1">
                {previsaoHoje.location}
              </h2>
              <p className="text-sm text-blue-200/70 mb-2">
                {previsaoHoje.date.toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  timeZone: "America/Sao_Paulo",
                })}
              </p>

              {/* Temperatura central com estilo cósmico */}
              <div className="flex justify-center items-center mb-2">
                <div className="relative">
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
                  <span className="text-7xl font-light text-blue-300">
                    {Math.round(
                      (previsaoHoje.temperature_min +
                        previsaoHoje.temperature_max) /
                        2
                    )}
                  </span>
                  <span className="text-xl align-top text-blue-300">°C</span>
                </div>
              </div>

              {/* Descrição do clima */}
              <p className="text-blue-200 capitalize">
                {previsaoHoje.condition}
              </p>

              {/* Informações adicionais */}
              <div className="flex justify-center gap-8 mt-4 text-sm text-blue-200">
                <div className="text-center">
                  <p>Min: {Math.round(previsaoHoje.temperature_min)}°C</p>
                  <p>Max: {Math.round(previsaoHoje.temperature_max)}°C</p>
                  <p>
                    Sensação:{" "}
                    {Math.round(
                      (previsaoHoje.temperature_min +
                        previsaoHoje.temperature_max) /
                        2
                    )}
                    °C
                  </p>
                </div>
                <div className="text-center">
                  <p>
                    Vento: {Math.round(previsaoHoje.average_wind_speed)} km/h
                  </p>
                  <p>Umidade: {Math.round(previsaoHoje.average_humidity)}%</p>
                  <p>Chuva: —</p>
                </div>
              </div>
            </div>
          )}

          {/* Daily Section Title - Estilo Cósmico */}
          <div className="flex flex-row justify-between items-center mb-4 relative z-10">
            <h3 className="text-xl font-medium text-blue-200">Diário</h3>

            <div className="flex items-center gap-4">
              <AtualizarPrevisoes
                onAtualizar={buscarPrevisoes}
                loading={loading}
              />

              {/*<button
                className="text-sm text-blue-200/50 hover:text-blue-300 transition-colors"
                onClick={atualizarPrevisoes}
              >
                Chama API (Não autorizado)
              </button>*/}
            </div>
          </div>

          {/* Daily Weather Cards */}
          <div className="w-full overflow-hidden relative z-10">
            <WeatherCarousel previsoes={previsoesAgrupadasPorDia} />
          </div>
        </div>
      </div>
    </div>
  );
}
