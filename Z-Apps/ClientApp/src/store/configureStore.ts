import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as KanjiConverter from './KanjiConverter';
import * as Stories from './StoriesStore';
import * as StoriesEdit from './StoriesEditStore';
import * as StoriesTop from './StoriesTopStore';
import * as VocabQuiz from './VocabQuizStore';

type TReducer = (state, action) => void;
export type TReducers = {
    kanjiConverter: TReducer;
    stories: TReducer;
    storiesEdit: TReducer;
    storiesTop: TReducer;
    vocabQuiz: TReducer;
}

export default function configureStore(history, initialState) {
    const reducers: TReducers = {
        kanjiConverter: KanjiConverter.reducer,
        stories: Stories.reducer,
        storiesEdit: StoriesEdit.reducer,
        storiesTop: StoriesTop.reducer,
        vocabQuiz: VocabQuiz.reducer,
    };

    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window["devToolsExtension"]) {
        enhancers.push(window["devToolsExtension"]());
    }

    const rootReducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
