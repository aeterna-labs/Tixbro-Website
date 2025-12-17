// ====== Dashboard JavaScript ======

// Demo Data
const demoData = {
    totalTicketsSold: 12456,
    totalRevenue: 1245600,
    activeEvents: 8,
    totalViews: 45230,
    revenueData: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [145000, 198000, 167000, 223000, 234000, 298000]
    },
    categoriesData: {
        labels: ['Concerts', 'Sports', 'Theatre', 'College Fests', 'Turf Booking'],
        data: [35, 25, 15, 15, 10]
    },
    recentEvents: [
        {
            id: 1,
            title: 'Sunburn Festival 2024',
            category: 'Concerts',
            city: 'Goa',
            date: '2024-12-28',
            image: 'img/event-1.jpg',
            status: 'active',
            soldTickets: 850,
            totalTickets: 1000,
            views: 5420
        },
        {
            id: 2,
            title: 'IPL 2024 Final',
            category: 'Sports',
            city: 'Mumbai',
            date: '2024-12-31',
            image: 'img/event-2.jpg',
            status: 'active',
            soldTickets: 1200,
            totalTickets: 1500,
            views: 8940
        },
        {
            id: 3,
            title: 'Comedy Night with Zakir Khan',
            category: 'Theatre',
            city: 'Delhi',
            date: '2025-01-05',
            image: 'img/comedy-1.jpg',
            status: 'draft',
            soldTickets: 0,
            totalTickets: 500,
            views: 1230
        }
    ]
};

// ====== Initialization ======
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    initNavigation();
    initThemeToggle();
    initMobileMenu();
    initCharts();
    initCreateEventForm();
    loadDashboardData();
});

// Initialize Dashboard
function initDashboard() {
    console.log('Dashboard initialized');

    // Load user data (demo)
    document.getElementById('userName').textContent = 'Demo Organizer';
    document.getElementById('userEmail').textContent = 'demo@tixbro.com';
}

// ====== Navigation ======
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            const section = item.dataset.section;
            if (section) {
                navigateToSection(section);
            }
        });
    });
}

function navigateToSection(section) {
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === section) {
            item.classList.add('active');
        }
    });

    // Update content sections
    document.querySelectorAll('.content-section').forEach(content => {
        content.classList.remove('active');
    });

    const sectionMap = {
        'overview': 'overviewSection',
        'events': 'eventsSection',
        'analytics': 'analyticsSection',
        'create': 'createSection'
    };

    const targetSection = document.getElementById(sectionMap[section]);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update page title
    const titles = {
        'overview': 'Dashboard Overview',
        'events': 'My Events',
        'analytics': 'Analytics & Insights',
        'create': 'Create New Event'
    };

    document.getElementById('pageTitle').textContent = titles[section] || 'Dashboard';
}

// Make navigateToSection globally accessible
window.navigateToSection = navigateToSection;

// ====== Theme Toggle ======
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('dashboard_theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('dashboard_theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ====== Mobile Menu ======
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    // Toggle sidebar
    toggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
    });

    // Close sidebar when clicking overlay
    overlay?.addEventListener('click', () => {
        closeSidebar();
    });

    // Close sidebar when clicking nav items on mobile
    if (window.innerWidth <= 768) {
        const navItems = sidebar?.querySelectorAll('.nav-item');
        navItems?.forEach(item => {
            item.addEventListener('click', () => {
                closeSidebar();
            });
        });
    }

    // Close sidebar on window resize if > 768px
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    sidebar?.classList.toggle('active');
    overlay?.classList.toggle('active');

    // Prevent body scroll when sidebar is open
    if (sidebar?.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    sidebar?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
}

// Make functions globally accessible
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;

// ====== Charts ======
let revenueChart = null;
let categoriesChart = null;

function initCharts() {
    initRevenueChart();
    initCategoriesChart();
}

function initRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: demoData.revenueData.labels,
            datasets: [{
                label: 'Revenue (₹)',
                data: demoData.revenueData.data,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
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
                            return '₹' + context.parsed.y.toLocaleString('en-IN');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value / 1000) + 'K';
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

function initCategoriesChart() {
    const ctx = document.getElementById('categoriesChart');
    if (!ctx) return;

    categoriesChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: demoData.categoriesData.labels,
            datasets: [{
                data: demoData.categoriesData.data,
                backgroundColor: [
                    '#667eea',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#3b82f6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12,
                            weight: '600'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
}

// ====== Load Dashboard Data ======
function loadDashboardData() {
    // Update stats
    animateValue('totalTicketsSold', 0, demoData.totalTicketsSold, 1500);
    animateValue('totalRevenueDisplay', 0, demoData.totalRevenue, 1500, true);
    animateValue('activeEventsCount', 0, demoData.activeEvents, 1000);
    animateValue('totalViews', 0, demoData.totalViews, 1500);

    // Load recent events
    loadRecentEvents();
    loadEventsGrid();
}

function animateValue(id, start, end, duration, isCurrency = false) {
    const element = document.getElementById(id);
    if (!element) return;

    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }

        if (isCurrency) {
            element.textContent = '₹' + Math.floor(current).toLocaleString('en-IN');
        } else {
            element.textContent = Math.floor(current).toLocaleString('en-IN');
        }
    }, 16);
}

function loadRecentEvents() {
    const container = document.getElementById('recentEventsList');
    if (!container) return;

    container.innerHTML = demoData.recentEvents.map(event => `
        <div class="recent-event-item">
            <img src="${event.image}" alt="${event.title}" class="event-item-image" onerror="this.src='img/placeholder.jpg'">
            <div class="event-item-info">
                <h4 class="event-item-title">${event.title}</h4>
                <p class="event-item-meta">
                    <i class="fas fa-map-marker-alt"></i> ${event.city} · ${event.date}
                </p>
            </div>
            <span class="event-item-status ${event.status}">${event.status}</span>
        </div>
    `).join('');
}

function loadEventsGrid() {
    const container = document.getElementById('eventsGrid');
    if (!container) return;

    container.innerHTML = demoData.recentEvents.map(event => `
        <div class="event-grid-card">
            <img src="${event.image}" alt="${event.title}" class="event-grid-image" onerror="this.src='img/placeholder.jpg'">
            <div class="event-grid-content">
                <h3 class="event-grid-title">${event.title}</h3>
                <div class="event-grid-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${event.city}</span>
                    <span><i class="fas fa-calendar"></i> ${event.date}</span>
                    <span><i class="fas fa-tag"></i> ${event.category}</span>
                </div>
                <div class="event-grid-stats">
                    <div class="event-grid-stat">
                        <strong>${event.soldTickets}</strong>
                        <span>Sold</span>
                    </div>
                    <div class="event-grid-stat">
                        <strong>${event.totalTickets - event.soldTickets}</strong>
                        <span>Available</span>
                    </div>
                    <div class="event-grid-stat">
                        <strong>${event.views}</strong>
                        <span>Views</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ====== Create Event Form ======
let currentStep = 1;
const totalSteps = 4;

function initCreateEventForm() {
    const form = document.getElementById('createEventForm');
    const nextBtn = document.getElementById('nextStepBtn');
    const prevBtn = document.getElementById('prevStepBtn');
    const submitBtn = document.getElementById('submitEventBtn');
    const earlyBirdCheckbox = document.getElementById('earlyBird');
    const imageUploadArea = document.getElementById('imageUploadArea');
    const imageInput = document.getElementById('eventImage');

    // Next button
    nextBtn?.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            currentStep++;
            updateFormStep();
        }
    });

    // Previous button
    prevBtn?.addEventListener('click', () => {
        currentStep--;
        updateFormStep();
    });

    // Early bird toggle
    earlyBirdCheckbox?.addEventListener('change', (e) => {
        const options = document.querySelectorAll('.early-bird-options');
        options.forEach(opt => {
            opt.style.display = e.target.checked ? 'block' : 'none';
        });
    });

    // Image upload
    imageUploadArea?.addEventListener('click', () => {
        imageInput?.click();
    });

    imageInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('imagePreview');
                if (preview) {
                    preview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; border-radius: 8px; margin-top: 1rem;">`;
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Prevent default drag behavior
    imageUploadArea?.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        imageUploadArea.style.borderColor = '#667eea';
    });

    imageUploadArea?.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        imageUploadArea.style.borderColor = '';
    });

    imageUploadArea?.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        imageUploadArea.style.borderColor = '';

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            imageInput.files = dataTransfer.files;

            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('imagePreview');
                if (preview) {
                    preview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; border-radius: 8px; margin-top: 1rem;">`;
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Form submission
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit();
    });
}

