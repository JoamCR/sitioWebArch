// Modelo 3D básico (ejemplo placeholder)
if (document.getElementById('3d-container')) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, 400);
    document.getElementById('3d-container').appendChild(renderer.domElement);

    // Luz y fondo (ejemplo básico)
    scene.background = new THREE.Color(0xcccccc);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Placeholder: Aquí se cargaría un modelo .glTF real
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x1e3a8a });
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
}

// Ajuste responsive para navegadores
window.addEventListener('resize', () => {
    if (document.getElementById('3d-container')) {
        camera.aspect = window.innerWidth / 400;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, 400);
    }
});