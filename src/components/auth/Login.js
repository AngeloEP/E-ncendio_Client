import React, { useState, useContext, useEffect } from 'react';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentificacion/authContext';
import loginContext from '../../context/login/loginContext';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './makestyles/login';
import { Alert } from '@material-ui/lab';


const Login = ( props ) => {
  const classes = useStyles()

  // Extraer los valores del context
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta } = alertaContext

  const authContext = useContext(AuthContext)
  const { mensaje, autenticado, iniciarSesion } = authContext

  // Obtener el state del formulario
  const loginsContext = useContext(loginContext)
  const { emailerror, passworderror, validarEmail, validarPassword, emailCorrecto, passwordCorrecto } = loginsContext

  // En caso de que el password o usuario no exista
  useEffect(() => {
    if (autenticado) {
        props.history.push('/home')
    }

    if (mensaje) {
        mostrarAlerta(mensaje.msg, mensaje.categoria)
    }

  }, [mensaje, autenticado, props.history ] )

  // State para iniciar sesión
  const [ usuario, guardarUsuario ] = useState({
    email: '',
    password: ''
  })

  const userStatic = {
    email: 'angelocristobalep@gmail.com',
    password: '123'
  }

  // Extraer de usuario
  const { email, password } = usuario

  const onChange = e => {
      guardarUsuario({
          ...usuario,
          [e.target.name]: e.target.value
      })
  }

  // Cuando el usuario quiere iniciar sesión
  const onSubmit = e => {
      e.preventDefault()

      if ( email.trim() === '' | password.trim() === '' ) {
        mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        return
      }

      // Pasarlo al action
      iniciarSesion({ email, password })

      // TODO: MODIFICAR LOGIN CONTEXT
      // Validar condiciones de los campos
      // if ( email != userStatic.email ) {
      //   // alert("Correo incorrecto")
      //   validarEmail()
      //   return
      // }
      // emailCorrecto()

      // if ( password != userStatic.password ) {
      //   validarPassword()
      //   return
      // }
      // passwordCorrecto()

      // Reiniciar formulario
      // guardarUsuario({
      //   email: '',
      //   password: ''
      // })
      
      // history.push('/home');
      
  }

  return (
    <div className={classes.divlogin} style={{  backgroundImage: 'linear-gradient(lightGreen, lightBlue)', }} >
      
        <CssBaseline />
        <div className="container">
          
        
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
          <form className={classes.form} onSubmit={onSubmit} >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Ingresa E-mail"
              name="email"
              value={email}
              autoFocus
              onChange={onChange}
            />
            { emailerror ? <Alert severity="error" className={classes.errorMessage} > Correo No encontrado! </Alert> : null }
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              value={password}
              label="Contraseña"
              type="password"
              id="password"
              onChange={onChange}
            />
            { passworderror ? <Alert severity="error" className={classes.errorMessage} > Contraseña mal ingresada! </Alert> : null }
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"¿No tienes una cuenta?, Registrate"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {'E-ncendio '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
        </Box>
        </div>
    </div>
  );
}

export default Login;