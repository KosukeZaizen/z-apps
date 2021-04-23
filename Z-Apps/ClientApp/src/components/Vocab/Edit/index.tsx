import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { StopAnimation } from "../../../common/animation";
import { ApplicationState } from "../../../store/configureStore";
import * as vocabStore from "../../../store/VocabQuizStore";
import { vocab } from "../../../types/vocab";
import Head from "../../parts/Helmet";

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

        let timer: number;
        window.onresize = () => {
            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = window.setTimeout(() => {
                this.changeScreenSize();
            }, 100);
        };
    }

    componentDidMount() {
        const {
            loadVocabs,
            match: { params },
        } = this.props;
        const genreName: string = params.genreName.toString().split("#")[0];
        loadVocabs(genreName);

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.changeScreenSize();
            }, i * 1000);
        }
    }

    changeScreenSize = () => {
        if (this.state.screenWidth !== window.innerWidth) {
            this.setState({
                screenWidth: window.innerWidth,
            });
        }
    };

    componentDidUpdate = (previousProps: Props) => {
        if (this.props.vocabList !== previousProps.vocabList) {
            this.setState({ vocabList: this.props.vocabList });
        }
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
                <h1 style={{ marginBottom: 30 }}>{titleToShowUpper}</h1>

                <div style={{ marginBottom: 20 }}>
                    <Link to={"/vocabularyEdit"}>一覧へ戻る</Link>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>{"Kanji"}</th>
                            <th>{"Hiragana"}</th>
                            <th>{"English"}</th>
                            <th>{"Order"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vocabList?.map(v => (
                            <tr key={v.vocabId}>
                                <td>
                                    <input type="text" value={v.kanji} />
                                </td>
                                <td>
                                    <input type="text" value={v.hiragana} />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={v.english}
                                        style={{ width: 250 }}
                                    />
                                </td>
                                <td>
                                    <input type="text" value={v.order} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators, dispatch)
)(VocabEdit);
