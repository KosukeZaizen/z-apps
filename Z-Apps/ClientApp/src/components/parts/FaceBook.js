import React from 'react';

export default class FB extends React.Component {
    render() {
        const innerWidth = parseInt(window.innerWidth, 10);
        const width = (innerWidth > 350) ? 350 : 300;

        return (
            <center>
                <iframe
                    title="fb"
                    src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLingual-Ninja-491712431290062%2F&width=${width}&height=${width}&small_header=false&tabs=timeline$adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
                    width={width}
                    height={width}
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