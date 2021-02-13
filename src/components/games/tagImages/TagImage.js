import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../context/autentificacion/authContext';
import imageContext from '../../../context/images/imageContext';
import profileContext from '../../../context/profile/profileContext';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './tagImageStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const TagImage = ( props ) => {

    // Extraer la información de autentificación del usuario
    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado} = authContext

    // Extraer la información de el context de imagenes
    const imagesContext = useContext(imageContext)
    const { imagenes, largoImagenes, obtenerImagenes  } = imagesContext

    // Extraer la información del context de perfiles
    const profilesContext = useContext(profileContext)
    const { perfil, loading, obtenerPerfil } = profilesContext

    let imagenActual = JSON.parse(localStorage.getItem("imagenActual"))

    
    useEffect(() => {
        // Traer el perfil del usuario score, etc. /api/user/{id}/profile
        usuarioAutenticado()
        // Para mostrar su nivel y con progress bar indicarle lo que le 
        // falta para subir al otro nivel del jugador

        if (usuario) {
            obtenerPerfil(usuario._id)
            console.log("perfil: ", perfil)
        }
        // Traer el Nivel de imágenes en el que esta el usuario /api/user/{id}/league 


        // Traer las categorías posibles /api/categories
        

        // Traer las imágenes del nivel correspondiente /api/league/{id}/images 
        obtenerImagenes();
    }, [loading])

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
    
    const onCheck = (name, val) => {
        const checkboxes = checked;
        console.log(checkboxes)
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
        // Crear asociación, Etiquetar imagen /api/image/{id}/category/{category}

        // Calcular y sumar puntos ganados al perfil /api/user/{id}/profile
        // Revisar si sube de nivel de perfil, misma función de API
        
        // console.log("imagenActual: ",imagenActual, "  limite: ", largoImagenes - 1)
        // Avanzar a la siguiente imagen
        if ( imagenActual < largoImagenes - 1 ) {
            console.log("aun quedan imágenes")
            localStorage.setItem( 'imagenActual', imagenActual + 1 );
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            // Revisar si sube de nivel de imágenes? /api/user/{id}/level-image

            console.log("Ya se acabaron las imágenes")
        }
    }

    

    return (
        <Container fluid >
            <div className={classes.topCenter} >
                <Row>
                    <Col>
                    <Typography variant="h4" >
                        Nivel 1
                    </Typography>
                    </Col>
                </Row>
            </div>

            <div className={classes.center} >
                <Row >
                    <Col className={classes.imagen} > 
                        { imagenes.length == 0
                        ? null
                        : 
                        <Image
                            style={{width:300,height:300}}
                            src={imagenes[imagenActual].imageUrl} rounded
                        />
                        }
                    </Col>
                    <Col  className={classes.categorias} >
                        <Typography variant="h6" className="mr-3" >
                            Seleccionar Categoría
                        </Typography>
                        <div className="container-xs" >
                            

                            {categories}
                            
                        </div>
                    </Col>

                </Row>
            </div  >

            <div className={classes.bottomCenter} >
                <Row>
                    <Col >
                        <Button variant="secondary"> Anterior </Button>{' '}
                    </Col>

                    <Col>
                        <Button variant="success" onClick={ () => onRender() } > Siguiente </Button>{' '}
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
 
export default withRouter(TagImage);