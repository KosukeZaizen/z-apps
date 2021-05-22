import { Action } from "redux";
import * as commonFnc from "../common/functions";
import { sentence, storyDesc, word } from "../types/stories";
import { AppThunkAction, AsMapObject } from "./configureStore";

const receiveStoryType = "RECEIVE_STORY_FOR_EDIT";
const receiveSentencesType = "RECEIVE_SENTENCES_FOR_EDIT";
const receiveWordsType = "RECEIVE_WORDS_FOR_EDIT";
const changeTokenType = "CHANGE_TOKEN_FOR_EDIT";
const beginTranslationType = "BEGIN_TRANSLATION_FOR_EDIT";
const finishTranslationType = "FINISH_TRANSLATION_FOR_EDIT";

export interface StoriesEditState {
    storyDesc: storyDesc;
    sentences: sentence[];
    words: word[];
    token: string;
    isTranslating: boolean;
}

const initialState = {
    storyDesc: {},
    sentences: [],
    words: [],
    isTranslating: false,
    token: "",
};

export interface IActionCreators {
    loadStory: (storyName: string) => AppThunkAction<Action>;
    loadSentences: (storyId: number) => AppThunkAction<Action>;
    loadWords: (storyId: number) => AppThunkAction<Action>;
    setInitialToken: () => AppThunkAction<Action>;
    addLine: (
        previousLineNumber: number,
        kanjiToInsert?: string
    ) => AppThunkAction<Action>;
    removeBlankLine: () => AppThunkAction<Action>;
    translateAllSentences: (
        saveWithoutConfirmation: () => void
    ) => AppThunkAction<Action>;
    saveWithoutConfirmation: () => AppThunkAction<Action>;
    handleChangeDesc: (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => AppThunkAction<Action>;
    handleChangeSentence: (
        event: React.ChangeEvent<HTMLInputElement>,
        i: number,
        lang: string
    ) => AppThunkAction<Action>;
    handleChangeWord: (
        event: React.ChangeEvent<HTMLTextAreaElement>,
        lineNumber: number,
        wordNumber: number,
        lang: string
    ) => AppThunkAction<Action>;
    addWord: (lineNumber: number, wordNumber: number) => AppThunkAction<Action>;
    removeWord: (
        lineNumber: number,
        wordNumber: number
    ) => AppThunkAction<Action>;
    removeLine: (lineNumber: number) => AppThunkAction<Action>;
    translate: (sentence: sentence) => AppThunkAction<Action>;
    translateWord: (pWord: word) => AppThunkAction<Action>;
    mergeWord: (
        lineNumber: number,
        wordNumber: number
    ) => AppThunkAction<Action>;
    handleChangeToken: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => AppThunkAction<Action>;
    save: () => AppThunkAction<Action>;
    register: () => AppThunkAction<Action>;
}

type ActionCreators = AsMapObject<IActionCreators>;

export const actionCreators: ActionCreators = {
    loadStory: storyName => async dispatch => {
        try {
            const url = `api/StoriesEdit/GetPageData/${storyName}`;
            const response = await fetch(url);
            const storyDesc: storyDesc = await response.json();

            const unescapeHTML = (html: string) => {
                const escapeEl = document.createElement("textarea");
                escapeEl.innerHTML = html;
                return escapeEl.textContent;
            };

            storyDesc.description =
                unescapeHTML(
                    storyDesc.description.split("\\n").join("&#13;&#10;")
                ) || "";
            dispatch({ type: receiveStoryType, storyDesc });
        } catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },

    loadSentences: storyId => async dispatch => {
        try {
            const url = `api/StoriesEdit/GetSentences/${storyId}`;
            const response = await fetch(url);
            let sentences = await response.json();

            if (!sentences || sentences.length <= 0) {
                sentences = [
                    {
                        storyId,
                        lineNumber: 1,
                        kanji: "",
                        hiragana: "",
                        romaji: "",
                        english: "",
                    },
                ];
            }

            dispatch({ type: receiveSentencesType, sentences });
        } catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },

    loadWords: storyId => async dispatch => {
        try {
            const url = `api/StoriesEdit/GetWords/${storyId}`;
            const response = await fetch(url);
            let words = await response.json();

            if (!words || words.length <= 0) {
                words = [
                    {
                        storyId,
                        lineNumber: 1,
                        wordNumber: 1,
                        kanji: "",
                        hiragana: "",
                        english: "",
                    },
                ];
            }

            dispatch({ type: receiveWordsType, words });
        } catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },

    handleChangeDesc: event => (dispatch, getState) => {
        const sd = Object.assign({}, getState().storiesEdit.storyDesc);
        sd.description = event.target.value;
        dispatch({ type: receiveStoryType, storyDesc: sd });
    },

    handleChangeToken: event => dispatch => {
        const token = event.target.value;
        dispatch({ type: changeTokenType, token });
    },

    setInitialToken: () => dispatch => {
        //セーブデータがあればそれを設定
        const saveData = localStorage.getItem("folktales-register-token");
        const objSaveData = saveData && JSON.parse(saveData);

        let token;
        if (objSaveData) {
            token = objSaveData.token || "";
        } else {
            token = "";
        }
        dispatch({ type: changeTokenType, token });
    },

    translate: sentence => async (dispatch, getState) => {
        try {
            if (!sentence.kanji || sentence.kanji.length <= 0) return;

            dispatch({ type: beginTranslationType });

            const state: StoriesEditState = getState().storiesEdit;
            const result: {
                sentence: sentence;
                word: word;
                words: word[];
            } = await commonFnc.sendPost(sentence, "api/StoriesEdit/Translate");

            const s = state.sentences.concat();
            for (let key in s) {
                if (s[key].lineNumber === sentence.lineNumber) {
                    s[key] = result && result.sentence;
                }
            }
            dispatch({ type: receiveSentencesType, sentences: s });

            const w = state.words.concat();
            const trimmedW = w.filter(
                a => a.lineNumber !== sentence.lineNumber
            );
            result &&
                result.words &&
                result.words.forEach(resultWord => {
                    trimmedW.push(resultWord);
                });
            dispatch({ type: receiveWordsType, words: trimmedW });
        } catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            console.log("error at translate", e);
            return;
        }
        dispatch({ type: finishTranslationType });
    },

