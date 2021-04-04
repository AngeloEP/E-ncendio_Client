import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import AlertaContext from '../../../../context/alertas/alertaContext';
import AuthContext from '../../../../context/autentificacion/authContext';
import ImageContext from '../../../../context/images/imageContext';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ClipLoader from "react-spinners/ClipLoader";

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ButtonBootstrap from 'react-bootstrap/Button'


import './datatableImages.css';

const DatatableImages = ({ images, deleteFunction, loadingDelete }) => {
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje, autenticado, cargandoRegistroUsuario, registrarUsuario } = authContext

    const imageContext = useContext(ImageContext)
    const { imagenes, cargandoModificarImagen, traerImagenesPorUsuario, modificarImagen } = imageContext

    useEffect(() => {
        // Ir a buscar las imágenes subidas por el usuario
        traerImagenesPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    }, [ mensaje, cargandoModificarImagen ] )
    
    const columns = images[0] && Object.keys(images[0])
    
    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = (image_id) => {
        const imageSelected = images.find(image => image._id === image_id);
        setFieldsImageUpdate({
            id_image_selected: image_id,
            difficultyUpdate: imageSelected.Dificultad,
            pointsUpdate: imageSelected.Puntos,
        })
        setPathImageUpdate(imageSelected.Imagen)
        setShow(true)
    };

    const [ fieldsImageUpdate, setFieldsImageUpdate ] = useState({
        id_image_selected: "",
        difficultyUpdate: "",
        pointsUpdate: 0,
    })

    const { id_image_selected, difficultyUpdate, pointsUpdate } = fieldsImageUpdate;
    const [ imageUpdate, setImageUpdate ] = useState(null)
    const [ pathImageUpdate, setPathImageUpdate ] = useState(null)

    const onChangeUpdate = e => {
        setFieldsImageUpdate({
            ...fieldsImageUpdate,
            [e.target.name]: e.target.value
        })
    }

    const onFileChangeUpdate = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const fileUpdate = e.target.files[0]
            if (fileUpdate.type.includes("image")) {
                const readerUpdate = new FileReader()
                readerUpdate.readAsDataURL(fileUpdate)

                readerUpdate.onload = function load() {
                    setPathImageUpdate(readerUpdate.result)
                }
                setImageUpdate(fileUpdate)
            } else {
                mostrarAlerta("Debe seleccionar un archivo de tipo imagen, se admiten extensiones: jpeg, jpg, png y gif", "alerta-error")
            }
        }
    }

    const onSubmitUpdate = e => {
        e.preventDefault()
        // Validar que no hayan campos vacíos
        if (difficultyUpdate.trim() === '' ||
            pointsUpdate === 0 ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        
        const formData = new FormData();
        formData.append('difficulty', difficultyUpdate);
        formData.append('points', pointsUpdate);
        formData.append('image', imageUpdate);
        modificarImagen( id_image_selected, formData )

        setTimeout(() => {
            handleClose()
        }, 2000);
    }

    return (
        <Fragment>
            <Table responsive striped bordered hover  >
            {
                images.length != 0
                ?
                    <Fragment>
                        <thead>
                            <tr>
                                <Fragment>
                                    { images[0] && columns.map((heading, headingIndex) =>
                                        <Fragment key={headingIndex} >
                                            { heading === "_id"
                                                ?
                                                    <th key={headingIndex+1} > # </th> 
                                                :
                                                    <th key={headingIndex+1} > {heading} </th> 
                                            }
                                        </Fragment>

                                    )}
                                    <th key="actions" > Acciones </th>
                                </Fragment>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                images.map((row, index) =>
                                    <tr key={index+1} >
                                        {
                                            columns.map((column, colIndex) =>
                                                
                                                <Fragment key={colIndex+1} >

                                                    { column === "Imagen"
                                                        ?
                                                            <td key={colIndex+1} style={{ width: "7%" }} > <img className="img-fluid img-thumbnail image-user" src={row[column]} alt="Image" /> </td>
                                                        :
                                                            column === "_id"
                                                            ?
                                                                <td key={colIndex+1} style={{ width: "5%" }} > {index+1} </td> 
                                                            :
                                                                <td key={colIndex+1} style={{ width: "5%" }} > {row[column]} </td> 
                                                    }
                                                </Fragment>
                                            )
                                        }
                                        <td key="buttonDelete" style={{ width: "1%" }} >
                                            <Button
                                                key={index+1}
                                                variant="contained"
                                                color="secondary"
                                                style={{ width: "90%" }}
                                                startIcon={<DeleteIcon />}
                                                onClick={() => deleteFunction(row["_id"])}
                                            >
                                                {
                                                    loadingDelete
                                                    ?
                                                    <Grid container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                    >
                                                        <Grid item xs={11}  >
                                                            Cargando...
                                                        </Grid>
                                                        <Grid item xs={1} >
                                                        <ClipLoader
                                                            color={"#fff"}
                                                            loading={true}
                                                            size={20}
                                                        />
                                                        </Grid>
                                                    </Grid>
                                                        
                                                    :
                                                    "ELIMINAR"
                                                }
                                            </Button>
                                            <Button
                                                key={index+2}
                                                variant="contained"
                                                style={{ backgroundColor: "yellow", marginTop: "5%", height: "10%", width: "90%" }}
                                                startIcon={<EditIcon />}
                                                onClick={() => handleShow(row["_id"])}
                                            >
                                                ACTUALIZAR
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Fragment>
                :
                    <Fragment>
                        <thead>
                            <tr>
                                <th> Sin datos </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Aún no ha subido imágenes </td>
                            </tr>
                        </tbody>
                    </Fragment>
            }
            </Table>
            <>        
                <Modal
                    show={show}
                    size="xl"
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title> Modificar Imagen  </Modal.Title>
                    </Modal.Header>

                                    <form  onSubmit={onSubmitUpdate}  >
                    <Modal.Body>
                        <Container className="div-uploadImage-update" >
                            <Grid container component="main" >
                                <Grid item xs={12} sm={8} md={12} elevation={6}>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                                    <Grid container spacing={5} >

                                        <Grid item xs={4} >
                                            <div className="div-image-update" >
                                                <input
                                                    accept="image/*"
                                                    id="imageUpdate"
                                                    type="file"
                                                    onChange={onFileChangeUpdate}
                                                    style={{ display: "none" }}
                                                    />
                                                <img className="img-fluid img-thumbnail image-upload-update" src={pathImageUpdate} alt="Image" />
                                                <label htmlFor="imageUpdate" className="label-upload-image-update" >
                                                    <Button  variant="contained" style={{ backgroundColor: "greenyellow" }}  component="span">
                                                        Agregar imagen
                                                    </Button>
                                                </label>
                                            </div>
                                        </Grid>
                                        <Grid item xs={8} >
                                            <div className="div-filename-update" >                        
                                                <TextField
                                                    style={{ width: "60%" }}
                                                    value={ imageUpdate ? imageUpdate.name.split(".")[0] : "" }
                                                    disabled
                                                    name="filename"
                                                    variant="filled"
                                                    id="filename"
                                                    label="Nombre de la imagen"
                                                    autoFocus
                                                    onChange={onChangeUpdate}
                                                />
                                            </div>

                                            <div className="div-difficulty-update" >                        
                                                <FormControl variant="outlined" >
                                                    <InputLabel id="demo-simple-select-outlined-label"> Dificultad </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        style={{ width: "15em" }}
                                                        id="difficultyUpdate"
                                                        name="difficultyUpdate"
                                                        value={difficultyUpdate}
                                                        onChange={onChangeUpdate}
                                                        label="Dificultad"
                                                    >
                                                    <MenuItem value="">
                                                        <em> Ninguna </em>
                                                    </MenuItem>
                                                    <MenuItem value={'Easy'}> Fácil </MenuItem>
                                                    <MenuItem value={'Medium'}> Medio </MenuItem>
                                                    <MenuItem value={'High'}> Alta </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <div className="div-points-update" >
                                                <TextField
                                                    style={{ width: "60%" }}
                                                    variant="outlined"
                                                    id="pointsUpdate"
                                                    label="Ingrese una cantidad de puntos asociada a esta imagen"
                                                    name='pointsUpdate'
                                                    type='number'
                                                    value={pointsUpdate}
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
                        <ButtonBootstrap variant="secondary" onClick={handleClose}>
                            Cerrar
                        </ButtonBootstrap>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: "yellow", height: "10%", width: "25%", marginLeft: "2%" }}
                            startIcon={<EditIcon />}
                            // onClick={() => handleClose()}
                        >
                            {
                                cargandoModificarImagen
                                ?
                                <Grid container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Grid item xs={10}  >
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
                                "Modificar la Imagen"
                            }
                        </Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </>
        </Fragment>
    );
}
 
export default DatatableImages;