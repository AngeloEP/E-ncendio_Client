import React, { useState, useEffect, useContext, Fragment } from 'react';
import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import FourImagesOneWordContext from '../../../context/fourImagesOneWord/fourImagesOneWordContext';

import './uploadFourImagesOneWord.css';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import ClipLoader from "react-spinners/ClipLoader";
import uploadImage from '../../../assets/img/upload_image.jpg';

import DatatableFourImagesOneWord from './datatableFourImagesOneWord/DatatableFourImagesOneWord';

const UploadFourImagesOneWord = () => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    const fourImagesOneWordContext = useContext(FourImagesOneWordContext)
    const { ahorcados,
        traerAhorcadosPorUsuario,
        cargandoSubirAhorcado,
        cargandoEliminarAhorcado,
        eliminarAhorcado,
        guardarAhorcado,
    } = fourImagesOneWordContext

    useEffect(() => {
        // Ir a buscar las 4imágenes con sus palabras subidas por el usuario
        traerAhorcadosPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

    }, [ mensaje,
        cargandoSubirAhorcado,
        // cargandoModificarImagen
    ] )

    const [ associatedWord, setAssociateWord ] = useState("")
    const [ pathImages, setPathImages ] = useState([])
    const [ selectedFiles, setSelectedFiles ] = useState([]);

    const handleImageChange = (e) => {
		if (e.target.files) {
			setSelectedFiles((prevImages) => prevImages.concat(e.target.files));
            Array.from(e.target.files).map((file) => {
                if (file.type.includes("image")) {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    
                    reader.onload = function load() {
                        setPathImages((prevImages) => prevImages.concat(reader.result))
                    }
                } else {
                    mostrarAlerta("Debe seleccionar archivos de tipo imagen, se admiten extensiones: jpeg, jpg, png y gif", "alerta-error")
                }
            });
		}
	};

    const resetImagesSelected = () => {
        setPathImages([])
        setSelectedFiles([])
        document.getElementById("file").value = "";
    }

    const renderPhotos = (source) => {
		// console.log('source: ', source);
		return source.map((photo) => {
			return <img className="imagesSelected" src={photo} alt="" key={photo} />;
		});
	};

    const onDelete = (id_ahorcado) => {
        eliminarAhorcado(id_ahorcado)
    }

    const onSubmit = e => {
        e.preventDefault()
        if ( associatedWord === "" ) {
            mostrarAlerta("Debe asignar una palabra a las 4 imágenes", 'alerta-error')
            return
        }
        if (selectedFiles.length === 0) {
            mostrarAlerta("Debe adjuntar solo 4 imágenes", 'alerta-error')
            return
        }

        if (selectedFiles[0].length != 4) {
            mostrarAlerta("Debe adjuntar solo 4 imágenes", 'alerta-error')
            return
        }
        
        console.log(associatedWord, selectedFiles)
        const formData = new FormData();
        for (let index = 0; index < selectedFiles[0].length; index++) {
            formData.append('images', selectedFiles[0][index]);
        }
        formData.append('associatedWord', associatedWord);
        guardarAhorcado(formData)

        // Resetear campos
        setAssociateWord("");
        setSelectedFiles([]);
        setPathImages([]);
        document.getElementById("file").value = "";
    }

    return (
        <Fragment>
            <Container className="div-uploadFourImagesOneWord" >
                <Grid container component="main" >
                    <Grid item xs={12} sm={8} md={12} elevation={6}>
                        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                        <form  onSubmit={onSubmit}  >
                        <Grid container spacing={5} >

                            <Grid item xs={12} >
                                <div>
                                    <input type="file" id="file" multiple onChange={handleImageChange} />
                                    <div className="label-holder">
                                        <div className="row" >
                                            <label htmlFor="file" className="label">
                                                <i className="material-icons" >Agregar 4 imágenes</i>
                                            </label>
                                            <Button
                                                className="buttonResetImages"
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => resetImagesSelected()}
                                            > Reiniciar selección </Button>
                                        </div>
                                    </div>
                                    <div className="result">{renderPhotos(pathImages)}</div>
                                </div>
                            </Grid>
                            <Grid item xs={8} style={{ marginBottom: "2%" }} >
                                <div className="div-associateWord" >                        
                                    <TextField
                                        className="textfield-associateWord"
                                        value={associatedWord}
                                        name="associateWord"
                                        variant="outlined"
                                        id="associateWord"
                                        label="Palabra asociada"
                                        onChange={e => setAssociateWord(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={2} style={{  }} >
                                <div className="div-submit-imageAndWord" >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="submit-imageAndWord"
                                        disabled={cargandoSubirAhorcado}
                                    >
                                        {
                                                cargandoSubirAhorcado
                                                ?
                                                <Grid container
                                                    direction="row"
                                                    justify="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item xs={11} style={{ color: "#000" }} >
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
                                                "Subir contenido"
                                        }
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                        </form>
                    </Grid>
                </Grid>
                
            </Container>
            <div className="div-datatable-fourImagesOneWord" >
                <DatatableFourImagesOneWord
                    hangmans={ahorcados}
                    deleteFunction={onDelete}
                    loadingDelete={cargandoEliminarAhorcado}
                />
            </div>
        </Fragment>
    );
}
 
export default UploadFourImagesOneWord;