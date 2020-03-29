import * as React from 'react';
import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from './components/parts/Layout';
import * as commonFncs from './components/common/functions';
import ReactGA from 'react-ga';
import ScrollMemory from 'react-router-scroll-memory';


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
const SiteMapEdit = lazy(() => import('./components/SiteMapEdit'));
const ColorPalette = lazy(() => import('./components/ColorPalette'));
const Boscobel = lazy(() => import('./components/Boscobel'));
const TicTacToeGame = lazy(() => import('./components/parts/3d/TicTacToeGame'));
const Boxes = lazy(() => import('./components/parts/3d/Boxes'));
const BoxesExample = lazy(() => import('./components/parts/3d/BoxesExample'));
const NotFound = lazy(() => import('./components/404'));

export default class App extends React.Component {

    componentDidMount() {
        const { pathname } = window.location;
        ReactGA.set({ page: pathname });
        ReactGA.pageview(pathname);
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
                        <Route path='/sitemapEdit' component={SiteMapEdit} />
                        <Route path='/color-code' component={ColorPalette} />
                        <Route path='/boscobel' component={Boscobel} />
                        <Route path='/3d/tic-tac-toe-game' component={TicTacToeGame} />
                        <Route path='/3d/boxes' component={Boxes} />
                        <Route path='/3d/ex' component={BoxesExample} />
                        <Route path='/not-found' component={NotFound} />
                        <Route component={NotFoundRedirect} />
                    </Switch>
                </Suspense>
            </Layout>
        );
    }
}

function NotFoundRedirect({ location }) {
    
    commonFncs.reloadAndRedirect("pageNotFoundRedirect");

    return (
        <div>
            <LoadingAnimation num={1} />
        </div>
    );
}

function LoadingAnimation(props) {
    let arr = [];
    for (let i = 0; i < props.num; i++) {
        arr.push(<span key={i}><br /></span>);
    }
    arr.push(<CircularProgress key="circle" size="20%" />);
    return <div className="center">{arr}</div>;
}