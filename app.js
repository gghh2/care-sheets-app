let accessToken = null;


const MEDICAL_TAGS = {
    'urgence': [
        'urgence','urgent','critique','alerte','samu','smur','réanimation','réa',
        'détresse','choc','arrêt cardiaque','arret cardiaque','RCP','ACR',
        'défibrillation','massage cardiaque','intubation','ventilation',
        'polytrauma','traumatisme majeur','crash','SAMU','SMUR'
    ],
    'pédiatrie': [
        'enfant','pédiatrique','nourrisson','bébé','pediatr','adolescent','ado',
        'néonat','nouveau-né','infantile','pré-maturé','vaccin','ROR','diphterie',
        'varicelle','bronchiolite','laryngite','otite','angine','coqueluche'
    ],
    'cardiologie': [
        'cardiaque','coeur','ecg','tension','hypertension','HTA','tachycardie',
        'bradycardie','infarctus','angor','syndrome coronarien','SCA',
        'insuffisance cardiaque','IC','arythmie','fibrillation','flutter',
        'stemi','nstemi','angine de poitrine','trouble conduction',
        'pacemaker','défibrillateur implantable','BAV','QT long'
    ],
    'neurologie': [
        'neurologie','céphalée','migraine','avc','épilepsie','crise tonico-clonique',
        'coma','ictus','neuropathie','sclérose','parkinson','ischémie cérébrale',
        'hémorragie cérébrale','convulsion','status epilepticus','myasthénie',
        'guillain barré','sclérose en plaques','ataxie','amnésie','neuropathie périphérique'
    ],
    'infectieux': [
        'infection','fièvre','antibio','viral','bactérien','sepsis','septicémie',
        'abcès','méningite','endocardite','tuberculose','grippe','covid','vih',
        'hépatite','paludisme','dengue','chikungunya','leptospirose','zika',
        'angine bactérienne','pneumonie infectieuse','impétigo','gale',
        'zona','herpès','staphylocoque','streptocoque'
    ],
    'traumato': [
        'fracture','trauma','blessure','plaie','chute','luxation','entorse',
        'hématome','polytrauma','plaie pénétrante','brûlure','crâne',
        'traumatisme crânien','traumatisme abdominal','traumatisme thoracique',
        'AVP','plaie ouverte','plaie artérielle','hémorragie externe',
        'plâtre','immobilisation','polyfracture'
    ],
    'digestif': [
        'digestif','gastro','nausée','vomissement','diarrhée','appendicite',
        'occlusion','ulcère','hépatite','pancréatite','cirrhose','reflux',
        'iléus','colique','hémorragie digestive','méléna','hématémèse',
        'gastrite','rectocolite','crohn','ictère','calcul biliaire',
        'cholécystite','angiocholite','ascite'
    ],
    'respiratoire': [
        'respiration','asthme','pneumonie','dyspnée','toux','BPCO','hypoxie',
        'hémoptysie','pleurésie','pneumothorax','bronchiolite','oedème pulmonaire',
        'intubation','ventilation','saturation','oxygène','O₂','VNI','intoxication CO',
        'SDRA','silicose','tuberculose pulmonaire','emphysème'
    ],
    'protocole': [
        'protocole','procédure','guideline','recommandation','checklist',
        'arbre décisionnel','algorithme','fiche technique','standard de soin',
        'good practice','consensus','HAS','OMS','workflow'
    ],
    'néphrologie': [
        'rein','dialyse','urémi','créatinine','hématurie','IRA','IRC','protéinurie',
        'lithiase','colique néphrétique','insuffisance rénale','hyperkaliémie',
        'hypokaliémie','néphropathie','pyélonéphrite','cystite','clairance',
        'DFG','transplantation rénale'
    ],
    'hématologie': [
        'sang','anémie','thrombose','leucémie','lymphome','drépanocytose',
        'coagulation','plaquettes','pancytopénie','neutropénie','hémophilie',
        'thrombopénie','hématocrite','Hb','hémoglobinopathie','hémorragie',
        'anticoagulant','AVK','héparine'
    ],
    'dermatologie': [
        'peau','rash','eczéma','psoriasis','urticaire','dermatite','lésion cutanée',
        'brûlure','érythème','nodule cutané','ulcère cutané','acné','furoncle',
        'verrue','impétigo','dermatophytie','teigne'
    ],
    'endocrino': [
        'diabète','glycémie','thyroïde','hypothyroïdie','hyperthyroïdie','cortisol',
        'insuline','hypoglycémie','hyperglycémie','goitre','hormone','TSH',
        'addison','cushing','obésité','métabolisme','parathyroïde','calcium',
        'vitamine D','ménopause'
    ],
    'psychiatrie': [
        'psy','dépression','suicide','hallucination','psychose','anxiété',
        'bipolaire','schizophrénie','trouble panique','insomnie','TOC',
        'stress post-traumatique','TS','phobie','trouble alimentaire',
        'anorexie','boulimie','TSH psychiatrique'
    ],
    'gynéco-obstétrique': [
        'grossesse','femme enceinte','obstétrique','gynéco','césarienne',
        'accouchement','hémorragie post-partum','contraception','fiv',
        'endometriose','avortement','menstruation','cycle','dysménorrhée',
        'ménopause','syndrome prémenstruel','sage-femme','échographie obstétricale',
        'foetus','placenta'
    ],
    'oncologie': [
        'cancer','tumeur','chimiothérapie','radiothérapie','carcinome',
        'métastase','sarcome','immunothérapie','oncologue','bilan d’extension',
        'curiethérapie','prostate','sein','col de l’utérus','poumon','pancréas'
    ]
};




