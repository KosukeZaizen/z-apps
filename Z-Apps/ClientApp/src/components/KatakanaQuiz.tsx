import * as React from "react";
import { Link } from "react-router-dom";
import FB from "./parts/FaceBook";
import Head from "./parts/Helmet";
import "./parts/KanaQuiz/KanaQuiz.css";
import { QuizCore } from "./parts/KanaQuiz/KanaQuizCore";

interface Props {}
class KatakanaQuiz extends React.Component {
    consts: {
        KANA_TYPE: "Katakana";
        OTHER_KANA_TYPE: "Hiragana";
        KANA_LIST: {
            a: "ア";
            i: "イ";
            u: "ウ";
            e: "エ";
            o: "オ";
            ka: "カ";
            ki: "キ";
            ku: "ク";
            ke: "ケ";
            ko: "コ";
            sa: "サ";
            shi: "シ";
            su: "ス";
            se: "セ";
            so: "ソ";
            ta: "タ";
            chi: "チ";
            tsu: "ツ";
            te: "テ";
            to: "ト";
            na: "ナ";
            ni: "ニ";
            nu: "ヌ";
            ne: "ネ";
            no: "ノ";
            ha: "ハ";
            hi: "ヒ";
            fu: "フ";
            he: "ヘ";
            ho: "ホ";
            ma: "マ";
            mi: "ミ";
            mu: "ム";
            me: "メ";
            mo: "モ";
            ya: "ヤ";
            yu: "ユ";
            yo: "ヨ";
            ra: "ラ";
            ri: "リ";
            ru: "ル";
            re: "レ";
            ro: "ロ";
            wa: "ワ";
            wo: "ヲ";
            n: "ン";
            ga: "ガ";
            gi: "ギ";
            gu: "グ";
            ge: "ゲ";
            go: "ゴ";
            za: "ザ";
            ji: "ジ";
            zu: "ズ";
            ze: "ゼ";
            zo: "ゾ";
            da: "ダ";
            de: "デ";
            do: "ド";
            ba: "バ";
            bi: "ビ";
            bu: "ブ";
            be: "ベ";
            bo: "ボ";
            pa: "パ";
            pi: "ピ";
            pu: "プ";
            pe: "ペ";
            po: "ポ";
            kya: "キャ";
            kyu: "キュ";
            kyo: "キョ";
            sha: "シャ";
            shu: "シュ";
            sho: "ショ";
            cha: "チャ";
            chu: "チュ";
            cho: "チョ";
            nya: "ニャ";
            nyu: "ニュ";
            nyo: "ニョ";
            hya: "ヒャ";
            hyu: "ヒュ";
            hyo: "ヒョ";
            mya: "ミャ";
            myu: "ミュ";
            myo: "ミョ";
            rya: "リャ";
            ryu: "リュ";
            ryo: "リョ";
            gya: "ギャ";
            gyu: "ギュ";
            gyo: "ギョ";
            ja: "ジャ";
            ju: "ジュ";
            jo: "ジョ";
            bya: "ビャ";
            byu: "ビュ";
            byo: "ビョ";
            pya: "ピャ";
            pyu: "ピュ";
            pyo: "ピョ";
        };
        OBJ_LINKS: {
            "Katakana chart": "https://www.lingual-ninja.com/2018/08/katakana-chart.html";
            "Japlish - Eat a Pee Man!?": "https://www.lingual-ninja.com/2018/09/japlish-wasei-eigo.html";
        };
    };

