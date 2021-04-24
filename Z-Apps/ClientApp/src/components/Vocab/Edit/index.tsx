import React from "react";
import { Link } from "react-router-dom";
import { StopAnimation } from "../../../common/animation";
import { sendPost } from "../../../common/functions";
import { vocab, vocabGenre } from "../../../types/vocab";
import Head from "../../parts/Helmet";
import { HideFooter } from "../../parts/HideHeaderAndFooter/HideFooter";
import {
    getCurrentToken,
    InputRegisterToken,
} from "../../parts/InputRegisterToken";

type Props = {
    location: { pathname: string };
    match: { params: { [key: string]: string } };
};
type State = {
    screenWidth: number;
    vocabList: vocab[];
    vocabGenre?: vocabGenre;
};

class VocabEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
            vocabList: [],
            vocabGenre: undefined,
        };
    }

    loadVocab = async () => {
        const {
            match: { params },
        } = this.props;
        const genreName: string = params.genreName.toString().split("#")[0];
        const res = await fetch(
            `api/VocabQuiz/GetQuizDataWithoutCache/${genreName}`
        );
        const result: {
            vocabList: vocab[];
            vocabGenre: vocabGenre;
        } = await res.json();

        const { vocabList, vocabGenre } = result;

        if (vocabList?.length) {
            this.setState({
                vocabList: vocabList.map(v => {
                    v.order *= 10;
                    return v;
                }),
                vocabGenre,
            });
        } else {
            this.setState({
                vocabList: [
                    {
                        genreId: vocabGenre?.genreId,
                        vocabId: 1,
                        hiragana: "",
                        kanji: "",
                        english: "",
                        order: 10,
                    },
                ],
                vocabGenre,
            });
        }
    };

    componentDidMount() {
        this.loadVocab();
    }

    getNewVocabId = () => {
        const { vocabList } = this.state;
        return Math.max(...vocabList.map(v => v.vocabId)) + 1;
    };

    getNewVocabOrder = () => {
        const { vocabList } = this.state;
        return Math.max(...vocabList.map(v => v.order)) + 10;
    };

    changeVocab = (targetVocabId: number, value: Partial<vocab>) => {
        const { vocabList } = this.state;
        const targetVocab = vocabList.find(v => v.vocabId === targetVocabId);
        if (!targetVocab) {
            return;
        }
        const restVocabList = vocabList.filter(
            v => v.vocabId !== targetVocabId
        );
        this.setState({
            vocabList: [...restVocabList, { ...targetVocab, ...value }],
        });
    };

    translateVocab = async (v: vocab) => {
        const result = await translate(v.kanji);
        if (result) {
            this.changeVocab(v.vocabId, result);
        }
    };

    render() {
        const { vocabList, vocabGenre } = this.state;

        const genreName = vocabGenre?.genreName || "";
        const titleToShowUpper = genreName
            .split("_")
            .map(t => t && t[0].toUpperCase() + t.substr(1))
            .join(" ");

        return (
            <div>
                <Head noindex />
                <StopAnimation />
                <HideFooter />

                <h1 style={{ marginBottom: 30 }}>{titleToShowUpper}</h1>

                <div style={{ marginBottom: 20 }}>
                    <Link to={"/vocabularyEdit"}>一覧へ戻る</Link>
                    <button
                        style={{ marginLeft: 50 }}
                        onClick={() => {
                            if (
                                !window.confirm(
                                    "音声アップロード済みの場合、整合性がズレるけど大丈夫？"
                                )
                            ) {
                                return;
                            }
                            this.setState({
                                vocabList: [...vocabList]
                                    .sort((a, b) => a.order - b.order)
                                    .map((v, i) => ({
                                        ...v,
                                        vocabId: i + 1,
                                    })),
                            });
                        }}
                    >
                        ID再付与
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>{"ID"}</th>
                            <th>{"Order"}</th>
                            <th>{"Kanji"}</th>
                            <th></th>
                            <th>{"Hiragana"}</th>
                            <th>{"English"}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vocabList
                            ?.sort((a, b) => a.order - b.order)
                            ?.map(v => (
                                <tr key={v.vocabId}>
                                    <td>{v.vocabId}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={v.order
                                                .toString()
                                                .replace(/^0+/, "")}
                                            style={{ width: 70 }}
                                            onChange={ev => {
                                                this.changeVocab(v.vocabId, {
                                                    order: Number(
                                                        ev.target.value
                                                    ),
                                                });
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={v.kanji}
                                            onChange={ev => {
                                                this.changeVocab(v.vocabId, {
                                                    kanji: ev.target.value,
                                                });
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                this.translateVocab(v)
                                            }
                                        >
                                            {"⇒"}
                                        </button>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={v.hiragana}
                                            onChange={ev => {
                                                this.changeVocab(v.vocabId, {
                                                    hiragana: ev.target.value,
                                                });
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={v.english}
                                            style={{ width: 250 }}
                                            onChange={ev => {
                                                this.changeVocab(v.vocabId, {
                                                    english: ev.target.value,
                                                });
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                if (
                                                    !window.confirm(
                                                        "行削除しますか？"
                                                    )
                                                ) {
                                                    return;
                                                }
                                                this.setState({
                                                    vocabList: vocabList.filter(
                                                        vocab =>
                                                            vocab.vocabId !==
                                                            v.vocabId
                                                    ),
                                                });
                                            }}
                                        >
                                            ー
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <button
                    style={{ margin: 30 }}
                    onClick={() => {
                        this.setState({
                            vocabList: [
                                ...vocabList,
                                {
                                    genreId: vocabGenre?.genreId || 0,
                                    vocabId: this.getNewVocabId(),
                                    hiragana: "",
                                    kanji: "",
                                    english: "",
                                    order: this.getNewVocabOrder(),
                                },
                            ],
                        });
                    }}
                >
                    ＋
                </button>

                <div style={{ height: 50 }} />
                <div
                    style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: "lightyellow",
                        padding: 5,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "50%",
                            alignItems: "center",
                        }}
                    >
                        <InputRegisterToken
                            style={{ marginBottom: 5, width: "25%" }}
                        />
                        <button
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Do you want to translate all?"
                                    )
                                ) {
                                    vocabList.forEach(v =>
                                        this.translateVocab(v)
                                    );
                                }
                            }}
                            style={{ width: "100%", marginBottom: 5 }}
                        >
                            Translate All
                        </button>
                        <button
                            onClick={() => {
                                save(vocabList, () => {
                                    this.loadVocab();
                                });
                            }}
                            style={{ width: "100%" }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

async function save(vocabList: vocab[], fncAfterSaving: () => void) {
    if (
        !vocabList.every(
            v => v.order && v.kanji && v.hiragana && v.english && v.genreId
        )
    ) {
        alert("空白もしくはゼロを含む行があります。");
        return;
    }

    if (!window.confirm("Do you really want to save?")) {
        return;
    }

    try {
        const result = await sendPost(
            {
                vocabList,
                token: getCurrentToken(),
            },
            "/api/VocabQuiz/SaveVocabList"
        );

        if (result === true) {
            alert("success!");
            if (typeof fncAfterSaving === "function") {
                fncAfterSaving();
            }
            return;
        }
    } catch (ex) {}

    alert("failed...");
}

async function translate(kanji: string) {
    if (!kanji) {
        return;
    }

    const result: { hiragana: string; english: string } = await sendPost(
        {
            kanji,
            token: getCurrentToken(),
        },
        "/api/VocabQuiz/TranslateVocab"
    );

    return result;
}

export default VocabEdit;
