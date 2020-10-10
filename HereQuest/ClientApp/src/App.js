import React, { Component } from 'react';
import { Route } from 'react-router';
import QuestDetails from './components/QuestDetails/QuestDetails';
import { Layout } from './components/Layout/Layout';
import HomePage from './containers/HomePage/HomePage';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/quests' component={QuestDetails} />
      </Layout>
    );
  }
}
