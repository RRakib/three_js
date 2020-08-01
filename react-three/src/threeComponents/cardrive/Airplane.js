import React, {useRef, useEffect} from 'react';
import {useFrame} from "react-three-fiber";

export default function Airplane({mouseXpos, mouseYpos}) {
    let propeller = useRef()
    let planeRef = useRef()

    useFrame(() => {
        propeller.current.rotation.x += .3
    });

    const normalize = (v,vmin,vmax,tmin, tmax) => {
        let nv = Math.max(Math.min(v,vmax), vmin);
        let dv = vmax-vmin;
        let pc = (nv-vmin)/dv;
        let dt = tmax-tmin;
        let tv = tmin + (pc*dt);
        return tv;
      }

    let targetY = mouseYpos ? normalize(mouseYpos,-.75,.75,25, 175) : 50;
    let targetX = mouseXpos ? normalize(mouseXpos,-.75,.75,-100, 100) : 0;

    return (
        <group scale={[.25,.25,.25]} position={[targetX,targetY,-40]}  ref={planeRef} >
           <mesh castShadow receiveShadow>
                <boxGeometry attach={"geometry"} args={[60,50,50,1,1,1]} />   
                <meshPhongMaterial attach="material" color={0xf25346} flatShading />
            </mesh> 
            <mesh castShadow receiveShadow position={[40,0,0]}>
                <boxGeometry attach={"geometry"} args={[20,50,50,1,1,1]} />   
                <meshPhongMaterial attach="material" color={0xd8d0d1} flatShading />
            </mesh> 
            <mesh castShadow receiveShadow position={[-35,25,0]}>
                <boxGeometry attach={"geometry"} args={[15,20,5,1,1,1]} />   
                <meshPhongMaterial attach="material" color={0xf25346} flatShading />
            </mesh> 
            <mesh castShadow receiveShadow>
                <boxGeometry attach={"geometry"} args={[40,8,150,1,1,1]} />   
                <meshPhongMaterial attach="material" color={0xf25346} flatShading />
            </mesh>
            <mesh position={[50,0,0]} castShadow receiveShadow ref={propeller}>
                <boxGeometry attach={"geometry"} args={[15,20,5,1,1,1]} />   
                <meshPhongMaterial attach="material" color={0x59332e} flatShading />
                <mesh castShadow receiveShadow position={[8,0,0]}>
                    <boxGeometry attach={"geometry"} args={[1,100,20,1,1,1]} />   
                    <meshPhongMaterial attach="material" color={0x23190f} flatShading />
                </mesh>
            </mesh>
        
        </group>
    )
}
