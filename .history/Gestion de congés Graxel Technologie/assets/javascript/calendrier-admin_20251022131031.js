// =============================================
// DONNÉES SIMULÉES - TOUS LES DÉPARTEMENTS
// =============================================
const employeesData = [
    // Département Informatique
    {
        id: 'jean-dupont',
        name: 'Jean Dupont',
        email: 'j.dupont@email.com',
        department: 'informatique',
        departmentLabel: 'Informatique',
        position: 'developer',
        positionLabel: 'Développeur',
        remainingLeave: 25,
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 'sophie-durand',
        name: 'Sophie Durand',
        email: 's.durand@email.com',
        department: 'informatique',
        departmentLabel: 'Informatique',
        position: 'developer',
        positionLabel: 'Développeur',
        remainingLeave: 22,
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 'paul-bernard',
        name: 'Paul Bernard',
        email: 'p.bernard@email.com',
        department: 'informatique',
        departmentLabel: 'Informatique',
        position: 'manager',
        positionLabel: 'Manager',
        remainingLeave: 30,
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    
    // Département RH
    {
        id: 'marie-martin',
        name: 'Marie Martin',
        email: 'm.martin@email.com',
        department: 'rh',
        departmentLabel: 'Ressources Humaines',
        position: 'hr',
        positionLabel: 'RH',
        remainingLeave: 18,
        status: 'on-leave',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 'claire-moreau',
        name: 'Claire Moreau',
        email: 'c.moreau@email.com',
        department: 'rh',
        departmentLabel: 'Ressources Humaines',
        position: 'manager',
        positionLabel: 'Manager',
        remainingLeave: 28,
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
    },
    
    // Département Commercial
    {
        id: 'marc-petit',
        name: 'Marc Petit',
        email: 'm.petit@email.com',
        department: 'commercial',
        departmentLabel: 'Commercial',
        position: 'sales',
        positionLabel: 'Commercial',
        remainingLeave: 15,
        status: 'on-leave',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 'alice-robert',
        name: 'Alice Robert',
        email: 'a.robert@email.com',
        department: 'commercial',
        departmentLabel: 'Commercial',
        position: 'sales',
        positionLabel: 'Commercial',
        remainingLeave: 20,
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face'
    },
    
    // Département Finance
    {
        id: 'thomas-blanc',
        name: 'Thomas Blanc',
        email: 't.blanc@email.com',
        department: 'finance',
        departmentLabel: 'Finance',
        position: 'accountant',
        positionLabel: 'Comptable',
        remainingLeave: 26,
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 'emma-rousseau',
        name: 'Emma Rousseau',
        email: 'e.rousseau@email.com',
        department: 'finance',
        departmentLabel: 'Finance',
        position: 'accountant',
        positionLabel: 'Comptable',
        remainingLeave: 24,
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 'lucas-martin',
        name: 'Lucas Martin',
        email: 'l.martin@email.com',
        department: 'finance',
        departmentLabel: 'Finance',
        position: 'accountant',
        positionLabel: 'Contable',
        remainingLeave: 27,
        status: 'available',
        photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=40&h=40&fit=crop&crop=face'
    }
];

const leaveEvents = [
    {
        id: '1',
        title: 'Jean Dupont - Congés payés',
        start: '2025-10-15',
        end: '2025-10-21',
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        extendedProps: {
            employeeId: 'jean-dupont',
            employeeName: 'Jean Dupont',
            department: 'informatique',
            departmentLabel: 'Informatique',
            leaveType: 'vacation',
            leaveTypeLabel: 'Congés payés',
            remainingLeave: 25,
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        }
    },
    {
        id: '2',
        title: 'Marie Martin - Maladie',
        start: '2025-10-18',
        end: '2025-10-20',
        backgroundColor: '#ef4444',
        borderColor: '#ef4444',
        extendedProps: {
            employeeId: 'marie-martin',
            employeeName: 'Marie Martin',
            department: 'rh',
            departmentLabel: 'Ressources Humaines',
            leaveType: 'sick',
            leaveTypeLabel: 'Maladie',
            remainingLeave: 18,
            photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
        }
    },
    {
        id: '3',
        title: 'Paul Bernard - Formation',
        start: '2025-10-22',
        end: '2025-10-25',
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        extendedProps: {
            employeeId: 'paul-bernard',
            employeeName: 'Paul Bernard',
            department: 'informatique',
            departmentLabel: 'Informatique',
            leaveType: 'training',
            leaveTypeLabel: 'Formation',
            remainingLeave: 30,
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
        }
    },
    {
        id: '4',
        title: 'Sophie Durand - Congés payés',
        start: '2025-10-10',
        end: '2025-10-14',
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        extendedProps: {
            employeeId: 'sophie-durand',
            employeeName: 'Sophie Durand',
            department: 'informatique',
            departmentLabel: 'Informatique',
            leaveType: 'vacation',
            leaveTypeLabel: 'Congés payés',
            remainingLeave: 22,
            photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
        }
    },
    {
        id: '5',
        title: 'Marc Petit - Maternité',
        start: '2025-10-05',
        end: '2025-10-12',
        backgroundColor: '#ec4899',
        borderColor: '#ec4899',
        extendedProps: {
            employeeId: 'marc-petit',
            employeeName: 'Marc Petit',
            department: 'commercial',
            departmentLabel: 'Commercial',
            leaveType: 'maternity',
            leaveTypeLabel: 'Maternité/Paternité',
            remainingLeave: 15,
            photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
        }
    },
    {
        id: '6',
        title: 'Alice Robert - Congés payés',
        start: '2025-10-08',
        end: '2025-10-11',
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        extendedProps: {
            employeeId: 'alice-robert',
            employeeName: 'Alice Robert',
            department: 'commercial',
            departmentLabel: 'Commercial',
            leaveType: 'vacation',
            leaveTypeLabel: 'Congés payés',
            remainingLeave: 20,
            photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face'
        }
    },
    {
        id: '7',
        title: 'Thomas Blanc - Formation',
        start: '2025-10-16',
        end: '2025-10-18',
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        extendedProps: {
            employeeId: 'thomas-blanc',
            employeeName: 'Thomas Blanc',
            department: 'finance',
            departmentLabel: 'Finance',
            leaveType: 'training',
            leaveTypeLabel: 'Formation',
            remainingLeave: 26,
            photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face'
        }
    }
];

// =============================================
// VARIABLES GLOBALES
// =============================================
let calendar;
let currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

// =============================================
// FONCTIONS UTILITAIRES
// =============================================
function formatDate(date) {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getPositionColor(position) {
    const colors = {
        developer: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        designer: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        manager: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        hr: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
        accountant: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        sales: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return colors[position] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
}

function getDepartmentColor(department) {
    const colors = {
        informatique: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        rh: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
        commercial: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        finance: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return colors[department] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
}

function getLeaveProgressColor(remainingDays) {
    if (remainingDays >= 20) return 'bg-green-600';
    if (remainingDays >= 10) return 'bg-yellow-600';
    return 'bg-red-600';
}

function getStatusColor(status) {
    return status === 'available'
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
}

function getStatusLabel(status) {
    return status === 'available' ? 'Disponible' : 'En congé';
}

// =============================================
// FONCTIONS PRINCIPALES
// =============================================
function populateEmployeeFilter() {
    const filter = document.getElementById('employeeCalendarFilter');
    filter.innerHTML = '<option value="">Tous les employés</option>' +
        employeesData.map(emp => `<option value="${emp.id}">${emp.name} - ${emp.departmentLabel}</option>`).join('');
}

function filterCalendar() {
    const departmentFilter = document.getElementById('departmentCalendarFilter').value;
    const employeeFilter = document.getElementById('employeeCalendarFilter').value;
    const leaveTypeFilter = document.getElementById('leaveTypeCalendarFilter').value;

    let filteredEvents = leaveEvents.filter(event => {
        const matchesDepartment = !departmentFilter || event.extendedProps.department === departmentFilter;
        const matchesEmployee = !employeeFilter || event.extendedProps.employeeId === employeeFilter;
        const matchesType = !leaveTypeFilter || event.extendedProps.leaveType === leaveTypeFilter;
        return matchesDepartment && matchesEmployee && matchesType;
    });

    calendar.removeAllEvents();
    calendar.addEventSource(filteredEvents);
}

function updateViewButtons(activeView) {
    const monthBtn = document.getElementById('monthViewBtn');
    const weekBtn = document.getElementById('weekViewBtn');

    monthBtn.className = activeView === 'month'
        ? 'px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium'
        : 'px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-sm font-medium';

    weekBtn.className = activeView === 'week'
        ? 'px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium'
        : 'px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-sm font-medium';
}

// Fonction pour afficher le modal
function showLeaveModal(event) {
    const props = event.extendedProps;
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <div class="flex items-center space-x-4 mb-4">
            <img src="${props.photo}" alt="${props.employeeName}" class="w-12 h-12 rounded-full object-cover">
            <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">${props.employeeName}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">${props.departmentLabel} - ${props.leaveTypeLabel}</p>
            </div>
        </div>
        <div class="space-y-3">
            <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Département:</span>
                <span class="px-2 py-1 text-xs font-medium rounded-full ${getDepartmentColor(props.department)}">${props.departmentLabel}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Date de début:</span>
                <span class="font-medium text-gray-900 dark:text-white">${formatDate(event.start)}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Date de fin:</span>
                <span class="font-medium text-gray-900 dark:text-white">${formatDate(event.end)}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Durée:</span>
                <span class="font-medium text-gray-900 dark:text-white">${calculateDuration(event.start, event.end)} jour(s)</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Solde restant:</span>
                <span class="font-medium text-gray-900 dark:text-white">${props.remainingLeave} jours</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Type de congé:</span>
                <span class="px-2 py-1 text-xs rounded-full text-white" style="background-color: ${event.backgroundColor}">${props.leaveTypeLabel}</span>
            </div>
        </div>
    `;

    document.getElementById('leaveModal').classList.remove('hidden');
}

// Fonction pour fermer le modal
function closeModal() {
    document.getElementById('leaveModal').classList.add('hidden');
}

// Attacher les événements de fermeture du modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('leaveModal');
    const closeButton = document.getElementById('closeModal');
    
    // Fermer avec le bouton X
    closeButton.addEventListener('click', closeModal);
    
    // Fermer en cliquant sur le backdrop (à l'extérieur du modal)
    modal.addEventListener('click', function(e) {
        // Vérifier si le clic est directement sur le backdrop (pas sur le contenu)
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fermer avec la touche Echap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});
function closeModal() {
    document.getElementById('leaveModal').classList.add('hidden');
}

function setupEventListeners() {
    // Filtres calendrier
    document.getElementById('departmentCalendarFilter').addEventListener('change', filterCalendar);
    document.getElementById('employeeCalendarFilter').addEventListener('change', filterCalendar);
    document.getElementById('leaveTypeCalendarFilter').addEventListener('change', filterCalendar);

    // Boutons de vue
    document.getElementById('monthViewBtn').addEventListener('click', () => {
        calendar.changeView('dayGridMonth');
        updateViewButtons('month');
    });
    document.getElementById('weekViewBtn').addEventListener('click', () => {
        calendar.changeView('timeGridWeek');
        updateViewButtons('week');
    });

    // Modal
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('leaveModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });

    // Fermeture du modal avec la touche ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !document.getElementById('leaveModal').classList.contains('hidden')) {
            closeModal();
        }
    });
}

function updateCalendarTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const calendarEl = document.getElementById('calendar');

    if (isDark) {
        calendarEl.classList.add('fc-theme-dark');
        calendarEl.classList.remove('fc-theme-standard');
    } else {
        calendarEl.classList.remove('fc-theme-dark');
        calendarEl.classList.add('fc-theme-standard');
    }

    currentTheme = isDark ? 'dark' : 'light';
}

// =============================================
// INITIALISATION DU CALENDRIER
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'fr',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        },
        buttonText: {
            today: 'Aujourd\'hui',
            month: 'Mois',
            week: 'Semaine'
        },
        events: leaveEvents,
        eventClick: function(info) {
            showLeaveModal(info.event);
        },
        eventDidMount: function(info) {
            info.el.setAttribute('title',
                `${info.event.extendedProps.employeeName}\n` +
                `${info.event.extendedProps.departmentLabel}\n` +
                `${info.event.extendedProps.leaveTypeLabel}\n` +
                `Du ${formatDate(info.event.start)} au ${formatDate(info.event.end)}\n` +
                `Solde restant: ${info.event.extendedProps.remainingLeave} jours`
            );
        },
        height: 'auto',
        dayMaxEvents: 3,
        moreLinkClick: 'popover',
        eventClassNames: function(arg) {
            return ['fc-event-interactive'];
        }
    });

    calendar.render();

    // Initialisation des filtres et écouteurs
    populateEmployeeFilter();
    setupEventListeners();

    // Gestion du thème sombre/clair
    updateCalendarTheme();

    // Observation des changements de thème
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === "class") {
                updateCalendarTheme();
            }
        });
    });

    observer.observe(document.documentElement, { attributes: true });
});


// =============================================
// VARIABLES GLOBALES POUR LE TABLEAU
// =============================================
let currentPage = 1;
const itemsPerPage = 10;
let filteredEmployees = [...employeesData];

// =============================================
// FONCTIONS POUR LE TABLEAU DES EMPLOYÉS
// =============================================

/**
 * Affiche le tableau des employés avec pagination
 */
function renderEmployeeTable() {
    const tbody = document.getElementById('employeeTableBody');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageEmployees = filteredEmployees.slice(startIndex, endIndex);

    tbody.innerHTML = pageEmployees.map(employee => `
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <img class="h-10 w-10 rounded-full object-cover" src="${employee.photo}" alt="Profile">
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">${employee.name}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">${employee.email}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full ${getDepartmentColor(employee.department)}">
                    ${employee.departmentLabel}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full ${getPositionColor(employee.position)}">
                    ${employee.positionLabel}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">${employee.remainingLeave} jours</div>
                    <div class="ml-2 w-16 bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                        <div class="${getLeaveProgressColor(employee.remainingLeave)} h-2 rounded-full"
                             style="width: ${Math.min(employee.remainingLeave / 30 * 100, 100)}%"></div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}">
                    ${getStatusLabel(employee.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button title="Voir détails" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
              onclick="viewEmployee('${employee.id}')">
    <i class="fas fa-eye"></i>
</button>

<!-- Bouton Bloquer -->
<button title="Bloquer" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 mr-3">
    <i class="fas fa-lock"></i>
</button>

<!-- Bouton Supprimer -->
<button title="Supprimer" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
    <i class="fas fa-trash"></i>
</button>

            </td>
        </tr>
    `).join('');

    updatePagination();
}

/**
 * Met à jour les contrôles de pagination
 */
function updatePagination() {
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const startItem = filteredEmployees.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem = Math.min(currentPage * itemsPerPage, filteredEmployees.length);

    document.getElementById('paginationInfo').textContent =
        `Affichage de ${startItem} à ${endItem} sur ${filteredEmployees.length} employés`;

    const controls = document.getElementById('paginationControls');
    
    if (totalPages === 0) {
        controls.innerHTML = '';
        return;
    }

    controls.innerHTML = `
        <button onclick="changePage(${currentPage - 1})"
                ${currentPage === 1 ? 'disabled' : ''}
                class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300
                       dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600
                       ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}">
            Précédent
        </button>
        ${Array.from({length: totalPages}, (_, i) => i + 1).map(page => `
            <button onclick="changePage(${page})"
                    class="px-3 py-1 text-sm rounded
                           ${page === currentPage ?
                               'bg-blue-500 text-white' :
                               'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}">
                ${page}
            </button>
        `).join('')}
        <button onclick="changePage(${currentPage + 1})"
                ${currentPage === totalPages ? 'disabled' : ''}
                class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300
                       dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600
                       ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}">
            Suivant
        </button>
    `;
}

/**
 * Change de page
 * @param {number} page - Numéro de la page
 */
function changePage(page) {
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderEmployeeTable();
    }
}

/**
 * Filtre les employés en fonction de la recherche, du département et du poste
 */
function filterEmployees() {
    const searchTerm = document.getElementById('searchEmployee').value.toLowerCase();
    const departmentFilter = document.getElementById('departmentFilter').value;
    const positionFilter = document.getElementById('positionFilter').value;

    filteredEmployees = employeesData.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm) ||
                             emp.email.toLowerCase().includes(searchTerm);
        const matchesDepartment = !departmentFilter || emp.department === departmentFilter;
        const matchesPosition = !positionFilter || emp.position === positionFilter;
        return matchesSearch && matchesDepartment && matchesPosition;
    });

    currentPage = 1;
    renderEmployeeTable();
}

/**
 * Affiche les détails d'un employé dans un modal
 * @param {string} employeeId - ID de l'employé
 */
function viewEmployee(employeeId) {
    const employee = employeesData.find(emp => emp.id === employeeId);
    if (!employee) return;

    // Met à jour le titre du modal
    document.getElementById('employeeModalTitle').textContent = `Détails de ${employee.name}`;

    // Met à jour le contenu du modal
    const modalContent = document.getElementById('employeeModalContent');
    modalContent.innerHTML = `
        <div class="flex flex-col items-center md:items-start">
            <img src="${employee.photo}" alt="${employee.name}"
                 class="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-500">
            <div class="text-center md:text-left">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">${employee.name}</h4>
                <p class="text-gray-600 dark:text-gray-400">${employee.positionLabel}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">${employee.departmentLabel}</p>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h5 class="font-medium text-gray-900 dark:text-white mb-2">Informations personnelles</h5>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Email:</span>
                        <span class="font-medium text-gray-900 dark:text-white">${employee.email}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Département:</span>
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${getDepartmentColor(employee.department)}">${employee.departmentLabel}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Poste:</span>
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${getPositionColor(employee.position)}">${employee.positionLabel}</span>
                    </div>
                </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h5 class="font-medium text-gray-900 dark:text-white mb-2">Congés</h5>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Solde restant:</span>
                        <span class="font-medium text-gray-900 dark:text-white">${employee.remainingLeave} jours</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Statut:</span>
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}">
                            ${getStatusLabel(employee.status)}
                        </span>
                    </div>
                </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h5 class="font-medium text-gray-900 dark:text-white mb-2">Historique des congés</h5>
                <div class="space-y-3">
                    ${getEmployeeLeaveHistory(employee.id)}
                </div>
            </div>
        </div>
    `;

    // Affiche le modal
    document.getElementById('employeeModal').classList.remove('hidden');
}

/**
 * Génère l'historique des congés pour un employé
 * @param {string} employeeId - ID de l'employé
 * @returns {string} HTML de l'historique
 */
function getEmployeeLeaveHistory(employeeId) {
    const employeeLeaves = leaveEvents.filter(event => event.extendedProps.employeeId === employeeId);

    if (employeeLeaves.length === 0) {
        return '<p class="text-sm text-gray-500 dark:text-gray-400">Aucun congé enregistré.</p>';
    }

    return employeeLeaves.map(leave => `
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-start">
                <div>
                    <h6 class="font-medium text-gray-900 dark:text-white">${leave.extendedProps.leaveTypeLabel}</h6>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        ${formatDate(leave.start)} → ${formatDate(leave.end)}
                    </p>
                </div>
                <span class="px-2 py-1 text-xs rounded-full text-white"
                      style="background-color: ${leave.backgroundColor}">
                    ${calculateDuration(leave.start, leave.end)} jours
                </span>
            </div>
        </div>
    `).join('');
}

/**
 * Ferme le modal des détails de l'employé
 */
function closeEmployeeModal() {
    document.getElementById('employeeModal').classList.add('hidden');
}

// =============================================
// INITIALISATION DU TABLEAU
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialise le tableau des employés
    renderEmployeeTable();

    // Configure les écouteurs d'événements pour les filtres
    document.getElementById('searchEmployee').addEventListener('input', filterEmployees);
    document.getElementById('departmentFilter').addEventListener('change', filterEmployees);
    document.getElementById('positionFilter').addEventListener('change', filterEmployees);
    document.getElementById('closeEmployeeModal').addEventListener('click', closeEmployeeModal);

    // Ferme le modal si on clique à l'extérieur
    document.getElementById('employeeModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeEmployeeModal();
    });

    // Ferme le modal avec la touche ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !document.getElementById('employeeModal').classList.contains('hidden')) {
            closeEmployeeModal();
        }
    });
});