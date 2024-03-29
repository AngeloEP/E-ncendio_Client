import React, { useState, useContext, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import logo from '../../assets/img/logo.png';

import AuthContext from '../../context/autentificacion/authContext';
import ProfileContext from '../../context/profile/profileContext';
import DailyTasksContext from '../../context/dailyTasks/dailyTasksContext';

import OroBadge from '../../assets/badges/gold-badge.png';
import BronceBadge from '../../assets/badges/bronze-badge.png';
import PlataBadge from '../../assets/badges/medal.png';

import ProfileDefault from '../../assets/img/profile_default.png';

import FirePoints from '../common/fire/FirePoints';
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";

import "./exitButton.css";
import "./navigation.css";

import { FaTasks } from 'react-icons/fa';

import ClipLoader from "react-spinners/ClipLoader";
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

    const dailyTasksContext = useContext(DailyTasksContext)
    const { tareasDiarias, obtenerTareasDiarias } = dailyTasksContext

    useEffect(() => {
        usuarioAutenticado()
        obtenerPerfil()
        obtenerTareasDiarias()
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

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Fragment>
            { location.pathname !== "/login" && location.pathname !== "/register"  && location.pathname !== "/reset-password"  ? 
                <Nav>
                    <NavLinkLogo to='/home' className="divLogoNavigation" >
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
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/home"  activeStyle={{  }} >
                            Inicio 
                        </NavLink>
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
                        {/* <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/about"  activeStyle={{  }} >
                            Conócenos
                        </NavLink> */}
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/store"  activeStyle={{  }} >
                            Tienda
                        </NavLink>
                        { usuario && usuario.isAdmin
                        ?
                            <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/analytics"  activeStyle={{  }} >
                                Analíticas
                            </NavLink>
                        : null
                        }
                        <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} to="/help"  activeStyle={{  }} >
                            Ayuda
                        </NavLink>
                    </NavMenu>
                    
                    <NavBtn className="infoUserAndExitButton"  >
                        { usuario ? <PNav > Hola <span style={{ fontWeight: 900 }} > {usuario.firstname} </span> </PNav> : null }
                        {perfil != null
                        ?
                            <Fragment>
                            {usuario
                            ?
                                <div id="navigation-image" className={`div-imageUser-navigation ${perfil.frameUsedCss}`} >
                                    <img src={ usuario.urlFile ? usuario.urlFile : ProfileDefault }
                                        className="imageUser-navigation" 
                                        alt="" 
                                    />
                                </div>
                            : null
                            }
                            <FirePoints firePoints={perfil.firePoints} className="userPoints" />
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
                            </Fragment>
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
                        <div>
                            <div className={isOpen ? "closeIconTasks" : "triangle-left" } onClick={() => onOpen()} ></div>
                            <Button className={isOpen ? "button-tasks-close" : "button-tasks" } onClick={() => onOpen()} leftIcon={<FaTasks className="icon-button-tasks" />} colorScheme="teal" variant="solid">
                                Ver desafíos
                            </Button>
                            <Drawer onClose={onClose} isOpen={isOpen} size="xs">
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerCloseButton />
                                    <DrawerHeader> Estos son tus desafíos del día de hoy. </DrawerHeader>
                                    <DrawerBody>
                                        { tareasDiarias.length > 0
                                        ?
                                            tareasDiarias.map((tarea, index) => 
                                                <Fragment key={index} >
                                                    <div>
                                                        <Badge ml="1" fontSize="0.8em" colorScheme={tarea.isClaimed ? "green" : "red" } >
                                                            {tarea.isClaimed ? "Listo" : "Incompleto" }
                                                        </Badge>
                                                        {tarea.message} ({tarea.newCount}/{tarea.total})
                                                        <br/><br/><br/>
                                                    </div>
                                                </Fragment>
                                                )
                                        :
                                            <div className="text-center position-relative" style={{ top: "50%" }} >
                                                <ClipLoader
                                                    color={"#000"}
                                                    loading={true}
                                                    size={70}
                                                    />
                                            </div>
                                        }
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                        </div>
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