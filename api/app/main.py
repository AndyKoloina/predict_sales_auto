import pickle
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# --- Chargement du modèle et des encodeurs ---
try:
    with open("model/car_price_model.pkl", "rb") as f_model:
        model = pickle.load(f_model)
    with open("model/encoders.pkl", "rb") as f_encoders:
        encoders = pickle.load(f_encoders)
    # On récupère l'ordre des colonnes une seule fois au démarrage
    expected_columns = model.get_booster().feature_names
except Exception as e:
    raise RuntimeError(f"Erreur critique au chargement du modèle : {e}")


# --- Modèle de données d'entrée ---
class CarFeatures(BaseModel):
    make: str
    model: str
    year: int
    mileage: int
    fuel_type: str
    engine_hp: int

# --- API FastAPI ---
app = FastAPI(title="API de Prédiction de Prix Automobile")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
def predict_price(features: CarFeatures):
    try:
        input_df = pd.DataFrame([features.dict()])
        
        # --- ✅ GESTION ROBUSTE DES NOUVELLES CATÉGORIES ---
        for column, encoder in encoders.items():
            if column in input_df.columns:
                # On applique une fonction qui gère les valeurs inconnues
                # La fonction transformera les valeurs connues et mettra -1 pour les inconnues
                input_df[column] = input_df[column].apply(
                    lambda x: encoder.transform([x])[0] if x in encoder.classes_ else -1
                )
        
        # On s'assure que le DataFrame est dans le bon ordre
        input_df = input_df[expected_columns]

        # On fait la prédiction
        prediction = model.predict(input_df)[0]
        
        return {"predicted_price": round(float(prediction))}

    except Exception as e:
        # Si une erreur survient, on renvoie une réponse claire
        raise HTTPException(status_code=500, detail=f"Erreur interne lors de la prédiction : {e}")
    
# --- Endpoint pour l'autocomplétion des marques et modèles ---
@app.get("/car-data")
def get_car_data():
    """
    Lit le fichier CSV et renvoie une structure de données avec toutes
    les marques et les modèles uniques pour l'autocomplétion.
    """
    try:
        # On utilise les noms de colonnes originaux du fichier CSV
        df = pd.read_csv('df3.csv', usecols=['model1', 'model2'])
        df_cleaned = df[['model1', 'model2']].dropna()

        # On regroupe par marque (model1) et on collecte tous les modèles uniques (model2)
        car_data = df_cleaned.groupby('model1')['model2'].unique().apply(list).to_dict()
        
        return car_data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Fichier de données df3.csv non trouvé.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur interne du serveur : {e}")