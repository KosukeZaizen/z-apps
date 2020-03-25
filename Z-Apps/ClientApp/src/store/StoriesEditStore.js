"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonFnc = __importStar(require("../components/common/functions"));
const receiveStoryType = 'RECEIVE_STORY';
const receiveSentencesType = 'RECEIVE_SENTENCES';
const receiveWordsType = 'RECEIVE_WORDS';
const changeTokenType = 'CHANGTE_TOKEN';
const beginTranslationType = 'BEGIN_TRANSLATION';
const finishTranslationType = 'FINISH_TRANSLATION';
const initialState = { storyDesc: {}, sentences: [], words: [], isTranslating: false, token: "", };
exports.actionCreators = {
    loadStory: (storyName) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const url = `api/StoriesEdit/GetPageData/${storyName}`;
            const response = yield fetch(url);
            const storyDesc = yield response.json();
            const unescapeHTML = (html) => {
                const escapeEl = document.createElement("textarea");
                escapeEl.innerHTML = html;
                return escapeEl.textContent;
            };
            storyDesc.description = unescapeHTML(storyDesc.description.split("\\n").join("&#13;&#10;"));
            dispatch({ type: receiveStoryType, storyDesc });
        }
        catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    }),
    loadSentences: (storyId) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const url = `api/StoriesEdit/GetSentences/${storyId}`;
            const response = yield fetch(url);
            let sentences = yield response.json();
            if (!sentences || sentences.length <= 0) {
                sentences = [{
                        storyId,
                        lineNumber: 1,
                        kanji: "",
                        hiragana: "",
                        romaji: "",
                        english: "",
                    }];
            }
            dispatch({ type: receiveSentencesType, sentences });
        }
        catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    }),
    loadWords: (storyId) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const url = `api/StoriesEdit/GetWords/${storyId}`;
            const response = yield fetch(url);
            let words = yield response.json();
            if (!words || words.length <= 0) {
                words = [{
                        storyId,
                        lineNumber: 1,
                        wordNumber: 1,
                        kanji: "",
                        hiragana: "",
                        english: "",
                    }];
            }
            dispatch({ type: receiveWordsType, words });
        }
        catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    }),
    handleChangeDesc: (event) => (dispatch, getState) => {
        const sd = Object.assign({}, getState().storiesEdit.storyDesc);
        sd.description = event.target.value;
        dispatch({ type: receiveStoryType, storyDesc: sd });
    },
    handleChangeToken: (event) => (dispatch, getState) => {
        const token = event.target.value;
        dispatch({ type: changeTokenType, token });
    },
    setInitialToken: () => (dispatch, getState) => {
        //セーブデータがあればそれを設定
        const saveData = localStorage.getItem("folktales-register-token");
        const objSaveData = JSON.parse(saveData);
        let token;
        if (objSaveData) {
            token = objSaveData.token || "";
        }
        else {
            token = "";
        }
        dispatch({ type: changeTokenType, token });
    },
    translate: (sentence) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!sentence.kanji || sentence.kanji.length <= 0)
                return;
            dispatch({ type: beginTranslationType });
            const state = getState().storiesEdit;
            const result = yield commonFnc.sendPost(sentence, "api/StoriesEdit/Translate");
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
            });
            dispatch({ type: receiveWordsType, words: trimmedW });
        }
        catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            console.log("error at translate", e);
            return;
        }
        dispatch({ type: finishTranslationType });
    }),
    translateAllSentences: (saveWidhoutConfirmation) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("start import");
        dispatch({ type: beginTranslationType });
        const state = getState().storiesEdit;
        const sentences = state.sentences.concat();
        console.log("Length:" + sentences.length);
        for (let idx in sentences) {
            console.log(idx + "/" + sentences.length);
            const sentence = sentences[idx];
            try {
                if (!sentence.kanji || sentence.kanji.length <= 0)
                    return;
                dispatch({ type: beginTranslationType });
                const state = getState().storiesEdit;
                const result = yield commonFnc.sendPost(sentence, "api/StoriesEdit/Translate");
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
                });
                dispatch({ type: receiveWordsType, words: trimmedW });
            }
            catch (e) {
                //window.location.href = `/not-found?p=${window.location.pathname}`;
                console.log("error at translate", e);
                return;
            }
        }
        console.log("finish translate");
        dispatch({ type: finishTranslationType });
        saveWidhoutConfirmation();
    }),
    translateWord: (pWord) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!pWord.kanji || pWord.kanji.length <= 0)
                return;
            const state = getState().storiesEdit;
            const result = yield commonFnc.sendPost(pWord, "api/StoriesEdit/TranslateWord");
            const w = state.words.concat();
            const trimmedW = w.filter(a => !(a.lineNumber === pWord.lineNumber && a.wordNumber === pWord.wordNumber));
            trimmedW.push(result);
            dispatch({ type: receiveWordsType, words: trimmedW });
        }
        catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
    }),
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
    addLine: (previousLineNumber, kanjiToInsert) => (dispatch, getState) => {
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
        const w = state.words.concat();
        for (let key in w) {
            if (w[key].lineNumber === lineNumber && w[key].wordNumber > wordNumber) {
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
    removeLine: (lineNumber) => (dispatch, getState) => {
        if (window.confirm('Are you sure that you want to remove this line?')) {
            const state = getState().storiesEdit;
            const s = state.sentences.concat()
                .filter(sentence => !(sentence.lineNumber === lineNumber))
                .map(sentence => {
                if (sentence.lineNumber > lineNumber) {
                    sentence.lineNumber--;
                }
                return sentence;
            });
            dispatch({ type: receiveSentencesType, sentences: s });
            const w = state.words.concat()
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
        const state = getState().storiesEdit;
        const s = state.sentences.concat()
            .filter(sentence => sentence.kanji);
        dispatch({ type: receiveSentencesType, sentences: s });
        //words
        const w = state.words.concat()
            .filter(word => word.kanji);
        dispatch({ type: receiveWordsType, words: w });
    },
    removeWord: (lineNumber, wordNumber) => (dispatch, getState) => {
        if (window.confirm('Are you sure that you want to remove this word?')) {
            const state = getState().storiesEdit;
            const w = state.words.concat()
                .filter(word => !(word.lineNumber === lineNumber && word.wordNumber === wordNumber))
                .map(word => {
                if (word.lineNumber === lineNumber && word.wordNumber > wordNumber) {
                    word.wordNumber--;
                }
                return word;
            });
            dispatch({ type: receiveWordsType, words: w });
        }
    },
    mergeWord: (lineNumber, wordNumber) => (dispatch, getState) => {
        if (window.confirm('Do you really want to marge the words?')) {
            const state = getState().storiesEdit;
            let w = state.words.concat().sort((a, b) => {
                if (a.lineNumber < b.lineNumber)
                    return -1;
                if (a.lineNumber > b.lineNumber)
                    return 1;
                if (a.wordNumber < b.wordNumber)
                    return -1;
                if (a.wordNumber > b.wordNumber)
                    return 1;
                return 0;
            });
            for (let key in w) {
                if (w[key].lineNumber === lineNumber && w[key].wordNumber === wordNumber) {
                    if (w[key].lineNumber === w[Number(key) + 1].lineNumber) {
                        w[key].kanji += w[Number(key) + 1].kanji;
                    }
                    else {
                        return;
                    }
                }
            }
            w = w.filter(word => !(word.lineNumber === lineNumber && word.wordNumber === wordNumber + 1))
                .map(word => {
                if (word.lineNumber === lineNumber && word.wordNumber > wordNumber + 1) {
                    word.wordNumber--;
                }
                return word;
            });
            dispatch({ type: receiveWordsType, words: w });
        }
    },
    save: () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (window.confirm('Are you sure that you want to save?')) {
                const { storyDesc, sentences, words, token } = getState().storiesEdit;
                localStorage.setItem("folktales-register-token", JSON.stringify({ token }));
                const result = yield commonFnc.sendPost({ storyDesc, sentences, words, token }, "api/StoriesEdit/Save");
                if (result) {
                    alert("Success to save!");
                }
                else {
                    alert("Failed to save...");
                }
            }
        }
        catch (e) {
            console.log(e);
            alert("Error!");
            alert("Error!");
        }
    }),
    saveWidhoutConfirmation: () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { storyDesc, sentences, words, token } = getState().storiesEdit;
            localStorage.setItem("folktales-register-token", JSON.stringify({ token }));
            const result = yield commonFnc.sendPost({ storyDesc, sentences, words, token }, "api/StoriesEdit/Save");
            if (result) {
                alert("Success to save!");
            }
            else {
                alert("Failed to save...");
            }
        }
        catch (e) {
            console.log(e);
            alert("Error!");
            alert("Error!");
        }
    }),
    register: () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (window.confirm('Are you sure that you want to register?')) {
                const { storyDesc, sentences, words, token } = getState().storiesEdit;
                localStorage.setItem("folktales-register-token", JSON.stringify({ token }));
                let result = yield commonFnc.sendPost({ storyDesc, sentences, words, token }, "api/StoriesEdit/Save");
                if (result) {
                    result = yield commonFnc.sendPost({ storyDesc, sentences, words, token }, "api/StoriesEdit/Register");
                    if (result) {
                        alert("Success to register!");
                        commonFnc.sendPostNoJsonResult({ token }, "api/SystemBase/MakeDbBackupAsync"); //make DB backup
                    }
                    else {
                        alert("Failed to register...");
                    }
                }
                else {
                    alert("Failed to save...");
                }
            }
        }
        catch (e) {
            console.log(e);
            alert("Error!");
            alert("Error!");
        }
    }),
};
exports.reducer = (state, action) => {
    state = state || initialState;
    if (action.type === receiveStoryType) {
        return Object.assign(Object.assign({}, state), { storyDesc: action.storyDesc });
    }
    if (action.type === receiveSentencesType) {
        return Object.assign(Object.assign({}, state), { sentences: action.sentences });
    }
    if (action.type === receiveWordsType) {
        return Object.assign(Object.assign({}, state), { words: action.words });
    }
    if (action.type === beginTranslationType) {
        return Object.assign(Object.assign({}, state), { isTranslating: true });
    }
    if (action.type === finishTranslationType) {
        return Object.assign(Object.assign({}, state), { isTranslating: false });
    }
    if (action.type === changeTokenType) {
        return Object.assign(Object.assign({}, state), { token: action.token });
    }
    return state;
};
