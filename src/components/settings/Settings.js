import React, { useState, useEffect, useContext } from 'react';
import UploadImage from './uploadImage/UploadImage';
import UploadWord from './uploadWord/UploadWord';
import Admin from './admin/Admin';

import AuthContext from '../../context/autentificacion/authContext';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ImageIcon from '@material-ui/icons/Image';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import PeopleIcon from '@material-ui/icons/People';

import './settings.css';

const Settings = () => {

    const [navigation, setNavigation] = useState(0);

    // Extraer la información de autentificación del usuario
    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado, cerrarSesión } = authContext

    useEffect(() => {
        usuarioAutenticado()
    }, [])
    return (
        <div>
            <div className="title-div" >
                <h3 className="title-settings" > Gestionar contenido del Sitio </h3>
            </div>
            <BottomNavigation
                value={navigation}
                onChange={(event, newValue) => {
                    setNavigation(newValue);
                }}
                showLabels
                className="nav-settings"
            >
                <BottomNavigationAction label="Administrador" icon={<PeopleIcon />} />
                <BottomNavigationAction label="Subir imagen" icon={<ImageIcon />} />
                <BottomNavigationAction label="Subir palabra" icon={<SpellcheckIcon />} />
            </BottomNavigation>

            <div>
                { usuario && usuario.isExpert && navigation === 0
                    ?
                        <Admin />
                    :
                        navigation === 1
                        ?
                            <UploadImage />
                        :
                            <UploadWord />
                }
            </div>
        </div>
    );
}
 
export default Settings;