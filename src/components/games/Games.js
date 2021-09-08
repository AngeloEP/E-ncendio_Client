import React, { useContext, useEffect, useState, Fragment } from 'react';
// import useState from 'react-usestateref';

import './games.css';

import Grid  from '@material-ui/core/Grid';

import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/autentificacion/authContext';
import TipContext from '../../context/tips/tipContext';

import ClipLoader from "react-spinners/ClipLoader";

import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ImageIcon from '@material-ui/icons/Image';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';

import {
    FloatingMenu,
    MainButton,
    ChildButton,
    Directions
  } from 'react-floating-button-menu';
  import MdClose from '@material-ui/icons/Clear';

// const buttonsList = [
//     { onClick: ()=> alert('clicked icon1'), src: "../../assets/gif/hojasCayendo.gif" },
//     { onClick: ()=> alert('clicked icon2'), src: asdIcon },
//     { onClick: ()=> alert('clicked icon2'), src: infoIcon },
//   ]

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

    const [isOpen, setIsOpen] = useState(false)

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
                                        <><span style={{ fontWeight:"bold" }} > Etiquetar imágenes</span> <span> , sube a la liga de Plata para etiquetar palabras y a la liga de Oro para completar Ahorcados </span> </>
                                    :
                                        perfil.league_id.league === "Plata"
                                        ?
                                            <><span style={{ fontWeight:"bold" }} > Etiquetar imágenes y Etiquetar palabras </span> <span> , sube a Oro para desbloquear el último </span> </>
                                        :
                                            <><span style={{ fontWeight:"bold" }} > Etiquetar imágenes, Etiquetar palabras y 4 imágenes y 1 palabra </span> <span> </span> </>
                                    }
                            </div>
                            : null
            }
            <Grid container alignItems='center' justify="center"
                style={{
                    display: 'flex',
                    justifyContent: "center",
                    height: "70.5vh"
                }}
            >
                {
                    perfil != null
                    ?
                    <Fragment>
                        
                            {/* <div className="floatingButtonsGames" >
                                <FloatingButtons
                                    
                                    buttonType={infoIcon}
                                    dimension={65}
                                    buttonsList={buttonsList}
                                    degree={-180}
                                    left={'49%'}
                                    top={'45%'}
                                    direction="circular"
                                    itemBackgroundColor="#f8f9fa"
                                />
                            </div> */}
                            
                            <FloatingMenu
                                slideSpeed={500}
                                direction={Directions.Down}
                                spacing={8}
                                isOpen={isOpen}
                                className="floatingButtonsGames"
                            >
                                <MainButton
                                    iconResting={<SportsEsportsIcon style={{ fontSize: 50 }} />}
                                    iconActive={<MdClose style={{ fontSize: 30 }} />}
                                    background="white"
                                    onClick={() => setIsOpen(!isOpen)}
                                    size={90}
                                    disabled={true}
                                />
                                <ChildButton
                                    icon={<ImageIcon style={{ fontSize: 40 }} />}
                                    background="white"
                                    size={75}
                                    title="Etiquetar Imágenes"
                                    onClick={() => OnClick('/games/images')}
                                />
                                <ChildButton
                                    icon={<ImageSearchIcon style={{ fontSize: 40 }} />}
                                    background="white"
                                    size={75}
                                    title={perfil.league_id.league !== "Oro"
                                    ?
                                        ""
                                    :
                                        "4 imágenes y una palabra"}
                                    className={perfil.league_id.league !== "Oro"
                                    ?
                                        "lockGame"
                                    :
                                        ""}
                                    onClick={() => OnClick('/games/four-images-one-word')}
                                />

                                <ChildButton
                                    icon={<SpellcheckIcon style={{ fontSize: 40 }} />}
                                    background="white"
                                    size={75}
                                    title={perfil.league_id.league === "Bronce"
                                    ?
                                        ""
                                    :
                                        "Etiquetar palabras"}
                                    className={perfil.league_id.league === "Bronce"
                                    ?
                                        "lockGame"
                                    :
                                        ""}
                                    onClick={() => OnClick('/games/words')}
                                > 
                                </ChildButton>
                                {/* <SpellcheckIcon /> */}
                            </FloatingMenu>
                            </Fragment>
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

/*
<Grid  className={classes.root} >
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
 */