function updateFormStep() {
    // Update step visibility
    document.querySelectorAll('.form-step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentStep);
    });

    // Update progress indicators
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 <= currentStep);
    });

    // Update buttons
    const nextBtn = document.getElementById('nextStepBtn');
    const prevBtn = document.getElementById('prevStepBtn');
    const submitBtn = document.getElementById('submitEventBtn');

    if (prevBtn) prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    if (nextBtn) nextBtn.style.display = currentStep < totalSteps ? 'inline-flex' : 'none';
    if (submitBtn) submitBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';

    // Generate preview on last step
    if (currentStep === totalSteps) {
        generateEventPreview();
    }
}

function validateStep(step) {
    const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    if (!currentStepEl) return true;

    const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
    }

    return isValid;
}

function generateEventPreview() {
    const preview = document.querySelector('.preview-content');
    if (!preview) return;

    const formData = {
        title: document.getElementById('eventTitle')?.value || '',
        category: document.getElementById('eventCategory')?.value || '',
        city: document.getElementById('eventCity')?.value || '',
        date: document.getElementById('eventDate')?.value || '',
        time: document.getElementById('eventTime')?.value || '',
        description: document.getElementById('eventDescription')?.value || '',
        venue: document.getElementById('eventVenue')?.value || '',
        address: document.getElementById('eventAddress')?.value || '',
        price: document.getElementById('ticketPrice')?.value || '',
        totalTickets: document.getElementById('totalTickets')?.value || ''
    };

    preview.innerHTML = `
        <div style="display: grid; gap: 1.5rem;">
            <div>
                <h4 style="margin: 0 0 0.5rem 0; color: var(--dashboard-text-light); font-size: 0.875rem;">Event Title</h4>
                <p style="margin: 0; font-size: 1.25rem; font-weight: 700;">${formData.title}</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div>
                    <h4 style="margin: 0 0 0.5rem 0; color: var(--dashboard-text-light); font-size: 0.875rem;">Category</h4>
                    <p style="margin: 0;">${formData.category}</p>
                </div>
                <div>
                    <h4 style="margin: 0 0 0.5rem 0; color: var(--dashboard-text-light); font-size: 0.875rem;">City</h4>
                    <p style="margin: 0;">${formData.city}</p>
                </div>
                <div>
                    <h4 style="margin: 0 0 0.5rem 0; color: var(--dashboard-text-light); font-size: 0.875rem;">Date & Time</h4>
                    <p style="margin: 0;">${formData.date} at ${formData.time}</p>
                </div>
                <div>
                    <h4 style="margin: 0 0 0.5rem 0; color: var(--dashboard-text-light); font-size: 0.875rem;">Ticket Price</h4>
                    <p style="margin: 0; font-weight: 700; color: var(--dashboard-success);">₹${formData.price}</p>
                </div>
            </div>
            <div>
                <h4 style="margin: 0 0 0.5rem 0; color: var(--dashboard-text-light); font-size: 0.875rem;">Description</h4>
                <p style="margin: 0; line-height: 1.6;">${formData.description}</p>
            </div>
            <div>
                <h4 style="margin: 0 0 0.5rem 0; color: var(--dashboard-text-light); font-size: 0.875rem;">Venue</h4>
                <p style="margin: 0;">${formData.venue}</p>
                <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: var(--dashboard-text-light);">${formData.address}</p>
            </div>
        </div>
    `;
}

function handleFormSubmit() {
    showNotification('Event created successfully! 🎉', 'success');

    setTimeout(() => {
        document.getElementById('createEventForm').reset();
        currentStep = 1;
        updateFormStep();
        navigateToSection('events');
    }, 2000);
}

// ====== Notifications ======
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ====== Logout ======
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('auth_token');
        window.location.href = 'login.html';
    }
}

// Make logout globally accessible
window.logout = logout;

// ====== Search ======
document.getElementById('searchInput')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Implement search logic here
    console.log('Searching for:', searchTerm);
});
