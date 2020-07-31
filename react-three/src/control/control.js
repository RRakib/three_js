import React, {useRef} from 'react'
import {extend, useThree, useFrame} from 'react-three-fiber';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

extend({OrbitControls});

const Control = () => {
    const {camera, gl} = useThree();
    const orbitRef = useRef()
    useFrame(() => {
        orbitRef.current.update()
    })
    return (
        <orbitControls 
            args={[camera, gl.domElement]}
            ref={orbitRef}
        />
    )
}

export default Control