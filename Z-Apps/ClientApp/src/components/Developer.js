import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/Terms.css';


const Developer = props => (
    <div className="developer">
        <center>
            <h1>Z-Apps<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>Terms of Use</h1>

            <div className="contents">
                <hr />
                <h2>The ownership of website</h2>
                <p>This website is developed and owned by Kosuke Zaizen.
                When you want to use any sentences, images, or programs, you need to get approval from the owner.</p>
                <hr />
                <h2>Responsibility</h2>
                <p>Even if some users of this website have some trouble by defect or bugs of it, the owner of the website can't owe the responsibility regarding that.
                    Users need to use this service by their own responsibility.</p>
                <hr />
                <h2>Contact</h2>
                If there are some trouble, please contact from this link:<br />
                　<a href="https://www.uni-browser.net/?pageId=4" target="_blank" rel="noopener">uni-browser >></a>
            </div>
        </center>
    </div>
);

export default connect()(Developer);
