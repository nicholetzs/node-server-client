import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  type: "star" | "dot" | "sparkle";
  color: string;
}

interface BackgroundParticlesProps {
  count?: number;
}

export default function BackgroundParticles({
  count = 50,
}: BackgroundParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const colors = [
    "rgba(255, 255, 255, 0.8)",
    "rgba(147, 197, 253, 0.7)", // blue-300
    "rgba(196, 181, 253, 0.7)", // violet-300
    "rgba(252, 211, 77, 0.6)", // amber-300
    "rgba(251, 146, 60, 0.6)", // orange-300
    "rgba(248, 113, 113, 0.6)", // red-300
  ];

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const types: ("star" | "dot" | "sparkle")[] = [
          "star",
          "dot",
          "sparkle",
        ];
        const type = types[Math.floor(Math.random() * types.length)];

        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size:
            type === "star"
              ? Math.random() * 3 + 1
              : type === "dot"
              ? Math.random() * 2 + 0.5
              : Math.random() * 4 + 2,
          opacity: Math.random() * 0.6 + 0.2,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 5,
          type,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      setParticles(newParticles);
    };

    generateParticles();
  }, [count]);

  const StarShape = ({ size, color }: { size: number; color: string }) => (
    <svg
      width={size * 4}
      height={size * 4}
      viewBox="0 0 24 24"
      className="absolute"
    >
      <defs>
        <filter id={`glow-${Math.random()}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={color}
        filter={`url(#glow-${Math.random()})`}
        className="drop-shadow-sm"
      />
    </svg>
  );

  const SparkleShape = ({ size, color }: { size: number; color: string }) => (
    <svg
      width={size * 3}
      height={size * 3}
      viewBox="0 0 24 24"
      className="absolute"
    >
      <defs>
        <filter id={`sparkle-glow-${Math.random()}`}>
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M12 0l2 10 10 2-10 2-2 10-2-10L0 12l10-2z"
        fill={color}
        filter={`url(#sparkle-glow-${Math.random()})`}
        className="drop-shadow-sm"
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* Main particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, particle.opacity, particle.opacity, 0],
            scale: [0, 1, 1.2, 1, 0],
            x: [0, Math.sin(particle.id) * 20, 0],
            y: [0, Math.cos(particle.id) * 15, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            {particle.type === "star" && (
              <StarShape size={particle.size} color={particle.color} />
            )}
            {particle.type === "sparkle" && (
              <SparkleShape size={particle.size} color={particle.color} />
            )}
            {particle.type === "dot" && (
              <motion.div
                className="rounded-full blur-[0.5px]"
                style={{
                  width: particle.size * 4,
                  height: particle.size * 4,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 ${particle.size * 6}px ${particle.color}`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.div>
        </motion.div>
      ))}

      {/* Twinkling effect overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(147,197,253,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(196,181,253,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 20%, rgba(252,211,77,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
