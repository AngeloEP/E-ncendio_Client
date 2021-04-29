import React, { useState, useEffect, useContext, Fragment } from 'react';
import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import WordContext from '../../../context/words/wordContext';

import './uploadWord.css';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Col} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';

import ClipLoader from "react-spinners/ClipLoader";

import DatatableWords from './datatableWords/DatatableWords';

const UploadWord = () => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje, autenticado, cargandoRegistroUsuario, registrarUsuario } = authContext

    const wordContext = useContext(WordContext)
    const { palabras, cargandoSubirPalabra, cargandoEliminarPalabra, cargandoModificarPalabra, guardarPalabra, traerPalabrasPorUsuario, eliminarPalabra } = wordContext

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        // Ir a buscar las imágenes subidas por el usuario
        traerPalabrasPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    }, [ mensaje, palabras, cargandoSubirPalabra, cargandoEliminarPalabra, cargandoModificarPalabra ] )

    const [ fieldsWord, setFieldsWord ] = useState({
        name: "Ejemplo",
        difficulty: "",
        points: 0,
    })

    const { name, difficulty, points } = fieldsWord;

    const onChange = e => {
        setFieldsWord({
            ...fieldsWord,
            [e.target.name]: e.target.value
        })
    }

    const onDelete = (id_word) => {
        // console.log(id_word)
        eliminarPalabra(id_word)
    }

    const onSubmit = e => {
        e.preventDefault()
        // Validar que no hayan campos vacíos
        if (name.trim() === '' ||
            difficulty.trim() === '' ||
            points === 0 ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }

        console.log("formulario correcto")
        guardarPalabra({name, difficulty, points})

        // Resetear campos
        setFieldsWord({
            name: "",
            difficulty: "",
            points: 0,
        })
    }

    return (
        <Fragment>
            <Container className="div-uploadWord" >
                <Grid container component="main" >
                    <Grid item xs={12} sm={8} md={12} elevation={6}>
                        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                        <form  onSubmit={onSubmit}  >
                        <Grid container spacing={5} >

                            <Grid item xs={4} >
                                <div className="col palabra" >
                                    <Col>
                                        <Paper className="paper" elevation={10} variant="outlined"  >
                                            {name}
                                        </Paper>
                                    </Col>
                                </div>
                            </Grid>
                            <Grid item xs={8} >
                                <div className="div-filename" >                        
                                    <TextField
                                        className="textfield-filename"
                                        value={name}
                                        name="name"
                                        variant="outlined"
                                        id="name"
                                        label="Nombre de la palabra"
                                        autoFocus
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="div-difficulty" >                        
                                    <FormControl variant="outlined" >
                                        <InputLabel id="demo-simple-select-outlined-label"> Dificultad </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            className="select-difficulty"
                                            id="difficulty"
                                            name="difficulty"
                                            value={difficulty}
                                            onChange={onChange}
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

                                <div className="div-points" >
                                    <TextField
                                        className="textfield-points"
                                        variant="outlined"
                                        id="points"
                                        label="Ingrese una cantidad de puntos asociada a esta palabra"
                                        name='points'
                                        type='number'
                                        value={points}
                                        onChange={onChange}
                                    />
                                </div>

                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: "2%" }} >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="submit-word"
                                    disabled={cargandoSubirPalabra}
                                >
                                    {
                                            cargandoSubirPalabra
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
                                            "Subir Palabra"
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                        </form>
                    </Grid>
                </Grid>
                
            </Container>
            <div className="div-datatable-words" >
                <DatatableWords
                    words={palabras}
                    deleteFunction={onDelete}
                    loadingDelete={cargandoEliminarPalabra}
                />
            </div>
        </Fragment>
    );
}
 
export default UploadWord;