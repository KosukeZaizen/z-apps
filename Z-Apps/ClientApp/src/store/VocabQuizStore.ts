import { Action } from "redux";
import * as consts from "../common/consts";
import {
    loadLocalStorageOrDB,
    reloadAndRedirect_OneTimeReload,
} from "../common/functions";
import { cFetch } from "../common/util/cFetch";
import { sound, vocab, vocabGenre } from "../types/vocab";
import { AppThunkAction, AsMapObject } from "./configureStore";

const fileName = "VocabQuizStore";

type initializeAction = { type: "INITIALIZE" };
type receiveGenreAndVocabAction = {
    type: "RECEIVE_GENRE_AND_VOCAB";
    genreAndVocab: Pick<IVocabQuizState, "vocabGenre" | "vocabList">;
};
type receiveAllGenresAction = {
    type: "RECEIVE_ALL_GENRES";
    allGenres: vocabGenre[];
};
type receiveAllVocabsAction = {
    type: "RECEIVE_ALL_VOCABS";
    allVocabs: vocab[];
};
type changePageAction = { type: "CHANGE_PAGE"; nextPage: TPageNumber };

type KnownAction =
    | initializeAction
    | receiveGenreAndVocabAction
    | receiveAllGenresAction
    | receiveAllVocabsAction
    | changePageAction;

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

interface IActionCreators {
    loadVocabs: (genreName: string) => AppThunkAction<Action>;
    changePage: (nextPage: TPageNumber) => AppThunkAction<Action>;
    loadAllGenres: () => AppThunkAction<Action>;
    loadAllVocabs: () => AppThunkAction<Action>;
}

export type ActionCreators = AsMapObject<IActionCreators>;

export const actionCreators: ActionCreators = {
    loadAllGenres: () => dispatch => {
        loadLocalStorageOrDB(
            `api/VocabQuiz/GetAllGenres?v=${new Date().getDate()}`,
            "RECEIVE_ALL_GENRES",
            "allGenres",
            fileName,
            dispatch
        );
    },
    loadAllVocabs: () => dispatch => {
        loadLocalStorageOrDB(
            `api/VocabQuiz/GetAllVocabs?v=${new Date().getDate()}`,
            "RECEIVE_ALL_VOCABS",
            "allVocabs",
            fileName,
            dispatch
        );
    },
    loadVocabs: genreName => dispatch => {
        try {
            dispatch({ type: "INITIALIZE" });

            const loadVocabsFromDB = async () => {
                try {
                    const currentGenreName =
                        window.location.pathname
                            .split("/")
                            .filter(a => a)
                            .pop()
                            ?.split("#")
                            .pop() || "";

                    const url = `api/VocabQuiz/GetQuizData/${currentGenreName}`;
                    const response = await cFetch(url);

                    const genreAndVocab: {
                        vocabGenre: vocabGenre;
                        vocabList: vocab[];
                    } = await response.json();

                    dispatch({
                        type: "RECEIVE_GENRE_AND_VOCAB",
                        genreAndVocab,
                    });

                    const { vocabGenre } = genreAndVocab;
                    if (vocabGenre) {
                        if (currentGenreName !== vocabGenre.genreName) {
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
                        reloadAndRedirect_OneTimeReload("db-access-error-time");
                        return;
                    }
                } catch (ex) {
                    reloadAndRedirect_OneTimeReload("db-access-error-time");
                }
            };

            const savedGenres = window.localStorage.getItem(
                fileName + "allGenres"
            );
            const savedAllGenres: vocabGenre[] =
                savedGenres && JSON.parse(savedGenres);

            const savedVocabs = window.localStorage.getItem(
                fileName + "allVocabs"
            );
            const savedAllVocabs: vocab[] =
                savedVocabs && JSON.parse(savedVocabs);

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
                dispatch({ type: "RECEIVE_GENRE_AND_VOCAB", genreAndVocab });
            }
            loadVocabsFromDB();
        } catch (e) {
            reloadAndRedirect_OneTimeReload("db-access-error-time");
        }
    },
    changePage: nextPage => dispatch => {
        void document.getElementById("h1title")?.scrollIntoView(true);
        dispatch({ type: "CHANGE_PAGE", nextPage });
    },
};

export const reducer = (state: IVocabQuizState, action: KnownAction) => {
    state = state || initialState;

    if (action.type === "INITIALIZE") {
        const { allGenres, allVocabs, ...rest } = initialState;
        return { ...state, ...rest };
    }

    if (action.type === "RECEIVE_GENRE_AND_VOCAB") {
        const { vocabGenre, vocabList } = action.genreAndVocab;
        const vocabSounds: sound[] = [];

        vocabList.length > 0 &&
            vocabList.forEach((v: vocab) => {
                const audio = new window.Audio();
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

    if (action.type === "RECEIVE_ALL_GENRES") {
        return {
            ...state,
            allGenres: action.allGenres,
        };
    }

    if (action.type === "RECEIVE_ALL_VOCABS") {
        return {
            ...state,
            allVocabs: action.allVocabs,
        };
    }

    if (action.type === "CHANGE_PAGE") {
        return {
            ...state,
            currentPage: action.nextPage,
        };
    }

    return state;
};
