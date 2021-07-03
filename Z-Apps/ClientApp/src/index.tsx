import "bootstrap/dist/css/bootstrap.css";
import { createBrowserHistory } from "history";
import * as React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { startAnimation } from "./common/animation";
import { azureUrl, siteUrl } from "./common/consts";
import * as commonFncs from "./common/functions";
import { checkAppVersion } from "./common/functions";
import { GOOGLE_ANALYTICS } from "./common/privateConsts";
import { Articles } from "./components/Articles";
import { LocalDebugMenu } from "./components/LocalDebug";
import { zApps } from "./components/zApps";
import "./css/index.css";
//import registerServiceWorker from './registerServiceWorker';
import { unregister } from "./registerServiceWorker";
import configureStore from "./store/configureStore";

//AzureUrlから通常のURLへリダイレクト
if (window.location.href.includes(azureUrl)) {
    window.location.href = window.location.href.replace(azureUrl, siteUrl);
}

checkAppVersion();
ReactGA.initialize(GOOGLE_ANALYTICS);

// Create browser history to use in the Redux store
const baseUrl =
    document.getElementsByTagName("base")[0].getAttribute("href") ?? undefined;
const history = createBrowserHistory({ basename: baseUrl });

history.listen(({ pathname }) => {
    setTimeout(() => {
        ReactGA.set({ page: pathname });
        ReactGA.pageview(pathname);
        commonFncs.sendClientOpeLog("change page");
    }, 1000);
});

startAnimation();

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

const rootElement = document.getElementById("root");

export interface AppToMount {
    key: string;
    hostname: string;
    getApp: () => Promise<React.FunctionComponent>;
}

// アプリ追加時は、この配列に追加
export const apps: AppToMount[] = [Articles, zApps, LocalDebugMenu];
const appObject = apps.find(a => window.location.hostname.includes(a.hostname));

if (appObject?.key === "LocalDebugMenu") {
    const savedAppKey = window.localStorage.getItem("appKeyToMount");
    const savedApp = apps.find(a => a.key === savedAppKey);
    if (savedApp) {
        appObject.getApp = savedApp.getApp;
    }
}

if (!appObject) {
    window.location.href = "https://www.lingual-ninja.com";
} else {
    const render = async () => {
        const App = await appObject.getApp();
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </Provider>,
            rootElement
        );
    };
    render();
}

//registerServiceWorker();
unregister();
