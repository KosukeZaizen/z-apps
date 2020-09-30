import "bootstrap/dist/css/bootstrap.css";
import { createBrowserHistory } from "history";
import * as React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import App from "./App";
import { azureUrl, siteUrl } from "./components/common/consts";
import * as commonFncs from "./components/common/functions";
import { checkAppVersion } from "./components/common/functions";
import { GOOGLE_ANALYTICS } from "./components/common/privateConsts";
import "./css/index.css";
//import registerServiceWorker from './registerServiceWorker';
import { unregister } from "./registerServiceWorker";
import configureStore from "./store/configureStore";

//AzureUrlから通常のURLへリダイレクト
if (window.location.href.includes(azureUrl))
    window.location.href = window.location.href.replace(azureUrl, siteUrl);

checkAppVersion();
ReactGA.initialize(GOOGLE_ANALYTICS);

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const history = createBrowserHistory({ basename: baseUrl });

history.listen(({ pathname }) => {
    setTimeout(() => {
        ReactGA.set({ page: pathname });
        ReactGA.pageview(pathname);
        commonFncs.sendClientOpeLog("change page");
    }, 1000);
});

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window["initialReduxState"];
const store = configureStore(history, initialState);

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    rootElement
);

//registerServiceWorker();
unregister();
