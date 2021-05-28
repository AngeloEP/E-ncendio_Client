import React, { useState, useEffect, useContext, Fragment } from 'react';

import './fourImagesOneWord.css';

import step0 from "../../../assets/img/hangman/0.jpg";
import step1 from "../../../assets/img/hangman/1.jpg";
import step2 from "../../../assets/img/hangman/2.jpg";
import step3 from "../../../assets/img/hangman/3.jpg";
import step4 from "../../../assets/img/hangman/4.jpg";
import step5 from "../../../assets/img/hangman/5.jpg";
import step6 from "../../../assets/img/hangman/6.jpg";
import testImage from "../../../assets/img/test4.jpg";

import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import FourImagesOneWordContext from '../../../context/fourImagesOneWord/fourImagesOneWordContext';
import profileContext from '../../../context/profile/profileContext';
import categoryContext from '../../../context/categories/categoryContext';
import tagContext from '../../../context/tag/tagContext';

import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import Typography from '@material-ui/core/Typography';

const FourImagesOneWord = () => {
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer la información de autentificación del usuario
    const authContext = useContext(AuthContext)
    const { usuario, cargando, usuarioAutenticado} = authContext

    // Extraer la información de el context de Palabras
    const fourImagesOneWordContext = useContext(FourImagesOneWordContext)
    const { ahorcados, largoAhorcados, obtenerAhorcados  } = fourImagesOneWordContext

    // Extraer la información del context de perfiles
    const profilesContext = useContext(profileContext)
    const { perfil, obtenerPerfil, actualizarPerfil } = profilesContext

    // Extraer la información del context de niveles
    // const categoriesContext = useContext(categoryContext)
    // const { categorias, obtenerCategorias } = categoriesContext

    // Extraer la información del context de etiquetar
    const tagsContext = useContext(tagContext)
    const { etiquetarAhorcado } = tagsContext

    let ahorcadoActual = JSON.parse(localStorage.getItem("ahorcadoActual"))
    const [answer, setAnswer] = useState( "" )
    if (ahorcados.length > 0 && answer === "") {
        setAnswer(ahorcados[ahorcadoActual].associatedWord)
    }

    useEffect(() => {
        // Traer el perfil del usuario score, etc. /api/user/{id}/profile
        usuarioAutenticado()
        // Para mostrar su nivel y con progress bar indicarle lo que le 
        // falta para subir al otro nivel del jugador
        obtenerPerfil()


        // Traer las imágenes y palabra del nivel correspondiente /api/league/{id}/words 
        obtenerAhorcados()
    }, [])

    const [maxWrong, setMaxWrong] = useState(6)
    const [mistake, setMistake] = useState(0)
    const [num, setNum] = useState(0)
    const [guessed, setGuessed] = useState("")
    const [images, setImages] = useState([
        step0, step1, step2, step3, step4, step5, step6
    ])

    const styles = {
        transition: 'all 1s ease-out'
    };
    const [ opacity, setOpacity ] = useState(1)
    const [ scale, setScale ] = useState(1)

    const handleGuess = e => {
        let letter = e.target.value;
        let acierto = answer.search(letter) === -1 ? 1 : 0;
        setGuessed(`${guessed}${letter}`)
        setMistake(mistake + acierto)
        setNum(num + acierto)
    }

    const guessedWord = () => {
        return answer.toString().split("").map(letter => (guessed.toString().search(letter) != -1 ? letter : " _ "));
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

    const resetButton = () => {
        setMistake(0)
        setGuessed("")
        setAnswer(ahorcados[ahorcadoActual].associatedWord)
    }

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
    // console.log("errores: ", mistake, " maxErrores: ", maxWrong)
    const isWinner = answer ? guessedWord().join("") === answer : false;
    // console.log("ganador: ", isWinner, " Perdedor: ", gameOver)
    let gameStat = generateButtons();

    const winnerFunction = () => {
        console.log("Ganó")
        etiquetarAhorcado(ahorcados[ahorcadoActual]._id, ahorcados[ahorcadoActual].associatedWord)
        // Calcular y sumar puntos ganados al perfil /api/profile/{profile_id}
        // Revisar si sube de nivel de perfil, misma función de API
        // Agregar atributo a Level, señalando el puntaje al siguiente nivel
        let addPoints = 15;
        
        perfil.score = perfil.score + addPoints;
        if ( perfil.score >= perfil.league_id.pointsNextLeague ) {
            // console.log("Subir de nivel")
            perfil.league_id = perfil.league_id.league
        }
        actualizarPerfil(perfil)

        // Avanzar al siguiente ahorcado
        if ( ahorcadoActual < largoAhorcados - 1 ) {
            // console.log("aun quedan ahorcados")
            setTimeout(() => {
                localStorage.setItem( 'ahorcadoActual', ahorcadoActual + 1 );
                window.location.reload();
            }, 1000);
        } else {
            // Revisar si sube de nivel de ahorcados? /api/user/{id}/level-image

            // console.log("Ya se acabaron las ahorcados")
        }
    }

    const gameoverFunction = () => {
        console.log("Perdió")
        let addPoints = -15;
        
        perfil.score = perfil.score + addPoints;
        if ( perfil.score >= perfil.league_id.pointsNextLeague ) {
            console.log("Subir de nivel")
            perfil.league_id = perfil.league_id.league
        }
        actualizarPerfil(perfil)
    }

    if ( ahorcados.length != 0 && answer != "" && isWinner) {
        gameStat = winnerMessage();
        setTimeout(() => {
            winnerFunction()
            setGuessed("")
            setMistake(0)
        }, 6000);
    }

    if ( ahorcados.length != 0 && answer != "" && gameOver) {
        gameStat = gameoverMessage();
        setTimeout(() => {
            gameoverFunction()
            setGuessed("")
            setMistake(0)
        }, 6000);
    }

    
    const onHide = () => {
        setOpacity(0)
        setTimeout(() => {
            setOpacity(1)
        }, 2000);
    }

    const onScale = () => {
        // if (scale > 1) {
            
        // } else setScale
        setScale(scale > 1 ? 1 : 1.1)
    }

    let nowProgress = 0
    let maxProgress = 0
    let labelProgress = 0
    let userLeague = ''
    if (perfil) {
        nowProgress = perfil.score
        maxProgress = perfil.league_id.pointsNextLeague
        labelProgress = ((nowProgress / maxProgress) * 100).toPrecision(3)
        userLeague = perfil.league_id.league
    }
    let colorProgress = labelProgress < 50 ? "success" : labelProgress < 80 ? "warning" : "danger"
    return (
        <Container fluid className="backgroundGif"  >
            {
                perfil != null && perfil.league_id.league === "Oro" // editar, es Oro
                ?
                    <>
                        <div className="topCenter4" >
                            <Row className="rowTitle4" >
                                <Col className="align-self-center" >
                                    <Typography variant="h4" className="levelTitle4" >
                                        { perfil ? `Nivel ${perfil.level_image_id.level}` : null}
                                    </Typography>
                                </Col>
                                <Col >
                                {perfil
                                ?
                                    <Fragment>
                                        <p className="progressTitle4" > {userLeague} </p>
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip className="mt-3" id="button-tooltip-1" > Puntos: {nowProgress} </Tooltip>}
                                        >
                                            <ProgressBar max={maxProgress} className="userProgress4" variant={colorProgress} animated striped  now={nowProgress}  
                                                        label={(<span style={{ color: 'black', position: "absolute", right: "50%", left: "45%" }} > {labelProgress}% </span>)}
                                            />
                                        </OverlayTrigger>
                                        <p className={isWinner ? "final-text winner" : gameOver ? "final-text gameover" : "final-text"} > {isWinner ? "+" : gameOver ? "-" : ""}15 puntos </p>
                                    </Fragment>
                                : null
                                }
                                </Col>
                                
                            </Row>
                            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                        </div>
                        {
                            ahorcados.length != 0 && answer != ""
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
                                            <div className="float-center wrongs"> <span className="font-weight-bold" >Errores</span> : {mistake} of {maxWrong} </div>
                                            <p className="gameStat" > Adivina la palabra oculta: </p>
                                            <p className="gameStat" >
                                                {!gameOver && answer
                                                    ? guessedWord()
                                                    : answer
                                                }
                                            </p>
                                        </Col>
                                    </div>
                                    <div className="text-center">
                                        <p className="gameStat" >{gameStat}</p>
                                        <button className='btn btn-info' onClick={() => resetButton()}> Reiniciar </button>
                                    </div>
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