'use client';
import { useState, FormEvent, useEffect } from 'react';
import PredictionResultCard from '@/components/PredictionResultCard';
import AutocompleteInput from '@/components/AutocompleteInput'; // On utilise notre composant

// --- Le composant de la Page de Prédiction ---
export default function PredictPage() {
  const [formData, setFormData] = useState({
    make: '', model: '', year: 2021, mileage: 30000, fuel_type: 'Gasoline', engine_hp: 300,
  });
  
  // États pour la logique "pas à pas"
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [prediction, setPrediction] = useState<number | null>(null);
  
  // États pour l'autocomplétion
  const [carData, setCarData] = useState<Record<string, string[]>>({});
  const [modelsForMake, setModelsForMake] = useState<string[]>([]);

  // Les questions du formulaire interactif
  const questions = [
    { key: 'make', label: "Quel constructeur a forgé ce véhicule ?", type: 'autocomplete' },
    { key: 'model', label: "Et quel est son modèle exact ?", type: 'autocomplete' },
    { key: 'year', label: "En quelle année a-t-il vu le jour ?", type: 'number' },
    { key: 'mileage', label: "Combien d'aventures a-t-il vécues (en km) ?", type: 'number' },
    { key: 'fuel_type', label: "Quelle énergie le fait vibrer ?", type: 'text' },
    { key: 'engine_hp', label: "Quelle est la puissance de son cœur (en ch) ?", type: 'number' },
  ];

  // On charge les données pour l'autocomplétion au démarrage
  useEffect(() => {
    fetch('http://localhost:8000/car-data')
      .then(res => res.json())
      .then(data => setCarData(data))
      .catch(err => console.error("Erreur de chargement des données d'autocomplétion:", err));
  }, []);

  // On met à jour la liste des modèles quand la marque change
  useEffect(() => {
    if (formData.make && carData[formData.make]) {
      setModelsForMake(carData[formData.make]);
    } else {
      setModelsForMake([]);
    }
  }, [formData.make, carData]);

  // Animation des messages de chargement (inchangée)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      const messages = ["Analyse des données...", "Consultation des archives...", "Calcul de la valeur..."];
      let i = 0;
      setLoadingMessage(messages[i]);
      interval = setInterval(() => { i = (i + 1) % messages.length; setLoadingMessage(messages[i]); }, 1500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Soumission du formulaire final
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Erreur API');
      const data = await response.json();
      setPrediction(data.predicted_price);
    } catch (err) {
      alert("Erreur de prédiction.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleReset = () => {
    setPrediction(null);
    setStep(0);
    setFormData({ make: '', model: '', year: 2021, mileage: 30000, fuel_type: 'Gasoline', engine_hp: 300 });
  };

  // --- Rendu ---
  if (prediction !== null) return <PredictionResultCard price={prediction} onReset={handleReset} />;
  if (isLoading) return (
    <div className="text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">Notre IA réfléchit...</h2>
        <p className="text-xl text-cyan-400">{loadingMessage}</p>
    </div>
  );

  const currentQuestion = questions[step];
  return (
    <div className="max-w-xl mx-auto text-center">
      <form onSubmit={handleNextStep} className="animate-fade-in-up">
        <label className="text-2xl md:text-3xl text-slate-300 mb-6 block">
            {currentQuestion.label}
        </label>
        
        {currentQuestion.type === 'autocomplete' ? (
          <AutocompleteInput
            label=""
            value={formData[currentQuestion.key as keyof typeof formData] as string}
            onChange={(value) => {
              const newFormData = { ...formData, [currentQuestion.key]: value };
              if (currentQuestion.key === 'make') newFormData.model = '';
              setFormData(newFormData);
            }}
            suggestions={currentQuestion.key === 'make' ? Object.keys(carData) : modelsForMake}
          />
        ) : (
          <input
            name={currentQuestion.key}
            type={currentQuestion.type}
            value={formData[currentQuestion.key as keyof typeof formData]}
            onChange={(e) => setFormData({ ...formData, [currentQuestion.key]: e.target.value })}
            className="w-full text-center text-2xl p-4 bg-slate-800 border-b-2 border-cyan-500 focus:outline-none focus:border-cyan-300 text-white"
            autoFocus autoComplete="off"
          />
        )}
        
        <button type="submit" className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
            {step < questions.length - 1 ? "Suivant" : "Estimer le Prix"}
        </button>
      </form>
    </div>
  );
}