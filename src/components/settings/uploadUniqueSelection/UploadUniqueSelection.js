import React, { useEffect, useContext, Fragment } from 'react';
import useState from 'react-usestateref';

import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import UniqueSelectionContext from '../../../context/uniqueSelection/uniqueSelectionContext';

import './uploadUniqueSelection.css';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';

import ClipLoader from "react-spinners/ClipLoader";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Col} from 'react-bootstrap';

import DatatableUniqueSelection from './datatableUniqueSelection/DatatableUniqueSelection';

import RewardNotification from '../../common/fire/RewardNotification';

const UploadUniqueSelection = () => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    const uniqueSelectionContext = useContext(UniqueSelectionContext)
    const { seleccionesUnicas,
        recompensasSubirSeleccionUnica,
        recompensasTareasSubirSeleccionUnica,
        traerSeleccionesUnicasPorUsuario,
        cargandoSubirSeleccionUnica,
        cargandoEliminarSeleccionUnica,
        eliminarSeleccionUnica,
        guardarSeleccionUnica,
        borrarRecompensasSubirSeleccionUnica,
        borrarRecompensasTareasSubirSeleccionUnica,
    } = uniqueSelectionContext

    useEffect(() => {
        // Ir a buscar las selecciones únicas subidas por el usuario
        traerSeleccionesUnicasPorUsuario();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [ mensaje,
        cargandoSubirSeleccionUnica,
    ] )

    const [ keyWord, setKeyWord ] = useState("")
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
        document.getElementById("fileUniqueSelection").value = "";
    }

    const renderPhotos = (source) => {
		// console.log('source: ', source);
		return source.map((photo) => {
			return <img className="imagesSelected" src={photo} alt="" key={photo} />;
		});
	};

    const onDelete = (id_seleccionUnica) => {
        eliminarSeleccionUnica(id_seleccionUnica)
    }

    const onSubmit = e => {
        e.preventDefault()
        if ( keyWord === "" ) {
            mostrarAlerta("Debe asignar la palabra clave", 'alerta-error')
            return
        }
        if (/\s/.test(keyWord)) {
            mostrarAlerta("Debe asignar la palabra sin espacios ", 'alerta-error')
            return
        }
        if (selectedFiles.length === 0) {
            mostrarAlerta("Debe adjuntar 3 imágenes", 'alerta-error')
            return
        }

        if (selectedFiles.length !== 3) {
            mostrarAlerta("Debe adjuntar solo 3 imágenes", 'alerta-error')
            return
        }
        
        const formData = new FormData();
        for (let index = 0; index < selectedFiles.length; index++) {
            formData.append('images', selectedFiles[index]);
        }
        formData.append('keyWord', keyWord.toLowerCase());
        guardarSeleccionUnica(formData)

        // Resetear campos
        setKeyWord("");
        setSelectedFiles([]);
        setPathImages([]);
        document.getElementById("fileUniqueSelection").value = "";
    }

    return (
        <Fragment>

            {recompensasSubirSeleccionUnica !== null
                ?
                    <RewardNotification
                        recompensas={recompensasSubirSeleccionUnica}
                        borrarRecompensas={borrarRecompensasSubirSeleccionUnica}
                    />
                : null
            }

            {recompensasTareasSubirSeleccionUnica !== null
                ?
                    <RewardNotification
                        recompensas={recompensasTareasSubirSeleccionUnica}
                        borrarRecompensas={borrarRecompensasTareasSubirSeleccionUnica}
                    />
                : null
            }

            <Container className="div-uniqueSelection" >
                <Grid container component="main" className="justify-content-center" >
                    <Grid item xs={12} sm={8} md={12} elevation={6}>
                        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                        <form  onSubmit={onSubmit}  >
                        <Grid container spacing={0} >

                            <Grid item xs={12} >
                                <div>
                                    <input type="file" id="fileUniqueSelection" multiple onChange={handleImageChange} />
                                    <div className="label-holderUploadUniqueSelection">
                                        <div className="row justify-content-center" >
                                            <label htmlFor="fileUniqueSelection" className="labelUploadUniqueSelection">
                                                <i className="material-icons" >Agregar 3 imágenes</i>
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
                            <Grid item xs={6} style={{ marginBottom: "2%" }} >
                                <div className="div-keyWord" >                        
                                    <TextField
                                        className="textfield-keyWord"
                                        value={keyWord}
                                        name="keyWord"
                                        variant="outlined"
                                        id="keyWord"
                                        label="Palabra clave"
                                        onChange={e => setKeyWord(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6} style={{  }} >
                                <div className="row d-inline-block" >
                                    <Col >
                                        <div className="div-submit-imagesAndKeyWord" >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className="submit-imagesAndKeyWord"
                                                disabled={cargandoSubirSeleccionUnica}
                                            >
                                                {
                                                    cargandoSubirSeleccionUnica
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
                                    <Col className="divHelpIconUploadUniqueSelection" >
                                        <OverlayTrigger
                                            key={9}
                                            placement={"top"}
                                            overlay={
                                        <Tooltip className="tooltipUploadUniqueSelection" id="help-icon-tooltip-1" >
                                            Deben ser 3 imágenes y una palabra clave donde solo una de ellas se relacione directamente con la palabra.
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
                <DatatableUniqueSelection
                    uniqueSelections={seleccionesUnicas}
                    deleteFunction={onDelete}
                    loadingDelete={cargandoEliminarSeleccionUnica}
                />
            </div>
        </Fragment>
    );
}
 
export default UploadUniqueSelection;