import React from 'react';
import Head from './parts/Helmet';

export default class Boscobel extends React.Component {

    constructor(props) {
        super(props);

        //セーブデータがあればそれを設定
        const saveData = localStorage.getItem("boscobel-token");
        const objSaveData = JSON.parse(saveData);

        let token;
        if (objSaveData) {
            token = objSaveData.token || "";
        } else {
            token = "";
        }

        this.state = {
            background: null,
            top: null,
            pw: token,
        }

        this.consts = {
            background: "background",
            top: "top",
        }
    }

    handleChangeFile = (e, imageType) => {
        const target = e.target;
        const file = target.files.item(0);
        if (imageType === this.consts.background) {
            this.setState({ background: file });
        } else if (imageType === this.consts.top){
            this.setState({ top: file });
        }
    }

    handleChangePW = (e) => {
        this.setState({ pw: e.target.value });
        localStorage.setItem("boscobel-token", JSON.stringify({ token: e.target.value }));
    }

    uploadFile = (imageType) => {
        let file = null;
        if (imageType === this.consts.background) {
            file = this.state.background;
        } else if (imageType === this.consts.top) {
            file = this.state.top;
        }

        if (!file || file.name.split(".").pop().toLowerCase() !== "png") {
            alert("Error! Please select a png file.");
            return;
        }


        const formData = new FormData();
        formData.append("file", file);
        formData.append("shop", "boscobel");
        formData.append("fileName", imageType);
        formData.append("pw", this.state.pw);

        fetch('/api/ShopImg/Upload', { method: 'POST', body: formData })
            .then(async (response) => {

                const result = await response.json();
                if (result) {
                    if (result.errMessage) {
                        alert(result.errMessage);
                    } else {
                        alert("Success to upload!");
                        window.open('https://www.cafe-boscobel.com/');
                        window.location.reload();
                    }
                } else {
                    alert("Failed to upload... Status:" + response.status);
                }
            })
            .catch(() => {
                alert("Failed to upload...");
            });
    }

    render() {
        return (
            <center>
                <Head
                    title={"Boscobel - Upload Image"}
                    noindex={true}
                />
                <div style={{ width: "100%", height: "100%", backgroundColor: "#1b181b", position: "fixed", top: 0, right: 0, zIndex: "-1" }}>
                </div>
                <div style={{ maxWidth: 1000, color:"white" }}>
                    <h1 style={{
                        margin: "30px",
                        lineHeight: "30px",
                        color: "#eb6905",
                    }}>
                        <b>Boscobel - Upload Image</b>
                    </h1>
                    <br />
                    パスワード（30cmを超える金魚の名前は？）
                    <input
                        type="text"
                        onChange={this.handleChangePW}
                        value={this.state.pw}
                        style={{color: "black"}}
                    />
                    <br />
                    <br />
                    <div style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333", color: "#eb6905" }}>
                        <h2>Background Image</h2>
                        <br />
                        Current image:<br />
                        <img src="https://lingualninja.blob.core.windows.net/lingual-storage/boscobel/background.png" style={{ width: "100%" }} />
                        <br /><br />
                        Select a png file from your computer! (Only png is valid!)
                        <input type="file" name="background" onChange={(e) => this.handleChangeFile(e, this.consts.background)} />
                        <br /><br />
                        <button
                            style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0 }}
                            className="btn btn-primary btn-xs"
                            onClick={() => this.uploadFile(this.consts.background)}
                        >
                            <b>Upload</b>
                        </button>
                    </div>
                    <br />
                    <div style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333", color: "#eb6905" }}>
                        <h2>Top Image</h2>
                        <br />
                        Current image:<br />
                        <img src="https://lingualninja.blob.core.windows.net/lingual-storage/boscobel/top.png" style={{ width: "100%" }} />
                        <br /><br />
                        Select a png file from your computer! (Only png is valid!)
                        <input type="file" name="top" onChange={(e) => this.handleChangeFile(e, this.consts.top)} />
                        <br /><br />
                        <button
                            style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0 }}
                            className="btn btn-primary btn-xs"
                            onClick={() => this.uploadFile(this.consts.top)}
                        >
                            <b>Upload</b>
                        </button>
                    </div>
                </div>
            </center>
        );
    }
};

class Description extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div style={{ padding: "10px", marginBottom: "10px", border: "5px double #333333", color: "#eb6905" }}>
                <textarea
                    rows="10"
                    style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                    value={this.props.desc}
                    onChange={this.props.handleChangeDesc}
                />
            </div>
        )
    }
}

