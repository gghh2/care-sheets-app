let accessToken = null;

// Afficher bouton de connexion
function showLoginButton() {
    const header = document.querySelector('.header');
    header.innerHTML += `
        <button onclick="signInWithGoogle()" id="loginBtn" style="
            background: #4285f4; 
            color: white; 
            border: none; 
            padding: 10px 20px; 
            border-radius: 5px; 
            margin-top: 10px;
            cursor: pointer;
        ">Se connecter à Google Drive</button>
    `;
}

// Connexion Google
function signInWithGoogle() {
    google.accounts.oauth2.initTokenClient({
        client_id: CONFIG.CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.readonly',
        callback: (response) => {
            if (response.access_token) {
                accessToken = response.access_token;
                // Sauvegarder le token
                localStorage.setItem('googleToken', accessToken);
                localStorage.setItem('tokenExpiry', Date.now() + (response.expires_in * 1000));
                
                document.getElementById('loginBtn').textContent = 'Connecté !';
                console.log('Connecté à Google Drive');
                
                // Cacher le bouton après 3 secondes
                setTimeout(() => {
                    const loginBtn = document.getElementById('loginBtn');
                    if (loginBtn) {
                        loginBtn.style.transition = 'opacity 0.5s ease';
                        loginBtn.style.opacity = '0';
                        setTimeout(() => {
                            loginBtn.remove();
                        }, 500);
                    }
                }, 3000);
                
                checkFirstTimeUser();
            }
        },
    }).requestAccessToken();
}


function initGoogleAuth() {
    // Vérifier si un token existe déjà
    const savedToken = localStorage.getItem('googleToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    if (savedToken && tokenExpiry && Date.now() < tokenExpiry) {
        accessToken = savedToken;
        checkFirstTimeUser();
        return; // Ne pas afficher le bouton si déjà connecté
    }
    
    google.accounts.id.initialize({
        client_id: CONFIG.CLIENT_ID
    });
    
    showLoginButton();
}

// Chargement initial
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        initGoogleAuth();
    }, 2000);
});

function loadGoogleDriveFiles() {
    if (!accessToken) return;
    
    // D'abord trouver l'ID du dossier "Fiches de Soin"
    fetch('https://www.googleapis.com/drive/v3/files?q=name="Fiches de Soin" and mimeType="application/vnd.google-apps.folder"', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.files.length > 0) {
            const folderId = data.files[0].id;
            // Ensuite chercher les fichiers dans ce dossier
            return fetch(`https://www.googleapis.com/drive/v3/files?q=parents in '${folderId}'`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
        }
    })
    .then(response => response.json())
    .then(data => {
        displayFiles(data.files || []);
    });
}

// Afficher les fichiers
function displayFiles(files) {
    const filesList = document.getElementById('filesList');
    filesList.innerHTML = '';
    
    files.forEach(file => {
        // Meilleure détection du type de fichier
        let fileType = 'TXT';
        const mimeType = file.mimeType;
        
        if (mimeType === 'application/vnd.google-apps.folder') {
            fileType = 'DIR';
        } else if (mimeType === 'application/vnd.google-apps.document') {
            fileType = 'GDoc';
        } else if (mimeType === 'application/pdf') {
            fileType = 'PDF';
        } else if (mimeType === 'application/vnd.oasis.opendocument.text') {
            fileType = 'ODT';
        } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            fileType = 'DOCX';
        } else if (mimeType === 'application/msword') {
            fileType = 'DOC';
        } else if (mimeType.includes('image')) {
            fileType = 'IMG';
        } else if (mimeType.includes('text')) {
            fileType = 'TXT';
        } else {
            // Si pas de match, utiliser l'extension du nom de fichier
            const extension = file.name.split('.').pop().toUpperCase();
            if (extension && extension !== file.name.toUpperCase()) {
                fileType = extension.substring(0, 4);
            }
        }
        
        // Truncate le titre si pas d'espace et trop long
        let displayName = file.name;
        if (!file.name.includes(' ') && file.name.length > 15) {
            displayName = file.name.substring(0, 12) + '...';
        }
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        // Ne pas permettre d'ouvrir les dossiers
        if (fileType !== 'DIR') {
            fileItem.onclick = () => openFile(file.name, file.id);
        }
        fileItem.innerHTML = `
            <div class="file-name">${displayName}</div>
            <div style="margin-top: auto;">
                <div style="font-size: 24px; color: #535B75; text-align: center; margin: 10px 0; font-weight: bold;">${fileType}</div>
                <div class="file-date">Google Drive</div>
            </div>
        `;
        filesList.appendChild(fileItem);
    });
}

// Vérifier si c'est un nouvel utilisateur
function checkFirstTimeUser() {
    console.log('Vérification nouvel utilisateur...');
    fetch('https://www.googleapis.com/drive/v3/files?q=name="Fiches de Soin"', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dossiers trouvés:', data.files);
        if (data.files.length === 0) {
            console.log('Nouvel utilisateur détecté');
            showWelcomeGuide();
        } else {
            console.log('Utilisateur existant');
            loadGoogleDriveFiles();
        }
    });
}

