"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var commonFnc = __importStar(require("../components/common/functions"));
var receiveStoryType = 'RECEIVE_STORY';
var receiveSentencesType = 'RECEIVE_SENTENCES';
var receiveWordsType = 'RECEIVE_WORDS';
var changeTokenType = 'CHANGTE_TOKEN';
var beginTranslationType = 'BEGIN_TRANSLATION';
var finishTranslationType = 'FINISH_TRANSLATION';
var initialState = { storyDesc: {}, sentences: [], words: [], isTranslating: false, token: "", };
exports.actionCreators = {
    loadStory: function (storyName) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
        var url, response, storyDesc, unescapeHTML, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    url = "api/StoriesEdit/GetPageData/" + storyName;
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    storyDesc = _a.sent();
                    unescapeHTML = function (html) {
                        var escapeEl = document.createElement("textarea");
                        escapeEl.innerHTML = html;
                        return escapeEl.textContent;
                    };
                    storyDesc.description = unescapeHTML(storyDesc.description.split("\\n").join("&#13;&#10;"));
                    dispatch({ type: receiveStoryType, storyDesc: storyDesc });
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    //window.location.href = `/not-found?p=${window.location.pathname}`;
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }; },
    loadSentences: function (storyId) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
        var url, response, sentences, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    url = "api/StoriesEdit/GetSentences/" + storyId;
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    sentences = _a.sent();
                    if (!sentences || sentences.length <= 0) {
                        sentences = [{
                                storyId: storyId,
                                lineNumber: 1,
                                kanji: "",
                                hiragana: "",
                                romaji: "",
                                english: "",
                            }];
                    }
                    dispatch({ type: receiveSentencesType, sentences: sentences });
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    //window.location.href = `/not-found?p=${window.location.pathname}`;
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }; },
    loadWords: function (storyId) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
        var url, response, words, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    url = "api/StoriesEdit/GetWords/" + storyId;
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    words = _a.sent();
                    if (!words || words.length <= 0) {
                        words = [{
                                storyId: storyId,
                                lineNumber: 1,
                                wordNumber: 1,
                                kanji: "",
                                hiragana: "",
                                english: "",
                            }];
                    }
                    dispatch({ type: receiveWordsType, words: words });
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    //window.location.href = `/not-found?p=${window.location.pathname}`;
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }; },
    handleChangeDesc: function (event) { return function (dispatch, getState) {
        var sd = Object.assign({}, getState().storiesEdit.storyDesc);
        sd.description = event.target.value;
        dispatch({ type: receiveStoryType, storyDesc: sd });
    }; },
    handleChangeToken: function (event) { return function (dispatch, getState) {
        var token = event.target.value;
        dispatch({ type: changeTokenType, token: token });
    }; },
    setInitialToken: function () { return function (dispatch, getState) {
        //セーブデータがあればそれを設定
        var saveData = localStorage.getItem("folktales-register-token");
        var objSaveData = JSON.parse(saveData);
        var token;
        if (objSaveData) {
            token = objSaveData.token || "";
        }
        else {
            token = "";
        }
        dispatch({ type: changeTokenType, token: token });
    }; },
    translate: function (sentence) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
        var state, result, s, key, w, trimmedW_1, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!sentence.kanji || sentence.kanji.length <= 0)
                        return [2 /*return*/];
                    dispatch({ type: beginTranslationType });
                    state = getState().storiesEdit;
                    return [4 /*yield*/, commonFnc.sendPost(sentence, "api/StoriesEdit/Translate")];
                case 1:
                    result = _a.sent();
                    s = state.sentences.concat();
                    for (key in s) {
                        if (s[key].lineNumber === sentence.lineNumber) {
                            s[key] = result && result.sentence;
                        }
                    }
                    dispatch({ type: receiveSentencesType, sentences: s });
                    w = state.words.concat();
                    trimmedW_1 = w.filter(function (a) { return a.lineNumber !== sentence.lineNumber; });
                    result && result.words && result.words.map(function (resultWord) {
                        trimmedW_1.push(resultWord);
                    });
                    dispatch({ type: receiveWordsType, words: trimmedW_1 });
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    //window.location.href = `/not-found?p=${window.location.pathname}`;
                    console.log("error at translate", e_4);
                    return [2 /*return*/];
                case 3:
                    dispatch({ type: finishTranslationType });
                    return [2 /*return*/];
            }
        });
    }); }; },
    translateAllSentences: function (saveWidhoutConfirmation) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
        var state, sentences, _loop_1, _a, _b, _i, idx, state_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("start import");
                    dispatch({ type: beginTranslationType });
                    state = getState().storiesEdit;
                    sentences = state.sentences.concat();
                    console.log("Length:" + sentences.length);
                    _loop_1 = function (idx) {
                        var sentence, state_2, result, s, key, w, trimmedW_2, e_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log(idx + "/" + sentences.length);
                                    sentence = sentences[idx];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    if (!sentence.kanji || sentence.kanji.length <= 0)
                                        return [2 /*return*/, { value: void 0 }];
                                    dispatch({ type: beginTranslationType });
                                    state_2 = getState().storiesEdit;
                                    return [4 /*yield*/, commonFnc.sendPost(sentence, "api/StoriesEdit/Translate")];
                                case 2:
                                    result = _a.sent();
                                    s = state_2.sentences.concat();
                                    for (key in s) {
                                        if (s[key].lineNumber === sentence.lineNumber) {
                                            s[key] = result && result.sentence;
                                        }
                                    }
                                    dispatch({ type: receiveSentencesType, sentences: s });
                                    w = state_2.words.concat();
                                    trimmedW_2 = w.filter(function (a) { return a.lineNumber !== sentence.lineNumber; });
                                    result && result.words && result.words.map(function (resultWord) {
                                        trimmedW_2.push(resultWord);
                                    });
                                    dispatch({ type: receiveWordsType, words: trimmedW_2 });
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_5 = _a.sent();
                                    //window.location.href = `/not-found?p=${window.location.pathname}`;
                                    console.log("error at translate", e_5);
                                    return [2 /*return*/, { value: void 0 }];
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    _a = [];
                    for (_b in sentences)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    idx = _a[_i];
                    return [5 /*yield**/, _loop_1(idx)];
                case 2:
                    state_1 = _c.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("finish translate");
                    dispatch({ type: finishTranslationType });
                    saveWidhoutConfirmation();
                    return [2 /*return*/];
            }
        });
    }); }; },
    translateWord: function (pWord) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
        var state, result, w, trimmedW, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!pWord.kanji || pWord.kanji.length <= 0)
                        return [2 /*return*/];
                    state = getState().storiesEdit;
                    return [4 /*yield*/, commonFnc.sendPost(pWord, "api/StoriesEdit/TranslateWord")];
                case 1:
                    result = _a.sent();
                    w = state.words.concat();
                    trimmedW = w.filter(function (a) { return !(a.lineNumber === pWord.lineNumber && a.wordNumber === pWord.wordNumber); });
                    trimmedW.push(result);
                    dispatch({ type: receiveWordsType, words: trimmedW });
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    //window.location.href = `/not-found?p=${window.location.pathname}`;
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    }); }; },
    handleChangeSentence: function (event, i, lang) { return function (dispatch, getState) {
        var s = getState().storiesEdit.sentences.concat();
        s[i][lang] = event.target.value;
        dispatch({ type: receiveSentencesType, sentences: s });
    }; },
    handleChangeWord: function (event, lineNumber, wordNumber, lang) { return function (dispatch, getState) {
        var state = getState().storiesEdit;
        var w = state.words.concat();
        for (var key in w) {
            if (w[key].lineNumber === lineNumber && w[key].wordNumber === wordNumber) {
                w[key][lang] = event.target.value;
            }
        }
        dispatch({ type: receiveWordsType, words: w });
    }; },
    addLine: function (previousLineNumber, kanjiToInsert) { return function (dispatch, getState) {
        var state = getState().storiesEdit;
        var s = state.sentences.concat();
        for (var key in s) {
            if (s[key].lineNumber > previousLineNumber) {
                s[key].lineNumber++;
            }
        }
        var sToAdd = {
            storyId: s[0].storyId,
            lineNumber: previousLineNumber + 1,
            kanji: kanjiToInsert || "",
            hiragana: "",
            romaji: "",
            english: "",
        };
        s.splice(previousLineNumber, 0, sToAdd);
        dispatch({ type: receiveSentencesType, sentences: s });
        var w = state.words.concat();
        for (var key in w) {
            if (w[key].lineNumber > previousLineNumber) {
                w[key].lineNumber++;
            }
        }
        var wToAdd = {
            storyId: s[0].storyId,
            lineNumber: previousLineNumber + 1,
            wordNumber: 1,
            kanji: "",
            hiragana: "",
            english: "",
        };
        w.splice(previousLineNumber, 0, wToAdd);
        dispatch({ type: receiveWordsType, words: w });
    }; },
    addWord: function (lineNumber, wordNumber) { return function (dispatch, getState) {
        var state = getState().storiesEdit;
        var w = state.words.concat();
        for (var key in w) {
            if (w[key].lineNumber === lineNumber && w[key].wordNumber > wordNumber) {
                w[key].wordNumber++;
            }
        }
        var wToAdd = {
            storyId: w[0].storyId,
            lineNumber: lineNumber,
            wordNumber: wordNumber + 1,
            kanji: "",
            hiragana: "",
            english: "",
        };
        w.push(wToAdd);
        dispatch({ type: receiveWordsType, words: w });
    }; },
    removeLine: function (lineNumber) { return function (dispatch, getState) {
        if (window.confirm('Are you sure that you want to remove this line?')) {
            var state = getState().storiesEdit;
            var s = state.sentences.concat()
                .filter(function (sentence) { return !(sentence.lineNumber === lineNumber); })
                .map(function (sentence) {
                if (sentence.lineNumber > lineNumber) {
                    sentence.lineNumber--;
                }
                return sentence;
            });
            dispatch({ type: receiveSentencesType, sentences: s });
            var w = state.words.concat()
                .filter(function (word) { return word.lineNumber !== lineNumber; })
                .map(function (word) {
                if (word.lineNumber > lineNumber) {
                    word.lineNumber--;
                }
                return word;
            });
            dispatch({ type: receiveWordsType, words: w });
        }
    }; },
    removeBlankLine: function () { return function (dispatch, getState) {
        //sentences
        var state = getState().storiesEdit;
        var s = state.sentences.concat()
            .filter(function (sentence) { return sentence.kanji; });
        dispatch({ type: receiveSentencesType, sentences: s });
        //words
        var w = state.words.concat()
            .filter(function (word) { return word.kanji; });
        dispatch({ type: receiveWordsType, words: w });
    }; },
    removeWord: function (lineNumber, wordNumber) { return function (dispatch, getState) {
        if (window.confirm('Are you sure that you want to remove this word?')) {
            var state = getState().storiesEdit;
            var w = state.words.concat()
                .filter(function (word) { return !(word.lineNumber === lineNumber && word.wordNumber === wordNumber); })
                .map(function (word) {
                if (word.lineNumber === lineNumber && word.wordNumber > wordNumber) {
                    word.wordNumber--;
                }
                return word;
            });
            dispatch({ type: receiveWordsType, words: w });
        }
    }; },
    mergeWord: function (lineNumber, wordNumber) { return function (dispatch, getState) {
        if (window.confirm('Do you really want to marge the words?')) {
            var state = getState().storiesEdit;
            var w = state.words.concat().sort(function (a, b) {
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
            for (var key in w) {
                if (w[key].lineNumber === lineNumber && w[key].wordNumber === wordNumber) {
                    if (w[key].lineNumber === w[Number(key) + 1].lineNumber) {
                        w[key].kanji += w[Number(key) + 1].kanji;
                    }
                    else {
                        return;
                    }
                }
            }
            w = w.filter(function (word) { return !(word.lineNumber === lineNumber && word.wordNumber === wordNumber + 1); })
                .map(function (word) {
                if (word.lineNumber === lineNumber && word.wordNumber > wordNumber + 1) {
                    word.wordNumber--;
                }
                return word;
            });
            dispatch({ type: receiveWordsType, words: w });
        }
    }; },
    save: function () { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, storyDesc, sentences, words, token, result, e_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!window.confirm('Are you sure that you want to save?')) return [3 /*break*/, 2];
                    _a = getState().storiesEdit, storyDesc = _a.storyDesc, sentences = _a.sentences, words = _a.words, token = _a.token;
                    localStorage.setItem("folktales-register-token", JSON.stringify({ token: token }));
                    return [4 /*yield*/, commonFnc.sendPost({ storyDesc: storyDesc, sentences: sentences, words: words, token: token }, "api/StoriesEdit/Save")];
                case 1:
                    result = _b.sent();
                    if (result) {
                        alert("Success to save!");
                    }
                    else {
                        alert("Failed to save...");
                    }
                    _b.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    e_7 = _b.sent();
                    console.log(e_7);
                    alert("Error!");
                    alert("Error!");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }; },
    saveWidhoutConfirmation: function () { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, storyDesc, sentences, words, token, result, e_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = getState().storiesEdit, storyDesc = _a.storyDesc, sentences = _a.sentences, words = _a.words, token = _a.token;
                    localStorage.setItem("folktales-register-token", JSON.stringify({ token: token }));
                    return [4 /*yield*/, commonFnc.sendPost({ storyDesc: storyDesc, sentences: sentences, words: words, token: token }, "api/StoriesEdit/Save")];
                case 1:
                    result = _b.sent();
                    if (result) {
                        alert("Success to save!");
                    }
                    else {
                        alert("Failed to save...");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_8 = _b.sent();
                    console.log(e_8);
                    alert("Error!");
                    alert("Error!");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }; },
    register: function () { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, storyDesc, sentences, words, token, result, e_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    if (!window.confirm('Are you sure that you want to register?')) return [3 /*break*/, 4];
                    _a = getState().storiesEdit, storyDesc = _a.storyDesc, sentences = _a.sentences, words = _a.words, token = _a.token;
                    localStorage.setItem("folktales-register-token", JSON.stringify({ token: token }));
                    return [4 /*yield*/, commonFnc.sendPost({ storyDesc: storyDesc, sentences: sentences, words: words, token: token }, "api/StoriesEdit/Save")];
                case 1:
                    result = _b.sent();
                    if (!result) return [3 /*break*/, 3];
                    return [4 /*yield*/, commonFnc.sendPost({ storyDesc: storyDesc, sentences: sentences, words: words, token: token }, "api/StoriesEdit/Register")];
                case 2:
                    result = _b.sent();
                    if (result) {
                        alert("Success to register!");
                        commonFnc.sendPostNoJsonResult({ token: token }, "api/SystemBase/MakeDbBackupAsync"); //make DB backup
                    }
                    else {
                        alert("Failed to register...");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    alert("Failed to save...");
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_9 = _b.sent();
                    console.log(e_9);
                    alert("Error!");
                    alert("Error!");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); }; },
};
exports.reducer = function (state, action) {
    state = state || initialState;
    if (action.type === receiveStoryType) {
        return __assign(__assign({}, state), { storyDesc: action.storyDesc });
    }
    if (action.type === receiveSentencesType) {
        return __assign(__assign({}, state), { sentences: action.sentences });
    }
    if (action.type === receiveWordsType) {
        return __assign(__assign({}, state), { words: action.words });
    }
    if (action.type === beginTranslationType) {
        return __assign(__assign({}, state), { isTranslating: true });
    }
    if (action.type === finishTranslationType) {
        return __assign(__assign({}, state), { isTranslating: false });
    }
    if (action.type === changeTokenType) {
        return __assign(__assign({}, state), { token: action.token });
    }
    return state;
};
