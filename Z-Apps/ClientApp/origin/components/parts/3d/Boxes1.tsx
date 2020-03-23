import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Frame from './Frame';

function Box(props) {
    const {x, y, setChar, char} = props;

    // This reference will give us direct access to the mesh
    const mesh: React.MutableRefObject<THREE.Mesh> = useRef()
    const mesh2: React.MutableRefObject<THREE.Mesh> = useRef()

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
        if (!mesh2.current) return;
        mesh2.current.rotation.x += 0.01
    });
    const color = char === "〇" ? "hotpink" : char === "×" ? "green" : "gray";

    return (
        char === "" ?
            <mesh
                position={[x - 1, y - 1, 0]}
                ref={mesh}
                scale={[0.8, 0.8, 0.8]}
                onClick={e => setChar(x, y)}
            >
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <meshStandardMaterial attach="material" color={color} />
            </mesh>
            :
            char === "×" ?
                <>
                    <mesh
                        position={[x - 1, y - 1, 0]}
                        ref={mesh}
                        scale={[0.8, 0.8, 0.8]}
                    >
                        <boxBufferGeometry attach="geometry" args={[1.1, 0.2, 0.2]} />
                        <meshStandardMaterial attach="material" color={color} />
                    </mesh>
                    <mesh
                        position={[x - 1, y - 1, 0]}
                        ref={mesh2}
                        scale={[0.8, 0.8, 0.8]}
                    >
                        <boxBufferGeometry attach="geometry" args={[0.2, 1.1, 0.2]} />
                        <meshStandardMaterial attach="material" color={color} />
                    </mesh>
                </>
                :
                <mesh
                    position={[x - 1, y - 1, 0]}
                    ref={mesh}
                    scale={[0.8, 0.8, 0.8]}
                >
                    <torusGeometry attach="geometry" args={[0.5, 0.15, 64, 100]} />
                    <meshStandardMaterial attach="material" color={color} />
                </mesh>
    )
}

export default class Boxes1 extends React.Component<{}, { chars, turn }> {

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

    setChar = (x: number, y: number) => {
        const newChars = this.state.chars;
        newChars[x][y] = this.state.turn ? "〇" : "×";
        this.setState({chars: newChars, turn: !this.state.turn});
    }

    render() {
        const { chars, turn } = this.state;

        const boxes = [];
        for (let x = 0; x <= 2; x = (x + 1) | 0) {
            for (let y = 0; y <= 2; y = (y + 1) | 0) {
                boxes.push(
                    <Box
                        x={x}
                        y={y}
                        position={[x - 1, y - 1, 0]}
                        char={chars[x][y]}
                        setChar={this.setChar}
                        turn={turn}
                    />);
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