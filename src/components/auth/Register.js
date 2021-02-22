import React, { useState, useContext, useEffect } from 'react';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentificacion/authContext';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './makestyles/register';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';


const Register = (props) => {
    const classes = useStyles();

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const authContext = useContext(AuthContext)
    const { mensaje, autenticado, registrarUsuario } = authContext

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        if (autenticado) {
            props.history.push('/home')
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    }, [mensaje, autenticado, props.history ] )

    // State para logearse
    const [ usuario, guardarUsuario ] = useState({
        firstname: '',
        lastname: '',
        gender: '',  // string: Masculino, Femenino, Otro
        age: null,  // int
        email: '',
        password: '',
        confirmar: '',
        esExperto: null, // bool
    })

    const { firstname, lastname, gender, age, email, password, confirmar, esExperto } = usuario

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
        if (firstname.trim() === '' ||
            lastname.trim() === '' ||
            gender.trim() === '' ||
            age === null ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirmar.trim() === '' ||
            esExperto === null ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        let isExpert
        if ( esExperto === "si" ) {
            isExpert = true
        } else {
            isExpert = false
        }

        // Password mínimo de 6 caracteres
        if (password.length < 6) {
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error')
            return
        }
        
        // los 2 passwords son iguales
        if (password !== confirmar) {
            mostrarAlerta('Los password no son iguales', 'alerta-error')
            return
        }

        // pasarlo al action
        registrarUsuario({
            firstname,
            lastname,
            gender,
            age,
            email,
            password,
            isExpert
        })
    }

    return (
        <Grid container component="main" className={classes.divlogin}>
            <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
            
                
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                    Registrarse
                </Typography>
                { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                <form className={classes.form} onSubmit={onSubmit}  >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={firstname}
                            name="firstname"
                            variant="outlined"
                            fullWidth
                            id="firstname"
                            label="Nombre"
                            autoFocus
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="lastname"
                            label="Apellidos"
                            value={lastname}
                            name='lastname'
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label"> Género </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="gender"
                                name="gender"
                                value={gender}
                                fullWidth
                                onChange={onChange}
                                label="Género"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Femenino'}> Femenino </MenuItem>
                            <MenuItem value={'Masculino'}> Masculino </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            variant="outlined"
                            id="age"
                            label="Edad"
                            name='age'
                            type='number'
                            value={age}
                            fullWidth
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="email"
                            type="email"
                            label="Email"
                            value={email}
                            name='email'
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
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
                            fullWidth
                            value={confirmar}
                            name='confirmar'
                            label="Confirmar Contraseña"
                            type="password"
                            id="confirmar"
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >
                            <Typography variant="subtitle1" color="textPrimary" align="center" className="mt-1" >
                                Es integrante de FireSES
                            </Typography>
                            <RadioGroup row aria-label="position" name="esExperto" value={esExperto} onChange={onChange}>
                                    <FormControlLabel
                                        className="ml-5 mt-2"
                                        value="si"
                                        name="esExperto"
                                        label="Si"
                                        control={<Radio color="primary" />}
                                        labelPlacement="start"
                                        />
                                    <FormControlLabel
                                        className="ml-5 mt-2"
                                        value="no"
                                        name="esExperto"
                                        label="No"
                                        control={<Radio />}
                                        labelPlacement="end"
                                        />
                            </RadioGroup>
                        </div>
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
            </Grid>
        </Grid>
    );
}
 
export default Register;