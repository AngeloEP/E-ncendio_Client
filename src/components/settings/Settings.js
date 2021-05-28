import React, { useState, useEffect, useContext } from 'react';

import UploadImage from './uploadImage/UploadImage';
import UploadFourImagesOneWord from './uploadFourImagesOneWord/UploadFourImagesOneWord';
import UploadWord from './uploadWord/UploadWord';
import Admin from './admin/Admin';

import AuthContext from '../../context/autentificacion/authContext';
import ProfileContext from '../../context/profile/profileContext';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ImageIcon from '@material-ui/icons/Image';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import PeopleIcon from '@material-ui/icons/People';

import './settings.css';


const Settings = () => {


    const [navigation, setNavigation] = useState(0);

    // Extraer la información de autentificación del usuario
    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado, cerrarSesión } = authContext

    // Extraer la información de los perfiles
    const profilecontext = useContext(ProfileContext)
    const { perfil, obtenerPerfil } = profilecontext

    useEffect(() => {
        usuarioAutenticado()

        // obteniendo el perfil del usuario
        obtenerPerfil();
    }, [])
    return (
        <div>
            { perfil != null
                ?
                    <>
                        <div className="title-div" >
                            <h3 className="title-settings" > Gestionar contenido del Sitio </h3>
                        </div>
                        <div className="text-center ml-auto mr-auto" >
                            { perfil.league_id.league === "Bronce"
                                ?
                                    "No puede subir contenido aún"
                                :
                                    perfil.league_id.league === "Plata"
                                    ?
                                        "Ya puede subir imágenes, para subir palabras debe aumentar sus puntos!"
                                    :
                                        "Puede subir imágenes y palabras al sitio"
                            }
                        </div>
                        <div className="row buttonsNavigation" >
                            <BottomNavigation
                                value={navigation}
                                onChange={(event, newValue) => {
                                    setNavigation(newValue);
                                }}
                                showLabels
                                className="nav-settings"
                            >
                                { usuario.isAdmin
                                    ?
                                        <BottomNavigationAction
                                            label="Administrador"
                                            icon={<PeopleIcon/>}
                                        />
                                    :
                                        null
                                }
                                <BottomNavigationAction
                                    label="Subir imagen"
                                    icon={<ImageIcon/>}
                                    disabled={false}
                                />
                                <BottomNavigationAction
                                    label="Subir palabra"
                                    icon={<SpellcheckIcon/>}
                                    disabled={
                                        perfil.league_id.league === "Bronce"
                                        ?
                                            true
                                        :
                                            false
                                    }
                                />
                                <BottomNavigationAction
                                    label="Subir ahorcado"
                                    icon={<ImageSearchIcon/>}
                                    disabled={
                                        perfil.league_id.league === "Oro"
                                        ?
                                            false
                                        :
                                            true
                                    }
                                />
                            </BottomNavigation>
                        </div>

                        <div>
                            { usuario && usuario.isAdmin && navigation === 0
                                ?
                                    <Admin />
                                :
                                    navigation === 1
                                    ?
                                        <UploadImage />
                                    :
                                        navigation === 2 
                                        ?
                                            <UploadWord />
                                        :
                                            navigation === 3
                                            ?
                                                <UploadFourImagesOneWord />
                                            :
                                                null 
                            }
                        </div>
                    </>
                :
                    <div className="text-center ml-auto mr-auto" >
                        No puede editar el contenido
                    </div>
            }
        </div>
    );
}
 
export default Settings;