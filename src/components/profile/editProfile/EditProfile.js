import React, { useState, useContext, useEffect, useRef } from 'react';
import ProfileDefault from '../../../assets/img/profile_default.png';

import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import ProfileContext from '../../../context/profile/profileContext';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ClipLoader from "react-spinners/ClipLoader";

import './editProfile.css';

import {
    FaFacebook,
    FaTwitter,
    FaSnapchat,
    FaInstagram,
    FaEdit,
} from 'react-icons/fa';

const EditProfile = ( props ) => {
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer la información de autentificación
    const authContext = useContext(AuthContext)
    const { usuario, mensaje, cargando, cargandoModificacionUsuario, modificacionUsuarioExitosa, usuarioAutenticado, modificarUsuario } = authContext

    // Extraer la información de los perfiles
    const profilecontext = useContext(ProfileContext)
    const { perfil, obtenerPerfil } = profilecontext

    const prevCountRef = useRef();

    useEffect(() => {
        usuarioAutenticado()
        prevCountRef.current = usuario

        if (mensaje) {
            // setLoadingLogin(false)
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        if ( modificacionUsuarioExitosa ) {
            props.history.push('/profile')
        }

        // obteniendo el perfil del usuario
        obtenerPerfil();
    }, [ mensaje, cargando, modificacionUsuarioExitosa ])

    const prevCount = prevCountRef.current;
    const [ perfilUsuario, guardarPerfilUsuario ] = useState({
        firstname: localStorage.getItem('firstname'),
        lastname: localStorage.getItem('lastname'),
        gender: localStorage.getItem('gender'),  // string: Masculino, Femenino, Otro
        age: localStorage.getItem('age'),  // int
        phone: localStorage.getItem('phone'),
        // email: '',
        // esExperto: null, // bool
    })

    const { firstname, lastname, gender, age, phone, esExperto } = perfilUsuario
    const [ image, setImage ] = useState(null)
    const [ pathImage, setPathImage ] = useState( usuario.urlFile ? usuario.urlFile : ProfileDefault )

    const onChange = e => {
        guardarPerfilUsuario({
            ...perfilUsuario,
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
                // console.log(file)
                // console.log(usuario)
                setImage(file)
                // console.log(usuario)
            } else {
                mostrarAlerta("Debe seleccionar un archivo de tipo imagen, se admiten extensiones: jpeg, jpg, png y gif", "alerta-error")
            }
        }
    }

    // Cuando el usuario da clic en Registrarse
    const onSubmit = e => {
        e.preventDefault()
        

        if (firstname.trim() === '' ||
            lastname.trim() === '' ||
            gender.trim() === '' ||
            age === '' ||
            phone.trim() === ''
            // email.trim() === '' ||
            // esExperto === null 
            ) {
                console.log("error")
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }

        // if ( image === null ) {
        //     mostrarAlerta("No ha seleccionado una imagen", 'alerta-error')
        //     return
        // }

        if ( phone.length != 9 ) {
            mostrarAlerta("Su Teléfono debe tener 9 dígitos", 'alerta-error')
            return
        }
        // let isExpert
        // if ( esExperto === "si" ) {
        //     isExpert = true
        // } else {
        //     isExpert = false
        // }

        // pasarlo al action
        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('gender', gender);
        formData.append('age', age);
        formData.append('phone', phone);
        // formData.append('email', email);
        // formData.append('isExpert', isExpert);
        formData.append('image', image);
        console.log(formData)

        // usuario.firstname = firstname
        // usuario.lastname = lastname
        // usuario.phone = phone
        // usuario.age = age
        // usuario.gender = gender

        modificarUsuario(formData, usuario._id)
    }

    return (
        <div class="page-content page-container" id="page-content" >
            { perfil != null
            ?
            <form onSubmit={onSubmit} >
                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                    <div class="padding">
                        <div class="col container d-flex justify-content-center">
                            <div class="col-xl-12 col-md-12">
                                <div class="card user-card-full">
                                    <div class="row m-l-0 m-r-0">
                                            <div class="col-sm-4 bg-c-lite-green user-profile">
                                                <div class="card-block text-center text-white">
                                                    <img className="img-fluid img-thumbnail image_user" src={ pathImage } alt="Image" />
                                                    <div class="m-b-25">
                                                        <input
                                                            accept="image/*"
                                                            className="image-input"
                                                            id="contained-button-file"
                                                            multiple
                                                            type="file"
                                                            onChange={onFileChange}
                                                            style={{ display: "none" }}
                                                        />
                                                        <label htmlFor="contained-button-file">
                                                            <Button variant="contained" color="primary" component="span">
                                                                Subir imagen
                                                            </Button>
                                                        </label>
                                                    </div>
                                                    <p> {image ? image.name : "No ha seleccionado imagen"} </p>
                                                    <TextField
                                                        InputProps={{
                                                            className: "firstname-input"
                                                        }}
                                                        InputLabelProps={{
                                                            style: { marginLeft: "2em" }
                                                        }}
                                                        value={firstname}
                                                        name="firstname"
                                                        variant="outlined"
                                                        fullWidth
                                                        id="firstname"
                                                        label="Nombre"
                                                        autoFocus
                                                        onChange={onChange}
                                                    />
                                                    <TextField
                                                        InputProps={{
                                                            className: "lastname-input",
                                                        }}
                                                        InputLabelProps={{
                                                            style: { marginLeft: "2em" }
                                                        }}
                                                        variant="outlined"
                                                        fullWidth
                                                        id="lastname"
                                                        label="Apellidos"
                                                        value={lastname}
                                                        name='lastname'
                                                        onChange={onChange}
                                                    />

                                                    <p class="f-w-200" > <i>
                                                        { usuario.isExpert
                                                        ?
                                                            "Integrante de FireSES"
                                                        :
                                                            "No pertenezco a FireSES"
                                                        }
                                                    </i> </p> 
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="card-block">
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <h6 class="m-b-20 p-b-5 b-b-default f-w-600"> Mi información de perfil de usuario </h6>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <button className="update-btn" type="submit" >
                                                                {
                                                                    cargandoModificacionUsuario
                                                                    ?
                                                                    <Grid container
                                                                        direction="row"
                                                                        justify="center"
                                                                        alignItems="center"
                                                                        spacing={1}
                                                                    >
                                                                        <Grid item xs={8}  >
                                                                        Cargando...
                                                                        </Grid>
                                                                        <Grid item xs={3} >
                                                                        <ClipLoader
                                                                            color={"#fff"}
                                                                            loading={true}
                                                                            size={20}
                                                                        />
                                                                        </Grid>
                                                                    </Grid>
                                                                        
                                                                    :
                                                                    <div>
                                                                        Modificar Perfil
                                                                        <FaEdit className="update-icon"/>
                                                                    </div>
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600"> Email </p>
                                                            <h6 class="text-muted f-w-400"> {usuario.email} </h6>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600"> Teléfono </p>
                                                            <TextField
                                                                className="phone-input"
                                                                variant="outlined"
                                                                fullWidth
                                                                id="phone"
                                                                type="number"
                                                                label="Teléfono, ej: 123456789"
                                                                value={phone}
                                                                name='phone'
                                                                onChange={onChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600"> Edad </p>
                                                            <TextField
                                                                className="age-input"
                                                                variant="outlined"
                                                                id="age"
                                                                label="Edad"
                                                                name='age'
                                                                type='number'
                                                                value={age}
                                                                fullWidth
                                                                onChange={onChange}
                                                            />
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600"> Género </p>
                                                            <FormControl variant="outlined" >
                                                                <InputLabel id="demo-simple-select-outlined-label"> Género </InputLabel>
                                                                <Select
                                                                    className="gender-input"
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
                                                        </div>
                                                    </div>

                                                    <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"> Perfil de juego en E-ncendio </h6>
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600"> Liga </p>
                                                            <h6 class="text-muted f-w-400"> {perfil.league_id.league} </h6>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600"> Puntuación </p>
                                                            <h6 class="text-muted f-w-400"> {perfil.score} </h6>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <div class="row">
                                                        <div class="col-sm-4">
                                                            <p class="m-b-10 f-w-600"> Nivel etiquetando Imágenes </p>
                                                            <h6 class="text-muted f-w-400"> {perfil.level_image_id.level} </h6>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <p class="m-b-10 f-w-600"> Nivel etiquetando Palabras </p>
                                                            <h6 class="text-muted f-w-400"> {perfil.level_word_id.level} </h6>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <p class="m-b-10 f-w-600"> Nivel asignando 1 palabra a imágenes </p>
                                                            <h6 class="text-muted f-w-400"> {perfil.level_four_image_id.level} </h6>
                                                        </div>
                                                    </div>

                                                    <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                        <li> <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"> <FaFacebook/> </a> </li>
                                                        <li> <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"> <FaTwitter/> </a> </li>
                                                        <li> <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"> <FaInstagram/> </a> </li>
                                                    </ul>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                :
                null
            }
        </div>
    );
}
 
export default EditProfile;