// Afficher bouton de connexion avec tutoriel
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
        
        <!-- Tutoriel sous le bouton -->
        <div style="background: #2a2a2a; padding: 15px; border-radius: 8px; margin-top: 15px; font-size: 13px;">
            <h4 style="color: #FB8C00; margin-bottom: 10px;">Pour commencer :</h4>
            <ol style="color: #ccc; padding-left: 20px; line-height: 1.5;">
                <li>Créez un dossier "Fiches de Soin" sur Google Drive</li>
                <li>Ajoutez-y vos fiches médicales</li>
                <li>Connectez-vous pour accéder à vos fiches</li>
            </ol>
        </div>
    `;
}

// Connexion Google avec permissions d'écriture
function signInWithGoogle() {
    google.accounts.oauth2.initTokenClient({
        client_id: CONFIG.CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly',
        callback: (response) => {
            if (response.access_token) {
                accessToken = response.access_token;
                localStorage.setItem('googleToken', accessToken);
                localStorage.setItem('tokenExpiry', Date.now() + (response.expires_in * 1000));
                
                document.getElementById('loginBtn').textContent = 'Connecté !';
                console.log('Connecté à Google Drive');
                
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
    console.log('loadGoogleDriveFiles appelée, accessToken:', !!accessToken);
    
    if (!accessToken) return;
    
    // D'abord trouver l'ID du dossier "Fiches de Soin"
    fetch('https://www.googleapis.com/drive/v3/files?q=name="Fiches de Soin" and mimeType="application/vnd.google-apps.folder" and trashed=false', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => {
        console.log('Réponse dossier:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Données dossier:', data);
        if (data.files.length > 0) {
            const folderId = data.files[0].id;
            console.log('ID dossier:', folderId);
            // AJOUT: exclure les fichiers supprimés
            return fetch(`https://www.googleapis.com/drive/v3/files?q=parents in '${folderId}' and trashed=false`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
        }
    })
    .then(response => {
        console.log('Réponse fichiers:', response.status);
        return response.json();
    })
        .then(data => {
        console.log('Fichiers récupérés (sans corbeille):', data.files?.length);
        loadFilesWithCache(data.files || []); // Remplacer displayFiles par loadFilesWithCache
    })
    .catch(error => {
        console.error('Erreur loadGoogleDriveFiles:', error);
    });
}

