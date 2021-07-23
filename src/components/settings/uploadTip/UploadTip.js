import React, { useState, useEffect, useContext, Fragment } from 'react';
import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import TipContext from '../../../context/tips/tipContext';

import './uploadTip.css';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Col} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import HelpIcon from '@material-ui/icons/Help';

import ClipLoader from "react-spinners/ClipLoader";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import DatatableTips from './datatableTips/DatatableTips';

import RewardNotification from '../../common/fire/RewardNotification';

const UploadTip = () => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    const tipContext = useContext(TipContext)
    const {
        tips,
        recompensasSubirTip,
        recompensasTareasSubirTip,
        cargandoSubirTip,
        cargandoEliminarTip,
        cargandoModificarTip,
        guardarTip,
        traerTipsPorUsuario,
        eliminarTip,
        borrarRecompensasSubirTip,
        borrarRecompensasTareasSubirTip,
    } = tipContext

    useEffect(() => {
        // Ir a buscar los Tips subidos por el usuario
        traerTipsPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [
        mensaje,
        tips,
        cargandoSubirTip,
        cargandoEliminarTip,
        cargandoModificarTip
    ] )

    const [ fieldsTip, setFieldsTip ] = useState({
        text: "Ejemplo",
    })

    const { text } = fieldsTip;

    const onChange = e => {
        setFieldsTip({
            ...fieldsTip,
            [e.target.name]: e.target.value
        })
    }

    const onDelete = (id_tip) => {
        // console.log(id_tip)
        eliminarTip(id_tip)
    }

    const onSubmit = e => {
        e.preventDefault()
        // Validar que no hayan campos vacíos
        if (text.trim() === ''  ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }

        guardarTip({ text })

        // Resetear campos
        setFieldsTip({
            text: "Ejemplo",
        })
    }

    return (
        <Fragment>

            {recompensasSubirTip !== null
                ?
                    <RewardNotification
                        recompensas={recompensasSubirTip}
                        borrarRecompensas={borrarRecompensasSubirTip}
                    />
                : null
            }

            {recompensasTareasSubirTip !== null
                ?
                    <RewardNotification
                        recompensas={recompensasTareasSubirTip}
                        borrarRecompensas={borrarRecompensasTareasSubirTip}
                    />
                : null
            }

            <Container className="div-uploadTip" >
                <Grid container component="main" >
                    <Grid item xs={12} sm={8} md={12} elevation={6}>
                        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                        <form  onSubmit={onSubmit}  >
                        <Grid container spacing={5} >

                            <Grid item xs={4} >
                                <div className="col tip" >
                                    <Col>
                                        <Paper className="paper-tip" elevation={10} variant="outlined"  >
                                            {text}
                                        </Paper>
                                    </Col>
                                </div>
                            </Grid>
                            <Grid item xs={8} >
                                <div className="div-text" >                        
                                    <TextField
                                        className="textfield-text"
                                        value={text}
                                        name="text"
                                        variant="outlined"
                                        id="text"
                                        label="Contenido del Tip"
                                        autoFocus
                                        onChange={onChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: "2%" }} >
                                <div className="row">
                                    <Col xs={11}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className="submit-tip"
                                            disabled={cargandoSubirTip}
                                        >
                                            {
                                                    cargandoSubirTip
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
                                                    "Subir Tip"
                                            }
                                        </Button>
                                    </Col>
                                    <Col xs={1}>
                                        <OverlayTrigger
                                            key={9}
                                            placement={"top"}
                                            overlay={
                                        <Tooltip className="tooltipUploadTip" id="help-icon-tooltip-1" >
                                            Aquí debe escribir un consejo/información/tip sobre los incendios para darle a conocer un dato curioso o llamativo.
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
            <div className="div-datatable-tips" >
                <DatatableTips
                    tips={tips}
                    deleteFunction={onDelete}
                    loadingDelete={cargandoEliminarTip}
                />
            </div>
        </Fragment>
    );
}
 
export default UploadTip;