import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = 2;
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// let time = Date.now();

// const clock = new THREE.Clock();

gsap.to(mesh.position, {
    x: 2,
    duration: 2,
})

const tik = () => {

    // mesh.position.x += 0.01;
    // mesh.position.y += 0.01;

    // const currentTime = Date.now();
    // const deltaTime = currentTime - time;
    // time = currentTime;

    // mesh.rotation.y += 0.001 * deltaTime;
    // mesh.rotation.x += 0.001 * deltaTime;

    // const elaspedTime = clock.getElapsedTime();
    // console.log(elaspedTime);

    // mesh.rotation.y = elaspedTime;
    // mesh.rotation.x = elaspedTime;

    // mesh.position.y = Math.sin(elaspedTime);
    // mesh.position.x = Math.cos(elaspedTime);
    renderer.render(scene, camera)
    window.requestAnimationFrame(tik);
}

tik();