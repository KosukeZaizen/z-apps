import * as React from "react";

export default function FB() {
    const innerWidth = window.innerWidth;
    let width;
    if (innerWidth > 350) {
        width = 350;
    } else {
        width = 300;
    }
    const height = 200;

    return (
        <div className="center">
            <iframe
                title="fb"
                src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLingualNinja%2F&width=${width}&height=${height}&small_header=false&tabs=timeline$adapt_container_width=false&hide_cover=false&show_facepile=true&appId`}
                width={width}
                height={height}
                style={{ border: "none", overflow: "hidden" }}
                scrolling="yes"
                frameBorder="0"
                allow="encrypted-media"
            />
        </div>
    );
}
