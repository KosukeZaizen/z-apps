import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StopAnimation } from "../../../common/animation";
import { ApplicationState } from "../../../store/configureStore";
import * as vocabStore from "../../../store/VocabQuizStore";
import { vocabGenre } from "../../../types/vocab";
import Head from "../../parts/Helmet";

type Props = vocabStore.IVocabQuizState &
    vocabStore.ActionCreators & {
        location: { pathname: string };
    };

function VocabQuizTop({ loadAllGenres, allGenres: pGenres }: Props) {
    const [allGenres, setAllGenres] = useState(pGenres);
    const [newGenreName, setNewGenreName] = useState("");

    useEffect(() => {
        loadAllGenres();
    }, []);

    useEffect(() => {
        setAllGenres(pGenres);
    }, [pGenres]);

    const changeGenre = (
        originalGenre: vocabGenre,
        target: keyof vocabGenre,
        newValue: vocabGenre[keyof vocabGenre]
    ) => {
        const newGenre = { ...originalGenre, [target]: newValue };
        setAllGenres([
            ...allGenres.filter(g => g.genreId !== newGenre.genreId),
            newGenre,
        ]);
    };

    return (
        <>
            <Head noindex />
            <StopAnimation />
            <h1 style={{ marginBottom: 30 }}>{"Vocabulary Edit"}</h1>

            <div style={{ marginBottom: 30, backgroundColor: "lightyellow" }}>
                <p>New Genre Name:</p>
                <input
                    value={newGenreName}
                    onChange={ev => {
                        setNewGenreName(ev.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        if (!newGenreName) {
                            return;
                        }
                        setAllGenres([
                            ...allGenres,
                            getNewGenre(newGenreName, allGenres),
                        ]);
                        setNewGenreName("");
                    }}
                >
                    Add new genre
                </button>
            </div>

            <table>
                <tbody>
                    {[...allGenres]
                        .sort((a, b) => a.order - b.order)
                        .map(g => (
                            <tr key={g.genreId}>
                                <td>
                                    <input
                                        type="number"
                                        value={g.order}
                                        style={{ width: 50 }}
                                        onChange={ev => {
                                            changeGenre(
                                                g,
                                                "order",
                                                ev.target.value
                                            );
                                        }}
                                    />
                                </td>
                                <td>{g.genreName}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={g.youtube}
                                        onChange={ev => {
                                            changeGenre(
                                                g,
                                                "youtube",
                                                ev.target.value
                                            );
                                        }}
                                    />
                                </td>
                                <td>
                                    {g !==
                                        pGenres.find(
                                            pg => pg.genreId === g.genreId
                                        ) && <button>Register</button>}
                                </td>
                                <td>
                                    {!g.released && (
                                        <p style={{ color: "red", width: 100 }}>
                                            not released
                                        </p>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}

function getNewGenre(genreName: string, allGenres: vocabGenre[]): vocabGenre {
    const maxGenreId = allGenres.reduce(
        (acc, val) => (acc > val.genreId ? acc : val.genreId),
        0
    );
    return {
        genreName,
        genreId: maxGenreId + 1,
        order: 0,
        youtube: "",
        released: false,
    };
}

export default connect(
    (state: ApplicationState) => state.vocabQuiz,
    dispatch => bindActionCreators(vocabStore.actionCreators, dispatch)
)(VocabQuizTop);
