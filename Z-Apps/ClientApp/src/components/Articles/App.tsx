import * as React from "react";
import { lazy, Suspense } from "react";
import ReactGA from "react-ga";
import { Route, Switch } from "react-router";
import ScrollMemory from "react-router-scroll-memory";
import * as commonFncs from "../../common/functions";
import { APP_VERSION } from "../../version";
import { ReturnToLocalMenu } from "../LocalDebug/App";
import FooterAnimation from "../shared/Animations/FooterAnimation";
import ShurikenProgress from "../shared/Animations/ShurikenProgress";
import Layout from "../shared/Layout";
import { PopupAd } from "../shared/YouTubeAd/Popup";

const Articles = lazy(() => import("./Articles"));
const ArticlesTop = lazy(() => import("./Articles/Top"));
const ArticlesEditTop = lazy(() => import("./Articles/EditTop"));
const ArticlesEdit = lazy(() => import("./Articles/Edit"));
const NotFound = lazy(() => import("../shared/404"));

export function App() {
    React.useEffect(() => {
        const { pathname } = window.location;

        ReactGA.set({ page: pathname });
        ReactGA.pageview(pathname);
    }, []);

    return (
        <Layout>
            <Suspense fallback={<LoadingAnimation num={1} />}>
                <ScrollMemory />
                <Switch>
                    <Route sensitive exact path="/" component={ArticlesTop} />
                    <Route
                        sensitive
                        exact
                        path="/articles"
                        component={() => {
                            window.location.href = "/";
                            return null;
                        }}
                    />
                    <Route
                        sensitive
                        exact
                        path="/articles/:pageName"
                        component={Articles}
                    />
                    <Route
                        sensitive
                        exact
                        path="/edit"
                        component={ArticlesEditTop}
                    />
                    <Route
                        sensitive
                        exact
                        path="/articlesEdit/:pageName"
                        component={ArticlesEdit}
                    />
                    <Route sensitive path="/not-found" component={NotFound} />
                    <Route
                        sensitive
                        exact
                        path="/local"
                        component={ReturnToLocalMenu}
                    />
                    <Route component={NotFoundRedirect} />
                </Switch>
            </Suspense>
            <FooterAnimation />
            <PopupAd />
        </Layout>
    );
}

function NotFoundRedirect() {
    const url = `api/SystemBase/GetVersion/V${new Date().getMilliseconds()}`;
    fetch(url).then(res => {
        res.json().then(v => {
            if (Number(v) !== APP_VERSION) {
                window.location.reload(true);
            } else {
                commonFncs.reloadAndRedirect_OneTimeReload(
                    "pageNotFoundRedirect"
                );
            }
        });
    });

    return (
        <div>
            <LoadingAnimation num={1} />
        </div>
    );
}

export function LoadingAnimation(props: { num: number }) {
    let arr = [];
    for (let i = 0; i < props.num; i++) {
        arr.push(
            <span key={i}>
                <br />
            </span>
        );
    }
    arr.push(
        <ShurikenProgress key="circle" size="20%" style={{ margin: 30 }} />
    );
    return <div className="center">{arr}</div>;
}