    translateAllSentences: saveWithoutConfirmation => async (
        dispatch,
        getState
    ) => {
        console.log("start import");
        dispatch({ type: beginTranslationType });

        const state = getState().storiesEdit;
        const sentences = state.sentences.concat();

        console.log("Length:" + sentences.length);

        for (let idx in sentences) {
            console.log(idx + "/" + sentences.length);

            const sentence = sentences[idx];
            try {
                if (!sentence.kanji || sentence.kanji.length <= 0) return;

                dispatch({ type: beginTranslationType });

                const state: StoriesEditState = getState().storiesEdit;
                const result: {
                    sentence: sentence;
                    words: word[];
                } = await commonFnc.sendPost(
                    sentence,
                    "api/StoriesEdit/Translate"
                );

                const s = state.sentences.concat();
                for (let key in s) {
                    if (s[key].lineNumber === sentence.lineNumber) {
                        s[key] = result && result.sentence;
                    }
                }
                dispatch({ type: receiveSentencesType, sentences: s });

                const w = state.words.concat();
                const trimmedW = w.filter(
                    a => a.lineNumber !== sentence.lineNumber
                );
                result &&
                    result.words &&
                    result.words.forEach(resultWord => {
                        trimmedW.push(resultWord);
                    });
                dispatch({ type: receiveWordsType, words: trimmedW });
            } catch (e) {
                //window.location.href = `/not-found?p=${window.location.pathname}`;
                console.log("error at translate", e);
                return;
            }
        }
        console.log("finish translate");
        dispatch({ type: finishTranslationType });

        saveWithoutConfirmation();
    },

