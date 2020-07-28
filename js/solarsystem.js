const canvas = document.getElementById('particularCanv');
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(window.innerWidth, window.innerHeight);

// Camera
const fov = 40;
const aspect = window.innerWidth/window.innerHeight;
const near = .1;
const far = 1000;
const camera = new THREE.Camera(fov, aspect, near, far);
camera.position.z = 120; 

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#ffffff');

const objects = [];

const radius = 1;
const widthSegment = 6;
const heightSegment = 6;
const sphereGeometry = new THREE.SphereGeometry(radius, widthSegment, heightSegment);

const sunMetarial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00})
const sunMesh = new THREE.Mesh(sphereGeometry, sunMetarial);
sunMesh.scale.set(5, 5, 5);
scene.add(sunMesh);
objects.push(sunMesh)


function startLoop(){
    renderer.render(scene, camera)
}

requestAnimationFrame(startLoop)