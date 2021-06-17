import React, { useState, useContext, useEffect } from 'react';
import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import ResetPasswordContext from '../../../context/resetPassword/resetPasswordContext';

import logo from '../../../assets/img/logo.png';

import './resetPassword.css';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';

import ClipLoader from "react-spinners/ClipLoader";

const ResetPassword = ( props ) => {

  // Extraer los valores del context
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta } = alertaContext

  const authContext = useContext(AuthContext)
  const { mensaje, autenticado } = authContext

  // Obtener el state del formulario
  const resetPasswordContext = useContext(ResetPasswordContext)
    const {
        emailerror,
        passworderror,
        cambiarContraseña,
        code,
        enviarCodigo,
        correoUsuario,
        cargandoEnviarCodigo,
        cargandoResetearContraseña,
        returnLogin,
        cambiarReturn,
    } = resetPasswordContext


  // En caso de que el password o usuario no exista
  useEffect(() => {
    if (autenticado) {
        props.history.push('/home')
    }

    if (mensaje) {
        mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history ] )

  // State para iniciar sesión
  const [ usuario, guardarUsuario ] = useState({
    email: '',
    password: '',
    codigo: '',
    confirmPassword: ''
  })

  if (returnLogin) {
        cambiarReturn()
      props.history.push("login")
  }

  // Extraer de usuario
  const { email, password, codigo, confirmPassword } = usuario

  const onChange = e => {
      guardarUsuario({
          ...usuario,
          [e.target.name]: e.target.value
      })
  }

   // Cuando el usuario quiere iniciar sesión
   const onSubmitReceiveCode = e => {
    e.preventDefault()
    
    if ( email.trim() === '' ) {
      mostrarAlerta('El correo es obligatorio', 'alerta-error')
      return
    }
    
    enviarCodigo({ email })

    guardarUsuario({
        email: ""
    })
    
}

  // Cuando el usuario quiere iniciar sesión
  const onSubmit = e => {
      e.preventDefault()

      if (codigo !== code) {
        mostrarAlerta('Código Incorrecto', 'alerta-error')
        return
        }

      if (password.trim() === '' ) {
        mostrarAlerta('Debes ingresar una contraseña', 'alerta-error')
        return
      }


      if (confirmPassword !== password) {
        mostrarAlerta('Los campos confirmar contraseña y contraseña son distintos', 'alerta-error')
        return
      }
      
      // Pasarlo al action
      cambiarContraseña({ email: correoUsuario, password })
      
      guardarUsuario({
        password: '',
        codigo: '',
        confirmPassword: ''
    })
  }

  return (
    <div className="main-login-resetpass" >
        <div className="divlogin-resetpass"  >
        <CssBaseline />
        <div className="container div-contenedor-resetpass" style={{ }} >
          
        
        <div className="div-divsito-resetpass">
          <div className="img-login-resetpass" >
            <img src={logo} alt='logo' className="center" />
          </div>
          <div className="row avatar-title-resetpass" >
              <Avatar className="avatar-resetpass">
                <LockOutlinedIcon />
              </Avatar>
           
            
              <p className="titulo-login-resetpass" >
                Cambiar contraseña
              </p>
          </div>
          { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
          { code === "" ?
            <form className="form-resetpass" onSubmit={onSubmitReceiveCode} >
                <TextField
                className="inputs-resetpass"
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
                { emailerror ? <Alert severity="error" className="errorMessage-resetpass" > Correo No encontrado! </Alert> : null }
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={cargandoEnviarCodigo}
                className="btn-blue mt-2"
                >
                {
                    cargandoEnviarCodigo
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
                    "Recibir código"
                }
                </Button>
            </form>
            :
            <form className="form-resetpass" onSubmit={onSubmit} >
                <TextField
                    className="mt-3 inputs-resetpass"
                    variant="outlined"
                    id="codigo"
                    label="Ingrese código"
                    name='codigo'
                    type='codigo'
                    value={codigo}
                    fullWidth
                    onChange={onChange}
                />
                <TextField
                    className="inputs-resetpass"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    value={password}
                    label="Ingresa tu nueva Contraseña"
                    type="password"
                    id="password"
                    onChange={onChange}
                />
                { passworderror ? <Alert severity="error" className="errorMessage-resetpass" > Contraseña mal ingresada! </Alert> : null }

                <TextField
                    className="inputs-resetpass"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    value={confirmPassword}
                    label="Ingresa tu nueva Contraseña"
                    type="password"
                    id="confirmPassword"
                    onChange={onChange}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={cargandoResetearContraseña}
                    className="btn-blue mt-2"
                    >
                    {
                        cargandoResetearContraseña
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
                        "Cambiar contraseña"
                    }
                </Button>
          </form>
          }

                <Grid container direction="column" >
                <Grid item xs>
                    <Link href="/login" variant="body2">
                        {"¿Ya tienes una cuenta?, ingresa aquí"}
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
        </div>
      </div>
      </div>
    </div>
  );
}

export default ResetPassword;