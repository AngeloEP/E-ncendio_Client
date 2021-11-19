import React, { useState, useEffect, useContext, Fragment } from 'react';
import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import CategoryContext from '../../../context/categories/categoryContext';

import './uploadCategory.css';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Col} from 'react-bootstrap';
import HelpIcon from '@material-ui/icons/Help';

import ClipLoader from "react-spinners/ClipLoader";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import Fire from '../../common/fire/Fire';
import DatatableCategory from './datatableCategory/DatatableCategory';

const UploadCategory = () => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    const categoryContext = useContext(CategoryContext)
    const {
        categorias,
        cargandoSubirCategoria,
        cargandoModificarCategoria,
        guardarCategoria,
        obtenerTodasLasCategorias,
    } = categoryContext

    useEffect(() => {
        // Ir a buscar los Tips subidos por el usuario
        obtenerTodasLasCategorias();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [
        mensaje,
        categorias,
        cargandoSubirCategoria,
        cargandoModificarCategoria
    ] )

    const [ fieldsCategory, setFieldsCategory ] = useState({
        name: "Ejemplo",
    })

    const { name } = fieldsCategory;

    const onChange = e => {
        setFieldsCategory({
            ...fieldsCategory,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        // Validar que no hayan campos vacíos
        if (name.trim() === ''  ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        if (name.trim() === 'Ejemplo'  ) {
            mostrarAlerta("Debes ingresar un nuevo nombre de categoría", 'alerta-error')
            return
    }

        guardarCategoria({ name })

        // Resetear campos
        setFieldsCategory({
            name: "Ejemplo",
        })
    }

    const onCheck = (name, value) => {
        console.log(name, value)
    }

    return (
        <Fragment>

            <Container className="div-uploadCategory" >
                <Grid container component="main" className="justify-content-center" >
                    <Grid item xs={12} sm={12} md={12} elevation={6}>
                        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                        <form  onSubmit={onSubmit}  >
                        <Grid container  >

                            <Grid item xs={6} >
                                <div className="col categoryUpload" >
                                    <Col>
                                        <Fire
                                            pEvents={"none"}
                                            name={name}
                                            value={name}
                                            selected={false}
                                            onCheck={onCheck}
                                            title=""
                                            placement="left"
                                        />
                                    </Col>
                                </div>
                            </Grid>
                            <Grid item xs={6} >
                                <div className="div-name" >                        
                                    <TextField
                                        className="textfield-name"
                                        value={name}
                                        name="name"
                                        variant="outlined"
                                        id="name"
                                        label="Nombre de la nueva categoría"
                                        autoFocus
                                        onChange={onChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: "2%" }} >
                                <div className="row mt-5">
                                    <Col className="text-right mt-auto mb-auto" >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className="submit-category"
                                            disabled={cargandoSubirCategoria}
                                        >
                                            {
                                                    cargandoSubirCategoria
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
                                                    "Subir Categoría"
                                            }
                                        </Button>
                                    </Col>
                                    <Col className="divHelpIconUploadCategory" >
                                        <OverlayTrigger
                                            key={9}
                                            placement={"top"}
                                            overlay={
                                        <Tooltip className="tooltipUploadCategory" id="help-icon-tooltip-1" >
                                            Aquí debe escribir un nombre a la categoría que podría salir en los juegos de etiquetado.
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
            <div className="div-datatable-categories" >
                <DatatableCategory
                    categorias={categorias}
                />
            </div>
        </Fragment>
    );
}
 
export default UploadCategory;