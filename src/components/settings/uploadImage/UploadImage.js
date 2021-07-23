import React, { useState, useEffect, useContext, Fragment } from 'react';
import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import ImageContext from '../../../context/images/imageContext';

import './uploadImage.css';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';

import ClipLoader from "react-spinners/ClipLoader";
import uploadImage from '../../../assets/img/upload_image.jpg';

import DatatableImages from './datatableImages/DatatableImages';
import { Col } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import RewardNotification from '../../common/fire/RewardNotification';

const UploadImage = () => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    const imageContext = useContext(ImageContext)
    const { imagenes,
        recompensasSubirImagen,
        recompensasTareasSubirImagen,
        cargandoSubirImagen,
        cargandoEliminarImagen,
        cargandoModificarImagen,
        guardarImagen,
        traerImagenesPorUsuario,
        eliminarImagen,
        borrarRecompensasSubirImagen,
        borrarRecompensasTareasSubirImagen,
    } = imageContext

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        // Ir a buscar las imágenes subidas por el usuario
        traerImagenesPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [ mensaje, cargandoSubirImagen, cargandoEliminarImagen, cargandoModificarImagen ] )

    const [ image, setImage ] = useState(null)
    const [ pathImage, setPathImage ] = useState(uploadImage)

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

    const onDelete = (id_image) => {
        eliminarImagen(id_image)
    }
    const onSubmit = e => {
        e.preventDefault()

        if (image === null) {
            mostrarAlerta("Debe adjuntar una imagen", 'alerta-error')
            return
        }
        
        console.log("formulario correcto")
        const formData = new FormData();
        formData.append('image', image);
        guardarImagen(formData)

        // Resetear campos
        setImage(null);
        setPathImage(uploadImage);
        document.getElementById("contained-button-file").value = "";
    }

    return (
        <Fragment>

            {recompensasSubirImagen !== null
                ?
                    <RewardNotification
                        recompensas={recompensasSubirImagen}
                        borrarRecompensas={borrarRecompensasSubirImagen}
                    />
                : null
            }

            {recompensasTareasSubirImagen !== null
                ?
                    <RewardNotification
                        recompensas={recompensasTareasSubirImagen}
                        borrarRecompensas={borrarRecompensasTareasSubirImagen}
                    />
                : null
            }

            <Container className="div-uploadImage" >
                <Grid container component="main" >
                    <Grid item xs={12} sm={8} md={12} elevation={6}>
                        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                        <form  onSubmit={onSubmit}  >
                        <Grid container spacing={5} >

                            <Grid item xs={4} >
                                <div className="div-image" >
                                    <input
                                        accept="image/*"
                                        // className={classes.input} // input
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={onFileChange}
                                        style={{ display: "none" }}
                                        />
                                    <img className="img-fluid img-thumbnail image-upload" src={pathImage} alt="" />
                                    <label htmlFor="contained-button-file" className="label-upload-image" >
                                        <Button  variant="contained" style={{ backgroundColor: "greenyellow", height: "85%" }}  component="span">
                                            Agregar imagen
                                        </Button>
                                    </label>
                                </div>
                            </Grid>
                            <Grid item xs={8} >
                                <div className="mt-5 div-filename" >                        
                                    <TextField
                                        className="textfield-filename"
                                        value={ image ? image.name.split(".")[0] : "" }
                                        disabled
                                        name="filename"
                                        variant="filled"
                                        id="filename"
                                        label="Nombre de la imagen"
                                        autoFocus
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: "2%" }} >
                                <div className="row" >
                                    <Col xs={11} >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className="submit-image"
                                            disabled={cargandoSubirImagen}
                                        >
                                            {
                                                    cargandoSubirImagen
                                                    ?
                                                    <Grid container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                    >
                                                        <Grid item xs={6} style={{ color: "#000" }} >
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
                                                    "Subir Imagen"
                                            }
                                        </Button>
                                    </Col>
                                    <Col xs={1} >
                                        <OverlayTrigger
                                            key={9}
                                            placement={"top"}
                                            overlay={
                                        <Tooltip className="tooltipUploadImage" id="help-icon-tooltip-1" >
                                            La imagen subida debe estar relacionada a los incendios y poder ser categorizada con una de las 7 opciones: 
                                            Prevención, Riesgo, Recuperación, Mitigación, Amenaza, Impacto o Combate.
                                        </Tooltip>
                                        }
                                        >
                                            <HelpIcon className="help-icon-tagImage" color="primary" />
                                        </OverlayTrigger>
                                    </Col>
                                </div> 
                            </Grid>
                        </Grid>
                        </form>
                    </Grid>
                </Grid>
                
            </Container>
            <div className="div-datatable-images" >
                <DatatableImages
                    images={imagenes}
                    deleteFunction={onDelete}
                    loadingDelete={cargandoEliminarImagen}
                />
            </div>
        </Fragment>
    );
}
 
export default UploadImage;