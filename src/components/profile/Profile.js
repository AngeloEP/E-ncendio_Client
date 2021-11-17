import React, { useEffect, useContext } from 'react';
import ProfileDefault from '../../assets/img/profile_default.png';

import AuthContext from '../../context/autentificacion/authContext';
import ProfileContext from '../../context/profile/profileContext';
import UsuariosContext from '../../context/usuarios/usuariosContext';

import './profile.css';
import OroBadge from '../../assets/badges/gold-badge.png';
import BronceBadge from '../../assets/badges/bronze-badge.png';
import PlataBadge from '../../assets/badges/medal.png';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import RewardNotification from '../common/fire/RewardNotification';

import {
    // FaFacebook,
    // FaTwitter,
    // FaInstagram,
    FaEdit,
} from 'react-icons/fa';

const Profile = ( props ) => {
    // Extraer la información de autentificación
    const authContext = useContext(AuthContext)
    const {
        usuario,
        recompensasModificarPerfil,
        recompensasTareas,
        modificacionUsuarioExitosa,
        usuarioAutenticado,
        cambiarStateModificacionUsuario,
        borrarRecompensasModificarPerfil,
        borrarRecompensasModificarPerfilTareas,
    } = authContext

    // Extraer la información de los perfiles
    const profilecontext = useContext(ProfileContext)
    const { perfil, obtenerPerfil } = profilecontext

    const usuariosContext = useContext(UsuariosContext)
    const { 
        obtenerImagenesUsuarioAdmin,
        obtenerPalabrasUsuarioAdmin,
        obtenerAhorcadosUsuarioAdmin,
        obtenerSeleccionesUnicasUsuarioAdmin,
    } = usuariosContext

    useEffect(() => {
        if (usuario!=null) {
            obtenerImagenesUsuarioAdmin(usuario._id)
            obtenerPalabrasUsuarioAdmin(usuario._id)
            obtenerAhorcadosUsuarioAdmin(usuario._id)
            obtenerSeleccionesUnicasUsuarioAdmin(usuario._id)
        }
        // eslint-disable-next-line
    }, [usuario])

    useEffect(() => {
        usuarioAutenticado()

        if ( modificacionUsuarioExitosa ) {
            cambiarStateModificacionUsuario()
        }
        
        // obteniendo el perfil del usuario
        obtenerPerfil();
        // eslint-disable-next-line
    }, [ modificacionUsuarioExitosa ])

    const updateButtonAction = () => {
        localStorage.setItem('firstname', usuario.firstname );
        localStorage.setItem('lastname', usuario.lastname );
        localStorage.setItem('gender', usuario.gender );
        localStorage.setItem('city', usuario.city );
        localStorage.setItem('age', usuario.age );
        localStorage.setItem('phone', usuario.phone );
        localStorage.setItem('urlFile', usuario.urlFile );
        localStorage.setItem('frame', perfil.frameUsed );
        localStorage.setItem('nickname', perfil.nicknameUsed );

        props.history.push('/profile/edit')
    }

    return (
        <div className="page-content page-container" id="page-content" >
            <h1 className="profile-title" > Perfil </h1>
            <div className="date-profile" >
                <span>
                    { new Date().getDate() + '-' + new Date().toLocaleDateString(undefined, { month: 'long'}) + '-' + new Date().getFullYear() }
                </span>
            </div>

            {recompensasModificarPerfil !== null
                ?
                    <RewardNotification
                        recompensas={recompensasModificarPerfil}
                        borrarRecompensas={borrarRecompensasModificarPerfil}
                    />
                : null
            }

            {recompensasTareas !== null
                ?
                    <RewardNotification
                        recompensas={recompensasTareas}
                        borrarRecompensas={borrarRecompensasModificarPerfilTareas}
                    />
                : null
            }

            { perfil != null
            ?
                <div className="container emp-profile">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={ usuario.urlFile ? usuario.urlFile : ProfileDefault } className="img-radius" alt="" /> 
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="profile-head">
                                <h5>
                                {usuario.firstname} {usuario.lastname}
                                </h5>
                                <h6>
                                            { usuario.isFireRelated
                                            ?
                                                <>
                                                    Estoy relacionado con los incendios 
                                                    <div>
                                                        Actividades: {usuario.fireRelation} 
                                                    </div>
                                                </>
                                            :
                                                "No estoy relacionado con los incendios"
                                            }
                                </h6>
                            </div>
                        </div>
                        <div className="col-md-4 divEditBtn">
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
                                <div className="row">
                                    <div className="col-6 col-sm-6 col-log-6 col-xl-6 textBtnProfile">
                                            Editar Perfil
                                    </div>
                                    <div className="col-6 col-sm-6 col-log-6 col-xl-6">
                                        <FaEdit className="iconoEditar"/>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <div>
                                    <p>Imágenes</p>
                                    <div href="!#">Etiquetadas: {perfil.imageTagCount} </div>
                                    <div href="!#">Subidas: {perfil.uploadImageCount} </div>
                                </div>
                                <div>
                                    <p>Palabras</p>
                                    <div href="!#">Etiquetadas: {perfil.wordTagCount} </div>
                                    <div href="!#">Subidas: {perfil.uploadWordCount} </div>
                                </div>
                                <div>
                                    <p>Ahorcados</p>
                                    <div href="!#">Completados: {perfil.hangmanTagCount} </div>
                                    <div href="!#">Subidos: {perfil.uploadHangmanCount} </div>
                                </div>
                                <div>
                                    <p>Selecciones Únicas</p>
                                    <div href="!#">Completadas: {perfil.uniqueSelectionTagCount} </div>
                                    <div href="!#">Subidas: {perfil.uploadUniqueSelectionCount} </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 tab-content profile-tab">
                            <Tabs defaultActiveKey="about" id="uncontrolled-tab-example" className="mb-3">
                                <Tab id="" eventKey="about" title="Información personal">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{usuario.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Teléfono</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{usuario.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Edad</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{usuario.age}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Género</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{usuario.gender}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Ciudad / Comuna</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{usuario.city}</p>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="gameProfile" title="Perfil del juego">
                                    <div className="row">
                                        <div className="col-md-6 mt-2">
                                            <label>Liga</label>
                                        </div>
                                        <div className="col-md-6">
                                            {perfil.league_id.league} 
                                            <span className="badge badge-pill badge-light align-middle">
                                                <img src={
                                                        perfil.league_id.league === "Bronce" ? BronceBadge
                                                        : perfil.league_id.league === "Plata" ? PlataBadge
                                                        : perfil.league_id.league === "Oro" ? OroBadge : null
                                                    }
                                                    alt=""
                                                    className="user-badge"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Puntuación</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{perfil.score}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Nivel etiquetando imágenes</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{perfil.level_image_id.level}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Nivel etiquetando Palabras</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{perfil.level_word_id.level}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Nivel completando ahorcados</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{perfil.level_four_image_id.level}</p>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="storeBuy" title="Comprado en tienda">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Apodo</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{perfil.nicknameUsed ? perfil.nicknameUsed : "No equipado"}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-6">
                                            <label>Marco</label>
                                        </div>
                                        <div className="col-md-6">
                                            <div className={`div-imageUser-profile ${perfil.frameUsedCss}`} >
                                                <img src={ usuario.urlFile ? usuario.urlFile : ProfileDefault } alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
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