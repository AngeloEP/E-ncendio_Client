import React, { useState, useEffect, useContext } from 'react';

import UploadImage from './uploadImage/UploadImage';
import UploadFourImagesOneWord from './uploadFourImagesOneWord/UploadFourImagesOneWord';
import UploadWord from './uploadWord/UploadWord';
import UploadTip from './uploadTip/UploadTip';
import UploadCategory from './uploadCategory/UploadCategory';
import Admin from './admin/Admin';

import AuthContext from '../../context/autentificacion/authContext';
import ProfileContext from '../../context/profile/profileContext';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ImageIcon from '@material-ui/icons/Image';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import PeopleIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';
import CategoryIcon from '@material-ui/icons/Category';
import PageviewIcon from '@material-ui/icons/Pageview';

import './settings.css';
import UploadUniqueSelection from './uploadUniqueSelection/UploadUniqueSelection';


const Settings = () => {


    const [navigation, setNavigation] = useState(0);

    // Extraer la información de autentificación del usuario
    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado } = authContext

    // Extraer la información de los perfiles
    const profilecontext = useContext(ProfileContext)
    const { perfil, obtenerPerfil } = profilecontext

    useEffect(() => {
        usuarioAutenticado()

        // obteniendo el perfil del usuario
        obtenerPerfil();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            { perfil != null
                ?
                    <>
                        <h1 className="settings-title" > Contenido de E-ncendio </h1>
                        <div className="date-settings" >
                            <span>
                                { new Date().getDate() + '-' + new Date().toLocaleDateString(undefined, { month: 'long'}) + '-' + new Date().getFullYear() }
                            </span>
                        </div>
                        <div className="text-center ml-auto mr-auto availableContentText" >
                            { perfil.league_id.league === "Bronce"
                                ?
                                    "Puede subir imágenes al sitio"
                                :
                                    perfil.league_id.league === "Plata"
                                    ?
                                        "Ya puede subir imágenes y palabras!"
                                    :
                                        "¡Ahora ya puede subir el contenido que desee al sitio para ser evaluado!"
                            }
                        </div>
                        <div className="buttonsNavigation" >
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
                                <BottomNavigationAction
                                    label="Subir selección única"
                                    icon={<PageviewIcon/>}
                                    disabled={
                                        perfil.league_id.league === "Oro"
                                        ?
                                            false
                                        :
                                            true
                                    }
                                />
                                <BottomNavigationAction
                                    label="Subir tip"
                                    icon={<InfoIcon/>}
                                    disabled={false}
                                />
                                { usuario.isAdmin
                                    ?
                                        <BottomNavigationAction
                                            label="Subir categoría"
                                            icon={<CategoryIcon/>}
                                        />
                                    :
                                        null
                                }
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
                                                navigation === 4
                                                ?
                                                    <UploadUniqueSelection />
                                                :
                                                    navigation === 5
                                                    ?
                                                        <UploadTip />
                                                    :
                                                        navigation === 6
                                                        ?
                                                            <UploadCategory />
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