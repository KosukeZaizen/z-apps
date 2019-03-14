import React from 'react';
import './Footer.css';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <center>
                    <div className="container text-muted">

                        <span className="text-muted">Copyright Kosuke Zaizen. All rights reserved.<span className='hidden-xs'>　　</span><span className='visible-xs'><br /></span></span>


                        <a>Terms of Use</a>

                    </div>
                </center>
            </footer>);
    }
}
