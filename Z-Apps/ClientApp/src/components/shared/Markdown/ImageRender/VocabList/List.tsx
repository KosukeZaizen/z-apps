import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import LazyLoad from "react-lazyload";
import { BLOB_URL } from "../../../../../common/consts";
import { vocab, vocabGenre } from "../../../../../types/vocab";
import ShurikenProgress from "../../../Animations/ShurikenProgress";

const tableHeadStyle: React.CSSProperties = {
    fontSize: "medium",
    fontWeight: "bold",
};
const tableElementStyle: React.CSSProperties = {
    fontSize: "medium",
};

type TVListProps = {
    g: vocabGenre;
    vocabList: vocab[];
    noLazyLoad?: boolean;
    style?: React.CSSProperties;
    vocabIncorrectIds?: number[];
    kanjiIncorrectIds?: number[];
};
export function VList({
    g,
    vocabList,
    noLazyLoad,
    style,
    vocabIncorrectIds,
    kanjiIncorrectIds,
}: TVListProps) {
    return vocabList && vocabList.length > 0 ? (
        <Table aria-label="simple table" style={style}>
            <TableHead>
                <TableRow style={{ backgroundColor: "papayawhip" }}>
                    <TableCell style={tableHeadStyle} align="center">
                        Kanji
                    </TableCell>
                    <TableCell style={tableHeadStyle} align="center">
                        Hiragana
                    </TableCell>
                    <TableCell style={tableHeadStyle} align="center">
                        Meaning
                    </TableCell>
                    <TableCell style={tableHeadStyle} align="center">
                        Sound
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {vocabList.map((v: vocab) => (
                    <TableRow key={v.vocabId}>
                        <TableCell
                            style={
                                kanjiIncorrectIds?.includes(v.vocabId)
                                    ? {
                                          ...tableElementStyle,
                                          color: "red",
                                          fontWeight: "bold",
                                      }
                                    : tableElementStyle
                            }
                            align="center"
                        >
                            {v.kanji}
                        </TableCell>
                        <TableCell
                            style={
                                vocabIncorrectIds?.includes(v.vocabId)
                                    ? {
                                          ...tableElementStyle,
                                          color: "red",
                                          fontWeight: "bold",
                                      }
                                    : tableElementStyle
                            }
                            align="center"
                        >
                            {v.hiragana}
                        </TableCell>
                        <TableCell style={tableElementStyle} align="center">
                            {v.english}
                        </TableCell>
                        <TableCell style={tableElementStyle} align="center">
                            {noLazyLoad ? (
                                <Speaker v={v} g={g} />
                            ) : (
                                <LazyLoad>
                                    <Speaker v={v} g={g} />
                                </LazyLoad>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ) : (
        <ShurikenProgress key="circle" size="20%" />
    );
}

interface SpeakerProps {
    v: vocab;
    g: vocabGenre;
}
class Speaker extends React.Component<
    SpeakerProps,
    {
        showImg: boolean;
    }
> {
    vocabSound?: HTMLAudioElement;
    didUnmount: boolean;

    constructor(props: SpeakerProps) {
        super(props);

        this.state = {
            showImg: false,
        };

        this.didUnmount = false;
    }

    componentDidMount = () => {
        this.loadSound();
    };

    loadSound = () => {
        const { v, g } = this.props;

        this.vocabSound = new Audio();
        this.vocabSound.preload = "none";
        this.vocabSound.autoplay = false;
        this.vocabSound.src = `${BLOB_URL}/vocabulary-quiz/audio/${g.genreName}/Japanese-vocabulary${v.vocabId}.m4a`;

        this.vocabSound.oncanplaythrough = () => {
            if (!this.didUnmount) this.setState({ showImg: true });
        };
        this.vocabSound.load();
    };

    componentWillUnmount() {
        this.didUnmount = true;
    }

    render() {
        const { showImg } = this.state;
        const { vocabSound } = this;
        return showImg ? (
            <img
                alt="vocab speaker"
                src={BLOB_URL + "/vocabulary-quiz/img/speaker.png"}
                style={{ width: "60%", maxWidth: 30, cursor: "pointer" }}
                onClick={() => {
                    vocabSound && vocabSound.play();
                }}
            />
        ) : (
            <ShurikenProgress
                key="circle"
                size="100%"
                style={{ width: "60%", maxWidth: 30 }}
            />
        );
    }
}
