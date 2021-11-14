import React, { useState, useContext } from 'react';
import './uploadUniqueSelectionsUser.css';

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


const UploadUniqueSelectionsUser = ({
    seleccionesUnicas,
    funcionHabilitarInhabilitar,
    funcionEliminar,
    funcionModificarDificultadYPuntos,
    cargandoHabilitarInhabilitarSeleccionUnica,
    cargandoEliminarSeleccionUnicaPorAdmin,
    cargandoSeleccionesUnicasUsuarioDesdeAdmin,
    cargandoModificarDificultadPuntosSeleccionUnicaPorAdmin,
}) => {
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const [show, setShow] = useState(false);

    const handleClose = () => {
            setShow(false)
    };

    const handleShow = (uniqueSelection_id) => {
        const uniqueSelectionSelected = seleccionesUnicas.find(uniqueSelection => uniqueSelection._id === uniqueSelection_id);
        setFieldsUniqueSelectionUpdate({
            id_uniqueSelection_selected: uniqueSelection_id,
            keyWord: uniqueSelectionSelected.Palabra,
            difficulty: uniqueSelectionSelected.Dificultad,
            points: uniqueSelectionSelected.Puntos,
        })
        setPathImagesUpdate(prevProps => [...prevProps, uniqueSelectionSelected.Imagen1]);
        setPathImagesUpdate(prevProps => [...prevProps, uniqueSelectionSelected.Imagen2]);
        setPathImagesUpdate(prevProps => [...prevProps, uniqueSelectionSelected.Imagen3]);
        setShow(true)
    };

    const [ fieldsUniqueSelectionUpdate, setFieldsUniqueSelectionUpdate ] = useState({
        id_uniqueSelection_selected: "",
        keyWord: "",
        difficulty: "",
        points: 0,
    })
    const { id_uniqueSelection_selected, keyWord, difficulty, points } = fieldsUniqueSelectionUpdate;
    const [ pathImagesUpdate, setPathImagesUpdate ] = useState([])

    const onChangeUpdate = e => {
        setFieldsUniqueSelectionUpdate({
            ...fieldsUniqueSelectionUpdate,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitUpdate = e => {
        e.preventDefault()
        if (keyWord.trim() === '' ||
            difficulty.trim() === '' ||
            points === 0 ||
            points === "" ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        
        funcionModificarDificultadYPuntos( id_uniqueSelection_selected, { keyWord, difficulty, points } )
    }

    return (
        <div className="cards-uniqueSelections" >
            <div className="row">
                { cargandoSeleccionesUnicasUsuarioDesdeAdmin === false
                    ?
                        seleccionesUnicas.length !== 0
                        ?
                            seleccionesUnicas.map((seleccionUnica, index) =>

                                <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-4" >
                                    
                                    <div className="card text-white tarjeta-uniqueSelection" >
                                        <div className="fila">
                                            <div className="columna">
                                                <img className="imagenes-tarjeta-uniqueSelections" src={seleccionUnica.Imagen1} alt="" />
                                            </div>
                                            <div className="columna">
                                                <img className="imagenes-tarjeta-uniqueSelections" src={seleccionUnica.Imagen2} alt="" />
                                            </div>
                                        </div>
                                        <div className="fila ml-2 mr-2">
                                                <img className="imagenes-tarjeta-uniqueSelections" src={seleccionUnica.Imagen3} alt="" />
                                        </div>
                                        <div className="card-body text-center">
                                            <h5 className="card-title titulo-nombre-card-uniqueSelection"> Palabra </h5>
                                            <p className="card-text nombre-card-uniqueSelection"> {seleccionUnica.Palabra} </p>
                                            <h5 className="card-title titulo-fecha-card-uniqueSelection"> Subido el </h5>
                                            <p className="card-text fecha-card-uniqueSelection"> {seleccionUnica.Creadoel} </p>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                className="btnDeleteUserForm"
                                                disabled={cargandoEliminarSeleccionUnicaPorAdmin}
                                                onClick={() => funcionEliminar(seleccionUnica._id)}
                                            >
                                                {
                                                    cargandoEliminarSeleccionUnicaPorAdmin
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
                                                className={seleccionUnica.Habilitada
                                                    ? "btnHabInUserForm btnInhabilitar"
                                                    : "btnHabInUserForm btnHabilitar"
                                                }
                                                disabled={cargandoHabilitarInhabilitarSeleccionUnica}
                                                onClick={() => funcionHabilitarInhabilitar(seleccionUnica._id, !seleccionUnica.Habilitada)}
                                            >
                                                {
                                                    cargandoHabilitarInhabilitarSeleccionUnica
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
                                                        seleccionUnica.Habilitada ? "Inhabilitar" : "Habilitar"
                                                }
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className="btnModifyUserForm"
                                                onClick={() => handleShow(seleccionUnica._id)}
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
                            No hay Selecciones Unicas
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
                                                    <img className="imagenes-tarjeta-uniqueSelections-update" src={pathImagesUpdate[0]} alt="" />
                                                </div>
                                                <div className="columna-update">
                                                    <img className="imagenes-tarjeta-uniqueSelections-update" src={pathImagesUpdate[1]} alt="" />
                                                </div>
                                            </div>
                                            <div className="fila-update ml-2 mr-2">
                                                <img className="imagenes-tarjeta-uniqueSelections-update" src={pathImagesUpdate[2]} alt="" />
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <div>
                                                
                                                <div className="div-filename-modifyAttributesHangman" >                        
                                                    <TextField
                                                        className="filenameModifyAttributesHangman"
                                                        value={keyWord}
                                                        name="keyWord"
                                                        variant="outlined"
                                                        id="keyWord"
                                                        label="Palabra clave"
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
                            disabled={cargandoModificarDificultadPuntosSeleccionUnicaPorAdmin}
                        >
                            {
                                cargandoModificarDificultadPuntosSeleccionUnicaPorAdmin
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
 
export default UploadUniqueSelectionsUser;