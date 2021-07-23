import React, { useState, useContext, useEffect } from 'react';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentificacion/authContext';
import loginContext from '../../context/login/loginContext';
import ProfileContext from '../../context/profile/profileContext';
import DailyTasksContext from '../../context/dailyTasks/dailyTasksContext';

import logo from '../../assets/img/logo.png';

import './login.css';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './makestyles/login';
import { Alert } from '@material-ui/lab';

import ClipLoader from "react-spinners/ClipLoader";
import HashLoader from "react-spinners/HashLoader";

const Login = ( props ) => {
  const classes = useStyles()

  // Extraer los valores del context
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta } = alertaContext

  const authContext = useContext(AuthContext)
  const { mensaje, autenticado, iniciarSesion } = authContext

  // Obtener el state del formulario
  const loginsContext = useContext(loginContext)
  const { emailerror, passworderror } = loginsContext

  const profilecontext = useContext(ProfileContext)
  const { obtenerPerfil } = profilecontext

  const dailyTasksContext = useContext(DailyTasksContext)
  const { obtenerTareasDiarias } = dailyTasksContext

  const [ loadingPage, setLoadingPage ] = useState(false)
  const [ loadingLogin, setLoadingLogin] = useState(false)

  // En caso de que el password o usuario no exista
  useEffect(() => {
    setLoadingPage(true);
    if (autenticado) {
        setLoadingLogin(false)
        props.history.push('/home')
        obtenerPerfil();
        obtenerTareasDiarias();
    }

    if (mensaje) {
        setLoadingLogin(false)
        mostrarAlerta(mensaje.msg, mensaje.categoria)
    }

    setTimeout(() => {
      setLoadingPage(false);
    }, 1500);
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history ] )

  // State para iniciar sesión
  const [ usuario, guardarUsuario ] = useState({
    email: '',
    password: ''
  })

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
      
      setLoadingLogin(true);
      if ( email.trim() === '' | password.trim() === '' ) {
        mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        setTimeout(() => {
          setLoadingLogin(false);
        }, 250);
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
    <div className="main-login" >
      {
        loadingPage
        ?
            <div className={classes.loadingPage} >
                <HashLoader
                    color={"#7ED321"}
                    loading={loadingPage}
                    size={150}
                />
            </div>
        :
        <div className="divlogin"  >
        <CssBaseline />
        <div className="container div-contenedor" style={{ }} >
          
        
        <div className="div-divsito">
          <div className="img-login" >
            <img src={logo} alt='logo' className="center" />
          </div>
          <div className="row avatar-title" >
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
           
            
              <p className="titulo-login" >
                Iniciar Sesión
              </p>
          </div>
          { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
          <form className="form" onSubmit={onSubmit} >
            <TextField
              className={classes.inputs}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Ingresa tu E-mail"
              name="email"
              value={email}
              autoFocus
              onChange={onChange}
            />
            { emailerror ? <Alert severity="error" className={classes.errorMessage} > Correo No encontrado! </Alert> : null }
            <TextField
              className={classes.inputs}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              value={password}
              label="Ingresa tu Contraseña"
              type="password"
              id="password"
              onChange={onChange}
            />
            { passworderror ? <Alert severity="error" className={classes.errorMessage} > Contraseña mal ingresada! </Alert> : null }
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loadingLogin}
              // className={classes.submit}
              className="btn-blue mt-2"
            >
              {
                loadingLogin
                ?
                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item xs={3} style={{ color: "#000" }} >
                      Cargando...
                    </Grid>
                    <Grid item xs={3} >
                      <ClipLoader
                        color={"#000"}
                        loading={true}
                        size={20}
                      />
                    </Grid>
                  </Grid>
                    
                :
                  "Iniciar Sesión"
              }
            </Button>
            <Grid container direction="column" >
              <Grid item xs>
                <Link href="/reset-password" variant="body2">
                  {"Te olvisate de tu contraseña?, cambiala aquí"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"¿No tienes una cuenta?, Registrate"}
                </Link>
              </Grid>
            </Grid>
          <div  >
            <Typography variant="body1" color="inherit" align="center">
              {'Copyright © '}
              {'E-ncendio '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </div>
          </form>
        </div>
      </div>
      </div>
      }
    </div>
  );
}

export default Login;