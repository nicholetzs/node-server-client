"use client";

import { RotateCcw, Sparkles } from "lucide-react";

interface AtualizarPrevisoesProps {
  onAtualizar: () => void;
  loading?: boolean;
}

export default function AtualizarPrevisoes({
  onAtualizar,
  loading = false,
}: AtualizarPrevisoesProps) {
  return (
    <button
      onClick={onAtualizar}
      disabled={loading}
      className={`group relative overflow-hidden bg-gradient-to-r from-blue-600/60 to-purple-600/60 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-2 border border-blue-500/30 backdrop-blur-sm
        ${
          loading
            ? "opacity-70 cursor-not-allowed"
            : "hover:shadow-blue-500/20 hover:shadow-lg hover:from-blue-600/80 hover:to-purple-600/80"
        }`}
    >
      {/* Partículas estelares */}
      <span className="absolute top-1 left-2 w-1 h-1 rounded-full bg-blue-200 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 animate-pulse"></span>
      <span className="absolute -top-1 right-5 w-1.5 h-1.5 rounded-full bg-purple-200 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 animate-pulse-slow"></span>
      <span className="absolute bottom-1 left-10 w-1 h-1 rounded-full bg-indigo-200 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 animate-pulse"></span>
      <span className="absolute bottom-2 right-8 w-0.5 h-0.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-all duration-700 delay-150 animate-pulse-slow"></span>

      {/* Nebulosa de fundo */}
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"></span>

      {/* Ícone girando ao carregar */}
      <span
        className={`relative transition-transform duration-500 ${
          loading
            ? "animate-spin text-blue-200"
            : "group-hover:rotate-180 text-blue-200"
        }`}
      >
        {loading ? (
          <Sparkles size={18} className="animate-pulse" />
        ) : (
          <RotateCcw size={18} />
        )}
      </span>

      {/* Texto */}
      <span className="font-light tracking-wide">
        {loading ? "Atualizando..." : "Atualizar Previsões"}
      </span>

      {/* Efeito de órbita */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out"></span>

      {/* Brilho nas bordas */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200 border border-blue-400/30 scale-105 blur-sm"></span>
    </button>
  );
}
