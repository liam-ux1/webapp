// Mock Data
const mockClients = [
    { name: 'John Doe', email: 'john@example.com', deposited: 5000, withdrawn: 1000, balance: 4000, status: 'active' },
    { name: 'Jane Smith', email: 'jane@example.com', deposited: 7500, withdrawn: 2000, balance: 5500, status: 'active' },
    { name: 'Bob Johnson', email: 'bob@example.com', deposited: 3000, withdrawn: 500, balance: 2500, status: 'inactive' },
    { name: 'Alice Brown', email: 'alice@example.com', deposited: 10000, withdrawn: 3000, balance: 7000, status: 'active' },
];

const mockWithdrawals = [
    { user: 'John Doe', amount: 500, date: '2023-10-01', status: 'pending' },
    { user: 'Jane Smith', amount: 1000, date: '2023-10-02', status: 'pending' },
    { user: 'Alice Brown', amount: 1500, date: '2023-10-03', status: 'pending' },
];

const mockDeposits = [
    { id: 'TXN001', user: 'John Doe', amount: 1000, date: '2023-09-15', status: 'confirmed' },
    { id: 'TXN002', user: 'Jane Smith', amount: 2000, date: '2023-09-16', status: 'confirmed' },
    { id: 'TXN003', user: 'Bob Johnson', amount: 500, date: '2023-09-17', status: 'pending' },
];

// Auth System (Commented Out for Testing)
/*
// document.addEventListener('DOMContentLoaded', function() {
//     const authModal = new bootstrap.Modal(document.getElementById('authModal'));
//     authModal.show();

//     document.getElementById('authForm').addEventListener('submit', function(e) {
//         e.preventDefault();
//         const password = document.getElementById('adminPassword').value;
//         if (password === 'admin123') { // Replace with actual auth logic
//             authModal.hide();
//             initDashboard();
//         } else {
//             alert('Invalid password');
//         }
//     });
// });
*/

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

function initDashboard() {
    loadSummaryCards();
    loadClientsTable();
    loadWithdrawalsTable();
    loadDepositsTable();
    loadCharts();
    setupEventListeners();
}

function loadCharts() {
    // Portfolio Chart
    const ctx1 = document.getElementById('portfolioChart').getContext('2d');
    new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Stocks', 'Bonds', 'Crypto', 'Cash'],
            datasets: [{
                data: [40, 30, 20, 10],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        },
        options: {
            responsive: true
        }
    });

    // Activity Chart
    const ctx2 = document.getElementById('activityChart').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Portfolio Value',
                data: [10000, 12000, 15000, 14000, 18000, 20000],
                borderColor: '#36A2EB',
                fill: false
            }]
        },
        options: {
            responsive: true
        }
    });
}

function loadSummaryCards() {
    const totalClients = mockClients.length;
    const totalDeposits = mockClients.reduce((sum, client) => sum + client.deposited, 0);
    const totalWithdrawals = mockClients.reduce((sum, client) => sum + client.withdrawn, 0);
    const totalFunds = mockClients.reduce((sum, client) => sum + client.balance, 0);

    document.getElementById('total-clients').textContent = totalClients;
    document.getElementById('total-deposits').textContent = `$${totalDeposits.toLocaleString()}`;
    document.getElementById('total-withdrawals').textContent = `$${totalWithdrawals.toLocaleString()}`;
    document.getElementById('total-funds').textContent = `$${totalFunds.toLocaleString()}`;
}

function loadClientsTable() {
    const tbody = document.getElementById('clients-tbody');
    tbody.innerHTML = '';

    mockClients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>$${client.deposited.toLocaleString()}</td>
            <td>$${client.withdrawn.toLocaleString()}</td>
            <td>$${client.balance.toLocaleString()}</td>
            <td><span class="status-${client.status}">${client.status.charAt(0).toUpperCase() + client.status.slice(1)}</span></td>
        `;
        tbody.appendChild(row);
    });

    // Add sorting to headers
    addSorting('clients-table');
}

function loadWithdrawalsTable() {
    const tbody = document.getElementById('withdrawals-tbody');
    tbody.innerHTML = '';

    mockWithdrawals.forEach((withdrawal, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${withdrawal.user}</td>
            <td>$${withdrawal.amount.toLocaleString()}</td>
            <td>${withdrawal.date}</td>
            <td><span class="status-${withdrawal.status}">${withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}</span></td>
            <td>
                <button class="btn btn-success btn-sm me-2" onclick="approveWithdrawal(${index})">Approve</button>
                <button class="btn btn-danger btn-sm" onclick="declineWithdrawal(${index})">Decline</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add sorting to headers
    addSorting('withdrawals-table');
}

function loadDepositsTable() {
    const tbody = document.getElementById('deposits-tbody');
    tbody.innerHTML = '';

    mockDeposits.forEach(deposit => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${deposit.id}</td>
            <td>${deposit.user}</td>
            <td>$${deposit.amount.toLocaleString()}</td>
            <td>${deposit.date}</td>
            <td><span class="status-${deposit.status === 'confirmed' ? 'confirmed' : 'pending-deposit'}">${deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}</span></td>
        `;
        tbody.appendChild(row);
    });

    // Add sorting to headers
    addSorting('deposits-table');
}

function addSorting(tableId) {
    const table = document.getElementById(tableId);
    const headers = table.querySelectorAll('th');
    headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => sortTable(table, index));
    });
}

function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isNumeric = columnIndex > 1 && columnIndex < 5; // Deposited, Withdrawn, Balance, Amount columns

    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent.trim();
        const bText = b.cells[columnIndex].textContent.trim();

        if (isNumeric) {
            const aNum = parseFloat(aText.replace(/[$,]/g, ''));
            const bNum = parseFloat(bText.replace(/[$,]/g, ''));
            return aNum - bNum;
        } else {
            return aText.localeCompare(bText);
        }
    });

    rows.forEach(row => tbody.appendChild(row));
}

function approveWithdrawal(index) {
    mockWithdrawals[index].status = 'approved';
    loadWithdrawalsTable();
    // In a real app, send to backend
}

function declineWithdrawal(index) {
    mockWithdrawals[index].status = 'declined';
    loadWithdrawalsTable();
    // In a real app, send to backend
}

function setupEventListeners() {
    // Sidebar toggle
    document.getElementById('menu-toggle').addEventListener('click', function() {
        document.getElementById('sidebar-wrapper').classList.toggle('show');
    });

    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', function() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        const icon = this.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Client search
    document.getElementById('client-search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#clients-tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Navigation (simple scroll to sections)
    document.querySelectorAll('#sidebar-wrapper .list-group-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId + '-section') || document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            // Update active class
            document.querySelectorAll('#sidebar-wrapper .list-group-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}