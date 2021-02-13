import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Template from './components/template/Template';

import LoginState from './context/login/loginState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autentificacion/authState';
import ImageState from './context/images/imageState';
import ProfileState from './context/profile/profileState';


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
            <ProfileState>
              <Router>
                <Switch>
                  
                  <Route exact strict path='/login' component={Login} /> 
                  <Route exact strict path="/register" component={Register} />
                    <RutaPrivada exact strict path="/home" component={Template} />
                    <RutaPrivada exact strict path="/profile" component={Template} />
                    <RutaPrivada exact strict path="/rank" component={Template} />
                    <RutaPrivada exact strict path="/about" component={Template} />
                    <RutaPrivada exact strict path="/games" component={Template} />
                    <RutaPrivada exact strict path="/help" component={Template} />
                    <RutaPrivada exact strict path="/games/images" component={Template} />
                    <RutaPrivada exact strict path="/games/words" component={Template} />
                    <RutaPrivada exact strict path="/games/four-images-one-word" component={Template} />  
                  <Redirect from="/" to="/login"/>

                </Switch>
              </Router>
              </ProfileState>
          </ImageState>
        </AuthState>
      </AlertaState>
    </LoginState>
  )
}

export default App;
