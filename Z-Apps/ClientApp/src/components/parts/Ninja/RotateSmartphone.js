import React from 'react';
import rotatePhone from './img/rotate-phone.png';


export default class RotatePhone extends React.Component {

    render() {
        let imgStyle = {
            backgroundColor: "white",
        }
        return (
            <div id="rotatePhone">
                <p>Please rotate your phone.</p>
                <img width="100%" style={imgStyle} src={rotatePhone} alt="Please rotate your phone." />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export { RotatePhone };