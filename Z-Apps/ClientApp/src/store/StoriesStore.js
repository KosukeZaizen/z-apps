const requestPageType = 'REQUEST_PAGE';
const receivePageType = 'RECEIVE_PAGE';
const requestSentencesType = 'REQUEST_SENTENCES';
const receiveSentencesType = 'RECEIVE_SENTENCES';
const initialState = { storyDesc: [], sentences: [] };

export const actionCreators = {
    loadStory: (storyName) => async (dispatch, getState) => {
        try {
            dispatch({ type: requestPageType });

            const url = `api/Stories/GetPageData/${storyName}`;
            const response = await fetch(url);
            const storyDesc = await response.json();

            dispatch({ type: receivePageType, storyDesc });

        } catch (e) {
            window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },
    loadSentences: (storyId) => async (dispatch, getState) => {
        try {
            dispatch({ type: requestSentencesType });

            const url = `api/Stories/GetSentences/${storyId}`;
            const response = await fetch(url);
            const sentences = await response.json();

            dispatch({ type: receiveSentencesType, sentences });

        } catch (e) {
            window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestPageType) {
        return {
            ...state,
        };
    }

    if (action.type === receivePageType) {
        return {
            ...state,
            storyDesc: action.storyDesc,
        };
    }

    if (action.type === requestSentencesType) {
        return {
            ...state,
        };
    }

    if (action.type === receiveSentencesType) {
        return {
            ...state,
            sentences: action.sentences,
        };
    }

    return state;
};
