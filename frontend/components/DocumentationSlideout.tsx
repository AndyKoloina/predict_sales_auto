type DocumentationSlideoutProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CloseIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function DocumentationSlideout({ isOpen, onClose }: DocumentationSlideoutProps) {
  return (
    // Conteneur principal qui gère le fond et la visibilité
    <div
      // ✅ On change la visibilité avec opacity et on ajoute une transition
      className={`fixed inset-0 z-50 transition-opacity duration-500 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      {/* Fond semi-transparent */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Le panneau coulissant lui-même */}
      <div
        // ✅ On change la position avec transform et on ajoute une transition
        className={`relative w-full max-w-md h-full bg-slate-900 shadow-2xl p-8 overflow-y-auto ml-auto transition-transform duration-500 ease-in-out ${
          isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          <CloseIcon />
        </button>

        <h2 className="text-3xl font-bold text-cyan-400 mb-8">Documentation</h2>

        {/* Section sur le jeu de données */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-3">À propos du jeu de données</h3>
          <p className="text-slate-400 leading-relaxed">
            Ce modèle a été entraîné sur un jeu de données de voitures d'occasion provenant de Kaggle. Il contient des milliers d'annonces avec des informations détaillées.
          </p>
          <ul className="list-disc list-inside mt-4 text-slate-300 space-y-2">
            <li>Marque et modèle du véhicule (`make`, `model`)</li>
            <li>Année de mise en circulation (`year`)</li>
            <li>Kilométrage (`mileage`)</li>
            {/* ... etc ... */}
          </ul>
        </section>

        {/* Section sur les développeurs */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-3">Équipe de Développement</h3>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
            <div>
              <h4 className="font-bold text-slate-200">Ranaivo Nirina Andy Nantenaina</h4>
              <p className="text-cyan-500">Développeur Full-Stack & IA</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
            <div>
              <h4 className="font-bold text-slate-200">RAKOTONIRINA Mendrika Itokiana</h4>
              <p className="text-cyan-500">Développeur Full-Stack & IA</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}