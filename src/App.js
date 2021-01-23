import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Template from './components/template/Template';
import LoginState from './context/login/loginState';


function App() {
  return (
    <LoginState>
      <Router>
        <Switch>
          
          <Route exact strict path='/login' component={Login} /> 
          <Route exact strict path="/register" component={Register} />
            <Route exact strict path="/home" component={Template} />
            <Route exact strict path="/profile" component={Template} />
            <Route exact strict path="/rank" component={Template} />
            <Route exact strict path="/about" component={Template} />
            <Route exact strict path="/games" component={Template} />
            <Route exact strict path="/help" component={Template} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </LoginState>
  )
}

export default App;
