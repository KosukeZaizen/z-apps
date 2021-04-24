import React, { CSSProperties, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StopAnimation } from "../../../common/animation";
import { sendPost } from "../../../common/functions";
import { vocabGenre } from "../../../types/vocab";
import Head from "../../parts/Helmet";
import { HideFooter } from "../../parts/HideHeaderAndFooter/HideFooter";

async function fetchAllGenres(setAllGenres: (genres: vocabGenre[]) => void) {
    const res = await fetch("api/VocabQuiz/GetAllGenresForEdit");
    setAllGenres(await res.json());
}

function VocabEditTop() {
    const [initGenres, setInitGenres] = useState<vocabGenre[]>([]);
    const [allGenres, setAllGenres] = useState<vocabGenre[]>([]);
    const [newGenreName, setNewGenreName] = useState("");

    const loadAllGenres = () => {
        fetchAllGenres(genres => {
            const g = genres.map(g => {
                g.order *= 10;
                return g;
            });
            setAllGenres(g);
            setInitGenres(g);
        });
    };

    useEffect(() => {
        loadAllGenres();
    }, []);

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

    const checkGenreChanged = (g: vocabGenre) =>
        !compareGenres(
            g,
            initGenres.find(pg => pg.genreId === g.genreId)
        );

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
                        .map(g => {
                            return (
                                <tr
                                    key={g.genreId}
                                    style={{
                                        backgroundColor: checkGenreChanged(g)
                                            ? "red"
                                            : undefined,
                                    }}
                                >
                                    <td>
                                        <input
                                            type="number"
                                            value={g.order
                                                .toString()
                                                .replace(/^0+/, "")}
                                            style={{ width: 70 }}
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
                                    <td style={{ backgroundColor: "white" }}>
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
                                    <td
                                        style={{
                                            paddingLeft: 20,
                                            backgroundColor: "white",
                                        }}
                                    >
                                        {initGenres.some(
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
                            );
                        })}
                </tbody>
            </table>
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
                            save(allGenres, () => {
                                loadAllGenres();
                            });
                        }}
                        style={{ width: "100%" }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}

export function InputRegisterToken({ style }: { style?: CSSProperties }) {
    const [token, setToken] = useState("");

    useEffect(() => {
        const saveData = localStorage.getItem("folktales-register-token");
        const objSaveData = saveData && JSON.parse(saveData);
        const token = objSaveData?.token || "";
        setToken(token);
    }, []);

    return (
        <input
            style={style}
            value={token}
            onChange={ev => {
                const newToken = ev.target.value;
                setToken(newToken);

                if (newToken) {
                    localStorage.setItem(
                        "folktales-register-token",
                        JSON.stringify({ token: newToken })
                    );
                }
            }}
        />
    );
}

async function save(allGenres: vocabGenre[], fncAfterSaving: () => void) {
    if (!window.confirm("Do you really want to save?")) {
        return;
    }

    const saveData = localStorage.getItem("folktales-register-token");
    const objSaveData = saveData && JSON.parse(saveData);
    const token = objSaveData?.token || "";

    try {
        const result = await sendPost(
            {
                genres: allGenres,
                token,
            },
            "/api/VocabQuiz/SaveVocabGenres"
        );

        if (result === true) {
            if (typeof fncAfterSaving === "function") {
                fncAfterSaving();
            }
            alert("success!");
            return;
        }
    } catch (ex) {}

    alert("failed...");
}

function compareGenres(a?: vocabGenre, b?: vocabGenre) {
    if (!a || !b) {
        return false;
    }
    const keys = Object.keys(a) as (keyof vocabGenre)[];
    return keys.every(key => a[key] === b[key]);
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

export default VocabEditTop;
