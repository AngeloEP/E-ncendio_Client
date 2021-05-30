import React, { useState, useEffect, useContext, Fragment } from 'react';

import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import wordContext from '../../../context/words/wordContext';
import profileContext from '../../../context/profile/profileContext';
import categoryContext from '../../../context/categories/categoryContext';
import tagContext from '../../../context/tag/tagContext';

import Fire from '../../common/fire/Fire';

import Swal from 'sweetalert2';

import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import Grid from '@material-ui/core/Grid';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Label } from '@material-ui/icons';

import "./associateWord.css";


const AssociateWords = ( props ) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer la información de autentificación del usuario
    const authContext = useContext(AuthContext)
    const { usuario, cargando, usuarioAutenticado} = authContext

    // Extraer la información de el context de Palabras
    const wordsContext = useContext(wordContext)
    const { palabras, largoPalabras, obtenerPalabras  } = wordsContext

    // Extraer la información del context de perfiles
    const profilesContext = useContext(profileContext)
    const { perfil, obtenerPerfil, actualizarPerfil } = profilesContext

    // Extraer la información del context de niveles
    const categoriesContext = useContext(categoryContext)
    const { categorias, obtenerCategorias } = categoriesContext

    // Extraer la información del context de etiquetar
    const tagsContext = useContext(tagContext)
    const { etiquetarPalabra } = tagsContext

    let palabraActual = JSON.parse(localStorage.getItem("palabraActual"))

    useEffect(() => {
        // Traer el perfil del usuario score, etc. /api/user/{id}/profile
        usuarioAutenticado()
        // Para mostrar su nivel y con progress bar indicarle lo que le 
        // falta para subir al otro nivel del jugador
        obtenerPerfil()

        // Traer las categorías posibles /api/categories
        obtenerCategorias()

        // Traer las Palabras del nivel correspondiente /api/league/{id}/words 
        obtenerPalabras()
    }, [])

    const [ isWinner, setIsWinner ] = useState(false)
    const [ points, setPoints ] = useState(0)

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

    const onRender = () => {
        if ( checked.selected == null ) {
            mostrarAlerta('Debes seleccionar una Categoría', 'alerta-error')
            return
        }

        let categoriaSeleccionada = transformSelected(checked.selected)
        categoriaSeleccionada = categorias.find(e => e.name === categoriaSeleccionada);
        etiquetarPalabra(palabras[palabraActual]._id, categoriaSeleccionada._id)
        setIsWinner(true)
        // Calcular y sumar puntos ganados al perfil /api/profile/{profile_id}
        // Revisar si sube de nivel de perfil, misma función de API
        // Agregar atributo a Level, señalando el puntaje al siguiente nivel
        let addPoints = 0;
        if (perfil.league_id.league === "Plata") addPoints = 25; else addPoints = 15;
        setPoints(addPoints)
        perfil.score = perfil.score + addPoints;
        if ( perfil.score >= perfil.league_id.pointsNextLeague ) {
            console.log("Subir de nivel")
            perfil.league_id = perfil.league_id.league
        }
        actualizarPerfil(perfil)
        setTimeout(() => {
            // console.log(perfil)
            setIsWinner(false)
        }, 2000);
        // return
        
        // console.log("palabraActual: ",palabraActual, "  limite: ", largoPalabras - 1)
        // Avanzar a la siguiente Palabra
        if ( palabraActual < largoPalabras - 1 ) {
            console.log("aun quedan Palabras")
            localStorage.setItem( 'palabraActual', palabraActual + 1 );
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            // Revisar si sube de nivel de Palabras? /api/user/{id}/level-word

            console.log("Ya se acabaron las Palabras")

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
        <Container fluid className="backgroundGif" >
            {
                perfil != null && perfil.league_id.league != "Bronce"
                ?
                    <>
                    <div className="topCenter" >
                        <Row className="rowTitle" >
                            <Col >
                                <Typography variant="h4" className="levelTitle" >
                                    { perfil ? `Nivel ${perfil.level_word_id.level}` : null}
                                </Typography>
                            </Col>
                            <Col >
                            {perfil
                            ?
                                <Fragment>
                                    <p className="progressTitle" > {userLeague} </p>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip className="mt-3" id="button-tooltip-1" > Puntos: {nowProgress} </Tooltip>}
                                    >
                                        <ProgressBar max={maxProgress} className="userProgress" variant={colorProgress} animated striped  now={nowProgress}  
                                                    label={(<span style={{ color: 'black', position: "absolute", right: "50%", left: "45%" }} > {labelProgress}% </span>)}
                                        />
                                    </OverlayTrigger>
                                    <p className={isWinner ? "final-text winner" : "final-text"} > +{points} puntos </p>
                                </Fragment>
                            : null
                            }
                            </Col>
                        </Row>
                        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
                    </div>
                    { palabras.length != 0
                        ?
                        <div>
                        <div className="center">
                            <div className="row">
                                <div className="col categoritas" style={{ marginRight: "-10%" }} >
                                    <Fire name="riesgo" value="Riesgo" selected={checked['riesgo']} onCheck={onCheck} />
                                </div>
                                <div className="col categoritas" style={{ marginRight: "-10%" }} >
                                    <Fire name="prevencion" value="Prevención" selected={checked['prevencion']} onCheck={onCheck} />
                                </div>
                                <div className="col categoritas" >
                                    <Fire name="recuperacion" value="Recuperación" selected={checked['recuperacion']} onCheck={onCheck} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col categoritas" style={{ marginRight: "-4%" }} >
                                    <Fire name="mitigacion" value="Mitigación" selected={checked['mitigacion']} onCheck={onCheck} />
                                </div>
                                <div className="col palabra" >
                                    { palabras.length == 0
                                    ? null
                                    :
                                        <Col>
                                            <Paper className="paper" elevation={10} variant="outlined"  >
                                                {palabras[palabraActual].name}
                                            </Paper>
                                        </Col>
                                    }
                                </div>
                                <div className="col categoritas" style={{ marginLeft: "-1%" }} >
                                    <Fire name="amenaza" value="Amenaza" selected={checked['amenaza']} onCheck={onCheck} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col categoritas" style={{ marginRight: "-10%" }} >
                                    <Fire name="impacto" value="Impacto" selected={checked['impacto']} onCheck={onCheck} />
                                </div>
                                <div className="col categoritas">
                                </div>
                                <div className="col categoritas" style={{ marginLeft: "-10%" }} >
                                    <Fire name="combate" value="Combate" selected={checked['combate']} onCheck={onCheck} />
                                </div>
                            </div>
                        </div>
        
                        <div className="bottomCenter" >
                            <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
                                <Col>
                                    <Button className="botonSiguiente" variant="success" onClick={ () => onRender() } > Siguiente </Button>{' '}
                                </Col>
                            </Row>
                        </div>
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