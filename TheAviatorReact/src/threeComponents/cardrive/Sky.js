import React, {useRef}  from 'react';
import Cloud from './cloud';
import {useFrame} from "react-three-fiber";


export default function Sky() {
    let skyRef = useRef()

    useFrame(() => {
        skyRef.current.rotation.z += .008
    })

    let nClouds = 20;
    let stepAngle = Math.PI*2 / nClouds;
    let sky=[]
    for(var i=0; i< nClouds; i++){
	 
		var a = stepAngle*i; // this is the final angle of the cloud
		var h = 750 + Math.random()*200; // this is the distance between the center of the axis and the cloud itself

		// Trigonometry!!! I hope you remember what you've learned in Math :)
		// in case you don't: 
		// we are simply converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
		let posY = Math.sin(a)*h;
		let posX = Math.cos(a)*h;

		// rotate the cloud according to its position
		let rotZ = a + Math.PI/2;

		// for a better result, we position the clouds 
		// at random depths inside of the scene
		let posZ = -400-Math.random()*400;
		
		// we also set a random scale for each cloud
		var scaleP = 1+Math.random()*2;
	
        
		sky.push(<Cloud key={i} posY={posY} posX={posX} posZ={posZ} rotZ={rotZ} scaleP={scaleP} />)
	}  

    return (
        <group position={[0,-750,-10]} ref={skyRef}>
            {sky}
        </group>
    )
}
