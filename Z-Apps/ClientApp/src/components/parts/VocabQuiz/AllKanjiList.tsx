import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";
import { Link } from "react-router-dom";
import { vocabGenre } from "../../../types/vocab";
import ShurikenProgress from "../Animations/ShurikenProgress";

interface Props {
    allGenres: vocabGenre[];
    excludeGenreId?: number;
    criteriaRef?: React.RefObject<HTMLHeadingElement>;
}
export default class AllKanjiList extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            allGenres: [],
        };
    }

    render() {
        const { excludeGenreId, criteriaRef, allGenres } = this.props;

        const tableHeadStyle: React.CSSProperties = {
            fontSize: "medium",
            fontWeight: "bold",
        };
        const tableElementStyle: React.CSSProperties = {
            fontSize: "medium",
        };

        return allGenres && allGenres.length > 0 ? (
            <TableContainer component={Paper} ref={criteriaRef}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: "papayawhip" }}>
                            <TableCell style={tableHeadStyle} align="center">
                                Genre
                            </TableCell>
                            <TableCell style={tableHeadStyle} align="center">
                                Your score
                            </TableCell>
                            <TableCell style={tableHeadStyle}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allGenres
                            .filter(g => g.genreId !== excludeGenreId)
                            .map((g: vocabGenre) => {
                                const percentage =
                                    Number(
                                        localStorage.getItem(
                                            `kanji-quiz-percentage-${g.genreId}`
                                        )
                                    ) || 0;
                                return (
                                    <TableRow key={g.genreId}>
                                        <TableCell
                                            style={{
                                                ...tableElementStyle,
                                                fontWeight: "bold",
                                                color:
                                                    percentage === 100
                                                        ? "green"
                                                        : "black",
                                            }}
                                            align="center"
                                        >
                                            {g.genreName
                                                .split("_")
                                                .map(
                                                    t =>
                                                        t &&
                                                        t[0].toUpperCase() +
                                                            t.substr(1)
                                                )
                                                .join(" ")}
                                        </TableCell>
                                        <TableCell
                                            style={
                                                percentage === 100
                                                    ? {
                                                          ...tableElementStyle,
                                                          fontWeight: "bold",
                                                          color: "green",
                                                      }
                                                    : tableElementStyle
                                            }
                                            align="center"
                                        >
                                            {percentage + " %"}
                                        </TableCell>
                                        <TableCell
                                            style={tableElementStyle}
                                            align="center"
                                        >
                                            <Link
                                                to={`/kanji-quiz/${g.genreName}`}
                                            >
                                                <button className="btn btn-primary">
                                                    {"Try Kanji Quiz"}
                                                </button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        ) : (
            <ShurikenProgress key="circle" size="20%" />
        );
    }
}
