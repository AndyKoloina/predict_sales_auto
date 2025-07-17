import React, { useState } from 'react';

/**
 * Interface pour les questions FAQ
 */
interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'technique' | 'pricing';
}

/**
 * Composant FAQSection
 * Section FAQ interactive avec accordéon
 */
export default function FAQSection() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('general');

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Comment fonctionne l'IA d'AutoPredict ?",
      answer: "Notre intelligence artificielle analyse des milliers de points de données incluant la marque, le modèle, l'année, le kilométrage, l'état du véhicule et les tendances du marché pour fournir une estimation précise.",
      category: 'technique'
    },
    {
      id: 2,
      question: "Quelle est la précision des estimations ?",
      answer: "Nos modèles atteignent une précision de plus de 98% avec une erreur moyenne de moins de 3,053€ sur le prix réel du marché.",
      category: 'technique'
    },
    {
      id: 3,
      question: "L'estimation est-elle gratuite ?",
      answer: "Oui ! Toutes les estimations de base sont entièrement gratuites. Vous pouvez obtenir une estimation instantanée sans aucun frais.",
      category: 'pricing'
    },
    {
      id: 4,
      question: "Combien de temps prend une estimation ?",
      answer: "Une estimation prend généralement moins de 30 secondes. Notre IA traite instantanément vos données pour vous fournir un résultat immédiat.",
      category: 'general'
    },
    {
      id: 5,
      question: "Puis-je obtenir un rapport détaillé ?",
      answer: "Oui, vous pouvez télécharger un rapport PDF complet incluant l'analyse des facteurs, les comparaisons de marché et nos recommandations.",
      category: 'general'
    },
    {
      id: 6,
      question: "Vos données sont-elles à jour ?",
      answer: "Nos modèles sont entraînés sur plus de 141,200 transactions réelles et sont mis à jour régulièrement avec les dernières données du marché automobile français et européen.",
      category: 'technique'
    },
    {
      id: 7,
      question: "Comment protégez-vous mes données ?",
      answer: "Toutes vos données sont chiffrées et traitées selon les normes RGPD. Nous ne stockons aucune information personnelle de manière permanente.",
      category: 'general'
    },
    {
      id: 8,
      question: "Y a-t-il des options premium ?",
      answer: "Nous proposons des fonctionnalités avancées pour les professionnels comme l'API d'intégration, les analyses en masse et le support prioritaire.",
      category: 'pricing'
    }
  ];

  const categories = {
    general: { label: 'Général', icon: '❓' },
    technique: { label: 'Technique', icon: '⚙️' },
    pricing: { label: 'Tarifs', icon: '💰' }
  };

  const filteredFAQ = faqData.filter(item => item.category === activeCategory);

  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <section className="w-full max-w-6xl mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Questions Fréquentes
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Tout ce que vous devez savoir sur AutoPredict
        </p>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 bg-slate-900/50 rounded-lg p-1 border border-slate-800">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeCategory === key
                  ? 'bg-cyan-500 text-slate-900'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Questions et réponses */}
      <div className="space-y-4">
        {filteredFAQ.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/50 rounded-lg border border-slate-800 overflow-hidden transition-all duration-300 hover:border-cyan-500/50"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-800/50 transition-colors"
            >
              <span className="font-medium text-white pr-4">
                {item.question}
              </span>
              <svg
                className={`w-5 h-5 text-cyan-400 transform transition-transform duration-300 ${
                  activeItem === item.id ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4 text-slate-300 leading-relaxed border-t border-slate-800/50">
                <div className="pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact support */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20 p-6">
          <h3 className="font-semibold text-white mb-2">
            Vous ne trouvez pas votre réponse ?
          </h3>
          <p className="text-slate-400 mb-4">
            Notre équipe support est là pour vous aider
          </p>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-medium px-6 py-2 rounded-lg transition-colors">
            Contacter le Support
          </button>
        </div>
      </div>
    </section>
  );
}
