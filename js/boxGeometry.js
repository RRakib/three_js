window.addEventListener("mousemove", (wEvent) => {
    const canvas = document.getElementById('particularCanv')
    const renderer = new THREE.WebGLRenderer({canvas})
    const cursorCustom = document.getElementById('cursor');
    const cursorCustom2 = document.getElementById('testcss2');
    cursorCustom.style.left = (wEvent.clientX - 25) + "px"
    cursorCustom.style.top = (wEvent.clientY - 25) + "px"
    cursorCustom2.style.left = (wEvent.clientX - 25) + "px"
    cursorCustom2.style.top = (wEvent.clientY - 25) + "px"
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    const fov = 40;
    let aspect = window.innerWidth / window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 1000;
    let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 120;
    
    
    window.addEventListener('resize', () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    })
    
    
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#ffffff')
    
    
    const boxWidth = 15
    const boxHeight = 15
    const boxDepth = 15
    const widthSegments = 4;  
    const heightSegments = 4;  
    const depthSegments = 4;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth, widthSegments,
        heightSegments,
        depthSegments);
    
    
    const newCube = (color, xPosition) => {
        const metarial = new THREE.MeshPhongMaterial({color})
        const cube = new THREE.Mesh(geometry, metarial);
        cube.position.x = xPosition
        
        return cube
    }
    
    const cubes = [newCube('#1c9fba', -25), newCube('#1c9fba', 0), newCube('#1c9fba', 25)]
    
    cubes.forEach((item, index) => {
        scene.add(item);
        animateCube(item, index + 1)
    })
    
    
    
    const lightColor = 'aqua'
    const intensity = 1.2
    const light = new THREE.DirectionalLight(lightColor, intensity)
    light.position.set(-1, 2, 10)
    
    scene.add(light)

    console.log(wEvent.clientX / 10000, wEvent.clientY / 10000)
    
    
    function animateCube (cube, index) {
        const render = () => {
            cube.rotation.x += (wEvent.clientX + index * 50) / 10000
            cube.rotation.y += (wEvent.clientY + index * 50) / 10000
    
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
    
    
            renderer.render(scene, camera);
            requestAnimationFrame(render)
        }
        requestAnimationFrame(render)
    }
})