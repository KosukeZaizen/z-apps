import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <center>
                    <div className="container text-muted">
                        <span className="text-muted">Copyright <Link to="/terms">Kosuke Zaizen</Link>. All rights reserved.
                            <span className='hidden-xs'>　　</span>
                            <span className='visible-xs'><br /></span>
                        </span>
                        <Link to="/terms">Terms of Use</Link>
                    </div>
                </center>
            </footer>);
    }
}
