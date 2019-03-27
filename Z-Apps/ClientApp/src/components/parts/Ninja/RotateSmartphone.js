import React from 'react';
import rotatePhone from './img/rotate-phone.png';


export default class RotatePhone extends React.Component {

    render() {
        return (
            <div id="rotatePhone">
                <p>Please rotate your phone.</p>
                <img width="100%" src={rotatePhone} alt="Please rotate your phone." />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export { RotatePhone };