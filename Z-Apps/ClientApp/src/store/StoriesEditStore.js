const receiveStoryType = 'RECEIVE_STORY';
const receiveSentencesType = 'RECEIVE_SENTENCES';
const receiveWordsType = 'RECEIVE_WORDS';
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

        dispatch({ type: receiveSentencesType, sentences: s });
    },

    handleChangeWord: (event, lineNumber, wordNumber, lang) => (dispatch, getState) => {
        const state = getState().storiesEdit;
        const w = state.words.concat();

        for (let key in w) {
            if (w[key].lineNumber === lineNumber && w[key].wordNumber === wordNumber) {
                w[key][lang] = event.target.value;
            }
        }
        dispatch({ type: receiveWordsType, words: w });
    },

    addLine: (previousLineNumber) => (dispatch, getState) => {
        const state = getState().storiesEdit;

        const s = state.sentences.concat();
        for (let key in s) {
            if (s[key].lineNumber > previousLineNumber) {
                s[key].lineNumber++;
            }
        }
        const sToAdd = {
            storyId: s[0].storyId,
            lineNumber: previousLineNumber + 1,
            kanji: "",
            hiragana: "",
            romaji: "",
            english: "",
        }
        s.splice(previousLineNumber, 0, sToAdd);
        dispatch({ type: receiveSentencesType, sentences: s });

        const w = state.words.concat();
        for (let key in w) {
            if (w[key].lineNumber > previousLineNumber) {
                w[key].lineNumber++;
            }
        }
        const wToAdd = {
            storyId: s[0].storyId,
            lineNumber: previousLineNumber + 1,
            wordNumber: 1,
            kanji: "",
            hiragana: "",
            english: "",
        }
        w.splice(previousLineNumber, 0, wToAdd);
        dispatch({ type: receiveWordsType, words: w });
    },

    addWord: (lineNumber, wordNumber) => (dispatch, getState) => {
        const state = getState().storiesEdit;
        const w = state.words.concat();

        for (let key in w) {
            if (w[key].lineNumber === lineNumber && w[key].wordNumber > wordNumber) {
                w[key].wordNumber++;
            }
        }
        const wToAdd = {
            storyId: w[0],
            lineNumber: lineNumber,
            wordNumber: wordNumber + 1,
            kanji: "",
            hiragana: "",
            english: "",
        }
        w.push(wToAdd);
        dispatch({ type: receiveWordsType, words: w });
    },


    removeWord: (lineNumber, wordNumber) => (dispatch, getState) => {
        const state = getState().storiesEdit;
        const w = state.words.concat();

        for (let key in w) {
            if (w[key].lineNumber === lineNumber) {
                if (w[key].wordNumber > wordNumber) {
                    w[key].wordNumber--;
                } else if (w[key].wordNumber === wordNumber) {
                    w.splice(key, 1);
                }
            }
        }
        dispatch({ type: receiveWordsType, words: w });
    }
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

    return state;
};