function displayFiles(files) {
    const filesList = document.getElementById('filesList');
    filesList.innerHTML = '';
    
    // Générer la liste des tags disponibles
    updateTagsList(files);
    
    files.forEach(file => {
        let fileType = 'TXT';
        if (file.mimeType === 'application/vnd.google-apps.folder') {
            fileType = 'DIR';
        } else if (file.mimeType === 'application/vnd.google-apps.document') {
            fileType = 'GDoc';
        } else if (file.mimeType === 'application/pdf') {
            fileType = 'PDF';
        } else if (file.mimeType === 'application/vnd.oasis.opendocument.text') {
            fileType = 'ODT';
        } else if (file.mimeType.includes('image')) {
            fileType = 'IMG';
        }
        
        let displayName = file.name;
        if (!file.name.includes(' ') && file.name.length > 15) {
            displayName = file.name.substring(0, 12) + '...';
        }
        
        // Tags sous le titre avec première lettre majuscule
        const tagsHtml = file.tags && file.tags.length > 0 ? 
            `<div style="display: flex; flex-wrap: wrap; gap: 3px; margin-top: 5px;">
                ${file.tags.slice(0, 3).map(tag => 
                    `<span style="background: #1E88E5; color: white; font-size: 8px; padding: 2px 4px; border-radius: 3px;">${tag.charAt(0).toUpperCase() + tag.slice(1)}</span>`
                ).join('')}
                ${file.tags.length > 3 ? `<span style="color: #888; font-size: 8px;">+${file.tags.length - 3}</span>` : ''}
             </div>` : '';
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        if (fileType !== 'DIR') {
            fileItem.onclick = () => openFile(file.name, file.id);
        }
        
        fileItem.innerHTML = `
            <div>
                <div class="file-name">${displayName}</div>
                ${tagsHtml}
            </div>
            <div class="file-date" style="font-size: 9px; margin-top: auto;">GDrive • ${fileType}</div>
        `;
        filesList.appendChild(fileItem);
    });
}

let tagsExpanded = false; // Variable globale pour l'état

// Mettre à jour la liste des tags disponibles
function updateTagsList(files) {
    const tagsList = document.getElementById('tagsList');
    if (!tagsList) return;
    
    // Collecter tous les tags uniques
    const allTags = new Set();
    files.forEach(file => {
        if (file.tags) {
            file.tags.forEach(tag => allTags.add(tag));
        }
    });
    
    const tagsArray = Array.from(allTags);
    const maxVisible = 6; // Nombre de tags visibles par défaut (2 lignes de 3)
    
    if (tagsArray.length === 0) {
        tagsList.innerHTML = '';
        return;
    }
    
    // Tags à afficher selon l'état
    const visibleTags = tagsExpanded ? tagsArray : tagsArray.slice(0, maxVisible);
    const hasMore = tagsArray.length > maxVisible;
    
    // Créer les boutons de tags
    const tagsHtml = visibleTags.map(tag => 
        `<button onclick="filterByTag('${tag}')" style="
            background: #2C2C2C; 
            color: #1E88E5; 
            border: 1px solid #1E88E5; 
            padding: 4px 8px; 
            border-radius: 12px; 
            font-size: 11px; 
            cursor: pointer;
        ">${tag.charAt(0).toUpperCase() + tag.slice(1)}</button>`
    ).join('');
    
    // Bouton expand/collapse si nécessaire
    const expandButton = hasMore ? 
        `<button onclick="toggleTagsExpansion()" style="
            background: #1E88E5; 
            color: white; 
            border: 1px solid #1E88E5; 
            padding: 4px 8px; 
            border-radius: 12px; 
            font-size: 11px; 
            cursor: pointer;
        ">${tagsExpanded ? '▲' : '▼'} ${tagsExpanded ? 'Moins' : `+${tagsArray.length - maxVisible}`}</button>` : '';
    
    tagsList.innerHTML = tagsHtml + expandButton;
}

// Toggle expansion des tags
function toggleTagsExpansion() {
    tagsExpanded = !tagsExpanded;
    // Récupérer la liste actuelle des fichiers affichés pour mettre à jour les tags
    updateTagsList(filesIndex);
}

// Filtrer par tag
function filterByTag(tag) {
    const matchingFiles = filesIndex.filter(file => 
        file.tags && file.tags.includes(tag)
    );
    displayFiles(matchingFiles);
    
    // Mettre le tag sélectionné dans la recherche
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    
    searchInput.value = tag;
    
    // Afficher le bouton clear
    if (clearButton) {
        clearButton.style.display = 'block';
    }
}

