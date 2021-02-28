import * as React from "react";
import { useEffect } from "react";
import Helmet from "../parts/Helmet";

export default function ApiCache() {
    useEffect(() => {
        const getCache = async () => {
            const result = await (
                await fetch("api/SystemBase/GetCache")
            ).json();

            console.log("cache", result);
        };
        getCache();
    }, []);

    return (
        <div>
            <Helmet title="ApiCache" noindex />
            <h2>ApiCache</h2>
            Check console
        </div>
    );
}
