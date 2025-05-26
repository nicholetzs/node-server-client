interface WeatherIconProps {
  icon: string;
  condition: string;
  weather_icon?: string;
}

const AnimatedRain = ({
  count = 4,
  delay = 0.2,
}: {
  count?: number;
  delay?: number;
}) => (
  <>
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="absolute w-0.5 h-2 bg-blue-400 rounded-full animate-bounce"
        style={{
          left: `${4 + i * 3}px`,
          top: "20px",
          animationDelay: `${i * delay}s`,
        }}
      />
    ))}
  </>
);

const SunRays = () => (
  <>
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
  </>
);

export default function WeatherIcon({
  icon,
  condition,
  weather_icon,
}: WeatherIconProps) {
  if (weather_icon) {
    return (
      <img
        src={weather_icon || "/placeholder.svg"}
        alt={condition}
        className="w-12 h-12 object-contain filter drop-shadow-lg"
      />
    );
  }

  const iconComponents = {
    "partly-sunny": (
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
        <div className="absolute -bottom-1 -right-1 w-6 h-3 bg-white/80 rounded-full"></div>
      </div>
    ),
    sunny: (
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse">
          <SunRays />
        </div>
      </div>
    ),
    "light-rain": (
      <div className="relative">
        <div className="w-10 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-lg"></div>
        <AnimatedRain />
      </div>
    ),
    "moderate-rain": (
      <div className="relative">
        <div className="w-10 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-lg"></div>
        <AnimatedRain />
      </div>
    ),
    rain: (
      <div className="relative">
        <div className="w-10 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-lg"></div>
        <AnimatedRain />
      </div>
    ),
    "heavy-rain": (
      <div className="relative">
        <div className="w-10 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-lg"></div>
        <AnimatedRain count={6} delay={0.1} />
      </div>
    ),
    cloudy: (
      <div className="relative w-12 h-8">
        <div className="absolute w-8 h-4 bg-gray-300 rounded-full top-0 left-0"></div>
        <div className="absolute w-6 h-3 bg-gray-400 rounded-full top-2 right-0"></div>
        <div className="absolute w-7 h-4 bg-gray-200 rounded-full bottom-0 left-1"></div>
      </div>
    ),
  };

  return (
    <div className="w-16 h-16 flex items-center justify-center relative">
      {iconComponents[icon as keyof typeof iconComponents] ||
        iconComponents.cloudy}
    </div>
  );
}
