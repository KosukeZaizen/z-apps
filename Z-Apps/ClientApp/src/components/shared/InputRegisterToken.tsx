import React, { CSSProperties, useEffect, useState } from "react";

export function InputRegisterToken({ style }: { style?: CSSProperties }) {
    const [token, setToken] = useState("");

    useEffect(() => {
        const saveData = localStorage.getItem("folktales-register-token");
        const objSaveData = saveData && JSON.parse(saveData);
        const token = objSaveData?.token || "";
        setToken(token);
    }, []);

    return (
        <input
            style={style}
            value={token}
            onChange={ev => {
                const newToken = ev.target.value;
                setToken(newToken);

                if (newToken) {
                    localStorage.setItem(
                        "folktales-register-token",
                        JSON.stringify({ token: newToken })
                    );
                }
            }}
        />
    );
}

export function getCurrentToken() {
    const saveData = localStorage.getItem("folktales-register-token");
    const objSaveData = saveData && JSON.parse(saveData);
    return objSaveData?.token || "";
}
