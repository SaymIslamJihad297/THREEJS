import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


import GUI from 'lil-gui'

const canvas = document.querySelector("canvas.webgl");

const textureLoader = new THREE.TextureLoader();
const door = textureLoader.load('/textures/matcaps/rock1.jpg')
const doorDis = textureLoader.load('/textures/matcaps/rock2.png')

const gui = new GUI();

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);

    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
})

// create scene
const scene = new THREE.Scene();

// create object
const material = new THREE.MeshPhysicalMaterial();
const Sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material,
)
scene.add(Sphere);
material.metalness = 0.6;
material.roughness = 0.45;
material.map = door;
material.map.colorSpace = THREE.SRGBColorSpace;
material.displacementMap = doorDis;
material.displacementScale = 0.08;

gui.add(material, 'displacementScale').min(0).max(3).step(0.0001);
gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);


// material.sheen = 1;
// material.sheenRoughness = 1;
// material.sheenColor.set(1, 1, 1);

// gui.add(material, 'sheen').min(0).max(1).step(0.0001);
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001);
// gui.addColor(material, 'sheenColor');




// sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// create camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Environment
const rgbeLoder = new RGBELoader();
rgbeLoder.load('/textures/environmentMap/kloppenheim_02_4k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = environmentMap;
    scene.environment = environmentMap;
});
// light
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 30);
// scene.add(pointLight);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const tik = () => {

    controls.update();
    renderer.render(scene, camera);

    window.requestAnimationFrame(tik);
}

tik();