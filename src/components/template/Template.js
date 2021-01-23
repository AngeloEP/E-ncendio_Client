import React from 'react';
import Menu from './appBar/Menu';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../home/Home';
import Profile from '../profile/Profile';
import Rank from '../rank/Rank';
import About from '../about/About';
import Games from '../games/Games';
import Help from '../help/Help';
import FooterPage from './footer/FooterPage';


const Template = ({ props }) => {

    return (
       
        <Router>
                
            <Menu/>

                <Switch >
                    <Route exact strict path='/home' component={Home} titulo="home" />
                    <Route exact strict path="/profile" component={Profile} />
                    <Route exact strict path="/rank" component={Rank} />
                    <Route exact strict path="/about" component={About} />
                    <Route exact strict path="/games" component={Games} />
                    <Route exact strict path="/help" component={Help} />
                </Switch>

            <FooterPage
                
            />

        </Router>

    );
}
 
export default Template;