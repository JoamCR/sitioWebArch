// Script para el modelo 3D
if (document.getElementById('3d-container')) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, 400);
    document.getElementById('3d-container').appendChild(renderer.domElement);

    scene.background = new THREE.Color(0xcccccc);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x172554 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / 400;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, 400);
    });
}

// Animaciones Premium: Parallax
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    document.querySelectorAll('.parallax').forEach(elem => {
        elem.style.transform = `translateY(${scroll * -0.3}px)`;
    });
});

// Multilenguaje
const translations = {
    en: {},
    es: {}
};

let currentLang = 'es'; // Idioma por defecto

// Función para cargar traducciones
async function loadTranslations(lang) {
    try {
        const response = await fetch(`assets/lang/${lang}.json`);
        if (!response.ok) throw new Error(`Error al cargar ${lang}.json: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error al cargar traducciones:', error);
        return {};
    }
}

// Inicializar traducciones (se ejecuta una vez)
(async () => {
    translations.en = await loadTranslations('en');
    translations.es = await loadTranslations('es');
    loadLanguage(currentLang); // Cargar idioma inicial
})();

// Función para aplicar idioma
function loadLanguage(lang) {
    currentLang = lang;
    document.body.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[lang] || translations.es;
        for (const k of keys) {
            value = value ? value[k] : undefined;
        }
        if (value) elem.textContent = value;
        else console.warn(`Traducción no encontrada para: ${key} en ${lang}`);
    });
}

// Función para cargar la barra de navegación dinámicamente y configurar eventos
async function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        try {
            const response = await fetch('complementos/navbar.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const navbarHtml = await response.text();
            navbarPlaceholder.innerHTML = navbarHtml;

            // Re-bind language toggle event listener after navbar is loaded
            const langToggleButton = document.getElementById('lang-toggle');
            if (langToggleButton) {
                langToggleButton.addEventListener('click', () => {
                    const newLang = currentLang === 'es' ? 'en' : 'es';
                    loadLanguage(newLang);
                    langToggleButton.textContent = `${newLang.toUpperCase()}/ES`;
                });
                // Set initial text for the toggle button
                langToggleButton.textContent = `${currentLang.toUpperCase()}/ES`;
            }
        } catch (error) {
            console.error('Error loading navbar:', error);
        }
    }
}

// Funciones para abrir y cerrar el modal genérico
function openModal(title, content) {
    const modal = document.getElementById('generic-modal');
    if (modal) {
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-body').innerHTML = content;
        modal.classList.add('active'); // Use 'active' class for showing
    }
}

function closeModal() {
    const modal = document.getElementById('generic-modal');
    if (modal) {
        modal.classList.remove('active'); // Use 'active' class for showing
    }
}

// Animación de Fade-In y Scroll Triggered Animations
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar(); // Cargar navbar primero

    // Event listeners para cerrar el modal
    const modal = document.getElementById('generic-modal');
    if (modal) {
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    }

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe elements with data-i18n attribute for fade-in effect
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        observer.observe(elem);
    });

    // Aplicar imágenes de fondo dinámicamente y efectos hover/touch
    document.querySelectorAll('.service-card').forEach(card => {
        const bgImage = card.getAttribute('data-bg-image');
        if (bgImage) {
            card.style.backgroundImage = `url(${bgImage})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
            card.style.backgroundColor = 'transparent'; // Ocultar fondo gris por defecto

            // Aplicar opacidad inicial a la imagen
            card.style.backgroundBlendMode = 'overlay';
            card.style.opacity = '0.2'; // Imagen tenue por defecto

            // Efecto hover
            card.addEventListener('mouseover', () => {
                card.style.opacity = '1'; // Mostrar imagen completa
                card.querySelector('h3').style.color = '#ffffff';
                card.querySelector('h3').style.textShadow = '0 0 10px rgba(0, 0, 0, 0.7)';
                card.querySelector('.brief').style.color = '#ffffff';
                card.querySelector('.brief').style.textShadow = '0 0 10px rgba(0, 0, 0, 0.7)';
            });

            card.addEventListener('mouseout', () => {
                card.style.opacity = '0.2'; // Volver a opacidad baja
                card.querySelector('h3').style.color = '#4b5563';
                card.querySelector('h3').style.textShadow = 'none';
                card.querySelector('.brief').style.color = '#4b5563';
                card.querySelector('.brief').style.textShadow = 'none';
            });

            // Efecto para móviles (touch)
            card.addEventListener('touchstart', () => {
                card.style.opacity = '1';
                card.querySelector('h3').style.color = '#ffffff';
                card.querySelector('h3').style.textShadow = '0 0 10px rgba(0, 0, 0, 0.7)';
                card.querySelector('.brief').style.color = '#ffffff';
                card.querySelector('.brief').style.textShadow = '0 0 10px rgba(0, 0, 0, 0.7)';
            });

            card.addEventListener('touchend', () => {
                card.style.opacity = '0.2';
                card.querySelector('h3').style.color = '#4b5563';
                card.querySelector('h3').style.textShadow = 'none';
                card.querySelector('.brief').style.color = '#4b5563';
                card.querySelector('.brief').style.textShadow = 'none';
            });
        }
    });
    
    // Add click event listener to service cards to open modal
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const details = card.querySelector('.details').innerHTML;
            openModal(title, details);
        });
    });
});

// Google Analytics (Premium)
(function() {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y'; // Reemplazar con tu ID
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-XXXXX-Y');
})();