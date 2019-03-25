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

        return (
            <div>
                <img src={this.props.imgSrc} alt={this.props.imgAlt} width={this.props.width}/>
            </div>
        );
    }
}

export { Obj };
