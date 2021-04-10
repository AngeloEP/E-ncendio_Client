import React, { useState, useEffect, useContext, Fragment } from 'react';
import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import imageContext from '../../../context/images/imageContext';
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
import "./tagImage.css";



const TagImage = ( props ) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer la información de autentificación del usuario
    const authContext = useContext(AuthContext)
    const { usuario, cargando, usuarioAutenticado} = authContext

    // Extraer la información de el context de imagenes
    const imagesContext = useContext(imageContext)
    const { imagenes, largoImagenes, obtenerImagenes  } = imagesContext

    // Extraer la información del context de perfiles
    const profilesContext = useContext(profileContext)
    const { perfil, obtenerPerfil, actualizarPerfil } = profilesContext

    // Extraer la información del context de niveles
    const categoriesContext = useContext(categoryContext)
    const { categorias, obtenerCategorias } = categoriesContext

    // Extraer la información del context de etiquetar
    const tagsContext = useContext(tagContext)
    const { etiquetarImagen } = tagsContext

    let imagenActual = JSON.parse(localStorage.getItem("imagenActual"))

    
    useEffect(() => {
        // Traer el perfil del usuario score, etc. /api/user/{id}/profile
        usuarioAutenticado()
        // Para mostrar su nivel y con progress bar indicarle lo que le 
        // falta para subir al otro nivel del jugador
        obtenerPerfil()

        // Traer las categorías posibles /api/categories
        obtenerCategorias()

        // Traer las imágenes del nivel correspondiente /api/league/{id}/images 
        obtenerImagenes()
    }, [])

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

    const Checksito = ({ state, label, name, disable }) => {
        return (
        <FormControlLabel
            
            control={
              <Checkbox
                checked={state}
                value={name}
                onChange={(e) => onCheck(name, e.target.value)}
                color="secondary"
              />
            }
            label= {label}
          />
        )
    }
    
    const categories = [
        <Row  >
            <Col xs={6} > <Checksito state={checked.prevencion} label='Prevención' name='prevencion'  /> </Col> 
            <Col xs={6} > <Checksito state={checked.mitigacion} label='Mitigación' name='mitigacion'  /> </Col> 
        </Row>,
        <Row>
            <Col xs={6} > <Checksito state={checked.riesgo} label='Riesgo' name='riesgo' /> </Col> 
            <Col xs={6} > <Checksito state={checked.combate} label='Combate' name='combate' /> </Col>
        </Row>,
        <Row>
            <Col xs={6} > <Checksito state={checked.impacto} label='Impacto' name='impacto' /> </Col> 
            <Col xs={6} > <Checksito state={checked.recuperacion} label='Recuperación' name='recuperacion' /> </Col> 
        </Row>,
        <Row>
            <Col> <Checksito state={checked.amenaza} label='Amenaza' name='amenaza' /> </Col> 
        </Row>,
    ]

    const onRender = () => {
        if ( checked.selected == null ) {
            mostrarAlerta('Debes seleccionar una Categoría', 'alerta-error')
            return
        }

        let categoriaSeleccionada = transformSelected(checked.selected)
        categoriaSeleccionada = categorias.find(e => e.name === categoriaSeleccionada);
        etiquetarImagen(imagenes[imagenActual]._id, categoriaSeleccionada._id)
        // Calcular y sumar puntos ganados al perfil /api/profile/{profile_id}
        // Revisar si sube de nivel de perfil, misma función de API
        // Agregar atributo a Level, señalando el puntaje al siguiente nivel
        perfil.score = perfil.score + 25
        if ( perfil.score >= perfil.league_id.pointsNextLeague ) {
            console.log("Subir de nivel")
            perfil.league_id = perfil.league_id.league
        }
        actualizarPerfil(perfil)
        setTimeout(() => {
            console.log(perfil)
        }, 1000);
        // return
        
        // console.log("imagenActual: ",imagenActual, "  limite: ", largoImagenes - 1)
        // Avanzar a la siguiente imagen
        if ( imagenActual < largoImagenes - 1 ) {
            console.log("aun quedan imágenes")
            setTimeout(() => {
                localStorage.setItem( 'imagenActual', imagenActual + 1 );
                window.location.reload();
            }, 1000);
        } else {
            // Revisar si sube de nivel de imágenes? /api/user/{id}/level-image

            console.log("Ya se acabaron las imágenes")
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
            <div className="topCenter" >
                <Row className="rowTitle" >
                    <Col >
                        <Typography variant="h4" className="levelTitle" >
                            { perfil ? `Nivel ${perfil.level_image_id.level}` : null}
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
                        </Fragment>
                    : null
                    }
                    </Col>
                </Row>
                { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
            </div>
            <div class="center">
                <div class="row">
                    <div class="col categoritas" style={{ marginRight: "10%" }}>
                        <Fire name="riesgo" value="Riesgo" selected={checked['riesgo']} onCheck={onCheck} />
                    </div>
                    <div class="col categoritas" style={{ marginRight: "10%" }} >
                        <Fire name="prevencion" value="Prevención" selected={checked['prevencion']} onCheck={onCheck} />
                    </div>
                    <div class="col categoritas" >
                        <Fire name="recuperacion" value="Recuperación" selected={checked['recuperacion']} onCheck={onCheck} />
                    </div>
                </div>
                <div class="row">
                    <div class="col categoritas" style={{ marginRight: "10%" }}>
                        <Fire name="mitigacion" value="Mitigación" selected={checked['mitigacion']} onCheck={onCheck} />
                    </div>
                    <div class="col div-imagen" style={{ marginRight: "10%" }}>
                        { imagenes.length == 0
                            ? null
                            : 
                            <Image
                                style={{minWidth:"350px",minHeight:"300px"}}
                                className="imagen"
                                src={imagenes[imagenActual].imageUrl} rounded
                            />
                        }
                    </div>
                    <div class="col categoritas">
                        <Fire name="amenaza" value="Amenaza" selected={checked['amenaza']} onCheck={onCheck} />
                    </div>
                </div>
                <div class="row">
                    <div class="col categoritas" style={{ marginRight: "20%" }}>
                        <Fire name="impacto" value="Impacto" selected={checked['impacto']} onCheck={onCheck} />
                    </div>
                    <div class="col categoritas">
                    </div>
                    <div class="col categoritas" style={{ marginLeft: "10%" }}>
                        <Fire name="combate" value="Combate" selected={checked['combate']} onCheck={onCheck} />
                    </div>
                </div>
            </div>

            <div className="bottomCenter" >
                <Row style={{ marginLeft: "0px", marginRight: "0px" }} >
                    {/* <Col >
                        <Button variant="secondary"> Anterior </Button>{' '}
                    </Col> */}

                    <Col>
                        <Button className="botonSiguiente" variant="success" onClick={ () => onRender() } > Siguiente </Button>{' '}
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
 
export default withRouter(TagImage);