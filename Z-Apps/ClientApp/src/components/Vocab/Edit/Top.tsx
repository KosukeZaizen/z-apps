import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { StopAnimation } from "../../../common/animation";
import { ApplicationState } from "../../../store/configureStore";
import * as vocabStore from "../../../store/VocabQuizStore";
import { vocabGenre } from "../../../types/vocab";
import Head from "../../parts/Helmet";
import { HideFooter } from "../../parts/HideHeaderAndFooter/HideFooter";

type Props = vocabStore.IVocabQuizState &
    vocabStore.ActionCreators & {
        location: { pathname: string };
    };

function VocabEditTop({ loadAllGenres, allGenres: pGenres }: Props) {
    console.log("pGenres", pGenres);
    const [allGenres, setAllGenres] = useState(pGenres);
    const [newGenreName, setNewGenreName] = useState("");

    useEffect(() => {
        loadAllGenres();
    }, []);

    useEffect(() => {
        setAllGenres(
            pGenres.map(g => {
                g.order *= 10;
                return g;
            })
        );
    }, [pGenres]);

    const changeGenre = (
        originalGenre: vocabGenre,
        targetKey: keyof vocabGenre,
        newValue: vocabGenre[keyof vocabGenre]
    ) => {
        const newGenre = { ...originalGenre, [targetKey]: newValue };
        setAllGenres([
            ...allGenres.filter(g => g.genreId !== newGenre.genreId),
            newGenre,
        ]);
    };

    return (
        <>
            <Head noindex />
            <HideFooter />
            <StopAnimation />
            <h1 style={{ marginBottom: 30 }}>{"Vocabulary Edit"}</h1>

            <div style={{ marginBottom: 30, backgroundColor: "lightyellow" }}>
                <p style={{ fontWeight: "bold", marginBottom: 0 }}>
                    New Genre Name:
                </p>
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
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Genre Name</th>
                        <th>YouTube</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {[...allGenres]
                        .sort((a, b) => a.order - b.order)
                        .map(g => (
                            <tr key={g.genreId}>
                                <td>
                                    <input
                                        type="number"
                                        value={g.order
                                            .toString()
                                            .replace(/^0+/, "")}
                                        style={{ width: 50 }}
                                        onChange={ev => {
                                            changeGenre(
                                                g,
                                                "order",
                                                Number(ev.target.value)
                                            );
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={g.genreName}
                                        onChange={ev => {
                                            changeGenre(
                                                g,
                                                "genreName",
                                                ev.target.value
                                            );
                                        }}
                                    />
                                </td>
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
                                    Release:
                                    <input
                                        type="checkbox"
                                        checked={g.released}
                                        onChange={() => {
                                            changeGenre(
                                                g,
                                                "released",
                                                !g.released
                                            );
                                        }}
                                    />
                                </td>
                                <td style={{ paddingLeft: 20 }}>
                                    {pGenres.some(
                                        pg => pg.genreId === g.genreId
                                    ) && (
                                        <span style={{ margin: "0 10px" }}>
                                            <Link
                                                to={`/vocabularyEdit/${g.genreName}`}
                                            >
                                                Edit
                                            </Link>
                                        </span>
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
)(VocabEditTop);
