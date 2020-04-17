import { reloadAndRedirect_OneTimeReload } from '../components/common/functions';
import { vocabGenre, vocab } from '../types/vocab';

const initializeType = 'INITIALIZE';
const receiveGenreAndVocabType = 'RECEIVE_GENRE_AND_VOCAB';
const receiveAllGenresType = 'RECEIVE_ALL_GENRES';
const changePageType = 'CHANGE_PAGE';
const initialState = { vocabGenre: null, allGenres: [], vocabList: [], currentPage: 1 };

export type TPageNumber = 1 | 2 | 3;

export interface IVocabQuizState {
    allGenres: vocabGenre[];
    vocabGenre: vocabGenre;
    vocabList: vocab[];
    currentPage: TPageNumber;
}

export interface IActionCreators {
    loadVocabs: (genreName: string) => void;
    changePage: (nextPage: TPageNumber) => void;
    loadAllGenres: () => void;
}

export const actionCreators: IActionCreators = {
    loadAllGenres: () => async (dispatch, getState) => {
        const state = getState();
        if(state.vocabQuiz.allGenres?.length > 0) return;

        try {
            const url = `api/VocabQuiz/GetAllGenres`;
            const res = await fetch(url);
            const allGenres = await res.json();

            dispatch({ type: receiveAllGenresType, allGenres });
        } catch (e) {
            reloadAndRedirect_OneTimeReload("db-access-error-time");
        }
    },
    loadVocabs: (genreName) => async (dispatch, getState) => {
        try {
            dispatch({ type: initializeType });

            const url1 = `api/VocabQuiz/GetQuizData/${genreName}`;
            const response1 = await fetch(url1);
            const genreAndVocab: { vocabGenre: vocabGenre; vocabList: vocab[]; } = await response1.json();

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

    if (action.type === changePageType) {
        return {
            ...state,
            currentPage: action.nextPage,
        };
    }

    return state;
};
