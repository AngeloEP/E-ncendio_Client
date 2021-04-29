import React, { useState, useEffect, useContext }  from 'react';
import PropTypes from 'prop-types';

import AlertaContext from '../../../../../context/alertas/alertaContext';
import AuthContext from '../../../../../context/autentificacion/authContext';
import UsuariosContext from '../../../../../context/usuarios/usuariosContext';
import TagContext from '../../../../../context/tag/tagContext';
import ImageContext from '../../../../../context/images/imageContext';
import WordContext from '../../../../../context/words/wordContext';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';

import ClipLoader from "react-spinners/ClipLoader";

import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import EditIcon from '@material-ui/icons/Edit';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import PublishIcon from '@material-ui/icons/Publish';


import './userForm.css';
import UploadImagesUser from './uploadImagesUser/UploadImagesUser';
import UploadWordsUser from './uploadWordsUser/UploadWordsUser';
import TaggedImagesUser from './taggedImagesUser/TaggedImagesUser';
import TaggedWordsUser from './taggedWordsUser/TaggedWordsUser';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography component={'span'} >{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const UserForm = ({ usuario, handleClose }) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje, usuarioAutenticado } = authContext

    // Extraer informacion del context usuarios
    const usuariosContext = useContext(UsuariosContext)
    const { modificarAdminYBloqueo,
        cargandoAdminYBloqueo,
        imagenesPorUsuario,
        cargandoImagenesUsuarioDesdeAdmin,
        obtenerImagenesUsuarioAdmin,
        palabrasPorUsuario,
        cargandoPalabrasUsuarioDesdeAdmin,
        obtenerPalabrasUsuarioAdmin
    } = usuariosContext

    // Extraer informacion del context imágenes
    const wordContext = useContext(WordContext)
    const { cargandoHabilitarInhabilitarPalabra,
            cargandoEliminarPalabraPorAdmin,
            habilitarInhabilitarPalabraPorUsuario,
            eliminarPalabraPorUsuarioDesdeAdmin,
        } = wordContext

    // Extraer informacion del context imágenes
    const imageContext = useContext(ImageContext)
    const { cargandoHabilitarInhabilitar,
            cargandoEliminarImagenPorAdmin,
            habilitarInhabilitarImagenPorUsuario,
            eliminarImagenPorUsuarioDesdeAdmin,
        } = imageContext

    // Extraer informacion del context etiquetas
    const tagContext = useContext(TagContext)
    const {
        imagenesEtiquetadas,
        palabrasEtiquetadas,
        cargandoResetearEtiquetasPalabras,
        cargandoResetearEtiquetasImagenes,
        obtenerImagenesEtiquetadasPorUsuario,
        obtenerPalabrasEtiquetadasPorUsuario,
        eliminarPalabrasEtiquetadasPorUsuario,
        eliminarImagenesEtiquetadasPorUsuario
    } = tagContext

    const [ user, setUser ] = useState({
        firstname: usuario.Nombre,
        email: usuario.Correo,
        isAdmin: usuario.Admin ? true : false,
        isBlocked: usuario.Bloqueado ? true : false,
    })

    const theme = useTheme();
    const { firstname, email, isAdmin, isBlocked } = user;
    const [value, setValue] = useState(0);


    useEffect(() => {
        usuarioAutenticado()

        obtenerImagenesUsuarioAdmin(usuario._id)
        obtenerPalabrasUsuarioAdmin(usuario._id)
        obtenerImagenesEtiquetadasPorUsuario(usuario._id)
        obtenerPalabrasEtiquetadasPorUsuario(usuario._id)

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    }, [ mensaje,
        cargandoAdminYBloqueo,
        cargandoResetearEtiquetasPalabras,
        cargandoResetearEtiquetasImagenes,
        cargandoHabilitarInhabilitar,
        cargandoEliminarImagenPorAdmin,
        cargandoHabilitarInhabilitarPalabra,
        cargandoEliminarPalabraPorAdmin,
    ] )
    
    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
      const handleChangeIndex = (index) => {
        setValue(index);
    };

    const resetearEtiquetasPalabras = (user_id) => {
        eliminarPalabrasEtiquetadasPorUsuario(user_id)
    }

    const resetearEtiquetasImagenes = (user_id) => {
        eliminarImagenesEtiquetadasPorUsuario(user_id)
    }

    const modificarPropiedadHabilitarImagen = (image_id, isEnabled) => {
        habilitarInhabilitarImagenPorUsuario(image_id, {isEnabled})
    }

    const eliminarImagenDesdeAdmin = (image_id) => {
        eliminarImagenPorUsuarioDesdeAdmin(image_id)
    }

    const modificarPropiedadHabilitarPalabra = (word_id, isEnabled) => {
        habilitarInhabilitarPalabraPorUsuario(word_id, {isEnabled})
    }

    const eliminarPalabraDesdeAdmin = (word_id) => {
        eliminarPalabraPorUsuarioDesdeAdmin(word_id)
    }

    const onSubmitUpdate = e => {
        e.preventDefault()
        // // Validar que no hayan campos vacíos
        if (isAdmin === '' ||
            isBlocked === '' ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        modificarAdminYBloqueo(usuario._id, { isAdmin, isBlocked } )

        setTimeout(() => {
            handleClose()
        }, 2000);
    }

    return (
        <div>
            <Grid container component="main" className="">
                { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                <Grid item xs={12} sm={8} md={12} elevation={6} >
                    {/* { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null } */}
                    <form  onSubmit={onSubmitUpdate}  >
                        <Grid container spacing={5} >
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={firstname}
                                    name="firstname"
                                    variant="filled"
                                    fullWidth
                                    disabled
                                    id="firstname"
                                    label="Nombre"
                                    autoFocus
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="div-isAdmin" > 
                                    <FormControl variant="outlined" className="formControl">
                                        <InputLabel id="demo-simple-select-outlined-label"> Administrador </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            className="select-isAdmin"
                                            id="isAdmin"
                                            name="isAdmin"
                                            value={isAdmin}
                                            onChange={onChange}
                                            label="Administrador"
                                        >
                                        <MenuItem value="">
                                            <em>Ninguno</em>
                                        </MenuItem>
                                        <MenuItem value={true}> Habilitar </MenuItem>
                                        <MenuItem value={false}> Inhabilitar </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <div className="div-isBlocked" > 
                                    <FormControl variant="outlined" className="formControl">
                                        <InputLabel id="demo-simple-select-outlined-label"> Bloqueado </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            className="select-isBlocked"
                                            id="isBlocked"
                                            name="isBlocked"
                                            value={isBlocked}
                                            onChange={onChange}
                                            label="Bloqueado"
                                        >
                                        <MenuItem value="">
                                            <em>Ninguno</em>
                                        </MenuItem>
                                        <MenuItem value={true}> Bloquear </MenuItem>
                                        <MenuItem value={false}> No Bloquear </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <div className="div-button-edit" >
                                    <Button
                                            type="submit"
                                            variant="contained"
                                            style={{ backgroundColor: "yellow", height: "50%", width: "20%", marginLeft: "2%", marginBottom: "2%" }}
                                            startIcon={<EditIcon />}
                                            disabled={cargandoAdminYBloqueo}
                                        >
                                            {
                                                cargandoAdminYBloqueo
                                                ?
                                                <Grid container
                                                    direction="row"
                                                    justify="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item xs={10} style={{color:"#000"}}  >
                                                        Cargando...
                                                    </Grid>
                                                    <Grid item xs={1} >
                                                    <ClipLoader
                                                        color={"#000"}
                                                        loading={true}
                                                        size={20}
                                                    />
                                                    </Grid>
                                                </Grid>
                                                    
                                                :
                                                "Modificar usuario"
                                            }
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <div className="show-details-user" >
                                    <div className="details" >
                                        <div className="images-upload" >
                                            Imágenes Subidas
                                            <div className="num-images-upload" >
                                                {imagenesPorUsuario.length}
                                            </div>
                                        </div>
                                        <div className="words-upload" >
                                            Palabras Subidas
                                            <div className="num-words-upload" >
                                                {palabrasPorUsuario.length}
                                            </div>
                                        </div>
                                        <div className="tag-images" >
                                            Imágenes Etiquetadas
                                            <div className="num-tag-images" >
                                                {imagenesEtiquetadas.length}
                                            </div>
                                        </div>
                                        <div className="tag-words" >
                                            Palabras Etiquetadas
                                            <div className="num-tag-words" >
                                                {palabrasEtiquetadas.length}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <AppBar position="static" style={{ backgroundColor: "#1976d2", color: "#fff"}}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        // indicatorColor="primary"
                                        // textColor="primary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="Imágenes Subidas" icon={<PublishIcon />} {...a11yProps(0)} />
                                        <Tab label="Palabras Subidas" icon={<PublishIcon />} {...a11yProps(1)} />
                                        <Tab label="Imágenes Asociadas" icon={<ImageIcon />} {...a11yProps(2)} />
                                        <Tab label="Palabras Asociadas" icon={<SpellcheckIcon />} {...a11yProps(3)} />
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                >
                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                        <UploadImagesUser
                                            usuario={usuario}
                                            imagenes={imagenesPorUsuario}
                                            funcionHabilitarInhabilitar={modificarPropiedadHabilitarImagen}
                                            cargandoHabilitarInhabilitar={cargandoHabilitarInhabilitar}
                                            funcionEliminar={eliminarImagenDesdeAdmin}
                                            cargandoEliminarImagenPorAdmin={cargandoEliminarImagenPorAdmin}
                                            cargandoImagenesUsuarioDesdeAdmin={cargandoImagenesUsuarioDesdeAdmin}
                                        />
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        <UploadWordsUser
                                            usuario={usuario}
                                            palabras={palabrasPorUsuario}
                                            funcionHabilitarInhabilitar={modificarPropiedadHabilitarPalabra}
                                            cargandoHabilitarInhabilitarPalabra={cargandoHabilitarInhabilitarPalabra}
                                            funcionEliminar={eliminarPalabraDesdeAdmin}
                                            cargandoEliminarPalabraPorAdmin={cargandoEliminarPalabraPorAdmin}
                                            cargandoPalabrasUsuarioDesdeAdmin={cargandoPalabrasUsuarioDesdeAdmin}
                                        />
                                    </TabPanel>
                                    <TabPanel value={value} index={2} dir={theme.direction}>
                                        <TaggedImagesUser usuario={usuario} imagenesEtiquetadas={imagenesEtiquetadas} funcionResetear={resetearEtiquetasImagenes} cargandoResetearEtiquetasImagenes={cargandoResetearEtiquetasImagenes} />
                                    </TabPanel>
                                    <TabPanel value={value} index={3} dir={theme.direction}>
                                        <TaggedWordsUser usuario={usuario} palabrasEtiquetadas={palabrasEtiquetadas} funcionResetear={resetearEtiquetasPalabras} cargandoResetearEtiquetasPalabras={cargandoResetearEtiquetasPalabras} />
                                    </TabPanel>
                                </SwipeableViews>
                            </Grid>
                            <Grid item xs={12} sm={12}>

                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
 
export default UserForm;