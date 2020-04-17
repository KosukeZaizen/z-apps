import { reloadAndRedirect_OneTimeReload } from '../components/common/functions';
import { vocabGenre, vocab } from '../types/vocab';

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
        // const state = getState();
        // if(state.vocabQuiz.allGenres?.length > 0) return;

        try {
            const url = `api/VocabQuiz/GetAllGenres`;
            const res = await fetch(url);
            const allGenres = await res.json();

            dispatch({ type: receiveAllGenresType, allGenres });
        } catch (e) {
            reloadAndRedirect_OneTimeReload("db-access-error-time");
        }
    },
    loadAllVocabs: () => async (dispatch, getState) => {
        try {
            const url = `api/VocabQuiz/GetAllVocabs`;
            fetch(url).then(async (res) => {
                const allVocabs = await res.json();
                dispatch({ type: receiveAllVocabsType, allVocabs });
            });
        } catch (e) {
            reloadAndRedirect_OneTimeReload("db-access-error-time");
        }
    },
    loadVocabs: (genreName) => async (dispatch, getState) => {
        try {
            dispatch({ type: initializeType });

            const url = `api/VocabQuiz/GetQuizData/${genreName}`;
            const response = await fetch(url);
            const genreAndVocab: { vocabGenre: vocabGenre; vocabList: vocab[]; } = await response.json();

            dispatch({ type: receiveGenreAndVocabType, genreAndVocab });

            const { vocabGenre } = genreAndVocab;
            if (vocabGenre) {
                if (genreName !== vocabGenre.genreName) {
                    if (!vocabGenre.genreName) {
                        reloadAndRedirect_OneTimeReload("db-access-error-time");
                    } else if (genreName.toLowerCase === vocabGenre.genreName.toLowerCase) {
                        window.location.href = `/vocabulary-quiz/${vocabGenre.genreName}`;
                    }
                    return;
                }
            } else {
                reloadAndRedirect_OneTimeReload("db-access-error-time");
                return;
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
