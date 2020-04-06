import { reloadAndRedirect_OneTimeReload } from '../components/common/functions';
import { vocabGenre, vocab } from '../types/vocab';

const initializeType = 'INITIALIZE';
const receiveGenreAndVocabType = 'RECEIVE_GENRE_AND_VOCAB';
const initialState = { vocabGenre: null, vocabList: [] };

export interface IVocabQuizState {
    vocabGenre: vocabGenre;
    vocabList: vocab[];
}

export interface IActionCreators {
    loadVocabs: (genreName: string) => void;
}

export const actionCreators: IActionCreators = {
    loadVocabs: (genreName) => async (dispatch, getState) => {
        try {
            dispatch({ type: initializeType });

            const url1 = `api/VocabQuiz/GetQuizData/${genreName}`;
            console.log("url1", url1);

            const response1 = await fetch(url1);
            console.log("response", response1);
            
            const genreAndVocab: { vocabGenre: vocabGenre; vocabList: vocab[]; } = await response1.json();
            console.log("genreAndVocab", genreAndVocab);

            dispatch({ type: receiveGenreAndVocabType, genreAndVocab });

            const { vocabGenre } = genreAndVocab;
            if (vocabGenre) {
                if (genreName !== vocabGenre.genreName) {
                    if (!vocabGenre.genreName) {
                        reloadAndRedirect_OneTimeReload("db-access-error-time");
                    } else if (genreName.toLowerCase === vocabGenre.genreName.toLowerCase) {
                        window.location.href = `/folktales/${vocabGenre.genreName}`;
                    }
                    return;
                }
            } else {
                reloadAndRedirect_OneTimeReload("db-access-error-time");
                return;
            }
        } catch (e) {
            console.log("error", e);
            //window.location.reload(true);
        }
    },
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

    return state;
};