function checkFirstTimeUser() {
    console.log('Vérification nouvel utilisateur...');
    
    // Afficher l'interface connectée
    const connectedInterface = document.getElementById('connectedInterface');
    const createButton = document.getElementById('createButton');
    
    if (connectedInterface) connectedInterface.style.display = 'block';
    if (createButton) createButton.style.display = 'flex';
    
    fetch('https://www.googleapis.com/drive/v3/files?q=name="Fiches de Soin"&fields=files(id,name,mimeType)', {
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
            <div class="content-area" style="height: 100vh; overflow-y: auto; padding: 20px 10px;" id="contentArea">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;" id="topButtons">
                    <button onclick="goBack()" style="background: #333; color: white; border: none; padding: 8px 12px; border-radius: 5px;">← Retour</button>
                    ${sections.length > 1 ? `
                        <button onclick="toggleNavigation()" style="background: #1E88E5; color: white; border: none; padding: 8px 12px; border-radius: 5px;">☰ Sections</button>
                    ` : ''}
                </div>
                <h2 style="color: #1E88E5; margin-bottom: 20px;">${fileName}</h2>
                <div style="background: #2C2C2C; padding: 15px 12px; border-radius: 10px; white-space: pre-wrap; line-height: 1.6; font-size: 14px;">
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

// Naviguer vers une section avec offset pour la barre fixe
function scrollToSection(sectionIndex) {
    const element = document.getElementById(`section-${sectionIndex}`);
    if (element) {
        const contentArea = document.getElementById('contentArea');
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - 80; // 80px pour compenser la barre fixe
        
        contentArea.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
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
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                <div style="display: flex; align-items: center;">
                    <div style="width: 40px; height: 40px; background: #FB8C00; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                        <div style="width: 20px; height: 20px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#FB8C00">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                        </div>
                    </div>
                    <h1 style="color: #59B6FF; font-size: 42px; font-weight: 600; margin: 0;">Practo Note</h1>
                </div>
                
                <!-- Menu hamburger -->
                <button onclick="toggleMenu()" style="background: none; border: none; color: #59B6FF; font-size: 24px; cursor: pointer; padding: 8px;">☰</button>
            </div>
            
            <!-- Menu déroulant -->
            <div id="menuDropdown" style="
                position: absolute;
                top: 70px;
                right: 20px;
                background: #2C2C2C;
                border-radius: 8px;
                padding: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 100;
                display: none;
                min-width: 160px;
                border: 1px solid #3A3A3A;
            ">
                <div onclick="refreshFiles(); toggleMenu();" style="padding: 12px; cursor: pointer; color: #43A047; border-radius: 5px; margin-bottom: 5px; transition: background 0.2s;">🔄 Actualiser</div>
                <div onclick="signOut(); toggleMenu();" style="padding: 12px; cursor: pointer; color: #FF5722; border-radius: 5px; transition: background 0.2s;">🚪 Se déconnecter</div>
            </div>
        </div>
        
                <div id="connectedInterface">
            <div class="search-container">
                <input type="text" class="search-input" placeholder="Rechercher une fiche..." id="searchInput">
                <button class="clear-search" id="clearSearch" onclick="clearSearch()">×</button>
            </div>
            
            <div style="margin: 15px 0;">
                <div id="tagsList" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
            </div>
            
            <div id="filesList"></div>
        </div>
    `;
    

    // Réafficher le bouton flottant
    const createButton = document.getElementById('createButton');
    if (createButton) createButton.style.display = 'flex';


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

// Forcer le rafraîchissement des données
function refreshFiles() {
    console.log('🔄 Actualisation forcée des fiches...');
    
    // Vider le cache pour forcer la mise à jour
    localStorage.removeItem('filesIndex');
    filesIndex = [];
    
    const filesList = document.getElementById('filesList');
    if (filesList) {
        filesList.innerHTML = '<div style="text-align: center; padding: 20px; color: #888;">Actualisation en cours...</div>';
    }
    
    if (accessToken) {
        loadGoogleDriveFiles();
    } else {
        console.error('Pas de token d\'accès disponible');
        if (filesList) {
            filesList.innerHTML = '<div style="text-align: center; padding: 20px; color: #FF5722;">Erreur: non connecté à Google Drive</div>';
        }
    }
}

// Toggle menu hamburger
function toggleMenu() {
    const menu = document.getElementById('menuDropdown');
    if (!menu) return;
    
    if (menu.style.display === 'none') {
        // Mettre à jour le contenu selon l'état de connexion
        updateMenuContent();
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

// Déconnexion
function signOut() {
    localStorage.removeItem('googleToken');
    localStorage.removeItem('tokenExpiry');
    location.reload();
}

// Forcer le rafraîchissement des données
function refreshFiles() {
    console.log('Actualisation des fiches...');
    loadGoogleDriveFiles();
}

// Fermer le menu si clic ailleurs
document.addEventListener('click', function(e) {
    const menu = document.getElementById('menuDropdown');
    const menuButton = e.target.closest('button[onclick="toggleMenu()"]');
    
    if (menu && !menuButton && !menu.contains(e.target)) {
        menu.style.display = 'none';
    }
});

// Mettre à jour le contenu du menu selon l'état de connexion
function updateMenuContent() {
    const menu = document.getElementById('menuDropdown');
    if (!menu) return;
    
    const isConnected = accessToken && localStorage.getItem('googleToken');
    
    if (isConnected) {
        // Menu pour utilisateur connecté
        menu.innerHTML = `
            <div onclick="refreshFiles(); toggleMenu();" style="padding: 12px; cursor: pointer; color: #43A047; border-radius: 5px; margin-bottom: 4px;">🔄 Actualiser</div>
            <div onclick="signOut(); toggleMenu();" style="padding: 12px; cursor: pointer; color: #FF5722; border-radius: 5px;">🚪 Se déconnecter</div>
        `;
    } else {
        // Menu pour utilisateur non connecté
        menu.innerHTML = `
            <div onclick="signInWithGoogle(); toggleMenu();" style="padding: 12px; cursor: pointer; color: #1E88E5; border-radius: 5px;">🔑 Se connecter</div>
        `;
    }
}

// Configuration du cache
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h
const CACHE_VERSION = '1.0';
let filesIndex = []; // Index global des fichiers avec contenu

// Charger ou créer l'index avec cache
async function loadFilesWithCache(files) {
    const cached = getCachedIndex();
    
    if (cached && isCacheValid(cached, files)) {
        console.log('✅ Utilisation du cache existant');
        filesIndex = cached.data;
        displayFiles(filesIndex);
        setupSearchWithContent();
        return;
    }
    
    console.log('🔄 Mise à jour de l\'index nécessaire');
    await indexFiles(files);
    saveCacheIndex(files);
    displayFiles(filesIndex);
    setupSearchWithContent();
}

// Vérifier si le cache est valide
function isCacheValid(cached, currentFiles) {
    // Vérifier la date d'expiration
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
        console.log('Cache expiré');
        return false;
    }
    
    // Vérifier si les fichiers ont changé
    const currentHash = generateFilesHash(currentFiles);
    if (cached.filesHash !== currentHash) {
        console.log('Fichiers modifiés détectés');
        return false;
    }
    
    return true;
}

// Générer un hash des métadonnées des fichiers (sans btoa)
function generateFilesHash(files) {
    const metadata = files.map(f => `${f.id}-${f.modifiedTime || f.name}`).join('|');
    
    // Hash simple sans btoa pour éviter les erreurs Unicode
    let hash = 0;
    for (let i = 0; i < metadata.length; i++) {
        const char = metadata.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convertir en 32bit
    }
    
    return Math.abs(hash).toString(36); // Base36 pour un hash court
}

// Récupérer le cache
function getCachedIndex() {
    try {
        const cached = localStorage.getItem('filesIndex');
        if (!cached) return null;
        
        const parsed = JSON.parse(cached);
        if (parsed.version !== CACHE_VERSION) {
            console.log('Version de cache obsolète');
            return null;
        }
        
        return parsed;
    } catch (e) {
        console.warn('Erreur lecture cache:', e);
        return null;
    }
}

// Sauvegarder dans le cache
function saveCacheIndex(files) {
    try {
        const cacheData = {
            version: CACHE_VERSION,
            timestamp: Date.now(),
            filesHash: generateFilesHash(files),
            data: filesIndex.map(file => ({
            id: file.id,
            name: file.name,
            mimeType: file.mimeType,
            content: file.content?.substring(0, 5000) || '',
            tags: file.tags || [], // Ajouter les tags au cache
            searchable: file.searchable
        }))
        };
        
        const jsonString = JSON.stringify(cacheData);
        
        // Vérifier la taille avant de sauvegarder
        if (jsonString.length > 5000000) { // 5MB limite
            console.warn('Cache trop volumineux, indexation sans cache');
            return;
        }
        
        localStorage.setItem('filesIndex', jsonString);
        console.log('Cache sauvé:', Math.round(jsonString.length/1024), 'KB');
    } catch (e) {
        console.warn('Erreur sauvegarde cache:', e.message);
        // Nettoyer en cas d'erreur
        localStorage.removeItem('filesIndex');
    }
}

// Modifier indexFiles pour inclure les tags
async function indexFiles(files) {
    console.log('📑 Indexation de', files.length, 'fichiers...');
    
    const promises = files.map(async (file, index) => {
        if (index % 3 === 0) {
            const filesList = document.getElementById('filesList');
            if (filesList) {
                filesList.innerHTML = `<div style="text-align: center; padding: 20px; color: #888;">Indexation... ${index}/${files.length}</div>`;
            }
        }
        
        if (file.mimeType === 'application/vnd.google-apps.document') {
            try {
                const response = await fetch(`https://www.googleapis.com/drive/v3/files/${file.id}/export?mimeType=text/plain`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                const content = await response.text();
                const cleanContent = removeAccents(content.toLowerCase());
                
                return {
                    ...file,
                    content: cleanContent,
                    tags: extractTags(cleanContent), // Ajouter les tags
                    searchable: true
                };
            } catch (error) {
                console.warn('⚠️ Erreur indexation', file.name, error);
                return { ...file, content: '', tags: [], searchable: false };
            }
        }
        
        return {
            ...file,
            content: cleanContent,
            tags: extractTags(cleanContent), // Cette ligne est importante
            searchable: true
        };
    });
    
    filesIndex = await Promise.all(promises);
    console.log('✅ Indexation terminée:', filesIndex.filter(f => f.searchable).length, 'fichiers indexés');
}

