import React, { useState, useEffect, useContext } from 'react';
import ProfileDefault from '../../assets/img/profile_default.png';

import AuthContext from '../../context/autentificacion/authContext';
import ProfileContext from '../../context/profile/profileContext';

import './profile.css';
import OroBadge from '../../assets/badges/gold-badge.png';
import BronceBadge from '../../assets/badges/bronze-badge.png';
import PlataBadge from '../../assets/badges/medal.png';

import { FaMedal } from 'react-icons/fa';

import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaEdit,
} from 'react-icons/fa';

const Profile = ( props ) => {
    // Extraer la información de autentificación
    const authContext = useContext(AuthContext)
    const { usuario, modificacionUsuarioExitosa, usuarioAutenticado, cambiarStateModificacionUsuario } = authContext

    // Extraer la información de los perfiles
    const profilecontext = useContext(ProfileContext)
    const { perfil, obtenerPerfil } = profilecontext

    useEffect(() => {
        usuarioAutenticado()

        if ( modificacionUsuarioExitosa ) {
            cambiarStateModificacionUsuario()
        }

        // obteniendo el perfil del usuario
        obtenerPerfil();
    }, [ modificacionUsuarioExitosa ])

    const updateButtonAction = () => {
        localStorage.setItem('firstname', usuario.firstname );
        localStorage.setItem('lastname', usuario.lastname );
        localStorage.setItem('gender', usuario.gender );
        localStorage.setItem('age', usuario.age );
        localStorage.setItem('phone', usuario.phone );
        localStorage.setItem('urlFile', usuario.urlFile );

        props.history.push('/profile/edit')
    }

    // const retornarMedalla = (liga) => {
    //     switch (liga) {
    //         case "Bronce":
    //             BronceBadge
    //             break;
    //         case "Plata":
    //             PlataBadge
    //             break;
    //         case "Oro":
    //             OroBadge
    //             break;
        
    //         default:
    //             break;
    //     }
    // }

    return (
        <div class="page-content page-container" id="page-content" >
            { perfil != null
            ?
                <div class="padding">
                    <div class="col container d-flex justify-content-center">
                        <div class="col-xl-12 col-md-12">
                            <div class="card user-card-full">
                                <div class="row m-l-0 m-r-0">
                                    <div class="col-sm-4 bg-c-lite-green user-profile">
                                        <div class="card-block text-center text-white">
                                            <div class="m-b-25"> <img src={ usuario.urlFile ? usuario.urlFile : ProfileDefault } class="img-radius" alt="User-Profile-Image" /> </div>
                                            <h4 class="f-w-600"> {usuario.firstname} </h4>
                                            <h5 class="f-w-400"> {usuario.lastname} </h5>
                                            <p class="f-w-200" > <i>
                                                { usuario.isExpert
                                                ?
                                                    "Integrante de FireSES"
                                                :
                                                    "No pertenezco a FireSES"
                                                }
                                            </i> </p> 
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="card-block">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600"> Mi información de perfil de usuario </h6>
                                                </div>
                                                <div class="col-sm-6 col-log-12 col-xl-6">
                                                            <button
                                                                className={
                                                                    perfil.league_id.league === "Bronce"
                                                                    ?
                                                                        "disableBtn"
                                                                    :
                                                                        "profile-edit-btn"
                                                                }
                                                                onClick={() => updateButtonAction() }
                                                                disabled={
                                                                    perfil.league_id.league === "Bronce"
                                                                    ?
                                                                        true
                                                                    :
                                                                        false
                                                                }
                                                            >
                                                                <div class="row">
                                                                    <div class="col-sm-6 col-log-12 col-xl-8">
                                                                            Editar Perfil
                                                                    </div>
                                                                    <div class="col-sm-6 col-log-12 col-xl-4">
                                                                        <FaEdit className="iconoEditar"/>
                                                                    </div>
                                                                </div>
                                                            </button>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600"> Email </p>
                                                    <h6 class="text-muted f-w-400"> {usuario.email} </h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600"> Teléfono </p>
                                                    <h6 class="text-muted f-w-400"> {usuario.phone} </h6>
                                                </div>
                                            </div>
                                            <br/>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600"> Edad </p>
                                                    <h6 class="text-muted f-w-400"> {usuario.age} </h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600"> Género </p>
                                                    <h6 class="text-muted f-w-400"> {usuario.gender} </h6>
                                                </div>
                                            </div>

                                            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"> Perfil de juego en E-ncendio </h6>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600"> Liga </p>
                                                    <h6 class="text-muted f-w-400">
                                                        {perfil.league_id.league} 
                                                        <span class="badge badge-pill badge-light align-middle">
                                                            <img src={
                                                                    perfil.league_id.league === "Bronce" ? BronceBadge
                                                                    : perfil.league_id.league === "Plata" ? PlataBadge
                                                                    : perfil.league_id.league === "Oro" ? OroBadge : null
                                                                }
                                                                alt="image"
                                                                className="user-badge"
                                                            />
                                                        </span>
                                                    </h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600"> Puntuación </p>
                                                    <h6 class="text-muted f-w-400"> {perfil.score} </h6>
                                                </div>
                                            </div>
                                            <br/>
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <p class="m-b-10 f-w-600"> Nivel etiquetando Imágenes </p>
                                                    <h6 class="text-muted f-w-400"> {perfil.level_image_id.level} </h6>
                                                </div>
                                                <div class="col-sm-4">
                                                    <p class="m-b-10 f-w-600"> Nivel etiquetando Palabras </p>
                                                    <h6 class="text-muted f-w-400"> {perfil.level_word_id.level} </h6>
                                                </div>
                                                <div class="col-sm-4">
                                                    <p class="m-b-10 f-w-600"> Nivel asignando 1 palabra a imágenes </p>
                                                    <h6 class="text-muted f-w-400"> {perfil.level_four_image_id.level} </h6>
                                                </div>
                                            </div>

                                            {/* <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                <li> <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"> <FaFacebook/> </a> </li>
                                                <li> <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"> <FaTwitter/> </a> </li>
                                                <li> <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"> <FaInstagram/> </a> </li>
                                            </ul> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
}
 
export default Profile;