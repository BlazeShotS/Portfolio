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

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
