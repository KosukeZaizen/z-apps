import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Text from './Text'
import Head from '../Helmet';
import * as THREE from 'three';
import './css/boxes.css'

function Jumbo() {
    const ref: any = useRef()
    useFrame(({ clock }) => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.3))
    return (
        <group ref={ref}>
            <Text hAlign="left" position={[0, 4.2, 0]} children="REACT" />
            <Text hAlign="left" position={[0, 0, 0]} children="THREE" />
            <Text hAlign="left" position={[0, -4.2, 0]} children="FIBER" />
            <Text hAlign="left" position={[12, 0, 0]} children="4" size={3} />
            <Text hAlign="left" position={[16.5, -4.2, 0]} children="X" />
        </group>
    )
}

let i = 0

// This component was auto-generated from GLTF by: https://github.com/react-spring/gltfjsx
function Bird({ speed, factor, url, ...props }) {
    const glf: any = useLoader(GLTFLoader, url);
    const { nodes, materials, animations } = glf;
    const group: any = useRef();
    const [mixer] = useState(() => new THREE.AnimationMixer(null));
    useEffect(() => void mixer.clipAction(animations[0], group.current).play(), []);
    useFrame((state, delta) => {
        group.current.rotation.y += Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * 1.5;
        mixer.update(delta * speed);
    })

    return (
        <group ref={group}>
            <scene name="Scene" {...props}>
                <mesh
                    name="Object_0"
                    morphTargetDictionary={nodes.Object_0.morphTargetDictionary}
                    morphTargetInfluences={nodes.Object_0.morphTargetInfluences}
                    rotation={[1.5707964611537577, 0, 0]}
                    geometry={nodes.Object_0.geometry}
                    material={materials.Material_0_COLOR_0}
                />
            </scene>
        </group>
    )
}

function Birds(): any {
    return new Array(100).fill(null).map((_, i) => {
        const x = (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1)
        const y = -10 + Math.random() * 20
        const z = -5 + Math.random() * 10
        const bird = ['Stork', 'Parrot', 'Flamingo'][Math.round(Math.random() * 2)]
        let speed = bird === 'Stork' ? 0.5 : bird === 'Flamingo' ? 2 : 5
        let factor = bird === 'Stork' ? 0.5 + Math.random() : bird === 'Flamingo' ? 0.25 + Math.random() : 1 + Math.random() - 0.5
        return <Bird key={i} position={[x, y, z]} rotation={[0, x > 0 ? Math.PI : 0, 0]} speed={speed} factor={factor} url={`/img/${bird}.glb`} />
    })
}

export default class Boxes extends React.Component<{}, {
    width: number;
    height: number;
}> {
    timerId: NodeJS.Timeout;

    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.timerId = setInterval(() => {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }, 200);
    }

    UNSAFE_componentWillUnmount() {
        //タイムステップ毎のループの終了
        clearInterval(this.timerId);
    }

    render() {
        const { width, height } = this.state;
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
                <Head
                    title={"Boxes"}
                    desc={"Moving boxes of react-three-fiber!"}
                />
                <Canvas camera={{ position: [0, 0, 35] }}>
                    <ambientLight intensity={2} />
                    <pointLight position={[40, 40, 40]} />
                    <Suspense fallback={null}>
                        <Jumbo />
                        <Birds />
                    </Suspense>
                </Canvas>
            </div>
        );
    }
}