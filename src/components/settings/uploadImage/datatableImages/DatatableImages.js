import React, { Fragment, useState, useEffect, useContext } from 'react';
import AlertaContext from '../../../../context/alertas/alertaContext';
import AuthContext from '../../../../context/autentificacion/authContext';
import ImageContext from '../../../../context/images/imageContext';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import ClipLoader from "react-spinners/ClipLoader";

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button';


import './datatableImages.css';

const DatatableImages = ({ images, deleteFunction, loadingDelete }) => {
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    const imageContext = useContext(ImageContext)
    const { cargandoModificarImagen, traerImagenesPorUsuario, modificarImagen } = imageContext

    useEffect(() => {
        // Ir a buscar las imágenes subidas por el usuario
        traerImagenesPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [ mensaje, cargandoModificarImagen ] )
    
    const columns = images[0] && Object.keys(images[0])
    
    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        setShow(false)
        setImageUpdate(null)
    };

    const handleShow = (image_id) => {
        const imageSelected = images.find(image => image._id === image_id);
        setFieldsImageUpdate({
            id_image_selected: image_id,
            nameUpdate: imageSelected.Nombre,
        })
        setPathImageUpdate(imageSelected.Imagen)
        setShow(true)
    };

    const [ fieldsImageUpdate, setFieldsImageUpdate ] = useState({
        id_image_selected: "",
        nameUpdate: "",
    })
    const { id_image_selected, nameUpdate } = fieldsImageUpdate;
    const [ imageUpdate, setImageUpdate ] = useState(null)
    const [ pathImageUpdate, setPathImageUpdate ] = useState(null)
      
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
        if (imageUpdate === null) {
            mostrarAlerta("Debe adjuntar una imagen diferente", 'alerta-error')
            return
        }
        
        const formData = new FormData();
        formData.append('image', imageUpdate);
        modificarImagen( id_image_selected, formData )

        setTimeout(() => {
            handleClose()
        }, 2000);
        setImageUpdate(null)
        document.getElementById("imageUpdate").value = "";
    }

    return (
        <Fragment>
            <Table responsive striped bordered hover className="tableImagesContent"  >
            {
                images.length !== 0
                ?
                    <Fragment>
                        <thead>
                            <tr>
                                <Fragment>
                                    { images[0] && columns.map((heading, headingIndex) =>
                                        <Fragment key={headingIndex} >
                                            { heading === "_id"
                                                ?
                                                    <th > # </th> 
                                                :
                                                    <th > {heading} </th> 
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
                                                            <td style={{ width: "7%" }} > <img className="img-fluid img-thumbnail image-user" src={row[column]} alt="" /> </td>
                                                        :
                                                            column === "Estado"
                                                            ?
                                                                row[column] === true
                                                                ?
                                                                    <td style={{ width: "2%" }} >
                                                                        <div className="alert alert-success" role="alert" >
                                                                            <strong> Habilitada </strong>
                                                                        </div>
                                                                    </td> 
                                                                :
                                                                    <td style={{ width: "2%" }} >
                                                                        <div className="alert alert-warning" role="alert" >
                                                                            <strong> Inhabilitada </strong>
                                                                        </div>
                                                                    </td> 
                                                            :
                                                                column === "_id"
                                                                ?
                                                                    <td style={{ width: "5%" }} > {index+1} </td> 
                                                                :
                                                                    <td style={{ width: "5%" }} > {row[column]} </td> 
                                                    }
                                                </Fragment>
                                            )
                                        }
                                        <td key="buttonDelete" style={{ width: "10%" }} >
                                            <Button
                                                key={index+1}
                                                variant="contained"
                                                color="secondary"
                                                style={{ width: "90%" }}
                                                startIcon={<DeleteIcon />}
                                                onClick={() => deleteFunction(row["_id"])}
                                                disabled={loadingDelete}
                                            >
                                                {
                                                    loadingDelete
                                                    ?
                                                    <Grid container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                    >
                                                        <Grid item xs={11} style={{color:"#000"}} >
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
                                                ACTUALIZAR IMAGEN
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
                        <Modal.Title className="titleModal-uploadImage" > Modificar Imagen  </Modal.Title>
                    </Modal.Header>

                                    <form  onSubmit={onSubmitUpdate}  >
                    <Modal.Body>
                        <Container className="div-uploadImage-update" >
                            <Grid container component="main" className="justify-content-center" >
                                <Grid item xs={12} sm={12} md={12} elevation={6}>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                                    <Grid container xs={12} spacing={0} >

                                        <Grid item xs={6} >
                                            <div className="div-image-update" >
                                                <input
                                                    accept="image/*"
                                                    id="imageUpdate"
                                                    type="file"
                                                    onChange={onFileChangeUpdate}
                                                    style={{ display: "none" }}
                                                    />
                                                <img className="img-fluid img-thumbnail image-upload-update" src={pathImageUpdate} alt="" />
                                                <label htmlFor="imageUpdate" className="label-upload-image-update" >
                                                    <Button  variant="contained" style={{ backgroundColor: "greenyellow" }}  component="span">
                                                        Agregar imagen
                                                    </Button>
                                                </label>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <div className="div-filename-update" >                        
                                                <TextField
                                                    className="filenameImageUpdate"
                                                    value={ imageUpdate ? imageUpdate.name.split(".")[0] : nameUpdate }
                                                    disabled
                                                    name="filename"
                                                    variant="filled"
                                                    id="filename"
                                                    label="Nombre de la imagen"
                                                    autoFocus
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                        </Container>
                    </Modal.Body>

                    <Modal.Footer>
                        <ButtonBootstrap className="closeButtonModal-uploadImage" variant="secondary" onClick={handleClose}>
                            Cerrar
                        </ButtonBootstrap>
                        <Button
                            type="submit"
                            variant="contained"
                            className="submitButtonModal-uploadImage"
                            startIcon={<EditIcon />}
                            disabled={cargandoModificarImagen}
                        >
                            {
                                cargandoModificarImagen
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