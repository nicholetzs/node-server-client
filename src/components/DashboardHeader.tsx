import type React from "react";
import { CloudRainIcon } from "lucide-react";

interface DashboardHeaderProps {
  children?: React.ReactNode;
}

export default function DashboardHeader({ children }: DashboardHeaderProps) {
  return (
    <>
      {/* Header */}
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

      {/* Section Title */}
      <div className="flex flex-row justify-between items-center mb-4 relative z-10">
        <h3 className="text-xl font-medium text-blue-200">Diário</h3>
        {children}
      </div>
    </>
  );
}
