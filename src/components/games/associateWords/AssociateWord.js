import React, { useEffect, useContext, Fragment } from 'react';
import useState from 'react-usestateref';
import useInterval from "../useInterval";
import { useDisclosure } from "@chakra-ui/react"

import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import wordContext from '../../../context/words/wordContext';
import profileContext from '../../../context/profile/profileContext';
import categoryContext from '../../../context/categories/categoryContext';
import tagContext from '../../../context/tag/tagContext';
import TipContext from '../../../context/tips/tipContext';

import Fire from '../../common/fire/Fire';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { withRouter } from 'react-router-dom';

import { Col, Container, Row, Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import ClipLoader from "react-spinners/ClipLoader";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import "./associateWord.css";
import RewardNotification from '../../common/fire/RewardNotification';

import infoIcon from '../../../assets/info.svg';
import HelpIcon from '@material-ui/icons/Help';

import uploadImage from '../../../assets/img/upload_image.jpg';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";

const AssociateWords = ( props ) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer la información de autentificación del usuario
    const authContext = useContext(AuthContext)
    const { usuarioAutenticado} = authContext

    // Extraer la información de el context de Palabras
    const wordsContext = useContext(wordContext)
    const { palabras, largoPalabras, obtenerPalabras  } = wordsContext

    // Extraer la información del context de perfiles
    const profilesContext = useContext(profileContext)
    const { perfil, obtenerPerfil, actualizarPerfil } = profilesContext

    // Extraer la información de el context de los tips
    const tipContext = useContext(TipContext)
    const { tips, largoTips, obtenerTips  } = tipContext

    // Extraer la información del context de niveles
    const categoriesContext = useContext(categoryContext)
    const { categoriasVisibles, obtenerCategoriasVisibles } = categoriesContext

    // Extraer la información del context de etiquetar
    const tagsContext = useContext(tagContext)
    const {
        recompensas,
        recompensasTareas,
        porcentajeEtiquetaPalabra,
        etiquetarPalabra,
        verTip,
        borrarRecompensasEtiquetas,
        borrarRecompensasEtiquetasTareas,
        borrarPorcentajePalabra,
    } = tagsContext

    let palabraActual = JSON.parse(localStorage.getItem("palabraActual"))
    let tipActual = 0 
    if (tips.length > 0) {
        tipActual = Math.floor(Math.random() * (largoTips));
    }

    // top profile info
    const [ , setNowProgress, nowProgressRef] = useState(0)
    const [ , setMaxProgress, maxProgressRef] = useState(0)
    const [ , setLabelProgress, labelProgressRef] = useState(0)
    const [ , setUserLeague, userLeagueRef] = useState('')

    const [ newContent, setNewContent ] = useState(false)
    const [ tipReceive, setTipReceive ] = useState(false)
    const [  , setUserPoints, userPointsRef ] = useState(
        perfil != null ? perfil.score : 0
    )

    const CustomToast = ({closedToast}) => {
        return (
            <div className={`notification-container`}>
                <div className="notification-image">
                    <img src={infoIcon} alt="" />
                </div>
                <div className="body-container-notify">
                    <h5 className="notification-title"> Aprendiendo con E-ncendio </h5>
                    <img  src={tips[tipActual].urlFile !== "" ? tips[tipActual].urlFile : uploadImage} alt="Snow"  />
                    <p>
                        {tips[tipActual].text}
                    </p>
                </div>
            </div>
        )
    }

    toast.configure()
    const notify = () => {
        toast.info(<CustomToast />,
            {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 8000,
                closeOnClick: false,
            }
        )
    }

    useEffect(() => {
        // Traer el perfil del usuario score, etc. /api/user/{id}/profile
        usuarioAutenticado()
        // Para mostrar su nivel y con progress bar indicarle lo que le 
        // falta para subir al otro nivel del jugador
        obtenerPerfil()

        // Traer las categorías posibles /api/categories
        obtenerCategoriasVisibles()

        // Traer las Palabras del nivel correspondiente /api/league/{id}/words 
        obtenerPalabras()

        // Traer los tips disponibles
        obtenerTips()

        // eslint-disable-next-line
    }, [])

    const [ isWinner, setIsWinner ] = useState(false)
    const [ isSkip, setIsSkip ] = useState(false)
    const [ points, setPoints ] = useState(0)

    const { onClose } = useDisclosure()

    const [ checked, setChecked ] = useState({
        prevencion: false,
        mitigacion: false,
        riesgo: false,
        combate: false,
        impacto: false,
        recuperacion: false,
        amenaza: false,

        selected: null
    })
    const transformSelected = (selectedCategory) => {
        switch (selectedCategory) {
            case 'prevencion':
                return "Prevención" 

            case 'mitigacion':
                return "Mitigación"
                
            case 'riesgo':
                return "Riesgo" 

            case 'combate':
                return "Combate"

            case 'impacto':
                return "Impacto"
                
            case 'recuperacion':
                return "Recuperación" 

            case 'amenaza':
                return "Amenaza"
        
            default:
                return selectedCategory;
        }
    }

    const onCheck = (name, val) => {
        const checkboxes = checked;
        for (let key in checkboxes) {
            checkboxes[key] = false;
        }
        checkboxes[name] = true;
        checkboxes.selected = val;
        setChecked({ ...checked, checkboxes });        
    }

    const skipGame = () => {
        setIsSkip(true)
        let addPoints = -15;
        setPoints(addPoints)
        setUserPoints( prevTime => prevTime + addPoints)
        setNowProgress( userPointsRef.current )
        setMaxProgress( perfil.league_id.pointsNextLeague )
        setLabelProgress( ((nowProgressRef.current / maxProgressRef.current) * 100).toPrecision(3) )
        setUserLeague( perfil.league_id.league )
        perfil.score = perfil.score + addPoints;
        if ( perfil.score <= perfil.league_id.pointsPreviousLeague ) {
            perfil.dropLeague = true;
            perfil.league_id = perfil.league_id.league
            obtenerPerfil()
        }
        actualizarPerfil(perfil)
        setTimeout(() => {
            setIsSkip(false)
        }, 2000);
        
        setNewContent(true);
        setChecked({
            prevencion: false,
            mitigacion: false,
            riesgo: false,
            combate: false,
            impacto: false,
            recuperacion: false,
            amenaza: false,
    
            selected: null
        })
        palabras.push(palabras[palabraActual])

        // Avanzar a la siguiente palabra
        setTimeout(() => {
            localStorage.setItem( 'palabraActual', palabraActual + 1 );
            setTimeout(() => {
                setNewContent(false)
            }, 1000);
        }, 1000);
    }

    const onRender = () => {
        if ( checked.selected == null ) {
            mostrarAlerta('Debes seleccionar una Categoría', 'alerta-error')
            return
        }

        let categoriaSeleccionada = transformSelected(checked.selected)
        categoriaSeleccionada = categoriasVisibles.find(e => e.name === categoriaSeleccionada);
        etiquetarPalabra(palabras[palabraActual]._id, categoriaSeleccionada._id)
        setIsWinner(true)
        // Calcular y sumar puntos ganados al perfil /api/profile/{profile_id}
        // Revisar si sube de nivel de perfil, misma función de API
        // Agregar atributo a Level, señalando el puntaje al siguiente nivel
        let addPoints = 0;
        if (perfil.league_id.league === "Plata") addPoints = 15; else addPoints = 7;
        setPoints(addPoints)
        setUserPoints( prevTime => prevTime + addPoints)
        setNowProgress( userPointsRef.current )
        setMaxProgress( perfil.league_id.pointsNextLeague )
        setLabelProgress( ((nowProgressRef.current / maxProgressRef.current) * 100).toPrecision(3) )
        setUserLeague( perfil.league_id.league )
        perfil.score = perfil.score + addPoints;
        if ( perfil.score >= perfil.league_id.pointsNextLeague ) {
            perfil.league_id = perfil.league_id.league
        }
        actualizarPerfil(perfil)
        setTimeout(() => {
            setIsWinner(false)
        }, 2000);
        
        setNewContent(true);
        setChecked({
            prevencion: false,
            mitigacion: false,
            riesgo: false,
            combate: false,
            impacto: false,
            recuperacion: false,
            amenaza: false,
    
            selected: null
        })
        
        // Avanzar a la siguiente Palabra
        if ( palabraActual < largoPalabras - 1 ) {
            setTimeout(() => {
                localStorage.setItem( 'palabraActual', palabraActual + 1 );
                setTimeout(() => {
                    setNewContent(false)
                }, 1000);
            }, 1000);
        } else {
            // Revisar si sube de nivel de Palabras? /api/user/{id}/level-word


            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¡Agradecemos enormemente su participación!',
                icon: 'success',
                confirmButtonText: `Salir`,
                allowOutsideClick: false,
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Acaba de finalizar el juego',
                        text: "No se encuentran más palabras disponibles",
                    })
                    
                    setTimeout(() => {
                        props.history.push('/games')
                    }, 3000);
                }
            })
        }
    }

    useInterval(() => {
        notify()
        verTip(tips[tipActual]._id)
        setTipReceive(true)
        let addPoints = 0;
        switch (perfil.league_id.league) {
            case "Plata":
                addPoints = 7;
                break;

            case "Oro":
                addPoints = 5;
                break;
        
            default:
                break;
        }
        setPoints(addPoints)
        setUserPoints( prevTime => prevTime + addPoints)
        setNowProgress( userPointsRef.current )
        setMaxProgress( perfil.league_id.pointsNextLeague )
        setLabelProgress( ((nowProgressRef.current / maxProgressRef.current) * 100).toPrecision(3) )
        setUserLeague( perfil.league_id.league )
        tipActual = Math.floor(Math.random() * (largoTips));
        setTimeout(() => {
            perfil.score = userPointsRef.current;
            if ( perfil.score >= perfil.league_id.pointsNextLeague ) {
                perfil.league_id = perfil.league_id.league
            }
            actualizarPerfil(perfil)
            setTipReceive(false)
        }, 1500);
    }, 60000)

    if (nowProgressRef.current === 0 && perfil != null) {
        setUserPoints( perfil.score )
        setNowProgress( userPointsRef.current )
        setMaxProgress( perfil.league_id.pointsNextLeague )
        setLabelProgress( ((nowProgressRef.current / maxProgressRef.current) * 100).toPrecision(3) )
        setUserLeague( perfil.league_id.league )
    }
    if (perfil!= null && perfil.league_id.league !== userLeagueRef.current) {
        setUserPoints( perfil.score )
        setNowProgress( userPointsRef.current )
        setMaxProgress( perfil.league_id.pointsNextLeague )
        setLabelProgress( ((nowProgressRef.current / maxProgressRef.current) * 100).toPrecision(3) )
        setUserLeague( perfil.league_id.league )
    }
    let colorProgress = labelProgressRef.current < 50 ? "success" : labelProgressRef.current < 80 ? "warning" : "danger";
    return (
        <Container fluid className="backgroundGif" >
            {
                perfil !== null && perfil.league_id.league !== "Bronce"
                ?
                    <>
                    <div className="topCenter" >
                        <Row className="rowTitle" >
                            <Col >
                                <Typography variant="h4" className="levelTitle" >
                                    {/* { perfil ? `Nivel ${perfil.level_word_id.level}` : null} */}
                                    Etiquetar palabras
                                </Typography>
                            </Col>
                            <Col >
                            {perfil
                            ?
                                <Fragment>
                                    <p className="progressTitle" > {perfil.league_id.league} </p>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip className="" id="button-tooltip-1" > Puntos: {nowProgressRef.current} </Tooltip>}
                                    >
                                        <ProgressBar max={maxProgressRef.current} className="userProgress" variant={colorProgress} animated striped  now={nowProgressRef.current}  
                                                    label={(<span style={{ color: 'black', position: "absolute", right: "50%", left: "45%" }} > {labelProgressRef.current}% </span>)}
                                        />
                                    </OverlayTrigger>
                                    <p className={isWinner === true | tipReceive === true ? "final-text winner" : isSkip === true ? "final-text gameover" : "final-text"} > {isWinner === true | tipReceive === true ? "+" : ""}{points} puntos </p>
                                </Fragment>
                            : null
                            }
                            </Col>
                        </Row>
                        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                    </div>

                    {recompensas !== null
                        ?
                            <RewardNotification
                                recompensas={recompensas}
                                borrarRecompensas={borrarRecompensasEtiquetas}
                            />
                        : null
                    }

                    {recompensasTareas !== null
                        ?
                            <RewardNotification
                                recompensas={recompensasTareas}
                                borrarRecompensas={borrarRecompensasEtiquetasTareas}
                            />
                        : null
                    }

                    <div className="text-tagWords" >
                        ¡Sólo debes seleccionar una categoría que este relacionada a la palabra, si saltas perderás puntos!
                    </div>

                    <>
                        <Modal
                            closeOnOverlayClick={false}
                            isOpen={porcentajeEtiquetaPalabra !== null && porcentajeEtiquetaPalabra!== undefined ? true : false} 
                            onClose={() => {onClose(); borrarPorcentajePalabra();}}
                            isCentered
                            >
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader> ¡Dato importante! </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                El {porcentajeEtiquetaPalabra}% de las personas que etiquetaron esta palabra pensaron lo mismo que tú
                            </ModalBody>

                            <ModalFooter>
                                <Button onClick={() => {onClose(); borrarPorcentajePalabra();}}> Ok </Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>

                    { palabras.length !== 0
                        ?
                            newContent === false
                            ?
                                <>
                                    <div className="row mainDiv-tagImages" >
                                        <div className="col" >
                                            <Paper className="paper" elevation={10} variant="outlined"  >
                                                {palabras[palabraActual].name}
                                            </Paper>
                                        </div>
                                        <div className="col" >
                                                <>
                                                    <div className="row">
                                                        {categoriasVisibles.length !== 0
                                                        ?
                                                            categoriasVisibles.map((categoria, index) =>
                                                                <div key={index} className="col-sm-6 col-md-6" >
                                                                    <Fire name={categoria.name.charAt(0).toLowerCase() + categoria.name.slice(1)} value={categoria.name} selected={checked[categoria.name.charAt(0).toLowerCase() + categoria.name.slice(1)]} onCheck={onCheck}
                                                                        title=""
                                                                        placement="left"
                                                                    />
                                                                </div>
                                                            )
                                                        :
                                                            <div className="text-center position-relative" style={{ top: "50%" }} >
                                                                <ClipLoader
                                                                    color={"#000"}
                                                                    loading={true}
                                                                    size={70}
                                                                />
                                                            </div>
                                                        }
                                                    </div>
                                                </>
                                        </div>
                                    </div>
                                    <Row className="bottomCenter-images" >
                                        <Col xs={5} >
                                            <Button className="botonSaltar" variant="danger" onClick={ () => skipGame() } > Saltar </Button>{' '}
                                        </Col>
                                        <Col xs={5} >
                                            <Button className="botonSiguiente" variant="success" onClick={ () => onRender() } > Siguiente </Button>{' '}
                                        </Col>
                                        <Col xs={2} >
                                            <OverlayTrigger
                                                key={9}
                                                placement={"top"}
                                                overlay={
                                            <Tooltip className="tooltipTagImage" id="help-icon-tooltip-1" > Debe seleccionar la categoría que considere que se asocie más a la imagen
                                            </Tooltip>
                                            }
                                            >
                                                <HelpIcon className="help-icon-tagImage" color="primary" />
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </>
                                // <div>
                                //     <div className="center">
                                //         <div className="row">
                                //             <div className="col categoritas" style={{ marginRight: "-10%" }} >
                                //                 <Fire name="riesgo" value="Riesgo" selected={checked['riesgo']} onCheck={onCheck}
                                //                     title="Superficie con peligro de provocar un incendio."
                                //                     placement="left"
                                //                 />
                                //             </div>
                                //             <div className="col categoritas" style={{ marginRight: "-10%" }} >
                                //                 <Fire name="prevencion" value="Prevención" selected={checked['prevencion']} onCheck={onCheck}
                                //                     title="Se aprecian medidas para evitar un incendio."
                                //                     placement="top"
                                //                 />
                                //             </div>
                                //             <div className="col categoritas" >
                                //                 <Fire name="recuperacion" value="Recuperación" selected={checked['recuperacion']} onCheck={onCheck}
                                //                     title="Terreno que pasa por período de transformación para recuperarse de un incendio."
                                //                     placement="right"
                                //                 />
                                //             </div>
                                //         </div>
                                //         <div className="row">
                                //             <div className="col categoritas" style={{ marginRight: "-4%" }} >
                                //                 <Fire name="mitigacion" value="Mitigación" selected={checked['mitigacion']} onCheck={onCheck}
                                //                     title="Se pueden ver técnicas para buscar reducir al máximo los efectos potenciales de un incendio."
                                //                     placement="left"
                                //                 />
                                //             </div>
                                //             <div className="col palabra" >
                                //                 { palabras.length === 0
                                //                 ? null
                                //                 :
                                //                     <Col>
                                //                         <Paper className="paper" elevation={10} variant="outlined"  >
                                //                             {palabras[palabraActual].name}
                                //                         </Paper>
                                //                     </Col>
                                //                 }
                                //             </div>
                                //             <div className="col categoritas" style={{ marginLeft: "-1%" }} >
                                //                 <Fire name="amenaza" value="Amenaza" selected={checked['amenaza']} onCheck={onCheck}
                                //                     title="Estado preocupante o amenazante en el cual el incendio llegue a ser muy grave y casi incontrolable."
                                //                     placement="right"
                                //                 />
                                //             </div>
                                //         </div>
                                //         <div className="row">
                                //             <div className="col categoritas" style={{ marginRight: "-10%" }} >
                                //                 <Fire name="impacto" value="Impacto" selected={checked['impacto']} onCheck={onCheck}
                                //                     title="Consecuencias post-incendio del terreno."
                                //                     placement="left"
                                //                 />
                                //             </div>
                                //             <div className="col categoritas">
                                //             </div>
                                //             <div className="col categoritas" style={{ marginLeft: "-10%" }} >
                                //                 <Fire name="combate" value="Combate" selected={checked['combate']} onCheck={onCheck}
                                //                     title="Se trata de contener al incendio, para detener su avance."
                                //                     placement="right"
                                //                 />
                                //             </div>
                                //         </div>
                                //     </div>
                    
                                //     <div className="bottomCenter" >
                                //         <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
                                //             <Col xs={11} >
                                //                 <Button className="botonSiguiente" variant="success" onClick={ () => onRender() } > Siguiente </Button>{' '}
                                //             </Col>
                                //             <Col xs={1} >
                                //                 <OverlayTrigger
                                //                     key={9}
                                //                     placement={"top"}
                                //                     overlay={
                                //                 <Tooltip className="tooltipTagWord" id="help-icon-tooltip-1" > Selecciona la categoría que represente mejor al texto mostrado.
                                //                 </Tooltip>
                                //                 }
                                //                 >
                                //                     <HelpIcon className="help-icon-tagImage" color="primary" />
                                //                 </OverlayTrigger>
                                //             </Col>
                                //         </Row>
                                //     </div>
                                // </div>
                            :
                                <div className="text-center position-relative" style={{ top: "50%" }} >
                                    <ClipLoader
                                        color={"#000"}
                                        loading={true}
                                        size={70}
                                    />
                                </div>
                    :
                        <div className="container" >
                            <div className="no-words" >
                                <span className="spansito-no-words" > Aún no existen palabras habilitadas </span>
                            </div>
                        </div>
                    }
                    </>
                :
                    <div className="container" >
                        <div className="no-words" >
                            <span className="spansito-no-words" > Usted aún no puede entrar a este juego, ¡aumente sus puntos! </span>
                        </div>
                    </div>
            }
        </Container>
    );
}
 
export default withRouter(AssociateWords);