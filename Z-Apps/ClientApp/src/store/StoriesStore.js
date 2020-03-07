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
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../components/common/functions");
var initializeType = 'INITIALIZE';
var receiveStoryType = 'RECEIVE_STORY';
var receiveSentencesType = 'RECEIVE_SENTENCES';
var receiveWordsType = 'RECEIVE_WORDS';
var receiveOtherStoriesType = 'RECEIVE_OTHER_STORIES';
var initialState = { storyDesc: [], sentences: [], words: [], otherStories: [] };
exports.actionCreators = {
    loadStory: function (storyName) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
        var url1, response1, storyDesc, storyId, url2, response2, sentences, url3, response3, words, url4, response4, otherStories, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    dispatch({ type: initializeType });
                    url1 = "api/Stories/GetPageData/" + storyName;
                    return [4 /*yield*/, fetch(url1)];
                case 1:
                    response1 = _a.sent();
                    return [4 /*yield*/, response1.json()];
                case 2:
                    storyDesc = _a.sent();
                    dispatch({ type: receiveStoryType, storyDesc: storyDesc });
                    if (storyDesc) {
                        if (storyName !== storyDesc.storyName) {
                            if (!storyDesc.storyName) {
                                functions_1.serverSideErrorProc();
                            }
                            else if (storyName.toLowerCase === storyDesc.storyName.toLowerCase) {
                                window.location.href = "/folktales/" + storyDesc.storyName;
                            }
                            return [2 /*return*/];
                        }
                    }
                    else {
                        functions_1.serverSideErrorProc();
                        return [2 /*return*/];
                    }
                    storyId = storyDesc.storyId;
                    url2 = "api/Stories/GetSentences/" + storyId;
                    return [4 /*yield*/, fetch(url2)];
                case 3:
                    response2 = _a.sent();
                    return [4 /*yield*/, response2.json()];
                case 4:
                    sentences = _a.sent();
                    dispatch({ type: receiveSentencesType, sentences: sentences });
                    url3 = "api/Stories/GetWords/" + storyId;
                    return [4 /*yield*/, fetch(url3)];
                case 5:
                    response3 = _a.sent();
                    return [4 /*yield*/, response3.json()];
                case 6:
                    words = _a.sent();
                    dispatch({ type: receiveWordsType, words: words });
                    url4 = "api/Stories/GetOtherStories/" + storyId;
                    return [4 /*yield*/, fetch(url4)];
                case 7:
                    response4 = _a.sent();
                    return [4 /*yield*/, response4.json()];
                case 8:
                    otherStories = _a.sent();
                    dispatch({ type: receiveOtherStoriesType, otherStories: otherStories });
                    return [3 /*break*/, 10];
                case 9:
                    e_1 = _a.sent();
                    window.location.reload();
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); }; },
};
exports.reducer = function (state, action) {
    state = state || initialState;
    if (action.type === initializeType) {
        return initialState;
    }
    if (action.type === receiveStoryType) {
        return __assign(__assign({}, state), { storyDesc: action.storyDesc });
    }
    if (action.type === receiveSentencesType) {
        return __assign(__assign({}, state), { sentences: action.sentences });
    }
    if (action.type === receiveWordsType) {
        return __assign(__assign({}, state), { words: action.words });
    }
    if (action.type === receiveOtherStoriesType) {
        return __assign(__assign({}, state), { otherStories: action.otherStories });
    }
    return state;
};
