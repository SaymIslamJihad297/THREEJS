import * as THREE from "three";

const canvas = document.querySelector('canvas.webgl');
// console.log(canvas);



// scene
const scene = new THREE.Scene();

// object
const geometry = new THREE.BoxGeometry(1, 1, 1); // this will create a box (cube) with width heigh and depth of 1 each unit
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // this will give the flat color to the object
const mesh = new THREE.Mesh(geometry, material); // mesh is the combinition of geometry and material. it represent a 3d object that can be rendered in a scene
scene.add(mesh); // adding the mesh to the scene

// Camera
const sizes = {
    width: 800,
    height: 600,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);