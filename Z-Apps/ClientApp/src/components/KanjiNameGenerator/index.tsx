import { Input, Slide } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";

export default function KanjiNameGenerator() {
    const [english, setEnglish] = useState("");
    const [errMsg, setErrMsg] = useState("");
    return (
        <div style={{ maxWidth: 700 }}>
            <h1>{"Kanji Name Generator - My Name in Kanji"}</h1>
            <p
                style={{
                    marginTop: 50,
                    fontSize: "x-large",
                    fontWeight: "bold",
                }}
            >
                Your name:
            </p>
            <Input
                onChange={e => {
                    const val = e.target.value;
                    setEnglish(val);
                    setErrMsg(chkAlphabets(val));
                }}
                value={english}
                style={{ display: "block", color: errMsg ? "red" : undefined }}
                placeholder={"Type your name in alphabet here"}
            />
            {errMsg && <p style={{ color: "red", marginTop: 5 }}>{errMsg}</p>}
            <Slide in={!!english && !errMsg} direction="left">
                <div>
                    <p
                        style={{
                            marginTop: 50,
                            fontSize: "x-large",
                            fontWeight: "bold",
                        }}
                    >
                        Kanji:
                    </p>
                    {english.split("a").join("あ")}
                </div>
            </Slide>
        </div>
    );
}

function chkAlphabets(str: string): string {
    if (!new RegExp(/^[a-zA-Z\s]*$/).test(str)) {
        return "Please use only alphabet";
    }
    return "";
}
