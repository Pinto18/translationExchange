/*
    An example top-level app that handles basic layout and routing using React Router
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectsListContainer from "./projects/ProjectsListContainer";
import ProjectContainer from "./projects/ProjectContainer";
import ChapterContainer from "./chapter/ChapterContainer";
import './App.css';

class App extends Component {
    render() {
        return (
            /*
                This is a list of different possible routes and what components should
                be rendered for each one
             */
            <Switch>
                <Route exact path='/projects' component={ProjectsListContainer}/>
                <Route exact path='/projects/:projectid' component={ProjectContainer}/>
                <Route exact path='/projects/:projectid/ch:chid' component={ChapterContainer}/>
            </Switch>
        );
  }
}

export default App;
