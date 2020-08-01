import React, {useState, useEffect} from 'react';
import * as THREE from 'three';
import {Canvas} from 'react-three-fiber';
import Ground from './threeComponents/cardrive/ground';
import Sky from './threeComponents/cardrive/Sky';
import Airplane from './threeComponents/cardrive/Airplane';

function App() {

  let [mousePos, setMousepos] = useState({x: 0, y: 0});
  
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
  })

  const handleMouseMove = (event) => {
    
    var tx = -1 + (event.clientX / window.innerWidth)*2;
    
    var ty = 1 - (event.clientY / window.innerHeight)*2;
    
    setMousepos({x:tx, y:ty});
  }


  return (
    <Canvas
      gl={{alpha: true, antialias: true}}
      onCreated={({gl, camera}) => {
        console.log(camera)
        gl.shadowMap.enabled = true;
      }}
      camera={{fov: 60, near: 1, far: 10000, position: [0,40,170]}}>
      <fog attach="fog" args={[0xf7d9aa, 0, 950]} />
      <hemisphereLight args={[ 0xaaaaaa, 0x000000, .9]}/>
      <directionalLight  
        color={0xffffff} 
        intensity={.9} 
        castShadow 
        position={[150, 350, 250]}
        shadowCameraBottom={-400}
        shadowCameraLeft={-400}
        shadowCameraRight={400}
        shadowCameraTop={400}
        shadowCameraNear={1}
        shadowCameraFar={1000}
        shadowMapWidth={2048}
        shadowMapHeight={2048}
       />
      <Airplane mouseXpos={mousePos.x} mouseYpos={mousePos.y} />
      <Sky />
      <Ground />
    </Canvas>
  );
}

export default App;