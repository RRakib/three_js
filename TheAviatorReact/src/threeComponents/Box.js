import React, {useRef} from 'react'
import {useFrame} from 'react-three-fiber';
import {useSpring} from 'react-spring/three';

export default function Box() {
    const boxRef = useRef()

    // useSpring()

    useFrame(() => {
        boxRef.current.rotation.x += .01;
        boxRef.current.rotation.y += .01;
    })
    return (
        <mesh ref={boxRef} scale={[30,30,30]} receiveShadow>
            <boxGeometry attach="geometry" args={[1,1,1]} />
            <meshPhysicalMaterial attach="material" color={'red'} />
        </mesh>
    )
}
