/* --- MULTI-IDIOMA --- */
let currentLang = 'es';

function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    document.querySelectorAll('[data-es]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.placeholder =
            messageInput.getAttribute(`data-${currentLang}-placeholder`);
    }

    charIndex = 0;
    pIndex = 0;
    deleting = false;
}

/* --- TYPEWRITER --- */
const textElement = document.getElementById('typewriter');
const phrases = {
    es: ["Palacios.", "Full Stack.", "Innovador.", "Eficiente."],
    en: ["Palacios.", "Full Stack.", "Innovative.", "Efficient."]
};

let pIndex = 0, charIndex = 0, deleting = false;

function type() {
    if (!textElement) return;

    const currentPhrases = phrases[currentLang];
    const current = currentPhrases[pIndex];

    textElement.textContent = deleting
        ? current.substring(0, charIndex--)
        : current.substring(0, charIndex++);

    let speed = deleting ? 50 : 150;

    if (!deleting && charIndex > current.length) {
        deleting = true;
        speed = 2000;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        pIndex = (pIndex + 1) % currentPhrases.length;
        speed = 500;
    }

    setTimeout(type, speed);
}

/* --- REVEAL --- */
function reveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('load', () => {
    type();
    reveal();
});
window.addEventListener('scroll', reveal);



/*Para mi menu amburguesa*/
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');


menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

/*Se cierra al dar un click en un link*/
navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});




/* Inicializamos usando el ID 'hero-canvas ESTO ES PARA LAS PARTICULAS DEL BANNER' */
particlesJS('hero-canvas', {
    "particles": {
        "number": {
            "value": 100,  /* Aumentado de 80 para más densidad */
            "density": { "enable": true, "value_area": 800 }
        },
        "color": { "value": "#0066ff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 3, "random": true },
        "line_linked": {
            "enable": true,
            "distance": 180,
            "color": "#0066ff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 3,
            "direction": "none",
            "out_mode": "out"
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" }
        }
    },
    "retina_detect": true
});



// Este código evita el "lag" o tirón que ocurre al volver a hacer scroll después de estar varios segundos inactivo.
// Cuando el usuario osea yo sale de la sección hero, se pausa la animación de partículas.Esto evita que la animación siga ejecutándose en segundo plano,
// ya que el navegador reduce la frecuencia de actualización cuando no hay actividad.

// Al volver a la sección hero, se reactivan las partículas y se fuerza un refresh,
// asegurando que la animación vuelva a ejecutarse de forma fluida y sin retrasos.
let particlesActive = true;

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const rect = hero.getBoundingClientRect();
    const pJS = pJSDom[0].pJS;

    // Salimos del hero → pausamos
    if (rect.bottom < 0 && particlesActive) {
        pJS.particles.move.enable = false;
        particlesActive = false;
    }

    // Volvemos al hero → reactivamos + refresh
    if (rect.bottom >= 0 && !particlesActive) {
        pJS.particles.move.enable = true;
        pJS.fn.particlesRefresh(); //CLAVE
        particlesActive = true;
    }
});