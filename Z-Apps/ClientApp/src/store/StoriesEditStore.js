const receiveStoryType = 'RECEIVE_STORY';
const receiveSentencesType = 'RECEIVE_SENTENCES';
const receiveWordsType = 'RECEIVE_WORDS';
const changeSentenceType = 'CHANGE_SENTENCE';
const initialState = { storyDesc: [], sentences: [], words: [] };

export const actionCreators = {
    loadStory: (storyName) => async (dispatch, getState) => {
        try {
            const url = `api/Stories/GetPageData/${storyName}`;
            const response = await fetch(url);
            const storyDesc = await response.json();

            dispatch({ type: receiveStoryType, storyDesc });

        } catch (e) {
            window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },
    loadSentences: (storyId) => async (dispatch, getState) => {
        try {
            const url = `api/Stories/GetSentences/${storyId}`;
            const response = await fetch(url);
            const sentences = await response.json();

            dispatch({ type: receiveSentencesType, sentences });

        } catch (e) {
            window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },
    loadWords: (storyId) => async (dispatch, getState) => {
        try {
            const url = `api/Stories/GetWords/${storyId}`;
            const response = await fetch(url);
            const words = await response.json();

            dispatch({ type: receiveWordsType, words });

        } catch (e) {
            window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },
    translate: (storyId) => async (dispatch, getState) => {
        try {
            const url = `api/Stories/GetWords/${storyId}`;
            const response = await fetch(url);
            const words = await response.json();

            dispatch({ type: receiveWordsType, words });

        } catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },
    handleChangeSentence: (event, i, lang) => (dispatch, getState) => {
        const s = getState().storiesEdit.sentences.concat();
        s[i][lang] = event.target.value;

        dispatch({ type: changeSentenceType, sentences: s });
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

    if (action.type === changeSentenceType) {
        return {
            ...state,
            sentences: action.sentences,
        };
    }
    
    return state;
};
