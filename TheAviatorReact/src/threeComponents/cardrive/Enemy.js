import React, {useRef} from 'react';
import {useFrame} from 'react-three-fiber';

export default function Enemy() {
    let enemyRef= useRef();
    let enemyBallRef= useRef([]);
    let enemyHolder = [];
    let angle = 0

    useFrame(() => {
        enemyRef.current.rotation.z += .009
        enemyHolder.forEach((item, index) => {
            angle += .01;
            if (angle > Math.PI*2) angle -= Math.PI*2;
            enemyBallRef.current[index].position.x += Math.cos(-angle)*1.5
            enemyBallRef.current[index].position.y += Math.sin(-angle)*1.5
            enemyBallRef.current[index].rotation.x += .07
            enemyBallRef.current[index].rotation.y += .07
        })
    })

    let nEnemy = (Math.PI * 2) / 12;
    [...Array(12).keys()].forEach(item => {
        let minHeight = Math.random() * 125 + 690;
        console.log(minHeight)
        let actualAng = nEnemy * item
        let y = Math.sin(actualAng) * minHeight;
        let x = Math.cos(actualAng) * minHeight;
        let scalVal = (Math.random() * .25) + 1
        enemyHolder.push(
            <mesh position={[x,y,-60]} scale={[scalVal,scalVal,scalVal]} ref={(el) => (enemyBallRef.current[item] = el)} castShadow receiveShadow>
                <tetrahedronGeometry attach="geometry" args={[Math.random() * 2 + 6,2]} />
                <meshPhongMaterial attach="material"  flatShading color={0xf25346} shininess={0} />
            </mesh>
        )
    })

    return (
        <group position={[0,-750,0]} ref={enemyRef}>
            {enemyHolder}
        </group>
    )
}
