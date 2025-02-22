import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// load image
const loadingManager = new THREE.LoadingManager;
const texture = new THREE.TextureLoader(loadingManager).load('/textures/Moon.png');

texture.colorSpace = THREE.SRGBColorSpace;

loadingManager.onLoad = () => {
    console.log("onLoad");
}
loadingManager.onProgress = () => {
    console.log("onProgress");
}
loadingManager.onError = () => {
    console.log("onError");
}

texture.generateMipmaps = false;
texture.magFilter = THREE.NearestFilter;

// CREATE SCENE
const scene = new THREE.Scene();

const canvas = document.querySelector('canvas.webgl');

// create objects
const goemetry = new THREE.SphereGeometry(1, 32, 15);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(goemetry, material);
scene.add(mesh);

// sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// create camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()