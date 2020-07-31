import React, {useState, useRef} from 'react';
import {useSpring, animated} from 'react-spring/three';


export const Box = () => {
    const [state, setState] = useState({
        hovered: false,
        active: false
    });

    const {hovered, active} = state;
    
    const props = useSpring({
        color: hovered ? "gray" : "hotpink",
        size: active ? [1.5,1.5,1.5] : [1,1,1],
    })

    const activePointer = () => {
        setState((prevState) => ({
            ...state,
            active: !prevState.active
        }))
    }

    const chnagePointer = () => {
        setState((prevState) => ({
            ...state,
            hovered: !prevState.hovered
        }))
    }

    return (
        <animated.mesh 
            onPointerOver={chnagePointer} 
            onPointerOut={chnagePointer} 
            onPointerDown={activePointer} 
            scale={props.size}>
            <animated.boxBufferGeometry attach="geometry" args={[1,1,1]} />
            <animated.meshBasicMaterial 
                attach="material" 
                color={props.color} />
        </animated.mesh>
    )
}