'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import PredictionResultCard from '@/components/PredictionResultCard';
import AutocompleteInput from '@/components/AutocompleteInput';

/**
 * Interface pour les données du formulaire de prédiction
 */
interface FormData {
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuel_type: string;
  engine_hp: number;
}

/**
 * Interface pour une question du formulaire interactif
 */
interface Question {
  key: keyof FormData;
  label: string;
  type: 'autocomplete' | 'number' | 'text';
}

/**
 * Composant PredictPage
 * Page de prédiction de prix avec formulaire interactif étape par étape
 */
export default function PredictPage() {
  // État du formulaire
  const [formData, setFormData] = useState<FormData>({
    make: '',
    model: '',
    year: 2021,
    mileage: 30000,
    fuel_type: 'Gasoline',
    engine_hp: 300,
  });

  // États de navigation et chargement
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [prediction, setPrediction] = useState<number | null>(null);

  // États pour l'autocomplétion
  const [carData, setCarData] = useState<Record<string, string[]>>({});
  const [modelsForMake, setModelsForMake] = useState<string[]>([]);

  // Configuration des questions du formulaire
  const questions: Question[] = [
    { 
      key: 'make', 
      label: "Quel constructeur a forgé ce véhicule ?", 
      type: 'autocomplete' 
    },
    { 
      key: 'model', 
      label: "Et quel est son modèle exact ?", 
      type: 'autocomplete' 
    },
    { 
      key: 'year', 
      label: "En quelle année a-t-il vu le jour ?", 
      type: 'number' 
    },
    { 
      key: 'mileage', 
      label: "Combien d'aventures a-t-il vécues (en km) ?", 
      type: 'number' 
    },
    { 
      key: 'fuel_type', 
      label: "Quelle énergie le fait vibrer ?", 
      type: 'text' 
    },
    { 
      key: 'engine_hp', 
      label: "Quelle est la puissance de son cœur (en ch) ?", 
      type: 'number' 
    },
  ];

  // Messages de chargement rotatifs
  const loadingMessages = [
    "Analyse des données...",
    "Consultation des archives...",
    "Calcul de la valeur..."
  ];

  /**
   * Chargement des données pour l'autocomplétion au démarrage
   */
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch('http://localhost:8001/car-data');
        const data = await response.json();
        setCarData(data);
      } catch (error) {
        console.error("Erreur de chargement des données d'autocomplétion:", error);
      }
    };

    fetchCarData();
  }, []);

  /**
   * Mise à jour de la liste des modèles quand la marque change
   */
  useEffect(() => {
    if (formData.make && carData[formData.make]) {
      setModelsForMake(carData[formData.make]);
    } else {
      setModelsForMake([]);
    }
  }, [formData.make, carData]);

  /**
   * Animation des messages de chargement
   */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLoading) {
      let messageIndex = 0;
      setLoadingMessage(loadingMessages[messageIndex]);
      
      interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[messageIndex]);
      }, 1500);
    }
    
    return () => clearInterval(interval);
  }, [isLoading]);

  /**
   * Soumission finale du formulaire pour obtenir la prédiction
   */
  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8001/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la prédiction');
      }
      
      const data = await response.json();
      setPrediction(data.predicted_price);
      
    } catch (error) {
      console.error('Erreur de prédiction:', error);
      alert("Erreur lors de la prédiction. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Gestion du passage à l'étape suivante
   */
  const handleNextStep = (e: FormEvent): void => {
    e.preventDefault();
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  /**
   * Réinitialisation complète du formulaire
   */
  const handleReset = (): void => {
    setPrediction(null);
    setStep(0);
    setFormData({
      make: '',
      model: '',
      year: 2021,
      mileage: 30000,
      fuel_type: 'Gasoline',
      engine_hp: 300
    });
  };

  /**
   * Mise à jour d'un champ du formulaire
   */
  const updateFormField = (key: keyof FormData, value: string | number): void => {
    const newFormData = { ...formData, [key]: value };
    
    // Réinitialisation du modèle si la marque change
    if (key === 'make') {
      newFormData.model = '';
    }
    
    setFormData(newFormData);
  };

  // Affichage du résultat de prédiction
  if (prediction !== null) {
    return <PredictionResultCard price={prediction} onReset={handleReset} />;
  }

  // Affichage du chargement
  if (isLoading) {
    return (
      <div className="text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">
          Notre IA réfléchit...
        </h2>
        <p className="text-xl text-cyan-400">
          {loadingMessage}
        </p>
      </div>
    );
  }

  // Affichage du formulaire étape par étape
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
            value={formData[currentQuestion.key] as string}
            onChange={(value) => updateFormField(currentQuestion.key, value)}
            suggestions={
              currentQuestion.key === 'make' 
                ? Object.keys(carData) 
                : modelsForMake
            }
          />
        ) : (
          <input
            name={currentQuestion.key}
            type={currentQuestion.type}
            value={formData[currentQuestion.key]}
            onChange={(e) => updateFormField(
              currentQuestion.key, 
              currentQuestion.type === 'number' 
                ? parseInt(e.target.value) || 0 
                : e.target.value
            )}
            className="w-full text-center text-2xl p-4 bg-slate-800 border-b-2 border-cyan-500 focus:outline-none focus:border-cyan-300 text-white"
            autoFocus
            autoComplete="off"
          />
        )}

        <button 
          type="submit" 
          className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
        >
          {step < questions.length - 1 ? "Suivant" : "Estimer le Prix"}
        </button>
      </form>
    </div>
  );
}