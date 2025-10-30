// =============================================
// DONNÉES SIMULÉES
// =============================================
const employeesData = [
    {
        id: 'jean-dupont',
        name: 'Jean Dupont',
        email: 'j.dupont@email.com',
        phone: '+241 07 45 23 12',
        position: 'developer',
        positionLabel: 'Développeur',
        remainingLeave: 25,
        status: 'available',
        blocked: false,
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 'marie-martin',
        name: 'Marie Martin',
        email: 'm.martin@email.com',
        phone: '+241 06 78 91 45',
        position: 'designer',
        positionLabel: 'Designer',
        remainingLeave: 18,
        status: 'on-leave',
        blocked: false,
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 'paul-bernard',
        name: 'Paul Bernard',
        email: 'p.bernard@email.com',
        phone: '+241 05 23 67 89',
        position: 'manager',
        positionLabel: 'Manager',
        remainingLeave: 30,
        status: 'available',
        blocked: true,
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 'sophie-durand',
        name: 'Sophie Durand',
        email: 's.durand@email.com',
        phone: '+241 07 12 34 56',
        position: 'developer',
        positionLabel: 'Développeur',
        remainingLeave: 22,
        status: 'available',
        blocked: false,
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 'marc-petit',
        name: 'Marc Petit',
        email: 'm.petit@email.com',
        phone: '+241 06 89 45 23',
        position: 'designer',
        positionLabel: 'Designer',
        remainingLeave: 15,
        status: 'on-leave',
        blocked: false,
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
    },
    {
        id: 'claire-moreau',
        name: 'Claire Moreau',
        email: 'c.moreau@email.com',
        phone: '+241 05 67 89 12',
        position: 'manager',
        positionLabel: 'Manager',
        remainingLeave: 28,
        status: 'available',
        blocked: false,
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
    }
];

// Données des demandes avec statuts
const requestsData = [
    {
        id: 1,
        employeeName: "Jean Martin",
        leaveType: "Congés payés",
        startDate: "2025-10-15",
        endDate: "2025-10-20",
        duration: 5,
        status: "pending",
        submittedTime: "il y a 2h",
        reason: "Congés pour vacances en famille. Voyage prévu depuis plusieurs mois.",
        avatar: "from-blue-500 to-purple-500",
        pdfName: "justificatif_conges.pdf",
        remainingBalance: 20
    },
    {
        id: 2,
        employeeName: "Sophie Dubois",
        leaveType: "Congé maladie",
        startDate: "2025-10-16",
        endDate: "2025-10-18",
        duration: 3,
        status: "pending",
        submittedTime: "il y a 1h",
        reason: "Arrêt maladie suite à une grippe. Certificat médical fourni.",
        avatar: "from-green-500 to-teal-500",
        pdfName: "certificat_medical.pdf",
        remainingBalance: 15
    },
    {
        id: 3,
        employeeName: "Marie Dupont",
        leaveType: "Congé maternité",
        startDate: "2025-10-01",
        endDate: "2026-01-15",
        duration: 106,
        status: "approved",
        submittedTime: "il y a 3h",
        reason: "Congé maternité pour la naissance de mon second enfant.",
        avatar: "from-pink-500 to-rose-500",
        pdfName: "certificat_grossesse.pdf",
        remainingBalance: 0
    },
    {
        id: 4,
        employeeName: "Pierre Leroux",
        leaveType: "Paternité",
        startDate: "2025-10-22",
        endDate: "2025-10-22",
        duration: 1,
        status: "rejected",
        submittedTime: "il y a 4h",
        reason: "Congé paternité suite à la naissance.",
        avatar: "from-indigo-500 to-purple-500",
        pdfName: "justificatif_paternite.pdf",
        remainingBalance: 29
    },
    {
        id: 5,
        employeeName: "Antoine Moreau",
        leaveType: "Congé sans solde",
        startDate: "2025-10-05",
        endDate: "2025-11-05",
        duration: 31,
        status: "pending",
        submittedTime: "il y a 6h",
        reason: "Projet personnel nécessitant une absence prolongée.",
        avatar: "from-orange-500 to-red-500",
        pdfName: "demande_conge_sans_solde.pdf",
        remainingBalance: 0
    },
    {
        id: 6,
        employeeName: "Lucie Bernard",
        leaveType: "Formation",
        startDate: "2025-10-25",
        endDate: "2025-10-27",
        duration: 3,
        status: "approved",
        submittedTime: "il y a 1 jour",
        reason: "Formation professionnelle en management d'équipe.",
        avatar: "from-cyan-500 to-blue-500",
        pdfName: "programme_formation.pdf",
        remainingBalance: 25
    }
];

