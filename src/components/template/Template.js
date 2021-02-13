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
import RutaPrivada from '../rutas/RutaPrivada';


const Template = ({ props }) => {

    const showConfirm = () => {
        console.log("saliendo....")
    }

    return (
       
        <Router>
                
            <Menu/>

                <Switch >
                    <RutaPrivada exact strict path='/home' component={Home} titulo="home" />
                    <RutaPrivada exact strict path="/profile" component={Profile} />
                    <RutaPrivada exact strict path="/rank" component={Rank} />
                    <RutaPrivada exact strict path="/about" component={About} />
                    <RutaPrivada exact strict path="/games" component={Games} />
                    <RutaPrivada exact strict path="/help" component={Help} />
                    <RutaPrivada exact strict path="/games/images" component={TagImage} onLeave={ showConfirm } />
                    <RutaPrivada exact strict path="/games/words" component={AssociateWord} />
                    <RutaPrivada exact strict path="/games/four-images-one-word" component={FourImagesOneWord} />                    
                </Switch>

            <FooterPage
                
            />

        </Router>

    );
}
 
export default Template;