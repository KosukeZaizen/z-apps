const receiveStoriesType = 'RECEIVE_STORIES';
const initialState = { allStories: [] };

export const actionCreators = {
    loadAllStories: () => async (dispatch) => {
        try {
            const url = `api/Stories/GetAllStories`;
            const response = await fetch(url);
            const allStories = await response.json();

            dispatch({ type: receiveStoriesType, allStories });

            console.log("allStories", allStories);

        } catch (e) {
            window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === receiveStoriesType) {
        console.log("action.allStories", action.allStories);
        return {
            ...state,
            allStories: action.allStories,
        };
    }

    return state;
};