// Recherche avancée dans nom + contenu + tags
function setupSearchWithContent() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    // Supprimer l'ancien listener s'il existe
    searchInput.removeEventListener('input', originalSearchFunction);
    
    searchInput.addEventListener('input', function() {
        const query = removeAccents(this.value.toLowerCase());
        
        if (query.length === 0) {
            // Afficher tous les fichiers
            displayFiles(filesIndex);
            return;
        }
        
        if (query.length < 2) {
            // Recherche dans les noms seulement pour les requêtes courtes
            const matchingFiles = filesIndex.filter(file => {
                const fileName = removeAccents(file.name.toLowerCase());
                return fileName.includes(query);
            });
            displayFiles(matchingFiles);
            return;
        }
        
        // Recherche complète dans nom + contenu + tags
        const matchingFiles = filesIndex.filter(file => {
            const fileName = removeAccents(file.name.toLowerCase());
            const fileContent = file.content || '';
            const fileTags = file.tags || [];
            
            return fileName.includes(query) || 
                   fileContent.includes(query) || 
                   fileTags.some(tag => tag.includes(query));
        });
        
        console.log(`🔍 "${query}" trouvé dans ${matchingFiles.length} fichier(s)`);
        displayFiles(matchingFiles);
    });
}

// Sauvegarder la fonction de recherche originale
const originalSearchFunction = function() {
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
};


