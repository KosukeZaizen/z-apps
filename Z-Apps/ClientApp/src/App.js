import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from './components/parts/Layout';
import ReactGA from 'react-ga';
import ScrollMemory from 'react-router-scroll-memory';
import * as commonFnc from './components/common/functions';
import * as privateConsts from './components/common/privateConsts';

const Home = lazy(() => import('./components/Home'));
const Terms = lazy(() => import('./components/Terms'));
const Developer = lazy(() => import('./components/Developer'));
const RomajiConverter = lazy(() => import('./components/RomajiConverter'));
const KanjiConverter = lazy(() => import('./components/KanjiConverter'));
const HiraganaQuiz = lazy(() => import('./components/HiraganaQuiz'));
const KatakanaQuiz = lazy(() => import('./components/KatakanaQuiz'));
const Stories = lazy(() => import('./components/Stories'));
const StoriesTop = lazy(() => import('./components/StoriesTop'));
const StoriesEdit = lazy(() => import('./components/StoriesEdit'));
const StoriesEditTop = lazy(() => import('./components/StoriesEditTop'));
const NinjaTop = lazy(() => import('./components/NinjaGameTop'));
const Ninja1 = lazy(() => import('./components/NinjaGame'));
const Ninja2 = lazy(() => import('./components/NinjaGame2'));
const Ninja3 = lazy(() => import('./components/NinjaGame3'));
const GameOver = lazy(() => import('./components/GameOver'));
const ColorPalette = lazy(() => import('./components/ColorPalette'));
const NotFound = lazy(() => import('./components/404'));

export default class App extends React.Component {

    componentDidMount() {
        const { pathname } = window.location;
        ReactGA.set({ page: pathname });
        ReactGA.pageview(pathname);

        this.SetIntervalToSendAccessLog();
    }

    render() {
        return (
            <Layout>
                <Suspense fallback={<LoadingAnimation num={1} />}>
                    <ScrollMemory />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/terms' component={Terms} />
                        <Route path='/developer' component={Developer} />
                        <Route path='/kanji-converter' component={KanjiConverter} />
                        <Route path='/romaji-converter' component={RomajiConverter} />
                        <Route path='/hiragana-quiz' component={HiraganaQuiz} />
                        <Route path='/katakana-quiz' component={KatakanaQuiz} />
                        <Route exact path='/folktales' component={StoriesTop} />
                        <Route exact path='/folktales/:storyName' component={Stories} />
                        <Route exact path='/folktalesEdit' component={StoriesEditTop} />
                        <Route exact path='/folktalesEdit/:storyName' component={StoriesEdit} />
                        <Route path='/ninja' component={NinjaTop} />
                        <Route path='/ninja1' component={Ninja1} />
                        <Route path='/ninja2' component={Ninja2} />
                        <Route path='/ninja3' component={Ninja3} />
                        <Route path='/game-over' component={GameOver} />
                        <Route path='/color-code' component={ColorPalette} />
                        <Route path='/not-found' component={NotFound} />
                        <Route component={NotFoundRedirect} />
                    </Switch>
                </Suspense>
            </Layout>
        );
    }

    SetIntervalToSendAccessLog = () => {
        setTimeout(() => {
            this.SendAccessLog();
            setInterval(() => {
                this.SendAccessLog();
            }, 10000);
        }, 5000);
    }

    SendAccessLog = () => {
        const userId = localStorage.getItem("lingual-ninja-userId") || "0";
        const accessInfo = {
            userId: userId,
            href: window.location.href,
            token: privateConsts.LOG_TOKEN
        };
        const result = commonFnc.sendPost(accessInfo, "api/SystemBase/RegisterAccessLog");
    }
}

function NotFoundRedirect({ location }) {
    return (
        <div>
            <LoadingAnimation num={1} />
            <Redirect to={`/not-found?p=${location.pathname}`} />
        </div>
    );
}

function LoadingAnimation(props) {
    let arr = [];
    for (let i = 0; i < props.num; i++) {
        arr.push(<span key={i}><br /></span>);
    }
    arr.push(<CircularProgress key="circle" size="20%" />);
    return <center>{arr}</center>;
}