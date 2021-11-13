import React, { useEffect } from 'react';
import './help.css';
import UploadContent from '../../assets/img/upload.png';

import ImageIcon from '@material-ui/icons/Image';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import InfoIcon from '@material-ui/icons/Info';
import Table from 'react-bootstrap/Table';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green } from '@material-ui/core/colors';
import LockIcon from '@material-ui/icons/Lock';
import PageviewIcon from '@material-ui/icons/Pageview';

import settingIcon from '../../assets/vectorial graphics/gear2.svg';
import rankingIcon from '../../assets/vectorial graphics/flame.svg';
import gamesIcon from '../../assets/vectorial graphics/gamepad2.svg';
import contentIcon from '../../assets/vectorial graphics/upload.svg';

const Help = () => {
    useEffect(() => {
    }, [])
    return (
        <div className="main-help" >

            <h1 className="settings-title" > Sección de ayuda </h1>
            <div className="date-settings" >
                <span>
                    { new Date().getDate() + '-' + new Date().toLocaleDateString(undefined, { month: 'long'}) + '-' + new Date().getFullYear() }
                </span>
            </div>

            <div className="container mb-5">

                <div className="row tm-content-box">
                    <div className="col-lg-12 col-xl-12">
                        <div className="tm-intro-text-container">
                            <h2 className="tm-text-primary mb-4 tm-section-title"> Objetivo de E-ncendio </h2>
                            <p className="tm-intro-text" >
                            Deseamos obtener la percepción de la ciudadanía sobre el impacto 
                            ecológico de los incendios mediante una plataforma web interactiva, divertida, intuitiva y simple.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row tm-content-box">
                    <div className="col-12 col-lg-12 col-xl-12">
                        <div className="tm-intro-text-container">
                            <h2 className="tm-text-primary mb-4 tm-section-title"> ¿Cómo puedo ganar puntos? </h2>
                        </div>
                    </div>
                </div>

                <div className="row tm-content-box">
                    <div className="col-1 col-lg-1 align-self-center">
                        <img className="tm-icon" src={gamesIcon} alt="" />
                    </div>
                    <div className="col-5 col-lg-5">
                        <div className="tm-intro-text-container">
                            <h2 className="tm-text-primary mb-4"> Jugando </h2>
                            <p className="mb-4 tm-intro-text">
                                Participando en cada juego disponible.
                            </p>
                        </div>
                    </div>
                    
                    <div className="col-1 col-lg-1 align-self-center">
                        <img className="tm-icon" src={settingIcon} alt="" />
                    </div>
                    <div className="col-5 col-lg-5">
                        <div className="tm-intro-text-container">
                            <h2 className="tm-text-primary mb-4"> Editando tu perfil </h2>
                            <p className="mb-4 tm-intro-text">
                                Cambiando atributos o parámetros de tu perfil.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="row tm-content-box">
                    <div className="col-1 col-lg-1 align-self-center">
                        <img className="tm-icon" src={contentIcon} alt="" />
                    </div>
                    <div className="col-5 col-lg-5">
                        <div className="tm-intro-text-container">
                            <h2 className="tm-text-primary mb-4"> Subiendo contenido </h2>
                            <p className="mb-4 tm-intro-text">
                                Escogiendo el contenido adecuado y subirlo al sitio.¡Ojo que, no estará habilitado inmediatamente en el juego!
                            </p>
                        </div>
                    </div>
                    <div className="col-1 col-lg-1 align-self-center">
                        <img className="tm-icon" src={rankingIcon} alt="" />
                    </div>
                    <div className="col-5 col-lg-5">
                        <div className="tm-intro-text-container">
                        <h2 className="tm-text-primary mb-4"> Mejores Participantes </h2>
                            <p className="mb-4 tm-intro-text">
                                Permaneciendo entre los 3 primeros de la tabla de clasificaciones cada semana.
                            </p>
                        </div>
                    </div>
                </div>
                
                <h2 className="tm-text-primary mb-4 mt-4 tm-section-title">
                    Acciones disponibles por liga
                </h2>
                <Table striped bordered hover responsive className="text-center tableActionsHelp" >
                    <thead>
                        <tr>
                            <th className="text-white bg-primary" > Acción/Liga </th>
                            <th className="text-black" style={{ backgroundColor: "#ff9900" }} > Bronce </th>
                            <th className="text-white bg-secondary" > Plata </th>
                            <th className="text-black bg-warning" > Oro </th>
                        </tr>
                    </thead>
                    <tbody className="bodyTableActionsHelp" >
                        <tr>
                            <td> Etiquetar imagen </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                        <tr>
                            <td> Tip visto </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                        <tr>
                            <td> Subir un imagen </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                        <tr>
                            <td> Subir un tip </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                        <tr>
                            <td> Editar perfil </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                        <tr>
                            <td> Comprar en la tienda </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                        <tr>
                            <td> Gestionar compras hechas en tienda </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                        <tr>
                            <td> Etiquetar palabra </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                        <tr>
                            <td> Subir un palabra </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                        <tr>
                            <td> Completar ahorcado </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                        <tr>
                            <td> Subir un ahorcado </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                        <tr>
                            <td> Completar Selección Única </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                        <tr>
                            <td> Subir una Selección Única </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <LockIcon color="secondary" /> </td>
                            <td> <CheckCircleOutlineIcon style={{ color: green[500] }} /> </td>
                        </tr>
                    </tbody>
                </Table>

            </div>

            {/* Como se juegan los Juegos */}
            <div className="container">
                <div className="row tm-content-box">
                    <div className="col-lg-12 col-xl-12">
                        <div className="tm-intro-text-container">
                            <h2 className="tm-text-primary tm-section-title"> ¿Cómo se deben jugar los Juegos? </h2>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6 col-lg-4 col-md-4 col-sm-4 col-xs-4"
                            data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                            <div className="features-item">
                                <div className="features-icon">
                                    <h2>01</h2>
                                    <ImageIcon />
                                    <h4> Etiquetar imágenes </h4>
                                    <p>
                                        Debes seleccionar la categoría que se relaciona más a la imagen.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-4 col-md-4 col-sm-4 col-xs-4"
                            data-scroll-reveal="enter bottom move 30px over 0.6s after 0.4s">
                            <div className="features-item">
                                <div className="features-icon">
                                    <h2>02</h2>
                                    <SpellcheckIcon />
                                    <h4> Etiquetar Palabras </h4>
                                    <p>
                                        Selecciona la categoría a la que consideres que pertenece la palabra.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-4 col-md-4 col-sm-4 col-xs-4"
                            data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                            <div className="features-item">
                                <div className="features-icon">
                                    <h2>03</h2>
                                    <ImageSearchIcon />
                                    <h4> Completar Ahorcado </h4>
                                    <p>
                                        Debes completar la palabra que se relaciona con las 4 imágenes antes de perder sus oportunidades.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-4 col-md-4 col-sm-4 col-xs-4"
                            data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                            <div className="features-item">
                                <div className="features-icon">
                                    <h2>04</h2>
                                    <PageviewIcon />
                                    <h4> Completar Selección Única </h4>
                                    <p>
                                        Debes elegir la imagen más asociada a la palabra clave mostrada.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Que tipo de contenido debo subir */}
            <div className="container" id="upload-content">
                <div className="row tm-content-box ml-0 mr-0">
                    <div className="col-12 col-lg-12 col-xl-12">
                        <div className="tm-intro-text-container">
                            <h2 className="tm-text-primary mb-4 tm-section-title"> ¿Qué tipo de contenido debo subir? </h2>
                        </div>
                    </div>
                </div>

                <div className="row ml-0 mr-0">
                    <div className="left-image col-5 col-lg-5 col-md-5 col-sm-5 mobile-bottom-fix-big"
                        data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                        <img src={UploadContent} className="image-upload-help rounded img-fluid d-block mx-auto" alt="" />
                    </div>
                    <div className="right-text offset-lg-1 col-6 col-lg-6 col-md-6 col-sm-6 mobile-bottom-fix">
                        <ul>
                            <li data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                                <ImageIcon className="miniImage-upload-help" />
                                <SpellcheckIcon className="miniImage-upload-help" />
                                <div className="">
                                    <h4>
                                        Subir imagen o palabra
                                    </h4>
                                    <p>
                                        La imagen subida/palabra escrita debe estar relacionada a los incendios y poder ser categorizada con una de las 7 opciones: 
                                        Prevención, Riesgo, Recuperación, Mitigación, Amenaza, Impacto o Combate.
                                    </p>
                                </div>
                            </li>
                            <li data-scroll-reveal="enter right move 30px over 0.6s after 0.5s">
                                <ImageSearchIcon className="miniImage-upload-help" />
                                <div className="">
                                    <h4>
                                        Subir ahorcado
                                    </h4>
                                    <p>
                                        Deben ser 4 imágenes con alguna relación con incedios y la palabra estar efectivamente plasmada en cada una de ellas. 
                                    </p>
                                </div>
                            </li>
                            <li data-scroll-reveal="enter right move 30px over 0.6s after 0.5s">
                                <PageviewIcon className="miniImage-upload-help" />
                                <div className="">
                                    <h4>
                                        Subir selección única
                                    </h4>
                                    <p>
                                        Deben ser 3 imágenes en donde sólo una de ellas se relaciona fuertemente con la palabra clave ingresada. 
                                    </p>
                                </div>
                            </li>
                            <li data-scroll-reveal="enter right move 30px over 0.6s after 0.6s">
                                <InfoIcon className="miniImage-upload-help" />
                                <div className="">
                                    <h4>
                                        Subir tip
                                    </h4>
                                    <p>
                                        Aquí debe escribir un consejo/información/tip para que el usuario se lleve un conocimiento sobre los incendios.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}
 
export default Help;