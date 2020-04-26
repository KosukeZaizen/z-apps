const receiveStoriesType = 'RECEIVE_STORIES';
const initialState = { allStories: [] };

export const actionCreators = {
    loadAllStories: () => async (dispatch) => {
        try {
            const url = `api/Stories/GetAllStories?v=${new Date().getDate()}`;
            const response = await fetch(url);
            const allStories = await response.json();

            dispatch({ type: receiveStoriesType, allStories });

        } catch (e) {
            window.location.reload(true);
        }
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === receiveStoriesType) {
        return {
            ...state,
            allStories: action.allStories,
        };
    }
    return state;
};
