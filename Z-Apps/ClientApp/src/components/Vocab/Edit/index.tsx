import React from "react";
import { Link } from "react-router-dom";
import { StopAnimation } from "../../../common/animation";
import { BLOB_URL } from "../../../common/consts";
import { sendPost } from "../../../common/functions";
import { compareObjects } from "../../../common/util/compareObjects";
import { sound, vocab, vocabGenre } from "../../../types/vocab";
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
    initialVocabList: vocab[]; // 初期状態との比較用
    vocabGenre?: vocabGenre;
    vocabSounds: sound[];
};

class VocabEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
            vocabList: [],
            initialVocabList: [],
            vocabGenre: undefined,
            vocabSounds: [],
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

        this.makeSound(result);

        if (result.vocabList?.length) {
            const vocabList = result.vocabList.map(v => {
                v.order *= 10;
                return v;
            });
            this.setState({
                vocabList,
                initialVocabList: [...vocabList],
                vocabGenre: result.vocabGenre,
            });
        } else {
            const vocabList = [
                {
                    genreId: result.vocabGenre?.genreId,
                    vocabId: 1,
                    hiragana: "",
                    kanji: "",
                    english: "",
                    order: 10,
                },
            ];
            this.setState({
                vocabList,
                initialVocabList: [...vocabList],
                vocabGenre: result.vocabGenre,
            });
        }
    };

    makeSound = ({
        vocabList,
        vocabGenre,
    }: {
        vocabList: vocab[];
        vocabGenre: vocabGenre;
    }) => {
        const vocabSounds: sound[] = [];

        vocabList.length > 0 &&
            vocabList.forEach((v: vocab) => {
                const audio = new window.Audio();
                audio.preload = "none";
                audio.autoplay = false;
                audio.src = `${BLOB_URL}/vocabulary-quiz/audio/${vocabGenre.genreName}/Japanese-vocabulary${v.vocabId}.m4a`;
                vocabSounds[v.vocabId] = { audio, playable: false };
            });

        this.setState({ vocabSounds });
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

    checkVocabChanged = (v: vocab) => {
        const { initialVocabList } = this.state;
        return !compareObjects(
            v,
            initialVocabList?.find(vo => vo.vocabId === v.vocabId)
        );
    };

    render() {
        const { vocabList, vocabGenre, vocabSounds } = this.state;

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

                <div
                    style={{
                        marginBottom: 20,
                        width: 500,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Link to={"/vocabularyEdit"}>一覧へ戻る</Link>
                    <Link to={`/vocabularyVideo/${genreName}`}>Make Video</Link>
                    <button
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
                            <th></th>
                            <th>{"Kanji"}</th>
                            <th></th>
                            <th>{"Hiragana"}</th>
                            <th>{"English"}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...vocabList]
                            ?.sort((a, b) => a.order - b.order)
                            ?.map(v => (
                                <tr
                                    key={v.vocabId}
                                    style={{
                                        backgroundColor: this.checkVocabChanged(
                                            v
                                        )
                                            ? "red"
                                            : undefined,
                                    }}
                                >
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
                                        {vocabSounds[v.vocabId] && (
                                            <Speaker
                                                vocabSound={
                                                    vocabSounds[v.vocabId]
                                                }
                                                vocabId={v.vocabId}
                                            />
                                        )}
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
                                            style={{ width: 220 }}
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

                <div style={{ border: "solid", padding: 20 }}>
                    <p style={{ fontWeight: "bold" }}>SNS Share</p>
                    <div>{`【${titleToShowUpper}】 Japanese Vocabulary Quiz`}</div>
                    <div>{vocabList.map(v => v.hiragana).join(", ")}</div>
                    <div>{`https://youtu.be/${vocabGenre?.youtube}`}</div>
                </div>

                <div style={{ height: 70 }} />
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

    const duplicatedVocab = vocabList.find(
        v =>
            vocabList.filter(
                vo =>
                    v.kanji === vo.kanji ||
                    v.hiragana === vo.hiragana ||
                    v.english === vo.english
            ).length > 1
    );
    if (duplicatedVocab) {
        alert(
            `重複エラー：「${duplicatedVocab.kanji}」の内容と重複したレコードがあります。`
        );
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

interface SpeakerProps {
    vocabSound: sound;
    vocabId: number;
}
class Speaker extends React.Component<
    SpeakerProps,
    {
        showImg: boolean;
    }
> {
    didUnmount: boolean;

    constructor(props: SpeakerProps) {
        super(props);

        this.state = {
            showImg: props.vocabSound.playable,
        };
        this.didUnmount = false;
    }

    componentDidMount() {
        setTimeout(this.loadSound, this.props.vocabId);
    }

    componentDidUpdate(previous: SpeakerProps) {
        if (previous.vocabSound.audio !== this.props.vocabSound.audio) {
            this.setState({ showImg: false });
            setTimeout(this.loadSound);
        }
    }

    loadSound = () => {
        const { vocabSound } = this.props;
        vocabSound.audio.oncanplaythrough = () => {
            if (!this.didUnmount) this.setState({ showImg: true });
            vocabSound.playable = true;
        };
        vocabSound.audio.load();
    };

    componentWillUnmount() {
        this.didUnmount = true;
    }

    render() {
        const { showImg } = this.state;
        const { vocabSound } = this.props;
        return showImg ? (
            <img
                alt="vocabulary speaker"
                src={BLOB_URL + "/vocabulary-quiz/img/speaker.png"}
                style={{ width: "60%", maxWidth: 30, cursor: "pointer" }}
                onClick={() => {
                    void vocabSound?.audio?.play();
                }}
            />
        ) : null;
    }
}

export default VocabEdit;