// =============================================
// VARIABLES GLOBALES
// =============================================
let currentFilter = 'profile';
let currentEmployeeFilter = '';
let selectedRequests = new Set();
let currentRequestId = 0;
let currentAction = '';
let bulkAction = '';
let currentViewModeApproved = 'grid';
let currentViewModeRejected = 'grid';
let currentLeavesPage = 1;
const leavesPerPage = 10;

// =============================================
// SYSTÈME DE TOAST NOTIFICATIONS
// =============================================
function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
        document.body.appendChild(toastContainer);
    }

    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    const toastId = 'toast-' + Date.now();
    toast.id = toastId;
    toast.className = `${colors[type] || colors.success} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 min-w-[320px] transform transition-all duration-300 ease-in-out translate-x-[400px]`;
    
    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.success} text-xl"></i>
        <span class="flex-1 font-medium">${message}</span>
        <button onclick="closeToast('${toastId}')" class="text-white hover:text-gray-200 transition-colors">
            <i class="fas fa-times"></i>
        </button>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);

    setTimeout(() => {
        closeToast(toastId);
    }, 4000);
}

function closeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.style.transform = 'translateX(400px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }
}

// =============================================
// GESTION DES FILTRES ET TABS
// =============================================
function setupTabButtons() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            switchTab(tab);
        });
    });
}

function switchTab(tab) {
    currentFilter = tab;
    
    // Mettre à jour les boutons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        if (button.getAttribute('data-tab') === tab) {
            button.className = 'tab-button active bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg px-6 py-3 font-medium rounded-xl transition-all duration-300 hover-lift click-scale';
        } else {
            button.className = 'tab-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 font-medium rounded-xl transition-all duration-300 hover-lift click-scale';
        }
    });
    
    // Gérer l'affichage des sections
    const pendingSection = document.getElementById('pendingSection');
    const approvedSection = document.getElementById('approvedSection');
    const rejectedSection = document.getElementById('rejectedSection');
    
    if (tab === 'profile') {
        // Afficher toutes les sections
        if (pendingSection) pendingSection.style.display = 'block';
        if (approvedSection) approvedSection.style.display = 'block';
        if (rejectedSection) rejectedSection.style.display = 'block';
        
        renderPendingRequests();
        renderApprovedLeaves();
        renderRejectedLeaves();
    } else if (tab === 'en-attente') {
        // Afficher uniquement les demandes en attente
        if (pendingSection) pendingSection.style.display = 'block';
        if (approvedSection) approvedSection.style.display = 'none';
        if (rejectedSection) rejectedSection.style.display = 'none';
        
        renderPendingRequests();
    } else if (tab === 'approuvees') {
        // Afficher uniquement les congés approuvés
        if (pendingSection) pendingSection.style.display = 'none';
        if (approvedSection) approvedSection.style.display = 'block';
        if (rejectedSection) rejectedSection.style.display = 'none';
        
        renderApprovedLeaves();
    } else if (tab === 'refusees') {
        // Afficher uniquement les congés refusés
        if (pendingSection) pendingSection.style.display = 'none';
        if (approvedSection) approvedSection.style.display = 'none';
        if (rejectedSection) rejectedSection.style.display = 'block';
        
        renderRejectedLeaves();
    }
}

