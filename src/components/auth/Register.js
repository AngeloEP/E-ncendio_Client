import React, { useState, useContext, useEffect } from 'react';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentificacion/authContext';

import './register.css';

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
import RadioGroup from '@material-ui/core/RadioGroup';

import ClipLoader from "react-spinners/ClipLoader";
import logo from '../../assets/img/logo.png';
import uploadImage from '../../assets/img/upload_image.jpg';


const Register = (props) => {
    const classes = useStyles();

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const authContext = useContext(AuthContext)
    const { mensaje, autenticado, cargandoRegistroUsuario, registrarUsuario } = authContext

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        if (autenticado) {
            props.history.push('/home')
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, cargandoRegistroUsuario, props.history ] )

    // State para logearse
    const [ usuario, guardarUsuario ] = useState({
        firstname: '',
        lastname: '',
        gender: '',  // string: Masculino, Femenino, Otro
        city: '',
        fireRelation: '',
        age: "",  // int
        phone: '',
        email: '',
        password: '',
        confirmar: '',
        estaRelacionadoConIncendios: "", // bool
    })
    // const [geometry, setGeometry] = useState([])
    const { firstname, lastname, gender, city, fireRelation, age, phone, email, password, confirmar, estaRelacionadoConIncendios } = usuario
    const [ image, setImage ] = useState(null)
    const [ pathImage, setPathImage ] = useState(uploadImage)

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    // if (geometry.length === 0) {
    //     navigator.geolocation.getCurrentPosition(
    //         function(position) {
    //             console.log("Ubicación del usuario disponible", position.coords.latitude)
    //             setGeometry({
    //                 geometry: [position.coords.latitude,position.coords.longitude]
    //             })
    //         },
    //         function(error) {
    //             console.log("Ubicación del usuario NO disponible")
    //             setGeometry({
    //                 geometry: [0,0]
    //             })
    //         }
    //     );
    // }

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (file.type.includes("image")) {
                const reader = new FileReader()
                reader.readAsDataURL(file)

                reader.onload = function load() {
                    setPathImage(reader.result)
                }
                setImage(file)
            } else {
                mostrarAlerta("Debe seleccionar un archivo de tipo imagen, se admiten extensiones: jpeg, jpg, png y gif", "alerta-error")
            }
        }
    }


    // Cuando el usuario da clic en Registrarse
    const onSubmit = e => {
        e.preventDefault()
        // Validar que no hayan campos vacíos
        if (firstname.trim() === '' ||
            lastname.trim() === '' ||
            gender.trim() === '' ||
            city.trim() === '' ||
            age === "" ||
            phone.trim() === '' ||
            // image === null ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirmar.trim() === '' ||
            estaRelacionadoConIncendios === "" ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        if ( phone.length !== 9 ) {
            mostrarAlerta("Su Teléfono debe tener 9 dígitos", 'alerta-error')
            return
        }
        if (estaRelacionadoConIncendios === "si" && fireRelation === '') {
            mostrarAlerta("Debe especificar su relación con los incendios", 'alerta-error')
            return
        }
        let isFireRelated
        if ( estaRelacionadoConIncendios === "si" ) {
            isFireRelated = true
        } else {
            isFireRelated = false
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
        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('gender', gender);
        formData.append('city', city);
        formData.append('fireRelation', fireRelation);
        // geometry["geometry"].forEach(geo => formData.append('geometry[]', geo))
        [latitude, longitude].forEach(geo => formData.append('geometry[]', geo))
        formData.append('age', age);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('isFireRelated', isFireRelated);
        formData.append('image', image);
        registrarUsuario(formData)
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        },
        function(error) {
          console.error("Geolocation is not saved = " + error.code + " - " + error.message);
        }
      );    

    return (
        <Grid container component="main" className={classes.divlogin}>
            <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
            
                
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <img src={logo} alt='logo' style={{ width:"270px", height: "180px" }} />

                <Typography component="h1" variant="h4">
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={3}  >
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                        </Grid>
                        <Grid item xs={9} >
                            Registrarse
                        </Grid>
                    </Grid>
                    
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
                                <em>Ninguno</em>
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
                            id="city"
                            label="Ciudad o Comuna"
                            value={city}
                            name='city'
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={onFileChange}
                            style={{ display: "none" }}
                        />
                        <img className="img-fluid img-thumbnail image_user" src={pathImage} alt="" />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Subir imagen
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="phone"
                            type="number"
                            label="Teléfono, ej: 123456789"
                            value={phone}
                            name='phone'
                            onChange={onChange}
                        />
                        <br/>
                        <br/>
                        <p> {image ? image.name : "No ha seleccionado imagen"} </p>
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
                    <Grid item xs={12}>
                        <div className="isExpert" >
                            <Typography variant="subtitle2" color="textPrimary" align="center" className="mt-1" >
                                ¿Tus actividades se relacionan con los incendios?
                            </Typography>
                            <RadioGroup row aria-label="position" name="estaRelacionadoConIncendios" value={estaRelacionadoConIncendios} onChange={onChange}>
                                    <FormControlLabel
                                        className="ml-5 mt-2"
                                        value="si"
                                        name="estaRelacionadoConIncendios"
                                        label="Si"
                                        control={<Radio color="primary" />}
                                        labelPlacement="start"
                                        />
                                    <FormControlLabel
                                        className="ml-5 mt-2"
                                        value="no"
                                        name="estaRelacionadoConIncendios"
                                        label="No"
                                        control={<Radio />}
                                        labelPlacement="end"
                                        />
                            </RadioGroup>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="fireRelation"
                            label={estaRelacionadoConIncendios === "si" ? "Especifique su relación*" : "Especifique su relación"}
                            disabled={estaRelacionadoConIncendios === "si" ? false : true}
                            value={fireRelation}
                            name='fireRelation'
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
                    disabled={cargandoRegistroUsuario}
                >
                    {
                            cargandoRegistroUsuario
                            ?
                            <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item xs={2} style={{ color: "#000" }}  >
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
                            "Registrarse"
                    }
                </Button>

                <Grid container justify="center">
                    <Grid item>
                    <Link href="/login" variant="body2">
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