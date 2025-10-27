
        // Variables globales
        let currentDeleteId = null;
        let currentDeleteType = null;
        let currentEditId = null;

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

        // Gestion des modals
        function openAddModal(type) {
            const modal = document.getElementById(`${type}-modal`);
            const title = document.getElementById(`${type}-modal-title`);
            
            title.textContent = `Ajouter un${type === 'employe' ? ' ' : type === 'chef' ? ' chef de ' : ' '}${getTypeLabel(type)}`;
            
            // Réinitialiser le formulaire
            document.getElementById(`${type}-form`).reset();
            
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
                document.getElementById('employe-nom').value = 'Jean Martin';
                document.getElementById('employe-email').value = 'jean.martin@graxeltech.com';
                document.getElementById('employe-departement').value = 'Finance';
                document.getElementById('employe-poste').value = 'Analyste financier';
            } else if (type === 'chef') {
                document.getElementById('chef-nom').value = 'Jean Martin';
                document.getElementById('chef-email').value = 'jean.martin@graxeltech.com';
                document.getElementById('chef-departement').value = 'Finance';
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
            const nom = document.getElementById('employe-nom').value;
            const email = document.getElementById('employe-email').value;
            const departement = document.getElementById('employe-departement').value;
            const poste = document.getElementById('employe-poste').value;
            
            // Simuler l'enregistrement
            if (currentEditId) {
                // Mode édition
                showToast('Employé modifié', `${nom} a été modifié avec succès`, 'success');
            } else {
                // Mode ajout
                showToast('Employé ajouté', `${nom} a été ajouté avec succès`, 'success');
            }
            
            // Fermer le modal
            closeModal('employe-modal');
        }

        function handleChefSubmit(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const nom = document.getElementById('chef-nom').value;
            const email = document.getElementById('chef-email').value;
            const departement = document.getElementById('chef-departement').value;
            const dateNomination = document.getElementById('chef-date-nomination').value;
            
            // Simuler l'enregistrement
            if (currentEditId) {
                // Mode édition
                showToast('Chef modifié', `${nom} a été modifié avec succès`, 'success');
            } else {
                // Mode ajout
                showToast('Chef ajouté', `${nom} a été ajouté avec succès`, 'success');
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
 