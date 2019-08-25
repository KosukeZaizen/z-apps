const requestStoriesSettingType = 'REQUEST_STORIES_SETTING';
const receiveStoriesSettingType = 'RECEIVE_STORIES_SETTING';
const initialState = { pageContents: [], isLoading: false };

export const actionCreators = {
    requestKanjiConvert: () => async (dispatch, getState) => {
        dispatch({ type: requestStoriesSettingType });
        const url = `api/StoriesSetting/GetPageData?id=1&page=1`;
        const response = await fetch(url);
        const pageContents = await response.json();

        dispatch({ type: receiveStoriesSettingType, pageContents });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestStoriesSettingType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveStoriesSettingType) {
        return {
            ...state,
            pageContents: action.pageContents,
            isLoading: false
        };
    }

    return state;
};
