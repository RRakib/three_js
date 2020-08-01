import React from 'react'
import * as THREE from 'three'

export default function Floor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -80, 0]} castShadow>
            <planeBufferGeometry attach="geometry" args={[550,550,550]} />
            <meshPhongMaterial attach="material" color="#aaaaaa" side={THREE.DoubleSide} />
        </mesh>
    )
}
