import React, { useState, useEffect } from 'react';

/**
 * Interface pour les statistiques
 */
interface StatItem {
  id: number;
  label: string;
  value: number;
  suffix: string;
  icon: string;
  color: string;
}

/**
 * Hook pour l'animation des compteurs
 */
const useCountUp = (end: number, duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, delay, isVisible]);

  return { count, setIsVisible };
};

/**
 * Composant StatCard pour afficher une statistique
 */
interface StatCardProps {
  stat: StatItem;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const { count, setIsVisible } = useCountUp(stat.value, 2000, index * 200);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`stat-${stat.id}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [stat.id, setIsVisible]);

  return (
    <div
      id={`stat-${stat.id}`}
      className={`bg-slate-900/50 rounded-xl p-6 border border-slate-800 hover:border-${stat.color}-500/50 transition-all duration-300 hover:transform hover:scale-105`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`text-3xl ${stat.color === 'cyan' ? 'text-cyan-400' : stat.color === 'blue' ? 'text-blue-400' : stat.color === 'green' ? 'text-green-400' : 'text-purple-400'}`}>
          {stat.icon}
        </div>
        <div className={`w-2 h-2 rounded-full bg-${stat.color}-400 animate-pulse`}></div>
      </div>
      
      <div className="text-center">
        <div className={`text-3xl font-bold ${stat.color === 'cyan' ? 'text-cyan-400' : stat.color === 'blue' ? 'text-blue-400' : stat.color === 'green' ? 'text-green-400' : 'text-purple-400'} mb-2`}>
          {count.toLocaleString()}{stat.suffix}
        </div>
        <div className="text-slate-300 font-medium">
          {stat.label}
        </div>
      </div>
    </div>
  );
};

/**
 * Composant StatisticsSection
 * Section des statistiques avec animations
 */
export default function StatisticsSection() {
  const statistics: StatItem[] = [
    {
      id: 1,
      label: "Estimations Réalisées",
      value: 141200,
      suffix: "+",
      icon: "🚗",
      color: "cyan"
    },
    {
      id: 2,
      label: "Précision Moyenne",
      value: 98,
      suffix: "%",
      icon: "🎯",
      color: "green"
    },
    {
      id: 3,
      label: "Utilisateurs Actifs",
      value: 12500,
      suffix: "+",
      icon: "👥",
      color: "blue"
    },
    {
      id: 4,
      label: "Modèles Supportés",
      value: 1173,
      suffix: "+",
      icon: "⚡",
      color: "purple"
    }
  ];

  return (
    <section className="w-full max-w-6xl mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          AutoPredict en Chiffres
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Des millions d'estimations, une confiance inébranlable
        </p>
      </div>

      {/* Grille des statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistics.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>

      {/* Section supplémentaire avec graphique de performance */}
      <div className="mt-12 bg-slate-900/50 rounded-xl p-8 border border-slate-800">
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          Performance de nos Modèles IA
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Précision par segment */}
          <div className="text-center">
            <div className="bg-gradient-to-b from-cyan-500 to-cyan-600 h-32 w-4 mx-auto rounded-full mb-4 relative">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2">
                <span className="text-cyan-400 font-bold">98%</span>
              </div>
            </div>
            <h4 className="font-semibold text-white mb-2">Voitures Neuves</h4>
            <p className="text-slate-400 text-sm">Précision exceptionnelle</p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-b from-blue-500 to-blue-600 h-28 w-4 mx-auto rounded-full mb-4 relative">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2">
                <span className="text-blue-400 font-bold">96%</span>
              </div>
            </div>
            <h4 className="font-semibold text-white mb-2">Voitures d'Occasion</h4>
            <p className="text-slate-400 text-sm">Très haute précision</p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-b from-green-500 to-green-600 h-24 w-4 mx-auto rounded-full mb-4 relative">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2">
                <span className="text-green-400 font-bold">92%</span>
              </div>
            </div>
            <h4 className="font-semibold text-white mb-2">Véhicules Anciens</h4>
            <p className="text-slate-400 text-sm">Excellente précision</p>
          </div>
        </div>

        {/* Indicateurs de confiance */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg px-4 py-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300 text-sm">Système Opérationnel</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg px-4 py-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300 text-sm">IA Mise à Jour</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg px-4 py-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300 text-sm">Données Temps Réel</span>
          </div>
        </div>
      </div>
    </section>
  );
}
