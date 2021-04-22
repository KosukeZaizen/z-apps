import * as React from "react";
import { AnchorLink } from "./HashScroll";
import "./PleaseScrollDown.css";

interface Props {
    criteriaRef: React.RefObject<HTMLElement>;
    screenHeight?: number;
    screenWidth?: number;
    targetId?: string;
}
export default class PleaseScrollDown extends React.Component<
    Props,
    {
        pleaseScrollDown: boolean;
    }
> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pleaseScrollDown: false,
        };

        window.addEventListener("scroll", this.judge);
    }

    componentDidMount() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.judge();
            }, i * 1000);
        }
    }

    componentDidUpdate(previousProps: Props) {
        if (
            previousProps.criteriaRef.current !== this.props.criteriaRef.current
        ) {
            this.judge();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.judge);
    }

    judge = () => {
        const { screenHeight, criteriaRef } = this.props;
        const elem = criteriaRef && criteriaRef.current;
        if (!elem) return;

        const height = screenHeight || window.innerHeight;

        const offsetY = elem.getBoundingClientRect().top;
        const t_position = offsetY - height;

        if (t_position >= 0) {
            // 上側の時
            this.setState({
                pleaseScrollDown: true,
            });
        } else {
            // 下側の時
            this.setState({
                pleaseScrollDown: false,
            });
        }
    };

    render() {
        const { pleaseScrollDown } = this.state;
        const { screenWidth, criteriaRef, targetId } = this.props;
        const elem = criteriaRef && criteriaRef.current;
        const width = screenWidth || window.innerWidth;
        if (!elem) return null;

        return (
            <div className="center">
                <div
                    style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        zIndex: pleaseScrollDown ? 999999990 : 0,
                        width: `${width}px`,
                        height: "70px",
                        opacity: pleaseScrollDown ? 1.0 : 0,
                        transition: "all 2s ease",
                        fontSize: "x-large",
                        backgroundColor: "#EEEEEE",
                        borderRadius: "30px 30px 0px 0px",
                    }}
                >
                    <span id="pleaseScroll">
                        <span></span>
                        <AnchorLink
                            targetHash={`#${targetId || (elem && elem.id)}`}
                        >
                            Scroll
                        </AnchorLink>
                    </span>
                </div>
            </div>
        );
    }
}
