import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './makestyles/register';
import Container from '@material-ui/core/Container';



const Register = () => {
    const classes = useStyles();

    // State para logearse
    const [ usuario, guardarUsuario ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmar: ''
    })

    const { firstName, lastName, email, password, confirmar } = usuario

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario da clic en Registrarse
    const onSubmit = e => {
        e.preventDefault()

        // Validar que no hayan campos vacíos

        // Password mínimo de 6 caracteres

        // los 2 passwords son iguales

        // pasarlo al action
    }

    return (
        <div className={classes.divlogin} style={{  backgroundImage: 'linear-gradient(lightGreen, lightBlue)', }} >
            
            <CssBaseline />
            <div className="container" >
                
            
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                    Registrarse
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}  >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        value={firstName}
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="Nombre"
                        autoFocus
                        onChange={onChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Apellidos"
                        value={lastName}
                        name='lastName'
                        onChange={onChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        value={email}
                        name='email'
                        onChange={onChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        value={password}
                        name='password'
                        label="Contraseña"
                        type="password"
                        id="password"
                        onChange={onChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        value={confirmar}
                        name='confirmar'
                        label="Confirmar Contraseña"
                        type="password"
                        id="confirmar"
                        onChange={onChange}
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Registrarse
                </Button>
                <Grid container justify="center">
                    <Grid item>
                    <Link href="/" variant="body2">
                        ¿Ya tienes una cuenta?, Inicia Sesión
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={5}>
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
 
export default Register;