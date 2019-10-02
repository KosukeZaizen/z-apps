const receiveStoriesType = 'RECEIVE_STORIES';
const initialState = { stories: [] };

export const actionCreators = {
    loadStories: () => async (dispatch) => {
        try {
            const url = `api/Stories/GetAllStories`;
            const response = await fetch(url);
            const stories = await response.json();

            dispatch({ type: receiveStoriesType, stories });

        } catch (e) {
            window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === receiveStoriesType) {
        return {
            ...state,
            stories: action.stories,
        };
    }

    return state;
};
