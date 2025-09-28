
# Installation de Practo Note

## Pour les utilisateurs finaux

### Accès direct
1. Rendez-vous sur : **https://practonote.netlify.app**
2. Ajoutez à l'écran d'accueil pour une utilisation optimale
3. Suivez le guide de première utilisation

### Prérequis
- Navigateur moderne (Chrome, Safari, Firefox)
- Compte Google avec accès à Google Drive
- Connexion internet

## Pour les développeurs

### Installation locale

#### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/care-sheets-app.git
cd care-sheets-app
2. Configuration Google Drive API
A. Créer un projet Google Cloud

Allez sur Google Cloud Console
Créez un nouveau projet ou sélectionnez un existant
Notez l'ID du projet

B. Activer les APIs nécessaires
bash# APIs à activer :
- Google Drive API
- Google Docs API
Navigation dans la console :

Menu → APIs et services → Bibliothèque
Recherchez et activez chaque API

C. Créer les identifiants OAuth

APIs et services → Identifiants
"+ CRÉER DES IDENTIFIANTS" → ID client OAuth 2.0
Configurer l'écran de consentement si demandé
Type d'application : "Application Web"
Origines JavaScript autorisées :

http://localhost:8000
https://votre-domaine.com (si déploiement)


URI de redirection autorisés :

http://localhost:8000
https://votre-domaine.com



D. Configuration du fichier config
Créez config.js avec vos identifiants :
javascriptconst CONFIG = {
    CLIENT_ID: 'votre-id-client.apps.googleusercontent.com'
    // CLIENT_SECRET non nécessaire pour une app front-end
};
3. Lancement local
bash# Serveur Python simple
python3 -m http.server 8000

# Ou serveur Node.js
npx http-server -p 8000

# Accédez à http://localhost:8000
Déploiement
Netlify (recommandé)

Fork le repository sur GitHub
Connectez votre compte Netlify à GitHub
Nouveau site depuis Git → Sélectionner le repo
Configuration de build :

Build command : (laisser vide)
Publish directory : (laisser vide)


Deploy site

GitHub Pages

Repository → Settings → Pages
Source : "Deploy from a branch"
Branch : main, folder : / (root)
Mettre à jour les URLs OAuth dans Google Cloud

Autres plateformes
Compatible avec :

Vercel
Firebase Hosting
Apache/Nginx

Structure du projet
care-sheets-app/
├── index.html              # Interface principale
├── styles.css              # Styles (thème sombre médical)
├── app.js                  # Logique métier
├── manifest.json           # Configuration PWA
├── config.js               # Configuration API (à créer)
├── netlify.toml           # Configuration Netlify
├── README.md              # Documentation technique
├── GUIDE-UTILISATEUR.md   # Guide utilisateur
├── INSTALLATION.md        # Ce fichier
└── docs/                  # Documentation additionnelle
Variables d'environnement
Pour un déploiement sécurisé, utilisez les variables d'environnement :
Netlify
bash# Dans Netlify dashboard → Site settings → Environment variables
GOOGLE_CLIENT_ID=votre-id-client
Autres plateformes
Adaptez selon la plateforme :

Vercel : .env ou dashboard
Heroku : Config vars
Docker : Variables d'environnement

Personnalisation
Thème et couleurs
Variables CSS principales dans styles.css :
css/* Couleurs principales */
--primary-blue: #59B6FF
--orange-accent: #FB8C00
--background: #212121
--card-background: #2C2C2C
Tags médicaux
Personnalisez les tags dans app.js :
javascriptconst MEDICAL_TAGS = {
    'votre-tag': ['mot-cle1', 'mot-cle2'],
    // Ajoutez vos tags personnalisés
};
Branding

Logo : Modifiez les SVG dans index.html
Nom de l'app : Changez "Practo Note" dans les fichiers
Couleurs : Adaptez le thème dans styles.css

Dépannage développeur
Erreurs communes

403 Forbidden : Vérifier les permissions OAuth
API non activée : Activer Google Drive API + Google Docs API
CORS : Vérifier les origines autorisées
Cache : Vider localStorage si problèmes

Debug
javascript// Console du navigateur
localStorage.clear()           // Vider le cache
console.log(accessToken)       // Vérifier le token
console.log(filesIndex)        // Vérifier l'index des fiches
Contribution
Standards de code

JavaScript ES6+
CSS moderne (Grid, Flexbox)
Mobile-first design
Accessibilité WCAG

Tests
bash# Tests manuels recommandés
- Connexion/déconnexion Google
- Recherche avec différents termes
- Création de fiches
- Navigation mobile
- Performance cache
Licence
[Indiquez votre licence ici]
Support

Issues GitHub : [URL du repository]/issues
Documentation : Ce repository
Contact : [Votre email de contact]
EOF


**Commitez la documentation :**
```bash
git add GUIDE-UTILISATEUR.md INSTALLATION.md
git commit -m "Add complete documentation"
git push origin main
