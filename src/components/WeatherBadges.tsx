import { MapPin } from "lucide-react";

interface LocationBadgeProps {
  location: string;
}

export const LocationBadge = ({ location }: LocationBadgeProps) => (
  <div className="absolute -top-2 -left-2 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/30">
    <div className="flex items-center gap-1">
      <MapPin size={10} className="text-white/80" />
      <span className="text-[10px] font-medium text-white/90">{location}</span>
    </div>
  </div>
);

export const RainBadge = () => (
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
);
