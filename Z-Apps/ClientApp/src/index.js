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
require("bootstrap/dist/css/bootstrap.css");
require("./css/index.css");
const React = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const history_1 = require("history");
const configureStore_1 = __importDefault(require("./store/configureStore"));
const App_1 = __importDefault(require("./App"));
const registerServiceWorker_1 = __importDefault(require("./registerServiceWorker"));
//import { unregister } from './registerServiceWorker';
const react_ga_1 = __importDefault(require("react-ga"));
const privateConsts_1 = require("./components/common/privateConsts");
react_ga_1.default.initialize(privateConsts_1.GOOGLE_ANALYTICS);
// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = history_1.createBrowserHistory({ basename: baseUrl });
history.listen(({ pathname }) => {
    react_ga_1.default.set({ page: pathname });
    react_ga_1.default.pageview(pathname);
});
// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window["initialReduxState"];
const store = configureStore_1.default(history, initialState);
const rootElement = document.getElementById('root');
react_dom_1.default.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_redux_1.ConnectedRouter, { history: history },
        React.createElement(App_1.default, null))), rootElement);
registerServiceWorker_1.default();
//unregister();
