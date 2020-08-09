import * as THREE from 'three';
import React, {useRef,useEffect} from 'react';
import {useFrame} from 'react-three-fiber';

export default function Ground() {

    const seaRef = useRef()
    const groundRef = useRef()
    let waves = [];

    useFrame(() => { 
        let verts = seaRef.current.vertices;
        let l = verts.length;
        
        for (let i=0; i<l; i++){
            let v = verts[i];
            
            // get the data associated to it
            let vprops = waves[i];
            
            // update the position of the vertex
            v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
            v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;
    
            // increment the angle for the next frame
            vprops.ang += vprops.speed;
    
        }
    
        // Tell the renderer that the geometry of the sea has changed.
        // In fact, in order to maintain the best level of performance, 
        // three.js caches the geometries and ignores any changes
        // unless we add this line
        seaRef.current.verticesNeedUpdate=true;
        groundRef.current.rotation.y -= .005 
    })

    useEffect(() => {
        seaRef.current.mergeVertices();
        groundRef.current.rotation.x = -Math.PI/1.8;
        groundRef.current.position.y = -690 
        groundRef.current.position.z = 200 
        let l = seaRef.current.vertices.length;

        for (let i=0; i < l; i++){
            let v = seaRef.current.vertices[i];

            waves.push({y:v.y,
                        x:v.x,
                        z:v.z,
                        ang:Math.random()*Math.PI*2,
                        amp:5 + Math.random()*20,
                        speed:0.016 + Math.random()*0.032});
        };
    }, []);

    


    return (
        <mesh receiveShadow ref={groundRef}>
            <cylinderGeometry attach="geometry" args={[600,600,800,40, 10]} ref={seaRef} />
            <meshPhongMaterial attach="material" color={'#58CC96'} transparent opacity={.6} flatShading />
        </mesh>
    )
}
