// ============================================================================
// SAMPLE DATA
// ============================================================================

const sampleAssets = [
    {
        id: 1,
        name: 'Apple Inc.',
        type: 'stock',
        invested: 25000,
        current: 32500,
        percentage: 6.7,
        gain: 7500
    },
    {
        id: 2,
        name: 'Microsoft Corp',
        type: 'stock',
        invested: 35000,
        current: 42100,
        percentage: 8.6,
        gain: 7100
    },
    {
        id: 3,
        name: 'Gold ETF',
        type: 'commodity',
        invested: 50000,
        current: 58200,
        percentage: 11.9,
        gain: 8200
    },
    {
        id: 4,
        name: 'Oil & Gas Index',
        type: 'commodity',
        invested: 40000,
        current: 47300,
        percentage: 9.7,
        gain: 7300
    },
    {
        id: 5,
        name: 'US Treasury Bonds',
        type: 'bond',
        invested: 75000,
        current: 75000,
        percentage: 15.4,
        gain: 0
    },
    {
        id: 6,
        name: 'Tesla Inc.',
        type: 'stock',
        invested: 30000,
        current: 38500,
        percentage: 7.9,
        gain: 8500
    },
    {
        id: 7,
        name: 'Amazon.com',
        type: 'stock',
        invested: 28000,
        current: 35800,
        percentage: 7.3,
        gain: 7800
    },
    {
        id: 8,
        name: 'Tech Growth Fund',
        type: 'stock',
        invested: 32000,
        current: 40675,
        percentage: 8.3,
        gain: 8675
    },
    {
        id: 9,
        name: 'Silver Commodity',
        type: 'commodity',
        invested: 20000,
        current: 22450,
        percentage: 4.6,
        gain: 2450
    },
    {
        id: 10,
        name: 'Cash Reserve',
        type: 'cash',
        invested: 12425.5,
        current: 12425.5,
        percentage: 2.5,
        gain: 0
    }
];

const sampleTransactions = [
    {
        id: 1,
        date: '2024-03-04',
        type: 'deposit',
        asset: 'Cash',
        amount: 10000,
        status: 'completed'
    },
    {
        id: 2,
        date: '2024-03-03',
        type: 'buy',
        asset: 'Apple Inc.',
        amount: 5000,
        status: 'completed'
    },
    {
        id: 3,
        date: '2024-03-02',
        type: 'buy',
        asset: 'Microsoft Corp',
        amount: 8000,
        status: 'completed'
    },
    {
        id: 4,
        date: '2024-03-01',
        type: 'sell',
        asset: 'Tech Growth Fund',
        amount: 3000,
        status: 'completed'
    },
    {
        id: 5,
        date: '2024-02-28',
        type: 'withdrawal',
        asset: 'Cash',
        amount: 5000,
        status: 'completed'
    },
    {
        id: 6,
        date: '2024-02-27',
        type: 'buy',
        asset: 'Gold ETF',
        amount: 10000,
        status: 'completed'
    },
    {
        id: 7,
        date: '2024-02-26',
        type: 'deposit',
        asset: 'Cash',
        amount: 15000,
        status: 'completed'
    },
    {
        id: 8,
        date: '2024-02-25',
        type: 'buy',
        asset: 'Tesla Inc.',
        amount: 7500,
        status: 'completed'
    },
    {
        id: 9,
        date: '2024-02-24',
        type: 'sell',
        asset: 'Oil & Gas Index',
        amount: 4000,
        status: 'pending'
    },
    {
        id: 10,
        date: '2024-02-23',
        type: 'deposit',
        asset: 'Cash',
        amount: 20000,
        status: 'completed'
    },
    {
        id: 11,
        date: '2024-02-22',
        type: 'buy',
        asset: 'Amazon.com',
        amount: 6000,
        status: 'completed'
    },
    {
        id: 12,
        date: '2024-02-21',
        type: 'withdrawal',
        asset: 'Cash',
        amount: 10000,
        status: 'completed'
    },
    {
        id: 13,
        date: '2024-02-20',
        type: 'buy',
        asset: 'US Treasury Bonds',
        amount: 15000,
        status: 'completed'
    },
    {
        id: 14,
        date: '2024-02-19',
        type: 'sell',
        asset: 'Silver Commodity',
        amount: 2500,
        status: 'completed'
    },
    {
        id: 15,
        date: '2024-02-18',
        type: 'deposit',
        asset: 'Cash',
        amount: 25000,
        status: 'completed'
    }
];

const portfolioData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [420000, 435000, 430000, 455000, 468000, 475000, 487425.5],
    dates: [
        '2024-02-26',
        '2024-02-27',
        '2024-02-28',
        '2024-02-29',
        '2024-03-01',
        '2024-03-02',
        '2024-03-03'
    ]
};

// ============================================================================
// GLOBAL STATE
// ============================================================================

