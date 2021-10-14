import React, { useContext, useEffect, Fragment } from 'react';
// import useState from 'react-usestateref';

import './games.css';

// import Table from 'react-bootstrap/Table'

import Grid  from '@material-ui/core/Grid';

import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/autentificacion/authContext';
import TipContext from '../../context/tips/tipContext';

import ClipLoader from "react-spinners/ClipLoader";

import ImageIcon from '@material-ui/icons/Image';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';

import ArrowRight from '@material-ui/icons/ArrowRight';


const Games = ({ history }) => {
    const authContext = useContext(AuthContext)
    const { usuarioAutenticado } = authContext

    const profilecontext = useContext(ProfileContext)
    const { perfil, obtenerPerfil } = profilecontext

    // const imagesContext = useContext(imageContext)
    // const {
    //     obtenerImagenes
    //  } = imagesContext

    // const wordsContext = useContext(wordContext)
    // const {
    //     obtenerPalabras
    //  } = wordsContext

    // const fourImagesOneWordContext = useContext(FourImagesOneWordContext)
    // const {
    //     obtenerAhorcados
    //  } = fourImagesOneWordContext

    // Extraer la información de el context de los tips
    const tipContext = useContext(TipContext)
    const { obtenerTips  } = tipContext

    useEffect(() => {
        usuarioAutenticado()
        obtenerPerfil()
        // Traer contenido para los juegos previamente
        // obtenerImagenes()
        // obtenerPalabras()
        // obtenerAhorcados()
        obtenerTips()
        // eslint-disable-next-line
    }, [])

    const OnClick = (route) => {
        localStorage.setItem( 'imagenActual', 0 );
        localStorage.setItem( 'palabraActual', 0 );
        localStorage.setItem( 'ahorcadoActual', 0 );
        history.push(route)
    }


    return (
        <>
            <h1 className="games-title" > Juegos </h1>
            <div className="author" >
                <span>
                    { new Date().getDate() + '-' + new Date().toLocaleDateString(undefined, { month: 'long'}) + '-' + new Date().getFullYear() }
                </span>
            </div>
            { perfil!= null ?
            <div className="text-games" >
                Se encuentran disponibles los juegos:
                                    {perfil.league_id.league === "Bronce"
                                    ?
                                        <><span style={{ fontWeight:"bold" }} > Etiquetar imágenes</span> <span> , sube a la liga de Plata para etiquetar palabras y a la liga de Oro para poder completar Ahorcados </span> </>
                                    :
                                        perfil.league_id.league === "Plata"
                                        ?
                                            <><span style={{ fontWeight:"bold" }} > Etiquetar imágenes y Etiquetar palabras </span> <span> , sube a Oro para desbloquear el último </span> </>
                                        :
                                            <><span style={{ fontWeight:"bold" }} > Etiquetar imágenes, Etiquetar palabras y El Ahorcado </span> <span> </span> </>
                                    }
                            </div>
                            : null
            }
            <Grid container alignItems='center' justify="center"
                style={{
                    display: 'flex',
                    height: "50.5vh"
                }}
            >
                {
                    perfil != null
                    ?
                    <table className="table tablita">
                    <thead>
                        <tr>
                            <th scope="col"  >
                                <div className="arrowItem">
                                    <button className="buttonArrow" >
                                        <ArrowRight className="arrow1" fontSize="large" />
                                    </button>
                                </div>
                            </th>
                            <th scope="col" className="juegitos" >
                                <div
                                    className="buttonOpenGame"
                                    onClick={() => OnClick('/games/images')}
                                >
                                    Etiquetar imágenes <ImageIcon style={{ fontSize: 60 }} />
                                </div>
                            </th>
                            <th scope="col" className="juegitos" >
                                <div
                                    className={perfil.league_id.league === "Bronce"
                                    ?
                                        "lockGame"
                                    :
                                        "buttonOpenGame"}
                                    onClick={() => OnClick('/games/words')}
                                >
                                    Etiquetar palabras <SpellcheckIcon style={{ fontSize: 60 }} />
                                </div>
                                {perfil.league_id.league === "Bronce"
                                    ?
                                        <span className="tiptext">Debes estar mínimo en la liga de Plata</span>
                                    :
                                        null
                                }
                            </th>
                            <th scope="col" className="juegitos" >
                                <div
                                    className={perfil.league_id.league !== "Oro"
                                        ?
                                            "lockGame"
                                        :
                                            "buttonOpenGame"}
                                    onClick={() => OnClick('/games/four-images-one-word')}
                                >
                                    El Ahorcado <ImageSearchIcon style={{ fontSize: 60 }} /> 
                                </div>
                                {perfil.league_id.league !== "Oro"
                                    ?
                                        <span className="tiptext">Debes llegar a la liga de Oro</span>
                                    :
                                        null
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ fontSize:"1.5em" }} >
                                Objetivo
                            </td>
                            <td>
                                Selecciona la categoría más coherente para la imagen que estas visualizando.
                            </td>
                            <td>
                                Selecciona la categoría más coherente para la palabra que estas visualizando.
                            </td>
                            <td>
                                Debes construir la palabra que esta relacionada a las 4 imágenes antes de que pierdas tus oportunidades
                            </td>
                        </tr>
                    </tbody>
                </table>
                    :
                        <div className="text-center ml-auto mr-auto" >
                            <ClipLoader
                                color={"#000"}
                                loading={true}
                                size={30}
                            />
                        </div>
                }
            </Grid>
        </>
    );
}
 
export default Games;
