// Variables globales
let currentDeleteId = null;
let currentDeleteType = null;
let currentEditId = null;
let employeCounter = 4; // Compteur pour générer les matricules employés (commence à 4)
let chefCounter = 2; // Compteur pour générer les matricules chefs (commence à 2)

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour la date actuelle
    updateCurrentDate();
    
    // Initialiser les écouteurs d'événements
    initEventListeners();
    
    // Initialiser le thème
    initTheme();
});

// Mettre à jour la date actuelle
function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('fr-FR', options);
}

// Initialiser les écouteurs d'événements
function initEventListeners() {
    // Navigation de la sidebar
    document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
    document.getElementById('close-sidebar').addEventListener('click', toggleSidebar);
    document.getElementById('sidebar-overlay').addEventListener('click', toggleSidebar);
    
    // Bouton de thème
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Navigation par onglets
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Boutons d'ajout
    document.getElementById('add-employe-btn').addEventListener('click', () => openAddModal('employe'));
    document.getElementById('add-chef-btn').addEventListener('click', () => openAddModal('chef'));
    document.getElementById('add-departement-btn').addEventListener('click', () => openAddModal('departement'));
    
    // Boutons d'édition
    document.querySelectorAll('.edit-employe').forEach(button => {
        button.addEventListener('click', function() {
            openEditModal('employe', this.dataset.id);
        });
    });
    
    document.querySelectorAll('.edit-chef').forEach(button => {
        button.addEventListener('click', function() {
            openEditModal('chef', this.dataset.id);
        });
    });
    
    document.querySelectorAll('.edit-departement').forEach(button => {
        button.addEventListener('click', function() {
            openEditModal('departement', this.dataset.id);
        });
    });
    
    // Boutons de suppression
    document.querySelectorAll('.delete-employe').forEach(button => {
        button.addEventListener('click', function() {
            openDeleteModal('employe', this.dataset.id);
        });
    });
    
    document.querySelectorAll('.delete-chef').forEach(button => {
        button.addEventListener('click', function() {
            openDeleteModal('chef', this.dataset.id);
        });
    });
    
    document.querySelectorAll('.delete-departement').forEach(button => {
        button.addEventListener('click', function() {
            openDeleteModal('departement', this.dataset.id);
        });
    });
    
    // Boutons pour les demandes de congé
    document.querySelectorAll('.approve-demande').forEach(button => {
        button.addEventListener('click', function() {
            approveDemande(this.dataset.id);
        });
    });
    
    document.querySelectorAll('.reject-demande').forEach(button => {
        button.addEventListener('click', function() {
            rejectDemande(this.dataset.id);
        });
    });
    
    // Formulaires
    document.getElementById('employe-form').addEventListener('submit', handleEmployeSubmit);
    document.getElementById('chef-form').addEventListener('submit', handleChefSubmit);
    document.getElementById('departement-form').addEventListener('submit', handleDepartementSubmit);
    
    // Écouteur pour le champ contact employé - mettre à jour le mot de passe par défaut
    document.getElementById('employe-contact').addEventListener('input', function() {
        // Si le champ mot de passe est vide ou contient la valeur par défaut, le mettre à jour
        if (!passwordField.value || !currentEditId) {
            passwordField.value = this.value;
        }
    });

    // Écouteur pour le champ contact chef - mettre à jour le mot de passe par défaut
    document.getElementById('chef-contact').addEventListener('input', function() {
        const passwordField = document.getElementById('chef-password');
        // Si le champ mot de passe est vide ou contient la valeur par défaut, le mettre à jour
        if (!passwordField.value || !currentEditId) {
            passwordField.value = this.value;
        }
    });
}

