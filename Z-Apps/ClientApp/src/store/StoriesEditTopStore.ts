const receiveStoriesType = "RECEIVE_STORIES";
const initialState = { allStories: [] };

export const actionCreators = {
    loadAllStories: () => async (dispatch: Function) => {
        try {
            const url = `api/StoriesEdit/GetAllStories`;
            const response = await fetch(url);
            const allStories = await response.json();

            dispatch({ type: receiveStoriesType, allStories });
        } catch (e) {
            window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },
};

export const reducer = (state: any, action: any) => {
    state = state || initialState;

    if (action.type === receiveStoriesType) {
        return {
            ...state,
            allStories: action.allStories,
        };
    }
    return state;
};
