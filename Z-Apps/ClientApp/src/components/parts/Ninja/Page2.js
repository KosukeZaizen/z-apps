import React from 'react';
import run from './img/ninja_hashiru.png';
import furuie from './img/background/furuie5.jpg';
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
            backgroundImage: `url(${furuie})`,
        };

        return (
            <div id="page2-box">
                <div id="page2" style={pageStyle}>
                    <Obj imgSrc={run} imgAlt="Running Ninja" width="20%" />
                </div>
            </div>
        );
    }
}

export { Page2 };