// Gestion de la sidebar (mobile)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Navigation par onglets
function switchTab(tabName) {
    // Désactiver tous les onglets
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.add('hidden');
        pane.classList.remove('active');
    });
    
    // Activer l'onglet sélectionné
    document.querySelector(`.tab-button[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.remove('hidden');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Générer un matricule employé
function generateMatriculeEmploye() {
    employeCounter++;
    return `EMP${String(employeCounter).padStart(4, '0')}`;
}

// Générer un matricule chef
function generateMatriculeChef() {
    chefCounter++;
    return `CHF${String(chefCounter).padStart(4, '0')}`;
}

// Basculer la visibilité du mot de passe
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(`${inputId}-icon`);
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Gestion des modals
function openAddModal(type) {
    const modal = document.getElementById(`${type}-modal`);
    const title = document.getElementById(`${type}-modal-title`);
    
    title.textContent = `Ajouter un${type === 'employe' ? ' ' : type === 'chef' ? ' chef de ' : ' '}${getTypeLabel(type)}`;
    
    // Réinitialiser le formulaire
    document.getElementById(`${type}-form`).reset();
    
    // Pour les employés, générer un nouveau matricule et définir le rôle par défaut
    if (type === 'employe') {
        const newMatricule = generateMatriculeEmploye();
        document.getElementById('employe-matricule').value = newMatricule;
        document.getElementById('employe-role').value = 'Employé'; // Définir le rôle par défaut
  
    }
    
    // Pour les chefs, générer un nouveau matricule et définir le rôle
    if (type === 'chef') {
        const newMatricule = generateMatriculeChef();
        document.getElementById('chef-matricule').value = newMatricule;
        document.getElementById('chef-role').value = 'Chef de Département'; // Définir le rôle fixe
        document.getElementById('chef-password').value = ''; // Vider le mot de passe
        
        // Définir la date de nomination à aujourd'hui par défaut
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('chef-date-nomination').value = today;
    }
    
    // Afficher le modal
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('.modal').classList.add('open');
    }, 10);
}

function openEditModal(type, id) {
    const modal = document.getElementById(`${type}-modal`);
    const title = document.getElementById(`${type}-modal-title`);
    
    title.textContent = `Modifier ${getTypeLabel(type)}`;
    currentEditId = id;
    
    // Remplir le formulaire avec les données existantes (simulées)
    // Dans une application réelle, vous récupéreriez ces données depuis une API
    if (type === 'employe') {
        document.getElementById('employe-matricule').value = 'EMP0001';
        document.getElementById('employe-nom').value = 'Martin';
        document.getElementById('employe-prenom').value = 'Jean';
        document.getElementById('employe-contact').value = '+241 01 23 45 67';
        document.getElementById('employe-email').value = 'jean.martin@graxeltech.com';
        document.getElementById('employe-role').value = 'Employé';
        document.getElementById('employe-poste').value = 'Analyste financier';
        document.getElementById('employe-departement').value = 'Finance';
    } else if (type === 'chef') {
        document.getElementById('chef-matricule').value = 'CHF0001';
        document.getElementById('chef-nom').value = 'Dubois';
        document.getElementById('chef-prenom').value = 'Marie';
        document.getElementById('chef-contact').value = '+241 02 34 56 78';
        document.getElementById('chef-email').value = 'marie.dubois@graxeltech.com';
        document.getElementById('chef-password').value = '+241 02 34 56 78'; // Mot de passe par défaut
        document.getElementById('chef-role').value = 'Chef de Département';
        document.getElementById('chef-poste').value = 'Directrice des Ressources Humaines';
        document.getElementById('chef-departement').value = 'Ressources Humaines';
        document.getElementById('chef-date-nomination').value = '2023-03-15';
    } else if (type === 'departement') {
        document.getElementById('departement-nom').value = 'Finance';
        document.getElementById('departement-description').value = 'Gestion financière et comptable';
        document.getElementById('departement-chef').value = 'Jean Martin';
    }
    
    // Afficher le modal
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('.modal').classList.add('open');
    }, 10);
}

function openDeleteModal(type, id) {
    const modal = document.getElementById('delete-confirm-modal');
    const title = document.getElementById('delete-confirm-title');
    const message = document.getElementById('delete-confirm-message');
    
    currentDeleteId = id;
    currentDeleteType = type;
    
    title.textContent = `Supprimer ${getTypeLabel(type)}`;
    message.textContent = `Êtes-vous sûr de vouloir supprimer ce ${getTypeLabel(type).toLowerCase()} ? Cette action est irréversible.`;
    
    // Afficher le modal
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('.modal').classList.add('open');
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.querySelector('.modal').classList.remove('open');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
    
    // Réinitialiser les variables globales
    if (modalId === 'delete-confirm-modal') {
        currentDeleteId = null;
        currentDeleteType = null;
    }
    
    if (modalId.includes('-modal') && !modalId.includes('delete-confirm')) {
        currentEditId = null;
    }
}

// Gestion des formulaires
function handleEmployeSubmit(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const matricule = document.getElementById('employe-matricule').value;
    const nom = document.getElementById('employe-nom').value;
    const prenom = document.getElementById('employe-prenom').value;
    const contact = document.getElementById('employe-contact').value;
    const email = document.getElementById('employe-email').value;
    const role = document.getElementById('employe-role').value;
    const poste = document.getElementById('employe-poste').value;
    const departement = document.getElementById('employe-departement').value;
    
    // Validation
    if (!matricule || !nom || !prenom || !contact || !email || !password || !role || !poste || !departement) {
        showToast('Erreur', 'Tous les champs sont obligatoires', 'error');
        return;
    }
    
    // Simuler l'enregistrement
    if (currentEditId) {
        // Mode édition
        showToast('Employé modifié', `${prenom} ${nom} (${matricule}) a été modifié avec succès`, 'success');
    } else {
        // Mode ajout
        showToast('Employé ajouté', `${prenom} ${nom} (${matricule}) a été ajouté avec succès`, 'success');
    }
    
    // Fermer le modal
    closeModal('employe-modal');
}

function handleChefSubmit(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const matricule = document.getElementById('chef-matricule').value;
    const nom = document.getElementById('chef-nom').value;
    const prenom = document.getElementById('chef-prenom').value;
    const contact = document.getElementById('chef-contact').value;
    const email = document.getElementById('chef-email').value;
    const password = document.getElementById('chef-password').value;
    const role = document.getElementById('chef-role').value;
    const poste = document.getElementById('chef-poste').value;
    const departement = document.getElementById('chef-departement').value;
    const dateNomination = document.getElementById('chef-date-nomination').value;
    
    // Validation
    if (!matricule || !nom || !prenom || !contact || !email || !password || !role || !poste || !departement || !dateNomination) {
        showToast('Erreur', 'Tous les champs sont obligatoires', 'error');
        return;
    }
    
    // Simuler l'enregistrement
    if (currentEditId) {
        // Mode édition
        showToast('Chef modifié', `${prenom} ${nom} (${matricule}) a été modifié avec succès`, 'success');
    } else {
        // Mode ajout
        showToast('Chef ajouté', `${prenom} ${nom} (${matricule}) a été ajouté avec succès`, 'success');
    }
    
    // Fermer le modal
    closeModal('chef-modal');
}

function handleDepartementSubmit(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const nom = document.getElementById('departement-nom').value;
    const description = document.getElementById('departement-description').value;
    const chef = document.getElementById('departement-chef').value;
    
    // Simuler l'enregistrement
    if (currentEditId) {
        // Mode édition
        showToast('Département modifié', `${nom} a été modifié avec succès`, 'success');
    } else {
        // Mode ajout
        showToast('Département ajouté', `${nom} a été ajouté avec succès`, 'success');
    }
    
    // Fermer le modal
    closeModal('departement-modal');
}

// Gestion des suppressions
document.getElementById('confirm-delete-btn').addEventListener('click', function() {
    if (currentDeleteId && currentDeleteType) {
        // Simuler la suppression
        showToast(`${getTypeLabel(currentDeleteType)} supprimé`, `L'élément a été supprimé avec succès`, 'success');
        
        // Fermer le modal
        closeModal('delete-confirm-modal');
    }
});

