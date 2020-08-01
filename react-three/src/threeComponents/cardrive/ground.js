import * as THREE from 'three';
import React, {useRef,useEffect} from 'react';
import {useFrame} from 'react-three-fiber';

export default function Ground() {

    const groundRef = useRef()

    useFrame(() => { 
        groundRef.current.rotation.y -= .005 
    })

    useEffect(() => {
        groundRef.current.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/1.8));
        groundRef.current.position.y = -690 
        groundRef.current.position.z = 200 
    }, [])

    return (
        <mesh receiveShadow ref={groundRef}>
            <cylinderGeometry attach="geometry" args={[600,600,800,40, 10]} />
            <meshPhongMaterial attach="material" color={0x68c3c0} transparent opacity={.6} flatShading />
        </mesh>
    )
}
