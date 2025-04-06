export const getIconFromCondition = (condition: string): string => {
  const normalizedCondition = condition
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const conditionMap: Record<string, string> = {
    // Céu limpo
    "ceu limpo": "sunny",

    // Nuvens
    "algumas nuvens": "partly-sunny",
    "nuvens dispersas": "partly-sunny",
    nublado: "cloudy",

    // Condições de chuva com diferentes intensidades
    "chuva leve": "light-rain",
    garoa: "light-rain",
    chuvisco: "light-rain",
    "light rain": "light-rain",
    drizzle: "light-rain",

    "chuva moderada": "moderate-rain",
    chuva: "moderate-rain",
    rain: "moderate-rain",
    "moderate rain": "moderate-rain",

    "chuva forte": "heavy-rain",
    temporal: "heavy-rain",
    "heavy rain": "heavy-rain",
    downpour: "heavy-rain",
  };

  for (const key in conditionMap) {
    if (normalizedCondition.includes(key)) {
      return conditionMap[key];
    }
  }

  return "partly-sunny";
};
