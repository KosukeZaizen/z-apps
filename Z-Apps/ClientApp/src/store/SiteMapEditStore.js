import * as commonFnc from '../components/common/functions';

const receiveSitemapType = 'RECEIVE_STORY';
const changeTokenType = 'CHANGTE_TOKEN';

const initialState = { sitemap: [], token: "", };

export const actionCreators = {
    loadSitemap: () => async (dispatch, getState) => {
        try {
            const url = `api/SiteMapEdit/GetSiteMap`;
            const response = await fetch(url);

            const sitemap = await response.json();

            dispatch({ type: receiveSitemapType, sitemap });

        } catch (e) {
            //window.location.href = `/not-found?p=${window.location.pathname}`;
            return;
        }
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
        } else {
            token = "";
        }
        dispatch({ type: changeTokenType, token });
    },

    handleChangeSitemap: (event, i, lang) => (dispatch, getState) => {
        const s = getState().storiesEdit.sentences.concat();
        s[i][lang] = event.target.value;

        dispatch({ type: receiveSitemapType, sitemap });
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

    save: () => async (dispatch, getState) => {
        try {
            if (window.confirm('Are you sure that you want to save?')) {
                const { storyDesc, sentences, words, token } = getState().storiesEdit;
                localStorage.setItem("folktales-register-token", JSON.stringify({ token }));

                const result = await commonFnc.sendPost({ storyDesc, sentences, words, token }, "api/StoriesEdit/Save");

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
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === receiveSitemapType) {
        return {
            ...state,
            sitemap: action.sitemap,
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
