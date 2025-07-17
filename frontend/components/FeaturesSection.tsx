import React, { useState } from 'react';

/**
 * Interface pour les fonctionnalités
 */
interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  isPopular?: boolean;
}

/**
 * Composant FeatureCard
 */
interface FeatureCardProps {
  feature: Feature;
  isSelected: boolean;
  onSelect: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-xl p-6 border transition-all duration-300 transform hover:scale-105 ${
        isSelected
          ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500 shadow-lg shadow-cyan-500/25'
          : 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/50'
      }`}
    >
      {feature.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            POPULAIRE
          </span>
        </div>
      )}
      
      <div className="text-center">
        <div className="text-4xl mb-4">{feature.icon}</div>
        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
        <p className="text-slate-400 mb-4 leading-relaxed">{feature.description}</p>
        
        {isSelected && (
          <div className="space-y-2 animate-fadeIn">
            {feature.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-300">{benefit}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Composant FeaturesSection
 * Section interactive des fonctionnalités
 */
export default function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<number>(1);

  const features: Feature[] = [
    {
      id: 1,
      title: "IA Avancée",
      description: "Intelligence artificielle de pointe analysant des milliers de variables",
      icon: "🤖",
      benefits: [
        "Algorithmes de machine learning optimisés",
        "Analyse prédictive en temps réel",
        "Amélioration continue des modèles",
        "Précision supérieure à 98%"
      ],
      isPopular: true
    },
    {
      id: 2,
      title: "Estimation Instantanée",
      description: "Résultats en moins de 30 secondes avec une précision exceptionnelle",
      icon: "⚡",
      benefits: [
        "Traitement ultra-rapide",
        "Interface utilisateur intuitive",
        "Résultats détaillés instantanés",
        "Pas d'attente, pas de délai"
      ]
    },
    {
      id: 3,
      title: "Données Complètes",
      description: "Base de données exhaustive mise à jour quotidiennement",
      icon: "📊",
      benefits: [
        "Plus de 1,173 modèles supportés",
        "Historique des prix détaillé",
        "Tendances du marché en temps réel",
        "Sources vérifiées et fiables"
      ]
    },
    {
      id: 4,
      title: "Rapports Professionnels",
      description: "Documents PDF détaillés pour vos transactions",
      icon: "📄",
      benefits: [
        "Analyse comparative du marché",
        "Facteurs d'évaluation détaillés",
        "Graphiques et visualisations",
        "Export PDF haute qualité"
      ]
    },
    {
      id: 5,
      title: "Sécurité Garantie",
      description: "Protection totale de vos données personnelles",
      icon: "🔒",
      benefits: [
        "Chiffrement bout en bout",
        "Conformité RGPD",
        "Aucun stockage permanent",
        "Certificats SSL/TLS"
      ]
    },
    {
      id: 6,
      title: "Support Expert",
      description: "Équipe d'experts disponible pour vous accompagner",
      icon: "🎯",
      benefits: [
        "Support technique 24/7",
        "Conseils personnalisés",
        "Formation utilisateur",
        "Réponse garantie sous 2h"
      ]
    }
  ];

  return (
    <section className="w-full max-w-6xl mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Fonctionnalités Avancées
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Découvrez tout ce qui fait d'AutoPredict la référence en estimation automobile
        </p>
      </div>

      {/* Grille des fonctionnalités */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            isSelected={selectedFeature === feature.id}
            onSelect={() => setSelectedFeature(feature.id)}
          />
        ))}
      </div>

      {/* Section comparative */}
      <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          Pourquoi Choisir AutoPredict ?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Nous vs Concurrence */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">AP</span>
            </div>
            <h4 className="font-semibold text-white mb-3">AutoPredict</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-300">IA Avancée 98%</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-300">Résultats &lt; 30s</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-300">100% Gratuit</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-slate-400 font-bold text-xl">C1</span>
            </div>
            <h4 className="font-semibold text-slate-400 mb-3">Concurrent 1</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-400">Précision 78%</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-400">Résultats 5-10min</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-400">Payant 9.99€</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-slate-400 font-bold text-xl">C2</span>
            </div>
            <h4 className="font-semibold text-slate-400 mb-3">Concurrent 2</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-400">Précision 82%</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-400">Résultats 2-3min</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-400">Gratuit limité</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
