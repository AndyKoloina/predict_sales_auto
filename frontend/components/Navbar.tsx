import Link from 'next/link';

// --- Icône SVG de Voiture (inchangée) ---
const CarLogoIcon = () => (
    <svg className="h-8 w-8 text-white group-hover:text-cyan-400 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 16H9m12-7l-2.5 2.5M2 12h3m16 0h-3m-6 4v4m0-16v4" />
        <path d="M18 10h-2V8a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H6a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2v-4a2 2 0 00-2-2z" />
    </svg>
);

// --- ✅ NOUVELLE Icône pour la Documentation ---
const DocsIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

// On définit le type des props que le Navbar va recevoir
type NavbarProps = {
  onDocsClick: () => void; // Une fonction qui sera appelée au clic sur l'icône de doc
};

export default function Navbar({ onDocsClick }: NavbarProps) {
  return (
    <nav className="bg-slate-900/70 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-700/50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo (inchangé) */}
        <Link href="/" className="flex items-center gap-3 group">
          <CarLogoIcon />
          <span className="text-2xl font-bold text-slate-200 group-hover:text-cyan-400 transition-colors duration-300">
            AutoPredict
          </span>
        </Link>
        
        {/* Liens de navigation avec la nouvelle icône */}
        <div className="flex items-center space-x-2">
          <Link href="/predict" className="px-4 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-all duration-300 font-semibold">
            Prédire
          </Link>
          <Link href="/dashboard" className="px-4 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-all duration-300 font-semibold">
            Dashboard
          </Link>
          {/* ✅ NOUVEAU Bouton pour la Documentation */}
          <button 
            onClick={onDocsClick}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-cyan-400 transition-all duration-300"
            title="Documentation"
          >
            <DocsIcon />
          </button>
        </div>
        
      </div>
    </nav>
  );
}