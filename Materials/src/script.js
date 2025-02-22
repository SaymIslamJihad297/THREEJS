import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from "lil-gui";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


const gui = new GUI();

/**
 * Load Texures
 */

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/8.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// mesh basic material
// const materials = new THREE.MeshBasicMaterial({ map: doorColorTexture });
// materials.map.colorSpace = THREE.SRGBColorSpace;
// materials.transparent = true;
// // materials.opacity = 0.5;
// // materials.alphaMap = doorAlphaTexture;
// materials.side = THREE.DoubleSide;


// MeshNormalMaterial
// const materials = new THREE.MeshNormalMaterial();
// materials.flatShading = true;

// MeshMatcapMaterial
// const materials = new THREE.MeshMatcapMaterial();
// materials.matcap = matcapTexture;

// MeshDepthMaterial
// const materials = new THREE.MeshDepthMaterial();


// MeshLambertMaterial
// const materials = new THREE.MeshLambertMaterial();
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.set(2, 3, 4);
// scene.add(pointLight);

// MeshPhongMaterial
// const materials = new THREE.MeshPhongMaterial();
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.set(2, 3, 4);
// scene.add(pointLight);


// MeshToonMaterial
// const materials = new THREE.MeshToonMaterial();
// materials.gradientMap = gradientTexture;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;


// MeshStandardMaterial
// const materials = new THREE.MeshStandardMaterial();
// materials.metalness = 1; // metalness
// materials.roughness = 1; // roughness
// // materials.color.set("green")
// materials.map = doorColorTexture; //setting the map/door texture
// materials.aoMap = doorAmbientOcclusionTexture; // adding door ambient texture
// materials.aoMapIntensity = 2; // scale of ambeit texture
// materials.displacementMap = doorHeightTexture; // heigh of the black parts
// materials.displacementScale = 0.1 // heigh level
// materials.map.colorSpace = THREE.SRGBColorSpace; // setting the color space
// materials.metalnessMap = doorMetalnessTexture; // setting the door metalness texture
// materials.roughnessMap = doorRoughnessTexture; // setting the door roughness texture
// materials.normalMap = doorNormalTexture; // setting the normal map texture

// gui.add(materials, 'metalness').min(0).max(1).step(0.0001);
// gui.add(materials, 'roughness').min(0).max(1).step(0.0001);

// MeshPhysicalMaterial
const materials = new THREE.MeshPhysicalMaterial();
materials.metalness = 0; // metalness
materials.roughness = 0; // roughness
// materials.color.set("green")
// materials.map = doorColorTexture; //setting the map/door texture
// materials.aoMap = doorAmbientOcclusionTexture; // adding door ambient texture
// materials.aoMapIntensity = 2; // scale of ambeit texture
// materials.displacementMap = doorHeightTexture; // heigh of the black parts
// materials.displacementScale = 0.1 // heigh level
// materials.map.colorSpace = THREE.SRGBColorSpace; // setting the color space
// materials.metalnessMap = doorMetalnessTexture; // setting the door metalness texture
// materials.roughnessMap = doorRoughnessTexture; // setting the door roughness texture
// materials.normalMap = doorNormalTexture; // setting the normal map texture

gui.add(materials, 'metalness').min(0).max(1).step(0.0001);
gui.add(materials, 'roughness').min(0).max(1).step(0.0001);

// clearcoat
// materials.clearcoat = 1;
// materials.clearcoatRoughness = 0;

// gui.add(materials, 'clearcoat').min(0).max(1).step(0.0001);
// gui.add(materials, 'clearcoatRoughness').min(0).max(1).step(0.0001);

// sheen
// materials.sheen = 1;
// materials.sheenRoughness = 0.25;
// materials.sheenColor.set(1, 1, 1);

// //iridescence
// materials.iridescence = 1;
// materials.iridescenceIOR = 1;
// materials.iridescenceThicknessRange = [100, 800];

// Transmission
materials.transmission = 1;
materials.ior = 2.417
materials.thickness = 1;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    materials,
)

materials.side = THREE.DoubleSide;
// scene.add(plane);
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    materials,
)
sphere.position.x = 1.5;
// scene.add(sphere);
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.3, 20, 100),
    materials,
)
torus.position.x = -1.5;
scene.add(plane, sphere, torus);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
/**
 * Light
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.set(2, 3, 4);
// scene.add(pointLight);

/**
 * Environment
 */
const rgbeLoder = new RGBELoader();
rgbeLoder.load('/textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = environmentMap
    scene.environment = environmentMap
});



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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = - 0.15 * elapsedTime
    plane.rotation.x = - 0.15 * elapsedTime
    torus.rotation.x = - 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()