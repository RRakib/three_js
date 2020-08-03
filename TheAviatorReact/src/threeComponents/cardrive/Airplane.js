import React, {useRef, useEffect} from 'react';
import {useFrame, useThree} from "react-three-fiber";

let mousePos = { x: 0, y: 0 };
let randomVal = .001;
let randomValOther = 0

export default function Airplane({position, zoom, control, bodyColor, controlOther}) {
    let propeller = useRef()
    let planeRef = useRef()
    let planeBody = useRef()


    const {camera} = useThree()

    useFrame(() => {
        propeller.current.rotation.x += .5;
        planeRef.current.position.z = zoom;
        if(position){
            planeRef.current.position.x = position.x;
            planeRef.current.position.y = position.y;
        }
        if(control){
            planeRef.current.position.y += (normalize(mousePos.y + .2,-.75,.30,-80, 75) - planeRef.current.position.y) * .1;
            camera.position.z += (normalize(mousePos.x,-1,1,130, 300) - camera.position.z) * .1;
            planeRef.current.rotation.z = (normalize(mousePos.y + .25,-.75,.30,-90, 75) - planeRef.current.position.y) * .0128;
        }
        if(controlOther){
            if(randomValOther >= .2 || randomValOther <= -1){
                randomVal = -randomVal
            }

            randomValOther += randomVal;
            planeRef.current.position.y += (normalize(randomValOther + .2,-.75,.30,-1000, 75) - planeRef.current.position.y) * controlOther;
            planeRef.current.rotation.z = (normalize(randomValOther,-.75,.30,-90, 75) - planeRef.current.position.y) * .00128;
            planeRef.current.rotation.x = (planeRef.current.position.y - normalize(randomValOther,-.65,.10,-(randomValOther * 30), 75)) * .0064;
        }
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
        let nv = Math.max(Math.min(v,vmax), vmin); // Mathametical if / else that checks if my mouse value is greater/smaller then the value i provide and restrict accordingly.
        let dv = vmax-vmin;
        let normalizeFormula = (nv-vmin) / dv; // This is normalize formula
        let pc = normalizeFormula * (tmax - tmin) + tmin; // As mouse points are too small and i need to fly the plane for the full height 
        return pc;
      }

    return (
        <group scale={[.25,.25,.25]} ref={planeRef} >
           <mesh castShadow receiveShadow>
                <boxGeometry attach={"geometry"} args={[85,60,55,1,1,1]} ref={planeBody} />   
                <meshPhongMaterial attach="material" color={bodyColor} flatShading />
            </mesh> 
            <mesh castShadow receiveShadow position={[50,0,0]} rotation={[0,0,10.96]}>
                <coneGeometry attach={"geometry"} args={[23,50,8]} />   
                <meshPhongMaterial attach="material" color={0xd8d0d1} flatShading />
            </mesh> 
            <mesh castShadow receiveShadow position={[-45,25,0]}>
                <boxGeometry attach={"geometry"} args={[15,20,5,1,1,1]} />   
                <meshPhongMaterial attach="material" color={bodyColor} flatShading />
            </mesh> 
            <mesh castShadow receiveShadow>
                <boxGeometry attach={"geometry"} args={[40,8,150,1,1,1]} />   
                <meshPhongMaterial attach="material" color={bodyColor} flatShading />
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
