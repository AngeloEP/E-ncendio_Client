import React, { useEffect, useContext, Fragment } from 'react';
import useState from 'react-usestateref';
import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import imageContext from '../../../context/images/imageContext';
import profileContext from '../../../context/profile/profileContext';
import categoryContext from '../../../context/categories/categoryContext';
import tagContext from '../../../context/tag/tagContext';
import TipContext from '../../../context/tips/tipContext';

import Fire from '../../common/fire/Fire';

import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { withRouter, Switch, Route, Link } from 'react-router-dom';

import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import ClipLoader from "react-spinners/ClipLoader";
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "./tagImage.css";

import infoIcon from '../../../assets/info.svg';

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

    // Extraer la información de el context de los tips
    const tipContext = useContext(TipContext)
    const { tips, largoTips, obtenerTips  } = tipContext

    // Extraer la información del context de perfiles
    const profilesContext = useContext(profileContext)
    const { perfil, obtenerPerfil, actualizarPerfil } = profilesContext

    // Extraer la información del context de niveles
    const categoriesContext = useContext(categoryContext)
    const { categorias, obtenerCategorias } = categoriesContext

    // Extraer la información del context de etiquetar
    const tagsContext = useContext(tagContext)
    const { etiquetarImagen, verTip } = tagsContext

    let imagenActual = JSON.parse(localStorage.getItem("imagenActual"))
    let tipActual = 0 
    if (tips.length > 0) {
        tipActual = Math.floor(Math.random() * (largoTips));
    }

    const [ newContent, setNewContent ] = useState(false)
    const [ tipReceive, setTipReceive ] = useState(false)
    const [ userPoints, setUserPoints, userPointsRef ] = useState(
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
        // toast('Basic notification!', {position: toast.POSITION.TOP_RIGHT})
        // toast.success('Success notification!', 
        //     {
        //         position: toast.POSITION.TOP_CENTER,
        //         autoClose: 7000
        //     }
        // )
        // toast.warn('Warning notification!', {position: toast.POSITION.TOP_LEFT})
        // toast.info('Info notification!', {position: toast.POSITION.BOTTOM_LEFT})
        // toast.error('Error notification!', {position: toast.POSITION.BOTTOM_RIGHT})
        toast.info(<CustomToast />,
            {
                position: toast.POSITION.TOP_RIGHT,
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
        obtenerCategorias()

        // Traer las imágenes del nivel correspondiente /api/league/{id}/images 
        obtenerImagenes()

        // Traer los tips disponibles
        obtenerTips()

        const interval = setInterval(() => {
            notify()
            verTip(tips[tipActual]._id)
            setTipReceive(true)
            let addPoints = 0;
            switch (perfil.league_id.league) {
                case "Bronce":
                    addPoints = 10;
                    break;

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
            setTimeout(() => {
                perfil.score = userPointsRef.current;
                if ( perfil.score >= perfil.league_id.pointsNextLeague ) {
                    perfil.league_id = perfil.league_id.league
                }
                actualizarPerfil(perfil)
                setTipReceive(false)
            }, 1000);
        }, 60000); // 60 seconds
        return () => clearInterval(interval);
        
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
        setIsWinner(true)
        // Calcular y sumar puntos ganados al perfil /api/profile/{profile_id}
        // Revisar si sube de nivel de perfil, misma función de API
        // Agregar atributo a Level, señalando el puntaje al siguiente nivel
        // console.log("etiquetar: ", perfil)
        let addPoints = 0;
        switch (perfil.league_id.league) {
            case "Bronce":
                addPoints = 35;
                break;

            case "Plata":
                addPoints = 20;
                break;

            case "Oro":
                addPoints = 10;
                break;
        
            default:
                break;
        }
        setPoints(addPoints)
        setUserPoints( prevTime => prevTime + addPoints)
        perfil.score = perfil.score + addPoints;
        if ( perfil.score >= perfil.league_id.pointsNextLeague ) {
            // console.log("Subir de nivel")
            perfil.league_id = perfil.league_id.league
        }
        actualizarPerfil(perfil)
        setTimeout(() => {
            // console.log(perfil)
            setIsWinner(false)
        }, 2000);
        // return
        
        // console.log("imagenActual: ",imagenActual, "  limite: ", largoImagenes - 1)
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
        // Avanzar a la siguiente imagen
        if ( imagenActual < largoImagenes - 1 ) {
            // console.log("aun quedan imágenes")
            setTimeout(() => {
                localStorage.setItem( 'imagenActual', imagenActual + 1 );
                // window.location.reload();
                setTimeout(() => {
                    setNewContent(false)
                }, 1000);
            }, 1000);
        } else {
            // Revisar si sube de nivel de imágenes? /api/user/{id}/level-image

            // console.log("Ya se acabaron las imágenes")

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
                        text: "No se encuentran más imágenes disponibles",
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
        nowProgress = userPoints
        maxProgress = perfil.league_id.pointsNextLeague
        labelProgress = ((nowProgress / maxProgress) * 100).toPrecision(3)
        userLeague = perfil.league_id.league
    }
    let colorProgress = labelProgress < 50 ? "success" : labelProgress < 80 ? "warning" : "danger";
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
                            <p className={isWinner == true | tipReceive == true ? "final-text winner" : "final-text"} > +{points} puntos </p>
                        </Fragment>
                    : null
                    }
                    </Col>
                </Row>
                { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
            </div>
            { imagenes.length != 0
                ?
                    newContent === false
                    ?
                        <>
                            <div className="center">
                                <div className="row">
                                    <div className="col categoritas" style={{ marginRight: "-10%" }}>
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
                                    <div className="col categoritas" style={{ marginTop: "-4%" }} >
                                        <Fire name="mitigacion" value="Mitigación" selected={checked['mitigacion']} onCheck={onCheck} />
                                    </div>
                                    <div className="col div-imagen" >
                                        { imagenes.length == 0
                                            ? null
                                            :
                                            <Col>
                                                <Image
                                                    className="imagen"
                                                    src={imagenes[imagenActual].imageUrl} rounded
                                                />
                                            </Col>
                                        }
                                    </div>
                                    <div className="col categoritas" style={{ marginTop: "-4%" }} >
                                        <Fire name="amenaza" value="Amenaza" selected={checked['amenaza']} onCheck={onCheck} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col categoritas" style={{ marginRight: "-10%", marginTop: "-4%" }}>
                                        <Fire name="impacto" value="Impacto" selected={checked['impacto']} onCheck={onCheck} />
                                    </div>
                                    <div className="col categoritas">
                                    </div>
                                    <div className="col categoritas" style={{ marginLeft: "-8%", marginTop: "-4%" }}>
                                        <Fire name="combate" value="Combate" selected={checked['combate']} onCheck={onCheck} />
                                    </div>
                                </div>
                            </div>

                            <div className="bottomCenter-images" >
                                <Row style={{ marginLeft: "0px", marginRight: "0px" }} >
                                    {/* <Col >
                                        <Button variant="secondary"> Anterior </Button>{' '}
                                    </Col> */}

                                    <Col>
                                        <Button className="botonSiguiente" variant="success" onClick={ () => onRender() } > Siguiente </Button>{' '}
                                    </Col>
                                </Row>
                            </div>
                        </>
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
                        <span className="spansito-no-images" > Aún no existen imágenes habilitadas </span>
                    </div>
                </div>
            }
        </Container>
    );
}
 
export default withRouter(TagImage);