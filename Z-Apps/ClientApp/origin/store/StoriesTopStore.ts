import { serverSideErrorProc } from '../components/common/functions';

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
            window.location.reload();
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