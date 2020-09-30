import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import Frame from "./Frame";

function Box({
    x,
    y,
    setChar,
    char,
}: {
    x: number;
    y: number;
    position: number[];
    setChar: Function;
    turn: boolean;
    char: string;
}) {
    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);

    // This reference will give us direct access to the mesh
    const mesh: React.MutableRefObject<THREE.Mesh> = useRef();
    const mesh2: React.MutableRefObject<THREE.Mesh> = useRef();
    const mesh3: React.MutableRefObject<THREE.Mesh> = useRef();

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.x = rotationX;
            mesh.current.rotation.y = rotationY;
        }
        if (mesh2.current) {
            mesh2.current.rotation.x = rotationX;
            mesh2.current.rotation.y = rotationY;
            mesh2.current.rotation.z = 0.4;
        }
        if (mesh3.current) {
            mesh3.current.rotation.x = rotationX;
            mesh3.current.rotation.y = rotationY;
            mesh3.current.rotation.z = 0.4;
        }

        setRotationX(rotationX + 0.01);
        setRotationY(rotationY + 0.01);
    });
    const color = char === "〇" ? "hotpink" : char === "×" ? "green" : "gray";

    return char === "" ? (
        <mesh
            position={[x - 1, y - 1, 0]}
            ref={mesh}
            scale={[0.6, 0.6, 0.6]}
            onClick={e => setChar(x, y)}
        >
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" color={color} />
        </mesh>
    ) : char === "×" ? (
        <>
            <mesh
                position={[x - 1, y - 1, 0]}
                ref={mesh2}
                scale={[0.8, 0.8, 0.8]}
            >
                <boxBufferGeometry attach="geometry" args={[1.1, 0.2, 0.2]} />
                <meshStandardMaterial attach="material" color={color} />
            </mesh>
            <mesh
                position={[x - 1, y - 1, 0]}
                ref={mesh3}
                scale={[0.8, 0.8, 0.8]}
            >
                <boxBufferGeometry attach="geometry" args={[0.2, 1.1, 0.2]} />
                <meshStandardMaterial attach="material" color={color} />
            </mesh>
        </>
    ) : (
        <mesh position={[x - 1, y - 1, 0]} ref={mesh} scale={[0.8, 0.8, 0.8]}>
            <torusGeometry attach="geometry" args={[0.4, 0.15, 64, 100]} />
            <meshStandardMaterial attach="material" color={color} />
        </mesh>
    );
}

export default class Boxes1 extends React.Component<
    {},
    { chars: string[][]; turn: boolean }
> {
    constructor(props: {}) {
        super(props);
        this.state = {
            chars: this.getInitialChars(),
            turn: true,
        };
    }

    getInitialChars = () => [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    calculateWinner = (s: string[][]) => {
        const squares = s.flat();
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
        return null;
    };

    setChar = (x: number, y: number) => {
        const newChars = this.state.chars;

        newChars[x][y] = this.state.turn ? "〇" : "×";
        this.setState({ chars: newChars, turn: !this.state.turn });

        const winner = this.calculateWinner(newChars);
        if (winner) {
            setTimeout(() => {
                alert(winner + " win!");
                this.setState({ chars: this.getInitialChars(), turn: true });
            }, 100);
            return;
        }

        const isDraw = newChars.flat().every(v => v !== "");
        if (isDraw) {
            setTimeout(() => {
                alert("Draw game!");
                this.setState({ chars: this.getInitialChars(), turn: true });
            }, 100);
        }
    };

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
                        key={`x${x}y${y}`}
                    />
                );
            }
        }
        return (
            <Frame title="tic-tac-toe game" desc="Enjoy 3D tic-tac-toe game!">
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    {boxes}
                </Canvas>
            </Frame>
        );
    }
}