// Gestion des demandes de congé
function approveDemande(id) {
    showToast('Demande approuvée', `La demande ${id} a été approuvée`, 'success');
}

function rejectDemande(id) {
    showToast('Demande refusée', `La demande ${id} a été refusée`, 'error');
}

// Fonctions utilitaires
function getTypeLabel(type) {
    switch(type) {
        case 'employe': return 'Employé';
        case 'chef': return 'Chef de Département';
        case 'departement': return 'Département';
        default: return '';
    }
}

function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    
    // Définir la couleur en fonction du type
    let colorClass = 'bg-green-100 text-green-600';
    let borderClass = 'border-l-green-500';
    
    if (type === 'error') {
        colorClass = 'bg-red-100 text-red-600';
        borderClass = 'border-l-red-500';
    } else if (type === 'warning') {
        colorClass = 'bg-yellow-100 text-yellow-600';
        borderClass = 'border-l-yellow-500';
    }
    
    // Mettre à jour le contenu
    toastIcon.className = `w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`;
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.className = `fixed top-4 right-4 z-50 transform translate-x-full transition-transform duration-300 ${borderClass}`;
    
    // Afficher le toast
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Masquer le toast après 5 secondes
    setTimeout(() => {
        toast.classList.add('translate-x-full');
    }, 5000);
}