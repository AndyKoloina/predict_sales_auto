import React from 'react';
import Link from 'next/link';

/**
 * Composant CTASection
 * Section d'appel à l'action pour encourager l'utilisation du service
 */
export default function CTASection() {
  return (
    <section className="w-full max-w-6xl mb-20">
      <div className="bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-2xl border border-cyan-500/30 p-12 text-center relative overflow-hidden">
        {/* Éléments de décoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à découvrir la vraie valeur de votre véhicule ?
          </h2>
          
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Rejoignez plus de <span className="text-cyan-400 font-semibold">141,200</span> utilisateurs 
            qui font confiance à notre IA pour leurs estimations automobiles
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Link 
              href="/predict" 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            >
              🚗 Estimer mon véhicule
            </Link>
            
            <Link 
              href="/dashboard" 
              className="border-2 border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-white font-medium py-4 px-8 rounded-full text-lg transition-all duration-300 hover:bg-slate-800/50"
            >
              📊 Voir les analyses
            </Link>
          </div>

          {/* Badges de confiance */}
          <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>100% Gratuit</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Résultats instantanés</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Données sécurisées</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Support expert</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section des avantages rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="text-center p-6 bg-slate-900/30 rounded-lg border border-slate-800">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-semibold text-white mb-2">Estimation en 30 secondes</h3>
          <p className="text-slate-400 text-sm">Notre IA traite instantanément vos données</p>
        </div>
        
        <div className="text-center p-6 bg-slate-900/30 rounded-lg border border-slate-800">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="font-semibold text-white mb-2">Précision de 98%</h3>
          <p className="text-slate-400 text-sm">Basé sur des millions de transactions réelles</p>
        </div>
        
        <div className="text-center p-6 bg-slate-900/30 rounded-lg border border-slate-800">
          <div className="text-3xl mb-3">📄</div>
          <h3 className="font-semibold text-white mb-2">Rapport détaillé</h3>
          <p className="text-slate-400 text-sm">Téléchargez votre analyse complète en PDF</p>
        </div>
      </div>
    </section>
  );
}
