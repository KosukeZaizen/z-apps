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
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("../components/common/functions");
const initializeType = 'INITIALIZE';
const receiveStoryType = 'RECEIVE_STORY';
const receiveSentencesType = 'RECEIVE_SENTENCES';
const receiveWordsType = 'RECEIVE_WORDS';
const receiveOtherStoriesType = 'RECEIVE_OTHER_STORIES';
const initialState = { storyDesc: [], sentences: [], words: [], otherStories: [] };
exports.actionCreators = {
    loadStory: (storyName) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            dispatch({ type: initializeType });
            //story
            const url1 = `api/Stories/GetPageData/${storyName}`;
            const response1 = yield fetch(url1);
            const storyDesc = yield response1.json();
            dispatch({ type: receiveStoryType, storyDesc });
            if (storyDesc) {
                if (storyName !== storyDesc.storyName) {
                    if (!storyDesc.storyName) {
                        functions_1.serverSideErrorProc();
                    }
                    else if (storyName.toLowerCase === storyDesc.storyName.toLowerCase) {
                        window.location.href = `/folktales/${storyDesc.storyName}`;
                    }
                    return;
                }
            }
            else {
                functions_1.serverSideErrorProc();
                return;
            }
            //sentences
            const storyId = storyDesc.storyId;
            const url2 = `api/Stories/GetSentences/${storyId}`;
            const response2 = yield fetch(url2);
            const sentences = yield response2.json();
            dispatch({ type: receiveSentencesType, sentences });
            //words
            const url3 = `api/Stories/GetWords/${storyId}`;
            const response3 = yield fetch(url3);
            const words = yield response3.json();
            dispatch({ type: receiveWordsType, words });
            //other stories
            const url4 = `api/Stories/GetOtherStories/${storyId}`;
            const response4 = yield fetch(url4);
            const otherStories = yield response4.json();
            dispatch({ type: receiveOtherStoriesType, otherStories });
        }
        catch (e) {
            window.location.reload();
        }
    }),
};
exports.reducer = (state, action) => {
    state = state || initialState;
    if (action.type === initializeType) {
        return initialState;
    }
    if (action.type === receiveStoryType) {
        return Object.assign(Object.assign({}, state), { storyDesc: action.storyDesc });
    }
    if (action.type === receiveSentencesType) {
        return Object.assign(Object.assign({}, state), { sentences: action.sentences });
    }
    if (action.type === receiveWordsType) {
        return Object.assign(Object.assign({}, state), { words: action.words });
    }
    if (action.type === receiveOtherStoriesType) {
        return Object.assign(Object.assign({}, state), { otherStories: action.otherStories });
    }
    return state;
};
