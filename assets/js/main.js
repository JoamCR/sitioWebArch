<<<<<<< HEAD
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

// Animaciones Premium: Parallax y Fade-In
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    document.querySelectorAll('.parallax').forEach(elem => {
        elem.style.transform = `translateY(${scroll * -0.3}px)`;
    });

    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const rect = elem.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            elem.classList.add('fade-in');
        }
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

// Inicializar traducciones
(async () => {
    translations.en = await loadTranslations('en');
    translations.es = await loadTranslations('es');
    loadLanguage(currentLang);
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

// Evento para el toggle de idioma
document.getElementById('lang-toggle')?.addEventListener('click', () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    loadLanguage(newLang);
    document.getElementById('lang-toggle').textContent = `${newLang.toUpperCase()}/ES`;
});

// Animación de Fade-In
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const rect = elem.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            elem.classList.add('fade-in');
        }
    });

    // Aplicar imágenes de fondo dinámicamente
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
=======
// Script para el modelo 3D en visualizaciones-3d.html
if (document.getElementById('3d-container')) {
    // Crear la escena
    const scene = new THREE.Scene();
    // Configurar la cámara
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    // Configurar el renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, 400);
    document.getElementById('3d-container').appendChild(renderer.domElement);

    // Configurar el fondo de la escena
    scene.background = new THREE.Color(0xcccccc);
    // Añadir luz
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Crear un cubo como placeholder (reemplazar con un modelo .glTF si lo tienes)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x172554 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Posicionar la cámara
    camera.position.z = 5;

    // Animación del cubo
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// Ajustar el tamaño del renderizado al redimensionar la ventana
window.addEventListener('resize', () => {
    if (document.getElementById('3d-container')) {
        camera.aspect = window.innerWidth / 400;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, 400);
    }
});
>>>>>>> fd18e06dd4d9898a052b40f4c3d443a16c4d62fc
