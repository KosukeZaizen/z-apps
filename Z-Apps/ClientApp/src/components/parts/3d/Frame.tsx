import React from "react";
import Head from "../Helmet";

interface Props {
    title: string;
    desc: string;
}
interface State {
    width: number;
    height: number;
}
export default class Boxes1 extends React.Component<Props, State> {
    timerId: NodeJS.Timeout;

    constructor(props: Props) {
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

    componentWillUnmount() {
        //タイムステップ毎のループの終了
        clearInterval(this.timerId);
    }

    render() {
        const { width, height } = this.state;
        const { title, desc } = this.props;
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
                <Head title={title} desc={desc} />
                {this.props.children}
            </div>
        );
    }
}
