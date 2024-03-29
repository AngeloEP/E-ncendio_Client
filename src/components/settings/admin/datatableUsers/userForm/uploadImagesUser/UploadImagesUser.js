import React, { useState, useContext } from 'react';
import './uploadImagesUser.css';

import AlertaContext from '../../../../../../context/alertas/alertaContext';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ClipLoader from "react-spinners/ClipLoader";

import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button';


const UploadImagesUser = ({ usuario,
    imagenes,
    funcionHabilitarInhabilitar,
    cargandoHabilitarInhabilitarImagen,
    funcionEliminar,
    cargandoEliminarImagenPorAdmin,
    cargandoImagenesUsuarioDesdeAdmin,
    funcionModificarDificultadYPuntos,
    cargandoModificarDificultadPuntosImagenPorAdmin,
}) => {
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const [show, setShow] = useState(false);

    const handleClose = () => {
            setShow(false)
    };

    const handleShow = (image_id) => {
        const imageSelected = imagenes.find(image => image._id === image_id);
        setFieldsImageUpdate({
            id_image_selected: image_id,
            nameUpdate: imageSelected.Nombre,
            difficulty: imageSelected.Dificultad,
            points: imageSelected.Puntos,
        })
        setPathImageUpdate(imageSelected.Imagen)
        setShow(true)
    };

    const [ fieldsImageUpdate, setFieldsImageUpdate ] = useState({
        id_image_selected: "",
        nameUpdate: "",
        difficulty: "",
        points: 0,
    })
    const { id_image_selected, nameUpdate, difficulty, points } = fieldsImageUpdate;
    const [ pathImageUpdate, setPathImageUpdate ] = useState(null)

    const onChangeUpdate = e => {
        setFieldsImageUpdate({
            ...fieldsImageUpdate,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitUpdate = e => {
        e.preventDefault()
        // Validar que no hayan campos vacíos
        if (difficulty.trim() === '' ||
            points === 0 ||
            points === "" ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        
        funcionModificarDificultadYPuntos( id_image_selected, {difficulty, points} )
    }

    return (
        <div className="cards-images" >
            <div className="row">
                { cargandoImagenesUsuarioDesdeAdmin === false
                    ?
                        imagenes.length !== 0
                        ?
                            imagenes.map((imagen, index) =>

                                <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-4" >
                                    
                                    <div className="card text-white tarjeta" >
                                        <img className="card-img-top imagen-tarjeta" src={imagen.Imagen} alt="" />
                                        <div className="card-body text-center">
                                            <h5 className="card-title titulo-nombre-card-image"> Nombre </h5>
                                            <p className="card-text nombre-card-image"> {imagen.Nombre} </p>
                                            <h5 className="card-title titulo-fecha-card-image"> Subido el </h5>
                                            <p className="card-text fecha-card-image"> {imagen.Creadoel} </p>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                className="btnDeleteUserForm"
                                                disabled={cargandoEliminarImagenPorAdmin}
                                                onClick={() => funcionEliminar(imagen._id)}
                                            >
                                                {
                                                    cargandoEliminarImagenPorAdmin
                                                    ?
                                                    <Grid container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                    >
                                                        <Grid item xs={11} style={{color:"#000", fontSize:"0.9em"}}  >
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
                                                        "Eliminar"
                                                }
                                            </Button>
                                            {/* <a  className={imagen.Habilitada ?
                                                        "btn ml-2 btn-success"
                                                        : "btn ml-2 btn-success" }
                                                        onClick={() => funcionHabilitarInhabilitar(imagen._id)}
                                                        > {imagen.Habilitada ? "Inhabilitar" : "Habilitar"} </a> */}
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                className={imagen.Habilitada
                                                    ? "btnHabInUserForm btnInhabilitar"
                                                    : "btnHabInUserForm btnHabilitar"
                                                }
                                                disabled={cargandoHabilitarInhabilitarImagen}
                                                onClick={() => funcionHabilitarInhabilitar(imagen._id, !imagen.Habilitada)}
                                            >
                                                {
                                                    cargandoHabilitarInhabilitarImagen
                                                    ?
                                                    <Grid container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                    >
                                                        <Grid item xs={11} style={{color:"#000", fontSize:"0.9em"}}  >
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
                                                        imagen.Habilitada ? "Inhabilitar" : "Habilitar"
                                                }
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className="btnModifyUserForm"
                                                onClick={() => handleShow(imagen._id)}
                                            >
                                                {
                                                    "Modificar dificultad y puntos"
                                                }
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        :
                        <div className="text-center ml-auto mr-auto" >
                            No hay imágenes
                        </div>
                    :
                        <div className="text-center ml-auto mr-auto" >
                            <ClipLoader
                                color={"#000"}
                                loading={true}
                                size={30}
                            />
                        </div>
                }
            </div>             
            <>        
                <Modal
                    show={show}
                    size="xl"
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    style={{ backgroundColor: "black" }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="titleModal-modifyAttributesImage" > Modificar Dificultad y Puntos  </Modal.Title>
                    </Modal.Header>

                                    <form  onSubmit={onSubmitUpdate}  >
                    <Modal.Body>
                        <Container className="div-modifyAttributesImage" >
                            <Grid container component="main" className="justify-content-center" >
                                <Grid item xs={12} sm={12} md={12} elevation={6}>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                                    <Grid container spacing={5} >
                                        <Grid item xs={6} >
                                            <div className="div-image-modifyAttributesImage" >
                                                <img className="img-fluid img-thumbnail image-upload-modifyAttributesImage" src={pathImageUpdate} alt="" />
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <div className="div-filename-modifyAttributesImage" >                        
                                                <TextField
                                                    className="filenameModifyAttributesImage"
                                                    value={nameUpdate}
                                                    disabled
                                                    name="filename"
                                                    variant="filled"
                                                    id="filename"
                                                    label="Nombre imagen"
                                                    autoFocus
                                                />
                                            </div>

                                            <div className="div-difficulty-modifyAttributesImage" >                        
                                                <FormControl variant="outlined" >
                                                    <InputLabel id="demo-simple-select-outlined-label"> Dificultad </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        className="difficulty-modifyAttributesImage"
                                                        id="difficulty"
                                                        name="difficulty"
                                                        value={difficulty}
                                                        onChange={onChangeUpdate}
                                                        label="Dificultad"
                                                    >
                                                    <MenuItem value="Ninguna">
                                                        <em> Ninguna </em>
                                                    </MenuItem>
                                                    <MenuItem value={'Easy'}> Fácil </MenuItem>
                                                    <MenuItem value={'Medium'}> Medio </MenuItem>
                                                    <MenuItem value={'High'}> Alta </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <div className="div-points-modifyAttributesImage" >
                                                <TextField
                                                    className="points-modifyAttributesImage"
                                                    variant="outlined"
                                                    id="points"
                                                    label="Puntos"
                                                    name='points'
                                                    type='number'
                                                    value={points}
                                                    onChange={onChangeUpdate}
                                                />
                                            </div>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                        </Container>
                    </Modal.Body>

                    <Modal.Footer>
                        <ButtonBootstrap className="closeButtonModal-modifyAttributesImage" variant="secondary" onClick={handleClose}>
                            Cerrar
                        </ButtonBootstrap>
                        <Button
                            type="submit"
                            variant="contained"
                            className="submitButtonModal-modifyAttributesImage"
                            startIcon={<EditIcon />}
                            disabled={cargandoModificarDificultadPuntosImagenPorAdmin}
                        >
                            {
                                cargandoModificarDificultadPuntosImagenPorAdmin
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
                                "Modificar atributos"
                            }
                        </Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </>
        </div>
    );
}
 
export default UploadImagesUser;