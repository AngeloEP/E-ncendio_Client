import React, { useEffect, useContext, Fragment } from 'react';
import useState from 'react-usestateref';
import useInterval from "../useInterval";

import './fourImagesOneWord.css';

import step0 from "../../../assets/img/hangman/0.jpg";
import step1 from "../../../assets/img/hangman/1.jpg";
import step2 from "../../../assets/img/hangman/2.jpg";
import step3 from "../../../assets/img/hangman/3.jpg";
import step4 from "../../../assets/img/hangman/4.jpg";
import step5 from "../../../assets/img/hangman/5.jpg";
import step6 from "../../../assets/img/hangman/6.jpg";

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import FourImagesOneWordContext from '../../../context/fourImagesOneWord/fourImagesOneWordContext';
import profileContext from '../../../context/profile/profileContext';
import tagContext from '../../../context/tag/tagContext';
import TipContext from '../../../context/tips/tipContext';

import { Col, Container, Row } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import ClipLoader from "react-spinners/ClipLoader";

import infoIcon from '../../../assets/info.svg';
import RewardNotification from '../../common/fire/RewardNotification';

import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';

const FourImagesOneWord = ( props ) => {
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta } = alertaContext

    // Extraer la información de autentificación del usuario
    const authContext = useContext(AuthContext)
    const { usuarioAutenticado} = authContext

    // Extraer la información de el context de Palabras
    const fourImagesOneWordContext = useContext(FourImagesOneWordContext)
    const { ahorcados, largoAhorcados, obtenerAhorcados  } = fourImagesOneWordContext

    // Extraer la información del context de perfiles
    const profilesContext = useContext(profileContext)
    const { perfil, obtenerPerfil, actualizarPerfil } = profilesContext

    // Extraer la información de el context de los tips
    const tipContext = useContext(TipContext)
    const { tips, largoTips, obtenerTips  } = tipContext

    // Extraer la información del context de etiquetar
    const tagsContext = useContext(tagContext)
    const {
        recompensas,
        recompensasTareas,
        etiquetarAhorcado,
        verTip,
        borrarRecompensasEtiquetas,
        borrarRecompensasEtiquetasTareas,
    } = tagsContext

    let ahorcadoActual = JSON.parse(localStorage.getItem("ahorcadoActual"))
    const [answer, setAnswer, answerRef] = useState( "" )
    if (ahorcados.length > 0 && answerRef.current !== ahorcados[ahorcadoActual].associatedWord ) {
        setAnswer(ahorcados[ahorcadoActual].associatedWord)
    }
    let tipActual = 0 
    if (tips.length > 0) {
        tipActual = Math.floor(Math.random() * (largoTips));
    }

    const [winnerWord, setWinnerWord, winnerWordRef] = useState(false)

    // top profile info
    const [ , setNowProgress, nowProgressRef] = useState(0)
    const [ , setMaxProgress, maxProgressRef] = useState(0)
    const [ , setLabelProgress, labelProgressRef] = useState(0)
    const [ , setUserLeague, userLeagueRef] = useState('')

    const [ newContent, setNewContent ] = useState(false)
    const [ tipReceive, setTipReceive ] = useState(false)
    const [  , setPoints, pointsRef ] = useState(0)
    const [  , setUserPoints, userPointsRef ] = useState(
        perfil != null ? perfil.score : 0
    )

    const CustomToast = ({closedToast}) => {
        return (
            <div className={`notification-container`}>
                <div className="notification-image">
                    <img src={infoIcon} alt="" />
                </div>
                <div>
                    <p className="notification-title"> Aprendiendo con E-ncendio </p>
                    <p className="notification-message">
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

        // Traer las imágenes y palabra del nivel correspondiente /api/league/{id}/words 
        obtenerAhorcados()

        // Traer los tips disponibles
        obtenerTips()
        // eslint-disable-next-line
    }, [])

    const [ maxWrong, ] = useState(6)
    const [ mistake, setMistake] = useState(0)
    const [ num, setNum] = useState(0)
    const [ guessed, setGuessed] = useState("")
    const [ images, ] = useState([
        step0, step1, step2, step3, step4, step5, step6
    ])

    const styles = {
        transition: 'all 1s ease-out'
    };
    const [ opacity,  ] = useState(1)
    const [ scale,  ] = useState(1)

    const handleGuess = e => {
        let letter = e.target.value;
        let acierto = answerRef.current.search(letter) === -1 ? 1 : 0;
        setGuessed(`${guessed}${letter}`)
        setMistake(mistake + acierto)
        setNum(num + acierto)
    }

    const guessedWord = () => {
        return answerRef.current.toString().split("").map(letter => (guessed.toString().search(letter) !== -1 ? letter : " _ "));
    }

    const generateButtons = () => {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button
                className='btn btn-lg btn-primary m-2'
                key={letter}
                value={letter}
                onClick={(e) => handleGuess(e)}
                disabled={guessed.toString().search(letter) === -1 ? false : true}
            >
                {letter}
            </button>
        ));
    }

    // const resetButton = () => {
    //     setMistake(0)
    //     setGuessed("")
    //     setAnswer(ahorcados[ahorcadoActual].associatedWord)
    // }

    const winnerMessage = () => {
        return (
            <div className="row text-center justify-content-center" style={{...styles, opacity: opacity, transform: 'scale(' + scale + ')'}}>
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Lo lograste!</h4>
                    <p>Has completado el ahorcado de manera exitosa con {mistake} errores.</p>
                    <hr/>
                    <p class="mb-0">Recuerda que tu participación es importante para los propósitos de E-ncendio.</p>
                </div>
            </div>
        )
    }

    const gameoverMessage = () => {
        return (
            <div className="row text-center justify-content-center" style={{...styles, opacity: opacity, transform: 'scale(' + scale + ')'}}>
                <div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">Has perdido</h4>
                    <p>Te has equivocado en el ahorcado {mistake} veces y perdiste esta vez, pero no te preocupes, puedes volver a intentarlo!.</p>
                    <hr/>
                    <p class="mb-0">Recuerda que tu participación es importante para los propósitos de E-ncendio.</p>
                </div>
            </div>
        )
    }

    const gameOver = mistake >= maxWrong;
    const isWinner = answer ? guessedWord().join("") === answer : false;
    let gameStat = winnerWordRef.current ? winnerMessage() : gameOver ? gameoverMessage() : generateButtons();

    const winnerFunction = (addPoints) => {
        // console.log("Ganó")
        etiquetarAhorcado(ahorcados[ahorcadoActual]._id, ahorcados[ahorcadoActual].associatedWord)
        // Calcular y sumar puntos ganados al perfil /api/profile/{profile_id}
        // Revisar si sube de nivel de perfil, misma función de API
        // Agregar atributo a Level, señalando el puntaje al siguiente nivel
        
        setUserPoints( prevTime => prevTime + addPoints)
        setNowProgress( userPointsRef.current )
        setMaxProgress( perfil.league_id.pointsNextLeague )
        setLabelProgress( ((nowProgressRef.current / maxProgressRef.current) * 100).toPrecision(3) )
        setUserLeague( perfil.league_id.league )
        perfil.score = userPointsRef.current;
        if ( perfil.score >= perfil.league_id.pointsNextLeague ) {
            // console.log("Subir de nivel")
            perfil.league_id = perfil.league_id.league
        }
        actualizarPerfil(perfil)

        setNewContent(true);
        // Avanzar al siguiente ahorcado
        setWinnerWord(false)
        if ( ahorcadoActual < largoAhorcados - 1 ) {
            // console.log("aun quedan ahorcados")
            setTimeout(() => {
                localStorage.setItem( 'ahorcadoActual', ahorcadoActual + 1 );
                setAnswer("")
                setTimeout(() => {
                    setNewContent(false)
                }, 1000);
            }, 1000);
        } else {
            // Revisar si sube de nivel de ahorcados? /api/user/{id}/level-image

            // console.log("Ya se acabaron las ahorcados")
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
                        text: "No se encuentran más ahorcados disponibles",
                    })
                    
                    setTimeout(() => {
                        props.history.push('/games')
                    }, 3000);
                }
            })
        }
    }

    const gameoverFunction = (addPoints) => {
        // console.log("Perdió")
        
        setUserPoints( prevTime => prevTime + addPoints)
        setNowProgress( userPointsRef.current )
        setMaxProgress( perfil.league_id.pointsNextLeague )
        setLabelProgress( ((nowProgressRef.current / maxProgressRef.current) * 100).toPrecision(3) )
        setUserLeague( perfil.league_id.league )
        perfil.score = userPointsRef.current;
        if ( perfil.score >= perfil.league_id.pointsNextLeague ) {
            // console.log("Subir de nivel")
            perfil.league_id = perfil.league_id.league
        }
        actualizarPerfil(perfil)
    }

    if ( ahorcados.length !== 0 && answerRef.current !== "" && isWinner && guessed !== "" ) {
        // console.log("ganando")
        // gameStat = winnerMessage();
        let addPoints = 15;
        setPoints(addPoints)
        setWinnerWord(true)
        setTimeout(() => {
            winnerFunction(addPoints)
            setMistake(0)
        }, 6000);
        setGuessed("")
    }

    if ( ahorcados.length !== 0 && answerRef.current !== "" && gameOver && guessed !== "" ) {
        // gameStat = gameoverMessage();
        let addPoints = -15;
        setPoints(addPoints)
        setTimeout(() => {
            gameoverFunction(addPoints)
            setMistake(0)
        }, 6000);
        setGuessed("")
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
                                        { perfil ? `Nivel ${perfil.level_image_id.level}` : null}
                                    </Typography>
                                </Col>
                                <Col >
                                {perfil
                                ?
                                    <Fragment>
                                        <p className="progressTitle4" > {userLeagueRef.current} </p>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip className="mt-3" id="button-tooltip-1" > Puntos: {nowProgressRef.current} </Tooltip>}
                                        >
                                            <ProgressBar max={maxProgressRef.current} className="userProgress4" variant={colorProgress} animated striped  now={nowProgressRef.current}  
                                                        label={(<span style={{ color: 'black', position: "absolute", right: "50%", left: "45%" }} > {labelProgressRef.current}% </span>)}
                                            />
                                        </OverlayTrigger>
                                        <p className={winnerWordRef.current === true | tipReceive === true ? "final-text winner" : gameOver ? "final-text gameover" : "final-text"} > {winnerWordRef.current | tipReceive ? "+" : gameOver ? "" : ""}{pointsRef.current} puntos </p>
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

                        {
                            ahorcados.length !== 0 && answerRef.current !== ""
                            ?
                                newContent === false
                                ?
                                    <div className="Hangman container">
                                        {/* <h1 className='text-center'> El Ahorcado </h1> */}
                                        <Row className="four-images" >
                                            <img src={ ahorcados[ahorcadoActual].imageUrl_1 } alt="" className="imagesToTag" />
                                            <img src={ ahorcados[ahorcadoActual].imageUrl_2 } alt="" className="imagesToTag" />
                                            <img src={ ahorcados[ahorcadoActual].imageUrl_3 } alt="" className="imagesToTag" />
                                            <img src={ ahorcados[ahorcadoActual].imageUrl_4 } alt="" className="imagesToTag" />
                                        </Row>
                                        <div className="text-center d-flex">
                                            <Col>
                                                <img className="mistake-images" src={images[mistake]} alt=""/>
                                            </Col>
                                            <Col className="align-self-center"  >
                                                <div className="float-center wrongs"> <span className="font-weight-bold" >Errores</span> : {mistake} de {maxWrong} </div>
                                                <p className="gameStat" > Adivina la palabra oculta: </p>
                                                <p className="gameStat" >
                                                    {!winnerWord && answerRef.current
                                                        ? guessedWord()
                                                        : answerRef.current
                                                    }
                                                </p>
                                            </Col>
                                            <Col>
                                                <OverlayTrigger
                                                    key={9}
                                                    placement={"top"}
                                                    overlay={
                                                <Tooltip className="tooltipHangmanGame" id="help-icon-tooltip-1" >
                                                    Necesita completar la palabra que se encuentra asociada a las 4 imágenes, ¡antes de perder sus oportunidades!.
                                                </Tooltip>
                                                }
                                                >
                                                    <HelpIcon style={{ marginTop: "35%" }} className="help-icon-tagImage" color="primary" />
                                                </OverlayTrigger>
                                            </Col>
                                        </div>
                                        <div className="text-center">
                                            <p className="gameStat" >{gameStat}</p>
                                            {/* <button className='btn btn-info' onClick={() => resetButton()}> Reiniciar </button> */}
                                        </div>
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
                                        <span className="spansito-no-images" > Aún no existen ahorcados habilitados </span>
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