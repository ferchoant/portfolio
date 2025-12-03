// ==========================================
// NAVIGATION & SCROLL FUNCTIONALITY
// ==========================================

// Active navigation link on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scroll to sections
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on  a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ==========================================
// NAVBAR BACKGROUND ON SCROLL
// ==========================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add background when scrolled
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(15, 15, 20, 0.95)';
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 20, 0.9)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ==========================================
// SKILL BARS ANIMATION
// ==========================================

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });

            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const fadeElements = document.querySelectorAll('.timeline-item, .project-card, .education-item, .cert-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);

            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================

function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                const suffix = text.replace(/[0-9]/g, '');

                if (!isNaN(number)) {
                    animateCounter(stat, number, suffix);
                }
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
`;
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

// Add styles for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, hsl(250, 85%, 60%), hsl(200, 80%, 55%));
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        opacity: 0;
        visibility: hidden;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .scroll-top-btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 32px hsla(250, 85%, 60%, 0.3);
    }
    
    .scroll-top-btn:active {
        transform: translateY(-2px);
    }
    
    @media (max-width: 640px) {
        .scroll-top-btn {
            bottom: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(style);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// MOBILE MENU STYLES
// ==========================================

const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 968px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            right: -100%;
            width: 70%;
            max-width: 300px;
            height: calc(100vh - 80px);
            background: rgba(20, 20, 30, 0.98);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
            border-left: 1px solid hsl(240, 15%, 25%);
            transition: right 0.3s ease;
            box-shadow: -4px 0 16px rgba(0, 0, 0, 0.5);
            overflow-y: auto;
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .nav-link {
            width: 100%;
            padding: 1rem;
            text-align: left;
            font-size: 1rem;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(mobileMenuStyle);

// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! 🚀');

    // Initial active link update
    updateActiveLink();

    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');

    // ==========================================
    // CERTIFICATE MODAL FUNCTIONALITY
    // ==========================================

    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certImage');
    const modalCaption = document.getElementById('certCaption');
    const closeBtn = document.querySelector('.cert-modal-close');

    // Mapeo de certificados a sus rutas de imagen
    const certificateImages = {
        // Universidad
        'Power BI Básico': 'assets/certificados/universidad/C_1_UNI_2024_POWER BI BASICO.png',
        'Power BI Intermedio': 'assets/certificados/universidad/C_2_UNI_2024_POWER BI INTERMEDIO.png',
        'Fundamentos de Proyectos de Inversión Pública': 'assets/certificados/universidad/C_3_UNI_2024_FUNDAMENTOS DE PROYECTOS DE INVERSIÓN PÚBLICA.png',

        // Cursos
        'Excel Advanced': 'assets/certificados/cursos/12_C_Certificado_Excel_Advanced_Coursera_Macquarie_2025.png',
        'Excel Intermediate II': 'assets/certificados/cursos/11_C_Certificado_Excel_Intermediate_II_Coursera_Macquarie_2025.png',
        'Programa Ferreycorp para la Empleabilidad': 'assets/certificados/cursos/10_C_Programa Ferreycorp para la Empleabilidad_Asociación ferreycorp_Surco Peru.png',
        'Especialización en Desarrollo con Python y Django': 'assets/certificados/cursos/8_C_Curso de especializacion Especialización en Desarrollo con Python y DJango_ UP AL y NETZUN.png',
        'Especialización Microsoft Excel': 'assets/certificados/cursos/9_C_Curso de especializacion Microsof Excel _ UPAL y NETZUN.png',
        'Excel Básico': 'assets/certificados/cursos/6_C_Curso de especializacion Excel básico_Netzun&Uni. Peruana Alemana.png',
        'Cultura Fiscal Básico': 'assets/certificados/cursos/7_C_Certificado de curso Básico de Cultura Fiscal_ Sunal.png',
        'Análisis y Diseño de Instituciones Educativas': 'assets/certificados/cursos/5_C_Certificado_del_curso_ANÁLISIS_Y_DISEÑO_DE_LAS_INSTITUCIONES EDUCATIVAS_Clg. de Ingenieros Piura.png',
        'Liderazgo Internacional Latinoamérica (LALA)': 'assets/certificados/cursos/3_C_Certificado de curso de Liderazgo Internacional Latinoamérica_LALA_Academy_Colombia.png',
        'Plan de Negocios': 'assets/certificados/cursos/4_C_Certificado del curso Plan de Negocios_Fundacion Romero.png',
        'Presupuesto y Ahorro': 'assets/certificados/cursos/2_C_Certificado de curso Presupuesto y Ahorro_ BCP-ABC.png',
        'Excel Intermedio': 'assets/certificados/cursos/1_C_Certificado de curso Excel intermedio_UTP.png',

        // Conferencias
        'Gestión del Cambio a través del Liderazgo': 'assets/certificados/conferencias/3_A_Certificado de asistencia Gestión del cambio a través del liderazgo_Cibertec.png',
        'AFI School - Certificado de Asistencia': 'assets/certificados/conferencias/2_A_AFI SCHOOL Certificado de Asistencia 21072022-21.png',
        'Taller de Innovación del Ahorro AFP': 'assets/certificados/conferencias/1_A_Certificado de asistencia en taller de innovación del ahorro AFP.png',

        // Personales
        'CERTIJOVEN - Certificado Único Laboral': 'assets/certificados/personales/1_P_CERTIJOVEN - CERTIFICADO ÚNICO LABORAL PARA JÓVENES.png',
        'Certificado de Antecedentes Penales': 'assets/certificados/personales/2_P_Certificado de antecedentes Penales 2019.png'
    };

    // Agregar evento de clic a todos los certificados
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function () {
            const certTitle = this.querySelector('h4').textContent;
            const imagePath = certificateImages[certTitle];

            if (imagePath) {
                modal.style.display = 'block';
                modalImg.src = imagePath;
                modalCaption.textContent = certTitle;
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                console.warn('No se encontró imagen para:', cert Title);
            }
        });
    });

    // Cerrar el modal al hacer clic en la X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Cerrar el modal al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Cerrar el modal con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// ==========================================
// CONTADOR AUTOM�TICO DE CERTIFICADOS  
// ==========================================
document.addEventListener('DOMContentLoaded', async function() {
    const certCountElement = document.querySelector('.stat-item:nth-child(2) .stat-number');
    
    if (certCountElement && window.location.pathname.includes('index.html')) {
        try {
            const response = await fetch('certificados.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const certCards = doc.querySelectorAll('.cert-card-img');
            const certCount = certCards.length;
            
            if (certCount > 0) {
                certCountElement.textContent = certCount;
                console.log('? Certificados contados: ' + certCount);
            }
        } catch (error) {
            console.log('?? Usando valor por defecto');
        }
    }
});
