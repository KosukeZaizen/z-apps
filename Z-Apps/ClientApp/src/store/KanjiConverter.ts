const requestKanjiConverterType = "REQUEST_KANJI_CONVERTER";
const receiveKanjiConverterType = "RECEIVE_KANJI_CONVERTER";
const initialState = { convertedWords: [], isLoading: false };

export const actionCreators = {
    requestKanjiConvert: kanjis => async (dispatch, getState) => {
        if (kanjis === getState().kanjiConverter.kanjis) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({ type: requestKanjiConverterType, kanjis });

        const url = `api/ConvertKanji/Convert?kanjis=${kanjis}`;
        const response = await fetch(url);
        const convertedWords = await response.json();

        dispatch({ type: receiveKanjiConverterType, kanjis, convertedWords });
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestKanjiConverterType) {
        return {
            ...state,
            kanjis: action.kanjis,
            isLoading: true,
        };
    }

    if (action.type === receiveKanjiConverterType) {
        return {
            ...state,
            kanjis: action.kanjis,
            convertedWords: action.convertedWords,
            isLoading: false,
        };
    }

    return state;
};
