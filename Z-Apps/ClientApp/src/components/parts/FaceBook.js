import React from 'react';

export default class FB extends React.Component {
    render() {
        const innerWidth = parseInt(window.innerWidth, 10);
        let width;
        if (innerWidth > 350) {
            width = 350;
        } else {
            width = 300;
        }
        const height = 200;

        return (
            <center>
                <iframe
                    title="fb"
                    src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLingualNinja%2F&width=${width}&height=${height}&small_header=false&tabs=timeline$adapt_container_width=false&hide_cover=false&show_facepile=true&appId`}
                    width={width}
                    height={height}
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="yes"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                />
            </center>
        );
    }
}