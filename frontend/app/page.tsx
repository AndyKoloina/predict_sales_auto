"use client";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// --- Vos icônes SVG (inchangées) ---
const BrainIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8a10.07 10.07 0 01-2.06 6.06L12 12V2" /> </svg> );
const ChartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> </svg> );
const CarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /> </svg> );

// --- Données pour la nouvelle section d'articles ---
const articles = [
  {
    image: '/assets/img/voiture1.jpg',
    category: 'Analyse',
    title: 'Le boom des véhicules électriques et leur valeur future',
    excerpt: 'Comment l\'IA prédit la dépréciation des VE par rapport aux modèles thermiques. Une analyse en profondeur.',
    href: '#'
  },
  {
    image: '/assets/img/voiture.jpg',
    category: 'Tendance',
    title: 'Les 5 couleurs de voiture qui gardent le plus leur valeur',
    excerpt: 'Surpris ? La couleur de votre voiture a un impact direct sur son prix de revente. Découvrez le top 5.',
    href: '#'
  },
  {
    image: '/assets/img/voiture3.jpg',
    category: 'Conseils',
    title: 'Comment maximiser le prix de vente de votre voiture ?',
    excerpt: 'De l\'entretien aux petites réparations, nos experts vous livrent leurs secrets pour une vente réussie.',
    href: '#'
  }
];


export default function HomePage() {
  const bannerRef = useRef(null);
  const [borderLength, setBorderLength] = useState(0);
  const titleLine1 = "Le Futur de la Prédiction";
  const titleLine2 = "Automobile";
  const [animatedLine1, setAnimatedLine1] = useState("");
  const [animatedLine2, setAnimatedLine2] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (bannerRef.current) {
      const rect = bannerRef.current.querySelector('.animated-border-rect');
      if (rect) {
        const length = rect.getTotalLength();
        setBorderLength(length);
      }
    }
    const line1Timeouts = titleLine1.split('').map((char, index) => {
      return setTimeout(() => { setAnimatedLine1((prev) => prev + char); }, index * 50);
    });
    const line1AnimationTime = titleLine1.length * 50;
    const line2Timeouts = titleLine2.split('').map((char, index) => {
      return setTimeout(() => { setAnimatedLine2((prev) => prev + char); }, line1AnimationTime + (index * 50));
    });
    const totalAnimationTime = (titleLine1.length + titleLine2.length) * 50;
    const buttonTimeout = setTimeout(() => { setIsButtonVisible(true); }, totalAnimationTime + 300);
    return () => {
      [...line1Timeouts, ...line2Timeouts].forEach(clearTimeout);
      clearTimeout(buttonTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-center px-4">
      {/* Bannière principale (inchangée) */}
      <div ref={bannerRef} className="relative w-full max-w-6xl border border-slate-800 rounded-2xl shadow-2xl shadow-cyan-900/20 p-8 mb-20 overflow-hidden flex items-center justify-center">
        <video autoPlay loop muted playsInline className="absolute z-0 top-0 left-0 w-full h-full object-cover"><source src="/assets/video/video4.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-slate-900/50 z-10"></div>
        <svg className="absolute inset-0 w-full h-full z-20" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect className="animated-border-rect" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="15" ry="15" fill="none" stroke="rgba(0, 255, 255, 0.5)" strokeWidth="2" /></svg>
        <div className="relative z-30 flex flex-col items-center">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 min-h-[112px]">
              <span className="block">{animatedLine1.split('').map((char, index) => (<span key={`l1-${index}`} className="animate-char-appear inline-block" style={{ animationDelay: `${index * 0.02}s` }}>{char === ' ' ? '\u00A0' : char}</span>))}</span>
              <span className="block">{animatedLine2.split('').map((char, index) => (<span key={`l2-${index}`} className="animate-char-appear inline-block" style={{ animationDelay: `${index * 0.02}s` }}>{char === ' ' ? '\u00A0' : char}</span>))}</span>
            </h1>
            <p className="text-lg text-slate-200 mb-8">Notre IA analyse des milliers de points de données pour vous donner l'estimation la plus précise du marché.</p>
            <Link href="/predict" className={`inline-block bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 ${isButtonVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ transition: 'opacity 0.5s' }}>Démarrer une Prédiction</Link>
          </div>
        </div>
      </div>

      {/* Cartes de fonctionnalités (inchangées) */}
      <div className="w-full max-w-6xl grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 text-center"> <div className="flex justify-center mb-4"><BrainIcon /></div> <h3 className="text-xl font-bold text-white mb-2">Modèle Puissant</h3> <p className="text-slate-400">Entraîné sur des milliers de points de données pour une précision maximale.</p> </div>
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 text-center"> <div className="flex justify-center mb-4"><ChartIcon /></div> <h3 className="text-xl font-bold text-white mb-2">Données en Temps Réel</h3> <p className="text-slate-400">Nos prédictions s'adaptent aux dernières tendances du marché.</p> </div>
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 text-center"> <div className="flex justify-center mb-4"><CarIcon /></div> <h3 className="text-xl font-bold text-white mb-2">Spécifique au Véhicule</h3> <p className="text-slate-400">Obtenez des estimations fines basées sur la marque et le modèle.</p> </div>
      </div>

      {/* --- DÉBUT DE LA NOUVELLE SECTION ARTICLES --- */}
      <section className="w-full max-w-6xl mb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Plongez dans nos analyses</h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">Restez à la pointe de l'actualité automobile grâce à nos articles rédigés par des experts.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-slate-900/50 rounded-lg border border-slate-800 overflow-hidden group transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-900/20 transform hover:-translate-y-2">
              <a href={article.href} className="block">
                <div className="overflow-hidden">
                   <img src={article.image} alt={article.title} className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-cyan-900 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">{article.category}</span>
                  <h3 className="text-lg font-bold text-white mb-3 leading-tight">{article.title}</h3>
                  <p className="text-slate-400 text-sm mb-6">{article.excerpt}</p>
                  <span className="font-semibold text-cyan-400 flex items-center group-hover:underline">
                    Lire la suite 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
      {/* --- FIN DE LA NOUVELLE SECTION ARTICLES --- */}


      {/* Pied de page (inchangé) */}
      <footer className="w-full text-center text-slate-500 mt-10 pb-10">
        <p>&copy; {new Date().getFullYear()} AutoPredict. Tous droits réservés.</p>
      </footer>
    </div>
  );
}