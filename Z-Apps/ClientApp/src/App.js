import React from 'react';
import { Route } from 'react-router';
import Layout from './components/parts/Layout';
import Home from './components/Home';
import RomajiConverter from './components/RomajiConverter';
import KanjiConverter from './components/KanjiConverter';
import Terms from './components/Terms';
import Developer from './components/Developer';
import HiraganaQuiz from './components/HiraganaQuiz';
import KatakanaQuiz from './components/KatakanaQuiz';
import Ninja from './components/Ninja';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/terms' component={Terms} />
        <Route path='/developer' component={Developer} />
        <Route path='/kanji-converter' component={KanjiConverter} />
        <Route path='/romaji-converter' component={RomajiConverter} />
        <Route path='/hiragana-quiz' component={HiraganaQuiz} />
        <Route path='/katakana-quiz' component={KatakanaQuiz} />
        <Route path='/ninja' component={Ninja} />
    </Layout>
);
