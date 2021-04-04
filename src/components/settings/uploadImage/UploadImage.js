import React, { useState, useEffect, useContext, Fragment } from 'react';
import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import ImageContext from '../../../context/images/imageContext';

import './uploadImage.css';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ClipLoader from "react-spinners/ClipLoader";
import uploadImage from '../../../assets/img/upload_image.jpg';

import DatatableImages from './datatableImages/DatatableImages';

const UploadImage = () => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje, autenticado, cargandoRegistroUsuario, registrarUsuario } = authContext

    const imageContext = useContext(ImageContext)
    const { imagenes, cargandoSubirImagen, cargandoEliminarImagen, cargandoModificarImagen, guardarImagen, traerImagenesPorUsuario, eliminarImagen } = imageContext

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        // Ir a buscar las imágenes subidas por el usuario
        traerImagenesPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    }, [ mensaje, imagenes, cargandoSubirImagen, cargandoEliminarImagen, cargandoModificarImagen ] )

    const [ fieldsImage, setFieldsImage ] = useState({
        difficulty: "",
        points: 0,
    })

    const { difficulty, points } = fieldsImage;
    const [ image, setImage ] = useState(null)
    const [ pathImage, setPathImage ] = useState(uploadImage)

    const onChange = e => {
        setFieldsImage({
            ...fieldsImage,
            [e.target.name]: e.target.value
        })
    }

    const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (file.type.includes("image")) {
                const reader = new FileReader()
                reader.readAsDataURL(file)

                reader.onload = function load() {
                    setPathImage(reader.result)
                }
                setImage(file)
            } else {
                mostrarAlerta("Debe seleccionar un archivo de tipo imagen, se admiten extensiones: jpeg, jpg, png y gif", "alerta-error")
            }
        }
    }

    const onDelete = (id_image) => {
        // console.log(id_image)
        eliminarImagen(id_image)
    }

    const onSubmit = e => {
        e.preventDefault()
        // Validar que no hayan campos vacíos
        if (difficulty.trim() === '' ||
            points === 0 ) {
                mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
                return
        }

        if (image === null) {
            mostrarAlerta("Debe adjuntar una imagen", 'alerta-error')
            return
        }
        
        console.log("formulario correcto")
        const formData = new FormData();
        formData.append('difficulty', difficulty);
        formData.append('points', points);
        formData.append('image', image);
        guardarImagen(formData)

        // Resetear campos
        setFieldsImage({
            difficulty: "",
            points: 0,
        })
        setImage(null);
        setPathImage(uploadImage);
    }

    return (
        <Fragment>
            <Container className="div-uploadImage" >
                <Grid container component="main" >
                    <Grid item xs={12} sm={8} md={12} elevation={6}>
                        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                        <form  onSubmit={onSubmit}  >
                        <Grid container spacing={5} >

                            <Grid item xs={4} >
                                <div className="div-image" >
                                    <input
                                        accept="image/*"
                                        // className={classes.input} // input
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={onFileChange}
                                        style={{ display: "none" }}
                                        />
                                    <img className="img-fluid img-thumbnail image-upload" src={pathImage} alt="Image" />
                                    <label htmlFor="contained-button-file" className="label-upload-image" >
                                        <Button  variant="contained" style={{ backgroundColor: "greenyellow" }}  component="span">
                                            Agregar imagen
                                        </Button>
                                    </label>
                                    {/* <img className="image" src={uploadImage} /> */}
                                </div>
                            </Grid>
                            <Grid item xs={8} >
                                <div className="div-filename" >                        
                                    <TextField
                                        style={{ width: "60%" }}
                                        value={ image ? image.name.split(".")[0] : "" }
                                        disabled
                                        name="filename"
                                        variant="filled"
                                        id="filename"
                                        label="Nombre de la imagen"
                                        autoFocus
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="div-difficulty" >                        
                                    <FormControl variant="outlined" >
                                        <InputLabel id="demo-simple-select-outlined-label"> Dificultad </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            style={{ width: "15em" }}
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
                                        style={{ width: "60%" }}
                                        variant="outlined"
                                        id="points"
                                        label="Ingrese una cantidad de puntos asociada a esta imagen"
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
                                    className="submit-image"
                                >
                                    {
                                            cargandoSubirImagen
                                            ?
                                            <Grid container
                                                direction="row"
                                                justify="center"
                                                alignItems="center"
                                            >
                                                <Grid item xs={6}  >
                                                    Cargando...
                                                </Grid>
                                                <Grid item xs={3} >
                                                <ClipLoader
                                                    color={"#fff"}
                                                    loading={true}
                                                    size={20}
                                                />
                                                </Grid>
                                            </Grid>
                                                
                                            :
                                            "Subir Imagen"
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                        </form>
                    </Grid>
                </Grid>
                
            </Container>
            <div className="div-datatable-images" >
                <DatatableImages
                    images={imagenes}
                    deleteFunction={onDelete}
                    loadingDelete={cargandoEliminarImagen}
                />
            </div>
        </Fragment>
    );
}
 
export default UploadImage;