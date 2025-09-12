
"use strict";

try {
    // Initialize Notyf (avec types additionnels pour 'error')
    const notyf = new Notyf({
        duration: 4000,
        position: { x: 'right', y: 'top' },
        dismissible: true,
        types: [
            {
                type: 'success',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                icon: { className: 'fas fa-check', tagName: 'i' }
            },
            {
                type: 'info',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                icon: { className: 'fas fa-info-circle', tagName: 'i' }
            },
            {
                type: 'warning',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                icon: { className: 'fas fa-exclamation-triangle', tagName: 'i' }
            },
            {
                type: 'error',
                background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                icon: { className: 'fas fa-times-circle', tagName: 'i' }
            }
        ]
    });
} catch (err) {
    console.warn('Notyf non disponible ou erreur d\'initialisation:', err);
    // fallback simple pour éviter que le script plante
    window.notyf = {
        success: (m) => console.log('SUCCESS:', m),
        info: (m) => console.log('INFO:', m),
        error: (m) => console.log('ERROR:', m),
    };
}

// JSON Data for dynamic content
const appData = {
    notifications: [
        { id: 1, type: 'info', message: 'Nouvelle demande de Pierre Durant', time: 'Il y a 2h', icon: 'fas fa-user-plus', color: 'blue' },
        { id: 2, type: 'success', message: 'Votre demande de congé approuvée', time: 'Il y a 1j', icon: 'fas fa-check-circle', color: 'green' },
        { id: 3, type: 'warning', message: 'Rappel: Réunion équipe demain', time: 'Il y a 3h', icon: 'fas fa-calendar', color: 'yellow' },
        { id: 4, type: 'info', message: 'Mise à jour du système', time: 'Il y a 5h', icon: 'fas fa-cog', color: 'purple' },
        { id: 5, type: 'error', message: 'Demande refusée - Marie L.', time: 'Il y a 1j', icon: 'fas fa-times-circle', color: 'red' }
    ],
    demands: [
        { id: 1, type: 'Congés payés', dates: '2024-01-15 - 2024-01-19', days: 5, status: 'pending', icon: 'fas fa-umbrella-beach' },
        { id: 2, type: 'Congé maladie', dates: '2024-01-10 - 2024-01-12', days: 3, status: 'approved', icon: 'fas fa-notes-medical' },
        { id: 3, type: 'RTT', dates: '2024-01-08 - 2024-01-08', days: 1, status: 'rejected', icon: 'fas fa-business-time' }
    ]
};

// Utility Functions
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    const el = document.getElementById('current-date');
    if (el) el.textContent = now.toLocaleString('fr-FR', options); // toLocaleString pour date+heure
}

function showNotificationToken(message, icon = 'fas fa-check', type = 'success') {
    const token = document.getElementById('notification-token');
    if (!token) return;
    const tokenText = document.getElementById('token-text');
    const tokenIcon = document.getElementById('token-icon');

    if (tokenText) tokenText.textContent = message;
    if (tokenIcon) tokenIcon.className = icon;

    const colors = {
        success: 'from-green-500 to-emerald-500',
        info: 'from-blue-500 to-cyan-500',
        warning: 'from-yellow-500 to-orange-500',
        error: 'from-red-500 to-pink-500'
    };

    // Remplace les classes précédentes par les classes voulues
    token.className = `notification-token glass-effect text-white px-6 py-3 rounded-2xl shadow-2xl bg-gradient-to-r ${colors[type] || colors.success}`;
    token.classList.add('show');

    setTimeout(() => {
        token.classList.remove('show');
    }, 4000);
}

// Theme Management
function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.className = theme === 'dark' ? 'dark h-full' : 'h-full';
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.className = newTheme === 'dark' ? 'dark h-full' : 'h-full';
    localStorage.setItem('theme', newTheme);

    showNotificationToken(
        `Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`,
        newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun',
        'info'
    );
    if (window.notyf) notyf.success && notyf.success(`Interface basculée en mode ${newTheme === 'dark' ? 'sombre' : 'clair'}`);
}

// Sidebar Management
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!sidebar || !overlay) return;
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!sidebar || !overlay) return;
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
}

