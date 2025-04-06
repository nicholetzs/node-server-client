// components/WeatherCarousel.tsx
import React, { useRef } from "react";
import WeatherCard from "./WeatherCard";
import { getIconFromCondition } from "./utils/GetIconFromCondition";

interface WeatherCarouselProps {
  previsoes: {
    date: Date;
    temperature_min: number;
    temperature_max: number;
    condition: string;
    location: string;
    average_humidity: number;
    average_wind_speed: number;
    weekday: string;
  }[];
}

export const WeatherCarousel: React.FC<WeatherCarouselProps> = ({
  previsoes,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Botões de navegação */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md rounded-full p-2"
      >
        ◀
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md rounded-full p-2"
      >
        ▶
      </button>

      {/* Área de rolagem horizontal */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-4 px-8 scroll-smooth scroll-hidden overflow-y-hidden scrollbar-hide overflow-x-hidden"
      >
        {previsoes.map((dia, index) => (
          <div key={index} className="flex-shrink-0 w-64">
            <WeatherCard
              date={dia.date.toLocaleDateString("pt-BR")}
              tempMin={dia.temperature_min}
              tempMax={dia.temperature_max}
              condition={dia.condition}
              location={dia.location}
              icon={getIconFromCondition(dia.condition)}
              humidity={dia.average_humidity}
              wind_speed={dia.average_wind_speed}
              day={dia.weekday}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
