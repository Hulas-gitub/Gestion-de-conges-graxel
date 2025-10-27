 
        // Fonction pour ouvrir le modal de déconnexion
        function openLogoutModal() {
            const modal = document.getElementById('logoutConfirmModal');
            modal.classList.remove('hidden');
            // Animation d'ouverture
            setTimeout(() => {
                modal.querySelector('.modal').style.opacity = '1';
                modal.querySelector('.modal').style.transform = 'scale(1)';
            }, 10);
        }

        // Fonction pour fermer le modal de déconnexion
        function closeLogoutModal() {
            const modal = document.getElementById('logoutConfirmModal');
            modal.querySelector('.modal').style.opacity = '0';
            modal.querySelector('.modal').style.transform = 'scale(0.95)';
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 200);
        }

        // Fonction pour afficher le toast de déconnexion
        function showLogoutToast() {
            const toast = document.getElementById('logoutToast');
            toast.classList.remove('translate-x-full');
            toast.classList.add('translate-x-0');
            
            // Masquer automatiquement après 3 secondes
            setTimeout(() => {
                toast.classList.remove('translate-x-0');
                toast.classList.add('translate-x-full');
            }, 3000);
        }

        // Fonction d'exécution de la déconnexion
        function executeLogout() {
            // Fermer le modal
            closeLogoutModal();
            
            // Afficher le toast
            setTimeout(() => {
                showLogoutToast();
            }, 300);
            
            // Rediriger vers la page d'accueil après 2 secondes
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        }

        // Event listener pour le bouton de déconnexion
        document.getElementById('logoutBtn').addEventListener('click', function(e) {
            e.preventDefault();
            openLogoutModal();
        });

        // Fermer le modal en appuyant sur Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLogoutModal();
            }
        });

        // Initialisation des styles du modal
        document.addEventListener('DOMContentLoaded', function() {
            const modal = document.getElementById('logoutConfirmModal').querySelector('.modal');
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.95)';
            modal.style.transition = 'all 0.2s ease-out';
        });


        // Initialisation au chargement de la page
        document.addEventListener('DOMContentLoaded', function () {
            // Initialiser les écouteurs d'événements pour les onglets
            initTabNavigation();
            
            // Afficher l'onglet profile par défaut au chargement
            switchTab('profile');
            
            // Afficher la date actuelle
            displayCurrentDate();
        });

        // Initialiser la navigation par onglets
        function initTabNavigation() {
            const tabButtons = document.querySelectorAll('.tab-button');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tabName = this.getAttribute('data-tab');
                    switchTab(tabName);
                });
            });
        }

        // Fonction pour changer d'onglet
        function switchTab(tabName) {
            // Désactiver tous les boutons d'onglets
            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active');
                // Retirer les classes de style actif
                button.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white', 'shadow-lg');
                // Ajouter les classes de style inactif
                button.classList.add('bg-gray-100', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            });

            // Masquer tous les panneaux d'onglets
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.add('hidden');
                pane.classList.remove('active');
            });

            // Activer le bouton sélectionné
            const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
                // Retirer les classes inactives
                activeButton.classList.remove('bg-gray-100', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
                // Ajouter les classes actives
                activeButton.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white', 'shadow-lg');
            }

            // Afficher le panneau correspondant
            const activePane = document.getElementById(`${tabName}-tab`);
            if (activePane) {
                activePane.classList.remove('hidden');
                activePane.classList.add('active');
            }
        }

        // Fonction pour afficher la date actuelle
        function displayCurrentDate() {
            const dateElement = document.getElementById('current-date');
            if (dateElement) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const today = new Date();
                dateElement.textContent = today.toLocaleDateString('fr-FR', options);
            }
        }

        // Fonction pour basculer la visibilité du mot de passe
        function togglePassword(inputId, button) {
            const input = document.getElementById(inputId);
            const icon = button.querySelector('i');
            
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

        // Gestion du bouton de toggle sidebar (mobile)
        const toggleSidebarBtn = document.getElementById('toggle-sidebar');
        const closeSidebarBtn = document.getElementById('close-sidebar');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebar-overlay');

        if (toggleSidebarBtn) {
            toggleSidebarBtn.addEventListener('click', function() {
                sidebar.classList.toggle('sidebar-mobile');
                sidebarOverlay.classList.toggle('sidebar-overlay');
            });
        }

        if (closeSidebarBtn) {
            closeSidebarBtn.addEventListener('click', function() {
                sidebar.classList.add('sidebar-mobile');
                sidebarOverlay.classList.remove('sidebar-overlay');
            });
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', function() {
                sidebar.classList.add('sidebar-mobile');
                sidebarOverlay.classList.remove('sidebar-overlay');
            });
        }

        // Gestion du popup de changement de photo
        const changePhotoBtn = document.getElementById('change-photo-btn');
        const photoOverlay = document.getElementById('photo-overlay');
        const photoUploadPopup = document.getElementById('photo-upload-popup');
        const popupContent = document.getElementById('popup-content');
        const closePopupBtn = document.getElementById('close-popup-btn');
        const popupCancelBtn = document.getElementById('popup-cancel-btn');
        const uploadZone = document.getElementById('upload-zone');
        const popupFileInput = document.getElementById('popup-file-input');
        const popupConfirmBtn = document.getElementById('popup-confirm-btn');

        // Ouvrir le popup quand on clique sur l'avatar ou l'overlay
        if (changePhotoBtn) {
            changePhotoBtn.addEventListener('click', function() {
                openPhotoPopup();
            });
        }

        if (photoOverlay) {
            photoOverlay.addEventListener('click', function(e) {
                e.stopPropagation();
                openPhotoPopup();
            });
        }

        // Fonction pour ouvrir le popup
        function openPhotoPopup() {
            photoUploadPopup.classList.remove('hidden');
            photoUploadPopup.classList.add('flex');
            setTimeout(() => {
                popupContent.classList.remove('scale-95', 'opacity-0');
                popupContent.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        // Fonction pour fermer le popup
        function closePhotoPopup() {
            popupContent.classList.remove('scale-100', 'opacity-100');
            popupContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                photoUploadPopup.classList.add('hidden');
                photoUploadPopup.classList.remove('flex');
            }, 300);
        }

        // Fermer avec le bouton X
        if (closePopupBtn) {
            closePopupBtn.addEventListener('click', closePhotoPopup);
        }

        // Fermer avec le bouton Annuler
        if (popupCancelBtn) {
            popupCancelBtn.addEventListener('click', closePhotoPopup);
        }

        // Fermer en cliquant en dehors du popup
        if (photoUploadPopup) {
            photoUploadPopup.addEventListener('click', function(e) {
                if (e.target === photoUploadPopup) {
                    closePhotoPopup();
                }
            });
        }

        // Ouvrir le sélecteur de fichiers quand on clique sur la zone d'upload
        if (uploadZone) {
            uploadZone.addEventListener('click', function() {
                popupFileInput.click();
            });
        }

        // Gérer la sélection de fichier
        if (popupFileInput) {
            popupFileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    // Activer le bouton confirmer
                    popupConfirmBtn.disabled = false;
                    
                    // Prévisualiser l'image
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const popupPreview = document.getElementById('popup-preview');
                        if (popupPreview) {
                            popupPreview.style.backgroundImage = `url(${event.target.result})`;
                            popupPreview.style.backgroundSize = 'cover';
                            popupPreview.style.backgroundPosition = 'center';
                            popupPreview.textContent = '';
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Confirmer le changement de photo
        if (popupConfirmBtn) {
            popupConfirmBtn.addEventListener('click', function() {
                const file = popupFileInput.files[0];
                if (file) {
                    // Mettre à jour l'avatar principal
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const avatarDisplay = document.getElementById('avatar-display');
                        if (avatarDisplay) {
                            avatarDisplay.style.backgroundImage = `url(${event.target.result})`;
                            avatarDisplay.style.backgroundSize = 'cover';
                            avatarDisplay.style.backgroundPosition = 'center';
                            avatarDisplay.textContent = '';
                        }
                    };
                    reader.readAsDataURL(file);
                    
                    // Fermer le popup
                    closePhotoPopup();
                    
                    // Réinitialiser le popup pour la prochaine fois
                    setTimeout(() => {
                        popupFileInput.value = '';
                        popupConfirmBtn.disabled = true;
                        const popupPreview = document.getElementById('popup-preview');
                        if (popupPreview) {
                            popupPreview.style.backgroundImage = '';
                            popupPreview.textContent = 'JM';
                        }
                    }, 300);
                }
            });
        }