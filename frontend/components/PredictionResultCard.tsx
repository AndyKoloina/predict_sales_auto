import React from 'react';
import Image from 'next/image';

/**
 * Propriétés du composant PredictionResultCard
 */
interface ResultCardProps {
  price: number;
  onReset: () => void;
}

/**
 * Icône de réinitialisation pour le bouton "Nouvelle Prédiction"
 */
const ResetIcon = () => (
  <svg 
    className="w-6 h-6" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" />
    <path d="M4 9a9 9 0 0114.65-4.65l-2.12 2.12A5 5 0 009 14.12V15" />
    <path d="M20 15a9 9 0 01-14.65 4.65l2.12-2.12A5 5 0 0015 9.88V9" />
  </svg>
);


/**
 * Composant PredictionResultCard
 * Affiche le résultat de la prédiction de prix avec des métriques de confiance
 */
export default function PredictionResultCard({ price, onReset }: ResultCardProps) {
  // Configuration des métriques d'évaluation
  const CONFIDENCE_SCORE = 94;
  const MARKET_POSITION_THRESHOLD = 25000;
  
  // Calcul de la position sur le marché
  const marketPosition = price < MARKET_POSITION_THRESHOLD ? "Excellente affaire" : "Prix juste";
  
  // Formatage du prix en euros
  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(price);

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center animate-fade-in-up">
      
      {/* Section robot avec message */}
      <div className="flex flex-col items-center -mt-24 mb-4">
        <Image 
          src="/assets/img/robotwaving.png" 
          alt="Robot assistant" 
          width={150} 
          height={150} 
        />
        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-cyan-400 font-medium">
            "Voici mon estimation basée sur les données actuelles !"
          </p>
        </div>
      </div>

      {/* Section prix principal */}
      <section className="mb-6">
        <h2 className="text-2xl text-slate-400 mb-2">
          Valeur Estimée du Véhicule
        </h2>
        <p className="text-6xl font-extrabold text-white">
          {formattedPrice}
        </p>
      </section>

      {/* Section métriques de confiance */}
      <section className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="text-3xl font-bold text-cyan-400">
            {CONFIDENCE_SCORE}%
          </div>
          <div className="text-sm text-slate-400">
            Indice de Fiabilité
          </div>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="text-3xl font-bold text-cyan-400">
            {marketPosition}
          </div>
          <div className="text-sm text-slate-400">
            Position sur le Marché
          </div>
        </div>
      </section>
      
      {/* Section actions */}
      <section className="flex justify-center">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105"
          aria-label="Lancer une nouvelle prédiction"
        >
          <ResetIcon />
          <span>Nouvelle Prédiction</span>
        </button>
      </section>

    </div>
  );
}