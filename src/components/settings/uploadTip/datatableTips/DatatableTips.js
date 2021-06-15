import React, { Fragment, useState, useEffect, useContext } from 'react';
import AlertaContext from '../../../../context/alertas/alertaContext';
import AuthContext from '../../../../context/autentificacion/authContext';
import TipContext from '../../../../context/tips/tipContext';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Col} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';

import ClipLoader from "react-spinners/ClipLoader";

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button';


import './datatableTips.css';

const DatatableTips = ({ tips, deleteFunction, loadingDelete }) => {
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    const tipContext = useContext(TipContext)
    const {
        cargandoModificarTip,
        traerTipsPorUsuario,
        modificarTip
    } = tipContext

    useEffect(() => {
        // Ir a buscar los tips subidos por el usuario
        traerTipsPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [ mensaje, cargandoModificarTip ] )
    
    const columns = tips[0] && Object.keys(tips[0])
    
    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        setShow(false)
    };
    
    const handleShow = (tip_id) => {
        const tipSelected = tips.find(tip => tip._id === tip_id);
        setFieldsTipUpdate({
            id_tip_selected: tip_id,
            textUpdate: tipSelected.Texto,
        })
        setShow(true)
    };

    const [ fieldsTipUpdate, setFieldsTipUpdate ] = useState({
        id_tip_selected: "",
        textUpdate: "",
    })

    const { id_tip_selected, textUpdate } = fieldsTipUpdate;

    const onChangeUpdate = e => {
        setFieldsTipUpdate({
            ...fieldsTipUpdate,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitUpdate = e => {
        e.preventDefault()
        // Validar que no hayan campos vacíos
        if (textUpdate.trim() === '' ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        let text = textUpdate;
        modificarTip( id_tip_selected, { text } )

        setTimeout(() => {
            handleClose()
        }, 2000);
    }

    return (
        <Fragment>
            <Table responsive striped bordered hover  >
            {
                tips.length !== 0
                ?
                    <Fragment>
                        <thead>
                            <tr>
                                <Fragment>
                                    { tips[0] && columns.map((heading, headingIndex) =>
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
                                tips.map((row, index) =>
                                    <tr key={index+1} >
                                        {
                                            columns.map((column, colIndex) =>
                                                
                                                <Fragment key={colIndex+1} >

                                                    { column === "Texto"
                                                        ?
                                                            <td style={{ width: "7%" }} >
                                                                <div className="col tip-update" >
                                                                    <Col>
                                                                        <Paper className="paper-tip-update" elevation={10} variant="outlined"  >
                                                                            {row[column]}
                                                                        </Paper>
                                                                    </Col>
                                                                </div>
                                                            </td>
                                                        :
                                                            column === "Estado"
                                                            ?
                                                                row[column] === true
                                                                ?
                                                                    <td style={{ width: "2%" }} >
                                                                        <div className="alert alert-success" role="alert" >
                                                                            <strong> Habilitado </strong>
                                                                        </div>
                                                                    </td> 
                                                                :
                                                                    <td style={{ width: "2%" }} >
                                                                        <div className="alert alert-warning" role="alert" >
                                                                            <strong> Inhabilitado </strong>
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
                                        <td key="buttonDelete" style={{ width: "10%" }} >
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
                                                ACTUALIZAR TIP
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
                                <td> Aún no ha subido tips </td>
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
                        <Modal.Title> Modificar Tip  </Modal.Title>
                    </Modal.Header>

                                    <form  onSubmit={onSubmitUpdate}  >
                    <Modal.Body>
                        <Container className="div-uploadTip-update" >
                            <Grid container component="main" >
                                <Grid item xs={12} sm={8} md={12} elevation={6}>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                                    <Grid container spacing={5} >

                                        <Grid item xs={4} >
                                            <div className="col tip-update" >
                                                <Col>
                                                    <Paper className="paper-tip-update" elevation={10} variant="outlined"  >
                                                        {textUpdate}
                                                    </Paper>
                                                </Col>
                                            </div>
                                        </Grid>
                                        <Grid item xs={8} >
                                            <div className="div-tip-update" >                        
                                                <TextField
                                                    style={{ width: "60%" }}
                                                    value={textUpdate}
                                                    name="textUpdate"
                                                    variant="outlined"
                                                    id="textUpdate"
                                                    label="Contenido del Tip"
                                                    autoFocus
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
                            disabled={cargandoModificarTip}
                        >
                            {
                                cargandoModificarTip
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
                                "Modificar el Tip"
                            }
                        </Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </>
        </Fragment>
    );
}
 
export default DatatableTips;