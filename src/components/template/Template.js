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
import TagImage from '../games/tagImages/TagImage';
import AssociateWord from '../games/associateWords/AssociateWord';
import FourImagesOneWord from '../games/fourImagesOneWord/FourImagesOneWord';


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
                    <Route exact strict path="/games/images" component={TagImage} />
                    <Route exact strict path="/games/words" component={AssociateWord} />
                    <Route exact strict path="/games/four-images-one-word" component={FourImagesOneWord} />                    
                </Switch>

            <FooterPage
                
            />

        </Router>

    );
}
 
export default Template;