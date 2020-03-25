"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var react_router_1 = require("react-router");
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var Layout_1 = __importDefault(require("./components/parts/Layout"));
var react_ga_1 = __importDefault(require("react-ga"));
var react_router_scroll_memory_1 = __importDefault(require("react-router-scroll-memory"));
var Home = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/Home')); }); });
var Terms = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/Terms')); }); });
var Developer = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/Developer')); }); });
var RomajiConverter = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/RomajiConverter')); }); });
var KanjiConverter = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/KanjiConverter')); }); });
var HiraganaQuiz = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/HiraganaQuiz')); }); });
var KatakanaQuiz = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/KatakanaQuiz')); }); });
var Stories = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/Stories')); }); });
var StoriesTop = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/StoriesTop')); }); });
var StoriesEdit = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/StoriesEdit')); }); });
var StoriesEditTop = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/StoriesEditTop')); }); });
var NinjaTop = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/NinjaGameTop')); }); });
var Ninja1 = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/NinjaGame')); }); });
var Ninja2 = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/NinjaGame2')); }); });
var Ninja3 = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/NinjaGame3')); }); });
var GameOver = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/GameOver')); }); });
var SiteMapEdit = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/SiteMapEdit')); }); });
var ColorPalette = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/ColorPalette')); }); });
var Boscobel = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/Boscobel')); }); });
var TicTacToeGame = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/parts/3d/TicTacToeGame')); }); });
var NotFound = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./components/404')); }); });
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.componentDidMount = function () {
        var pathname = window.location.pathname;
        react_ga_1.default.set({ page: pathname });
        react_ga_1.default.pageview(pathname);
    };
    App.prototype.render = function () {
        return (React.createElement(Layout_1.default, null,
            React.createElement(react_1.Suspense, { fallback: React.createElement(LoadingAnimation, { num: 1 }) },
                React.createElement(react_router_scroll_memory_1.default, null),
                React.createElement(react_router_1.Switch, null,
                    React.createElement(react_router_1.Route, { exact: true, path: '/', component: Home }),
                    React.createElement(react_router_1.Route, { path: '/terms', component: Terms }),
                    React.createElement(react_router_1.Route, { path: '/developer', component: Developer }),
                    React.createElement(react_router_1.Route, { path: '/kanji-converter', component: KanjiConverter }),
                    React.createElement(react_router_1.Route, { path: '/romaji-converter', component: RomajiConverter }),
                    React.createElement(react_router_1.Route, { path: '/hiragana-quiz', component: HiraganaQuiz }),
                    React.createElement(react_router_1.Route, { path: '/katakana-quiz', component: KatakanaQuiz }),
                    React.createElement(react_router_1.Route, { exact: true, path: '/folktales', component: StoriesTop }),
                    React.createElement(react_router_1.Route, { exact: true, path: '/folktales/:storyName', component: Stories }),
                    React.createElement(react_router_1.Route, { exact: true, path: '/folktalesEdit', component: StoriesEditTop }),
                    React.createElement(react_router_1.Route, { exact: true, path: '/folktalesEdit/:storyName', component: StoriesEdit }),
                    React.createElement(react_router_1.Route, { path: '/ninja', component: NinjaTop }),
                    React.createElement(react_router_1.Route, { path: '/ninja1', component: Ninja1 }),
                    React.createElement(react_router_1.Route, { path: '/ninja2', component: Ninja2 }),
                    React.createElement(react_router_1.Route, { path: '/ninja3', component: Ninja3 }),
                    React.createElement(react_router_1.Route, { path: '/game-over', component: GameOver }),
                    React.createElement(react_router_1.Route, { path: '/sitemapEdit', component: SiteMapEdit }),
                    React.createElement(react_router_1.Route, { path: '/color-code', component: ColorPalette }),
                    React.createElement(react_router_1.Route, { path: '/boscobel', component: Boscobel }),
                    React.createElement(react_router_1.Route, { path: '/3d/tic-tac-toe-game', component: TicTacToeGame }),
                    React.createElement(react_router_1.Route, { path: '/not-found', component: NotFound }),
                    React.createElement(react_router_1.Route, { component: NotFoundRedirect })))));
    };
    return App;
}(React.Component));
exports.default = App;
function NotFoundRedirect(_a) {
    var location = _a.location;
    setTimeout(() => {
        document.location.href = `/not-found?p=${location.pathname}`;
    }, 12000);
    return (React.createElement("div", null,
        React.createElement(LoadingAnimation, { num: 1 })));
}
function LoadingAnimation(props) {
    var arr = [];
    for (var i = 0; i < props.num; i++) {
        arr.push(React.createElement("span", { key: i },
            React.createElement("br", null)));
    }
    arr.push(React.createElement(CircularProgress_1.default, { key: "circle", size: "20%" }));
    return React.createElement("div", { className: "center" }, arr);
}
