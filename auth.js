/* =============================================
   VIDHAN AI - MAIN JAVASCRIPT
   ============================================= */

const API_BASE = window.location.origin + '/api';

function getToken() {
  return localStorage.getItem('vidhan_token');
}

function getUser() {
  const user = localStorage.getItem('vidhan_user');
  return user ? JSON.parse(user) : null;
}

function setAuth(token, user) {
  localStorage.setItem('vidhan_token', token);
  localStorage.setItem('vidhan_user', JSON.stringify(user));
}

function clearAuth() {
  localStorage.removeItem('vidhan_token');
  localStorage.removeItem('vidhan_user');
}

function isLoggedIn() {
  return !!getToken();
}

function protectPage() {
  if (!isLoggedIn()) {
    window.location.href = '/login';
    return false;
  }
  return true;
}

function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    window.location.href = '/dashboard';
  }
}

async function apiRequest(endpoint, options = {}) {
  const url = API_BASE + endpoint;
  const token = getToken();

  const config = {
    headers: {
      ...options.headers
    },
    ...options
  };

  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  if (options.body && !(options.body instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please make sure the backend is running.');
    }
    throw error;
  }
}

function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };

  toast.innerHTML = '<span>' + (icons[type] || 'ℹ️') + '</span><span>' + message + '</span>';
  container.appendChild(toast);

  setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(function () {
      toast.remove();
    }, 300);
  }, 4000);
}

function showSpinner(message) {
  let spinner = document.getElementById('spinnerOverlay');
  if (!spinner) {
    spinner = document.createElement('div');
    spinner.id = 'spinnerOverlay';
    spinner.className = 'spinner-overlay';
    spinner.innerHTML = '<div class="spinner-custom"></div><p id="spinnerMessage">Loading...</p>';
    document.body.appendChild(spinner);
  }
  document.getElementById('spinnerMessage').textContent = message || 'Loading...';
  spinner.classList.add('show');
}

function hideSpinner() {
  var spinner = document.getElementById('spinnerOverlay');
  if (spinner) {
    spinner.classList.remove('show');
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  var k = 1024;
  var sizes = ['Bytes', 'KB', 'MB', 'GB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(dateString) {
  var options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

function getFileIcon(fileType) {
  var icons = {
    pdf: '📄',
    docx: '📝',
    txt: '📃'
  };
  return icons[fileType] || '📄';
}

function logout() {
  clearAuth();
  window.location.href = '/login';
}

function initNavbar() {
  var toggle = document.querySelector('.mobile-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('show');
    });
  }

  var currentPage = window.location.pathname;
  var links = document.querySelectorAll('.nav-links a');
  links.forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

function updateNavForAuth() {
  var authNav = document.querySelector('.nav-auth');
  if (!authNav) return;

  if (isLoggedIn()) {
    var user = getUser();
    authNav.innerHTML =
      '<a href="/dashboard" class="btn-nav-login">Dashboard</a>' +
      '<a href="#" onclick="logout()" class="btn-nav-register">Logout</a>';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  updateNavForAuth();
});