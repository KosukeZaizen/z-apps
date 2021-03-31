import { reloadAndRedirect_OneTimeReload } from "../common/functions";
import { cFetch } from "../common/util/cFetch";
import { sentence, storyDesc, word } from "../types/stories";
import { AsMapObject } from "./configureStore";

const initializeType = "INITIALIZE";
const receiveStoryType = "RECEIVE_STORY";
const receiveSentencesType = "RECEIVE_SENTENCES";
const receiveWordsType = "RECEIVE_WORDS";
const receiveExpType = "RECEIVE_EXP";
const receiveOtherStoriesType = "RECEIVE_OTHER_STORIES";
const allLoadFinished = "ALL_LOAD_FINISHED";
const initialState = {
    storyDesc: [],
    sentences: [],
    words: {},
    articles: {},
    explanation: "",
    otherStories: [],
    allLoadFinished: false,
};

export interface StoriesState {
    storyDesc: storyDesc;
    sentences: sentence[];
    words: { [key: number]: word[] };
    articles: { [key: number]: { title: string; url: string }[] };
    explanation?: string;
    token: string;
    allLoadFinished: boolean;
}

export type ActionCreators = AsMapObject<IActionCreators>;

interface IActionCreators {
    loadStory: (storyName: string) => void;
}

export const actionCreators: ActionCreators = {
    loadStory: storyName => async (dispatch: Function) => {
        try {
            dispatch({ type: initializeType });

            //story
            const url1 = `api/Stories/GetPageData/${storyName}`;
            const response1 = await cFetch(url1);
            const storyDesc = await response1.json();
            dispatch({ type: receiveStoryType, storyDesc });

            if (storyDesc) {
                if (storyName !== storyDesc.storyName) {
                    if (!storyDesc.storyName) {
                        reloadAndRedirect_OneTimeReload("db-access-error-time");
                    } else if (
                        storyName.toLowerCase ===
                        storyDesc.storyName.toLowerCase
                    ) {
                        window.location.href = `/folktales/${storyDesc.storyName}`;
                    }
                    return;
                }
            } else {
                reloadAndRedirect_OneTimeReload("db-access-error-time");
                return;
            }

            const storyId = storyDesc.storyId;

            /**------------------------------------------------------------
             * fetch
             */
            //sentences
            const url2 = `api/Stories/GetSentences/${storyId}`;
            const response2 = cFetch(url2);

            //words
            const url3 = `api/Stories/GetWords/${storyId}`;
            const response3 = cFetch(url3);

            //explanation article
            const urlExp = `api/Stories/GetExplanation/${storyName}`;
            const responseExp = cFetch(urlExp);

            //other stories
            const url4 = `api/Stories/GetOtherStories/${storyId}`;
            const response4 = cFetch(url4);

            /**------------------------------------------------------------
             * dispatch
             */
            //sentences
            const sentences = await (await response2).json();
            dispatch({ type: receiveSentencesType, sentences });

            //words
            const { words, articles } = await (await response3).json();
            dispatch({ type: receiveWordsType, words, articles });

            //explanation article
            const { explanation } = await (await responseExp).json();
            dispatch({ type: receiveExpType, explanation });

            //other stories
            const otherStories = await (await response4).json();
            dispatch({ type: receiveOtherStoriesType, otherStories });

            //allLoadFinished
            dispatch({ type: allLoadFinished, allLoadFinished: true });
        } catch (e) {
            reloadAndRedirect_OneTimeReload("db-access-error-time");
        }
    },
};

export const reducer = (state: StoriesState, action: any) => {
    state = state || initialState;

    if (action.type === initializeType) {
        return initialState;
    }

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
            articles: action.articles,
        };
    }

    if (action.type === receiveExpType) {
        return {
            ...state,
            explanation: action.explanation,
        };
    }

    if (action.type === receiveOtherStoriesType) {
        return {
            ...state,
            otherStories: action.otherStories,
        };
    }

    if (action.type === allLoadFinished) {
        return {
            ...state,
            allLoadFinished: action.allLoadFinished,
        };
    }

    return state;
};
