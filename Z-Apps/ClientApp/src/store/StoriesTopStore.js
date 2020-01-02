const receiveStoriesType = 'RECEIVE_STORIES';
const initialState = { allStories: [] };

export const actionCreators = {
    loadAllStories: () => async (dispatch) => {
        try {
            const url = `api/Stories/GetAllStories`;
            const response = await fetch(url);
            const allStories = await response.json();

            dispatch({ type: receiveStoriesType, allStories });

        } catch (e) {
            const savedErrTime = window.sessionStorage.getItem("db-access-error-time");
            const intSavedTime = parseInt(savedErrTime);

            const now = new Date();
            const nowTime = now.getTime();

            if (intSavedTime && (nowTime - intSavedTime < 10000)) {
                window.location.href = `/not-found?p=${window.location.pathname}`;
            } else {
                window.sessionStorage.setItem("db-access-error-time", nowTime.toString());
                window.location.reload();
            }
            return;
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
