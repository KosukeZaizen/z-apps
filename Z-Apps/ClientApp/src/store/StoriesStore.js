const requestStoriesType = 'REQUEST_STORIES';
const receiveStoriesType = 'RECEIVE_STORIES';
const initialState = { pageContents: [], isLoading: false };

export const actionCreators = {
    loadStory: (storyName) => async (dispatch, getState) => {
        try {
            dispatch({ type: requestStoriesType });

            const url = `api/Stories/GetPageData/${storyName}`;
            const response = await fetch(url);
            const pageContents = await response.json();

            dispatch({ type: receiveStoriesType, pageContents });

        } catch (e) {
            window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
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
