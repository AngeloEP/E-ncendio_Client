import React, { useState, useEffect, useContext, Fragment } from 'react';
import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import WordContext from '../../../context/words/wordContext';

import './uploadWord.css';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Col} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import HelpIcon from '@material-ui/icons/Help';

import ClipLoader from "react-spinners/ClipLoader";

import DatatableWords from './datatableWords/DatatableWords';

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import RewardNotification from '../../common/fire/RewardNotification';

const UploadWord = () => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    const wordContext = useContext(WordContext)
    const {
        palabras,
        recompensasSubirPalabra,
        recompensasTareasSubirPalabra,
        cargandoSubirPalabra,
        cargandoEliminarPalabra,
        cargandoModificarPalabra,
        guardarPalabra,
        traerPalabrasPorUsuario,
        eliminarPalabra,
        borrarRecompensasSubirPalabra,
        borrarRecompensasTareasSubirPalabra,
    } = wordContext

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        // Ir a buscar las imágenes subidas por el usuario
        traerPalabrasPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [ mensaje, palabras, cargandoSubirPalabra, cargandoEliminarPalabra, cargandoModificarPalabra ] )

    const [ fieldsWord, setFieldsWord ] = useState({
        name: "Ejemplo",
    })

    const { name } = fieldsWord;

    const onChange = e => {
        setFieldsWord({
            ...fieldsWord,
            [e.target.name]: e.target.value
        })
    }

    const onDelete = (id_word) => {
        eliminarPalabra(id_word)
    }

    const onSubmit = e => {
        e.preventDefault()
        // Validar que no hayan campos vacíos
        if (name.trim() === ''  ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }

        guardarPalabra({ name })

        // Resetear campos
        setFieldsWord({
            name: "Ejemplo",
        })
    }

    return (
        <Fragment>

            {recompensasSubirPalabra !== null
                ?
                    <RewardNotification
                        recompensas={recompensasSubirPalabra}
                        borrarRecompensas={borrarRecompensasSubirPalabra}
                    />
                : null
            }

            {recompensasTareasSubirPalabra !== null
                ?
                    <RewardNotification
                        recompensas={recompensasTareasSubirPalabra}
                        borrarRecompensas={borrarRecompensasTareasSubirPalabra}
                    />
                : null
            }

            <Container className="div-uploadWord"  >
                <Grid container component="main" className="justify-content-center" >
                    <Grid item xs={12} sm={12} md={12} elevation={6}>
                        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                        <form  onSubmit={onSubmit}  >
                        <Grid container spacing={0} >

                            <Grid item xs={6} >
                                <div className="col palabra" >
                                    <Col>
                                        <Paper className="paper-word" elevation={10} variant="outlined"  >
                                            {name}
                                        </Paper>
                                    </Col>
                                </div>
                            </Grid>
                            <Grid item xs={6} >
                                <div className="div-nameWord" >                        
                                    <TextField
                                        className="textfield-nameWord"
                                        value={name}
                                        name="name"
                                        variant="outlined"
                                        id="name"
                                        label="Nombre de la palabra"
                                        autoFocus
                                        onChange={onChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: "2%" }} >
                                <div className="row w-100 mr-auto ml-auto" >
                                    <Col className="text-right mt-auto mb-auto">
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
                                    </Col>
                                    <Col className="divHelpIconUploadWord" >
                                        <OverlayTrigger
                                            key={9}
                                            placement={"top"}
                                            overlay={
                                        <Tooltip className="tooltipUploadWord" id="help-icon-tooltip-1" >
                                            La palabra escrita debe estar relacionada a los incendios y poder ser categorizada con una de las 7 opciones: 
                                            Prevención, Riesgo, Recuperación, Mitigación, Amenaza, Impacto o Combate.
                                        </Tooltip>
                                        }
                                        >
                                            <HelpIcon className="help-icon-tagImage" color="primary" />
                                        </OverlayTrigger>
                                    </Col>
                                </div>
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