// Guide de bienvenue
function showWelcomeGuide() {
    const guide = document.createElement('div');
    guide.innerHTML = `
        <div style="background: #2a2a2a; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>🎉 Bienvenue !</h3>
            <p><strong>Pour commencer :</strong></p>
            <ol>
                <li>Créez un dossier "Fiches de Soin" sur Google Drive</li>
                <li>Nommez vos fiches : "Fiche - [Nom Patient]"</li>
                <li>Actualisez l'app</li>
            </ol>
            <button onclick="this.parentElement.remove(); loadGoogleDriveFiles();" style="margin-top: 10px; background: #64B5F6; color: white; border: none; padding: 8px 16px; border-radius: 5px;">Compris !</button>
        </div>
    `;
    document.querySelector('.main-app').appendChild(guide);
}

// Fonction pour supprimer les accents
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Recherche en temps réel améliorée
document.getElementById('searchInput').addEventListener('input', function() {
    const query = removeAccents(this.value.toLowerCase());
    const allFiles = document.querySelectorAll('.file-item');
    
    allFiles.forEach(item => {
        const fileName = removeAccents(item.querySelector('.file-name').textContent.toLowerCase());
        if (fileName.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Ouvrir une fiche
function openFile(fileName, fileId) {
    // D'abord récupérer les métadonnées pour connaître le type
    fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(fileData => {
        const mimeType = fileData.mimeType;
        
        if (mimeType === 'application/vnd.google-apps.document') {
            // Google Doc - export en texte
            openGoogleDoc(fileName, fileId);
        // Dans openFile, remplacez la ligne openPDF par :
        } else if (mimeType === 'application/pdf') {
            // PDF - ouvrir dans Google Drive
            showFileContent(fileName, `
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 48px; margin-bottom: 20px;">📄</div>
                    <p style="margin-bottom: 20px;">Fichier PDF</p>
                    <a href="${fileData.webViewLink}" target="_blank" style="color: #64B5F6; text-decoration: underline;">
                        Ouvrir dans Google Drive →
                    </a>
                </div>
            `);
        } else {
            // Fichier texte normal
            openTextFile(fileName, fileId);
        }
    });
}

// Ouvrir Google Doc
function openGoogleDoc(fileName, fileId) {
    fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.text())
    .then(content => {
        console.log('Contenu Google Doc récupéré');
        showFileContent(fileName, content);
    });
}


// Ouvrir fichier texte
function openTextFile(fileName, fileId) {
    fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.text())
    .then(content => {
        console.log('Contenu fichier texte récupéré');
        showFileContent(fileName, content);
    });
}

// Afficher le contenu de la fiche avec navigation flottante
function showFileContent(fileName, content) {
    const cleanContent = content
        .split('\n')
        .map(line => line.trim())
        .join('\n')
        .replace(/^\n+/, '')
        .replace(/\n{3,}/g, '\n\n');
    
    const sections = extractSections(cleanContent);
    
    const mainApp = document.getElementById('mainApp');
    mainApp.innerHTML = `
        <div class="file-viewer" style="position: relative; height: 100vh; overflow: hidden;">
            <!-- Boutons flottants cachés par défaut -->
            <div id="floatingButtons" style="
                position: fixed;
                top: 20px;
                left: 20px;
                right: 20px;
                z-index: 1001;
                display: none;
                justify-content: space-between;
                align-items: center;
                background: rgba(33, 33, 33, 0.95);
                padding: 10px 15px;
                border-radius: 8px;
                backdrop-filter: blur(10px);
            ">
                <button onclick="goBack()" style="background: #333; color: white; border: none; padding: 8px 12px; border-radius: 5px;">← Retour</button>
                ${sections.length > 1 ? `
                    <button onclick="toggleNavigation()" style="background: #1E88E5; color: white; border: none; padding: 8px 12px; border-radius: 5px;">☰ Sections</button>
                ` : ''}
            </div>

            <!-- Bouton remonter en haut -->
            <button id="scrollTopBtn" onclick="scrollToTop()" style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1002;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #1E88E5;
                color: white;
                border: none;
                font-size: 20px;
                cursor: pointer;
                display: none;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            ">↑</button>
            
            <!-- Menu overlay -->
            <div id="navigationMenu" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 1000;
                display: none;
                padding: 20px;
                box-sizing: border-box;
                overflow-y: auto;
            ">
                <div style="background: #2C2C2C; border-radius: 10px; padding: 20px; max-width: 300px; margin: 0 auto; max-height: 80vh; display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="color: #1E88E5; margin: 0; font-size: 16px;">Navigation</h3>
                        <button onclick="toggleNavigation()" style="background: #333; color: white; border: none; padding: 5px 10px; border-radius: 5px;">✕</button>
                    </div>
                    <div style="overflow-y: auto; flex: 1;">
                        ${sections.map((section, index) => `
                            <div onclick="scrollToSection(${index}); toggleNavigation();" style="
                                padding: 12px; 
                                cursor: pointer; 
                                border-radius: 5px; 
                                margin-bottom: 8px;
                                background: #3A3A3A;
                                color: #FAFAFA;
                                border-left: 3px solid #1E88E5;
                            ">
                                ${section.title}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Contenu principal -->
            <div class="content-area" style="height: 100vh; overflow-y: auto; padding: 20px;" id="contentArea">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;" id="topButtons">
                    <button onclick="goBack()" style="background: #333; color: white; border: none; padding: 8px 12px; border-radius: 5px;">← Retour</button>
                    ${sections.length > 1 ? `
                        <button onclick="toggleNavigation()" style="background: #1E88E5; color: white; border: none; padding: 8px 12px; border-radius: 5px;">☰ Sections</button>
                    ` : ''}
                </div>
                <h2 style="color: #1E88E5; margin-bottom: 20px;">${fileName}</h2>
                <div style="background: #2C2C2C; padding: 20px; border-radius: 10px; white-space: pre-wrap; line-height: 1.6; font-size: 14px;">
                    ${addSectionAnchors(cleanContent, sections)}
                </div>
            </div>
        </div>
    `;
    
    // Gestion du scroll pour afficher/cacher les boutons flottants
    const contentArea = document.getElementById('contentArea');
    const floatingButtons = document.getElementById('floatingButtons');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const topButtons = document.getElementById('topButtons');
    
    contentArea.addEventListener('scroll', function() {
        const topButtonsRect = topButtons.getBoundingClientRect();
        const shouldShowFloating = topButtonsRect.bottom < 0;
        
        floatingButtons.style.display = shouldShowFloating ? 'flex' : 'none';
        scrollTopBtn.style.display = this.scrollTop > 300 ? 'block' : 'none';
    });
}

// Fonction pour remonter en haut
function scrollToTop() {
    document.getElementById('contentArea').scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Basculer l'affichage du menu navigation
function toggleNavigation() {
    const menu = document.getElementById('navigationMenu');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
        scrollTopBtn.style.display = 'none'; // Cacher la flèche quand menu ouvert
    } else {
        menu.style.display = 'none';
        // La flèche réapparaîtra selon le scroll
    }
}

// Extraire les sections du document
function extractSections(content) {
    const lines = content.split('\n');
    const sections = [];
    
    lines.forEach((line, index) => {
        // Détecter les patterns de titres/sections
        if (line.match(/^[🔹📋🚨👉💡⚠️🎯]/) || 
            line.match(/^\d+\./) || 
            line.match(/^[A-Z][^a-z]*$/) ||
            line.includes('___')) {
            
            let title = line.replace(/[🔹📋🚨👉💡⚠️🎯]/g, '').trim();
            if (title.length > 30) title = title.substring(0, 27) + '...';
            
            sections.push({
                title: title || `Section ${sections.length + 1}`,
                lineIndex: index
            });
        }
    });
    
    return sections;
}

// Ajouter des ancres pour la navigation
function addSectionAnchors(content, sections) {
    let result = content;
    sections.forEach((section, index) => {
        const lines = result.split('\n');
        if (lines[section.lineIndex]) {
            lines[section.lineIndex] = `<span id="section-${index}"></span>${lines[section.lineIndex]}`;
            result = lines.join('\n');
        }
    });
    return result;
}

// Naviguer vers une section
function scrollToSection(sectionIndex) {
    const element = document.getElementById(`section-${sectionIndex}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Mettre en surbrillance l'élément de navigation actif
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        item.style.background = index === sectionIndex ? '#333' : 'transparent';
    });
}


// Retour à la liste
function goBack() {
    // Restaurer l'interface principale
    const mainApp = document.getElementById('mainApp');
    mainApp.innerHTML = `
        <div class="header">
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                <div style="width: 40px; height: 40px; background: #FB8C00; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                    <div style="width: 20px; height: 20px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#FB8C00">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                    </div>
                </div>
                <h1 style="color: #59B6FF; font-size: 42px; font-weight: 600; margin: 0;">Practo Note</h1>
            </div>
            <p>Recherchez une fiche de prise en soin</p>
        </div>
        
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Rechercher une fiche..." id="searchInput">
            <div class="autocomplete-list" id="autocompleteList"></div>
        </div>
        
        <div class="recent-files">
            <h2>📁 Fiches récentes</h2>
            <div id="filesList"></div>
        </div>
    `;
    
    // Recharger les fiches et la recherche
    loadGoogleDriveFiles();
    setupSearch();
}

// Fonction pour la recherche (à extraire)
function setupSearch() {
    document.getElementById('searchInput').addEventListener('input', function() {
        const query = removeAccents(this.value.toLowerCase());
        const allFiles = document.querySelectorAll('.file-item');
        
        allFiles.forEach(item => {
            const fileName = removeAccents(item.querySelector('.file-name').textContent.toLowerCase());
            if (fileName.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}