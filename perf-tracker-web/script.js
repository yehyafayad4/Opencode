// Performance Tracker Web App
// Uses localStorage for persistence

// Initialize state
let state = {
    entries: [],
    goals: {
        focus: 8,
        tasks: 10,
        study: 3,
        gym: 4
    }
};

// DOM Elements
const metricForm = document.getElementById('metric-form');
const metricSelect = document.getElementById('metric-select');
const scoreInput = document.getElementById('score-input');
const noteInput = document.getElementById('note-input');
const modeToggle = document.getElementById('mode-toggle');
const focusValue = document.getElementById('focus-value');
const tasksValue = document.getElementById('tasks-value');
const studyValue = document.getElementById('study-value');
const gymValue = document.getElementById('gym-value');
const todaySummary = document.getElementById('today-summary');
const statsContent = document.getElementById('stats-content');
const focusProgress = document.getElementById('focus-progress');
const focusProgressText = document.getElementById('focus-progress-text');

// Initialize the app
function init() {
    loadState();
    render();
    setupEventListeners();
}

// Load state from localStorage
function loadState() {
    const saved = localStorage.getItem('perfTrackerState');
    if (saved) {
        try {
            state = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse state', e);
        }
    }
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('perfTrackerState', JSON.stringify(state));
}

// Setup event listeners
function setupEventListeners() {
    metricForm.addEventListener('submit', handleFormSubmit);
    modeToggle.addEventListener('toggleTheme', toggleTheme);
    modeToggle.addEventListener('click', toggleTheme);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const metric = metricSelect.value;
    const score = parseFloat(scoreInput.value);
    const note = noteInput.value.trim();
    
    if (isNaN(score) || score < 1 || score > 10) {
        alert('Please enter a valid score between 1 and 10');
        return;
    }
    
    const entry = {
        id: Date.now(),
        metric,
        value: score,
        note,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString()
    };
    
    state.entries.push(entry);
    saveState();
    render();
    
    // Reset form
    metricForm.reset();
}

// Render the UI
function render() {
    renderCards();
    renderTodaySummary();
    renderStats();
    renderGoalProgress();
    updateThemeToggle();
}

// Render metric cards
function renderCards() {
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = state.entries.filter(e => e.date === today);
    
    const totals = {
        focus: 0,
        tasks: 0,
        study: 0,
        gym: 0
    };
    
    todayEntries.forEach(entry => {
        if (totals[entry.metric] !== undefined) {
            totals[entry.metric] += entry.value;
        }
    });
    
    focusValue.textContent = totals.focus.toFixed(1);
    tasksValue.textContent = totals.tasks.toFixed(1);
    studyValue.textContent = totals.study.toFixed(1);
    gymValue.textContent = totals.gym.toFixed(1);
}

// Render today's summary
function renderTodaySummary() {
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = state.entries.filter(e => e.date === today);
    
    if (todayEntries.length === 0) {
        todaySummary.innerHTML = '<p>No entries logged today yet.</p>';
        return;
    }
    
    let html = '<ul>';
    todayEntries.forEach(entry => {
        html += `<li><strong>${entry.metric}</strong>: ${entry.value} ${entry.note ? `- ${entry.note}` : ''}</li>`;
    });
    html += '</ul>';
    
    todaySummary.innerHTML = html;
}

// Render statistics
function renderStats() {
    if (state.entries.length === 0) {
        statsContent.innerHTML = '<p>Start logging to see statistics.</p>';
        return;
    }
    
    // Calculate stats for each metric
    const metrics = ['focus', 'tasks', 'study', 'gym'];
    const stats = {};
    
    metrics.forEach(metric => {
        const entries = state.entries.filter(e => e.metric === metric);
        if (entries.length === 0) {
            stats[metric] = { count: 0, avg: 0, total: 0 };
            return;
        }
        
        const total = entries.reduce((sum, e) => sum + e.value, 0);
        const avg = total / entries.length;
        
        stats[metric] = { count: entries.length, avg: avg.toFixed(2), total: total.toFixed(2) };
    });
    
    let html = '<table><thead><tr><th>Metric</th><th>Entries</th><th>Total</th><th>Average</th></tr></thead><tbody>';
    metrics.forEach(metric => {
        const s = stats[metric];
        html += `<tr>
            <td>${metric}</td>
            <td>${s.count}</td>
            <td>${s.total}</td>
            <td>${s.avg}</td>
        </tr>`;
    });
    html += '</tbody></table>';
    
    statsContent.innerHTML = html;
}

// Render goal progress
function renderGoalProgress() {
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = state.entries.filter(e => e.date === today);
    
    const totals = {
        focus: 0,
        tasks: 0,
        study: 0,
        gym: 0
    };
    
    todayEntries.forEach(entry => {
        if (totals[entry.metric] !== undefined) {
            totals[entry.metric] += entry.value;
        }
    });
    
    const focusTotal = totals.focus;
    const focusGoal = state.goals.focus || 8;
    const progressPercent = Math.min((focusTotal / focusGoal) * 100, 100);
    
    focusProgress.style.width = `${progressPercent}%`;
    focusProgressText.textContent = `${focusTotal.toFixed(1)}/${focusGoal} hours`;
}

// Toggle dark mode
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        html.removeAttribute('data-theme');
        modeToggle.textContent = '🌙 Dark Mode';
    } else {
        html.setAttribute('data-theme', 'dark');
        modeToggle.textContent = '☀️ Light Mode';
    }
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Update theme toggle based on saved preference
function updateThemeToggle() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        modeToggle.textContent = '☀️ Light Mode';
    } else if (savedTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        modeToggle.textContent = '🌙 Dark Mode';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);