import React, { useEffect, useContext, Fragment } from 'react';
import useState from 'react-usestateref';
import useInterval from "../useInterval";

import './uniqueSelection.css';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import UniqueSelectionContext from '../../../context/uniqueSelection/uniqueSelectionContext';
import profileContext from '../../../context/profile/profileContext';
import tagContext from '../../../context/tag/tagContext';
import TipContext from '../../../context/tips/tipContext';

import { Col, Container, Row, Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import ClipLoader from "react-spinners/ClipLoader";

import infoIcon from '../../../assets/info.svg';
import RewardNotification from '../../common/fire/RewardNotification';

import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';

import uploadImage from '../../../assets/img/upload_image.jpg';

const FourImagesOneWord = ( props ) => {
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const authContext = useContext(AuthContext)
    const { usuarioAutenticado} = authContext

    const uniqueSelectionContext = useContext(UniqueSelectionContext)
    const {
        seleccionesUnicas,
        obtenerSeleccionesUnicas
    } = uniqueSelectionContext

    const profilesContext = useContext(profileContext)
    const { perfil, obtenerPerfil, actualizarPerfil } = profilesContext

    const tipContext = useContext(TipContext)
    const { tips, largoTips, obtenerTips  } = tipContext

    const tagsContext = useContext(tagContext)
    const {
        recompensas,
        recompensasTareas,
        etiquetarSeleccionUnica,
        verTip,
        borrarRecompensasEtiquetas,
        borrarRecompensasEtiquetasTareas,
    } = tagsContext

    let seleccionUnicaActual = JSON.parse(localStorage.getItem("seleccionUnicaActual"))
    let tipActual = 0 
    if (tips.length > 0) {
        tipActual = Math.floor(Math.random() * (largoTips));
    }


    const [ , setNowProgress, nowProgressRef] = useState(0)
    const [ , setMaxProgress, maxProgressRef] = useState(0)
    const [ , setLabelProgress, labelProgressRef] = useState(0)
    const [ , setUserLeague, ] = useState('')

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
        usuarioAutenticado()
        obtenerPerfil()

        obtenerSeleccionesUnicas()
        
        if ( seleccionUnicaActual > 0 && seleccionesUnicas.length === 0 ) {
            localStorage.setItem( 'seleccionUnicaActual', 0 );
        }

        obtenerTips()
        // eslint-disable-next-line
    }, [])

    const [ isSkip, setIsSkip ] = useState(false)
    const [ isWinner, setIsWinner ] = useState(false)
    const [ points, setPoints ] = useState(0)
    const [ , setImageSelection, imageSelectionRef] = useState("")

    const skipGame = () => {
        setIsSkip(true)
        // Agregar atributo a Level, señalando el puntaje al siguiente nivel
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
        seleccionesUnicas.push(seleccionesUnicas[seleccionUnicaActual])

        // Avanzar a la siguiente imagen
        setTimeout(() => {
            localStorage.setItem( 'seleccionUnicaActual', seleccionUnicaActual + 1 );
            setTimeout(() => {
                setNewContent(false)
            }, 1000);
        }, 1000);
    }

    const onRender = () => {
        if ( imageSelectionRef.current === "" ) {
            mostrarAlerta('Debes seleccionar una imagen', 'alerta-error')
            return
        }
        etiquetarSeleccionUnica(seleccionesUnicas[seleccionUnicaActual]._id, seleccionesUnicas[seleccionUnicaActual].keyWord)
        setIsWinner(true)

        let addPoints = 15;
        setPoints(addPoints)
        setUserPoints( prevTime => prevTime + addPoints)
        setNowProgress( userPointsRef.current )
        setMaxProgress( perfil.league_id.pointsNextLeague )
        setLabelProgress( ((nowProgressRef.current / maxProgressRef.current) * 100).toPrecision(3) )
        setUserLeague( perfil.league_id.league )
        perfil.score = perfil.score + addPoints;
        if ( perfil.score >= perfil.league_id.pointsNextLeague ) {
            perfil.league_id = perfil.league_id.league
            obtenerPerfil()
        }
        actualizarPerfil(perfil)
        setTimeout(() => {
            setIsWinner(false)
        }, 2000);
        
        setNewContent(true);
        // Avanzar a la siguiente S. Única
        if ( seleccionUnicaActual < seleccionesUnicas.length - 1 ) {
            // console.log("aun quedan SU")
            setTimeout(() => {
                localStorage.setItem( 'seleccionUnicaActual', seleccionUnicaActual + 1 );
                setTimeout(() => {
                    setNewContent(false)
                }, 1000);
            }, 1000);
        } else {
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
                        text: "No se encuentran más S. Únicas disponibles",
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
        let addPoints = 5;
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
    let colorProgress = labelProgressRef.current < 50 ? "success" : labelProgressRef.current < 80 ? "warning" : "danger";
    
    return (
        <Container fluid className="backgroundGif"  >
            {
                perfil != null && perfil.league_id.league === "Oro" // editar, es Oro
                ?
                    <>
                        <div className="topCenter4" >
                            <Row className="rowTitle4" >
                                <Col className="align-self-center" >
                                    <Typography component="span" variant="h4" className="levelTitle4" >
                                        {/* { perfil ? `Nivel ${perfil.level_image_id.level}` : null} */}
                                        Selección Única
                                    </Typography>
                                </Col>
                                <Col >
                                {perfil
                                ?
                                    <Fragment>
                                        <p className="progressTitle4" > {perfil.league_id.league} </p>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip className="" id="button-tooltip-1" > Puntos: {nowProgressRef.current} </Tooltip>}
                                        >
                                            <ProgressBar max={maxProgressRef.current} className="userProgress4" variant={colorProgress} animated striped  now={nowProgressRef.current}  
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

                        <div className="text-tagImages" >
                            ¡Sólo debes seleccionar una imagen que este relacionada a la palabra clave!. ¡si saltas perderás puntos!
                        </div>

                        {
                            seleccionesUnicas.length !== 0 
                            ?
                                newContent === false
                                ?
                                    <div className="UniqueSelection container">
                                        <Row className="three-images" >
                                                <label className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 " >
                                                    <input type="radio" name="imageSelectionRef" value="small"/>
                                                    <img alt="" className="imagesUniqueSelectionGame" src={ seleccionesUnicas[seleccionUnicaActual].imageUrl_1 } onClick={ () => {setImageSelection("small")} } />
                                                </label>

                                                <label className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 " >
                                                    <input type="radio" name="imageSelectionRef" value="big" />
                                                    <img alt="" className="imagesUniqueSelectionGame" src={ seleccionesUnicas[seleccionUnicaActual].imageUrl_2 } onClick={ () => {setImageSelection("big")} } />
                                                </label>

                                                <label className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 labelOnlyImageUS" >
                                                    <input type="radio" name="imageSelectionRef" value="large" />
                                                    <img alt="" className="imagesUniqueSelectionGame" src={ seleccionesUnicas[seleccionUnicaActual].imageUrl_3 } onClick={ () => {setImageSelection("large")} } />
                                                </label>
                                        </Row>
                                        <Row className="div-keyWord mb-5" >
                                            <div className="col" >
                                                <p> Palabra clave </p>
                                                <div className="wrap keyWord-game" >
                                                    <span className="burn" > {seleccionesUnicas[seleccionUnicaActual].keyWord} </span>
                                                </div>
                                            </div>
                                        </Row>
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
                                                <Tooltip className="tooltipTagImage" id="help-icon-tooltip-1" > Debe seleccionar la imagen que más se relacione con la palabra clave.
                                                </Tooltip>
                                                }
                                                >
                                                    <HelpIcon className="help-icon-tagImage" color="primary" />
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                    </div>
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
                                    <div className="no-images" >
                                        <span className="spansito-no-images" > Aún no existen Selecciones Únicas habilitadas </span>
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
 
export default FourImagesOneWord;