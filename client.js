import * as THREE from './build/three.module.js';
// console.log(THREE);
import { OrbitControls } from './jsm/controls/OrbitControls.js';
// console.log(OrbitControls);
import Stats from  './jsm/libs/stats.module.js';
// console.log(Stats);

let scene;
let camera;
let renderer;
const canvas = document.querySelector('.webgl');

scene = new THREE.Scene();

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.001;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
}); 
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

const controls = new OrbitControls(camera, renderer.domElement); // mouse controls



// Earth
const earthGeometry = new THREE.SphereGeometry(0.6, 200, 200);
const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 0.009,
    metalness: 0.009,
    map: THREE.ImageUtils.loadTexture('texture/earthmap4k.jpg'),
    bumpMap: THREE.ImageUtils.loadTexture('texture/earthbump4k.jpg'),
    bumpScale: 0.05
  
});
const earthDetail = new THREE.MeshPhongMaterial({
    bumpMap: THREE.ImageUtils.loadTexture('texture/earthspec4k.jpg'),
    bumpScale: 1
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial, earthDetail);
scene.add(earthMesh);

 // Clouds
const cloudGeometry = new THREE.SphereGeometry(0.62, 200, 200);
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
    transparent: true,
});

const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

// Universe Background
const starGeometry = new THREE.SphereGeometry(80, 640, 640);
const starMaterial = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('texture/galaxy.png'),
    side: THREE.BackSide
})
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Spot Light
const light = new THREE.SpotLight(0xffffff,1);
light.position.set(10, 5, 5); // light position (x, y, j)
light.castShadow = true;
scene.add(light);

// Responsive
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);

// Rendering
const animate = () =>{

    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.005; // earth rotation speed on y axis
    earthMesh.rotation.z += 0.00009; // earth rotation speed on z axis
    cloudMesh.rotation.y += 0.006; // clouds rotation speed on y axis
    cloudMesh.rotation.z -= 0.0009; // clouds rotation speed on z axis
    starMesh.rotation.y += 0.0005; // universe rotation speed
    controls.update();
    render();
}
const render = () =>{
    renderer.render(scene, camera);
}


animate();

