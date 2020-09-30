import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import Head from "../Helmet";

function Box(props: { x: number; y: number; position: number[] }) {
    const { x, y } = props;

    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);

    // This reference will give us direct access to the mesh
    const mesh: React.MutableRefObject<THREE.Mesh> = useRef();

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.x = rotationX;
            mesh.current.rotation.y = rotationY;
        }

        setRotationX(rotationX + 0.01);
        setRotationY(rotationY + 0.01);
    });

    return (
        <mesh position={[x - 1, y - 1, 0]} ref={mesh} scale={[0.6, 0.6, 0.6]}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" color={"green"} />
        </mesh>
    );
}

export default class Boxes extends React.Component<
    {},
    {
        width: number;
        height: number;
    }
> {
    timerId: NodeJS.Timeout;

    constructor(props: {}) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        this.timerId = setInterval(() => {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, 200);
    }

    UNSAFE_componentWillUnmount() {
        //タイムステップ毎のループの終了
        clearInterval(this.timerId);
    }

    render() {
        const boxes = [];
        for (let x = 0; x <= 2; x = (x + 1) | 0) {
            for (let y = 0; y <= 2; y = (y + 1) | 0) {
                boxes.push(
                    <Box
                        x={x}
                        y={y}
                        position={[x - 1, y - 1, 0]}
                        key={`x${x}y${y}`}
                    />
                );
            }
        }
        const { width, height } = this.state;
        return (
            <div
                style={{
                    width,
                    height,
                    backgroundColor: "black",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: -100,
                }}
            >
                <Head
                    title={"Boxes"}
                    desc={"Moving boxes of react-three-fiber!"}
                />
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    {boxes}
                </Canvas>
            </div>
        );
    }
}
