import React, {useRef, useEffect} from 'react';
import {useFrame} from "react-three-fiber";

let mousePos = { x: 0, y: 0 };

export default function Airplane() {
    let propeller = useRef()
    let planeRef = useRef()
    let planeBody = useRef()

    useFrame(() => {
        propeller.current.rotation.x += .3;
        planeRef.current.position.y = normalize(mousePos.y,-.75,.30,-90, 75);
        planeRef.current.position.x = normalize(mousePos.x,-.95,.75,-130, 130);
        planeRef.current.position.z = -40;
    });

    useEffect(() => {
        planeBody.current.vertices[4].y-=10;
        planeBody.current.vertices[4].z+=20;
        planeBody.current.vertices[5].y-=10;
        planeBody.current.vertices[5].z-=20;
        planeBody.current.vertices[6].y+=30;
        planeBody.current.vertices[6].z+=20;
        planeBody.current.vertices[7].y+=30;
        planeBody.current.vertices[7].z-=20;    
        document.addEventListener('mousemove', handleMouseMove);
    })
    
    const handleMouseMove = (event) => {
        
        var tx = -1 + (event.clientX / window.innerWidth)*2;
        
        var ty = 1 - (event.clientY / window.innerHeight)*3;
        
        mousePos.x = tx;
        mousePos.y = ty;
    }


    const normalize = (v,vmin,vmax,tmin, tmax) => {
        let nv = Math.max(Math.min(v,vmax), vmin);
        let dv = vmax-vmin;
        let pc = (nv-vmin)/dv;
        let dt = tmax-tmin;
        let tv = tmin + (pc*dt);
        return tv;
      }

    return (
        <group scale={[.25,.25,.25]} ref={planeRef} >
           <mesh castShadow receiveShadow>
                <boxGeometry attach={"geometry"} args={[85,60,55,1,1,1]} ref={planeBody} />   
                <meshPhongMaterial attach="material" color={'#8F8BFF'} flatShading />
            </mesh> 
            <mesh castShadow receiveShadow position={[50,0,0]} rotation={[0,0,10.96]}>
                <coneGeometry attach={"geometry"} args={[24,50,8]} />   
                <meshPhongMaterial attach="material" color={0xd8d0d1} flatShading />
            </mesh> 
            <mesh castShadow receiveShadow position={[-45,25,0]}>
                <boxGeometry attach={"geometry"} args={[15,20,5,1,1,1]} />   
                <meshPhongMaterial attach="material" color={'#8F8BFF'} flatShading />
            </mesh> 
            <mesh castShadow receiveShadow>
                <boxGeometry attach={"geometry"} args={[40,8,150,1,1,1]} />   
                <meshPhongMaterial attach="material" color={'#8F8BFF'} flatShading />
            </mesh>
            <mesh position={[70,0,0]} castShadow receiveShadow ref={propeller}>
                <sphereGeometry attach={"geometry"} args={[5,20,20]} />   
                <meshPhongMaterial attach="material" color={0x23190f} flatShading />
                <mesh castShadow receiveShadow position={[8,0,0]}>
                    <boxGeometry attach={"geometry"} args={[1,100,20,1,1,1]} />   
                    <meshPhongMaterial attach="material" color={'red'} flatShading />
                </mesh>
            </mesh>
        
        </group>
    )
}
