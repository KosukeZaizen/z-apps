import * as React from 'react';
import Head from './parts/Helmet';

export default class Boscobel extends React.Component {

    consts: {
        background: string,
        top: string,
    }

    state: {
        background: string,
        top: string,
        pw: string,
    }

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
                        window.location.reload(true);
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
            <div className="center">
                <Head
                    title={"Boscobel - Upload Image"}
                    noindex={true}
                />
                <div style={{ width: "100%", height: "100%", backgroundColor: "#1b181b", position: "fixed", top: 0, right: 0, zIndex: -1 }}>
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
                        <img src="https://lingualninja.blob.core.windows.net/lingual-storage/boscobel/background.png" style={{ width: "100%" }} alt="boscobel background" />
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
                        <img src="https://lingualninja.blob.core.windows.net/lingual-storage/boscobel/top.png" style={{ width: "100%" }} alt="boscobel top" />
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
            </div>
        );
    }
};