    translateWord: pWord => async (dispatch, getState) => {
        try {
            if (!pWord.kanji || pWord.kanji.length <= 0) return;

            const state: StoriesEditState = getState().storiesEdit;
            const result = await commonFnc.sendPost(
                pWord,
                "api/StoriesEdit/TranslateWord"
            );

            const w = state.words.concat();
            const trimmedW = w.filter(
                a =>
                    !(
                        a.lineNumber === pWord.lineNumber &&
                        a.wordNumber === pWord.wordNumber
                    )
            );
            trimmedW.push(result);
            dispatch({ type: receiveWordsType, words: trimmedW });
        } catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    },

    handleChangeSentence: (event, i, lang) => (dispatch, getState) => {
        const s: any = getState().storiesEdit.sentences.concat();
        s[i][lang] = event.target.value;

        dispatch({ type: receiveSentencesType, sentences: s });
    },

    handleChangeWord: (event, lineNumber, wordNumber, lang) => (
        dispatch,
        getState
    ) => {
        const state = getState().storiesEdit;
        const w: any = state.words.concat();

        for (let key in w) {
            if (
                w[key].lineNumber === lineNumber &&
                w[key].wordNumber === wordNumber
            ) {
                w[key][lang] = event.target.value;
            }
        }
        dispatch({ type: receiveWordsType, words: w });
    },

