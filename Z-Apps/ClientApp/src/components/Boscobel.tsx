import * as React from "react";
import Head from "./parts/Helmet";

export default class Boscobel extends React.Component {
    consts = {
        background: "background",
        top: "top",
        menu: "menu",
    };

    state: {
        background?: File;
        top?: File;
        menu: { file: File; order: number }[];
        pw: string;
        isUploading: boolean;
    };

    constructor(props: {}) {
        super(props);

        //セーブデータがあればそれを設定
        const saveData = localStorage.getItem("boscobel-token");
        const objSaveData = saveData && JSON.parse(saveData);

        let token;
        if (objSaveData) {
            token = objSaveData.token || "";
        } else {
            token = "";
        }

        this.state = {
            background: undefined,
            top: undefined,
            menu: [],
            pw: token,
            isUploading: false,
        };
    }

    handleChangeFile = (
        e: React.ChangeEvent<HTMLInputElement>,
        imageType: string
    ) => {
        const target = e.target;
        const file = target.files?.item(0);
        if (imageType === this.consts.background) {
            this.setState({ background: file });
        } else if (imageType === this.consts.top) {
            this.setState({ top: file });
        } else if (imageType === this.consts.menu) {
            if (!target.files) return;
            this.setState({
                menu: Array.from(target.files).map((file, order) => ({
                    file,
                    order,
                })),
            });
        }
    };

