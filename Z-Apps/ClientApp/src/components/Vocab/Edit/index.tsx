import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { StopAnimation } from "../../../common/animation";
import { sendPost } from "../../../common/functions";
import { ApplicationState } from "../../../store/configureStore";
import * as vocabStore from "../../../store/VocabQuizStore";
import { vocab } from "../../../types/vocab";
import Head from "../../parts/Helmet";
import { HideFooter } from "../../parts/HideHeaderAndFooter/HideFooter";
import {
    getCurrentToken,
    InputRegisterToken,
} from "../../parts/InputRegisterToken";

export const Page = {
    menu: 0,
    title: 1,
    list: 2,
    quiz: 3,
    last: 4,
};
export type Page = typeof Page[keyof typeof Page];

export type ChangePage = (nextPage: Page) => void;

type Props = vocabStore.IVocabQuizState &
    vocabStore.ActionCreators & {
        location: { pathname: string };
        match: { params: { [key: string]: string } };
    };
type State = {
    screenWidth: number;
    vocabList: vocab[];
};

class VocabEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            screenWidth: window.innerWidth,
            vocabList: [],
        };
    }

    componentDidMount() {
        const {
            loadVocabs,
            match: { params },
        } = this.props;
        const genreName: string = params.genreName.toString().split("#")[0];
        loadVocabs(genreName);
    }

    componentDidUpdate = (previousProps: Props) => {
        const { vocabList, vocabGenre } = this.props;

        if (vocabList !== previousProps.vocabList) {
            if (vocabList?.length) {
                this.setState({
                    vocabList: vocabList.map(v => {
                        v.order *= 10;
                        return v;
                    }),
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
                });
            }
        }
    };

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

    translateVocab = (v: vocab) => {
        translate(v.kanji, result => {
            this.changeVocab(v.vocabId, result);
        });
    };

    render() {
        const { vocabGenre } = this.props;
        const { vocabList } = this.state;

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
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>{"Order"}</th>
                            <th>{"Kanji"}</th>
                            <th></th>
                            <th>{"Hiragana"}</th>
                            <th>{"English"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vocabList
                            ?.sort((a, b) => a.order - b.order)
                            ?.map(v => (
                                <tr key={v.vocabId}>
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
                                    genreId: vocabGenre.genreId,
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
                                vocabList.forEach(v => this.translateVocab(v));
                            }}
                            style={{ width: "100%", marginBottom: 5 }}
                        >
                            Translate All
                        </button>
                        <button
                            // onClick={() => {
                            //     save(allGenres, () => {
                            //         loadAllGenres();
                            //     });
                            // }}
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

async function translate(
    kanji: string,
    setResult: (result: { hiragana: string; english: string }) => void
) {
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

    setResult(result);
}

export default connect(
    (state: ApplicationState) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators, dispatch)
)(VocabEdit);
