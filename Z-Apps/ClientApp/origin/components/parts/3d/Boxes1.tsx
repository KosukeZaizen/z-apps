import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Frame from './Frame';

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh: React.MutableRefObject<THREE.Mesh> = useRef()
    const mesh2: React.MutableRefObject<THREE.Mesh> = useRef()

    // Set up state for the hovered and active state
    const [char, setChar] = useState("");

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
        if (!mesh2.current) return;
        mesh2.current.rotation.y = mesh2.current.rotation.z += 0.01
    });
    const color = char === "〇" ? "hotpink" : char === "×" ? "green" : "gray";

    return (
        char === "" ?
            <mesh
                {...props}
                ref={mesh}
                scale={[0.8, 0.8, 0.8]}
                onClick={e => setChar("×")}
            >
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <meshStandardMaterial attach="material" color={color} />
            </mesh>
            :
            char === "×" ?
                <>
                    <mesh
                        {...props}
                        ref={mesh}
                        scale={[0.8, 0.8, 0.8]}
                    >
                        <boxBufferGeometry attach="geometry" args={[0.2, 0.2, 1]} />
                        <meshStandardMaterial attach="material" color={color} />
                    </mesh>
                    <mesh
                        {...props}
                        ref={mesh2}
                        scale={[0.8, 0.8, 0.8]}
                    >
                        <boxBufferGeometry attach="geometry" args={[0.2, 1, 0.2]} />
                        <meshStandardMaterial attach="material" color={color} />
                    </mesh>
                </>
                :
                <mesh
                    {...props}
                    ref={mesh}
                    scale={[0.8, 0.8, 0.8]}
                >
                    <torusGeometry attach="geometry" args={[0.5, 0.15, 64, 100]} />
                    <meshStandardMaterial attach="material" color={color} />
                </mesh>
    )
}

export default class Boxes1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chars: [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ],
            turn: true
        }
    }

    render() {
        const boxes = [];
        for (let x = -1; x <= 1; x = (x + 1) | 0) {
            for (let y = -1; y <= 1; y = (y + 1) | 0) {
                boxes.push(<Box position={[x, y, 0]} />);
            }
        }
        return (
            <Frame>
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    {boxes}
                </Canvas>
            </Frame>
        );
    }
}