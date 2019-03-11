import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import ReactTutorial from './components/ReactTutorial';
import RomajiConverter from './components/RomajiConverter';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/react-tutorial' component={ReactTutorial} />
        <Route path='/romaji-converter' component={RomajiConverter} />
    </Layout>
);
