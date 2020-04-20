const canvas = document.getElementById('particularCanv')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize( window.innerWidth, window.innerHeight );

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;  // the canvas default
const near = 0.1;
const far = 500;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;


const scene = new THREE.Scene()


const geometry = new THREE.BoxGeometry();
const metarial = new THREE.MeshBasicMaterial({color: 0x44aa88});


const cube = new THREE.Mesh(geometry, metarial)


scene.add(cube);

renderer.render(scene, camera);