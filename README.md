# 🚗 Prédiction de Prix de Voitures d'Occasion

Ce projet est une application complète permettant de prédire le prix de voitures d'occasion à partir de leurs caractéristiques. Il combine un backend Python (API FastAPI + modèle XGBoost) et un frontend Next.js avec Tailwind CSS.

## Structure du projet

- `predict_sales_auto/`
  - `api/` : Backend FastAPI, modèle ML, Dockerfile
  - `frontend/` : Frontend Next.js, composants, assets, Dockerfile
  - `notebook_training/` : Notebook Jupyter pour l'entraînement du modèle
  - `public/` : Dossier partagé pour les assets

## Fonctionnalités principales

- Prédiction du prix d'une voiture selon ses caractéristiques
- Visualisation des résultats et métriques
- Téléchargement du rapport PDF
- Graphiques interactifs (matplotlib, seaborn)
- API REST pour la prédiction

## Installation rapide

1. **Cloner le repo**
2. **Lancer le backend**
   - Se placer dans `predict_sales_auto/api/`
   - Installer les dépendances : `pip install -r requirements.txt`
   - Lancer l'API : `uvicorn app.main:app --reload`
3. **Lancer le frontend**
   - Se placer dans `predict_sales_auto/frontend/`
   - Installer les dépendances : `npm install`
   - Lancer le serveur : `npm run dev`
4. **Utiliser Docker**
   - Utiliser `docker-compose.yml` à la racine pour tout lancer

## Entraînement du modèle

- Le notebook `notebook_training/training_script.ipynb` permet d'entraîner et sauvegarder le modèle ML.
- Les fichiers générés (`car_price_model.pkl`, `encoders.pkl`, `metrics.json`, images) sont utilisés par l'API et le frontend.

## Dépendances principales

- Backend : FastAPI, xgboost, scikit-learn, pandas, matplotlib, seaborn
- Frontend : Next.js, React, Tailwind CSS, jsPDF, html2canvas

## Utilisation

- Accéder au frontend sur `http://localhost:3000`
- Tester l'API sur `http://localhost:8000/docs`

## Auteur

- Projet réalisé par AndyKoloina

## Licence

MIT
