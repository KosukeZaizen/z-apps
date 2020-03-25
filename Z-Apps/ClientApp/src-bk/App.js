"use strict";
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
const React = __importStar(require("react"));
const react_1 = require("react");
const react_router_1 = require("react-router");
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const Layout_1 = __importDefault(require("./components/parts/Layout"));
const react_ga_1 = __importDefault(require("react-ga"));
const react_router_scroll_memory_1 = __importDefault(require("react-router-scroll-memory"));
const Home = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/Home'))));
const Terms = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/Terms'))));
const Developer = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/Developer'))));
const RomajiConverter = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/RomajiConverter'))));
const KanjiConverter = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/KanjiConverter'))));
const HiraganaQuiz = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/HiraganaQuiz'))));
const KatakanaQuiz = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/KatakanaQuiz'))));
const Stories = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/Stories'))));
const StoriesTop = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/StoriesTop'))));
const StoriesEdit = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/StoriesEdit'))));
const StoriesEditTop = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/StoriesEditTop'))));
const NinjaTop = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/NinjaGameTop'))));
const Ninja1 = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/NinjaGame'))));
const Ninja2 = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/NinjaGame2'))));
const Ninja3 = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/NinjaGame3'))));
const GameOver = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/GameOver'))));
const SiteMapEdit = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/SiteMapEdit'))));
const ColorPalette = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/ColorPalette'))));
const Boscobel = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/Boscobel'))));
const TicTacToeGame = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/parts/3d/TicTacToeGame'))));
const NotFound = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('./components/404'))));
class App extends React.Component {
    componentDidMount() {
        const { pathname } = window.location;
        react_ga_1.default.set({ page: pathname });
        react_ga_1.default.pageview(pathname);
    }
    render() {
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
    }
}
exports.default = App;
function NotFoundRedirect({ location }) {
    waitAndRedirect("pageNotFoundRedirect");
    return (React.createElement("div", null,
        React.createElement(LoadingAnimation, { num: 1 })));
}
function waitAndRedirect(saveKey) {
    const savedErrTime = window.sessionStorage.getItem(saveKey);
    const intSavedTime = parseInt(savedErrTime);
    const now = new Date();
    const nowTime = now.getTime();
    if (intSavedTime && (nowTime - intSavedTime < 15000)) {
        setTimeout(() => {
            window.location.href = `/not-found?p=${window.location.pathname}`;
        }, 10000);
    }
    else {
        window.sessionStorage.setItem(saveKey, nowTime.toString());
        window.location.reload();
    }
    return;
}
function LoadingAnimation(props) {
    let arr = [];
    for (let i = 0; i < props.num; i++) {
        arr.push(React.createElement("span", { key: i },
            React.createElement("br", null)));
    }
    arr.push(React.createElement(CircularProgress_1.default, { key: "circle", size: "20%" }));
    return React.createElement("div", { className: "center" }, arr);
}
