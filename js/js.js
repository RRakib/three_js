const canvas = document.getElementById('particularCanv')
const renderer = new THREE.WebGLRenderer({canvas})

renderer.setSize( window.innerWidth, window.innerHeight );

const fov = 75;
let aspect = window.innerWidth / window.innerHeight;  // the canvas default
const near = 0.1;
const far = 500;
let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;


window.addEventListener('resize', () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
})


const scene = new THREE.Scene()


const geometry = new THREE.BoxGeometry();


const newCube = (color, xPosition) => {
    const metarial = new THREE.MeshPhongMaterial({color: color});
    const cube = new THREE.Mesh(geometry, metarial)
    cube.position.x = xPosition
    
    return cube
}

const cubes = [newCube('red', 5), newCube('yellow', 0), newCube('aqua', -5)]

cubes.forEach(item => {
    scene.add(item);
    scene.add(item);
    scene.add(item);
    animateCube(item)
})



const lightColor = 0xFFFFFF
const intensity = 1
const light = new THREE.DirectionalLight(lightColor, intensity)
light.position.set(-1, 2, 10)

scene.add(light)


function animateCube (cube) {
    const render = () => {
        cube.rotation.x += .02
        cube.rotation.y += .02

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();


        renderer.render(scene, camera);
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}