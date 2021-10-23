import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Store from './components/store/Store';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/editProfile/EditProfile';
import Rank from './components/rank/Rank';
import About from './components/about/About';
import Games from './components/games/Games';
import Help from './components/help/Help';
import TagImage from './components/games/tagImages/TagImage';
import AssociateWord from './components/games/associateWords/AssociateWord';
import FourImagesOneWord from './components/games/fourImagesOneWord/FourImagesOneWord';
import UniqueSelection from './components/games/uniqueSelection/UniqueSelection';
import FooterPage from './components/footer/FooterPage';
import Settings from './components/settings/Settings';
import ResetPassword from './components/auth/resetPassword/ResetPassword';

import LoginState from './context/login/loginState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autentificacion/authState';
import ImageState from './context/images/imageState';
import FourImagesOneWordState from './context/fourImagesOneWord/fourImagesOneWordState';
import UniqueSelectionState from './context/uniqueSelection/uniqueSelectionState';
import WordState from './context/words/wordState';
import TipState from './context/tips/tipState';
import ProfileState from './context/profile/profileState';
import LeagueState from './context/leagues/leagueState';
import LevelState from './context/levels/levelState';
import CategoryState from './context/categories/categoryState';
import TagState from './context/tag/tagState';
import UsuariosState from './context/usuarios/usuariosState';
import ContactFormState from './context/contactForm/contactFormState';
import ResetPasswordState from './context/resetPassword/resetPasswordState';
import DailyTasksState from './context/dailyTasks/dailyTasksState';
import StoreState from './context/store/storeState';
import AnalyticsState from './context/analytics/analyticsState';

import { ChakraProvider } from "@chakra-ui/react";

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import tokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/RutaPrivada';
import Analytic from './components/analytic/Analytic';

// Revisar si tenemos un token
const token = localStorage.getItem('token')
if( token ){
  tokenAuth(token)
}

function App() {


  return (
    <div className="page-container" >
      <div className="content-wrap" >
        <LoginState>
          <AlertaState>
            <AuthState>
              <ImageState>
                <WordState>
                  <TipState>
                    <ProfileState>
                      <LeagueState>
                        <LevelState>
                          <CategoryState>
                            <TagState>
                              <UsuariosState>
                                <ContactFormState>
                                  <FourImagesOneWordState>
                                    <UniqueSelectionState>
                                      <ResetPasswordState>
                                        <DailyTasksState>
                                          <StoreState>
                                            <AnalyticsState>
                                              <ChakraProvider>
                                            
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
                                                    <Route exact path='/reset-password' component={ResetPassword} /> 
                                                    <Route exact path="/register" component={Register} />
                                                      <RutaPrivada exact path="/home" component={Home} />
                                                      <RutaPrivada exact path="/profile" component={Profile} />
                                                      <RutaPrivada exact path="/profile/edit" component={EditProfile} />
                                                      <RutaPrivada exact path="/rank" component={Rank} />
                                                      <RutaPrivada exact path="/about" component={About} />
                                                      <RutaPrivada exact path="/games" component={Games} />
                                                      <RutaPrivada exact path="/store" component={Store} />
                                                      <RutaPrivada exact path="/help" component={Help} />
                                                      <RutaPrivada exact path="/analytics" component={Analytic} />
                                                      <RutaPrivada exact path="/games/images" component={TagImage} />
                                                      <RutaPrivada exact path="/games/words" component={AssociateWord} />
                                                      <RutaPrivada exact path="/games/four-images-one-word" component={FourImagesOneWord} />  
                                                      <RutaPrivada exact path="/games/unique-selection" component={UniqueSelection} />  
                                                      <RutaPrivada exact path="/settings" component={Settings} />  
                                                    <Redirect from="/" to="/login"/>

                                                  </Switch>
                                                  </CSSTransition>
                                                  </TransitionGroup>
                                                )}/>
                                                <FooterPage/>
                                              </Router>

                                              </ChakraProvider>
                                            </AnalyticsState>
                                          </StoreState>
                                        </DailyTasksState>
                                      </ResetPasswordState>
                                    </UniqueSelectionState>
                                  </FourImagesOneWordState>
                                </ContactFormState>
                              </UsuariosState>
                            </TagState>
                          </CategoryState>
                        </LevelState>
                      </LeagueState>
                    </ProfileState>
                  </TipState>
                </WordState>
              </ImageState>
            </AuthState>
          </AlertaState>
        </LoginState>
      </div>
    </div>
  )
}

export default App;
