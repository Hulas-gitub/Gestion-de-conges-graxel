
// Jours fériés du Gabon pour 2025-2026
const gabonHolidays = {
    // 2025
    '2025-01-01': 'Jour de l\'An',
    '2025-03-12': 'Fête de la Rénovation',
    '2025-04-18': 'Vendredi Saint',
    '2025-04-21': 'Lundi de Pâques',
    '2025-05-01': 'Fête du Travail',
    '2025-05-29': 'Ascension',
    '2025-06-09': 'Lundi de Pentecôte',
    '2025-08-15': 'Assomption',
    '2025-08-17': 'Fête de l\'Indépendance',
    '2025-11-01': 'Toussaint',
    '2025-12-25': 'Noël',

    // 2026
    '2026-01-01': 'Jour de l\'An',
    '2026-03-12': 'Fête de la Rénovation',
    '2026-04-03': 'Vendredi Saint',
    '2026-04-06': 'Lundi de Pâques',
    '2026-05-01': 'Fête du Travail',
    '2026-05-14': 'Ascension',
    '2026-05-25': 'Lundi de Pentecôte',
    '2026-08-15': 'Assomption',
    '2026-08-17': 'Fête de l\'Indépendance',
    '2026-11-01': 'Toussaint',
    '2026-12-25': 'Noël'
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

function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.className = theme === 'dark' ? 'dark h-full' : 'h-full';
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.className = newTheme === 'dark' ? 'dark h-full' : 'h-full';
    localStorage.setItem('theme', newTheme);
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
    return day === 0 ? 6 : day - 1;
}

// Fonction corrigée pour formater la date
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isDateInRange(date, startDate, endDate) {
    const dateStr = formatDate(date);
    return dateStr >= startDate && dateStr <= endDate;
}

function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}

// Fonction corrigée pour vérifier les jours fériés
function isHoliday(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    return gabonHolidays[dateStr];
}

function getLeaveForDate(date) {
    const dateStr = formatDate(date);
    return calendarData.leaves.find(leave =>
        leave.userId === 'jean-martin' &&
        isDateInRange(date, leave.startDate, leave.endDate) &&
        leave.status === 'approved'
    );
}

function countBusinessDays(startDate, endDate) {
    let count = 0;
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
        if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
            count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
}

