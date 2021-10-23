import React, { useState, useContext } from 'react';
import './uploadWordsUser.css';

import AlertaContext from '../../../../../../context/alertas/alertaContext';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EditIcon from '@material-ui/icons/Edit';

import ClipLoader from "react-spinners/ClipLoader";

import { Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button';

const UploadWordsUser = ({ usuario,
    palabras,
    funcionHabilitarInhabilitar,
    cargandoHabilitarInhabilitarPalabra,
    funcionEliminar,
    cargandoEliminarPalabraPorAdmin,
    cargandoPalabrasUsuarioDesdeAdmin,
    funcionModificarDificultadYPuntos,
    cargandoModificarDificultadPuntosPalabraPorAdmin,
}) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = (word_id) => {
        const wordSelected = palabras.find(word => word._id === word_id);
        setFieldsWordUpdate({
            id_word_selected: word_id,
            nameUpdate: wordSelected.Palabra,
            difficulty: wordSelected.Dificultad,
            points: wordSelected.Puntos,
        })
        setShow(true)
    };

    const [ fieldsWordUpdate, setFieldsWordUpdate ] = useState({
        id_word_selected: "",
        nameUpdate: "",
        difficulty: "",
        points: 0,
    })
    const { id_word_selected, nameUpdate, difficulty, points } = fieldsWordUpdate;

    const onChangeUpdate = e => {
        setFieldsWordUpdate({
            ...fieldsWordUpdate,
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
        
        funcionModificarDificultadYPuntos( id_word_selected, {difficulty, points} )
    }

    return (
        <div className="cards-words" >
            <div className="row">
                { cargandoPalabrasUsuarioDesdeAdmin === false
                    ?
                        palabras.length !== 0
                        ?
                            palabras.map((palabra, index) =>

                                <div key={index} className="col-sm-3 col-md-4" >
                                    
                                    <div className="card text-white tarjeta-words" >
                                        <Paper className="card-img-top palabra-tarjeta" elevation={10} variant="outlined"  >
                                            {palabra.Palabra}
                                        </Paper>
                                        <div className="card-body text-center">
                                            <h5 className="card-title titulo-nombre-card-word"> Nombre </h5>
                                            <p className="card-text nombre-card-word"> {palabra.Palabra} </p>
                                            <h5 className="card-title titulo-fecha-card-word"> Subido el </h5>
                                            <p className="card-text fecha-card-word"> {palabra.Creadoel} </p>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                style={{height: "15%", width: "45%", marginLeft: "2%" }}
                                                disabled={cargandoEliminarPalabraPorAdmin}
                                                onClick={() => funcionEliminar(palabra._id)}
                                            >
                                                {
                                                    cargandoEliminarPalabraPorAdmin
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
                                                style={palabra.Habilitada ?
                                                        { backgroundColor: "#ffc107",
                                                        borderColor: "#ffc107", height: "15%", width: "45%", marginLeft: "2%" }
                                                        :
                                                        { color: "#fff", backgroundColor: "#28a745", borderColor: "#28a745",
                                                            height: "15%", width: "45%", marginLeft: "2%" }
                                                    }
                                                disabled={cargandoHabilitarInhabilitarPalabra}
                                                onClick={() => funcionHabilitarInhabilitar(palabra._id, !palabra.Habilitada)}
                                            >
                                                {
                                                    cargandoHabilitarInhabilitarPalabra
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
                                                        palabra.Habilitada ? "Inhabilitar" : "Habilitar"
                                                }
                                            </Button>
                                            <Button
                                                className="mt-2"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                style={{ backgroundColor: "#1976d2", color: "#fff", height: "15%", width: "100%" }}
                                                onClick={() => handleShow(palabra._id)}
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
                            No hay palabras
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
                        <Modal.Title> Modificar Palabra  </Modal.Title>
                    </Modal.Header>

                                    <form  onSubmit={onSubmitUpdate}  >
                    <Modal.Body>
                        <Container className="div-uploadWord-update" >
                            <Grid container component="main" >
                                <Grid item xs={12} sm={8} md={12} elevation={6}>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                                    <Grid container spacing={5} >

                                        <Grid item xs={4} >
                                            <div className="col palabra" >
                                                <Col>
                                                    <Paper className="paper" elevation={10} variant="outlined"  >
                                                        {nameUpdate}
                                                    </Paper>
                                                </Col>
                                            </div>
                                        </Grid>
                                        <Grid item xs={8} >
                                            <div className="div-name-update" >                        
                                                <TextField
                                                    style={{ width: "60%" }}
                                                    value={nameUpdate}
                                                    disabled
                                                    name="nameUpdate"
                                                    variant="filled"
                                                    id="nameUpdate"
                                                    label="Nombre de la palabra"
                                                />
                                            </div>

                                            <div className="div-difficulty-update" >                        
                                                <FormControl variant="outlined" >
                                                    <InputLabel id="demo-simple-select-outlined-label"> Dificultad </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        style={{ width: "15em" }}
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

                                            <div className="div-points-update" >
                                                <TextField
                                                    style={{ width: "60%" }}
                                                    variant="outlined"
                                                    id="points"
                                                    label="Ingrese una cantidad de puntos asociada a esta palabra"
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
                        <ButtonBootstrap variant="secondary" onClick={handleClose}>
                            Cerrar
                        </ButtonBootstrap>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: "yellow", height: "10%", width: "25%", marginLeft: "2%" }}
                            startIcon={<EditIcon />}
                            disabled={cargandoModificarDificultadPuntosPalabraPorAdmin}
                        >
                            {
                                cargandoModificarDificultadPuntosPalabraPorAdmin
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
                                "Modificar la Palabra"
                            }
                        </Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </>
        </div>
    );
}
 
export default UploadWordsUser;