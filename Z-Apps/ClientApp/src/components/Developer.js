import React from 'react';
import '../css/Developer.css';
import image from '../img/KosukeZaizen.jpg';
import Head from './parts/Helmet';
import FB from './parts/FaceBook';
import PleaseScrollDown from './parts/PleaseScrollDown';

function SayHello() {
    return (
        <p>
            <b>Hello! I'm Kosuke Zaizen!</b><br />
            <br />
            Thank you for using Lingual Ninja!<br />
            I am a Japanese software engineer.<br />
            Lingual Ninja is a website for Japanese learners.<br />
            I hope Lingual Ninja can help!
        </p>
    );
}


export default class Developer extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    render() {
        return (
            <div className="developer">
                <Head
                    title="Kosuke Zaizen"
                    desc="I am a Japanese software engineer. Lingual Ninja is a website for Japanese learners. I hope Lingual Ninja can help!"
                />
                <center>
                    <h1>Kosuke Zaizen</h1>

                    <div className="contents">
                        <hr id="scrollTargetId" />
                        <span className='hidden-xs'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img width="200px" src={image} alt="Kosuke Zaizen" />
                                        </td>
                                        <td className="tdExplanation" valign="top">
                                            <SayHello />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </span>
                        <span className='visible-xs'>
                            <center>
                                <img width="200px" src={image} alt="Kosuke Zaizen" />
                                <br /><br />
                                <SayHello />
                            </center>
                        </span>
                        <hr ref={this.ref} />
                        <br />
                        <center>
                            <p className="no-margin">
                                To contact me, please write a message<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>
                                using the link below:</p><br />
                            <b><a href="https://uni-browser.lingual-ninja.com/?pageId=4" target="_blank" rel="noopener noreferrer">Contact uni-browser >></a></b>

                            <br /><br /><br />
                            <p className="no-margin">
                                Also, I am writing a blog for people<span className='hidden-xs'> </span><span className='visible-xs'><br /></span>
                                studying Japanese:</p><br />
                            <b><a href="https://www.lingual-ninja.com/" target="_blank" rel="noopener noreferrer">Lingual Ninja! >></a></b>
                            <br /><br />
                            <FB />
                        </center>
                    </div>
                    <PleaseScrollDown
                        criteriaRef={this.ref}
                        targetId="scrollTargetId"
                    />
                </center>
            </div >
        );
    }
}