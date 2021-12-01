import React, { Fragment, useState, useEffect, useContext } from 'react';
import AlertaContext from '../../../../context/alertas/alertaContext';
import AuthContext from '../../../../context/autentificacion/authContext';
import UniqueSelectionContext from '../../../../context/uniqueSelection/uniqueSelectionContext';

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


import './datatableUniqueSelection.css';

const DatatableUniqueSelection = ({ uniqueSelections, deleteFunction, loadingDelete }) => {
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    const uniqueSelectionContext = useContext(UniqueSelectionContext)
    const {
        cargandoModificarSeleccionUnica,
        traerSeleccionesUnicasPorUsuario,
        modificarSeleccionUnica,
    } = uniqueSelectionContext

    useEffect(() => {
        traerSeleccionesUnicasPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [ mensaje, cargandoModificarSeleccionUnica ] )
    
    const columns = uniqueSelections[0] && Object.keys(uniqueSelections[0])
    
    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        setShow(false)
        setPathImagesUpdate([])
        setSelectedFilesUpdate([])
    };

    const handleShow = (uniqueSelection_id) => {
        const uniqueSelectionSelected = uniqueSelections.find(uniqueSelection => uniqueSelection._id === uniqueSelection_id);
        setFieldsUniqueSelectionUpdate({
            id_uniqueSelection_selected: uniqueSelection_id,
            keyWordUpdate: uniqueSelectionSelected.Palabra,
        })
        setShow(true)
    };

    const [ fieldsUniqueSelectionUpdate, setFieldsUniqueSelectionUpdate ] = useState({
        id_uniqueSelection_selected: "",
        keyWordUpdate: "",
    })
    const { id_uniqueSelection_selected, keyWordUpdate } = fieldsUniqueSelectionUpdate;
    // const [ imageUpdate, setImageUpdate ] = useState(null)
    // const [ pathImageUpdate, setPathImageUpdate ] = useState(null)

    // const [ keyWordUpdate, setAssociateWordUpdate ] = useState("")
    const [ pathImagesUpdate, setPathImagesUpdate ] = useState([])
    const [ selectedFilesUpdate, setSelectedFilesUpdate ] = useState([]);
      
    const handleImageChange = (e) => {
		if (e.target.files) {
            for (let file of e.target.files) {
                setSelectedFilesUpdate((prevImages) => prevImages.concat(file));
            }
            Array.from(e.target.files).map((file) => {
                if (file.type.includes("image")) {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    
                    reader.onload = function load() {
                        setPathImagesUpdate((prevImages) => prevImages.concat(reader.result))
                    }
                } else {
                    mostrarAlerta("Debe seleccionar archivos de tipo imagen, se admiten extensiones: jpeg, jpg, png y gif", "alerta-error")
                }
                return console.log("b")
            });
            
		}
	};

    const resetImagesSelected = () => {
        setPathImagesUpdate([])
        setSelectedFilesUpdate([])
        document.getElementById("fileUpdateUniqueSelection").value = "";
    }

    const renderPhotos = (source) => {
        return source.map((photo) => {
			return <img className="imagesSelectedModifyUniqueSelection" src={photo} alt="" key={photo} />;
		});
	};

    const onSubmitUpdate = e => {
        e.preventDefault()
        if ( keyWordUpdate === "" ) {
            mostrarAlerta("Debe asignar una palabra clave para el juego", 'alerta-error')
            return
        }
        if (/\s/.test(keyWordUpdate)) {
            mostrarAlerta("Debe asignar UNA sola palabra SIN espacios ", 'alerta-error')
            return
        }
        let formData = new FormData();

        if (selectedFilesUpdate.length === 0) {
            console.log("No adjunto ninguna imagen")
        } else{
            if (selectedFilesUpdate.length !== 3) {
                mostrarAlerta("Debe adjuntar solo 3 imágenes", 'alerta-error')
                return
            } else {
                for (let index = 0; index < selectedFilesUpdate.length; index++) {
                    formData.append('images', selectedFilesUpdate[index]);
                }
            }

        }

        formData.append('keyWord', keyWordUpdate);
        modificarSeleccionUnica( id_uniqueSelection_selected, formData)
        
        setTimeout(() => {
            handleClose()
        }, 2000);

        setFieldsUniqueSelectionUpdate({
            id_uniqueSelection_selected: "",
            keyWordUpdate: "",
        });
        setSelectedFilesUpdate([]);
        setPathImagesUpdate([]);
        document.getElementById("fileUpdateUniqueSelection").value = "";
    }

    return (
        <Fragment>
            <Table responsive striped bordered hover  >
            {
                uniqueSelections.length !== 0
                ?
                    <Fragment>
                        <thead>
                            <tr>
                                <Fragment>
                                    { uniqueSelections[0] && columns.map((heading, headingIndex) =>
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
                                uniqueSelections.map((row, index) =>
                                    <tr key={index+1} >
                                        {
                                            columns.map((column, colIndex) =>
                                                
                                                <Fragment key={colIndex+1} >

                                                    { column === "Imagen1" | column === "Imagen2" | column === "Imagen3" 
                                                        ?
                                                            <td style={{ width: "7%" }} > <img className="img-fluid img-thumbnail images-uniqueSelection" src={row[column]} alt="" /> </td>
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
                                        <td key="buttonDelete" style={{ width: "100% !important", fontSize: "13px" }} >
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
                                                        <Grid item xs={11} style={{color:"#000", fontSize: "13px"}} >
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
                                                style={{ backgroundColor: "yellow", marginTop: "5%", height: "10%", width: "90%", fontSize: "13px" }}
                                                startIcon={<EditIcon />}
                                                onClick={() => handleShow(row["_id"])}
                                            >
                                                ACTUALIZAR S. Única
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
                                <td> Aún no ha subido contenido para este juego </td>
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
                        <Modal.Title className="titleModal-uploadUniqueSelection" > Modificar Selección Única  </Modal.Title>
                    </Modal.Header>
                        <form  onSubmit={onSubmitUpdate}  >
                    <Modal.Body>
                        <Container className="div-uploadUniqueSelection-update" >
                            <Grid  component="main" className="justify-content-center" >
                                <Grid item elevation={6}>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                                    <Grid   >

                                        <Grid item xs={12} >
                                            <div className="buttonsModifyUniqueSelection" >
                                                <input type="file" id="fileUpdateUniqueSelection" multiple onChange={handleImageChange} />
                                                <div className="label-holderDatatableModifyUniqueSelection">
                                                    <div className="row" >
                                                        <label htmlFor="fileUpdateUniqueSelection" className="labelDatatableModifyUniqueSelection">
                                                            <i className="material-icons" >Agregar 3 imágenes</i>
                                                        </label>
                                                        <Button
                                                            className="buttonResetImagesModifyUniqueSelection"
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={() => resetImagesSelected()}
                                                        > Reiniciar selección </Button>
                                                    </div>
                                                </div>
                                                <div className="result">{renderPhotos(pathImagesUpdate)}</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} style={{ marginBottom: "2%" }} >
                                            <div className="div-keyWord" >                        
                                                <TextField
                                                    className="textfield-keyWord"
                                                    value={keyWordUpdate}
                                                    name="keyWord"
                                                    variant="outlined"
                                                    id="keyWord"
                                                    label="Palabra clave"
                                                    onChange={e => setFieldsUniqueSelectionUpdate({...fieldsUniqueSelectionUpdate, keyWordUpdate: e.target.value})}
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
                        <ButtonBootstrap className="closeButtonModal-uploadUniqueSelection" variant="secondary" onClick={handleClose}>
                            Cerrar
                        </ButtonBootstrap>
                        <Button
                            type="submit"
                            variant="contained"
                            className="submitButtonModal-uploadUniqueSelection"
                            startIcon={<EditIcon />}
                            disabled={cargandoModificarSeleccionUnica}
                        >
                            {
                                cargandoModificarSeleccionUnica
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
                                "Modificar contenido"
                            }
                        </Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </>
        </Fragment>
    );
}
 
export default DatatableUniqueSelection;