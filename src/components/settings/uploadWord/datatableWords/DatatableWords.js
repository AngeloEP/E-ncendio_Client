import React, { Fragment, useState, useEffect, useContext } from 'react';
import AlertaContext from '../../../../context/alertas/alertaContext';
import AuthContext from '../../../../context/autentificacion/authContext';
import WordContext from '../../../../context/words/wordContext';

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
import { Col} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';

import ClipLoader from "react-spinners/ClipLoader";

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button'


import './datatableWords.css';

const DatatableWords = ({ words, deleteFunction, loadingDelete }) => {
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje, autenticado, cargandoRegistroUsuario, registrarUsuario } = authContext

    const wordContext = useContext(WordContext)
    const { palabras, cargandoModificarPalabra, traerPalabrasPorUsuario, modificarPalabra } = wordContext

    useEffect(() => {
        // Ir a buscar las imágenes subidas por el usuario
        traerPalabrasPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    }, [ mensaje, cargandoModificarPalabra ] )
    
    const columns = words[0] && Object.keys(words[0])
    
    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = (word_id) => {
        const wordSelected = words.find(word => word._id === word_id);
        setFieldsWordUpdate({
            id_word_selected: word_id,
            nameUpdate: wordSelected.Palabra,
            difficultyUpdate: wordSelected.Dificultad,
            pointsUpdate: wordSelected.Puntos,
        })
        setShow(true)
    };

    const [ fieldsWordUpdate, setFieldsWordUpdate ] = useState({
        id_word_selected: "",
        nameUpdate: "",
        difficultyUpdate: "",
        pointsUpdate: 0,
    })

    const { id_word_selected, nameUpdate, difficultyUpdate, pointsUpdate } = fieldsWordUpdate;

    const onChangeUpdate = e => {
        setFieldsWordUpdate({
            ...fieldsWordUpdate,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitUpdate = e => {
        e.preventDefault()
        // Validar que no hayan campos vacíos
        if (nameUpdate.trim() === '' ||
            difficultyUpdate.trim() === '' ||
            pointsUpdate === 0 ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        let name = nameUpdate;
        let difficulty = difficultyUpdate;
        let points = pointsUpdate;
        modificarPalabra( id_word_selected, {name, difficulty, points} )

        setTimeout(() => {
            handleClose()
        }, 2000);
    }

    return (
        <Fragment>
            <Table responsive striped bordered hover  >
            {
                words.length != 0
                ?
                    <Fragment>
                        <thead>
                            <tr>
                                <Fragment>
                                    { words[0] && columns.map((heading, headingIndex) =>
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
                                words.map((row, index) =>
                                    <tr key={index+1} >
                                        {
                                            columns.map((column, colIndex) =>
                                                
                                                <Fragment key={colIndex+1} >

                                                    { column === "Palabra"
                                                        ?
                                                            <td key={colIndex+1} style={{ width: "7%" }} >
                                                                <div class="col palabra-update" >
                                                                    <Col>
                                                                        <Paper className="paper-update" elevation={10} variant="outlined"  >
                                                                            {row[column]}
                                                                        </Paper>
                                                                    </Col>
                                                                </div>
                                                            </td>
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
                                <td> Aún no ha subido palabras </td>
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
                                            <div class="col palabra" >
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
                                                    name="nameUpdate"
                                                    variant="outlined"
                                                    id="nameUpdate"
                                                    label="Nombre de la palabra"
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
                                                    label="Ingrese una cantidad de puntos asociada a esta palabra"
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
                            disabled={cargandoModificarPalabra}
                        >
                            {
                                cargandoModificarPalabra
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
        </Fragment>
    );
}
 
export default DatatableWords;