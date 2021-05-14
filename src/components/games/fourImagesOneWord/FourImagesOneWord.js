import React, { useState, useEffect, useContext, Fragment } from 'react';

import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import wordContext from '../../../context/words/wordContext';
import profileContext from '../../../context/profile/profileContext';
import categoryContext from '../../../context/categories/categoryContext';
import tagContext from '../../../context/tag/tagContext';

import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const FourImagesOneWord = () => {
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
    const {  } = tagsContext

    useEffect(() => {
        // Traer el perfil del usuario score, etc. /api/user/{id}/profile
        usuarioAutenticado()
        // Para mostrar su nivel y con progress bar indicarle lo que le 
        // falta para subir al otro nivel del jugador
        obtenerPerfil()

        // Traer las categorías posibles /api/categories
        obtenerCategorias()

        // Traer las imágenes y palabra del nivel correspondiente /api/league/{id}/words 
    }, [])

    return (
        <Container fluid className="backgroundGif-4images1word" >
            {
                perfil != null && perfil.league_id.league != "Bronce"
                ?
                    <h2> 4 imágenes y una Palabra </h2>
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