const canvas = document.getElementById("particularCanv")
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
})

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = .1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxMet = new THREE.MeshPhongMaterial( {color: 'red'} );
const cube = new THREE.Mesh(boxGeometry, boxMet);

const scene = new THREE.Scene();
scene.background = new THREE.Color('#dddddd');

const pointerLight = new THREE.PointLight( 'yellow', 2 );
pointerLight.position.set( 0, 0, 4 );
scene.add( pointerLight );

scene.add(cube)

function render(time){
    time *= .0007;
    cube.rotation.x = time;
    cube.rotation.y = time;
    renderer.render(scene, camera);
    requestAnimationFrame(render)
}


requestAnimationFrame(render)