// Notifications Management
function toggleNotifications() {
    const dropdown = document.getElementById('notifications-dropdown');
    if (!dropdown) return;
    dropdown.classList.toggle('show');

    if (dropdown.classList.contains('show')) {
        showNotificationToken('Notifications consultées', 'fas fa-bell', 'info');
        if (window.notyf && notyf.info) notyf.info(`${appData.notifications.length} notifications disponibles`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    initTheme();
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Welcome message (avec garde)
    setTimeout(() => {
        showNotificationToken('Bienvenue sur Graxel Tech', 'fas fa-rocket', 'success');
        if (window.notyf && notyf.success) notyf.success('Bienvenue Jean Martin ! Tableau de bord chargé avec succès.');
    }, 1000);

    // Safely attach listeners only if elements exist
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    if (toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', toggleSidebar);

    const closeSidebarBtn = document.getElementById('close-sidebar');
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);

    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    const notificationsBtn = document.getElementById('notifications-btn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleNotifications();
        });
    }

    // Close notifications dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('notifications-dropdown');
        const btn = document.getElementById('notifications-btn');
        if (!dropdown || !btn) return;
        if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Action buttons (avec gardes)
    const newRequestBtn = document.getElementById('new-request-btn');
    if (newRequestBtn) newRequestBtn.addEventListener('click', function() {
        showNotificationToken('Nouvelle demande initialisée', 'fas fa-plus', 'success');
        if (window.notyf && notyf.success) notyf.success('Redirection vers le formulaire de demande...');
    });

    const calendarBtn = document.getElementById('calendar-btn');
    if (calendarBtn) calendarBtn.addEventListener('click', function() {
        showNotificationToken('Ouverture du calendrier', 'fas fa-calendar-alt', 'info');
        if (window.notyf && notyf.info) notyf.info('Chargement du calendrier...');
    });

    const reportsBtn = document.getElementById('reports-btn');
    if (reportsBtn) reportsBtn.addEventListener('click', function() {
        showNotificationToken('Génération des rapports', 'fas fa-chart-bar', 'info');
        if (window.notyf && notyf.info) notyf.info('Préparation des rapports statistiques...');
    });

    const teamBtn = document.getElementById('team-btn');
    if (teamBtn) teamBtn.addEventListener('click', function() {
        showNotificationToken('Vue équipe activée', 'fas fa-users', 'info');
        if (window.notyf && notyf.info) notyf.info('Chargement des informations de l\'équipe...');
    });

 const navItems = document.querySelectorAll('.nav-item');
if (navItems && navItems.length) {
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // empêche le clic direct

            const span = this.querySelector('span');
            const text = span ? span.textContent.trim() : (this.textContent || 'élément');

            // Affiche la notification
            showNotificationToken(`Navigation vers "${text}"`, 'fas fa-arrow-right', 'info');
            if (window.notyf && notyf.info) notyf.info(`Redirection vers ${text}...`);

            // Récupère le lien
            const targetUrl = this.getAttribute('href');

            // Redirige après 1 seconde
            if (targetUrl && targetUrl !== "#") {
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 1000);
            }
        });
    });
}


    // Demand items
    const demandItems = document.querySelectorAll('.demand-item');
    if (demandItems && demandItems.length) {
        demandItems.forEach(item => {
            item.addEventListener('click', function() {
                const titleEl = this.querySelector('h4');
                const title = titleEl ? titleEl.textContent.trim() : 'demande';
                showNotificationToken(`Demande "${title}" consultée`, 'fas fa-eye', 'info');
                if (window.notyf && notyf.info) notyf.info(`Ouverture des détails: ${title}`);
            });
        });
    }

    // Status badges (générique)
    const badges = document.querySelectorAll('span[class*="bg-yellow-100"], span[class*="bg-green-500"], span[class*="bg-red-500"]');
    if (badges && badges.length) {
        badges.forEach(badge => {
            badge.addEventListener('click', function(e) {
                e.stopPropagation();
                const status = this.textContent.trim();
                showNotificationToken(`Statut "${status}" consulté`, 'fas fa-info-circle', 'info');
                if (window.notyf && notyf.info) notyf.info(`Détails du statut: ${status}`);
            });
        });
    }

    // Calendar dates (CORRECTION: ne pas utiliser `this` dans arrow => utilise param)
    const greenDates = document.querySelectorAll('[class*="bg-green-100"]');
    if (greenDates && greenDates.length) {
        greenDates.forEach(dateEl => {
            dateEl.addEventListener('click', function() {
                const dateNum = this.textContent.trim();
                showNotificationToken(`Congé prévu le ${dateNum} sept.`, 'fas fa-calendar-check', 'info');
                if (window.notyf && notyf.info) notyf.info(`Détails du congé pour le ${dateNum} septembre`);
            });
        });
    }

    // Add smooth animations to cards on scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        // CORRECTION: callback propre (suppression du HTML collé par erreur)
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe all cards
    const slideCards = document.querySelectorAll('[class*="animate-slide-up"]');
    if (slideCards && slideCards.length) {
        slideCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Add hover effects enhancement
    const hoverLift = document.querySelectorAll('.hover-lift');
    if (hoverLift && hoverLift.length) {
        hoverLift.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }

    // Simulate real-time updates for pulse indicators
    setInterval(() => {
        const notifications = document.querySelectorAll('.animate-pulse');
        if (notifications.length > 0) {
            const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
            randomNotif.style.animationDuration = '0.5s';
            setTimeout(() => {
                randomNotif.style.animationDuration = '';
            }, 1500);
        }
    }, 15000);

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + D = Toggle dark mode
        if ((e.ctrlKey || e.metaKey) && (e.key === 'd' || e.key === 'D')) {
            e.preventDefault();
            toggleTheme();
        }

        // Ctrl/Cmd + N = New request
        if ((e.ctrlKey || e.metaKey) && (e.key === 'n' || e.key === 'N')) {
            e.preventDefault();
            const btn = document.getElementById('new-request-btn');
            if (btn) btn.click();
        }

        // Ctrl/Cmd + K = Toggle notifications
        if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
            e.preventDefault();
            toggleNotifications();
        }

        // Escape = Close sidebar and notifications
        if (e.key === 'Escape') {
            closeSidebar();
            const dropdown = document.getElementById('notifications-dropdown');
            if (dropdown) dropdown.classList.remove('show');
        }
    });

    // Add ripple effect to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            // ignore if the button already contains a ripple wrapper
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 9999;
            `;

            this.style.position = this.style.position || 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation (once)
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Progressive loading simulation (fade/slide)
    if (slideCards && slideCards.length) {
        slideCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Auto-refresh notifications count (sécurisé)
    setInterval(() => {
        const notifBadge = document.querySelector('.animate-pulse');
        if (notifBadge && Math.random() > 0.7) {
            const parsed = parseInt(notifBadge.textContent, 10);
            const currentCount = isNaN(parsed) ? 0 : parsed;
            notifBadge.textContent = currentCount + 1;
            showNotificationToken('Nouvelle notification reçue', 'fas fa-bell', 'info');
        }
    }, 30000);

    // Add smooth scrolling for all internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Initialize basic tooltips for icons
    document.querySelectorAll('[class*="fas fa-"]').forEach(icon => {
        const parts = icon.className.split('fa-');
        icon.title = parts[1] ? parts[1].replace('-', ' ') : 'Action';
    });

    console.log('🚀 Graxel Tech Dashboard initialized successfully!');
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (!sidebar || !overlay) return;
    if (window.innerWidth >= 768) {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
    }
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        console.log('💡 Service Worker support detected');
    });
}
    
        // Configuration Tailwind
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        'poppins': ['Poppins', 'sans-serif'],
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        'slide-up': 'slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        'slide-right': 'slideRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        'bounce-subtle': 'bounceSubtle 1.2s ease-out',
                        'pulse-ring': 'pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
                        'float': 'float 6s ease-in-out infinite',
                        'glow': 'glow 2s ease-in-out infinite alternate',
                        'shimmer': 'shimmer 2s linear infinite',
                    },
                    backgroundImage: {
                        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                    }
                }
            }
        }

        // Attendre que le DOM et config.js soient chargés
        document.addEventListener('DOMContentLoaded', function() {
            // Gestion du pop-up nouvelle demande
            const btnNouvelleDemande = document.getElementById('btn-nouvelle-demande');
            const popupNouvelleDemande = document.getElementById('popup-nouvelle-demande');
            const closePopup = document.getElementById('close-popup');
            const annulerDemande = document.getElementById('annuler-demande');
            const soumettreDemandeBtn = document.getElementById('soumettre-demande');

            // Ouvrir le pop-up
            if (btnNouvelleDemande && popupNouvelleDemande) {
                btnNouvelleDemande.addEventListener('click', () => {
                    popupNouvelleDemande.classList.remove('hidden');
                    if (window.showNotificationToken) {
                        showNotificationToken('Nouvelle demande initialisée', 'fas fa-plus', 'info');
                    }
                });
            }

            // Fermer le pop-up
            function fermerPopup() {
                if (popupNouvelleDemande) {
                    popupNouvelleDemande.classList.add('hidden');
                }
            }

            if (closePopup) closePopup.addEventListener('click', fermerPopup);
            if (annulerDemande) annulerDemande.addEventListener('click', fermerPopup);

            // Fermer en cliquant en dehors
            if (popupNouvelleDemande) {
                popupNouvelleDemande.addEventListener('click', (e) => {
                    if (e.target === popupNouvelleDemande) {
                        fermerPopup();
                    }
                });
            }

            // Soumettre la demande
            if (soumettreDemandeBtn) {
                soumettreDemandeBtn.addEventListener('click', () => {
                    if (window.showNotificationToken) {
                        showNotificationToken('Demande soumise avec succès', 'fas fa-check', 'success');
                    }
                    if (window.notyf && notyf.success) {
                        notyf.success('Votre demande de congé a été soumise pour validation');
                    }
                    fermerPopup();
                });
            }

            // Actions rapides - utiliser les fonctions existantes si disponibles
            const actionButtons = document.querySelectorAll('.gradient-bg, a[href*="calendrier"], a[href*="rapports"], a[href*="equipe"]');
            actionButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (!href || href === '#') {
                        e.preventDefault();
                        const text = this.querySelector('span') ? this.querySelector('span').textContent : 'Action';
                        if (window.showNotificationToken) {
                            showNotificationToken(`${text} activé`, 'fas fa-arrow-right', 'info');
                        }
                    }
                });
            });
        });
    
    
        // Gestion du loader
        window.addEventListener('load', function() {
            const loader = document.getElementById('loader');
            const mainContent = document.getElementById('mainContent');
            
            setTimeout(() => {
                loader.classList.add('hide');
                setTimeout(() => {
                    loader.style.display = 'none';
                    mainContent.classList.add('show');
                }, 500);
            }, 3000);
        });

        // Gestion du thème (utilisation de variables JS au lieu de localStorage pour éviter les erreurs)
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        let currentTheme = 'dark'; // Variable par défaut
        
        themeToggle.addEventListener('click', () => {
            if (currentTheme === 'light') {
                body.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                currentTheme = 'dark';
            } else {
                body.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                currentTheme = 'light';
            }
        });

        // Gestion du mot de passe
        const passwordToggle = document.getElementById('passwordToggle');
        const passwordInput = document.getElementById('password');
        
        passwordToggle.addEventListener('click', () => {
            const icon = passwordToggle.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                passwordInput.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });

        // Gestion des rôles
        const roleOptions = document.querySelectorAll('.role-option');
        const roleRadios = document.querySelectorAll('.role-radio');
        
        roleOptions.forEach((option, index) => {
            option.addEventListener('click', () => {
                roleOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                roleRadios[index].checked = true;
            });
        });

        roleRadios.forEach((radio, index) => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    roleOptions.forEach(opt => opt.classList.remove('selected'));
                    roleOptions[index].classList.add('selected');
                }
            });
        });

        // Soumission du formulaire
        const loginForm = document.getElementById('loginForm');
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const selectedRole = document.querySelector('input[name="role"]:checked');
            
            if (!selectedRole) {
                alert('Veuillez sélectionner un rôle');
                return;
            }
            
            // Simulation de connexion
            console.log('Connexion:', {
                email: email,
                password: password,
                role: selectedRole.value
            });
            
            alert(`Connexion en cours...\nEmail: ${email}\nRôle: ${selectedRole.value}`);
            
            // Redirection simulée
            // window.location.href = 'dashboard.html';
        });

        // Animations au focus
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = '';
            });
        });