    constructor(props: Props) {
        super(props);
        this.consts = {
            KANA_TYPE: "Katakana",
            OTHER_KANA_TYPE: "Hiragana",
            KANA_LIST: {
                a: "ア",
                i: "イ",
                u: "ウ",
                e: "エ",
                o: "オ",
                ka: "カ",
                ki: "キ",
                ku: "ク",
                ke: "ケ",
                ko: "コ",
                sa: "サ",
                shi: "シ",
                su: "ス",
                se: "セ",
                so: "ソ",
                ta: "タ",
                chi: "チ",
                tsu: "ツ",
                te: "テ",
                to: "ト",
                na: "ナ",
                ni: "ニ",
                nu: "ヌ",
                ne: "ネ",
                no: "ノ",
                ha: "ハ",
                hi: "ヒ",
                fu: "フ",
                he: "ヘ",
                ho: "ホ",
                ma: "マ",
                mi: "ミ",
                mu: "ム",
                me: "メ",
                mo: "モ",
                ya: "ヤ",
                yu: "ユ",
                yo: "ヨ",
                ra: "ラ",
                ri: "リ",
                ru: "ル",
                re: "レ",
                ro: "ロ",
                wa: "ワ",
                wo: "ヲ",
                n: "ン",
                ga: "ガ",
                gi: "ギ",
                gu: "グ",
                ge: "ゲ",
                go: "ゴ",
                za: "ザ",
                ji: "ジ",
                zu: "ズ",
                ze: "ゼ",
                zo: "ゾ",
                da: "ダ",
                de: "デ",
                do: "ド",
                ba: "バ",
                bi: "ビ",
                bu: "ブ",
                be: "ベ",
                bo: "ボ",
                pa: "パ",
                pi: "ピ",
                pu: "プ",
                pe: "ペ",
                po: "ポ",
                kya: "キャ",
                kyu: "キュ",
                kyo: "キョ",
                sha: "シャ",
                shu: "シュ",
                sho: "ショ",
                cha: "チャ",
                chu: "チュ",
                cho: "チョ",
                nya: "ニャ",
                nyu: "ニュ",
                nyo: "ニョ",
                hya: "ヒャ",
                hyu: "ヒュ",
                hyo: "ヒョ",
                mya: "ミャ",
                myu: "ミュ",
                myo: "ミョ",
                rya: "リャ",
                ryu: "リュ",
                ryo: "リョ",
                gya: "ギャ",
                gyu: "ギュ",
                gyo: "ギョ",
                ja: "ジャ",
                ju: "ジュ",
                jo: "ジョ",
                bya: "ビャ",
                byu: "ビュ",
                byo: "ビョ",
                pya: "ピャ",
                pyu: "ピュ",
                pyo: "ピョ",
            },
            OBJ_LINKS: {
                "Katakana chart":
                    "https://www.lingual-ninja.com/2018/08/katakana-chart.html",
                "Japlish - Eat a Pee Man!?":
                    "https://www.lingual-ninja.com/2018/09/japlish-wasei-eigo.html",
            },
        };
    }

    render() {
        return (
            <div className="kana-quiz center">
                <Head
                    title="Katakana Quiz"
                    desc="A web app to remember Katakana! I hope this will help you to study!"
                />
                <div
                    className="breadcrumbs"
                    itemScope
                    itemType="https://schema.org/BreadcrumbList"
                    style={{ textAlign: "left", maxWidth: "600px" }}
                >
                    <span
                        itemProp="itemListElement"
                        itemScope
                        itemType="http://schema.org/ListItem"
                    >
                        <Link
                            to="/"
                            itemProp="item"
                            style={{ marginRight: "5px", marginLeft: "5px" }}
                        >
                            <span itemProp="name">{"Home"}</span>
                        </Link>
                        <meta itemProp="position" content="1" />
                    </span>
                    {" > "}
                    <span
                        itemProp="itemListElement"
                        itemScope
                        itemType="http://schema.org/ListItem"
                    >
                        <Link
                            to="/hiragana-katakana"
                            itemProp="item"
                            style={{ marginRight: "5px", marginLeft: "5px" }}
                        >
                            <span itemProp="name">
                                {"Hiragana and Katakana"}
                            </span>
                            <meta itemProp="position" content="2" />
                        </Link>
                    </span>
                    {" > "}
                    <span
                        itemProp="itemListElement"
                        itemScope
                        itemType="http://schema.org/ListItem"
                    >
                        <span
                            itemProp="name"
                            style={{ marginRight: "5px", marginLeft: "5px" }}
                        >
                            {"Katakana Quiz"}
                        </span>
                        <meta itemProp="position" content="3" />
                    </span>
                </div>
                <hr style={{ maxWidth: "600px" }} />
                <QuizCore consts={this.consts} />
                <div style={{ maxWidth: "600px" }}>
                    <hr />
                    <br />
                    <Link to="/vocabulary-list">
                        <button className="btn btn-dark btn-lg btn-block">
                            {"Japanese Vocabulary List"}
                        </button>
                    </Link>
                    <br />
                    <hr />
                </div>
                <div style={{ fontSize: "x-large", margin: "20px" }}>
                    <Link to="/folktales">
                        {"Learn Japanese from Japanese folktales >>"}
                    </Link>
                </div>
                <br />
                <FB />
            </div>
        );
    }
}
export default KatakanaQuiz;
