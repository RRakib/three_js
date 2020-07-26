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
    scene.background = new THREE.Color('#c3c3c3')
    
    
    const radiusTop = 5
    const radiusBottom = 5
    const height = 20
    const radialSegments  = 15;  
    const sphereGeometry = new THREE.SphereGeometry( 15, 15, 15 );
    const material = new THREE.MeshPhongMaterial( {color: '#1c9fb1', shading: THREE.FlatShading,} );
    const sphere = new THREE.Mesh( sphereGeometry, material );
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    
    let spheregeo = new THREE.EdgesGeometry( sphere.geometry );
    let spherelineMatarial = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    let spherewireframe = new THREE.LineSegments( spheregeo, spherelineMatarial );

    sphere.add(spherewireframe)
    
    const newCube = (color, xPosition) => {
        const metarial = new THREE.MeshPhongMaterial({
            color, 
            shading: THREE.FlatShading,})
        const cube = new THREE.Mesh(geometry, metarial);
        var geo = new THREE.EdgesGeometry( cube.geometry );
        var lineMatarial = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
        var wireframe = new THREE.LineSegments( geo, lineMatarial );
        cube.add(wireframe)
        cube.position.x = xPosition
        
        return cube
    }
    
    const cubes = [newCube('#1c9fb1', -25), newCube('#1c9fbb', 0), newCube('#1c9fb2', 25)]
    
    cubes.forEach((item, index) => {
        scene.add(item);
        scene.add(sphere);
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
            sphere.rotation.x += (wEvent.clientX + index * 50) / 50000
            sphere.rotation.y += (wEvent.clientY + index * 50) / 50000
    
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
    
    
            renderer.render(scene, camera);
            requestAnimationFrame(render)
        }
        requestAnimationFrame(render)
    }
})