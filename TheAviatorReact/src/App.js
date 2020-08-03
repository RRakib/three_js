import React, {useState, useEffect} from 'react';
import * as THREE from 'three';
import {Canvas} from 'react-three-fiber';
import Ground from './threeComponents/cardrive/ground';
import Sky from './threeComponents/cardrive/Sky';
import Airplane from './threeComponents/cardrive/Airplane';
import Control from './control/control'


function App() {
  
  return (
    <Canvas
      gl={{alpha: true, antialias: true}}
      onCreated={({gl, camera}) => {
        console.log(camera)
        gl.shadowMap.enabled = true;
      }}
      camera={{fov: 60, near: 1, far: 10000, position: [0,40,170]}}>
      <fog attach="fog" args={['#bae4e4', 50, 950]} />
      <hemisphereLight args={[ 0xaaaaaa, 0x000000, .9]}/>
      <ambientLight args={[0xffffff, .1]} />
      <directionalLight  
        color={0xffffff} 
        intensity={.6} 
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
       {/* <Control /> */}
      <Airplane bodyColor={'#EE9393'} controlOther={.095} position={{x: -420, y: -50, z: 0}} zoom={-470} />
      <Airplane bodyColor={'#8F8BFF'} zoom={-60} control />
      <Airplane bodyColor={'#1CA4C7'} controlOther={.07} position={{x: 150, y: 80, z: 0}} zoom={-300} />
      <Airplane bodyColor={'#DB9EE2'} controlOther={-.08} position={{x: 450, y: -110, z: 0}} zoom={-450} />
      <Sky />
      <Ground />
    </Canvas>
  );
}

export default App;