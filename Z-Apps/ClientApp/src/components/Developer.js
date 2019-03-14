import React from 'react';
import { connect } from 'react-redux';
import '../css/Developer.css';
import image from '../img/KosukeZaizen.JPG';


const Developer = props => (
    <div className="developer">
        <center>
            <h1>Kosuke Zaizen</h1>

            <div className="contents">
                <hr />
                <span className='hidden-xs'>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img width="200px" src={image} alt="Kosuke Zaizen"/>
                                </td>
                                <td className="tdExplanation" valign="top">
                                    <p>
                                        <b>Hello! I'm Kosuke Zaizen!</b><br />
                                        <br />
                                        Thank you for using Z-Apps!<br />
                                        I am a Japanese software engineer.<br />
                                        Z-Apps is a website to put apps made by me.<br />
                                        Mainly I put apps for someone studying Japanese.<br />
                                        I hope Z-Apps helps you somehow!
                                 </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </span>
                <span className='visible-xs'>
                    <center>
                        <img width="200px" src={image} alt="Kosuke Zaizen" />
                        <br /><br />
                        <p>
                            <b>Hello! I'm Kosuke Zaizen!</b><br />
                            <br />
                            Thank you for using Z-Apps!<br />
                            I am a Japanese software engineer.<br />
                            Z-Apps is a website to put apps made by me.<br />
                            Mainly I put apps for someone studying Japanese.<br />
                            I hope Z-Apps helps you somehow!
                                 </p>
                    </center>
                </span>
            <hr />
            <br />
            <center>
                <p>
                    To contact me, please write message from the link below:<br />
                        <b><a href="https://www.uni-browser.net/?pageId=4" target="_blank" rel="noopener noreferrer">Contact to uni-browser >></a></b>
                    <br /><br />
                    Also, I am writing a blog for someone studying Japanese:<br />
                        <b><a href="https://lingualninja.blogspot.com/" target="_blank" rel="noopener noreferrer">Lingual Ninja! >></a></b>
                    <br /><br />
                </p>
                <NinjaFacebook />
                <div id="fb-root"></div>
            </center>
            </div>
        </center>
    </div >
);


class NinjaFacebook extends React.Component {

    initNinjaFacebook(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1';
        fjs.parentNode.insertBefore(js, fjs);
    }

    render() {
        return (
            <div
                onLoad={this.initNinjaFacebook(document, 'script', 'facebook-jssdk')}
                className="fb-page"
                data-href="https://www.facebook.com/Lingual-Ninja-491712431290062/"
                data-tabs="timeline"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
                data-width="500"
            >
                <blockquote cite="https://www.facebook.com/Lingual-Ninja-491712431290062/" className="fb-xfbml-parse-ignore">
                    <a href="https://www.facebook.com/Lingual-Ninja-491712431290062/">
                        Facebook: Lingual Ninja！
                    </a>
                </blockquote>
            </div>
        );
    }
}

export default connect()(Developer);
