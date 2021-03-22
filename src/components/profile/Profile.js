import React, { useState, useEffect, useContext } from 'react';
import ProfileDefault from '../../assets/img/profile_default.png';

import AuthContext from '../../context/autentificacion/authContext';
import ProfileContext from '../../context/profile/profileContext';

import './profile.css';

import {
    FaFacebook,
    FaTwitter,
    FaSnapchat,
    FaInstagram,
    FaEdit,
} from 'react-icons/fa';

const Profile = () => {
    // Extraer la información de autentificación
    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado } = authContext

    // Extraer la información de los perfiles
    const profilecontext = useContext(ProfileContext)
    const { perfil, obtenerPerfil } = profilecontext

    useEffect(() => {
        usuarioAutenticado()

        // obteniendo el perfil del usuario
        obtenerPerfil();
    }, [])

    if (perfil) {
        console.log(perfil)
        console.log(usuario)
    }

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
                                            <div class="m-b-25"> <img src={usuario.urlFile} class="img-radius" alt="User-Profile-Image" /> </div>
                                            <h4 class="f-w-600"> {usuario.firstname} </h4>
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
                                                <div class="col-sm-6">
                                                    <button className="profile-edit-btn" >
                                                        Editar Perfil
                                                        <FaEdit className="iconoEditar"/>
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
                                            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"> Perfil de juego en E-ncendio </h6>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600"> Liga </p>
                                                    <h6 class="text-muted f-w-400"> {perfil.league_id.league} </h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600"> Puntuación </p>
                                                    <h6 class="text-muted f-w-400"> {perfil.score} </h6>
                                                </div>
                                            </div>
                                            <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                <li> <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"> <FaFacebook/> </a> </li>
                                                <li> <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"> <FaTwitter/> </a> </li>
                                                <li> <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"> <FaInstagram/> </a> </li>
                                            </ul>
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