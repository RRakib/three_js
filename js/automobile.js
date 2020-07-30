const canvas = document.getElementById("particularCanv")
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
})


// Camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = .1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;


// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#dddddd');


// Car
const carSpace = new THREE.Object3D();
carSpace.position.x = 20
scene.add(carSpace)


// Frame
const boxGeometry = new THREE.BoxGeometry(3,.3, 1.5);
const boxMet = new THREE.MeshPhongMaterial( {color: 'red', shininess: 30} );
const cube = new THREE.Mesh(boxGeometry, boxMet);
cube.position.y = -2;


// Hood
const hoodGeometry = new THREE.BoxGeometry(2,1, 1.4);
const hoodMet = new THREE.MeshPhongMaterial( {color: 'darkred', shininess: 30} );
const hood = new THREE.Mesh(hoodGeometry, hoodMet);
hood.position.y = -1.6
hood.position.x = .3


// Floor
const floorSpace = new THREE.Object3D()
scene.add(floorSpace)

const floorGeom = new THREE.PlaneGeometry(50,50);
var textureGrass = new THREE.TextureLoader().load( 'texture/grass.jpg' );
textureGrass.wrapS = THREE.RepeatWrapping;
textureGrass.wrapT = THREE.RepeatWrapping;
const floorMet = new THREE.MeshBasicMaterial( { map: textureGrass} );
const floor = new THREE.Mesh(floorGeom, floorMet);
floorMet.side = THREE.DoubleSide;
floor.rotation.x = -29.86
floor.position.y = -2.55
floorSpace.add(floor)

const floorMidGeom = new THREE.PlaneGeometry(50,5);
var textureRoad = new THREE.TextureLoader().load( 'texture/Road.jpg' );
textureRoad.wrapS = THREE.RepeatWrapping;
textureRoad.wrapT = THREE.RepeatWrapping;
const floorMidMet = new THREE.MeshBasicMaterial( { map: textureRoad} );
const floorMid = new THREE.Mesh(floorMidGeom, floorMidMet);
floorMidMet.side = THREE.DoubleSide;
floorMid.rotation.x = -29.86
floorMid.position.y = -2.54
floorSpace.add(floorMid)

const pointerLight = new THREE.PointLight( 'white', 1 );
camera.add(pointerLight);
scene.add(camera)

const controls = new THREE.OrbitControls( camera, renderer.domElement );
const arrayDummy = [...Array(3).keys()];

carSpace.add(cube)
carSpace.add(hood)
    arrayDummy.forEach((item, index) => {
        const tireGeom = new THREE.CylinderGeometry(.3,.3,.2, 32);
        const tireMet = new THREE.MeshPhongMaterial( {color: '#eeeeee', shininess: 30} );
        const tireMesh = new THREE.Mesh( tireGeom, tireMet );
        tireMesh.position.x = -1 + (index + 1 *  .001);
        tireMesh.rotation.x =20.42;
        tireMesh.position.y =-2.2;
        tireMesh.position.z =-.85;
        
        carSpace.add(tireMesh)
    })

const arrayFront = [...Array(3).keys()];

carSpace.add(cube)
    arrayDummy.forEach((item, index) => {
        const tireGeom = new THREE.CylinderGeometry(.3,.3,.2, 32);
        const tireMet = new THREE.MeshPhongMaterial( {color: '#eeeeee', shininess: 30} );
        const tireMesh = new THREE.Mesh( tireGeom, tireMet );
        tireMesh.position.x = -1 + (index + 1 *  .001);
        tireMesh.rotation.x =20.42;
        tireMesh.position.y =-2.2;
        tireMesh.position.z =.85;
        
        carSpace.add(tireMesh)
    })

function render(time){
    // time *= .0007;
    // cube.rotation.x = time;
    // cube.rotation.y = time;
    renderer.render(scene, camera);
    requestAnimationFrame(render)
}


requestAnimationFrame(render)