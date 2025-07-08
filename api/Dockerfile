# Utiliser une image Python officielle et légère
FROM python:3.10-slim

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier le fichier des dépendances et les installer
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le reste du dossier 'api' dans le conteneur
COPY . .

# Exposer le port 8000
EXPOSE 8000

# Commande à exécuter quand le conteneur démarre
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]