import React, {Component} from 'react';
import {Route} from 'react-router';
import QuestDetails from './components/QuestDetails/QuestDetails';
import QuestTasks from './components/QuestTasks/QuestTasks';
import AboutQuest from "./components/AboutQuest/AboutQuest";
import AboutUs from "./components/AboutUs/AboutUs";
import QuestFinish from './components/QuestFinish/QuestFinish';
import {Layout} from './components/Layout/Layout';
import HomePage from './containers/HomePage/HomePage';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/aboutquest' component={AboutQuest}/>
                <Route exact path='/aboutus' component={AboutUs}/>
                <Route exact path='/quests/:id' component={QuestDetails}/>
                <Route exact path='/quests/:id/questions' component={QuestTasks}/>
                <Route exact path='/quests/:id/questions/result' component={QuestFinish}/>
            </Layout>
        );
    }
}
