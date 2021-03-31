import { cFetch } from "../common/util/cFetch";
import { storyDesc } from "../types/stories";

const receiveStoriesType = "RECEIVE_STORIES";
const initialState = { allStories: [] };

export interface State {
    allStories: storyDesc[];
}

export const actionCreators = {
    loadAllStories: () => async (dispatch: Function) => {
        try {
            const url = "api/Stories/GetAllStories";
            const response = await cFetch(url);
            const allStories = await response.json();

            dispatch({ type: receiveStoriesType, allStories });
        } catch (e) {
            window.location.reload(true);
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
