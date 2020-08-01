import React from 'react';
import * as THREE from 'three';
import {Canvas} from 'react-three-fiber';
import Control from './control/control';
import Floor from './threeComponents/Floor';
import Box from './threeComponents/Box';

function App() {

  return (
    <Canvas
      onCreated={({gl}) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap
      }}
      camera={{fov: 60, near: 1, far: 10000, position: [0,200,100]}}>
      <fog attach="fog" args={[0xf7d9aa, 100, 950]} />
      <Control />
      <hemisphereLight args={[ 0xaaaaaa, 0x000000, .9]}/>
      <directionalLight position={[150,350,350]} args={[0xffffff, .9]} castShadow />
      <Box />
      <Floor />
    </Canvas>
  );
}

export default App;
