"""
API de Prédiction de Prix Automobile

Cette API utilise un modèle de machine learning entraîné pour prédire
le prix d'une voiture basé sur ses caractéristiques.
"""

import pickle
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List

# ===============================
# Chargement du modèle et des encodeurs
# ===============================

try:
    # Chargement du modèle de prédiction
    with open("model/car_price_model.pkl", "rb") as model_file:
        model = pickle.load(model_file)
    
    # Chargement des encodeurs pour les variables catégorielles
    with open("model/encoders.pkl", "rb") as encoders_file:
        encoders = pickle.load(encoders_file)
    
    # Récupération de l'ordre des colonnes attendu par le modèle
    expected_columns = model.get_booster().feature_names
    
except FileNotFoundError as e:
    raise RuntimeError(f"Fichier modèle non trouvé : {e}")
except Exception as e:
    raise RuntimeError(f"Erreur critique au chargement du modèle : {e}")

# ===============================
# Modèles de données
# ===============================

class CarFeatures(BaseModel):
    """
    Modèle de données pour les caractéristiques d'une voiture
    """
    make: str          # Marque du véhicule
    model: str         # Modèle du véhicule
    year: int          # Année de fabrication
    mileage: int       # Kilométrage
    fuel_type: str     # Type de carburant
    engine_hp: int     # Puissance du moteur en chevaux

# ===============================
# Configuration de l'API
# ===============================

app = FastAPI(
    title="API de Prédiction de Prix Automobile",
    description="API pour prédire le prix d'une voiture basé sur ses caractéristiques",
    version="1.0.0"
)

# Configuration CORS pour permettre les requêtes depuis le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# Endpoints de l'API
# ===============================

@app.post("/predict")
def predict_price(features: CarFeatures) -> Dict[str, float]:
    """
    Prédit le prix d'une voiture basé sur ses caractéristiques
    
    Args:
        features: Caractéristiques de la voiture
        
    Returns:
        Dictionnaire contenant le prix prédit
        
    Raises:
        HTTPException: En cas d'erreur lors de la prédiction
    """
    try:
        # Conversion des données en DataFrame
        input_df = pd.DataFrame([features.dict()])
        
        # Gestion des variables catégorielles
        for column, encoder in encoders.items():
            if column in input_df.columns:
                # Encodage des valeurs connues, -1 pour les valeurs inconnues
                input_df[column] = input_df[column].apply(
                    lambda x: encoder.transform([x])[0] if x in encoder.classes_ else -1
                )
        
        # Réorganisation des colonnes selon l'ordre attendu par le modèle
        input_df = input_df[expected_columns]

        # Prédiction du prix
        prediction = model.predict(input_df)[0]
        
        return {"predicted_price": round(float(prediction))}

    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Erreur lors de la prédiction : {str(e)}"
        )

@app.get("/car-data")
def get_car_data() -> Dict[str, List[str]]:
    """
    Récupère les données des voitures pour l'autocomplétion
    
    Returns:
        Dictionnaire avec les marques comme clés et les modèles comme valeurs
        
    Raises:
        HTTPException: En cas d'erreur lors de la lecture des données
    """
    try:
        # Lecture du fichier CSV avec les données des voitures
        df = pd.read_csv('df3.csv', usecols=['model1', 'model2'])
        df_cleaned = df[['model1', 'model2']].dropna()

        # Regroupement par marque et collecte des modèles uniques
        car_data = (
            df_cleaned
            .groupby('model1')['model2']
            .unique()
            .apply(list)
            .to_dict()
        )
        
        return car_data
        
    except FileNotFoundError:
        raise HTTPException(
            status_code=404, 
            detail="Fichier de données df3.csv non trouvé"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Erreur lors de la lecture des données : {str(e)}"
        )