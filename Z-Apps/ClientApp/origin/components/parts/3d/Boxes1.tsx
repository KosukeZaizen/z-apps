import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh: React.MutableRefObject<THREE.Mesh> = useRef()

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={e => setActive(!active)}
            onPointerOver={e => setHover(true)}
            onPointerOut={e => setHover(false)}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'green'} />
        </mesh>
    )
}

export default class Boxes1 extends React.Component<{},{
    width: number;
    height: number;
}> {

    constructor(props){
        super(props);

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        setInterval(()=>{
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }, 200);
    }

    render() {
        const {width, height} = this.state;
        return (
            <div style={{
                width,
                height,
                backgroundColor: "black",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -100,
            }}>
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[-0.5, 0.5, 0]} />
                    <Box position={[0.5, 0.5, 0]} />
                    <Box position={[-0.5, -0.5, 0]} />
                    <Box position={[0.5, -0.5, 0]} />
                </Canvas>
            </div>
        );
    }
}