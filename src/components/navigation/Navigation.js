import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import logo from '../../assets/img/logo.png';
import AuthContext from '../../context/autentificacion/authContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MenuItems } from "./MenuItems"
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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Link from '@material-ui/core/Link';
// import { Nav, NavLink } from 'react-bootstrap';
import { Fragment } from 'react';
import { Button } from '@material-ui/core';


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

    useEffect(() => {
        usuarioAutenticado()
    }, [])
    
    const classes = useStyles();
    const [ clicked, setClicked ] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
    }

    // Cerrar Sesión
    const logout = () => {
        setTimeout((e) => {
            console.log("Saliendo")
            cerrarSesión()
            history.push('/login')
        }, 1000);
        console.log("Allá te voy San Pedro....")
    }

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
            { location.pathname !== "/login" && location.pathname !== "/register"  ? 
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
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/home" activeStyle >
                            Inicio 
                        </NavLink>
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/games" activeStyle >
                            Juegos
                        </NavLink>
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/rank" activeStyle >
                            Ranking
                        </NavLink>
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/profile" activeStyle >
                            Perfil
                        </NavLink>
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/about" activeStyle >
                            Conócenos
                        </NavLink>
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/help" activeStyle >
                            Ayuda
                        </NavLink>
                    </NavMenu>
                    
                    <NavBtn>
                        { usuario ? <PNav > Hola <span style={{ fontWeight: 900 }} > {usuario.firstname} </span> </PNav> : null }
                        <ExitBtn >
                            <span>
                                <ExitToAppIcon fontSize='large' onClick={logout} />
                            </span>
                        </ExitBtn>
                    </NavBtn>
                </Nav>
            : null }
        </Fragment>

    );
}
 
export default withRouter(Navigation);