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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
var redux_1 = require("redux");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var react_router_redux_1 = require("react-router-redux");
var KanjiConverter = __importStar(require("./KanjiConverter"));
var Stories = __importStar(require("./StoriesStore"));
var StoriesEdit = __importStar(require("./StoriesEditStore"));
var StoriesTop = __importStar(require("./StoriesTopStore"));
function configureStore(history, initialState) {
    var reducers = {
        kanjiConverter: KanjiConverter.reducer,
        stories: Stories.reducer,
        storiesEdit: StoriesEdit.reducer,
        storiesTop: StoriesTop.reducer,
    };
    var middleware = [
        redux_thunk_1.default,
        react_router_redux_1.routerMiddleware(history)
    ];
    // In development, use the browser's Redux dev tools extension if installed
    var enhancers = [];
    var isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }
    var rootReducer = redux_1.combineReducers(__assign(__assign({}, reducers), { routing: react_router_redux_1.routerReducer }));
    return redux_1.createStore(rootReducer, initialState, redux_1.compose.apply(void 0, __spreadArrays([redux_1.applyMiddleware.apply(void 0, middleware)], enhancers)));
}
exports.default = configureStore;
