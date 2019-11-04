import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Terms.css';
import Head from './parts/Helmet';

const Terms = props => (
    <div className="terms">
        <Head
            title="Terms of Use"
            desc="Lingual Ninja - The ownership of website and Responsibility"
        />
        <center>
            <h1>Lingual Ninja<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>Terms of Use</h1>
            <div className="contents">
                <hr />
                <h2>The ownership of website</h2>
                <p>This website is developed and owned by <Link to="/developer">Kosuke Zaizen</Link>.
                When you want to use any quotes, images, or programs, you must get approval from the owner.</p>
                <hr />
                <h2>Responsibility</h2>
                <p>If user experiences trouble including defects or bugs, 
                    the owner of this website can't be held liable.
                    It will be user's responsibility.</p>
                <hr />
                <h2>Contact</h2>
                If you have trouble, please contact using this link:<br />
                <a href="https://www.uni-browser.net/?pageId=4" target="_blank" rel="noopener noreferrer">　uni-browser >></a>
            </div>
        </center>
    </div>
);
export default Terms;