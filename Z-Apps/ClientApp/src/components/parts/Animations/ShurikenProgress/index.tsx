import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import "./animation.css";

const shuriken = require("../../../../img/shuriken.png");

interface Props {
    size?: string;
}
export default function ShurikenProgress({ size }: Props) {
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current as HTMLDivElement | null;
        el && setElement(el);
    }, []);
    const shortLength =
        (element && Math.min(element.clientWidth, element.clientHeight)) || 0;

    const rect = element?.getBoundingClientRect();
    return (
        <div>
            <CircularProgress
                style={{
                    position: "absolute",
                    left: rect?.left,
                    top: rect?.top,
                    width: shortLength,
                    height: shortLength,
                }}
            />
            <img
                ref={ref}
                src={shuriken}
                alt="shuriken"
                className="ShurikenProgress"
                style={{ width: size, height: size }}
            />
        </div>
    );
}