// Extraire les tags du contenu
function extractTags(content) {
    if (!content) return [];
    
    const contentLower = content.toLowerCase();
    const foundTags = [];
    
    Object.entries(MEDICAL_TAGS).forEach(([tag, keywords]) => {
        const hasKeyword = keywords.some(keyword => contentLower.includes(keyword));
        if (hasKeyword) {
            foundTags.push(tag);
        }
    });
    
    return foundTags;
}

// Fonction pour clear la recherche
function clearSearch() {
    document.getElementById('searchInput').value = '';
    displayFiles(filesIndex);
    document.getElementById('clearSearch').style.display = 'none';
}

// Modifier setupSearchWithContent pour gérer le bouton clear
function setupSearchWithContent() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    
    if (!searchInput) return;
    
    searchInput.removeEventListener('input', originalSearchFunction);
    
    searchInput.addEventListener('input', function() {
        const query = removeAccents(this.value.toLowerCase());
        
        // Afficher/cacher le bouton clear
        if (clearButton) {
            clearButton.style.display = query.length > 0 ? 'block' : 'none';
        }
        
        if (query.length === 0) {
            displayFiles(filesIndex);
            return;
        }
        
        if (query.length < 2) {
            const matchingFiles = filesIndex.filter(file => {
                const fileName = removeAccents(file.name.toLowerCase());
                return fileName.includes(query);
            });
            displayFiles(matchingFiles);
            return;
        }
        
        const matchingFiles = filesIndex.filter(file => {
            const fileName = removeAccents(file.name.toLowerCase());
            const fileContent = file.content || '';
            const fileTags = file.tags || [];
            
            return fileName.includes(query) || 
                   fileContent.includes(query) || 
                   fileTags.some(tag => tag.includes(query));
        });
        
        console.log(`🔍 "${query}" trouvé dans ${matchingFiles.length} fichier(s)`);
        displayFiles(matchingFiles);
    });
}

