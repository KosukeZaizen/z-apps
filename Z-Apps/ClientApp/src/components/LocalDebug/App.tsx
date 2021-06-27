import React from "react";
import { apps } from "../..";

export function App() {
    return (
        <div>
            Local Debug Menu
            {apps.map(a => {
                return (
                    <div
                        key={a.key}
                        style={{ border: "solid", margin: 30, padding: 30 }}
                    >
                        <h2>{a.key}</h2>
                        <p>url: {a.hostname}</p>
                        <button
                            onClick={() => {
                                saveKey(a.key);
                            }}
                        >
                            open
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export function ReturnToLocalMenu() {
    if (window.location.hostname === "localhost") {
        localStorage.removeItem("appKeyToMount");
        window.location.href = "/";
    } else {
        window.location.href = `/not-found?p=${window.location.pathname}`;
    }
    return null;
}

function saveKey(appKey: string) {
    window.localStorage.setItem("appKeyToMount", appKey);
    window.location.reload();
}