let state = {
    currentSection: 'dashboard',
    currentTheme: localStorage.getItem('theme') || 'light',
    currentPage: 1,
    itemsPerPage: 10,
    sortColumn: null,
    sortDirection: 'asc',
    filteredAssets: [...sampleAssets],
    filteredTransactions: [...sampleTransactions],
    charts: {}
};

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupEventListeners();
    renderDashboard();
});

// ============================================================================
// THEME MANAGEMENT
// ============================================================================

function initializeTheme() {
    document.documentElement.setAttribute('data-theme', state.currentTheme);
    updateChartColors();
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.currentTheme);
        localStorage.setItem('theme', state.currentTheme);
        
        // Update charts with new colors
        Object.values(state.charts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        state.charts = {};
        updateChartColors();
        renderCharts();
    });
}

function getChartColors() {
    const isDark = state.currentTheme === 'dark';
    return {
        textColor: isDark ? '#a0aec0' : '#6b7280',
        gridColor: isDark ? '#2d3748' : '#e5e7eb',
        backgroundColor: isDark ? '#1a1f27' : '#ffffff'
    };
}

function updateChartColors() {
    // This will be called when rendering charts
}

// ============================================================================
// EVENT LISTENERS SETUP
// ============================================================================

function setupEventListeners() {
    // Theme toggle
    setupThemeToggle();

    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            navigateToSection(section);
        });
    });

    // Time filter buttons
    const timeFilterBtns = document.querySelectorAll('.filter-btn');
    timeFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            timeFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updatePerformanceChart(btn.getAttribute('data-period'));
        });
    });

    // Asset table sorting
    const sortableHeaders = document.querySelectorAll('th.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-column');
            sortTable(column, 'assets');
        });
    });

    // Filter inputs
    const assetSearch = document.getElementById('assetSearch');
    const assetTypeFilter = document.getElementById('assetTypeFilter');
    const transactionSearch = document.getElementById('transactionSearch');
    const transactionTypeFilter = document.getElementById('transactionTypeFilter');

    if (assetSearch) {
        assetSearch.addEventListener('input', () => {
            filterAssets();
            state.currentPage = 1;
            renderAssetsTable();
        });
    }

    if (assetTypeFilter) {
        assetTypeFilter.addEventListener('change', () => {
            filterAssets();
            state.currentPage = 1;
            renderAssetsTable();
        });
    }

    if (transactionSearch) {
        transactionSearch.addEventListener('input', () => {
            filterTransactions();
            state.currentPage = 1;
            renderTransactionsTable();
        });
    }

    if (transactionTypeFilter) {
        transactionTypeFilter.addEventListener('change', () => {
            filterTransactions();
            state.currentPage = 1;
            renderTransactionsTable();
        });
    }

    // Pagination
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');

    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            if (state.currentPage > 1) {
                state.currentPage--;
                renderTransactionsTable();
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(state.filteredTransactions.length / state.itemsPerPage);
            if (state.currentPage < totalPages) {
                state.currentPage++;
                renderTransactionsTable();
            }
        });
    }

    // Notification button
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            alert('You have 3 new notifications');
        });
    }
}

// ============================================================================
// NAVIGATION
// ============================================================================

function navigateToSection(section) {
    // Update active nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === section) {
            item.classList.add('active');
        }
    });

    // Update section title
    const sectionTitles = {
        dashboard: 'Dashboard',
        portfolio: 'Portfolio',
        transactions: 'Transactions',
        settings: 'Settings'
    };
    document.getElementById('sectionTitle').textContent = sectionTitles[section];

    // Show/hide sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        if (section === 'dashboard') {
            renderCharts();
        }
    }

    state.currentSection = section;
}

// ============================================================================
// DASHBOARD RENDERING
// ============================================================================

function renderDashboard() {
    renderAssetsTable();
    renderTransactionsTable();
    renderCharts();
}

// ============================================================================
// CHARTS
// ============================================================================

function renderCharts() {
    renderPerformanceChart();
    renderAllocationChart();
}

function renderPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    const colors = getChartColors();

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: portfolioData.labels,
            datasets: [{
                label: 'Portfolio Value',
                data: portfolioData.values,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#3b82f6',
                    borderWidth: 1,
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return 'Value: $' + formatCurrency(context.parsed.y);
                        },
                        afterLabel: function(context) {
                            return 'Date: ' + portfolioData.dates[context.dataIndex];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: colors.gridColor,
                        drawBorder: false
                    },
                    ticks: {
                        color: colors.textColor,
                        callback: function(value) {
                            return '$' + (value / 1000).toFixed(0) + 'K';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: colors.textColor
                    }
                }
            }
        }
    });

    state.charts.performance = chart;
}

