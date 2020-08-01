import * as THREE from 'three';
import React, {useRef} from 'react';
import {useFrame} from 'react-three-fiber';

export default function ground() {

    const groundRef = useRef()

    useFrame(() => {
        groundRef.current.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    })


    return (
        <mesh receiveShadow ref={groundRef}>
            <cylinderGeometry attach="geometry" args={[600,600,800,40,10]} />
            <meshPhongMaterial attach="material" color={0x68c3c0} transparent opacity={.6} flatShading />
        </mesh>
    )
}
