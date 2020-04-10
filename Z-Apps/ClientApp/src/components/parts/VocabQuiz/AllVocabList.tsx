import * as React from 'react';
import { Link } from 'react-router-dom';

import { vocabGenre, vocab } from '../../../types/vocab';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class AllVocabList extends React.Component<{}, {
    allGenres: vocabGenre[];
}> {

    constructor(props) {
        super(props);
        this.state = {
            allGenres: [],
        };
    }

    componentDidMount() {
        this.loadAllVocabs();
    }

    loadAllVocabs = async () => {
        const url = `api/VocabQuiz/GetAllGenres`;
        const res = await fetch(url);
        res && this.setState({ allGenres: await res.json() });
    }

    render() {
        const { allGenres } = this.state;

        const tableHeadStyle: React.CSSProperties = {
            fontSize: "medium",
            fontWeight: "bold",
        };
        const tableElementStyle: React.CSSProperties = {
            fontSize: "medium",
        };

        return (
            <>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: 'papayawhip' }}>
                                <TableCell style={tableHeadStyle} align="center">Genre</TableCell>
                                <TableCell style={tableHeadStyle} align="center">Your score</TableCell>
                                <TableCell style={tableHeadStyle}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                allGenres.map((g: vocabGenre) => (
                                    <TableRow key={g.genreId}>
                                        <TableCell style={{ ...tableElementStyle, fontWeight: "bold" }} align="center">{g.genreName.split("_").map(t => t && (t[0].toUpperCase() + t.substr(1))).join(" ")}</TableCell>
                                        <TableCell style={tableElementStyle} align="center">{(localStorage.getItem(`vocab-quiz-percentage-${g.genreId}`) || "0") + " %"}</TableCell>
                                        <TableCell style={tableElementStyle} align="center">
                                            <Link to={g.genreName}>Try the quiz >></Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}