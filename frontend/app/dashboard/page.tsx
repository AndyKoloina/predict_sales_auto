'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// On définit un type pour nos métriques
type Metrics = {
  r2_score: string;
  mae: string;
  rmse: string;
};

// On importe le bouton de manière dynamique pour éviter les erreurs de rendu serveur
const DownloadButton = dynamic(() => import('@/components/DownloadButton'), {
  ssr: false,
});

// --- Icônes pour les cartes de métriques ---
const ScoreIcon = () => <svg className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ErrorIcon = () => <svg className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const RMSEIcon = () => <svg className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 011 1v1a2 2 0 104 0V4z" /></svg>;


export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [activeTab, setActiveTab] = useState('performance');

  useEffect(() => {
    fetch('/assets/results/metrics.json')
      .then((response) => response.json())
      .then((data) => setMetrics(data))
      .catch((error) => console.error("Erreur de chargement des métriques:", error));
  }, []);

  const TabButton = ({ tabName, label }: { tabName: string; label: string }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 font-semibold rounded-md transition-colors duration-300 ${activeTab === tabName ? 'bg-cyan-500 text-slate-900' : 'text-slate-300 hover:bg-slate-800'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-white">Dashboard du Modèle</h1>
        {/* On passe l'ID de l'élément à capturer au bouton */}
        <DownloadButton elementIdToCapture="dashboard-content" />
      </div>

      {/* --- ✅ ID AJOUTÉ ICI --- */}
      {/* Ce conteneur global sera capturé pour le PDF */}
      <div id="dashboard-content" className="bg-slate-950 p-4">
        <p className="text-center text-slate-400 mb-10">Analyse des performances de notre modèle de prédiction.</p>
        
        {/* Section des Métriques Clés */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 flex items-center gap-6 hover:border-cyan-500/50 transition-all duration-300">
                <ScoreIcon />
                <div>
                    <div className="text-3xl font-extrabold text-white">{metrics ? metrics.r2_score : '...'}</div>
                    <div className="text-slate-400">R² Score (Précision)</div>
                </div>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 flex items-center gap-6 hover:border-cyan-500/50 transition-all duration-300">
                <ErrorIcon />
                <div>
                    <div className="text-3xl font-extrabold text-white">{metrics ? metrics.mae : '...'}</div>
                    <div className="text-slate-400">Erreur Absolue Moyenne</div>
                </div>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 flex items-center gap-6 hover:border-cyan-500/50 transition-all duration-300">
                <RMSEIcon />
                <div>
                    <div className="text-3xl font-extrabold text-white">{metrics ? metrics.rmse : '...'}</div>
                    <div className="text-slate-400">Erreur Quadratique Moyenne</div>
                </div>
            </div>
        </div>

        {/* Section des Visualisations avec Onglets */}
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <div className="flex space-x-2 border-b border-slate-800 mb-4">
            <TabButton tabName="performance" label="Performance" />
            <TabButton tabName="errors" label="Distribution des Erreurs" />
            <TabButton tabName="importance" label="Importance des Facteurs" />
          </div>

          <div className="mt-6">
            {activeTab === 'performance' && (
                <div className="animate-fade-in-up">
                    <h3 className="font-semibold text-white text-xl mb-2">Prix Actuel vs. Prix Prédit</h3>
                    <p className="text-slate-400 mb-4">Compare les prédictions (axe Y) aux prix réels (axe X). Plus les points sont proches de la ligne rouge, plus le modèle est précis.</p>
                    <div className="relative w-full h-auto bg-white/5 rounded-md p-2">
                        <Image src="/assets/img/actual_vs_predicted.png" alt="Graphique Actuel vs Prédit" width={800} height={800} className="rounded-md" />
                    </div>
                </div>
            )}
            {activeTab === 'errors' && (
                <div className="animate-fade-in-up">
                    <h3 className="font-semibold text-white text-xl mb-2">Distribution des Erreurs</h3>
                    <p className="text-slate-400 mb-4">Montre la répartition des erreurs. Idéalement, le pic est centré sur zéro, indiquant que le modèle n'a pas de biais systématique.</p>
                    <div className="relative w-full h-auto bg-white/5 rounded-md p-2">
                        <Image src="/assets/img/errors_distribution.png" alt="Graphique Distribution des Erreurs" width={1000} height={500} className="rounded-md" />
                    </div>
                </div>
            )}
            {activeTab === 'importance' && (
                 <div className="animate-fade-in-up">
                    <h3 className="font-semibold text-white text-xl mb-2">Qu'est-ce qui influence le plus le prix ?</h3>
                    <p className="text-slate-400 mb-4">Ce graphique classe les caractéristiques par ordre d'importance pour le modèle.</p>
                    <div className="relative w-full h-auto bg-white/5 rounded-md p-2">
                        <Image src="/assets/img/caracteristique_distribution.png" alt="Graphique Importance des Caractéristiques" width={1000} height={800} className="rounded-md" />
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}