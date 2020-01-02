const receiveStoryType = 'RECEIVE_STORY';
const receiveSentencesType = 'RECEIVE_SENTENCES';
const receiveWordsType = 'RECEIVE_WORDS';
const receiveOtherStoriesType = 'RECEIVE_OTHER_STORIES';
const initialState = { storyDesc: [], sentences: [], words: [], otherStories: [] };

export const actionCreators = {
    loadStory: (storyName) => async (dispatch, getState) => {
        try {
            //story
            const url1 = `api/Stories/GetPageData/${storyName}`;
            const response1 = await fetch(url1);
            const storyDesc = await response1.json();
            dispatch({ type: receiveStoryType, storyDesc });

            //sentences
            const storyId = storyDesc.storyId;
            const url2 = `api/Stories/GetSentences/${storyId}`;
            const response2 = await fetch(url2);
            const sentences = await response2.json();
            dispatch({ type: receiveSentencesType, sentences });

            //words
            const url3 = `api/Stories/GetWords/${storyId}`;
            const response3 = await fetch(url3);
            const words = await response3.json();
            dispatch({ type: receiveWordsType, words });

            //other stories
            const url4 = `api/Stories/GetOtherStories/${storyId}`;
            const response4 = await fetch(url4);
            const otherStories = await response4.json();
            dispatch({ type: receiveOtherStoriesType, otherStories });

        } catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            window.location.reload();
            return;
        }
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === receiveStoryType) {
        return {
            ...state,
            storyDesc: action.storyDesc,
        };
    }

    if (action.type === receiveSentencesType) {
        return {
            ...state,
            sentences: action.sentences,
        };
    }

    if (action.type === receiveWordsType) {
        return {
            ...state,
            words: action.words,
        };
    }

    if (action.type === receiveOtherStoriesType) {
        return {
            ...state,
            otherStories: action.otherStories,
        };
    }

    return state;
};