class Sentences extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div style={{ textAlign: "left" }}>
                {
                    this.props.sentences && this.props.sentences.map((s,i) =>
                        <span key={s.lineNumber}>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>Ｋ:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.kanji}
                                            onChange={(e) => this.props.handleChangeSentence(e, i,"kanji")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                        <td style={{textAligh: "left"}}>
                                            <button
                                                style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }}
                                                className="btn btn-dark btn-xs"
                                                onClick={() => this.props.translate(s)}
                                            >
                                                <b>↓　Translate Sentence　↓</b>
                                            </button>
                                            {this.props.isTranslating ? <span style={{ color: "white", marginLeft:20 }}>Translating...</span> : null}
                                            <div style={{ textAligh: "right", float:"right" }}>
                                                <button
                                                    style={{ marginTop: 10, marginBottom: 10, height: 28, paddingTop: 0, color: "black" }}
                                                    className="btn btn-dark btn-xs"
                                                    onClick={() => this.props.removeLine(s.lineNumber)}
                                                >
                                                    <b>Remove Sentence</b>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>Ｈ:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.hiragana}
                                            onChange={(e) => this.props.handleChangeSentence(e, i, "hiragana")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>Ｒ:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.romaji}
                                            onChange={(e) => this.props.handleChangeSentence(e, i, "romaji")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                    <tr style={{ backgroundColor: "black", color: "#757575" }}>
                                        <td width="20px"><b>Ｅ:　</b></td>
                                        <td><input
                                            type="text"
                                            value={s.english}
                                            onChange={(e) => this.props.handleChangeSentence(e, i, "english")}
                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                        /></td>
                                    </tr>
                                </tbody>
                            </table>
                            {
                                this.props.words && this.props.words.length > 0 ?
                                <WordList
                                        words={this.props.words}
                                        s={s}
                                        storyId={this.props.storyId}
                                        handleChangeWord={this.props.handleChangeWord}
                                        addWord={this.props.addWord}
                                        removeWord={this.props.removeWord}
                                        translateWord={this.props.translateWord}
                                        margeWord={this.props.margeWord}
                                    />
                                    :
                                    null
                            }
                            <button
                                style={{ marginTop: 10, marginBottom: 2, height: 28, paddingTop: 0, color: "black" }}
                                className="btn btn-dark btn-xs"
                                onClick={() => this.props.addLine(s.lineNumber)}
                            >
                                <b>Add Line</b>
                            </button>

                            <br /><br />
                            <hr />
                        </span>
                    )
                }
            </div>
        );
    }
};

class WordList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showWordList: true,
        };
    }

    showWordList = () => {
        this.setState({ showWordList: true });
    }

    hideWordList = () => {
        this.setState({ showWordList: false });
    }

    render() {
        return (
            <span>
                <br />
                <div style={{ backgroundColor: "#1b181b" }}>
                    {
                        this.state.showWordList ?
                            <center>
                                <table border="1" style={{ width:"100%", borderCollapse: "collapse" }}>
                                    <tbody>
                                        {
                                            this.props.words && this.props.words.filter((w) =>
                                                w.lineNumber === this.props.s.lineNumber
                                            ).sort((a, b) =>
                                                a.wordNumber - b.wordNumber
                                            ).map((w, i) =>
                                                <tr key={w.wordNumber}>
                                                    <td width="10px">
                                                        <button
                                                            style={{ height: "100%", paddingTop: 0, color: "black" }}
                                                            className="btn btn-dark btn-xs"
                                                            onClick={() => this.props.margeWord(w.lineNumber, w.wordNumber)}
                                                        ><b>M</b>
                                                        </button>
                                                    </td>
                                                    <td width="20%">
                                                        <textarea
                                                            value={w.kanji}
                                                            onChange={(e) => this.props.handleChangeWord(e, this.props.s.lineNumber, w.wordNumber, "kanji")}
                                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                                        />
                                                    </td>
                                                    <td width="10px">
                                                        <button
                                                            style={{ height: "100%", paddingTop: 0, color: "black" }}
                                                            className="btn btn-dark btn-xs"
                                                            onClick={() => this.props.translateWord(w)}
                                                        ><b>⇒</b>
                                                        </button>
                                                    </td>
                                                    <td width="23%">
                                                        <textarea
                                                            value={w.hiragana}
                                                            onChange={(e) => this.props.handleChangeWord(e, this.props.s.lineNumber, w.wordNumber, "hiragana")}
                                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <textarea
                                                            value={w.english}
                                                            onChange={(e) => this.props.handleChangeWord(e, this.props.s.lineNumber, w.wordNumber, "english")}
                                                            style={{ width: "100%", backgroundColor: "#1b181b", color: "#eb6905", border: "thin solid #594e46" }}
                                                        />
                                                    </td>
                                                    <td width="10px">
                                                        <button
                                                            style={{ height: "100%", paddingTop: 0, color: "black" }}
                                                            className="btn btn-dark btn-xs"
                                                            onClick={() => this.props.removeWord(w.lineNumber, w.wordNumber)}
                                                        ><b>－</b>
                                                        </button>
                                                    </td>
                                                    <td width="10px">
                                                        <button
                                                            style={{ height: "100%", paddingTop: 0, color: "black" }}
                                                            className="btn btn-dark btn-xs"
                                                            onClick={() => this.props.addWord(w.lineNumber, w.wordNumber)}
                                                        ><b>＋</b>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </center>
                            :
                            null
                    }
                </div>
            </span>
        )
    }
}