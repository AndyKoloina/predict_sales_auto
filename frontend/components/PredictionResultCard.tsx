import Image from 'next/image';

// Définition des props que le composant attend
type ResultCardProps = {
  price: number;
  onReset: () => void; // Fonction pour lancer une nouvelle prédiction
};

// Icône pour le bouton de réinitialisation
const ResetIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" />
      <path d="M4 9a9 9 0 0114.65-4.65l-2.12 2.12A5 5 0 009 14.12V15" />
      <path d="M20 15a9 9 0 01-14.65 4.65l2.12-2.12A5 5 0 0015 9.88V9" />
    </svg>
);


export default function PredictionResultCard({ price, onReset }: ResultCardProps) {
  // Simuler un score de confiance et une position sur le marché
  const confidenceScore = 94;
  const marketPosition = (price < 25000) ? "Excellente affaire" : "Prix juste";

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center animate-fade-in-up">
      
      {/* Robot et verdict */}
      <div className="flex flex-col items-center -mt-24 mb-4">
        <Image src="/assets/img/robotwaving.png" alt="Robot" width={150} height={150} />
        <div className="bg-slate-800 rounded-xl p-3">
            <p className="text-cyan-400 font-medium">"Voici mon estimation basée sur les données actuelles !"</p>
        </div>
      </div>

      {/* Prix prédit */}
      <h2 className="text-2xl text-slate-400 mb-2">Valeur Estimée du Véhicule</h2>
      <p className="text-6xl font-extrabold text-white mb-6">
        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)}
      </p>

      {/* Jauges et scores */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="text-3xl font-bold text-cyan-400">{confidenceScore}%</div>
          <div className="text-sm text-slate-400">Indice de Fiabilité</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <div className="text-3xl font-bold text-cyan-400">{marketPosition}</div>
          <div className="text-sm text-slate-400">Position sur le Marché</div>
        </div>
      </div>
      
      {/* Boutons d'action */}
      <div className="flex justify-center">
        <button 
            onClick={onReset}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105"
        >
            <ResetIcon />
            <span>Nouvelle Prédiction</span>
        </button>
      </div>

    </div>
  );
}