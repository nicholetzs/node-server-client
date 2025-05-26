"use client";

import { Home, Map, Star } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentTime: Date;
}

const NavigationButton = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: {
  icon: any;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-500/20 text-blue-100 border-l-2 border-blue-400"
        : "text-blue-200 hover:bg-indigo-800/30"
    }`}
    onClick={onClick}
  >
    {label === "Daily" ? (
      <div className="w-5 h-5 flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-current rounded-sm flex items-center justify-center">
          <div
            className={`w-2 h-2 ${
              isActive ? "bg-blue-300" : "bg-transparent"
            } rounded-sm`}
          />
        </div>
      </div>
    ) : (
      <Icon size={18} />
    )}
    <span>{label}</span>
  </button>
);

export default function Sidebar({
  activeTab,
  onTabChange,
  currentTime,
}: SidebarProps) {
  return (
    <div className="w-full md:w-64 bg-indigo-950/40 backdrop-blur-md p-6 flex flex-col border-r border-indigo-800/30">
      {/* Logo */}
      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-10 flex items-center gap-2">
        <Star className="h-5 w-5 text-blue-300" />
        Forecast
      </h2>

      {/* Navigation */}
      <nav className="space-y-6 flex-1">
        <NavigationButton
          icon={Home}
          label="Home"
          isActive={activeTab === "home"}
          onClick={() => onTabChange("home")}
        />
        <NavigationButton
          icon={null}
          label="Daily"
          isActive={activeTab === "daily"}
          onClick={() => onTabChange("daily")}
        />
        <NavigationButton
          icon={Map}
          label="Maps"
          isActive={activeTab === "maps"}
          onClick={() => onTabChange("maps")}
        />
      </nav>

      {/* Time Display */}
      <div className="mt-6 pt-4 border-t border-indigo-800/30">
        <div className="text-xs text-blue-200/70 mb-2">
          Observatório Temporal
        </div>
        <div className="font-mono text-sm text-blue-300">
          {currentTime.toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
