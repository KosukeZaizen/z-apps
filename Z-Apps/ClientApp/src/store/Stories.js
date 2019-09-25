const requestStoriesType = 'REQUEST_STORIES';
const receiveStoriesType = 'RECEIVE_STORIES';
const initialState = { pageContents: [], isLoading: false };

export const actionCreators = {
    requestKanjiConvert: kanjis => async (dispatch, getState) => {
        if (kanjis === getState().kanjiConverter.kanjis) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        dispatch({ type: requestStoriesType, kanjis });
        const url = `api/Stories/GetPageData/1/1`;
        const response = await fetch(url);
        const pageContents = await response.json();

        dispatch({ type: receiveStoriesType, kanjis, pageContents });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestStoriesType) {
        return {
            ...state,
            kanjis: action.kanjis,
            isLoading: true
        };
    }

    if (action.type === receiveStoriesType) {
        return {
            ...state,
            kanjis: action.kanjis,
            pageContents: action.pageContents,
            isLoading: false
        };
    }

    return state;
};
