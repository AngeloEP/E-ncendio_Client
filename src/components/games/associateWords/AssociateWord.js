import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useStyles } from './associateWordStyles.js';

import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import wordContext from '../../../context/words/wordContext';
import profileContext from '../../../context/profile/profileContext';
import categoryContext from '../../../context/categories/categoryContext';
import tagContext from '../../../context/tag/tagContext';

import Fire from '../../common/fire/Fire';

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


const AssociateWords = () => {

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

    const classes = useStyles()
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
        // Calcular y sumar puntos ganados al perfil /api/profile/{profile_id}
        // Revisar si sube de nivel de perfil, misma función de API
        // Agregar atributo a Level, señalando el puntaje al siguiente nivel
        perfil.score = perfil.score + palabras[palabraActual].points
        if ( perfil.score >= perfil.league_id.pointsNextLeague ) {
            console.log("Subir de nivel")
            perfil.league_id = perfil.league_id.league
        }
        actualizarPerfil(perfil)
        setTimeout(() => {
            console.log(perfil)
        }, 1000);
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
        <Container fluid className={classes.backgroundGif} >
            <div className={classes.topCenter} >
                <Row className={classes.rowTitle} >
                    <Col >
                        <Typography variant="h4" className={classes.levelTitle} >
                            { perfil ? `Nivel ${perfil.level_word_id.level}` : null}
                        </Typography>
                    </Col>
                    <Col >
                    {perfil
                    ?
                        <Fragment>
                            <p className={classes.progressTitle} > {userLeague} </p>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip className="mt-3" id="button-tooltip-1" > Puntos: {nowProgress} </Tooltip>}
                            >
                                <ProgressBar max={maxProgress} className={classes.userProgress} variant={colorProgress} animated striped  now={nowProgress}  
                                            label={(<span style={{ color: 'black', position: "absolute", right: "50%", left: "45%" }} > {labelProgress}% </span>)}
                                />
                            </OverlayTrigger>
                        </Fragment>
                    : null
                    }
                    </Col>
                </Row>
                { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
            </div>

            <div className={classes.center} >
                <Grid container spacing={8}>
                    <Grid item xs={6} sm={4}>
                        <Col>
                            <Fire name="riesgo" value="Riesgo" selected={checked['riesgo']} onCheck={onCheck} />
                        </Col>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Col>
                            <Fire name="prevencion" value="Prevención" selected={checked['prevencion']} onCheck={onCheck} />
                        </Col>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Col>
                            <Fire name="recuperacion" value="Recuperación" selected={checked['recuperacion']} onCheck={onCheck} />
                        </Col>
                    </Grid>
                    
                    <Grid container xs={6} sm={4} alignItems="center" >
                        <Col>
                            <Fire name="mitigacion" value="Mitigación" selected={checked['mitigacion']} onCheck={onCheck} />
                        </Col>
                    </Grid>
                    <Grid container xs={6} sm={4}
                        alignItems="center"
                        className={classes.palabra}
                    >
                        { palabras.length == 0
                        ? null
                        :
                            <Col>
                                <Paper className={classes.paper} elevation={10} variant="outlined"  >
                                    {palabras[palabraActual].name}
                                </Paper>
                            </Col>
                        }
                    </Grid>
                    <Grid container item xs={6} sm={4}
                        alignItems="center"
                        style={{ marginLeft: "10%" }}
                    >
                        <Col>
                            <Fire name="amenaza" value="Amenaza" selected={checked['amenaza']} onCheck={onCheck} />
                        </Col>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Col>
                            <Fire name="impacto" value="Impacto" selected={checked['impacto']} onCheck={onCheck} />
                        </Col>
                    </Grid>
                    <Grid item xs={6} sm={4}
                        style={{ marginLeft: "33.3%" }}
                    >
                        <Col>
                            <Fire name="combate" value="Combate" selected={checked['combate']} onCheck={onCheck} />
                        </Col>
                    </Grid>
                </Grid>
            </div  >

            <div className={classes.bottomCenter} >
                <Row>
                    <Col>
                        <Button className={classes.botonSiguiente} variant="success" onClick={ () => onRender() } > Siguiente </Button>{' '}
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
 
export default withRouter(AssociateWords);