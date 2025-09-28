# Guide Utilisateur - Practo Note

## Vue d'ensemble
Practo Note est une application web mobile pour gérer vos fiches de prise en soin médicales stockées sur Google Drive.

## Première utilisation

### Configuration initiale
1. **Créer le dossier** : Dans Google Drive, créez un dossier nommé exactement "Fiches de Soin"
2. **Ajouter vos fiches** : Placez vos documents médicaux dans ce dossier
3. **Se connecter** : Ouvrez l'app et cliquez "Se connecter à Google Drive"

### Types de fichiers supportés
- Google Docs (recommandé pour la recherche dans le contenu)
- PDF
- Fichiers texte (.txt, .odt)

## Fonctionnalités principales

### Recherche avancée
- **Recherche simple** : Tapez dans la barre de recherche
- **Recherche dans le contenu** : Fonctionne avec les Google Docs
- **Recherche par tags** : Les tags médicaux sont détectés automatiquement
- **Effacer la recherche** : Cliquez sur le "×" à droite

### Tags automatiques
L'app détecte automatiquement les tags médicaux :
- Urgence, Pédiatrie, Cardiologie, Neurologie
- Infectieux, Traumato, Digestif, Respiratoire
- Protocole

### Navigation dans les documents
- **Menu sections** : Cliquez "☰ Sections" pour naviguer
- **Boutons flottants** : Apparaissent quand vous scrollez
- **Retour rapide** : Bouton "↑" en bas à droite

### Création de fiches
1. Cliquez le bouton orange "+" en bas à droite
2. Saisissez le titre et le contenu
3. Cliquez "Créer la fiche"
4. Le document sera automatiquement créé dans Google Drive

### Menu principal
Accédez au menu via l'icône "☰" en haut à droite :
- **Actualiser** : Recharge les fiches depuis Google Drive
- **Se déconnecter** : Déconnexion de Google Drive

## Optimisations performance

### Cache intelligent
- Les fiches sont mises en cache 24h
- Actualisation automatique si modifications détectées
- Cache vidé lors de l'actualisation manuelle

### Installation PWA
- Sur mobile : "Ajouter à l'écran d'accueil"
- Fonctionne comme une app native
- Accès rapide depuis l'écran d'accueil

## Conseils d'utilisation

### Organisation recommandée
- Nommage : "Fiche - [Pathologie/Patient]"
- Structure : Utilisez des titres avec émojis (🔹, 👉, ⚠️)
- Sections : Organisez en sections numérotées

### Recherche efficace
- Mots-clés courts pour la recherche rapide
- Utilisez les tags pour filtrer par spécialité
- Recherche dans le contenu pour retrouver des symptômes

### Sécurité
- Connexion via OAuth Google (sécurisée)
- Données restent sur votre Google Drive
- Accès lecture/écriture limité au dossier configuré

## Dépannage

### Problèmes courants
- **Fiches non visibles** : Vérifiez le nom exact du dossier "Fiches de Soin"
- **Recherche ne fonctionne pas** : Actualiser via le menu
- **Création échoue** : Vérifiez les permissions Google Drive

### Performance
- Cache automatique pour réduire les temps de chargement
- Actualisation manuelle si besoin de données fraîches
- Indexation en arrière-plan lors du premier accès

## Support
- URL de l'application : https://practonote.netlify.app
- Code source : GitHub (si public)