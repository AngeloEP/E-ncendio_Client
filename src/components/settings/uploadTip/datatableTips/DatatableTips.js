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
import uploadImage from '../../../../assets/img/upload_image.jpg';

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
        setImageUpdate(null)
    };
    
    const handleShow = (tip_id) => {
        const tipSelected = tips.find(tip => tip._id === tip_id);
        setFieldsTipUpdate({
            id_tip_selected: tip_id,
            textUpdate: tipSelected.Texto,
        })
        setPathImageUpdate(tipSelected.Imagen)
        setShow(true)
    };

    const [ fieldsTipUpdate, setFieldsTipUpdate ] = useState({
        id_tip_selected: "",
        textUpdate: "",
    })

    const { id_tip_selected, textUpdate } = fieldsTipUpdate;
    const [ imageUpdate, setImageUpdate ] = useState(null)
    const [ pathImageUpdate, setPathImageUpdate ] = useState(null)

    const onChangeUpdate = e => {
        setFieldsTipUpdate({
            ...fieldsTipUpdate,
            [e.target.name]: e.target.value
        })
    }

    const onFileChangeUpdate = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const fileUpdate = e.target.files[0]
            if (fileUpdate.type.includes("image")) {
                const readerUpdate = new FileReader()
                readerUpdate.readAsDataURL(fileUpdate)

                readerUpdate.onload = function load() {
                    setPathImageUpdate(readerUpdate.result)
                }
                setImageUpdate(fileUpdate)
            } else {
                mostrarAlerta("Debe seleccionar un archivo de tipo imagen, se admiten extensiones: jpeg, jpg, png y gif", "alerta-error")
            }
        }
    }

    const onSubmitUpdate = e => {
        e.preventDefault()
        if (textUpdate.trim() === '' ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        const formData = new FormData();
        formData.append('image', imageUpdate);
        formData.append('text', textUpdate);
        modificarTip( id_tip_selected, formData )

        setTimeout(() => {
            handleClose()
        }, 2000);
        document.getElementById("imageUpdateTip").value = "";
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
                                                            <td style={{ width: "9%" }} >
                                                                <div className="col tip-update" >
                                                                    <Col>
                                                                        <Paper className="paper-tip-update" elevation={10} variant="outlined"  >
                                                                            {row[column]}
                                                                        </Paper>
                                                                    </Col>
                                                                </div>
                                                            </td>
                                                        :
                                                            column === "Imagen"
                                                            ?
                                                                <td style={{ width: "7%" }} > <img className="img-fluid img-thumbnail image-user"
                                                                    src={ row[column] !== "" ? row[column] : uploadImage } alt=""
                                                                />
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
                        <Modal.Title className="titleModal-uploadTip" > Modificar Tip  </Modal.Title>
                    </Modal.Header>

                                    <form  onSubmit={onSubmitUpdate}  >
                    <Modal.Body>
                        <Container className="div-uploadTip-update" >
                            <Grid container component="main" className="justify-content-center" >
                                <Grid item xs={12} sm={8} md={12} elevation={6}>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                                    <Grid container spacing={0} >

                                        <Grid item xs={6} >
                                            <div className="div-imageTip-update" >
                                                <input
                                                    accept="image/*"
                                                    id="imageUpdateTip"
                                                    type="file"
                                                    onChange={onFileChangeUpdate}
                                                    style={{ display: "none" }}
                                                    />
                                                <img className="img-fluid img-thumbnail imageTip-upload-update" src={pathImageUpdate !== "" ? pathImageUpdate : uploadImage} alt="" />
                                                <label htmlFor="imageUpdateTip" className="label-upload-imageTip-update" >
                                                    <Button  variant="contained" style={{ backgroundColor: "greenyellow" }}  component="span">
                                                        Agregar imagen
                                                    </Button>
                                                </label>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <div className="div-tip-update" >                        
                                                <TextField
                                                    className="tipImageUpdate"
                                                    value={textUpdate}
                                                    name="textUpdate"
                                                    variant="outlined"
                                                    id="textUpdate"
                                                    label="Contenido del Tip"
                                                    autoFocus
                                                    onChange={onChangeUpdate}
                                                />
                                            </div>
                                            <div className="col tip-updateModal" >
                                                    <Paper className="paper-tip-update" elevation={10} variant="outlined"  >
                                                        {textUpdate}
                                                    </Paper>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                        </Container>
                    </Modal.Body>

                    <Modal.Footer>
                        <ButtonBootstrap className="closeButtonModal-uploadTip" variant="secondary" onClick={handleClose}>
                            Cerrar
                        </ButtonBootstrap>
                        <Button
                            type="submit"
                            variant="contained"
                            className="submitButtonModal-uploadTip"
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