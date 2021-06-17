import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import logo from '../../assets/img/logo.png';

import AuthContext from '../../context/autentificacion/authContext';
import ProfileContext from '../../context/profile/profileContext';

import OroBadge from '../../assets/badges/gold-badge.png';
import BronceBadge from '../../assets/badges/bronze-badge.png';
import PlataBadge from '../../assets/badges/medal.png';

import "./exitButton.css";
import "./navigation.css";

import {
    Nav,
    NavLinkLogo,
    NavLink,
    Bars,
    Times,
    NavMenu,
    NavBtn,
    ExitBtn,
    PNav
  } from './NavbarElements';
// import './NavbarElements.css';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { Nav, NavLink } from 'react-bootstrap';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginLeft: theme.spacing(3),
        flexGrow: 1,
    },
    nav: {
        marginRight: theme.spacing(50),
    },
    navlink: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
  }));

const Navigation =  ({ location, history })  => {

    // Extraer la información de autentificación del usuario
    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado, cerrarSesión } = authContext

    // Extraer la información de los perfiles
    const profilecontext = useContext(ProfileContext)
    const { perfil, obtenerPerfil } = profilecontext

    useEffect(() => {
        usuarioAutenticado()

        obtenerPerfil()
        // eslint-disable-next-line
    }, [])
    
    const classes = useStyles();
    const [ clicked, setClicked ] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
    }

    // Cerrar Sesión
    const logout = () => {
        if (isLoading) return;
        console.log("Allá te voy San Pedro....")
        setIsLoading(true);
        setTimeout((e) => {
            console.log("Saliendo")
            cerrarSesión()
            setIsLoading(false)
            history.push('/login')
        }, 2000);
    }

    const [isLoading, setIsLoading] = useState(false);

    function MouseOver(event) {
        event.target.style.background = 'white';
    }
    
    function MouseOut(event) {
        event.target.style.background = '';
    }

    function MouseEnter(event) {
        event.target.style.background = 'lightgreen';
    }

    return (
        <Fragment>
            { location.pathname !== "/login" && location.pathname !== "/register"  && location.pathname !== "/reset-password"  ? 
                <Nav>
                    <NavLinkLogo to='/' >
                        <img src={logo} alt='logo' style={{ width:"50px", height: "50px" }} />
                    <Typography variant="h6" style={{ display: 'flex', marginLeft: "5px", color: 'white' }} >
                        E-ncendio
                    </Typography>
                    </NavLinkLogo>
                    { clicked 
                    ? <Times onClick={ () => handleClick() } />
                    : <Bars onClick={ () => handleClick() } />
                    }
                    <NavMenu className={ clicked ? 'nav-menu active' : 'nav-menu' } >
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/profile"  activeStyle={{  }} >
                            Perfil
                        </NavLink>
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/rank"  activeStyle={{  }} >
                            Ranking
                        </NavLink>
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/games"  activeStyle={{  }} >
                            Juegos
                        </NavLink>
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/settings" activeStyle={{  }} >
                            Contenido
                        </NavLink>
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/home"  activeStyle={{  }} >
                            Inicio 
                        </NavLink>
                        {/* <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/about"  activeStyle={{  }} >
                            Conócenos
                        </NavLink> */}
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/help"  activeStyle={{  }} >
                            Ayuda
                        </NavLink>
                    </NavMenu>
                    
                    <NavBtn>
                        { usuario ? <PNav > Hola <span style={{ fontWeight: 900 }} > {usuario.firstname} </span> </PNav> : null }
                        {perfil != null
                        ?
                            <span className="badge badge-pill badge-light align-middle">
                                <img src={
                                        perfil.league_id.league === "Bronce" ? BronceBadge
                                        : perfil.league_id.league === "Plata" ? PlataBadge
                                        : perfil.league_id.league === "Oro" ? OroBadge : null
                                    }
                                    alt=""
                                    className="user-badge-nav"
                                />
                            </span>
                        :
                            null
                        }
                        <ExitBtn
                            onClick={logout}
                            id="botonSalir"
                            className={isLoading ? "loading" : undefined}
                        >
                            
                            <span>
                                <ExitToAppIcon fontSize='large' />
                                <div className="spinner" />
                                <span className="text"> Salir </span>
                            </span>
                        </ExitBtn>
                        {/* <div className="salir" >
                            <button
                                id="botonSalir"
                                className={isLoading ? "loading" : undefined}
                                onClick={handleOnClick}
                            >
                                <div className="spinner" />
                                <p className="text"> Salir </p>
                            </button>
                        </div> */}
                    </NavBtn>
                </Nav>
            : null }
        </Fragment>

    );
}
 
export default withRouter(Navigation);