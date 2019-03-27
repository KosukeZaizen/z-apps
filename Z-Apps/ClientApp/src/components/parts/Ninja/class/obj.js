import React from 'react';

export default class Obj extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
        };
        this.state = {

        };
    }

    render() {

        let left = this.props.boolLeft ? "" : "scale(-1, 1)";

        let style = {
            position: "absolute",
            left: this.props.x,
            top: this.props.y,
            transform: left,
        }

        return (
            <img
                src={this.props.imgSrc}
                alt={this.props.imgAlt}
                width={this.props.width}
                style={style}
            />
        );
    }
}

export { Obj };
