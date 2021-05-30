import React, { useContext, useEffect } from 'react';

import {useStyles} from './gamesStyles';
import './games.css';

import Grid  from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/autentificacion/authContext';
import imageContext from '../../context/images/imageContext';
import wordContext from '../../context/words/wordContext';
import FourImagesOneWordContext from '../../context/fourImagesOneWord/fourImagesOneWordContext';

import minions from '../../assets/img/minions.jpg';
import encendio from '../../assets/img/incendio.png';
import incendios from '../../assets/img/incendios.jpg';

import ClipLoader from "react-spinners/ClipLoader";

const images = [
    {
      url: minions,
      title: 'Etiquetar Imágenes',
      width: '40%',
      page: '/games/images'
    },
    {
      url: encendio,
      title: 'Asociar Palabras',
      width: '30%',
      page: '/games/words'
    },
    {
      url: incendios,
      title: '4 Imágenes y 1 Palabra',
      width: '30%',
      page: '/games/four-images-one-word'
    },
  ];

const Games = ({ history }) => {
    // Extraer la información de autentificación
    const authContext = useContext(AuthContext)
    const { usuarioAutenticado } = authContext

    // Extraer la información de los perfiles
    const profilecontext = useContext(ProfileContext)
    const { perfil, obtenerPerfil } = profilecontext

    // Extraer la información de el context de imagenes
    const imagesContext = useContext(imageContext)
    const { obtenerImagenes  } = imagesContext

    // Extraer la información de el context de Palabras
    const wordsContext = useContext(wordContext)
    const { obtenerPalabras  } = wordsContext

    // Extraer la información de el context de Palabras
    const fourImagesOneWordContext = useContext(FourImagesOneWordContext)
    const { obtenerAhorcados  } = fourImagesOneWordContext

    useEffect(() => {
        usuarioAutenticado()

        obtenerPerfil()

        // Traer contenido para los juegos previamente
        obtenerImagenes()
        obtenerPalabras()
        obtenerAhorcados()
    }, [])

    const classes = useStyles()

    const OnClick = (route) => {
        localStorage.setItem( 'imagenActual', 0 );
        localStorage.setItem( 'palabraActual', 0 );
        localStorage.setItem( 'ahorcadoActual', 0 );
        history.push(route)
    }


    return (
        <Grid container direction='column' alignItems='center' justify="center"
            style={{
                display: 'flex',
                justifyContent: "center",
                height: "91.5vh"
            }}
        >
            {
                perfil != null
                ?
                    <Grid direction='row'  className={classes.root} >
                        {images.map((image) => (
                            <ButtonBase
                                focusRipple
                                key={image.title}
                                className={classes.image}
                                disabled={
                                    image.title === "Asociar Palabras"
                                    ?
                                        perfil.league_id.league === "Bronce"
                                        ?
                                            true
                                        :
                                            false
                                    :
                                        image.title === "4 Imágenes y 1 Palabra"
                                        ?
                                            perfil.league_id.league === "Bronce" | perfil.league_id.league === "Plata"
                                            ?
                                                true
                                            :
                                                false
                                        :
                                            false
                                }
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width: image.width,
                                }}
                                onClick={() => OnClick(image.page)}
                            >
                            <span
                                className={classes.imageSrc}
                                style={{
                                backgroundImage: `url(${image.url})`,
                                }}
                            />
                            {/* <span className={classes.imageBackdrop} /> */}
                            <span className={
                                    image.title === "Asociar Palabras"
                                    ?
                                        perfil.league_id.league === "Bronce"
                                        ?
                                            "image-backdrop-disable"
                                        :
                                            "image-backdrop"
                                    :
                                        image.title === "4 Imágenes y 1 Palabra"
                                        ?
                                            perfil.league_id.league === "Bronce" | perfil.league_id.league === "Plata"
                                            ?
                                                "image-backdrop-disable"
                                            :
                                                "image-backdrop"
                                        :
                                            "image-backdrop"
                                }
                            >
                                <span className={classes.imageButton}>
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        className={classes.imageTitle}
                                    >
                                    {image.title}
                                    <span className={classes.imageMarked} />
                                    </Typography>
                                </span>
                            </span>
                            </ButtonBase>
                        ))}
                    </Grid>
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
    );
}
 
export default Games;