    handleChangePW = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ pw: e.target.value });
        localStorage.setItem(
            "boscobel-token",
            JSON.stringify({ token: e.target.value })
        );
    };

    uploadFile = (imageType: string) => {
        let file = null;
        if (imageType === this.consts.background) {
            file = this.state.background;
        } else if (imageType === this.consts.top) {
            file = this.state.top;
        }

        if (!file || file.name.split(".").pop()?.toLowerCase() !== "png") {
            alert("Error! Please select a png file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("shop", "boscobel");
        formData.append("fileName", imageType);
        formData.append("pw", this.state.pw);

        fetch("/api/ShopImg/Upload", { method: "POST", body: formData })
            .then(async response => {
                const result = await response.json();
                if (result) {
                    if (result.errMessage) {
                        alert(result.errMessage);
                    } else {
                        alert("Success to upload!");
                        window.open("https://www.cafe-boscobel.com/");
                        window.location.reload(true);
                    }
                } else {
                    alert("Failed to upload... Status:" + response.status);
                }
            })
            .catch(() => {
                alert("Failed to upload...");
            });
    };

    uploadMenuFiles = async () => {
        this.setState({ isUploading: true });

        if (
            !window.confirm(
                "新しいメニューをアップロードすると、古いメニューのファイルは削除されます。よろしいですか？"
            )
        ) {
            this.setState({ isUploading: false });
            return;
        }

        const { menu } = this.state;
        const files = [...menu]
            .sort((a, b) => a.order - b.order)
            .map(m => m.file);

        for (let file of files) {
            if (!file || file.name.split(".").pop()?.toLowerCase() !== "png") {
                alert("png形式でお願いします！");
                this.setState({ isUploading: false });
                return;
            }
        }

        //古いメニューをストレージから削除
        const formData = new FormData();
        formData.append("shop", "boscobel");
        formData.append("pw", this.state.pw);
        const error = await this.sendPost(
            formData,
            "/api/ShopImg/DeleteOldMenu"
        );
        if (error) {
            alert(error);
            this.setState({ isUploading: false });
            return;
        }

        for (let i in files) {
            //１ファイルずつアップロード
            const formData = new FormData();
            formData.append("file", files[i]);
            formData.append("shop", "boscobel");
            formData.append(
                "fileName",
                `menu/cafe-boscobel-menu-${("00" + (Number(i) + 1)).slice(-2)}`
            );
            formData.append("pw", this.state.pw);

            const error = await this.sendPost(formData, "/api/ShopImg/Upload");
            if (error) {
                alert(error);
                this.setState({ isUploading: false });
                return;
            }
        }

        this.setState({ isUploading: false });
        alert("メニューのアップロードに成功しました！");
    };

    sendPost = async (formData: FormData, url: string): Promise<string> => {
        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (result) {
                if (result.errMessage) {
                    return result.errMessage;
                } else {
                    //成功
                    return "";
                }
            } else {
                return "Failed to upload... Status:" + response.status;
            }
        } catch (e) {
            return "Failed to upload...";
        }
    };

    render() {
        const { menu, isUploading } = this.state;

        const createObjectURL: (file: File) => string =
            (window.URL || window.webkitURL).createObjectURL ||
            (window as typeof window & {
                createObjectURL: (file: File) => string;
            }).createObjectURL;

        return (
            <div className="center">
                <Head title={"Boscobel - Upload Image"} noindex={true} />
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#1b181b",
                        position: "fixed",
                        top: 0,
                        right: 0,
                        zIndex: -1,
                    }}
                ></div>
                <div style={{ maxWidth: 1000, color: "white" }}>
                    <h1
                        style={{
                            margin: "30px",
                            lineHeight: "30px",
                            color: "#eb6905",
                        }}
                    >
                        <b>Boscobel - Upload Image</b>
                    </h1>
                    <br />
                    パスワード（30cmを超える金魚の名前は？）
                    <input
                        type="text"
                        onChange={this.handleChangePW}
                        value={this.state.pw}
                        style={{ color: "black" }}
                    />
                    <br />
                    <br />
                    <div
                        style={{
                            padding: "10px",
                            marginBottom: "10px",
                            border: "5px double #333333",
                            color: "#eb6905",
                        }}
                    >
                        <h2>Background Image</h2>
                        <br />
                        Current image:
                        <br />
                        <img
                            src="https://lingualninja.blob.core.windows.net/lingual-storage/boscobel/background.png"
                            style={{ width: "100%" }}
                            alt="boscobel background"
                        />
                        <br />
                        <br />
                        png形式のファイルのみアップロード可能です。
                        <br />
                        <br />
                        <input
                            type="file"
                            name="background"
                            onChange={e =>
                                this.handleChangeFile(e, this.consts.background)
                            }
                        />
                        <br />
                        <br />
                        <button
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                                height: 28,
                                paddingTop: 0,
                            }}
                            className="btn btn-primary btn-xs"
                            onClick={() =>
                                this.uploadFile(this.consts.background)
                            }
                        >
                            <b>Upload</b>
                        </button>
                    </div>
                    <br />
                    <div
                        style={{
                            padding: "10px",
                            marginBottom: "10px",
                            border: "5px double #333333",
                            color: "#eb6905",
                        }}
                    >
                        <h2>Top Image</h2>
                        <br />
                        Current image:
                        <br />
                        <img
                            src="https://lingualninja.blob.core.windows.net/lingual-storage/boscobel/top.png"
                            style={{ width: "100%" }}
                            alt="boscobel top"
                        />
                        <br />
                        <br />
                        png形式のファイルのみアップロード可能です。
                        <br />
                        <br />
                        <input
                            type="file"
                            name="top"
                            onChange={e =>
                                this.handleChangeFile(e, this.consts.menu)
                            }
                        />
                        <br />
                        <br />
                        <button
                            style={{
                                marginTop: 10,
                                marginBottom: 10,
                                height: 28,
                                paddingTop: 0,
                            }}
                            className="btn btn-primary btn-xs"
                            onClick={() => this.uploadFile(this.consts.menu)}
                        >
                            <b>Upload</b>
                        </button>
                    </div>
                    <br />
                    <div
                        style={{
                            padding: "10px",
                            marginBottom: "10px",
                            border: "5px double #333333",
                            color: "#eb6905",
                        }}
                    >
                        <h2>Menu</h2>
                        {menu
                            .sort((a, b) => a.order - b.order)
                            .filter(m => m.file instanceof File)
                            .map((m, i) => (
                                <div
                                    key={`${m.order}-${i}`}
                                    style={{
                                        width: "30%",
                                        margin: "20px 5px 5px",
                                        display: "inline-block",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            marginBottom: 2,
                                        }}
                                    >
                                        <span>表示順：</span>
                                        <input
                                            type="number"
                                            style={{
                                                width: "50%",
                                                marginRight: "auto",
                                                textAlign: "right",
                                                color: "black",
                                            }}
                                            defaultValue={`${m.order + 1}`}
                                            onBlur={e => {
                                                this.setState({
                                                    menu: [
                                                        ...menu.filter(
                                                            me =>
                                                                me.file !==
                                                                m.file
                                                        ),
                                                        {
                                                            file: m.file,
                                                            order:
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                ) - 1,
                                                        },
                                                    ],
                                                });
                                            }}
                                        />
                                    </div>
                                    <img
                                        alt={`boscobel${i}`}
                                        style={{ width: "100%" }}
                                        src={createObjectURL(m.file)}
                                    />
                                </div>
                            ))}
                        <br />
                        {menu.length > 0 ? (
                            <span>
                                上記の「表示順」の値が小さいファイルから順番にサイトに表示されます。
                                <br />
                                「表示順」の値は変更可能です。
                                <br />
                                （「表示順」の数値は連続してなくてもOKっす）
                                <br />
                                <br />
                                <button
                                    style={{ color: "black" }}
                                    onClick={() => this.setState({ menu: [] })}
                                >
                                    クリア（ファイルを選びなおす）
                                </button>
                                <br />
                                <br />
                                <button
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        height: 28,
                                        paddingTop: 0,
                                    }}
                                    className="btn btn-primary btn-xs"
                                    onClick={() => this.uploadMenuFiles()}
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <b>アップロード中…</b>
                                    ) : (
                                        <b>Upload</b>
                                    )}
                                </button>
                            </span>
                        ) : (
                            <span>
                                以下のボタンから、メニューとしてサイトに掲載したい全ての画像を、一度に選択してください。
                                <br />
                                （一度に複数のファイルを選択可能です。）
                                <br />
                                png形式のファイルのみアップロード可能です。
                                <br />
                                <br />
                                <input
                                    type="file"
                                    name="menu"
                                    onChange={e =>
                                        this.handleChangeFile(
                                            e,
                                            this.consts.menu
                                        )
                                    }
                                    multiple
                                />
                            </span>
                        )}
                        <br />
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}
