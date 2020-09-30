import * as consts from "../components/common/consts";
import {
    loadLocalStorageOrDB,
    reloadAndRedirect_OneTimeReload,
} from "../components/common/functions";
import { sound, vocab, vocabGenre } from "../types/vocab";

const fileName = "VocabQuizStore";

const initializeType = "INITIALIZE";
const receiveGenreAndVocabType = "RECEIVE_GENRE_AND_VOCAB";
const receiveAllGenresType = "RECEIVE_ALL_GENRES";
const receiveAllVocabsType = "RECEIVE_ALL_VOCABS";
const changePageType = "CHANGE_PAGE";
const initialState = {
    vocabGenre: null, //specific page
    vocabList: [], //specific page
    vocabSounds: [], //specific page
    allGenres: [], //general
    allVocabs: [], //general
    currentPage: 1,
};

export type TPageNumber = 1 | 2 | 3;

export interface IVocabQuizState {
    allGenres: vocabGenre[];
    allVocabs: vocab[];
    vocabGenre: vocabGenre;
    vocabList: vocab[];
    vocabSounds: sound[];
    currentPage: TPageNumber;
}

export interface IActionCreators {
    loadVocabs: (genreName: string) => void;
    changePage: (nextPage: TPageNumber) => void;
    loadAllGenres: () => void;
    loadAllVocabs: () => void;
}

export const actionCreators: IActionCreators = {
    loadAllGenres: () => (dispatch, getState) => {
        loadLocalStorageOrDB(
            `api/VocabQuiz/GetAllGenres?v=${new Date().getDate()}`,
            receiveAllGenresType,
            "allGenres",
            fileName,
            dispatch
        );
    },
    loadAllVocabs: () => (dispatch, getState) => {
        loadLocalStorageOrDB(
            `api/VocabQuiz/GetAllVocabs?v=${new Date().getDate()}`,
            receiveAllVocabsType,
            "allVocabs",
            fileName,
            dispatch
        );
    },
    loadVocabs: genreName => (dispatch, getState) => {
        try {
            dispatch({ type: initializeType });

            const loadVocabsFromDB = () => {
                const currentGenreName = window.location.pathname
                    .split("/")
                    .filter(a => a)
                    .pop()
                    .split("#")
                    .pop();

                const url = `api/VocabQuiz/GetQuizData/${currentGenreName}`;
                fetch(url).then(response => {
                    response
                        .json()
                        .then(
                            (genreAndVocab: {
                                vocabGenre: vocabGenre;
                                vocabList: vocab[];
                            }) => {
                                dispatch({
                                    type: receiveGenreAndVocabType,
                                    genreAndVocab,
                                });

                                const { vocabGenre } = genreAndVocab;
                                if (vocabGenre) {
                                    if (
                                        currentGenreName !==
                                        vocabGenre.genreName
                                    ) {
                                        if (!vocabGenre.genreName) {
                                            reloadAndRedirect_OneTimeReload(
                                                "db-access-error-time"
                                            );
                                        } else if (
                                            currentGenreName.toLowerCase ===
                                            vocabGenre.genreName.toLowerCase
                                        ) {
                                            window.location.href = `/vocabulary-quiz/${vocabGenre.genreName}`;
                                        }
                                        return;
                                    }
                                } else {
                                    reloadAndRedirect_OneTimeReload(
                                        "db-access-error-time"
                                    );
                                    return;
                                }
                            }
                        );
                });
            };

            const savedAllGenres: vocabGenre[] = JSON.parse(
                window.localStorage.getItem(fileName + "allGenres")
            );
            const savedAllVocabs: vocab[] = JSON.parse(
                window.localStorage.getItem(fileName + "allVocabs")
            );

            const genre = savedAllGenres
                ?.filter(g => g?.genreName === genreName)
                ?.pop();
            const vocabs = savedAllVocabs?.filter(
                v => v?.genreId === genre?.genreId
            );

            if (
                vocabs?.length > 0 &&
                !navigator.userAgent.includes("Googlebot")
            ) {
                const genreAndVocab = { vocabGenre: genre, vocabList: vocabs };
                dispatch({ type: receiveGenreAndVocabType, genreAndVocab });
            }
            loadVocabsFromDB();
        } catch (e) {
            //
        }
    },
    changePage: nextPage => (dispatch, getState) => {
        document.getElementById("h1title").scrollIntoView(true);
        dispatch({ type: changePageType, nextPage });
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === initializeType) {
        const { allGenres, allVocabs, ...rest } = initialState;
        return rest;
    }

    if (action.type === receiveGenreAndVocabType) {
        const { vocabGenre, vocabList } = action.genreAndVocab;
        const vocabSounds = [];

        vocabList.length > 0 &&
            vocabList.forEach(v => {
                const audio = new Audio();
                audio.preload = "none";
                audio.autoplay = false;
                audio.src = `${consts.BLOB_URL}/vocabulary-quiz/audio/${vocabGenre.genreName}/Japanese-vocabulary${v.vocabId}.m4a`;
                vocabSounds[v.vocabId] = { audio, playable: false };
            });
        return {
            ...state,
            vocabGenre,
            vocabList,
            vocabSounds,
        };
    }

    if (action.type === receiveAllGenresType) {
        return {
            ...state,
            allGenres: action.allGenres,
        };
    }

    if (action.type === receiveAllVocabsType) {
        return {
            ...state,
            allVocabs: action.allVocabs,
        };
    }

    if (action.type === changePageType) {
        return {
            ...state,
            currentPage: action.nextPage,
        };
    }

    return state;
};
