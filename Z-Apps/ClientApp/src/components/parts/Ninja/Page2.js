import React from 'react';
import run from './img/ninja_hashiru.png';
import red from './img/background/furuie5.jpg';
import { Obj } from './class/obj';


export default class Page2 extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
        };
        this.state = {

        };
    }

    render() {
        let pageStyle = {
            position: "absolute",
            top: 0,
            left:0,
            width: "100%",
            height: "100%",
//            backgroundImage: `url(${red})`,
        };

        return (
            <div id="page2" style={pageStyle}>
                <Obj imgSrc={run} imgAlt="Running Ninja" width="20%"/>
            </div>
        );
    }
}

export { Page2 };