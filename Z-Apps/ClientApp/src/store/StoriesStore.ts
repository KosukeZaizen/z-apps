import { reloadAndRedirect_OneTimeReload } from "../common/functions";
import { sentence, storyDesc, word } from "../types/stories";

const initializeType = "INITIALIZE";
const receiveStoryType = "RECEIVE_STORY";
const receiveSentencesType = "RECEIVE_SENTENCES";
const receiveWordsType = "RECEIVE_WORDS";
const receiveOtherStoriesType = "RECEIVE_OTHER_STORIES";
const initialState = {
    storyDesc: [],
    sentences: [],
    words: [],
    otherStories: [],
};

export interface StoriesState {
    storyDesc: storyDesc;
    sentences: sentence[];
    words: word[];
    token: string;
}

export interface IActionCreators {
    loadStory: (storyName: string) => void;
}

export const actionCreators: IActionCreators = {
    loadStory: storyName => async (dispatch: Function, getState: Function) => {
        try {
            dispatch({ type: initializeType });

            //story
            const url1 = `api/Stories/GetPageData/${storyName}`;
            const response1 = await fetch(url1);
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
            window.location.reload(true);
        }
    },
};

export const reducer = (state: any, action: any) => {
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
