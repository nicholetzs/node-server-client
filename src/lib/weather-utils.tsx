// Utilitários para cores e cálculos do clima
export const getTemperatureColor = (temp: number, isMin = false) => {
  const colors = isMin
    ? {
        30: "text-orange-300",
        25: "text-yellow-300",
        20: "text-emerald-300",
        15: "text-blue-300",
        default: "text-indigo-300",
      }
    : {
        30: "text-orange-400",
        25: "text-yellow-400",
        20: "text-emerald-400",
        15: "text-blue-400",
        default: "text-indigo-400",
      };

  if (temp >= 30) return colors[30];
  if (temp >= 25) return colors[25];
  if (temp >= 20) return colors[20];
  if (temp >= 15) return colors[15];
  return colors.default;
};

export const getHumidityColor = (humidity: number) => {
  if (humidity >= 80) return "bg-blue-500";
  if (humidity >= 60) return "bg-blue-400";
  if (humidity >= 40) return "bg-cyan-400";
  return "bg-teal-400";
};

export const getWindColor = (speed: number) => {
  if (speed >= 30) return "bg-purple-500";
  if (speed >= 20) return "bg-indigo-400";
  if (speed >= 10) return "bg-blue-400";
  return "bg-cyan-400";
};