    addLine: (previousLineNumber, kanjiToInsert) => (dispatch, getState) => {
        const state = getState().storiesEdit;

        const s = state.sentences.concat();
        for (let key in s) {
            if (s[key].lineNumber > previousLineNumber) {
                s[key].lineNumber++;
            }
        }
        const sToAdd = {
            storyId: s[0]?.storyId,
            lineNumber: previousLineNumber + 1,
            kanji: kanjiToInsert || "",
            hiragana: "",
            romaji: "",
            english: "",
        };
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
        };
        w.splice(previousLineNumber, 0, wToAdd);
        dispatch({ type: receiveWordsType, words: w });
    },

    addWord: (lineNumber, wordNumber) => (dispatch, getState) => {
        const state = getState().storiesEdit;
        const w: any = state.words.concat();

        for (let key in w) {
            if (
                w[key].lineNumber === lineNumber &&
                w[key].wordNumber > wordNumber
            ) {
                w[key].wordNumber++;
            }
        }
        const wToAdd = {
            storyId: w[0].storyId,
            lineNumber: lineNumber,
            wordNumber: wordNumber + 1,
            kanji: "",
            hiragana: "",
            english: "",
        };
        w.push(wToAdd);
        dispatch({ type: receiveWordsType, words: w });
    },

    removeLine: lineNumber => (dispatch, getState) => {
        if (window.confirm("Are you sure that you want to remove this line?")) {
            const state: StoriesEditState = getState().storiesEdit;

            const s = state.sentences
                .concat()
                .filter(sentence => !(sentence.lineNumber === lineNumber))
                .map(sentence => {
                    if (sentence.lineNumber > lineNumber) {
                        sentence.lineNumber--;
                    }
                    return sentence;
                });
            dispatch({ type: receiveSentencesType, sentences: s });

            const w = state.words
                .concat()
                .filter(word => word.lineNumber !== lineNumber)
                .map(word => {
                    if (word.lineNumber > lineNumber) {
                        word.lineNumber--;
                    }
                    return word;
                });
            dispatch({ type: receiveWordsType, words: w });
        }
    },

    removeBlankLine: () => (dispatch, getState) => {
        //sentences
        const state: StoriesEditState = getState().storiesEdit;

        const s = state.sentences.concat().filter(sentence => sentence.kanji);

        dispatch({ type: receiveSentencesType, sentences: s });

        //words
        const w = state.words.concat().filter(word => word.kanji);

        dispatch({ type: receiveWordsType, words: w });
    },

    removeWord: (lineNumber, wordNumber) => (dispatch, getState) => {
        if (window.confirm("Are you sure that you want to remove this word?")) {
            const state: StoriesEditState = getState().storiesEdit;
            const w = state.words
                .concat()
                .filter(
                    word =>
                        !(
                            word.lineNumber === lineNumber &&
                            word.wordNumber === wordNumber
                        )
                )
                .map(word => {
                    if (
                        word.lineNumber === lineNumber &&
                        word.wordNumber > wordNumber
                    ) {
                        word.wordNumber--;
                    }
                    return word;
                });
            dispatch({ type: receiveWordsType, words: w });
        }
    },

    mergeWord: (lineNumber, wordNumber) => (dispatch, getState) => {
        if (window.confirm("Do you really want to marge the words?")) {
            const state: StoriesEditState = getState().storiesEdit;
            let w = state.words.concat().sort((a, b) => {
                if (a.lineNumber < b.lineNumber) return -1;
                if (a.lineNumber > b.lineNumber) return 1;
                if (a.wordNumber < b.wordNumber) return -1;
                if (a.wordNumber > b.wordNumber) return 1;
                return 0;
            });

            for (let key in w) {
                if (
                    w[key].lineNumber === lineNumber &&
                    w[key].wordNumber === wordNumber
                ) {
                    if (w[key].lineNumber === w[Number(key) + 1].lineNumber) {
                        w[key].kanji += w[Number(key) + 1].kanji;
                    } else {
                        return;
                    }
                }
            }

            w = w
                .filter(
                    word =>
                        !(
                            word.lineNumber === lineNumber &&
                            word.wordNumber === wordNumber + 1
                        )
                )
                .map(word => {
                    if (
                        word.lineNumber === lineNumber &&
                        word.wordNumber > wordNumber + 1
                    ) {
                        word.wordNumber--;
                    }
                    return word;
                });
            dispatch({ type: receiveWordsType, words: w });
        }
    },

    save: () => async (dispatch, getState) => {
        try {
            if (window.confirm("Are you sure that you want to save?")) {
                const {
                    storyDesc,
                    sentences,
                    words,
                    token,
                } = getState().storiesEdit;
                localStorage.setItem(
                    "folktales-register-token",
                    JSON.stringify({ token })
                );

                const result = await commonFnc.sendPost(
                    { storyDesc, sentences, words, token },
                    "api/StoriesEdit/Save"
                );

                if (result) {
                    alert("Success to save!");
                } else {
                    alert("Failed to save...");
                }
            }
        } catch (e) {
            console.log(e);
            alert("Error!");
            alert("Error!");
        }
    },

    saveWithoutConfirmation: () => async (dispatch, getState) => {
        try {
            const {
                storyDesc,
                sentences,
                words,
                token,
            } = getState().storiesEdit;
            localStorage.setItem(
                "folktales-register-token",
                JSON.stringify({ token })
            );

            const result = await commonFnc.sendPost(
                { storyDesc, sentences, words, token },
                "api/StoriesEdit/Save"
            );

            if (result) {
                alert("Success to save!");
            } else {
                alert("Failed to save...");
            }
        } catch (e) {
            console.log(e);
            alert("Error!");
            alert("Error!");
        }
    },

    register: () => async (dispatch, getState) => {
        try {
            if (window.confirm("Are you sure that you want to register?")) {
                const {
                    storyDesc,
                    sentences,
                    words,
                    token,
                } = getState().storiesEdit;
                localStorage.setItem(
                    "folktales-register-token",
                    JSON.stringify({ token })
                );

                const result = await commonFnc.sendPost(
                    { storyDesc, sentences, words, token },
                    "api/StoriesEdit/Register"
                );
                if (result) {
                    alert("Success to register!");
                } else {
                    alert("Failed to register...");
                }
            }
        } catch (e) {
            console.log(e);
            alert("Error!");
            alert("Error!");
        }
    },
};

export const reducer = (state: StoriesEditState, action: any) => {
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

    if (action.type === beginTranslationType) {
        return {
            ...state,
            isTranslating: true,
        };
    }

    if (action.type === finishTranslationType) {
        return {
            ...state,
            isTranslating: false,
        };
    }

    if (action.type === changeTokenType) {
        return {
            ...state,
            token: action.token,
        };
    }
    return state;
};
