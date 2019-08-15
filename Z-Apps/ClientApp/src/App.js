import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/parts/Layout';
import Home from './components/Home';
import RomajiConverter from './components/RomajiConverter';
import KanjiConverter from './components/KanjiConverter';
import Terms from './components/Terms';
import Developer from './components/Developer';
import HiraganaQuiz from './components/HiraganaQuiz';
import KatakanaQuiz from './components/KatakanaQuiz';
import NinjaTop from './components/NinjaGameTop';
import Ninja1 from './components/NinjaGame';
import Ninja2 from './components/NinjaGame2';
import Ninja3 from './components/NinjaGame3';
import GameOver from './components/GameOver';
import ColorPalette from './components/ColorPalette';

const redirect404 = () => { window.location.href = '/page/PageNotFound'; return "loading..."};

export default () => (
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/terms' component={Terms} />
            <Route path='/developer' component={Developer} />
            <Route path='/kanji-converter' component={KanjiConverter} />
            <Route path='/romaji-converter' component={RomajiConverter} />
            <Route path='/hiragana-quiz' component={HiraganaQuiz} />
            <Route path='/katakana-quiz' component={KatakanaQuiz} />
            <Route path='/ninja' component={NinjaTop} />
            <Route path='/ninja1' component={Ninja1} />
            <Route path='/ninja2' component={Ninja2} />
            <Route path='/ninja3' component={Ninja3} />
            <Route path='/game-over' component={GameOver} />
            <Route path='/color-code' component={ColorPalette} />
            {/*<Route render={redirect404} />*/}
        </Switch>
    </Layout>
);