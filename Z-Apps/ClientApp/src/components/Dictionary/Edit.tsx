import * as React from "react";
import Button from "reactstrap/lib/Button";
import { cFetch } from "../../common/util/cFetch";
import Head from "../parts/Helmet";
type Props = {
    location: { pathname: string };
    match: { params: { word: string } };
};
type State = {
    word: string;
    xml: string;
    wordId: string;
    snippet: string;
    translatedWord: string;
};

class Dictionary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const { params } = props.match;
        const originalWord = params.word?.toString()?.split("#")[0] || "";

        const encodedWord = originalWord.split(",").join("%2C");
        if (originalWord !== encodedWord) {
            //If the comma was not encoded, use encoded URL to prevent the duplication of the pages
            window.location.href = `/category/${encodedWord}`;
        }

        if (window.location.pathname.split("#")[0].includes("%27")) {
            //基本的にはエンコードされたURLを正とするが、react-routerの仕様上、
            //「%27」のみは「'」を正とする。
            window.location.href = window.location.pathname
                .split("%27")
                .join("'");
        }

        const word = decodeURIComponent(originalWord)
            ?.split("?")
            ?.join("")
            ?.split("&")
            ?.join("");

        this.state = {
            word,
            xml: "",
            wordId: "",
            snippet: "",
            translatedWord: "",
        };
    }

    componentDidMount() {
        const getData = async () => {
            try {
                const url = `api/Wiki/GetEnglishWordAndSnippet?word=${this.state.word}`;
                const res = await cFetch(url);

                const { response, noindex } = await res.json();
                const { xml, wordId, snippet, translatedWord } = JSON.parse(
                    response
                );

                this.setState({
                    wordId,
                    translatedWord,
                    snippet,
                    xml,
                });
            } catch (ex) {
                window.location.href = `/not-found?p=${window.location.pathname}`;
            }
        };
        getData();
    }

    componentDidUpdate(previousProps: Props) {
        if (previousProps.location !== this.props.location) {
            const word =
                this.props.location.pathname
                    .split("/")
                    .filter(a => a)
                    .pop() || "";
            this.setState({
                word: decodeURIComponent(word),
            });
        }
    }

    render() {
        const { xml, word, translatedWord, snippet, wordId } = this.state;

        return (
            <div className="center">
                <Head noindex />
                <input
                    type="text"
                    value={translatedWord}
                    onChange={e => {
                        this.setState({ translatedWord: e.target.value });
                    }}
                    style={{ width: 700, margin: 5, display: "block" }}
                />
                <textarea
                    value={snippet}
                    onChange={e => {
                        this.setState({ snippet: e.target.value });
                    }}
                    style={{
                        width: 700,
                        height: 150,
                        margin: 5,
                        display: "block",
                    }}
                />
                <textarea
                    value={xml}
                    onChange={e => {
                        this.setState({ xml: e.target.value });
                    }}
                    style={{
                        width: 700,
                        height: 500,
                        margin: 5,
                        display: "block",
                    }}
                />
                <Button
                    onClick={() => {
                        if (
                            !window.confirm(
                                `Do you really want to register "${word}"?`
                            )
                        ) {
                            return;
                        }

                        const saveData = localStorage.getItem(
                            "folktales-register-token"
                        );
                        const objSaveData = saveData && JSON.parse(saveData);
                        const token = objSaveData?.token || "";

                        const formData = new FormData();
                        formData.append("word", word);
                        formData.append("token", token);
                        formData.append(
                            "jsonText",
                            JSON.stringify({
                                wordId,
                                snippet,
                                xml,
                                translatedWord,
                            })
                        );

                        fetch("/api/Wiki/Register", {
                            method: "POST",
                            body: formData,
                        });
                    }}
                >
                    Register
                </Button>
            </div>
        );
    }
}

export default Dictionary;