// =============================================
// RENDER PENDING REQUESTS (EN ATTENTE)
// =============================================
function renderPendingRequests() {
    const pendingRequests = requestsData.filter(req => req.status === 'pending');
    const container = document.getElementById('pendingRequestsContainer');
    
    if (!container) return;
    
    if (pendingRequests.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-calendar-check text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <p class="text-gray-500 dark:text-gray-400">Aucune demande en attente</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = pendingRequests.map(request => createPendingRequestCard(request)).join('');
    
    // Réinitialiser la sélection
    selectedRequests.clear();
    updateSelection();
}

function createPendingRequestCard(request) {
    const statusEmoji = request.status === 'pending' ? '🟡' : request.status === 'approved' ? '🟢' : '🔴';
    const statusClass = request.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : 
                        request.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
    const statusText = request.status === 'pending' ? 'En attente' : request.status === 'approved' ? 'Approuvée' : 'Refusée';
    
    const showActions = request.status === 'pending';
    
    return `
        <div class="demand-item w-full flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4" data-id="${request.id}">
            <div class="flex items-center space-x-4 w-full md:w-auto">
                ${showActions ? `<input type="checkbox" class="request-checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" onchange="updateSelection()">` : ''}
                <div class="w-12 h-12 bg-gradient-to-r ${request.avatar} rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user text-white"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center space-x-2">
                        <h4 class="font-semibold text-gray-900 dark:text-white truncate">${request.employeeName} - ${request.leaveType}</h4>
                        <span class="text-yellow-500">${statusEmoji}</span>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 truncate">${formatDate(request.startDate)} - ${formatDate(request.endDate)} (${request.duration} jours)</p>
                    <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Demande soumise ${request.submittedTime}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2 mt-4 md:mt-0">
                <span class="status-badge px-4 py-2 ${statusClass} text-xs font-semibold rounded-full">${statusText}</span>
                ${showActions ? `
                    <button class="approve-btn px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors" onclick="showConfirmModal('approve', ${request.id})">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="reject-btn px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors" onclick="showConfirmModal('reject', ${request.id})">
                        <i class="fas fa-times"></i>
                    </button>
                ` : ''}
                <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" onclick="showDetailsModal(${request.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
}

// =============================================
// RENDER APPROVED LEAVES
// =============================================
function renderApprovedLeaves() {
    const approvedRequests = requestsData.filter(req => req.status === 'approved');
    const container = document.getElementById('approvedLeavesContainer');
    
    if (!container) return;
    
    if (approvedRequests.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-calendar-times text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <p class="text-gray-500 dark:text-gray-400">Aucun congé approuvé</p>
            </div>
            
        `;
        return;
    }
    
    if (currentViewModeApproved === 'grid') {
        container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
        container.innerHTML = approvedRequests.map(leave => createApprovedLeaveCardGrid(leave)).join('');
    } else {
        container.className = 'space-y-4';
        container.innerHTML = approvedRequests.map(leave => createApprovedLeaveCardList(leave)).join('');
    }
    
    // Ajouter les écouteurs d'événements
    approvedRequests.forEach(leave => {
        const card = document.getElementById(`leave-approved-${leave.id}`);
        if (card) {
            card.addEventListener('click', () => showLeaveDetailsModal(leave));
        }
    });
}

