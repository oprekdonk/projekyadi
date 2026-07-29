/* ===== 1. MOBILE MENU TOGGLE ===== */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

/* Tutup menu saat nav-link diklik (mobile) */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* ===== 2. STICKY NAVBAR ===== */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

/* ===== 3. BACK TO TOP ===== */
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== 4. FAQ ACCORDION ===== */
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        /* Tutup semua FAQ lain */
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        /* Buka yang diklik jika sebelumnya tidak aktif */
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

/* ===== 5. FORM VALIDATION ===== */
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formSuccess = document.getElementById('formSuccess');

function showError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.parentElement.classList.add('error');
}

function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.parentElement.classList.remove('error');
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    /* Reset errors */
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    formSuccess.classList.remove('show');

    /* Validasi Nama */
    if (nameInput.value.trim() === '') {
        showError('name', 'nameError');
        isValid = false;
    }

    /* Validasi Email */
    if (emailInput.value.trim() === '') {
        showError('email', 'emailError');
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        showError('email', 'emailError');
        isValid = false;
    }

    /* Validasi Pesan */
    if (messageInput.value.trim() === '') {
        showError('message', 'messageError');
        isValid = false;
    }

    /* Jika valid, tampilkan sukses */
    if (isValid) {
        formSuccess.classList.add('show');
        contactForm.reset();

        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }
});

/* Hapus error saat user mulai mengetik */
nameInput.addEventListener('input', () => clearError('name', 'nameError'));
emailInput.addEventListener('input', () => clearError('email', 'emailError'));
messageInput.addEventListener('input', () => clearError('message', 'messageError'));

/* ===== 6. SCROLL ANIMATIONS ===== */
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => observer.observe(el));

/* ===== 7. DARK / LIGHT MODE TOGGLE ===== */
const themeSwitch = document.getElementById('themeSwitch');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});
