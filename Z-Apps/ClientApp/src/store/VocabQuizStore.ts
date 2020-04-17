import { reloadAndRedirect_OneTimeReload, loadLocalStorageOrDB } from '../components/common/functions';
import { vocabGenre, vocab } from '../types/vocab';

const fileName = "VocabQuizStore";

const initializeType = 'INITIALIZE';
const receiveGenreAndVocabType = 'RECEIVE_GENRE_AND_VOCAB';
const receiveAllGenresType = 'RECEIVE_ALL_GENRES';
const receiveAllVocabsType = 'RECEIVE_ALL_VOCABS';
const changePageType = 'CHANGE_PAGE';
const initialState = { 
    vocabGenre: null, //specific page
    vocabList: [], //specific page
    allGenres: [], //general
    allVocabs: [], //general
    currentPage: 1 
};

export type TPageNumber = 1 | 2 | 3;

export interface IVocabQuizState {
    allGenres: vocabGenre[];
    allVocabs: vocab[];
    vocabGenre: vocabGenre;
    vocabList: vocab[];
    currentPage: TPageNumber;
}

export interface IActionCreators {
    loadVocabs: (genreName: string) => void;
    changePage: (nextPage: TPageNumber) => void;
    loadAllGenres: () => void;
    loadAllVocabs: () => void;
}

export const actionCreators: IActionCreators = {
    loadAllGenres: () => async (dispatch, getState) => {
        loadLocalStorageOrDB(
            `api/VocabQuiz/GetAllGenres`,
            receiveAllGenresType,
            "allGenres",
            fileName,
            dispatch
        );
    },
    loadAllVocabs: () => async (dispatch, getState) => {
        loadLocalStorageOrDB(
            `api/VocabQuiz/GetAllVocabs`,
            receiveAllVocabsType,
            "allVocabs",
            fileName,
            dispatch
        );
    },
    loadVocabs: (genreName) => async (dispatch, getState) => {
        try {
            dispatch({ type: changePageType, nextPage: 1 });

            const loadVocabsFromDB = async () => {
                const currentGenreName = window.location.pathname.split("/").filter(a => a).pop().split("#").pop();

                const url = `api/VocabQuiz/GetQuizData/${currentGenreName}`;
                const response = await fetch(url);
                const genreAndVocab: { vocabGenre: vocabGenre; vocabList: vocab[]; } = await response.json();

                dispatch({ type: receiveGenreAndVocabType, genreAndVocab });

                const { vocabGenre } = genreAndVocab;
                if (vocabGenre) {
                    if (currentGenreName !== vocabGenre.genreName) {
                        if (!vocabGenre.genreName) {
                            reloadAndRedirect_OneTimeReload("db-access-error-time");
                        } else if (currentGenreName.toLowerCase === vocabGenre.genreName.toLowerCase) {
                            window.location.href = `/vocabulary-quiz/${vocabGenre.genreName}`;
                        }
                        return;
                    }
                } else {
                    reloadAndRedirect_OneTimeReload("db-access-error-time");
                    return;
                }
            }

            const savedAllGenres: vocabGenre[] = JSON.parse(window.sessionStorage.getItem(fileName + "allGenres"));
            const savedAllVocabs: vocab[] = JSON.parse(window.sessionStorage.getItem(fileName + "allVocabs"));

            const genre = savedAllGenres?.filter(g => g.genreName === genreName)?.pop();
            const vocabs = savedAllVocabs?.filter(v => v.genreId === genre.genreId);

            if (vocabs?.length > 0) {
                const genreAndVocab = { vocabGenre: genre, vocabList: vocabs };
                dispatch({ type: receiveGenreAndVocabType, genreAndVocab });
                setTimeout(loadVocabsFromDB, 10000);
            } else {
                loadVocabsFromDB();
            }


        } catch (e) {
            window.location.reload(true);
        }
    },
    changePage: (nextPage) => async (dispatch, getState) => {
        document.getElementById("h1title").scrollIntoView(true);
        dispatch({ type: changePageType, nextPage });
    }
};



export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === initializeType) {
        return initialState;
    }

    if (action.type === receiveGenreAndVocabType) {
        return {
            ...state,
            vocabGenre: action.genreAndVocab.vocabGenre,
            vocabList: action.genreAndVocab.vocabList,
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