function createApprovedLeaveCardGrid(leave) {
    return `
        <div id="leave-approved-${leave.id}" class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-green-500">
            <div class="p-4">
                <div class="flex items-center space-x-3 mb-3">
                    <div class="w-12 h-12 bg-gradient-to-r ${leave.avatar} rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-semibold text-gray-900 dark:text-white truncate">${leave.employeeName}</h4>
                        <span class="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                            ${leave.leaveType}
                        </span>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i class="fas fa-calendar-day w-5"></i>
                        <span>${formatDate(leave.startDate)}</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i class="fas fa-calendar-check w-5"></i>
                        <span>${formatDate(leave.endDate)}</span>
                    </div>
                    <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span class="text-sm font-medium text-gray-900 dark:text-white">
                            <i class="fas fa-clock"></i> ${leave.duration} jour(s)
                        </span>
                        <span class="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                            Approuvé
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createApprovedLeaveCardList(leave) {
    return `
        <div id="leave-approved-${leave.id}" class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-green-500">
            <div class="p-4">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div class="flex items-center space-x-4">
                        <div class="w-14 h-14 bg-gradient-to-r ${leave.avatar} rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-white text-xl"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900 dark:text-white">${leave.employeeName}</h4>
                            <span class="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                ${leave.leaveType}
                            </span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-6 text-sm">
                        <div class="text-center">
                            <div class="text-gray-500 dark:text-gray-400 text-xs">Début</div>
                            <div class="font-medium text-gray-900 dark:text-white">${formatDate(leave.startDate)}</div>
                        </div>
                        <div class="text-gray-400 dark:text-gray-600">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                        <div class="text-center">
                            <div class="text-gray-500 dark:text-gray-400 text-xs">Fin</div>
                            <div class="font-medium text-gray-900 dark:text-white">${formatDate(leave.endDate)}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-gray-500 dark:text-gray-400 text-xs">Durée</div>
                            <div class="font-medium text-gray-900 dark:text-white">${leave.duration} jour(s)</div>
                        </div>
                        <div class="text-center">
                            <span class="px-3 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                Approuvé
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// =============================================
// RENDER REJECTED LEAVES
// =============================================
function renderRejectedLeaves() {
    const rejectedRequests = requestsData.filter(req => req.status === 'rejected');
    const container = document.getElementById('rejectedLeavesContainer');
    
    if (!container) return;
    
    if (rejectedRequests.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-calendar-times text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <p class="text-gray-500 dark:text-gray-400">Aucun congé refusé</p>
            </div>
        `;
        return;
    }
    
    if (currentViewModeRejected === 'grid') {
        container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
        container.innerHTML = rejectedRequests.map(leave => createRejectedLeaveCardGrid(leave)).join('');
    } else {
        container.className = 'space-y-4';
        container.innerHTML = rejectedRequests.map(leave => createRejectedLeaveCardList(leave)).join('');
    }
    
    // Ajouter les écouteurs d'événements
    rejectedRequests.forEach(leave => {
        const card = document.getElementById(`leave-rejected-${leave.id}`);
        if (card) {
            card.addEventListener('click', () => showLeaveDetailsModal(leave));
        }
    });
}

function createRejectedLeaveCardGrid(leave) {
    return `
        <div id="leave-rejected-${leave.id}" class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-red-500">
            <div class="p-4">
                <div class="flex items-center space-x-3 mb-3">
                    <div class="w-12 h-12 bg-gradient-to-r ${leave.avatar} rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-semibold text-gray-900 dark:text-white truncate">${leave.employeeName}</h4>
                        <span class="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                            ${leave.leaveType}
                        </span>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i class="fas fa-calendar-day w-5"></i>
                        <span>${formatDate(leave.startDate)}</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i class="fas fa-calendar-check w-5"></i>
                        <span>${formatDate(leave.endDate)}</span>
                    </div>
                    <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span class="text-sm font-medium text-gray-900 dark:text-white">
                            <i class="fas fa-clock"></i> ${leave.duration} jour(s)
                        </span>
                        <span class="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                            Refusé
                        </span>
                        
                    </div>
                       <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <button class="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-blue-800 dark:text-blue-300">
                          <i class="fas fa-sync-alt"></i>
valider la demande
                        </button>
                               
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createRejectedLeaveCardList(leave) {
    return `
        <div id="leave-rejected-${leave.id}" class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-red-500">
            <div class="p-4">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div class="flex items-center space-x-4">
                        <div class="w-14 h-14 bg-gradient-to-r ${leave.avatar} rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-white text-xl"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900 dark:text-white">${leave.employeeName}</h4>
                            <span class="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                                ${leave.leaveType}
                            </span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-6 text-sm">
                        <div class="text-center">
                            <div class="text-gray-500 dark:text-gray-400 text-xs">Début</div>
                            <div class="font-medium text-gray-900 dark:text-white">${formatDate(leave.startDate)}</div>
                        </div>
                        <div class="text-gray-400 dark:text-gray-600">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                        <div class="text-center">
                            <div class="text-gray-500 dark:text-gray-400 text-xs">Fin</div>
                            <div class="font-medium text-gray-900 dark:text-white">${formatDate(leave.endDate)}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-gray-500 dark:text-gray-400 text-xs">Durée</div>
                            <div class="font-medium text-gray-900 dark:text-white">${leave.duration} jour(s)</div>
                        </div>
                        <div class="text-center<span class="px-3 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                                Refusé
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// =============================================
// MODAL DÉTAILS POUR CONGÉS APPROUVÉS/REFUSÉS
// =============================================
function showLeaveDetailsModal(leave) {
    // Utiliser le nouveau modal avec le design sombre
    const modal = document.getElementById('leaveDetailsModal');
    
    if (!modal) {
        console.error('Modal leaveDetailsModal introuvable');
        return;
    }
    
    // Remplir les informations
    document.getElementById('leaveDetailsName').textContent = leave.employeeName;
    document.getElementById('leaveDetailsType').textContent = leave.leaveType;
    document.getElementById('leaveDetailsStartDate').textContent = formatDate(leave.startDate);
    document.getElementById('leaveDetailsEndDate').textContent = formatDate(leave.endDate);
    document.getElementById('leaveDetailsDuration').textContent = leave.duration + ' jour(s)';
    
    // Calculer le solde restant
    const balanceRemaining = leave.remainingBalance || Math.max(0, 30 - leave.duration);
    document.getElementById('leaveDetailsBalance').textContent = balanceRemaining + ' jours';
    
    // Avatar
    const avatarDiv = document.getElementById('leaveDetailsAvatar');
    avatarDiv.className = `w-16 h-16 bg-gradient-to-r ${leave.avatar} rounded-full flex items-center justify-center flex-shrink-0`;
    
    // Type de congé avec badge coloré
    const typeBadge = document.getElementById('leaveDetailsTypeBadge');
    let badgeColor = 'bg-blue-500';
    
    if (leave.leaveType.toLowerCase().includes('maladie')) {
        badgeColor = 'bg-red-500';
    } else if (leave.leaveType.toLowerCase().includes('maternité')) {
        badgeColor = 'bg-pink-500';
    } else if (leave.leaveType.toLowerCase().includes('paternité')) {
        badgeColor = 'bg-blue-500';
    } else if (leave.leaveType.toLowerCase().includes('formation')) {
        badgeColor = 'bg-purple-500';
    } else if (leave.leaveType.toLowerCase().includes('payés')) {
        badgeColor = 'bg-green-500';
    } else {
        badgeColor = 'bg-yellow-500';
    }
    
    typeBadge.className = `px-3 py-1 text-xs font-semibold rounded-full ${badgeColor} text-white`;
    typeBadge.textContent = leave.leaveType;
    
    // Motif
    document.getElementById('leaveDetailsReason').textContent = leave.reason;
    
    // Statut avec badge coloré
    const statusBadge = document.getElementById('leaveDetailsStatusBadge');
    if (leave.status === 'approved') {
        statusBadge.className = 'px-4 py-2 text-sm font-semibold rounded-lg bg-green-500 text-white';
        statusBadge.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Approuvé';
    } else if (leave.status === 'rejected') {
        statusBadge.className = 'px-4 py-2 text-sm font-semibold rounded-lg bg-red-500 text-white';
        statusBadge.innerHTML = '<i class="fas fa-times-circle mr-1"></i>Refusé';
    } else {
        statusBadge.className = 'px-4 py-2 text-sm font-semibold rounded-lg bg-yellow-500 text-white';
        statusBadge.innerHTML = '<i class="fas fa-clock mr-1"></i>En attente';
    }
    
    // Afficher le modal
    showModal('leaveDetailsModal');
}

// =============================================
// GESTION DES DEMANDES
// =============================================
function showConfirmModal(action, requestId) {
    currentAction = action;
    currentRequestId = requestId;
    const request = requestsData.find(r => r.id === requestId);
    
    if (!request) return;
    
    const isApprove = action === 'approve';
    const icon = document.getElementById('confirmIcon');
    const title = document.getElementById('confirmTitle');
    const message = document.getElementById('confirmMessage');
    const actionBtn = document.getElementById('confirmActionBtn');
    
    if (isApprove) {
        icon.className = 'w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center';
        icon.innerHTML = '<i class="fas fa-check text-green-500"></i>';
        title.textContent = 'Approuver la demande';
        message.textContent = 'Êtes-vous sûr de vouloir approuver cette demande de congés ?';
        actionBtn.className = 'flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors';
        actionBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Approuver';
    } else {
        icon.className = 'w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center';
        icon.innerHTML = '<i class="fas fa-times text-red-500"></i>';
        title.textContent = 'Refuser la demande';
        message.textContent = 'Êtes-vous sûr de vouloir refuser cette demande de congés ?';
        actionBtn.className = 'flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors';
        actionBtn.innerHTML = '<i class="fas fa-times mr-2"></i>Refuser';
    }
    
    document.getElementById('confirmDetails').textContent = `${request.employeeName} - ${request.leaveType}`;
    document.getElementById('confirmDates').textContent = `${formatDate(request.startDate)} - ${formatDate(request.endDate)} (${request.duration} jours)`;
    
    showModal('confirmModal');
}

function executeAction() {
    const request = requestsData.find(r => r.id === currentRequestId);
    const isApprove = currentAction === 'approve';
    
    if (!request) return;
    
    closeModal('confirmModal');
    
    setTimeout(() => {
        request.status = isApprove ? 'approved' : 'rejected';
        
        showToast(
            isApprove ? `Demande de ${request.employeeName} approuvée` : `Demande de ${request.employeeName} refusée`,
            isApprove ? 'success' : 'error'
        );
        
        // Rafraîchir toutes les vues
        renderPendingRequests();
        renderApprovedLeaves();
        renderRejectedLeaves();
    }, 500);
}

function showDetailsModal(requestId) {
    currentRequestId = requestId;
    const request = requestsData.find(r => r.id === requestId);
    
    if (!request) return;
    
    document.getElementById('detailsName').textContent = request.employeeName;
    document.getElementById('detailsType').textContent = request.leaveType;
    document.getElementById('detailsStartDate').textContent = formatDate(request.startDate);
    document.getElementById('detailsEndDate').textContent = formatDate(request.endDate);
    document.getElementById('detailsDuration').textContent = request.duration + ' jours';
    document.getElementById('detailsReason').textContent = request.reason;
    document.getElementById('pdfName').textContent = request.pdfName;
    document.getElementById('detailsAvatar').className = `w-16 h-16 bg-gradient-to-r ${request.avatar} rounded-xl flex items-center justify-center`;
    
    const statusElement = document.getElementById('detailsStatus');
    if (request.status === 'approved') {
        statusElement.textContent = 'Approuvée';
        statusElement.className = 'text-green-600 dark:text-green-400';
    } else if (request.status === 'rejected') {
        statusElement.textContent = 'Refusée';
        statusElement.className = 'text-red-600 dark:text-red-400';
    } else {
        statusElement.textContent = 'En attente';
        statusElement.className = 'text-yellow-600 dark:text-yellow-400';
    }
    
    showModal('detailsModal');
}

// =============================================
// SÉLECTION MULTIPLE
// =============================================
function toggleSelectAll() {
    const checkboxes = document.querySelectorAll('.request-checkbox');
    const visibleCheckboxes = Array.from(checkboxes).filter(cb => {
        const item = cb.closest('.demand-item');
        return item && item.style.display !== 'none';
    });
    
    const areAllSelected = visibleCheckboxes.every(cb => cb.checked);
    
    visibleCheckboxes.forEach(checkbox => {
        checkbox.checked = !areAllSelected;
    });
    
    updateSelection();
}

function updateSelection() {
    const checkboxes = document.querySelectorAll('.request-checkbox');
    const bulkActions = document.getElementById('bulkActions');
    const selectedCount = document.getElementById('selectedCount');
    const selectAllBtn = document.getElementById('selectAllBtn');
    
    selectedRequests.clear();
    let checkedCount = 0;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const demandItem = checkbox.closest('.demand-item');
            if (demandItem) {
                const requestId = parseInt(demandItem.getAttribute('data-id'));
                selectedRequests.add(requestId);
                checkedCount++;
            }
        }
    });
    
    if (checkedCount > 0) {
        bulkActions.classList.remove('hidden');
        bulkActions.classList.add('flex');
        selectedCount.classList.remove('hidden');
        selectedCount.textContent = `${checkedCount} sélectionnée${checkedCount > 1 ? 's' : ''}`;
        selectAllBtn.innerHTML = '<i class="fas fa-square mr-2"></i>Désélectionner tout';
    } else {
        bulkActions.classList.add('hidden');
        bulkActions.classList.remove('flex');
        selectedCount.classList.add('hidden');
        selectAllBtn.innerHTML = '<i class="fas fa-check-square mr-2"></i>Tout sélectionner';
    }
}

function bulkApprove() {
    if (selectedRequests.size === 0) return;
    bulkAction = 'approve';
    showBulkConfirmModal('approve', selectedRequests.size);
}

function bulkReject() {
    if (selectedRequests.size === 0) return;
    bulkAction = 'reject';
    showBulkConfirmModal('reject', selectedRequests.size);
}

function showBulkConfirmModal(action, count) {
    const isApprove = action === 'approve';
    const icon = document.getElementById('bulkConfirmIcon');
    const title = document.getElementById('bulkConfirmTitle');
    const message = document.getElementById('bulkConfirmMessage');
    const actionBtn = document.getElementById('bulkConfirmActionBtn');
    const countDisplay = document.getElementById('bulkConfirmCount');
    
    if (isApprove) {
        icon.className = 'w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center';
        icon.innerHTML = '<i class="fas fa-check text-green-500"></i>';
        title.textContent = 'Approuver les demandes';
        message.textContent = 'Êtes-vous sûr de vouloir approuver toutes les demandes sélectionnées ?';
        actionBtn.className = 'flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors';
        actionBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Approuver';
    } else {
        icon.className = 'w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center';
        icon.innerHTML = '<i class="fas fa-times text-red-500"></i>';
        title.textContent = 'Refuser les demandes';
        message.textContent = 'Êtes-vous sûr de vouloir refuser toutes les demandes sélectionnées ?';
        actionBtn.className = 'flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors';
        actionBtn.innerHTML = '<i class="fas fa-times mr-2"></i>Refuser';
    }
    
    countDisplay.textContent = `${count} demande${count > 1 ? 's' : ''} sélectionnée${count > 1 ? 's' : ''}`;
    showModal('bulkConfirmModal');
}

function executeBulkAction() {
    const isApprove = bulkAction === 'approve';
    const count = selectedRequests.size;
    
    closeModal('bulkConfirmModal');
    
    setTimeout(() => {
        selectedRequests.forEach(requestId => {
            const request = requestsData.find(r => r.id === requestId);
            if (request) {
                request.status = isApprove ? 'approved' : 'rejected';
            }
        });
        
        selectedRequests.clear();
        
        showToast(
            `${count} demande${count > 1 ? 's' : ''} ${isApprove ? 'approuvée' : 'refusée'}${count > 1 ? 's' : ''}`,
            isApprove ? 'success' : 'error'
        );
        
        // Rafraîchir toutes les vues
        renderPendingRequests();
        renderApprovedLeaves();
        renderRejectedLeaves();
    }, 500);
}

// =============================================
// GESTION DES MODALS
// =============================================
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.remove('hidden');
    
    setTimeout(() => {
        const backdrop = modal.querySelector('.backdrop');
        const modalContent = modal.querySelector('.modal');
        
        if (backdrop) backdrop.classList.add('show');
        if (modalContent) modalContent.classList.add('show');
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const backdrop = modal.querySelector('.backdrop');
    const modalContent = modal.querySelector('.modal');
    
    if (backdrop) backdrop.classList.remove('show');
    if (modalContent) modalContent.classList.remove('show');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Fermer les modals en cliquant à l'extérieur
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('backdrop')) {
        const modals = ['confirmModal', 'bulkConfirmModal', 'detailsModal', 'leaveModal', 'leaveDetailsModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal && !modal.classList.contains('hidden')) {
                closeModal(modalId);
            }
        });
    }
});

// Fermer les modals avec la touche Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = ['confirmModal', 'bulkConfirmModal', 'detailsModal', 'leaveModal', 'leaveDetailsModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal && !modal.classList.contains('hidden')) {
                closeModal(modalId);
            }
        });
    }
});

// =============================================
// GESTION DES VUES (LISTE/GRILLE)
// =============================================
function setupViewButtons() {
    // Boutons pour les congés approuvés
    const gridBtnApproved = document.getElementById('gridViewBtnApproved');
    const listBtnApproved = document.getElementById('listViewBtnApproved');
    
    if (gridBtnApproved) {
        gridBtnApproved.addEventListener('click', () => {
            currentViewModeApproved = 'grid';
            updateViewButtons('gridApproved');
            renderApprovedLeaves();
        });
    }
    
    if (listBtnApproved) {
        listBtnApproved.addEventListener('click', () => {
            currentViewModeApproved = 'list';
            updateViewButtons('listApproved');
            renderApprovedLeaves();
        });
    }
    
    // Boutons pour les congés refusés
    const gridBtnRejected = document.getElementById('gridViewBtnRejected');
    const listBtnRejected = document.getElementById('listViewBtnRejected');
    
    if (gridBtnRejected) {
        gridBtnRejected.addEventListener('click', () => {
            currentViewModeRejected = 'grid';
            updateViewButtons('gridRejected');
            renderRejectedLeaves();
        });
    }
    
    if (listBtnRejected) {
        listBtnRejected.addEventListener('click', () => {
            currentViewModeRejected = 'list';
            updateViewButtons('listRejected');
            renderRejectedLeaves();
        });
    }
}

function updateViewButtons(activeView) {
    const gridBtnApproved = document.getElementById('gridViewBtnApproved');
    const listBtnApproved = document.getElementById('listViewBtnApproved');
    const gridBtnRejected = document.getElementById('gridViewBtnRejected');
    const listBtnRejected = document.getElementById('listViewBtnRejected');
    
    const activeClass = 'px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium';
    const inactiveClass = 'px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-sm font-medium';
    
    if (activeView === 'gridApproved') {
        if (gridBtnApproved) gridBtnApproved.className = activeClass;
        if (listBtnApproved) listBtnApproved.className = inactiveClass;
    } else if (activeView === 'listApproved') {
        if (gridBtnApproved) gridBtnApproved.className = inactiveClass;
        if (listBtnApproved) listBtnApproved.className = activeClass;
    } else if (activeView === 'gridRejected') {
        if (gridBtnRejected) gridBtnRejected.className = activeClass;
        if (listBtnRejected) listBtnRejected.className = inactiveClass;
    } else if (activeView === 'listRejected') {
        if (gridBtnRejected) gridBtnRejected.className = inactiveClass;
        if (listBtnRejected) listBtnRejected.className = activeClass;
    }
}

// =============================================
// FONCTIONS UTILITAIRES
// =============================================
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function setupEmployeeFilter() {
    const filterSelect = document.getElementById('employeePendingFilter');
    if (!filterSelect) return;
    
    filterSelect.addEventListener('change', function() {
        currentEmployeeFilter = this.value;
        renderPendingRequests();
    });
}

// =============================================
// MODAL DE FERMETURE LEAVE
// =============================================
function setupLeaveModalClose() {
    // Modal leaveModal (ancien)
    const leaveModal = document.getElementById('leaveModal');
    const closeBtn = document.getElementById('closeModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeModal('leaveModal');
        });
    }
    
    if (leaveModal) {
        leaveModal.addEventListener('click', function(e) {
            if (e.target === leaveModal) {
                closeModal('leaveModal');
            }
        });
    }
    
    // Modal leaveDetailsModal (nouveau)
    const leaveDetailsModal = document.getElementById('leaveDetailsModal');
    if (leaveDetailsModal) {
        leaveDetailsModal.addEventListener('click', function(e) {
            if (e.target === leaveDetailsModal) {
                closeModal('leaveDetailsModal');
            }
        });
    }
}

// =============================================
// INITIALISATION DES GRAPHIQUES
// =============================================
function initCharts() {
    // Graphique évolution des demandes
    const ctxDemandes = document.getElementById('demandesChart');
    if (ctxDemandes) {
        new Chart(ctxDemandes.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep'],
                datasets: [{
                    label: 'Demandes',
                    data: [12, 19, 15, 25, 22, 18, 28, 24, 20],
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                        }
                    }
                }
            }
        });
    }

    // Graphique types de congés
    const ctxTypes = document.getElementById('typesChart');
    if (ctxTypes) {
        new Chart(ctxTypes.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Congés payés', 'RTT', 'Maladie', 'Formation', 'Autres'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        'rgb(59, 130, 246)',
                        'rgb(34, 197, 94)',
                        'rgb(239, 68, 68)',
                        'rgb(139, 92, 246)',
                        'rgb(236, 72, 153)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Graphique taux d'approbation
    const ctxApproval = document.getElementById('approvalChart');
    if (ctxApproval) {
        new Chart(ctxApproval.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep'],
                datasets: [{
                    label: 'Taux d\'approbation',
                    data: [85, 88, 82, 90, 87, 87],
                    backgroundColor: 'rgba(139, 92, 246, 0.8)',
                    borderColor: 'rgb(139, 92, 246)',
                    borderWidth: 1,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// =============================================
// GESTION DE LA DÉCONNEXION
// =============================================
function openLogoutModal() {
    const modal = document.getElementById('logoutConfirmModal');
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            const modalContent = modal.querySelector('.modal');
            if (modalContent) {
                modalContent.style.opacity = '1';
                modalContent.style.transform = 'scale(1)';
            }
        }, 10);
    }
}

function closeLogoutModal() {
    const modal = document.getElementById('logoutConfirmModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal');
        if (modalContent) {
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'scale(0.95)';
        }
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 200);
    }
}

function showLogoutToast() {
    const toast = document.getElementById('logoutToast');
    if (toast) {
        toast.classList.remove('translate-x-full');
        toast.classList.add('translate-x-0');
        
        setTimeout(() => {
            toast.classList.remove('translate-x-0');
            toast.classList.add('translate-x-full');
        }, 3000);
    }
}

function executeLogout() {
    closeLogoutModal();
    
    setTimeout(() => {
        showLogoutToast();
    }, 300);
    
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 2000);
}

function setupLogoutButton() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openLogoutModal();
        });
    }
}

// =============================================
// FONCTION POUR OUVRIR PDF (PLACEHOLDER)
// =============================================
function viewPDF() {
    showToast('Fonctionnalité d\'ouverture de PDF à implémenter', 'info');
}

// =============================================
// INITIALISATION PRINCIPALE
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation du Dashboard Chef...');
    
    // Animation d'entrée
    const elements = document.querySelectorAll('.animate-slide-up');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Initialiser tous les composants
    setupTabButtons();
    setupViewButtons();
    setupEmployeeFilter();
    setupLeaveModalClose();
    setupLogoutButton();
    
    // Initialiser les graphiques si Chart.js est disponible
    if (typeof Chart !== 'undefined') {
        initCharts();
    }
    
    // Initialiser le filtre par défaut (Tous) - ceci va afficher toutes les sections
    switchTab('profile');
    
    // Initialiser les styles du modal de déconnexion
    const logoutModal = document.getElementById('logoutConfirmModal');
    if (logoutModal) {
        const modalContent = logoutModal.querySelector('.modal');
        if (modalContent) {
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'scale(0.95)';
            modalContent.style.transition = 'all 0.2s ease-out';
        }
    }
    
    console.log('Dashboard Chef initialisé avec succès');
    console.log('Données chargées:', {
        total: requestsData.length,
        pending: requestsData.filter(r => r.status === 'pending').length,
        approved: requestsData.filter(r => r.status === 'approved').length,
        rejected: requestsData.filter(r => r.status === 'rejected').length
    });
});