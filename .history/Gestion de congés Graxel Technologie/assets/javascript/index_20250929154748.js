   
        // Gestion du loader
        window.addEventListener('load', function() {
            const loader = document.getElementById('loader');
            const mainContent = document.getElementById('mainContent');

            let progress = 0;
            const progressBar = document.querySelector('.loader-progress-bar');
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);

                    setTimeout(() => {
                        loader.classList.add('hide');
                        setTimeout(() => {
                            loader.style.display = 'none';
                            mainContent.classList.add('show');
                        }, 500);
                    }, 500);
                }
                progressBar.style.width = `${progress}%`;
            }, 200);
        });

        // Gestion du thème avec icône plus petite
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        let currentTheme = localStorage.getItem('theme') || 'dark';

        if (currentTheme === 'light') {
            body.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

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
            localStorage.setItem('theme', currentTheme);
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

        // Gestion du popup mot de passe oublié
        const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
        const forgotPasswordPopup = document.getElementById('forgotPasswordPopup');
        const closePopup = document.getElementById('closePopup');
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');

        forgotPasswordBtn.addEventListener('click', () => {
            forgotPasswordPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        closePopup.addEventListener('click', () => {
            forgotPasswordPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        forgotPasswordPopup.addEventListener('click', (e) => {
            if (e.target === forgotPasswordPopup) {
                forgotPasswordPopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Fonction pour afficher le toast
        function showToast(message) {
            toastMessage.textContent = message;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        }

        // Gestion du formulaire de réinitialisation
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const resetEmail = document.getElementById('resetEmail').value;
            const btnContent = document.querySelector('#resetSubmitBtn .btn-content');
            const btnLoader = document.querySelector('#resetSubmitBtn .btn-loader');

            if (!resetEmail) {
                showToast("Veuillez saisir votre adresse email");
                return;
            }

            if (!resetEmail.includes('@')) {
                showToast("Veuillez utiliser une adresse email valide");
                return;
            }

            // Affichage du loader centré
            btnContent.style.opacity = '0';
            btnLoader.style.display = 'block';

            setTimeout(() => {
                showToast("Un lien de réinitialisation a été envoyé à votre adresse email");

                setTimeout(() => {
                    forgotPasswordPopup.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    window.location.href = './Gestion de congés Graxel Technologie/nouveau mot de passe.html';
                }, 1500);
            }, 1500);
        });

        // Gestion du formulaire de connexion
        const loginForm = document.getElementById('loginForm');
        const submitBtn = document.getElementById('submitBtn');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const btnContent = document.querySelector('#submitBtn .btn-content');
            const btnLoader = document.querySelector('#submitBtn .btn-loader');

            if (!email) {
                showToast("Veuillez saisir votre adresse email");
                return;
            }

            if (!password) {
                showToast("Veuillez saisir votre mot de passe");
                return;
            }

            if (!email.includes('@')) {
                showToast("Veuillez utiliser une adresse email valide");
                return;
            }

            if (password.length < 6) {
                showToast("Le mot de passe doit contenir au moins 6 caractères");
                return;
            }

            // Affichage du loader centré
            btnContent.style.opacity = '0';
            btnLoader.style.display = 'block';

            setTimeout(() => {
                const userName = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
                showToast(`Connexion réussie ! Bienvenue ${userName}`);

                setTimeout(() => {
                    window.location.href = './Gestion de congés Graxel Technologie/tableau de bord-employers.html';
                }, 1500);
            }, 1500);
        });

        // Animations supplémentaires
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.boxShadow = '0 0 0 4px rgba(79, 70, 229, 0.2)';
            });

            input.addEventListener('blur', () => {
                input.style.boxShadow = 'none';
            });
        });
    