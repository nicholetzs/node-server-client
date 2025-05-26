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

export const groupForecastsByDay = (previsoes: Previsao[]) => {
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

  return Object.entries(previsoesAgrupadas)
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
};

export const getTodayForecast = (previsoesAgrupadasPorDia: any[]) => {
  const hoje = new Date();
  return previsoesAgrupadasPorDia.find((p) => {
    const dataP = new Date(p.date);
    return (
      dataP.getDate() === hoje.getDate() &&
      dataP.getMonth() === hoje.getMonth() &&
      dataP.getFullYear() === hoje.getFullYear()
    );
  });
};