// Toggle expansion des tags
function toggleTagsExpansion() {
    tagsExpanded = !tagsExpanded;
    const tagsList = document.getElementById('tagsList');
    
    if (tagsExpanded) {
        tagsList.classList.add('expanded');
    } else {
        tagsList.classList.remove('expanded');
    }
    
    updateTagsList(filesIndex);
}

// Afficher le formulaire de création
function showCreateForm() {
    const mainApp = document.getElementById('mainApp');
    mainApp.innerHTML = `
        <div style="padding: 20px; max-width: 400px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: #1E88E5; margin: 0;">Créer une fiche</h2>
                <button onclick="goBack()" style="background: #333; color: white; border: none; padding: 8px 12px; border-radius: 5px;">✕</button>
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: #FAFAFA;">Titre de la fiche :</label>
                <input type="text" id="ficheTitle" placeholder="Ex: Fiche - Appendicite de l'enfant" style="
                    width: 100%;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    background: #333;
                    color: #FAFAFA;
                    font-size: 14px;
                " maxlength="100">
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: #FAFAFA;">Contenu :</label>
                <textarea id="ficheContent" placeholder="Rédigez le contenu de votre fiche..." style="
                    width: 100%;
                    height: 300px;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    background: #333;
                    color: #FAFAFA;
                    font-size: 14px;
                    resize: vertical;
                    font-family: inherit;
                "></textarea>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button onclick="createGoogleDoc()" style="
                    flex: 1;
                    background: #43A047;
                    color: white;
                    border: none;
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 14px;
                    cursor: pointer;
                ">Créer la fiche</button>
                
                <button onclick="goBack()" style="
                    background: #666;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-size: 14px;
                    cursor: pointer;
                ">Annuler</button>
            </div>
            
            <div id="createStatus" style="margin-top: 15px; text-align: center;"></div>
        </div>
    `;
}

// Créer le Google Doc
async function createGoogleDoc() {
    const title = document.getElementById('ficheTitle').value.trim();
    const content = document.getElementById('ficheContent').value.trim();
    const statusDiv = document.getElementById('createStatus');
    
    if (!title) {
        statusDiv.innerHTML = '<span style="color: #FF5722;">Veuillez saisir un titre</span>';
        return;
    }
    
    if (!content) {
        statusDiv.innerHTML = '<span style="color: #FF5722;">Veuillez saisir du contenu</span>';
        return;
    }
    
    statusDiv.innerHTML = '<span style="color: #1E88E5;">Création en cours...</span>';
    
    try {
        // D'abord créer le document vide
        const createResponse = await fetch('https://www.googleapis.com/drive/v3/files', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title,
                mimeType: 'application/vnd.google-apps.document',
                parents: await getFichesSoinFolderId()
            })
        });
        
        if (!createResponse.ok) {
            throw new Error('Erreur création document');
        }
        
        const newDoc = await createResponse.json();
        
        // Ajouter le contenu au document
        await fetch(`https://docs.googleapis.com/v1/documents/${newDoc.id}:batchUpdate`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requests: [{
                    insertText: {
                        location: { index: 1 },
                        text: content
                    }
                }]
            })
        });
        
        statusDiv.innerHTML = '<span style="color: #43A047;">Fiche créée avec succès !</span>';
        
        // Retour à la liste après 2 secondes
        setTimeout(() => {
            goBack();
            refreshFiles(); // Actualiser pour voir la nouvelle fiche
        }, 2000);
        
    } catch (error) {
        console.error('Erreur création fiche:', error);
        statusDiv.innerHTML = '<span style="color: #FF5722;">Erreur lors de la création</span>';
    }
}

// Récupérer l'ID du dossier "Fiches de Soin"
async function getFichesSoinFolderId() {
    const response = await fetch('https://www.googleapis.com/drive/v3/files?q=name="Fiches de Soin" and mimeType="application/vnd.google-apps.folder"', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    
    const data = await response.json();
    return data.files.length > 0 ? [data.files[0].id] : [];
}