import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Rank from './components/rank/Rank';
import About from './components/about/About';
import Games from './components/games/Games';
import Help from './components/help/Help';
import TagImage from './components/games/tagImages/TagImage';
import AssociateWord from './components/games/associateWords/AssociateWord';
import FourImagesOneWord from './components/games/fourImagesOneWord/FourImagesOneWord';
import FooterPage from './components/footer/FooterPage';

import LoginState from './context/login/loginState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autentificacion/authState';
import ImageState from './context/images/imageState';
import WordState from './context/words/wordState';
import ProfileState from './context/profile/profileState';
import LeagueState from './context/leagues/leagueState';
import LevelState from './context/levels/levelState';
import CategoryState from './context/categories/categoryState';
import TagState from './context/tag/tagState';
import UsuariosState from './context/usuarios/usuariosState';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import tokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/RutaPrivada';

// Revisar si tenemos un token
const token = localStorage.getItem('token')
if( token ){
  tokenAuth(token)
}

function App() {


  return (
    <LoginState>
      <AlertaState>
        <AuthState>
          <ImageState>
            <WordState>
              <ProfileState>
                <LeagueState>
                  <LevelState>
                    <CategoryState>
                      <TagState>
                        <UsuariosState>
                          <Router>

                            <Navigation />
                            <Route path="/" render={({location}) => (
                              <TransitionGroup>
                                <CSSTransition
                                  key={location.key}
                                  timeout={200}
                                  classNames="fade"
                                >
                              <Switch location={location} >
                              
                                <Route exact path='/login' component={Login} /> 
                                <Route exact path="/register" component={Register} />
                                  <RutaPrivada exact path="/home" component={Home} />
                                  <RutaPrivada exact path="/profile" component={Profile} />
                                  <RutaPrivada exact path="/rank" component={Rank} />
                                  <RutaPrivada exact path="/about" component={About} />
                                  <RutaPrivada exact path="/games" component={Games} />
                                  <RutaPrivada exact path="/games/images" component={TagImage} />
                                  <RutaPrivada exact path="/help" component={Help} />
                                  <RutaPrivada exact path="/games/words" component={AssociateWord} />
                                  <RutaPrivada exact path="/games/four-images-one-word" component={FourImagesOneWord} />  
                                <Redirect from="/" to="/login"/>

                              </Switch>
                              </CSSTransition>
                              </TransitionGroup>
                            )}/>
                            <FooterPage/>
                          </Router>

                        </UsuariosState>
                      </TagState>
                    </CategoryState>
                  </LevelState>
                </LeagueState>
              </ProfileState>
            </WordState>
          </ImageState>
        </AuthState>
      </AlertaState>
    </LoginState>
  )
}

export default App;
