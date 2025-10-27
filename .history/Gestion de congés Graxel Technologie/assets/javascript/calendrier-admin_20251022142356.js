 const employeesData = [
            {
                id: 'jean-dupont',
                name: 'Jean Dupont',
                email: 'j.dupont@email.com',
                department: 'informatique',
                departmentLabel: 'Informatique',
                position: 'developer',
                positionLabel: 'Développeur',
                contact: '+241 07 12 34 56',
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
                contact: '+241 06 23 45 67',
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
                contact: '+241 05 34 56 78',
                status: 'available',
                photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
            },
            {
                id: 'marie-martin',
                name: 'Marie Martin',
                email: 'm.martin@email.com',
                department: 'rh',
                departmentLabel: 'Ressources Humaines',
                position: 'hr',
                positionLabel: 'RH',
                contact: '+241 07 45 67 89',
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
                contact: '+241 06 56 78 90',
                status: 'available',
                photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
            },
            {
                id: 'marc-petit',
                name: 'Marc Petit',
                email: 'm.petit@email.com',
                department: 'commercial',
                departmentLabel: 'Commercial',
                position: 'sales',
                positionLabel: 'Commercial',
                contact: '+241 05 67 89 01',
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
                contact: '+241 07 78 90 12',
                status: 'available',
                photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face'
            },
            {
                id: 'thomas-blanc',
                name: 'Thomas Blanc',
                email: 't.blanc@email.com',
                department: 'finance',
                departmentLabel: 'Finance',
                position: 'accountant',
                positionLabel: 'Comptable',
                contact: '+241 06 89 01 23',
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
                contact: '+241 05 90 12 34',
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
                positionLabel: 'Comptable',
                contact: '+241 07 01 23 45',
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
                    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
                }
            },
            {
                id: '3',
                title: 'Paul Bernard - Paternité',
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
                    leaveTypeLabel: 'Paternité',
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
                    leaveTypeLabel: 'Maternité',
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
                    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face'
                }
            },
            {
                id: '7',
                title: 'Thomas Blanc - Paternité',
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
                    leaveTypeLabel: 'Paternité',
                    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face'
                }
            }
        ];

        // =============================================
        // VARIABLES GLOBALES
        // =============================================
        let currentViewMode = 'grid';
        let currentLeavePage = 1;
        const leavesPerPage = 10;
        let filteredLeaves = [...leaveEvents];

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

        function getDepartmentColor(department) {
            const colors = {
                informatique: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                rh: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
                commercial: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
                finance: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            };
            return colors[department] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }

        // =============================================
        // FONCTIONS POUR LA LISTE DES CONGÉS
        // =============================================
        function populateEmployeeFilter() {
            const filter = document.getElementById('employeeCalendarFilter');
            filter.innerHTML = '<option value="">Tous les employés</option>' +
                employeesData.map(emp => `<option value="${emp.id}">${emp.name} - ${emp.departmentLabel}</option>`).join('');
        }

        function filterLeaveList() {
            const departmentFilter = document.getElementById('departmentCalendarFilter').value;
            const employeeFilter = document.getElementById('employeeCalendarFilter').value;
            const leaveTypeFilter = document.getElementById('leaveTypeCalendarFilter').value;

            filteredLeaves = leaveEvents.filter(event => {
                const matchesDepartment = !departmentFilter || event.extendedProps.department === departmentFilter;
                const matchesEmployee = !employeeFilter || event.extendedProps.employeeId === employeeFilter;
                const matchesType = !leaveTypeFilter || event.extendedProps.leaveType === leaveTypeFilter;
                return matchesDepartment && matchesEmployee && matchesType;
            });

            currentLeavePage = 1;
            renderLeaveView();
        }

        function renderLeaveView() {
            if (currentViewMode === 'grid') {
                renderLeaveGrid();
            } else {
                renderLeaveList();
            }
        }

        function renderLeaveGrid() {
            const container = document.getElementById('leaveViewContainer');
            const startIndex = (currentLeavePage - 1) * leavesPerPage;
            const endIndex = startIndex + leavesPerPage;
            const pageLeaves = filteredLeaves.slice(startIndex, endIndex);

            container.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${pageLeaves.map(leave => `
                        <div class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4"
                             style="border-left-color: ${leave.backgroundColor}"
                             onclick='showLeaveModal(${JSON.stringify(leave).replace(/'/g, "&apos;")})'>
                            <div class="flex items-center space-x-3 mb-3">
                                <img src="${leave.extendedProps.photo}" alt="${leave.extendedProps.employeeName}"
                                     class="w-12 h-12 rounded-full object-cover">
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-900 dark:text-white">${leave.extendedProps.employeeName}</h4>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">${leave.extendedProps.departmentLabel}</p>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">Type:</span>
                                    <span class="px-2 py-1 text-xs rounded-full text-white" style="background-color: ${leave.backgroundColor}">
                                        ${leave.extendedProps.leaveTypeLabel}
                                    </span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">Période:</span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                                        ${formatDate(leave.start)} - ${formatDate(leave.end)}
                                    </span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">Durée:</span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                                        ${calculateDuration(leave.start, leave.end)} jour(s)
                                    </span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            updateLeavePagination();
        }

        function renderLeaveList() {
            const container = document.getElementById('leaveViewContainer');
            const startIndex = (currentLeavePage - 1) * leavesPerPage;
            const endIndex = startIndex + leavesPerPage;
            const pageLeaves = filteredLeaves.slice(startIndex, endIndex);

            container.innerHTML = `
                <div class="space-y-3">
                    ${pageLeaves.map(leave => `
                        <div class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 flex items-center justify-between"
                             style="border-left-color: ${leave.backgroundColor}"
                             onclick='showLeaveModal(${JSON.stringify(leave).replace(/'/g, "&apos;")})'>
                            <div class="flex items-center space-x-4 flex-1">
                                <img src="${leave.extendedProps.photo}" alt="${leave.extendedProps.employeeName}"
                                     class="w-12 h-12 rounded-full object-cover">
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-900 dark:text-white">${leave.extendedProps.employeeName}</h4>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">${leave.extendedProps.departmentLabel}</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-6">
                                <div class="text-center">
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Type</p>
                                    <span class="px-2 py-1 text-xs rounded-full text-white" style="background-color: ${leave.backgroundColor}">
                                        ${leave.extendedProps.leaveTypeLabel}
                                    </span>
                                </div>
                                <div class="text-center">
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Du</p>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">${formatDate(leave.start)}</p>
                                </div>
                                <div class="text-center">
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Au</p>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">${formatDate(leave.end)}</p>
                                </div>
                                <div class="text-center">
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Durée</p>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">${calculateDuration(leave.start, leave.end)} j</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            updateLeavePagination();
        }

        function updateLeavePagination() {
            const totalPages = Math.ceil(filteredLeaves.length / leavesPerPage);
            const startItem = filteredLeaves.length > 0 ? (currentLeavePage - 1) * leavesPerPage + 1 : 0;
            const endItem = Math.min(currentLeavePage * leavesPerPage, filteredLeaves.length);

            document.getElementById('leavePaginationInfo').textContent =
                `Affichage de ${startItem} à ${endItem} sur ${filteredLeaves.length} congés`;

            const controls = document.getElementById('leavePaginationControls');
            
            if (totalPages === 0) {
                controls.innerHTML = '';
                return;
            }

            controls.innerHTML = `
                <button onclick="changeLeavePage(${currentLeavePage - 1})"
                        ${currentLeavePage === 1 ? 'disabled' : ''}
                        class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300
                               dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600
                               ${currentLeavePage === 1 ? 'opacity-50 cursor-not-allowed' : ''}">
                    Précédent
                </button>
                ${Array.from({length: totalPages}, (_, i) => i + 1).map(page => `
                    <button onclick="changeLeavePage(${page})"
                            class="px-3 py-1 text-sm rounded
                                   ${page === currentLeavePage ?
                                       'bg-blue-500 text-white' :
                                       'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}">
                        ${page}
                    </button>
                `).join('')}
                <button onclick="changeLeavePage(${currentLeavePage + 1})"
                        ${currentLeavePage === totalPages ? 'disabled' : ''}
                        class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300
                               dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600
                               ${currentLeavePage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}">
                    Suivant
                </button>
            `;
        }

        function changeLeavePage(page) {
            const totalPages = Math.ceil(filteredLeaves.length / leavesPerPage);
            if (page >= 1 && page <= totalPages) {
                currentLeavePage = page;
                renderLeaveView();
            }
        }

        function switchViewMode(mode) {
            currentViewMode = mode;
            
            const gridBtn = document.getElementById('gridViewBtn');
            const listBtn = document.getElementById('listViewBtn');
            
            if (mode === 'grid') {
                gridBtn.className = 'px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium';
                listBtn.className = 'px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-sm font-medium';
            } else {
                listBtn.className = 'px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium';
                gridBtn.className = 'px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-sm font-medium';
            }
            
            renderLeaveView();
        }

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
                        <span class="text-gray-600 dark:text-gray-400">Type de congé:</span>
                        <span class="px-2 py-1 text-xs rounded-full text-white" style="background-color: ${event.backgroundColor}">${props.leaveTypeLabel}</span>
                    </div>
                </div>
            `;

            document.getElementById('leaveModal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('leaveModal').classList.add('hidden');
        }

        function setupLeaveEventListeners() {
            document.getElementById('departmentCalendarFilter').addEventListener('change', filterLeaveList);
            document.getElementById('employeeCalendarFilter').addEventListener('change', filterLeaveList);
            document.getElementById('leaveTypeCalendarFilter').addEventListener('change', filterLeaveList);

            document.getElementById('gridViewBtn').addEventListener('click', () => switchViewMode('grid'));
            document.getElementById('listViewBtn').addEventListener('click', () => switchViewMode('list'));

            document.getElementById('closeModal').addEventListener('click', closeModal);
            document.getElementById('leaveModal').addEventListener('click', (e) => {
                if (e.target === e.currentTarget) closeModal();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !document.getElementById('leaveModal').classList.contains('hidden')) {
                    closeModal();
                }
            });
        }

        // =============================================
        // INITIALISATION
        // =============================================
        document.addEventListener('DOMContentLoaded', function() {
            populateEmployeeFilter();
            setupLeaveEventListeners();
            renderLeaveView();
        });