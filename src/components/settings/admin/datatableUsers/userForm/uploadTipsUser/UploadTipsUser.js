import React, { useState, useContext } from 'react';
import './uploadTipsUser.css';

import AlertaContext from '../../../../../../context/alertas/alertaContext';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

import ClipLoader from "react-spinners/ClipLoader";

import { Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button';

import uploadImage from '../../../../../../assets/img/upload_image.jpg';

const UploadTipsUser = ({
    tips,
    funcionHabilitarInhabilitar,
    cargandoHabilitarInhabilitarTip,
    funcionEliminar,
    cargandoEliminarTipPorAdmin,
    cargandoTipsUsuarioDesdeAdmin,
    funcionModificarDificultadYPuntos,
    cargandoModificarDificultadPuntosTipPorAdmin,
}) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = (tip_id) => {
        const tipSelected = tips.find(tip => tip._id === tip_id);
        setFieldsTipUpdate({
            id_tip_selected: tip_id,
            textUpdate: tipSelected.Texto,
            points: tipSelected.Puntos,
        })
        setPathImageUpdate(tipSelected.Imagen)
        setShow(true)
    };

    const [ fieldsTipUpdate, setFieldsTipUpdate ] = useState({
        id_tip_selected: "",
        textUpdate: "",
        points: 0,
    })
    const { id_tip_selected, textUpdate, points } = fieldsTipUpdate;
    const [ pathImageUpdate, setPathImageUpdate ] = useState(null)

    const onChangeUpdate = e => {
        setFieldsTipUpdate({
            ...fieldsTipUpdate,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitUpdate = e => {
        e.preventDefault()
        if (points === 0 ||
            points === "" ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        
        funcionModificarDificultadYPuntos( id_tip_selected, { points} )
    }
    return (
        <div className="cards-tips" >
            <div className="row">
                { cargandoTipsUsuarioDesdeAdmin === false
                    ?
                        tips.length !== 0
                        ?
                            tips.map((tip, index) =>

                                <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-4" >
                                    
                                    <div className="card text-white tarjeta-tips" >
                                        <img className="card-img-top imagen-tarjeta" src={tip.Imagen !== "" ? tip.Imagen : uploadImage} alt="" />
                                        <Paper className="card-img-top tip-tarjeta" elevation={10} variant="outlined"  >
                                            {tip.Texto}
                                        </Paper>
                                        <div className="card-body text-center">
                                            <h5 className="card-title titulo-fecha-card-tip"> Subido el </h5>
                                            <p className="card-text fecha-card-tip"> {tip.Creadoel} </p>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                className="btnDeleteUserForm"
                                                disabled={cargandoEliminarTipPorAdmin}
                                                onClick={() => funcionEliminar(tip._id)}
                                            >
                                                {
                                                    cargandoEliminarTipPorAdmin
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
                                                className={tip.Habilitada
                                                    ? "btnHabInUserForm btnInhabilitar"
                                                    : "btnHabInUserForm btnHabilitar"
                                                }
                                                disabled={cargandoHabilitarInhabilitarTip}
                                                onClick={() => funcionHabilitarInhabilitar(tip._id, !tip.Habilitada)}
                                            >
                                                {
                                                    cargandoHabilitarInhabilitarTip
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
                                                        tip.Habilitada ? "Inhabilitar" : "Habilitar"
                                                }
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className="btnModifyUserForm"
                                                onClick={() => handleShow(tip._id)}
                                            >
                                                {
                                                    "Modificar puntos entregados"
                                                }
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        :
                        <div className="text-center ml-auto mr-auto" >
                            No hay tips
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
                        <Modal.Title className="titleModal-modifyAttributesTip" > Modificar Dificultad y Puntos  </Modal.Title>
                    </Modal.Header>

                                    <form  onSubmit={onSubmitUpdate}  >
                    <Modal.Body>
                        <Container className="div-uploadTip-update" >
                            <Grid container component="main" className="justify-content-center" >
                                <Grid item xs={12} sm={12} md={12} elevation={6}>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                                    <Grid container spacing={5} >
                                        <Grid item xs={6} >
                                            <div className="div-image-modifyAttributesTip" >
                                                <img className="img-fluid img-thumbnail image-upload-modifyAttributesTip" src={pathImageUpdate !== "" ? pathImageUpdate : uploadImage} alt="" />
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <div className="div-tip-modifyAttributesTip" >                        
                                                <TextField
                                                    className="tipModifyAttributesTip"
                                                    value={textUpdate}
                                                    disabled
                                                    name="textUpdate"
                                                    variant="filled"
                                                    id="textUpdate"
                                                    label="Contenido del tip"
                                                />
                                            </div>
                                            <div className="col tip-modal-user" >
                                                <Col>
                                                    <Paper className="paper-modifyAttributesTip" elevation={10} variant="outlined"  >
                                                        {textUpdate}
                                                    </Paper>
                                                </Col>
                                            </div>
                                            <div className="div-points-modifyAttributesTip" >
                                                <TextField
                                                    className="points-modifyAttributesTip"
                                                    variant="outlined"
                                                    id="points"
                                                    label="Puntos"
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
                        <ButtonBootstrap className="closeButtonModal-modifyAttributesTip" variant="secondary" onClick={handleClose}>
                            Cerrar
                        </ButtonBootstrap>
                        <Button
                            type="submit"
                            variant="contained"
                            className="submitButtonModal-modifyAttributesTip"
                            startIcon={<EditIcon />}
                            disabled={cargandoModificarDificultadPuntosTipPorAdmin}
                        >
                            {
                                cargandoModificarDificultadPuntosTipPorAdmin
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
                                "Modificar Tip"
                            }
                        </Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </>
        </div>
    );
}
 
export default UploadTipsUser;