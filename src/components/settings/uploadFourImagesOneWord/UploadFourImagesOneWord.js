import React, { useEffect, useContext, Fragment } from 'react';
import useState from 'react-usestateref';

import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import FourImagesOneWordContext from '../../../context/fourImagesOneWord/fourImagesOneWordContext';

import './uploadFourImagesOneWord.css';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';

import ClipLoader from "react-spinners/ClipLoader";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Col} from 'react-bootstrap';

import DatatableFourImagesOneWord from './datatableFourImagesOneWord/DatatableFourImagesOneWord';

import RewardNotification from '../../common/fire/RewardNotification';

const UploadFourImagesOneWord = () => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    const fourImagesOneWordContext = useContext(FourImagesOneWordContext)
    const { ahorcados,
        recompensasSubirAhorcado,
        recompensasTareasSubirAhorcado,
        traerAhorcadosPorUsuario,
        cargandoSubirAhorcado,
        cargandoEliminarAhorcado,
        eliminarAhorcado,
        guardarAhorcado,
        borrarRecompensasSubirAhorcado,
        borrarRecompensasTareasSubirAhorcado,
    } = fourImagesOneWordContext

    useEffect(() => {
        // Ir a buscar las 4imágenes con sus palabras subidas por el usuario
        traerAhorcadosPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [ mensaje,
        cargandoSubirAhorcado,
        // cargandoModificarImagen
    ] )

    const [ associatedWord, setAssociateWord ] = useState("")
    const [ pathImages, setPathImages ] = useState([])
    const [ selectedFiles, setSelectedFiles,   ] = useState([]);

    const handleImageChange = (e) => {
		if (e.target.files) {
            for (let file of e.target.files) {
                setSelectedFiles((prevImages) => prevImages.concat(file));
            }
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
                return console.log("a")
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
            mostrarAlerta("Debe asignar UNA palabra a las 4 imágenes", 'alerta-error')
            return
        }
        if (/\s/.test(associatedWord)) {
            mostrarAlerta("Debe asignar UNA sola palabra SIN espacios ", 'alerta-error')
            return
        }
        if (selectedFiles.length === 0) {
            mostrarAlerta("Debe adjuntar solo 4 imágenes", 'alerta-error')
            return
        }

        if (selectedFiles.length !== 4) {
            mostrarAlerta("Debe adjuntar solo 4 imágenes", 'alerta-error')
            return
        }
        
        const formData = new FormData();
        for (let index = 0; index < selectedFiles.length; index++) {
            formData.append('images', selectedFiles[index]);
        }
        formData.append('associatedWord', associatedWord.toLowerCase());
        guardarAhorcado(formData)

        // Resetear campos
        setAssociateWord("");
        setSelectedFiles([]);
        setPathImages([]);
        document.getElementById("file").value = "";
    }

    return (
        <Fragment>

            {recompensasSubirAhorcado !== null
                ?
                    <RewardNotification
                        recompensas={recompensasSubirAhorcado}
                        borrarRecompensas={borrarRecompensasSubirAhorcado}
                    />
                : null
            }

            {recompensasTareasSubirAhorcado !== null
                ?
                    <RewardNotification
                        recompensas={recompensasTareasSubirAhorcado}
                        borrarRecompensas={borrarRecompensasTareasSubirAhorcado}
                    />
                : null
            }

            <Container className="div-uploadFourImagesOneWord" >
                <Grid container component="main" className="justify-content-center" >
                    <Grid item xs={12} sm={8} md={12} elevation={6}>
                        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                        <form  onSubmit={onSubmit}  >
                        <Grid container spacing={0} >

                            <Grid item xs={12} >
                                <div className="">
                                    <input type="file" id="file" multiple onChange={handleImageChange} />
                                    <div className="label-holderUploadHangman">
                                        <div className="row justify-content-center" >
                                            <label htmlFor="file" className="labelUploadHangman">
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
                            <Grid item xs={6}  >
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
                            <Grid item xs={6} style={{  }} >
                                <div className="row" >
                                    <Col >
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
                                    </Col>
                                    <Col className="divHelpIconUploadHangman" >
                                        <OverlayTrigger
                                            key={9}
                                            placement={"top"}
                                            overlay={
                                        <Tooltip className="tooltipUploadHangman" id="help-icon-tooltip-1" >
                                            Deben ser 4 imágenes con alguna relación con incedios y la palabra estar efectivamente plasmada en cada una de ellas.
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