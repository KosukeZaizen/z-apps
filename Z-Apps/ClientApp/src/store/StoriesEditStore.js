import * as commonFnc from '../components/common/functions';

const receiveStoryType = 'RECEIVE_STORY';
const receiveSentencesType = 'RECEIVE_SENTENCES';
const receiveWordsType = 'RECEIVE_WORDS';
const initialState = { storyDesc: {}, sentences: [], words: [] };

export const actionCreators = {
    loadStory: (storyName) => async (dispatch, getState) => {
        try {
            const url = `api/StoriesEdit/GetPageData/${storyName}`;
            const response = await fetch(url);
            const storyDesc = await response.json();

            const unescapeHTML = (html) => {
                const escapeEl = document.createElement("textarea");
                escapeEl.innerHTML = html;
                return escapeEl.textContent;
            }

            storyDesc.description = unescapeHTML(storyDesc.description.split("\\n").join("&#13;&#10;"));
            dispatch({ type: receiveStoryType, storyDesc });

        } catch (e) {
            window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },

    loadSentences: (storyId) => async (dispatch, getState) => {
        try {
            const url = `api/StoriesEdit/GetSentences/${storyId}`;
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
            const url = `api/StoriesEdit/GetWords/${storyId}`;
            const response = await fetch(url);
            const words = await response.json();

            dispatch({ type: receiveWordsType, words });

        } catch (e) {
            window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },

    handleChangeDesc: (event) => (dispatch, getState) => {
        const sd = Object.assign({}, getState().storiesEdit.storyDesc);
        sd.description = event.target.value;
        dispatch({ type: receiveStoryType, storyDesc: sd });
    },

    translate: (sentence) => async (dispatch, getState) => {
        try {
            const state = getState().storiesEdit;
            const result = await commonFnc.sendPost(sentence, "api/StoriesEdit/Translate");


            const s = state.sentences.concat();
            for (let key in s) {
                if (s[key].lineNumber === sentence.lineNumber) {
                    s[key] = result && result.sentence;
                }
            }
            dispatch({ type: receiveSentencesType, sentences: s });


            const w = state.words.concat();
            const trimmedW = w.filter(a => a.lineNumber !== sentence.lineNumber);
            result && result.words && result.words.map(resultWord => {
                trimmedW.push(resultWord);
            })
            dispatch({ type: receiveWordsType, words: trimmedW });

        } catch (e) {
            window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },

    translateWord: (pWord) => async (dispatch, getState) => {
        try {
            const state = getState().storiesEdit;
            const result = await commonFnc.sendPost(pWord, "api/StoriesEdit/TranslateWord");

            const w = state.words.concat();
            const trimmedW = w.filter(a => !(a.lineNumber === pWord.lineNumber && a.wordNumber === pWord.wordNumber));
            trimmedW.push(result);
            dispatch({ type: receiveWordsType, words: trimmedW });

        } catch (e) {
            console.log(e);
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

    removeLine: (lineNumber, wordNumber) => (dispatch, getState) => {
        if (window.confirm('Are you sure that you want to remove this line?')) {

            const state = getState().storiesEdit;

            const s = state.sentences.concat();
            for (let key in s) {
                if (s[key].lineNumber > lineNumber) {
                    s[key].lineNumber--;
                } else if (s[key].lineNumber === lineNumber) {
                    s.splice(key, 1);
                }
            }
            dispatch({ type: receiveSentencesType, sentences: s });

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
    },

    removeWord: (lineNumber, wordNumber) => (dispatch, getState) => {
        if (window.confirm('Are you sure that you want to remove this word?')) {
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

    return state;
};
