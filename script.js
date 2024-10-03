// Crear la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear un cubo
const geometryCube = new THREE.BoxGeometry();
const materialCube = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometryCube, materialCube);
scene.add(cube);

// Crear una esfera
const geometrySphere = new THREE.SphereGeometry(0.5, 32, 32);
const materialSphere = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(geometrySphere, materialSphere);
sphere.position.x = 2; // Posicionar esfera
scene.add(sphere);

// Crear un cono
const geometryCone = new THREE.ConeGeometry(0.5, 1, 32);
const materialCone = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cone = new THREE.Mesh(geometryCone, materialCone);
cone.position.x = -2; // Posicionar cono
scene.add(cone);

// Cargar textura para el cubo
const textureLoader = new THREE.TextureLoader();
textureLoader.load('mi-textura.jpg', function(texture) {
    const materialTextured = new THREE.MeshBasicMaterial({ map: texture });
    const texturedCube = new THREE.Mesh(geometryCube, materialTextured);
    scene.add(texturedCube);
});

// Posicionar la cámara
camera.position.z = 5;

// Animación de objetos
function animate() {
    requestAnimationFrame(animate);

    // Rotar y mover el cubo
    cube.rotation.x += 0.01; // Cambiar a rotación constante
    cube.rotation.y += 0.01;

    // Rotar y mover la esfera
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    // Rotar y mover el cono
    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Iniciar la animación
animate();
