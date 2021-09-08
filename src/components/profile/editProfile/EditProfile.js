import React, { useState, useContext, useEffect } from 'react';
import ProfileDefault from '../../../assets/img/profile_default.png';

import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import ProfileContext from '../../../context/profile/profileContext';
import StoreContext from '../../../context/store/storeContext';
import UsuariosContext from '../../../context/usuarios/usuariosContext';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import ClipLoader from "react-spinners/ClipLoader";

import './editProfile.css';

import {
    // FaFacebook,
    // FaTwitter,
    // FaSnapchat,
    // FaInstagram,
    FaEdit,
} from 'react-icons/fa';

import OroBadge from '../../../assets/badges/gold-badge.png';
import BronceBadge from '../../../assets/badges/bronze-badge.png';
import PlataBadge from '../../../assets/badges/medal.png';

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

    const usuariosContext = useContext(UsuariosContext)
    const { 
        imagenesPorUsuario,
        palabrasPorUsuario,
        ahorcadosPorUsuario,
        obtenerImagenesUsuarioAdmin,
        obtenerPalabrasUsuarioAdmin,
        obtenerAhorcadosUsuarioAdmin,
    } = usuariosContext

    const storeContext = useContext(StoreContext)
    const {
        marcosUsuario,
        apodosUsuario,
        obtenerProductosUsuarioEnTienda,
    } = storeContext

    useEffect(() => {
        if (usuario!=null) {
            obtenerImagenesUsuarioAdmin(usuario._id)
            obtenerPalabrasUsuarioAdmin(usuario._id)
            obtenerAhorcadosUsuarioAdmin(usuario._id)
        }
        // eslint-disable-next-line
    }, [usuario])

    useEffect(() => {
        usuarioAutenticado()

        if (mensaje) {
            // setLoadingLogin(false)
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        if ( modificacionUsuarioExitosa ) {
            props.history.push('/profile')
        }

        // obteniendo el perfil del usuario
        obtenerPerfil();
        obtenerProductosUsuarioEnTienda()
        // eslint-disable-next-line
    }, [ mensaje, cargando, modificacionUsuarioExitosa ])

    const [ perfilUsuario, guardarPerfilUsuario ] = useState({
        firstname: localStorage.getItem('firstname'),
        lastname: localStorage.getItem('lastname'),
        gender: localStorage.getItem('gender'),  // string: Masculino, Femenino, Otro
        city: localStorage.getItem('city'),
        age: localStorage.getItem('age'),  // int
        phone: localStorage.getItem('phone'),
        urlFile: localStorage.getItem('urlFile'),
        frame: localStorage.getItem('frame'),
        nickname: localStorage.getItem('nickname'),
        // email: '',
        // esExperto: null, // bool
    })

    const { firstname, lastname, gender, city, age, phone, frame, nickname } = perfilUsuario
    const [ image, setImage ] = useState(null)
    const [ pathImage, setPathImage ] = useState( perfilUsuario && perfilUsuario.urlFile!=="undefined" ? perfilUsuario.urlFile : ProfileDefault )

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
            city.trim() === '' ||
            age === '' ||
            phone.trim() === ''
            // email.trim() === '' ||
            // esExperto === null 
            ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }

        if ( phone.length !== 9 ) {
            mostrarAlerta("Su Teléfono debe tener 9 dígitos", 'alerta-error')
            return
        }

        // pasarlo al action
        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('gender', gender);
        formData.append('city', city);
        formData.append('frame', frame);
        formData.append('nickname', nickname);
        formData.append('age', age);
        formData.append('phone', phone);
        // formData.append('email', email);
        // formData.append('isExpert', isExpert);
        formData.append('image', image);

        // usuario.firstname = firstname
        // usuario.lastname = lastname
        // usuario.phone = phone
        // usuario.age = age
        // usuario.gender = gender

        modificarUsuario(formData, usuario._id)
    }

    return (
        <div className="page-content page-container" id="page-content" >
            <h1 className="profile-title" > Modificar Perfil </h1>
            <div className="date-profile" >
                <span>
                    { new Date().getDate() + '-' + new Date().toLocaleDateString(undefined, { month: 'long'}) + '-' + new Date().getFullYear() }
                </span>
            </div>
            { perfil !== null
            ?
                perfil.league_id.league !== "Bronce"
                ?
                    <form onSubmit={onSubmit} >
                            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                            <div className="container emp-profile">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                            <img className="img-fluid img-thumbnail image_user" src={ pathImage } alt="" />
                                    <div className="m-b-25">
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
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="profile-head">
                                <h5>
                                <TextField
                                        InputProps={{
                                            className: "firstname-input"
                                        }}
                                        InputLabelProps={{
                                            style: { marginLeft: "0em" }
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
                                            style: { marginLeft: "0em" }
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        id="lastname"
                                        label="Apellidos"
                                        value={lastname}
                                        name='lastname'
                                        onChange={onChange}
                                    />
                                </h5>
                                <h6>
                                            { usuario.isFireRelated
                                            ?
                                                <>
                                                    Estoy relacionado con los incendios 
                                                    <div>
                                                        Actividades: {usuario.fireRelation} 
                                                    </div>
                                                </>
                                            :
                                                "No estoy relacionado con los incendios"
                                            }
                                </h6>
                            </div>
                        </div>
                        <div className="col-md-4">
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
                                        <div className="row">
                                            <div className="col-sm-6 col-log-12 col-xl-9">
                                                Modificar Perfil
                                            </div>
                                            <div className="col-sm-6 col-log-12 col-xl-3">
                                                <FaEdit className="update-icon"/>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>Imágenes</p>
                                <div href="!#">Etiquetadas: {perfil.imageTagCount} </div>
                                <div href="!#">Subidas: {imagenesPorUsuario.length} </div>
                                <p>Palabras</p>
                                <div href="!#">Etiquetadas: {perfil.wordTagCount} </div>
                                <div href="!#">Subidas: {palabrasPorUsuario.length} </div>
                                <p>Ahorcados</p>
                                <div href="!#">Completados: {perfil.hangmanTagCount} </div>
                                <div href="!#">Subidos: {ahorcadosPorUsuario.length} </div>
                            </div>
                        </div>
                        <div className="col-md-8 tab-content profile-tab">
                            <Tabs defaultActiveKey="about" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="about" title="Información personal">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{usuario.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Teléfono</label>
                                        </div>
                                        <div className="col-md-6">
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
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Edad</label>
                                        </div>
                                        <div className="col-md-6">
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
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Género</label>
                                        </div>
                                        <div className="col-md-6">
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
                                                <MenuItem value={'Femenino'}>
                                                    Femenino
                                                </MenuItem>
                                                <MenuItem value={'Masculino'}> Masculino </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="mt-4" >Ciudad / comuna</label>
                                        </div>
                                        <div className="col-md-6">
                                            <TextField
                                                className="city-input"
                                                variant="outlined"
                                                fullWidth
                                                id="city"
                                                label="Ciudad / Comuna"
                                                value={city}
                                                name='city'
                                                onChange={onChange}
                                            />
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="gameProfile" title="Perfil del juego">
                                    <div className="row">
                                        <div className="col-md-6 mt-2">
                                            <label>Liga</label>
                                        </div>
                                        <div className="col-md-6">
                                            {perfil.league_id.league} 
                                            <span className="badge badge-pill badge-light align-middle">
                                                <img src={
                                                        perfil.league_id.league === "Bronce" ? BronceBadge
                                                        : perfil.league_id.league === "Plata" ? PlataBadge
                                                        : perfil.league_id.league === "Oro" ? OroBadge : null
                                                    }
                                                    alt=""
                                                    className="user-badge"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Puntuación</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{perfil.score}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Nivel etiquetando imágenes</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{perfil.level_image_id.level}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Nivel etiquetando Palabras</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{perfil.level_word_id.level}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Nivel completando ahorcados</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{perfil.level_four_image_id.level}</p>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="storeBuy" title="Comprado en tienda">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Apodo</label>
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl variant="outlined" >
                                                <InputLabel id="demo-simple-select-outlined-label"> Apodo </InputLabel>
                                                <Select
                                                    className="nickname-input"
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="nickname"
                                                    name="nickname"
                                                    value={nickname}
                                                    fullWidth
                                                    onChange={onChange}
                                                    label="Apodo"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {apodosUsuario.map((apodo, indexFrame) => 
                                                    <MenuItem key={indexFrame} value={apodo.name}>
                                                        {apodo.name} 
                                                    </MenuItem>
                                                )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-6">
                                            <label>Marco</label>
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl variant="outlined" >
                                                <InputLabel id="demo-simple-select-outlined-label"> Marco </InputLabel>
                                                <Select
                                                    className="frame-input"
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="frame"
                                                    name="frame"
                                                    value={frame}
                                                    fullWidth
                                                    onChange={onChange}
                                                    label="Marco"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {marcosUsuario.map((marco, indexFrame) => 
                                                    <MenuItem key={indexFrame} value={marco.name}>
                                                        <div className={`div-imageUser-profile ${marco.nameCss}`} > <img src={ usuario.urlFile ? usuario.urlFile : ProfileDefault } alt=""/> </div>
                                                    </MenuItem>
                                                )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
                        </form>
                    :
                        <div className="container" >
                            <div className="no-words" >
                                <span className="spansito-no-words" >
                                    Usted aún no puede editar su perfil, ¡aumente sus puntos!
                                </span>
                            </div>
                        </div>
                :
                null
            }
        </div>
    );
}
 
export default EditProfile;

/*
<form onSubmit={onSubmit} >
    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
    <div className="padding">
        <div className="col container d-flex justify-content-center">
            <div className="col-xl-12 col-md-12">
                <div className="card user-card-full">
                    <div className="row m-l-0 m-r-0">
                            <div className="col-sm-4 bg-c-lite-green user-profile">
                                <div className="card-block text-center text-white">
                                    <img className="img-fluid img-thumbnail image_user" src={ pathImage } alt="" />
                                    <div className="m-b-25">
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

                                    <p className="f-w-200" > <i>
                                        { usuario.isExpert
                                        ?
                                            "Integrante de FireSES"
                                        :
                                            "No pertenezco a FireSES"
                                        }
                                    </i> </p> 
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600"> Mi información de perfil de usuario </h6>
                                        </div>
                                        <div className="col-sm-6">
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
                                                        <div className="row">
                                                            <div className="col-sm-6 col-log-12 col-xl-9">
                                                                Modificar Perfil
                                                            </div>
                                                            <div className="col-sm-6 col-log-12 col-xl-3">
                                                                <FaEdit className="update-icon"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600"> Email </p>
                                            <h6 className="text-muted f-w-400"> {usuario.email} </h6>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600"> Teléfono </p>
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
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600"> Edad </p>
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
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600"> Género </p>
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
                                                <MenuItem value={'Femenino'}>
                                                    Femenino
                                                </MenuItem>
                                                <MenuItem value={'Masculino'}> Masculino </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600"> Apodo </p>
                                            <FormControl variant="outlined" >
                                                <InputLabel id="demo-simple-select-outlined-label"> Apodo </InputLabel>
                                                <Select
                                                    className="nickname-input"
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="nickname"
                                                    name="nickname"
                                                    value={nickname}
                                                    fullWidth
                                                    onChange={onChange}
                                                    label="Apodo"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {apodosUsuario.map((apodo, indexFrame) => 
                                                    <MenuItem key={indexFrame} value={apodo.name}>
                                                        {apodo.name} 
                                                    </MenuItem>
                                                )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600"> Marco </p>
                                            <FormControl variant="outlined" >
                                                <InputLabel id="demo-simple-select-outlined-label"> Marco </InputLabel>
                                                <Select
                                                    className="frame-input"
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="frame"
                                                    name="frame"
                                                    value={frame}
                                                    fullWidth
                                                    onChange={onChange}
                                                    label="Marco"
                                                >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {marcosUsuario.map((marco, indexFrame) => 
                                                    <MenuItem key={indexFrame} value={marco.name}>
                                                        <div className={`div-imageUser-editProfile ${marco.nameCss}`} > <img src={ usuario.urlFile ? usuario.urlFile : ProfileDefault } alt=""/> </div>
                                                    </MenuItem>
                                                )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>

                                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"> Perfil de juego en E-ncendio </h6>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600"> Liga </p>
                                            <h6 className="text-muted f-w-400">
                                                {perfil.league_id.league}
                                                <span className="badge badge-pill badge-light align-middle">
                                                    <img src={
                                                            perfil.league_id.league === "Bronce" ? BronceBadge
                                                            : perfil.league_id.league === "Plata" ? PlataBadge
                                                            : perfil.league_id.league === "Oro" ? OroBadge : null
                                                        }
                                                        alt=""
                                                        className="user-badge"
                                                    />
                                                </span>
                                            </h6>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="m-b-10 f-w-600"> Puntuación </p>
                                            <h6 className="text-muted f-w-400"> {perfil.score} </h6>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <p className="m-b-10 f-w-600"> Nivel etiquetando Imágenes </p>
                                            <h6 className="text-muted f-w-400"> {perfil.level_image_id.level} </h6>
                                        </div>
                                        <div className="col-sm-4">
                                            <p className="m-b-10 f-w-600"> Nivel etiquetando Palabras </p>
                                            <h6 className="text-muted f-w-400"> {perfil.level_word_id.level} </h6>
                                        </div>
                                        <div className="col-sm-4">
                                            <p className="m-b-10 f-w-600"> Nivel asignando 1 palabra a imágenes </p>
                                            <h6 className="text-muted f-w-400"> {perfil.level_four_image_id.level} </h6>
                                        </div>
                                    </div>

                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
*/