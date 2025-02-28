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