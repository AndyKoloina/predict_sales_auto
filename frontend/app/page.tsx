import Link from 'next/link';
import Image from 'next/image';

// --- Vos icônes SVG restent ici ---
const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8a10.07 10.07 0 01-2.06 6.06L12 12V2" />
  </svg>
);
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
);

// --- Le composant de la Page d'Accueil ---
export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center px-4">

      {/* ✅ MODIFICATION PRINCIPALE CI-DESSOUS ✅
        La carte principale a maintenant l'image en fond, plus une couche sombre pour la lisibilité.
        La structure interne avec le robot et le texte est conservée.
      */}
      <div 
        className="relative w-full max-w-6xl border border-slate-800 rounded-2xl shadow-2xl shadow-cyan-900/20 p-8 mb-20 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/img/car.jpg')" }}
      >
        {/* Couche de superposition sombre pour rendre le texte lisible */}
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>

        {/* Contenu positionné par-dessus le fond */}
        <div className="relative z-5 grid md:grid-cols-2 gap-10 items-center">
          
          {/* Colonne de Gauche : Image animée du robot */}
          <div className="w-full h-auto">
            <Image
              src="/assets/img/robotwaving.png"
              alt="Robot prédictif"
              width={800}
              height={800}
              className="object-contain animate-float"
              priority
            />
          </div>

          {/* Colonne de Droite : Texte et Bouton */}
          <div className="text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Le Futur de la Prédiction Automobile
            </h1>
            <p className="text-lg text-slate-200 mb-8">
              Notre IA analyse des milliers de points de données pour vous donner l'estimation la plus précise du marché.
            </p>
            <Link
              href="/predict"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
            >
              Démarrer une Prédiction
            </Link>
          </div>

        </div>
      </div>

      {/* Le reste de la page (caractéristiques et copyright) reste inchangé */}
      <div className="w-full max-w-6xl grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 text-center">
            <div className="flex justify-center mb-4"><BrainIcon /></div>
            <h3 className="text-xl font-bold text-white mb-2">Modèle Puissant</h3>
            <p className="text-slate-400">Entraîné sur des milliers de points de données pour une précision maximale.</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 text-center">
            <div className="flex justify-center mb-4"><ChartIcon /></div>
            <h3 className="text-xl font-bold text-white mb-2">Données en Temps Réel</h3>
            <p className="text-slate-400">Nos prédictions s'adaptent aux dernières tendances du marché.</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 text-center">
            <div className="flex justify-center mb-4"><CarIcon /></div>
            <h3 className="text-xl font-bold text-white mb-2">Spécifique au Véhicule</h3>
            <p className="text-slate-400">Obtenez des estimations fines basées sur la marque et le modèle.</p>
        </div>
      </div>

      <footer className="w-full text-center text-slate-500 mt-10 pb-10">
        <p>&copy; {new Date().getFullYear()} AutoPredict. Tous droits réservés.</p>
      </footer>
    </div>
  );
}