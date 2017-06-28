/*
    An example top-level app that handles basic layout and routing using React Router
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectsListContainer from "./js/pages/ProjectsListContainer";
import ProjectContainer from "./js/pages/ProjectContainer"
import './App.css';
import Header from "./js/layout/header"
import Home from "./js/pages/home"
import Projects from "./js/pages/projects"
import About from "./js/pages/about"
import SearchButtons from "./Search_Bar/all_buttons";


class App extends Component {
    render() {
        return (
            /*
                This is a list of different possible routes and what components should
                be rendered for each one
             */
            <div>
            <Header/>
                <div className="App-buttons">
                    <SearchButtons/>

                </div>
            <Switch>
                <Route exact path='/home' component={Home}/>
                {/*<Route exact path='/projects' component={Projects}/>*/}
                <Route exact path='/projects' component={ProjectsListContainer}/>
                <Route exact path='/projects/:id' component={ProjectContainer}/>
                <Route exact path='/about' component={About}/>
            </Switch>
            </div>
        );
  }
}

export default App;


