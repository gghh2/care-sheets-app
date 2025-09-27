# Care Sheets App

A web application to manage and share care sheets for various subjects.

## Description

Care Sheets App helps users create, organize, and share care sheets easily. Perfect for hobbyists, educators, or anyone needing structured care instructions.

## Installation

```bash
git clone https://github.com/gghh2/care-sheets-app.git
cd care-sheets-app
# Install dependencies
npm install
# Start the application
npm start
```

## Usage

After installation, open your browser and go to `http://localhost:3000` to use the app.  
Create, edit, and manage care sheets from the dashboard.

## Contributing

Contributions are welcome!  
Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

2. Configuration Google Drive API

Allez sur Google Cloud Console
Créez un nouveau projet ou sélectionnez un existant
Activez l'API Google Drive :

Menu → APIs et services → Bibliothèque
Recherchez "Google Drive API" → Activer


Créez des identifiants OAuth :

APIs et services → Identifiants


CRÉER DES IDENTIFIANTS → ID client OAuth 2.0


Type : Application Web
Origines JavaScript : http://localhost:8000
URI de redirection : http://localhost:8000


Copiez vos identifiants dans config.js :

javascriptconst CONFIG = {
    CLIENT_ID: 'votre-id-client.apps.googleusercontent.com',
    CLIENT_SECRET: 'votre-code-secret'
};
3. Préparation Google Drive

Créez un dossier "Fiches de Soin" dans votre Google Drive
Ajoutez vos fiches (Google Docs, PDF, etc.)
Nommage recommandé : "Fiche - [Nom Patient]"

4. Lancement
bashpython3 -m http.server 8000
Ouvrez http://localhost:8000 dans votre navigateur.
Structure du projet
care-sheets-app/
├── index.html          # Interface principale
├── styles.css          # Design médical sombre
├── app.js             # Logique Google Drive + navigation
├── manifest.json      # Configuration PWA
├── config.js          # Clés API (à créer)
└── README.md          # Ce guide