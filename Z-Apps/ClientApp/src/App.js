import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Loadable from "react-loadable";
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from './components/parts/Layout';
import ReactGA from 'react-ga';
import ScrollMemory from 'react-router-scroll-memory';

const getPage = (Page) => {
    return Loadable({
        loader: () => Page,
        loading: () => <LoadingAnimation num={1} />
    });
}

const Home = getPage(import('./components/Home'));
const Terms = getPage(import('./components/Terms'));
const Developer = getPage(import('./components/Developer'));
const RomajiConverter = getPage(import('./components/RomajiConverter'));
const KanjiConverter = getPage(import('./components/KanjiConverter'));
const HiraganaQuiz = getPage(import('./components/HiraganaQuiz'));
const KatakanaQuiz = getPage(import('./components/KatakanaQuiz'));
const Stories = getPage(import('./components/Stories'));
const StoriesTop = getPage(import('./components/StoriesTop'));
const StoriesEdit = getPage(import('./components/StoriesEdit'));
const StoriesEditTop = getPage(import('./components/StoriesEditTop'));
const NinjaTop = getPage(import('./components/NinjaGameTop'));
const Ninja1 = getPage(import('./components/NinjaGame'));
const Ninja2 = getPage(import('./components/NinjaGame2'));
const Ninja3 = getPage(import('./components/NinjaGame3'));
const GameOver = getPage(import('./components/GameOver'));
const ColorPalette = getPage(import('./components/ColorPalette'));
const NotFound = getPage(import('./components/404'));

export default class App extends React.Component {

    componentDidMount() {
        const { pathname } = window.location;
        ReactGA.set({ page: pathname });
        ReactGA.pageview(pathname);
    }

    render() {
        return (
            <Layout>
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
            </Layout>
        );
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