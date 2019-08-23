import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from './components/parts/Layout';

const Home = lazy(() => import('./components/Home'));
const Terms = lazy(() => import('./components/Terms'));
const Developer = lazy(() => import('./components/Developer'));
const RomajiConverter = lazy(() => import('./components/RomajiConverter'));
const KanjiConverter = lazy(() => import('./components/KanjiConverter'));
const HiraganaQuiz = lazy(() => import('./components/HiraganaQuiz'));
const KatakanaQuiz = lazy(() => import('./components/KatakanaQuiz'));
const Stories = lazy(() => import('./components/Stories'));
const NinjaTop = lazy(() => import('./components/NinjaGameTop'));
const Ninja1 = lazy(() => import('./components/NinjaGame'));
const Ninja2 = lazy(() => import('./components/NinjaGame2'));
const Ninja3 = lazy(() => import('./components/NinjaGame3'));
const GameOver = lazy(() => import('./components/GameOver'));
const ColorPalette = lazy(() => import('./components/ColorPalette'));
const NotFound = lazy(() => import('./components/404'));

export default () => (
    <Layout>
        <Suspense fallback={<LoadingAnimation num={1} />}>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/terms' component={Terms} />
                <Route path='/developer' component={Developer} />
                <Route path='/kanji-converter' component={KanjiConverter} />
                <Route path='/romaji-converter' component={RomajiConverter} />
                <Route path='/hiragana-quiz' component={HiraganaQuiz} />
                <Route path='/katakana-quiz' component={KatakanaQuiz} />
                <Route path='/stories' component={Stories} />
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
        arr.push(<br />);
    }
    arr.push(<CircularProgress size="20%" />);
    return <center>{arr}</center>;
}