"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const react_router_redux_1 = require("react-router-redux");
const KanjiConverter = __importStar(require("./KanjiConverter"));
const Stories = __importStar(require("./StoriesStore"));
const StoriesEdit = __importStar(require("./StoriesEditStore"));
const StoriesTop = __importStar(require("./StoriesTopStore"));
function configureStore(history, initialState) {
    const reducers = {
        kanjiConverter: KanjiConverter.reducer,
        stories: Stories.reducer,
        storiesEdit: StoriesEdit.reducer,
        storiesTop: StoriesTop.reducer,
    };
    const middleware = [
        redux_thunk_1.default,
        react_router_redux_1.routerMiddleware(history)
    ];
    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window["devToolsExtension"]) {
        enhancers.push(window["devToolsExtension"]());
    }
    const rootReducer = redux_1.combineReducers(Object.assign(Object.assign({}, reducers), { routing: react_router_redux_1.routerReducer }));
    return redux_1.createStore(rootReducer, initialState, redux_1.compose(redux_1.applyMiddleware(...middleware), ...enhancers));
}
exports.default = configureStore;
