import React, { Fragment, useState, useEffect, useContext } from 'react';
import AlertaContext from '../../../../context/alertas/alertaContext';
import AuthContext from '../../../../context/autentificacion/authContext';
import CategoryContext from '../../../../context/categories/categoryContext';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Col} from 'react-bootstrap';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import ClipLoader from "react-spinners/ClipLoader";

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button';

import Fire from '../../../common/fire/Fire';
import './datatableCategory.css';

const DatatableTips = ({ categorias }) => {
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    const categoryContext = useContext(CategoryContext)
    const {
        cargandoModificarCategoria,
        obtenerTodasLasCategorias,
        modificarCategoria
    } = categoryContext

    useEffect(() => {
        obtenerTodasLasCategorias();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [ mensaje, cargandoModificarCategoria ] )
    
    const columns = categorias[0] && Object.keys(categorias[0])
    
    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        setShow(false)
    };
    
    const handleShow = (category_id) => {
        const categorySelected = categorias.find(cat => cat._id === category_id);
        setFieldsCategoryUpdate({
            id_category_selected: category_id,
            nameUpdate: categorySelected.Nombre,
            isVisibleUpdate: categorySelected.Visible,
        })
        setShow(true)
    };

    const [ fieldsCategoryUpdate, setFieldsCategoryUpdate ] = useState({
        id_category_selected: "",
        nameUpdate: "",
        isVisibleUpdate: "",
    })

    const { id_category_selected, nameUpdate, isVisibleUpdate } = fieldsCategoryUpdate;

    const onChangeUpdate = e => {
        setFieldsCategoryUpdate({
            ...fieldsCategoryUpdate,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitUpdate = e => {
        e.preventDefault()
        if (nameUpdate.trim() === '' |
            isVisibleUpdate === ''
            ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }
        let name = nameUpdate;
        let isVisible = isVisibleUpdate;
        modificarCategoria( id_category_selected, { name, isVisible} )

        setTimeout(() => {
            handleClose()
        }, 2000);
    }

    const onCheck = (name, value) => {
        return
    }

    return (
        <Fragment>
            <Table responsive striped bordered hover  >
            {
                categorias.length !== 0
                ?
                    <Fragment>
                        <thead>
                            <tr>
                                <Fragment>
                                    { categorias[0] && columns.map((heading, headingIndex) =>
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
                                categorias.map((row, index) =>
                                    <tr key={index+1} >
                                        {
                                            columns.map((column, colIndex) =>
                                                
                                                <Fragment key={colIndex+1} >

                                                    { column === "Nombre"
                                                        ?
                                                            <td style={{ width: "6%" }} >
                                                                <div className="col category-update" >
                                                                    <Col>
                                                                        <Fire
                                                                            pEvents={"none"}
                                                                            name={row[column]}
                                                                            value={row[column]}
                                                                            selected={false}
                                                                            onCheck={onCheck}
                                                                            title=""
                                                                            placement="left"
                                                                        />
                                                                    </Col>
                                                                </div>
                                                            </td>
                                                        :
                                                            column === "Visible"
                                                            ?
                                                                row[column] === true
                                                                ?
                                                                    <td style={{ width: "2%" }} >
                                                                        <div className="alert alert-success" role="alert" >
                                                                            <strong> Es visible </strong>
                                                                        </div>
                                                                    </td> 
                                                                :
                                                                    <td style={{ width: "2%" }} >
                                                                        <div className="alert alert-warning" role="alert" >
                                                                            <strong> No será visible </strong>
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
                                                key={index+2}
                                                variant="contained"
                                                style={{ backgroundColor: "yellow", marginTop: "5%", height: "10%", width: "90%" }}
                                                startIcon={<EditIcon />}
                                                onClick={() => handleShow(row["_id"])}
                                            >
                                                ACTUALIZAR CATEGORÍA
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
                                <td> Aún no ha subido categorias </td>
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
                        <Modal.Title> Modificar Categoría  </Modal.Title>
                    </Modal.Header>

                                    <form  onSubmit={onSubmitUpdate}  >
                    <Modal.Body>
                        <Container className="div-uploadCategory-update" >
                            <Grid container component="main" >
                                <Grid item xs={12} sm={8} md={12} elevation={6}>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                                    <Grid container spacing={5} >

                                        <Grid item xs={4} >
                                            <div className="col category-update" >
                                                <Col>
                                                    <Fire
                                                        pEvents={"none"}
                                                        name={nameUpdate}
                                                        value={nameUpdate}
                                                        selected={false}
                                                        onCheck={onCheck}
                                                        title=""
                                                        placement="left"
                                                    />
                                                </Col>
                                            </div>
                                        </Grid>
                                        <Grid item xs={8} >
                                            <div className="div-category-update" >                        
                                                <TextField
                                                    style={{ width: "60%" }}
                                                    value={nameUpdate}
                                                    name="nameUpdate"
                                                    variant="outlined"
                                                    id="nameUpdate"
                                                    label="Nombre de la categoría"
                                                    autoFocus
                                                    onChange={onChangeUpdate}
                                                />
                                            </div>
                                            <div className="div-isVisible" > 
                                                <FormControl variant="outlined" className="formControl">
                                                    <InputLabel id="demo-simple-select-outlined-label"> Visible </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        className="select-isVisible"
                                                        id="isVisibleUpdate"
                                                        name="isVisibleUpdate"
                                                        value={isVisibleUpdate}
                                                        onChange={onChangeUpdate}
                                                        label="Visible"
                                                    >
                                                    <MenuItem value="">
                                                        <em>Ninguno</em>
                                                    </MenuItem>
                                                    <MenuItem value={true}> Estar Visible </MenuItem>
                                                    <MenuItem value={false}> No ser Visible </MenuItem>
                                                    </Select>
                                                </FormControl>
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
                            disabled={cargandoModificarCategoria}
                        >
                            {
                                cargandoModificarCategoria
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
                                "Modificar la categoría"
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