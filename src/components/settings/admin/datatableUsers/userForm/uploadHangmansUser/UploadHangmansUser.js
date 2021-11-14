import React, { useState, useContext } from 'react';
import './uploadHangmansUser.css';

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


const UploadHangmansUser = ({ usuario,
    ahorcados,
    funcionHabilitarInhabilitar,
    funcionEliminar,
    funcionModificarDificultadYPuntos,
    cargandoHabilitarInhabilitarAhorcado,
    cargandoEliminarAhorcadoPorAdmin,
    cargandoAhorcadosUsuarioDesdeAdmin,
    cargandoModificarDificultadPuntosAhorcadoPorAdmin,
}) => {
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const [show, setShow] = useState(false);

    const handleClose = () => {
            setShow(false)
    };

    const handleShow = (hangman_id) => {
        const hangmanSelected = ahorcados.find(hangman => hangman._id === hangman_id);
        setFieldsHangmanUpdate({
            id_hangman_selected: hangman_id,
            associatedWord: hangmanSelected.Palabra,
            difficulty: hangmanSelected.Dificultad,
            points: hangmanSelected.Puntos,
        })
        setPathImagesUpdate(prevProps => [...prevProps, hangmanSelected.Imagen1]);
        setPathImagesUpdate(prevProps => [...prevProps, hangmanSelected.Imagen2]);
        setPathImagesUpdate(prevProps => [...prevProps, hangmanSelected.Imagen3]);
        setPathImagesUpdate(prevProps => [...prevProps, hangmanSelected.Imagen4]);
        setShow(true)
    };

    const [ fieldsHangmanUpdate, setFieldsHangmanUpdate ] = useState({
        id_hangman_selected: "",
        associatedWord: "",
        difficulty: "",
        points: 0,
    })
    const { id_hangman_selected, associatedWord, difficulty, points } = fieldsHangmanUpdate;
    const [ pathImagesUpdate, setPathImagesUpdate ] = useState([])

    const onChangeUpdate = e => {
        setFieldsHangmanUpdate({
            ...fieldsHangmanUpdate,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitUpdate = e => {
        e.preventDefault()
        // Validar que no hayan campos vacíos
        if (associatedWord.trim() === '' ||
            difficulty.trim() === '' ||
            points === 0 ||
            points === "" ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        
        funcionModificarDificultadYPuntos( id_hangman_selected, { associatedWord, difficulty, points } )
    }

    return (
        <div className="cards-hangmans" >
            <div className="row">
                { cargandoAhorcadosUsuarioDesdeAdmin === false
                    ?
                        ahorcados.length !== 0
                        ?
                            ahorcados.map((ahorcado, index) =>

                                <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-4" >
                                    
                                    <div className="card text-white tarjeta-hangman" >
                                        <div className="fila">
                                            <div className="columna">
                                                <img className="imagenes-tarjeta" src={ahorcado.Imagen1} alt="" />
                                            </div>
                                            <div className="columna">
                                                <img className="imagenes-tarjeta" src={ahorcado.Imagen2} alt="" />
                                            </div>
                                        </div>
                                        <div className="fila">
                                            <div className="columna">
                                                <img className="imagenes-tarjeta" src={ahorcado.Imagen3} alt="" />
                                            </div>
                                            <div className="columna">
                                                <img className="imagenes-tarjeta" src={ahorcado.Imagen4} alt="" />
                                            </div>
                                        </div>
                                        <div className="card-body text-center">
                                            <h5 className="card-title titulo-nombre-card-hangman"> Palabra </h5>
                                            <p className="card-text nombre-card-hangman"> {ahorcado.Palabra} </p>
                                            <h5 className="card-title titulo-fecha-card-hangman"> Subido el </h5>
                                            <p className="card-text fecha-card-hangman"> {ahorcado.Creadoel} </p>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                className="btnDeleteUserForm"
                                                disabled={cargandoEliminarAhorcadoPorAdmin}
                                                onClick={() => funcionEliminar(ahorcado._id)}
                                            >
                                                {
                                                    cargandoEliminarAhorcadoPorAdmin
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
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                className={ahorcado.Habilitada
                                                    ? "btnHabInUserForm btnInhabilitar"
                                                    : "btnHabInUserForm btnHabilitar"
                                                }
                                                disabled={cargandoHabilitarInhabilitarAhorcado}
                                                onClick={() => funcionHabilitarInhabilitar(ahorcado._id, !ahorcado.Habilitada)}
                                            >
                                                {
                                                    cargandoHabilitarInhabilitarAhorcado
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
                                                        ahorcado.Habilitada ? "Inhabilitar" : "Habilitar"
                                                }
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className="btnModifyUserForm"
                                                onClick={() => handleShow(ahorcado._id)}
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
                            No hay ahorcados
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
                        <Modal.Title className="titleModal-modifyAttributesHangman" > Modificar Dificultad y Puntos  </Modal.Title>
                    </Modal.Header>

                                    <form  onSubmit={onSubmitUpdate}  >
                    <Modal.Body>
                        <Container className="div-modifyAttributesHangman" >
                            <Grid container component="main" className="justify-content-center" >
                                <Grid item xs={12} sm={12} md={12} elevation={6}>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                                    <Grid container spacing={5} >
                                        <Grid item xs={6} >
                                            <div className="fila-update">
                                                <div className="columna-update">
                                                    <img className="imagenes-tarjeta-update" src={pathImagesUpdate[0]} alt="" />
                                                </div>
                                                <div className="columna-update">
                                                    <img className="imagenes-tarjeta-update" src={pathImagesUpdate[1]} alt="" />
                                                </div>
                                            </div>
                                            <div className="fila-update">
                                                <div className="columna-update">
                                                    <img className="imagenes-tarjeta-update" src={pathImagesUpdate[2]} alt="" />
                                                </div>
                                                <div className="columna-update">
                                                    <img className="imagenes-tarjeta-update" src={pathImagesUpdate[3]} alt="" />
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <div>
                                                <div className="div-filename-modifyAttributesHangman" >                        
                                                    <TextField
                                                        className="filenameModifyAttributesHangman"
                                                        value={associatedWord}
                                                        name="filename"
                                                        variant="outlined"
                                                        id="filename"
                                                        label="Palabra de asociación"
                                                        autoFocus
                                                    />
                                                </div>

                                                <div className="div-difficulty-modifyAttributesHangman" >                        
                                                    <FormControl variant="outlined" >
                                                        <InputLabel id="demo-simple-select-outlined-label"> Dificultad </InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            className="difficulty-modifyAttributesHangman"
                                                            id="difficulty"
                                                            name="difficulty"
                                                            value={difficulty}
                                                            onChange={onChangeUpdate}
                                                            label="Dificultad"
                                                        >
                                                        <MenuItem value="Ninguna">
                                                            <em>Ninguna</em>
                                                        </MenuItem>
                                                        <MenuItem value={'Easy'}> Fácil </MenuItem>
                                                        <MenuItem value={'Medium'}> Medio </MenuItem>
                                                        <MenuItem value={'High'}> Alta </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>

                                                <div className="div-points-modifyAttributesHangman" >
                                                    <TextField
                                                        className="points-modifyAttributesHangman"
                                                        variant="outlined"
                                                        id="points"
                                                        label="Puntos"
                                                        name='points'
                                                        type='number'
                                                        value={points}
                                                        onChange={onChangeUpdate}
                                                    />
                                                </div>

                                            </div>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                        </Container>
                    </Modal.Body>

                    <Modal.Footer>
                        <ButtonBootstrap className="closeButtonModal-modifyAttributesHangman" variant="secondary" onClick={handleClose}>
                            Cerrar
                        </ButtonBootstrap>
                        <Button
                            type="submit"
                            variant="contained"
                            className="submitButtonModal-modifyAttributesHangman"
                            startIcon={<EditIcon />}
                            disabled={cargandoModificarDificultadPuntosAhorcadoPorAdmin}
                        >
                            {
                                cargandoModificarDificultadPuntosAhorcadoPorAdmin
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
 
export default UploadHangmansUser;