function renderAllocationChart() {
    const ctx = document.getElementById('allocationChart');
    if (!ctx) return;

    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Stocks', 'Commodities', 'Bonds', 'Cash'],
            datasets: [{
                data: [51, 31, 15, 3],
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#8b5cf6'
                ],
                borderColor: getChartColors().backgroundColor,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#3b82f6',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });

    state.charts.allocation = chart;
}

function updatePerformanceChart(period) {
    // In a real app, this would fetch data based on the period
    // For demo, we'll just update the sample data
    const newData = {
        '1W': {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [420000, 435000, 430000, 455000, 468000, 475000, 487425.5]
        },
        '1M': {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            values: [430000, 450000, 465000, 487425.5]
        },
        '3M': {
            labels: ['Jan', 'Feb', 'Mar'],
            values: [410000, 450000, 487425.5]
        },
        '1Y': {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            values: [350000, 375000, 400000, 420000, 435000, 445000, 460000, 470000, 480000, 475000, 485000, 487425.5]
        },
        'ALL': {
            labels: ['2021', '2022', '2023', '2024'],
            values: [150000, 250000, 370000, 487425.5]
        }
    };

    if (state.charts.performance) {
        state.charts.performance.destroy();
    }

    portfolioData.labels = newData[period].labels;
    portfolioData.values = newData[period].values;
    renderPerformanceChart();
}

// ============================================================================
// TABLES
// ============================================================================

function renderAssetsTable() {
    const tbody = document.getElementById('assetsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const startIdx = (state.currentPage - 1) * state.itemsPerPage;
    const endIdx = startIdx + state.itemsPerPage;
    const paginatedAssets = state.filteredAssets.slice(0, 100); // Show all assets (no pagination for assets)

    paginatedAssets.forEach(asset => {
        const row = document.createElement('tr');
        const gainClass = asset.gain >= 0 ? 'profit' : 'loss';
        const gainSign = asset.gain >= 0 ? '+' : '';

        row.innerHTML = `
            <td>
                <strong>${asset.name}</strong>
            </td>
            <td>
                <span class="type-badge ${asset.type}">${capitalizeFirst(asset.type)}</span>
            </td>
            <td>$${formatCurrency(asset.invested)}</td>
            <td>$${formatCurrency(asset.current)}</td>
            <td>${asset.percentage.toFixed(1)}%</td>
            <td class="${gainClass}">${gainSign}$${formatCurrency(Math.abs(asset.gain))}</td>
        `;

        tbody.appendChild(row);
    });
}

function renderTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const startIdx = (state.currentPage - 1) * state.itemsPerPage;
    const endIdx = startIdx + state.itemsPerPage;
    const paginatedTransactions = state.filteredTransactions.slice(startIdx, endIdx);

    paginatedTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        const date = new Date(transaction.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>
                <span class="type-badge ${transaction.type}">${capitalizeFirst(transaction.type)}</span>
            </td>
            <td>${transaction.asset}</td>
            <td>$${formatCurrency(transaction.amount)}</td>
            <td>
                <span class="status-badge ${transaction.status}">${capitalizeFirst(transaction.status)}</span>
            </td>
        `;

        tbody.appendChild(row);
    });

    // Update pagination
    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(state.filteredTransactions.length / state.itemsPerPage);
    const currentPage = document.getElementById('currentPage');
    const totalPagesEl = document.getElementById('totalPages');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (currentPage) currentPage.textContent = state.currentPage;
    if (totalPagesEl) totalPagesEl.textContent = totalPages;

    if (prevBtn) prevBtn.disabled = state.currentPage === 1;
    if (nextBtn) nextBtn.disabled = state.currentPage === totalPages;
}

// ============================================================================
// FILTERING & SORTING
// ============================================================================

function filterAssets() {
    const searchValue = (document.getElementById('assetSearch')?.value || '').toLowerCase();
    const typeValue = document.getElementById('assetTypeFilter')?.value || '';

    state.filteredAssets = sampleAssets.filter(asset => {
        const matchesSearch = asset.name.toLowerCase().includes(searchValue);
        const matchesType = typeValue === '' || asset.type === typeValue;
        return matchesSearch && matchesType;
    });
}

function filterTransactions() {
    const searchValue = (document.getElementById('transactionSearch')?.value || '').toLowerCase();
    const typeValue = document.getElementById('transactionTypeFilter')?.value || '';

    state.filteredTransactions = sampleTransactions.filter(transaction => {
        const matchesSearch = 
            transaction.asset.toLowerCase().includes(searchValue) ||
            transaction.type.toLowerCase().includes(searchValue);
        const matchesType = typeValue === '' || transaction.type === typeValue;
        return matchesSearch && matchesType;
    });
}

function sortTable(column, tableType) {
    if (state.sortColumn === column) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        state.sortColumn = column;
        state.sortDirection = 'asc';
    }

    if (tableType === 'assets') {
        state.filteredAssets.sort((a, b) => {
            let aVal = a[column];
            let bVal = b[column];

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (state.sortDirection === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        renderAssetsTable();
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function formatCurrency(value) {
    return parseFloat(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================================================
// RESPONSIVE SIDEBAR
// ============================================================================

// Add touch event handling for mobile sidebar
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
        // Swiped horizontally
        if (diff > 0) {
            // Swiped left
        }
    }
});
