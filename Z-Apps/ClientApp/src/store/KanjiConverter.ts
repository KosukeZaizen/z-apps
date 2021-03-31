import { cFetch } from "../common/util/cFetch";

const requestKanjiConverterType = "REQUEST_KANJI_CONVERTER";
const receiveKanjiConverterType = "RECEIVE_KANJI_CONVERTER";
const initialState = { convertedWords: [], isLoading: false };

export interface State {
    kanjis: string;
    convertedWords: { convertedWord: string }[];
    isLoading: false;
}

interface RequestKanjiConverter {
    type: typeof requestKanjiConverterType;
    kanjis: string;
}
interface ReceiveKanjiConverter {
    type: typeof receiveKanjiConverterType;
    kanjis: string;
    convertedWords: { convertedWord: string }[];
}

type KnownAction = RequestKanjiConverter | ReceiveKanjiConverter;

export const actionCreators = {
    requestKanjiConvert: (kanjis: string) => async (
        dispatch: (action: KnownAction) => void,
        getState: Function
    ) => {
        if (kanjis === getState().kanjiConverter.kanjis) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({ type: requestKanjiConverterType, kanjis });

        const url = `api/ConvertKanji/Convert?kanjis=${kanjis}`;
        const response = await cFetch(url);
        const convertedWords = await response.json();

        dispatch({ type: receiveKanjiConverterType, kanjis, convertedWords });
    },
};

export const reducer = (state: State, action: KnownAction) => {
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
