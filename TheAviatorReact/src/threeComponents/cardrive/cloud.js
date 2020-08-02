import React from 'react';
import * as THREE from 'three';

export default function Cloud({posY, posX, posZ, rotZ, scaleP}) {
    let meshes = [];
    let nBlocs = 3+Math.floor(Math.random()*3);

	for (var i=0; i<nBlocs; i++ ){
        let scale = .1 + Math.random()*.9
        meshes.push(
            <mesh 
                key={i} 
                castShadow 
                receiveShadow 
                scale={[scale,scale,scale]} 
                position={[i*15, Math.random()*10, Math.random()*10]} 
                rotation={[0, Math.random()*Math.PI*2, Math.random()*Math.PI*2]}>
                    <sphereGeometry attach="geometry" args={[18,5,3]} />
                    <meshPhongMaterial attach="material" color={0xd8d0d1} flatShading />
            </mesh>
        )
    } 
    
    return (
        <group position={[posX, posY, posZ]} rotation={[0,0,rotZ]} scale={[scaleP,scaleP,scaleP]}>
            {meshes}
        </group>
    )
}
