import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import AlertaContext from '../../../../context/alertas/alertaContext';
import AuthContext from '../../../../context/autentificacion/authContext';
import FourImagesOneWordContext from '../../../../context/fourImagesOneWord/fourImagesOneWordContext';

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


import './datatableFourImagesOneWord.css';

const DatatableFourImagesOneWord = ({ hangmans, deleteFunction, loadingDelete }) => {
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    const fourImagesOneWordContext = useContext(FourImagesOneWordContext)
    const { cargandoModificarAhorcado, traerAhorcadosPorUsuario, modificarAhorcado } = fourImagesOneWordContext

    useEffect(() => {
        // Ir a buscar las imágenes subidas por el usuario
        traerAhorcadosPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    }, [ mensaje, cargandoModificarAhorcado ] )
    
    const columns = hangmans[0] && Object.keys(hangmans[0])
    
    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        setShow(false)
        setPathImagesUpdate([])
        setSelectedFilesUpdate([])
    };

    const handleShow = (hangman_id) => {
        const hangmanSelected = hangmans.find(hangman => hangman._id === hangman_id);
        setFieldsHangmanUpdate({
            id_hangman_selected: hangman_id,
            associatedWordUpdate: hangmanSelected.Palabra,
        })
        // setPathImagesUpdate(prevProps => [...prevProps, hangmanSelected.Imagen1]);
        // setPathImagesUpdate(prevProps => [...prevProps, hangmanSelected.Imagen2]);
        // setPathImagesUpdate(prevProps => [...prevProps, hangmanSelected.Imagen3]);
        // setPathImagesUpdate(prevProps => [...prevProps, hangmanSelected.Imagen4]);
        setShow(true)
    };

    const [ fieldsHangmanUpdate, setFieldsHangmanUpdate ] = useState({
        id_hangman_selected: "",
        associatedWordUpdate: "",
    })
    const { id_hangman_selected, associatedWordUpdate } = fieldsHangmanUpdate;
    // const [ imageUpdate, setImageUpdate ] = useState(null)
    // const [ pathImageUpdate, setPathImageUpdate ] = useState(null)

    // const [ associatedWordUpdate, setAssociateWordUpdate ] = useState("")
    const [ pathImagesUpdate, setPathImagesUpdate ] = useState([])
    const [ selectedFilesUpdate, setSelectedFilesUpdate ] = useState([]);
      
    const handleImageChange = (e) => {
		if (e.target.files) {
			setSelectedFilesUpdate((prevImages) => prevImages.concat(e.target.files));
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
            });
            
		}
	};

    const resetImagesSelected = () => {
        setPathImagesUpdate([])
        setSelectedFilesUpdate([])
        document.getElementById("fileUpdate").value = "";
    }

    const renderPhotos = (source) => {
        return source.map((photo) => {
			return <img className="imagesSelected" src={photo} alt="" key={photo} />;
		});
	};

    const onSubmitUpdate = e => {
        e.preventDefault()
        if ( associatedWordUpdate === "" ) {
            mostrarAlerta("Debe asignar una palabra a las 4 imágenes", 'alerta-error')
            return
        }
        let formData = new FormData();

        if (selectedFilesUpdate.length === 0) {
            // console.log("No adjunto ninguna imagen")
        } else{
            if (selectedFilesUpdate[0].length != 4) {
                mostrarAlerta("Debe adjuntar solo 4 imágenes", 'alerta-error')
                return
            } else {
                for (let index = 0; index < selectedFilesUpdate[0].length; index++) {
                    formData.append('images', selectedFilesUpdate[0][index]);
                }
            }

        }

        formData.append('associatedWord', associatedWordUpdate);
        modificarAhorcado( id_hangman_selected, formData)
        
        setTimeout(() => {
            handleClose()
        }, 2000);

        // Resetear campos
        setFieldsHangmanUpdate({
            id_hangman_selected: "",
            associatedWordUpdate: "",
        });
        setSelectedFilesUpdate([]);
        setPathImagesUpdate([]);
        document.getElementById("fileUpdate").value = "";
    }

    return (
        <Fragment>
            <Table responsive striped bordered hover  >
            {
                hangmans.length != 0
                ?
                    <Fragment>
                        <thead>
                            <tr>
                                <Fragment>
                                    { hangmans[0] && columns.map((heading, headingIndex) =>
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
                                hangmans.map((row, index) =>
                                    <tr key={index+1} >
                                        {
                                            columns.map((column, colIndex) =>
                                                
                                                <Fragment key={colIndex+1} >

                                                    { column === "Imagen1" | column === "Imagen2" | column === "Imagen3" | column === "Imagen4"
                                                        ?
                                                            <td style={{ width: "7%" }} > <img className="img-fluid img-thumbnail images-hangman" src={row[column]} alt="Image" /> </td>
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
                                                ACTUALIZAR AHORCADO
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
                        <Modal.Title> Modificar Ahorcado  </Modal.Title>
                    </Modal.Header>

                                    <form  onSubmit={onSubmitUpdate}  >
                    <Modal.Body>
                        <Container className="div-uploadHangman-update" >
                            <Grid container component="main" >
                                <Grid item xs={12} sm={8} md={12} elevation={6}>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                                    <Grid container spacing={5} >

                                        <Grid item xs={12} >
                                            <div>
                                                <input type="file" id="fileUpdate" multiple onChange={handleImageChange} />
                                                <div className="label-holder">
                                                    <div className="row" >
                                                        <label htmlFor="fileUpdate" className="label">
                                                            <i className="material-icons" >Agregar 4 imágenes</i>
                                                        </label>
                                                        <Button
                                                            className="buttonResetImages"
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={() => resetImagesSelected()}
                                                        > Reiniciar selección </Button>
                                                    </div>
                                                </div>
                                                <div className="result">{renderPhotos(pathImagesUpdate)}</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={8} style={{ marginBottom: "2%" }} >
                                            <div className="div-associateWord" >                        
                                                <TextField
                                                    className="textfield-associateWord"
                                                    value={associatedWordUpdate}
                                                    name="associateWord"
                                                    variant="outlined"
                                                    id="associateWord"
                                                    label="Palabra asociada"
                                                    onChange={e => setFieldsHangmanUpdate({...fieldsHangmanUpdate, associatedWordUpdate: e.target.value})}
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
                        <ButtonBootstrap variant="secondary" onClick={handleClose}>
                            Cerrar
                        </ButtonBootstrap>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: "yellow", height: "10%", width: "25%", marginLeft: "2%" }}
                            startIcon={<EditIcon />}
                            disabled={cargandoModificarAhorcado}
                        >
                            {
                                cargandoModificarAhorcado
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
 
export default DatatableFourImagesOneWord;