// Fonction pour générer les jours de congé maladie
function generateSickLeaveSchedule() {
    const startDate = new Date(2025, 9, 20); // 20 octobre 2025 (mois 9 car janvier = 0)
    const sickLeaveBalance = 20;
    let daysAdded = 0;
    let currentDate = new Date(startDate);
    const leaves = [];

    while (daysAdded < sickLeaveBalance) {
        // Vérifier si ce n'est pas un weekend ou un jour férié
        if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
            leaves.push({
                id: leaves.length + 1,
                userId: 'jean-martin',
                type: 'sick',
                startDate: formatDate(currentDate),
                endDate: formatDate(currentDate),
                status: 'approved',
                reason: 'Congé maladie'
            });
            daysAdded++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return leaves;
}

// Calendar Data
const calendarData = {
    currentDate: new Date(),
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    leaves: [], // Sera rempli après l'initialisation des fonctions
    sickLeaveBalance: 20,
    sickLeaveUsed: 0
};

function updateSickLeaveUI() {
    const sickLeaveUsedElement = document.getElementById('sick-leave-used');
    const sickLeaveBalanceElement = document.getElementById('sick-leave-balance');
    const sickLeaveRemainingElement = document.getElementById('sick-leave-remaining');
    const sickLeavePercentageElement = document.getElementById('sick-leave-percentage');
    const sickLeaveProgressElement = document.getElementById('sick-leave-progress');

    // Calculer les congés maladie RÉELLEMENT consommés (seulement les jours passés)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour comparer uniquement les dates
    
    const sickLeaves = calendarData.leaves.filter(leave => {
        if (leave.type !== 'sick' || leave.userId !== 'jean-martin' || leave.status !== 'approved') {
            return false;
        }
        // Vérifier si le jour de congé est dans le passé ou aujourd'hui
        const leaveDate = new Date(leave.startDate);
        leaveDate.setHours(0, 0, 0, 0);
        return leaveDate <= today;
    });
    
    const used = sickLeaves.length;
    const balance = calendarData.sickLeaveBalance;
    const remaining = balance - used;
    const percentage = Math.round((used / balance) * 100);

    calendarData.sickLeaveUsed = used;

    // Obtenir les dates de début et fin du congé
    const allSickLeaves = calendarData.leaves.filter(leave => 
        leave.type === 'sick' && 
        leave.userId === 'jean-martin' && 
        leave.status === 'approved'
    );
    
    let startDate = '';
    let endDate = '';
    
    if (allSickLeaves.length > 0) {
        const dates = allSickLeaves.map(leave => new Date(leave.startDate)).sort((a, b) => a - b);
        startDate = dates[0].toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
        endDate = dates[dates.length - 1].toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
    }

    sickLeaveUsedElement.textContent = `${used} / ${balance} jours`;
    sickLeaveBalanceElement.textContent = `${balance} jours`;
    sickLeaveRemainingElement.textContent = `Restant: ${remaining} jours`;
    sickLeavePercentageElement.textContent = `${percentage}%`;
    sickLeaveProgressElement.style.width = `${percentage}%`;
    
    // Ajouter les informations de l'employé et la durée du congé
    const employeeInfoElement = document.getElementById('sick-leave-employee-info');
    const leaveDurationElement = document.getElementById('sick-leave-duration');
    
    if (employeeInfoElement) {
        employeeInfoElement.innerHTML = `
            <div class="flex items-center space-x-2 mt-2">
                <i class="fas fa-user text-red-500 text-sm"></i>
                <span class="text-sm text-gray-700 dark:text-gray-300 font-medium">Jean Martin</span>
            </div>
        `;
    }
    
    if (leaveDurationElement && startDate && endDate) {
        leaveDurationElement.innerHTML = `
            <div class="flex items-center space-x-2 mt-2">
                <i class="fas fa-calendar-alt text-red-500 text-sm"></i>
                <span class="text-xs text-gray-600 dark:text-gray-400">Du ${startDate} au ${endDate}</span>
            </div>
        `;
    }
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthElement = document.getElementById('current-month');
    const yearElement = document.getElementById('current-year');

    monthElement.textContent = getMonthName(calendarData.currentMonth);
    yearElement.textContent = calendarData.currentYear.toString();

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

        dayElement.className = 'calendar-day text-gray-700 dark:text-gray-300 rounded-xl font-medium relative';

        // Create day number container
        const dayNumber = document.createElement('div');
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);

        // Check if it's today
        if (currentDate.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }

        // Check for holidays FIRST (priority over leaves)
        const holidayName = isHoliday(currentDate);
        if (holidayName) {
            dayElement.classList.add('holiday');

            // Add holiday badge
            const badge = document.createElement('div');
            badge.className = 'holiday-badge';
            badge.title = holidayName;
            dayElement.appendChild(badge);

            // Add holiday name below the day number (masqué sur mobile)
            const holidayLabel = document.createElement('div');
            holidayLabel.className = 'text-xs text-blue-900 dark:text-blue-300 font-semibold mt-1 truncate holiday-label';
            holidayLabel.textContent = holidayName.length > 15 ? holidayName.substring(0, 15) + '...' : holidayName;
            holidayLabel.title = holidayName;
            dayElement.appendChild(holidayLabel);

            // Ajout du tooltip (affiché au clic sur mobile)
            dayElement.addEventListener('click', (e) => {
                e.stopPropagation();
                let tooltip = dayElement.querySelector('.holiday-tooltip');
                if (!tooltip) {
                    tooltip = document.createElement('div');
                    tooltip.className = 'holiday-tooltip';
                    tooltip.textContent = holidayName;
                    dayElement.appendChild(tooltip);
                    tooltip.style.display = 'block';
                    setTimeout(() => {
                        tooltip.style.display = 'none';
                    }, 2000);
                }
            });

            dayElement.title = holidayName;
        } else {
            // Check for leaves only if not a holiday
            const leave = getLeaveForDate(currentDate);
            if (leave && !isWeekend(currentDate)) {
                dayElement.classList.add('has-leave', `leave-${leave.type}`);
                if (leave.type === 'sick') {
                    dayElement.classList.add('sick-leave');
                }
                const leaveTypeNames = {
                    'sick': 'Congé maladie',
                    'paid': 'Congés payés',
                    'maternity': 'Congé maternité',
                    'rtt': 'RTT',
                    'unpaid': 'Sans solde',
                    'paternity': 'Congé paternité'
                };
                dayElement.title = `${leaveTypeNames[leave.type]}: ${leave.reason}`;
            }
        }

        // Add click event
        dayElement.addEventListener('click', () => {
            if (holidayName) {
                notyf.info(`🎉 Jour férié: ${holidayName}`);
            } else {
                const leave = getLeaveForDate(currentDate);
                if (leave) {
                    const leaveTypeNames = {
                        'sick': 'Congé maladie',
                        'paid': 'Congés payés',
                        'maternity': 'Congé maternité',
                        'rtt': 'RTT',
                        'unpaid': 'Sans solde',
                        'paternity': 'Congé paternité'
                    };
                    notyf.info(`${leaveTypeNames[leave.type]} - ${leave.reason}`);
                } else {
                    notyf.info(`${day} ${getMonthName(calendarData.currentMonth)}`);
                }
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
    notyf.info(`${getMonthName(calendarData.currentMonth)} ${calendarData.currentYear}`);
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
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Générer les congés maladie automatiquement
    calendarData.leaves = generateSickLeaveSchedule();
    
    initTheme();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    renderCalendar();
    updateSickLeaveUI();

    setTimeout(() => {
        notyf.success('Calendrier des congés initialisé');
    }, 1000);
    
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
    document.getElementById('close-sidebar').addEventListener('click', closeSidebar);
    document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);
    document.getElementById('prev-month').addEventListener('click', () => navigateMonth('prev'));
    document.getElementById('next-month').addEventListener('click', () => navigateMonth('next'));
    document.getElementById('notifications-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        toggleNotifications();
    });
    
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('notifications-dropdown');
        const btn = document.getElementById('notifications-btn');

        if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
    
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

        if (e.key === 'Escape') {
            closeSidebar();
            document.getElementById('notifications-dropdown').classList.remove('show');
        }
    });
    
    console.log('🗓️ Graxel Tech Calendar initialized successfully with Gabon holidays!');
});

window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (window.innerWidth >= 768) {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
    }
});
