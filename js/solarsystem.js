const canvas = document.getElementById('particularCanv');
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(window.innerWidth, window.innerHeight);

// Camera
const fov = 40;
const aspect = window.innerWidth/window.innerHeight;
const near = .1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);


// Scene
const scene = new THREE.Scene();

const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.PointLight(color, intensity);
scene.add(light);

const objects = [];

const radius = 1;
const widthSegment = 11;
const heightSegment = 11;
const sphereGeometry = new THREE.SphereGeometry(radius, widthSegment, heightSegment);

const solarSystem = new THREE.Object3D()
scene.add(solarSystem);
objects.push(solarSystem)

const sunMetarial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00})
const sunMesh = new THREE.Mesh(sphereGeometry, sunMetarial);
sunMesh.scale.set(5, 5, 5);
solarSystem.add(sunMesh);
objects.push(sunMesh)

const earthSpace = new THREE.Object3D()
earthSpace.position.x = 10;
scene.add(earthSpace);
objects.push(earthSpace)

const earthMetarial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: '#1a330b'})
const earthMesh = new THREE.Mesh(sphereGeometry, earthMetarial);
earthMesh.scale.set(1.5, 1.5, 1.5);
earthSpace.add(earthMesh);
objects.push(earthMesh)

solarSystem.add(earthSpace)

const moonMetarial = new THREE.MeshPhongMaterial({color: '#cccccc', emissive: '#aaaaaa'})
const moonMesh = new THREE.Mesh(sphereGeometry, moonMetarial);
moonMesh.scale.set(.3, .3, .3);
moonMesh.position.x = 3;
earthSpace.add(moonMesh);
objects.push(moonMesh)


function startLoop(time){
    time *= 0.0007;

    objects.forEach((obj) => {
        obj.rotation.y = time;
      });

    renderer.render(scene, camera)
    requestAnimationFrame(startLoop)
}
requestAnimationFrame(startLoop)