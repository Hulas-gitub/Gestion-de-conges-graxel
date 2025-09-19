
        // Calendar Data - Compatible with Laravel/Express.js backend
        const calendarData = {
            currentDate: new Date(),
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            leaves: [
                {
                    id: 1,
                    userId: 'jean-martin',
                    type: 'sick',
                    startDate: '2025-09-15',
                    endDate: '2025-09-17',
                    status: 'approved',
                    reason: 'Grippe'
                },
                {
                    id: 2,
                    userId: 'jean-martin',
                    type: 'paid',
                    startDate: '2025-09-20',
                    endDate: '2025-09-22',
                    status: 'approved',
                    reason: 'Vacances'
                },
                {
                    id: 3,
                    userId: 'sophie-martin',
                    type: 'maternity',
                    startDate: '2025-09-01',
                    endDate: '2025-12-01',
                    status: 'approved',
                    reason: 'Congé maternité'
                },
                {
                    id: 4,
                    userId: 'jean-martin',
                    type: 'rtt',
                    startDate: '2025-09-25',
                    endDate: '2025-09-25',
                    status: 'pending',
                    reason: 'RTT'
                }
            ]
        };

        // Utility Functions
        function updateDateTime() {
            const now = new Date();
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            document.getElementById('current-date').textContent = now.toLocaleDateString('fr-FR', options);
        }

        function showNotificationToken(message, icon = 'fas fa-check', type = 'success') {
            const token = document.getElementById('notification-token');
            const tokenText = document.getElementById('token-text');
            const tokenIcon = document.getElementById('token-icon');
            
            tokenText.textContent = message;
            tokenIcon.className = icon;
            
            const colors = {
                success: 'from-green-500 to-emerald-500',
                info: 'from-blue-500 to-cyan-500',
                warning: 'from-yellow-500 to-orange-500',
                error: 'from-red-500 to-pink-500'
            };
            
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
            notyf.success(`Interface basculée en mode ${newTheme === 'dark' ? 'sombre' : 'clair'}`);
        }

        // Calendar Functions
        function getMonthName(month) {
            const months = [
                'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
            ];
            return months[month];
        }

        function getDaysInMonth(month, year) {
            return new Date(year, month + 1, 0).getDate();
        }

        function getFirstDayOfMonth(month, year) {
            const day = new Date(year, month, 1).getDay();
            return day === 0 ? 6 : day - 1; // Convert Sunday (0) to 6, and make Monday = 0
        }

        function formatDate(date) {
            return date.toISOString().split('T')[0];
        }

        function isDateInRange(date, startDate, endDate) {
            const dateStr = formatDate(date);
            return dateStr >= startDate && dateStr <= endDate;
        }

        function getLeaveForDate(date) {
            const dateStr = formatDate(date);
            return calendarData.leaves.find(leave => 
                leave.userId === 'jean-martin' && 
                isDateInRange(date, leave.startDate, leave.endDate) &&
                leave.status === 'approved'
            );
        }

        function renderCalendar() {
            const grid = document.getElementById('calendar-grid');
            const monthElement = document.getElementById('current-month');
            const yearElement = document.getElementById('current-year');
            
            // Update month/year display
            monthElement.textContent = getMonthName(calendarData.currentMonth);
            yearElement.textContent = calendarData.currentYear.toString();
            
            // Clear grid
            grid.innerHTML = '';
            
            const daysInMonth = getDaysInMonth(calendarData.currentMonth, calendarData.currentYear);
            const firstDay = getFirstDayOfMonth(calendarData.currentMonth, calendarData.currentYear);
            const today = new Date();
            
            // Add empty cells for days before month starts
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day text-gray-300 dark:text-gray-600';
                const prevMonth = calendarData.currentMonth === 0 ? 11 : calendarData.currentMonth - 1;
                const prevYear = calendarData.currentMonth === 0 ? calendarData.currentYear - 1 : calendarData.currentYear;
                const prevMonthDays = getDaysInMonth(prevMonth, prevYear);
                emptyDay.textContent = prevMonthDays - firstDay + i + 1;
                grid.appendChild(emptyDay);
            }
            
            // Add days of current month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                const currentDate = new Date(calendarData.currentYear, calendarData.currentMonth, day);
                
                dayElement.className = 'calendar-day text-gray-700 dark:text-gray-300 rounded-xl font-medium';
                dayElement.textContent = day;
                
                // Check if it's today
                if (currentDate.toDateString() === today.toDateString()) {
                    dayElement.classList.add('today');
                }
                
                // Check for leaves
                const leave = getLeaveForDate(currentDate);
                if (leave) {
                    dayElement.classList.add('has-leave', `leave-${leave.type}`);
                    dayElement.title = `${leave.type === 'sick' ? 'Congé maladie' : 
                                             leave.type === 'paid' ? 'Congés payés' :
                                             leave.type === 'maternity' ? 'Congé maternité' :
                                             leave.type === 'rtt' ? 'RTT' :
                                             leave.type === 'unpaid' ? 'Sans solde' :
                                             leave.type === 'paternity' ? 'Congé paternité' : 'Congé'}: ${leave.reason}`;
                }
                
                // Add click event
                dayElement.addEventListener('click', () => {
                    if (leave) {
                        showNotificationToken(`Congé: ${leave.reason}`, 'fas fa-info-circle', 'info');
                        notyf.info(`${leave.type === 'sick' ? 'Congé maladie' : 
                                      leave.type === 'paid' ? 'Congés payés' :
                                      leave.type === 'maternity' ? 'Congé maternité' :
                                      leave.type === 'rtt' ? 'RTT' :
                                      leave.type === 'unpaid' ? 'Sans solde' :
                                      leave.type === 'paternity' ? 'Congé paternité' : 'Congé'} - ${leave.reason}`);
                    } else {
                        showNotificationToken(`${day} ${getMonthName(calendarData.currentMonth)}`, 'fas fa-calendar-day', 'info');
                    }
                });
                
                grid.appendChild(dayElement);
            }
            
            // Add empty cells for next month
            const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
            const remainingCells = totalCells - (daysInMonth + firstDay);
            
            for (let i = 1; i <= remainingCells; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day text-gray-300 dark:text-gray-600';
                emptyDay.textContent = i;
                grid.appendChild(emptyDay);
            }
        }

        function navigateMonth(direction) {
            if (direction === 'prev') {
                if (calendarData.currentMonth === 0) {
                    calendarData.currentMonth = 11;
                    calendarData.currentYear--;
                } else {
                    calendarData.currentMonth--;
                }
            } else {
                if (calendarData.currentMonth === 11) {
                    calendarData.currentMonth = 0;
                    calendarData.currentYear++;
                } else {
                    calendarData.currentMonth++;
                }
            }
            renderCalendar();
            showNotificationToken(
                `${getMonthName(calendarData.currentMonth)} ${calendarData.currentYear}`, 
                'fas fa-calendar-alt', 
                'info'
            );
        }

        function goToToday() {
            const today = new Date();
            calendarData.currentMonth = today.getMonth();
            calendarData.currentYear = today.getFullYear();
            renderCalendar();
            showNotificationToken('Retour à aujourd\'hui', 'fas fa-calendar-day', 'success');
        }

        // Sidebar Management
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            
            sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
        }

        function closeSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
        }

        // Notifications Management
        function toggleNotifications() {
            const dropdown = document.getElementById('notifications-dropdown');
            dropdown.classList.toggle('show');
            
            if (dropdown.classList.contains('show')) {
                showNotificationToken('Notifications consultées', 'fas fa-bell', 'info');
            }
        }

        // API Functions (for Laravel/Express.js integration)
        async function fetchLeaveData() {
            try {
                // Example API call structure for Laravel/Express.js
                // const response = await fetch('/api/leaves', {
                //     method: 'GET',
                //     headers: {
                //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
                //         'Content-Type': 'application/json'
                //     }
                // });
                // const data = await response.json();
                // calendarData.leaves = data.leaves;
                // renderCalendar();
                
                console.log('API call structure ready for backend integration');
            } catch (error) {
                console.error('Error fetching leave data:', error);
                notyf.error('Erreur lors du chargement des données');
            }
        }

        async function exportCalendar() {
            try {
                showNotificationToken('Export en cours...', 'fas fa-download', 'info');
                // API call for calendar export
                // await fetch('/api/calendar/export', { method: 'POST' });
                
                setTimeout(() => {
                    notyf.success('Calendrier exporté avec succès');
                    showNotificationToken('Export terminé', 'fas fa-check', 'success');
                }, 2000);
            } catch (error) {
                notyf.error('Erreur lors de l\'export');
            }
        }

        async function syncCalendar() {
            try {
                showNotificationToken('Synchronisation...', 'fas fa-sync-alt', 'info');
                // API call for calendar sync
                // await fetchLeaveData();
                
                setTimeout(() => {
                    renderCalendar();
                    notyf.success('Calendrier synchronisé');
                    showNotificationToken('Sync terminée', 'fas fa-check', 'success');
                }, 1500);
            } catch (error) {
                notyf.error('Erreur lors de la synchronisation');
            }
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize
            initTheme();
            updateDateTime();
            setInterval(updateDateTime, 1000);
            renderCalendar();
            
            // Welcome message
            setTimeout(() => {
                showNotificationToken('Calendrier chargé', 'fas fa-calendar-alt', 'success');
                notyf.success('Calendrier des congés initialisé');
            }, 1000);

            // Theme toggle
            document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

            // Sidebar management
            document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
            document.getElementById('close-sidebar').addEventListener('click', closeSidebar);
            document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);

            // Calendar navigation
            document.getElementById('prev-month').addEventListener('click', () => navigateMonth('prev'));
            document.getElementById('next-month').addEventListener('click', () => navigateMonth('next'));
            document.getElementById('today-btn').addEventListener('click', goToToday);

            // Notifications
            document.getElementById('notifications-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                toggleNotifications();
            });

            // Close notifications dropdown when clicking outside
            document.addEventListener('click', function(e) {
                const dropdown = document.getElementById('notifications-dropdown');
                const btn = document.getElementById('notifications-btn');
                
                if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });

            // Action buttons
            document.getElementById('new-request-btn').addEventListener('click', function() {
                showNotificationToken('Nouvelle demande', 'fas fa-plus', 'info');
                notyf.info('Redirection vers le formulaire de demande...');
            });

            document.getElementById('export-calendar-btn').addEventListener('click', exportCalendar);
            document.getElementById('sync-calendar-btn').addEventListener('click', syncCalendar);
            
            document.getElementById('print-calendar-btn').addEventListener('click', function() {
                showNotificationToken('Impression...', 'fas fa-print', 'info');
                window.print();
            });

            // Navigation items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const text = this.querySelector('span').textContent;
                    showNotificationToken(`Navigation vers "${text}"`, 'fas fa-arrow-right', 'info');
                    notyf.info(`Redirection vers ${text}...`);
                });
            });

            // View selector
            document.getElementById('view-selector').addEventListener('change', function() {
                const view = this.value;
                showNotificationToken(`Vue ${view === 'month' ? 'mensuelle' : 'hebdomadaire'} activée`, 'fas fa-eye', 'info');
                notyf.info(`Basculement vers la vue ${view === 'month' ? 'mensuelle' : 'hebdomadaire'}`);
            });

            // Keyboard shortcuts
            document.addEventListener('keydown', function(e) {
                if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                    e.preventDefault();
                    toggleTheme();
                }
                
                if (e.key === 'ArrowLeft' && e.ctrlKey) {
                    e.preventDefault();
                    navigateMonth('prev');
                }
                
                if (e.key === 'ArrowRight' && e.ctrlKey) {
                    e.preventDefault();
                    navigateMonth('next');
                }
                
                if (e.key === 'Home' && e.ctrlKey) {
                    e.preventDefault();
                    goToToday();
                }
                
                if (e.key === 'Escape') {
                    closeSidebar();
                    document.getElementById('notifications-dropdown').classList.remove('show');
                }
            });

            // Add smooth hover effects
            document.querySelectorAll('.hover-lift').forEach(element => {
                element.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                    this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                });
                
                element.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                });
            });

            // Legend item interactions
            document.querySelectorAll('.legend-item').forEach(item => {
                item.addEventListener('click', function() {
                    const leaveType = this.querySelector('span').textContent;
                    showNotificationToken(`Filtre: ${leaveType}`, 'fas fa-filter', 'info');
                    notyf.info(`Filtrage par ${leaveType}`);
                });
            });

            console.log('🗓️ Graxel Tech Calendar initialized successfully!');
        });

        // Handle window resize for responsive behavior
        window.addEventListener('resize', function() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            
            if (window.innerWidth >= 768) {
                sidebar.classList.remove('show');
                overlay.classList.remove('show');
            }
        });

        // Print styles
        window.addEventListener('beforeprint', function() {
            document.body.classList.add('printing');
        });

        window.addEventListener('afterprint', function() {
            document.body.classList.remove('printing');
            showNotificationToken('Impression terminée', 'fas fa-check', 'success');
        });