import * as React from 'react';
import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from './components/parts/Layout';
import * as commonFncs from './components/common/functions';
import ReactGA from 'react-ga';
import ScrollMemory from 'react-router-scroll-memory';
import { APP_VERSION } from './version';

const Home = lazy(() => import('./components/Home'));
const Terms = lazy(() => import('./components/Terms'));
const Developer = lazy(() => import('./components/Developer'));
const RomajiConverter = lazy(() => import('./components/RomajiConverter'));
const KanjiConverter = lazy(() => import('./components/KanjiConverter'));
const HiraganaAndKatakana = lazy(() => import('./components/HiraganaAndKatakana'));
const HiraganaQuiz = lazy(() => import('./components/HiraganaQuiz'));
const KatakanaQuiz = lazy(() => import('./components/KatakanaQuiz'));
const VocabList = lazy(() => import('./components/VocabList'));
const VocabQuiz = lazy(() => import('./components/VocabQuiz'));
const VocabQuizTop = lazy(() => import('./components/VocabQuizTop'));
const VocabKanjiQuiz = lazy(() => import('./components/VocabKanjiQuiz'));
const VocabKanjiQuizTop = lazy(() => import('./components/VocabKanjiQuizTop'));
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
const OpeLogTable = lazy(() => import('./components/OpeLogTable'));
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
                        <Route sensitive exact path='/' component={Home} />
                        <Route sensitive path='/terms' component={Terms} />
                        <Route sensitive path='/developer' component={Developer} />
                        <Route sensitive path='/kanji-converter' component={KanjiConverter} />
                        <Route sensitive path='/romaji-converter' component={RomajiConverter} />
                        <Route sensitive path='/hiragana-katakana' component={HiraganaAndKatakana} />
                        <Route sensitive path='/hiragana-quiz' component={HiraganaQuiz} />
                        <Route sensitive path='/katakana-quiz' component={KatakanaQuiz} />
                        <Route sensitive exact path='/vocabulary-list' component={VocabList} />
                        <Route sensitive exact path='/vocabulary-quiz' component={VocabQuizTop} />
                        <Route sensitive exact path='/vocabulary-quiz/:genreName' component={VocabQuiz} />
                        <Route sensitive exact path='/kanji-quiz' component={VocabKanjiQuizTop} />
                        <Route sensitive exact path='/kanji-quiz/:genreName' component={VocabKanjiQuiz} />
                        <Route sensitive exact path='/folktales' component={StoriesTop} />
                        <Route sensitive exact path='/folktales/:storyName' component={Stories} />
                        <Route sensitive exact path='/folktalesEdit' component={StoriesEditTop} />
                        <Route sensitive exact path='/folktalesEdit/:storyName' component={StoriesEdit} />
                        <Route sensitive path='/ninja' component={NinjaTop} />
                        <Route sensitive path='/ninja1' component={Ninja1} />
                        <Route sensitive path='/ninja2' component={Ninja2} />
                        <Route sensitive path='/ninja3' component={Ninja3} />
                        <Route sensitive path='/game-over' component={GameOver} />
                        <Route sensitive path='/sitemapEdit' component={SiteMapEdit} />
                        <Route sensitive path='/opeLogTable' component={OpeLogTable} />
                        <Route sensitive path='/color-code' component={ColorPalette} />
                        <Route sensitive path='/boscobel' component={Boscobel} />
                        <Route sensitive path='/3d/tic-tac-toe-game' component={TicTacToeGame} />
                        <Route sensitive path='/3d/boxes' component={Boxes} />
                        <Route sensitive path='/3d/ex' component={BoxesExample} />
                        <Route sensitive path='/not-found' component={NotFound} />
                        <Route component={NotFoundRedirect} />
                    </Switch>
                </Suspense>
            </Layout>
        );
    }
}

function NotFoundRedirect() {

    const url = 'version.txt';
    fetch(url).then(res => {
        res.json().then(v => {
            if (Number(v) !== APP_VERSION) {
                window.location.reload(true);
            } else {
                commonFncs.reloadAndRedirect_OneTimeReload("pageNotFoundRedirect");
            }
        });
    });

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