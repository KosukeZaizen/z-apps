import React from 'react';
import run from './img/ninja_hashiru.png';
import furuie from './img/background/furuie5.jpg';
import { Obj } from './class/obj';


export default class Page2 extends React.Component {

    constructor(props) {
        super(props);
        this.consts = {
        };

        let pageSize = this.getWindowSize();
        this.state = {
            pageStyle: {
                width: pageSize.pageWidth,
                height: pageSize.pageHeight,
                backgroundImage: `url(${furuie})`,
            },
        };

        // when screen size is changed
        this.setOnResizeWindow();
    }

    // when screen size is changed
    setOnResizeWindow() {
        let onResizeWindow = () => { this.onResizeWindow(this) };

        let timer = 0;
        window.onresize = function () {
            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = setTimeout(function () {
                onResizeWindow();
            }, 200);
        };
    }

    onResizeWindow() {
        let pageSize = this.getWindowSize();

        this.setState({
            pageStyle: {
                width: pageSize.pageWidth,
                height: pageSize.pageHeight,
                backgroundImage: `url(${furuie})`,
            }
        });
    }

    getWindowSize() {
        let pageWidth, pageHeight;
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;

        if (this.screenWidth > this.screenHeight) {
            //横長
            pageHeight = this.screenHeight;
            pageWidth = parseInt(pageHeight, 10) * 16 / 9 + "px";
        } else {
            //縦長
            pageWidth = this.screenWidth;
            pageHeight = parseInt(pageWidth, 10) * 9 / 16 + "px";
        }

        return { pageWidth: pageWidth, pageHeight: pageHeight};
    }

    render() {
        return (
            <div id="page2" style={this.state.pageStyle}>
                <Obj imgSrc={run} imgAlt="Running Ninja" width="20%" />
            </div>
        );
    }
}

export { Page2 };