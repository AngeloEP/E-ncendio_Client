import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import AuthContext from '../../../context/autentificacion/authContext';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Link from '@material-ui/core/Link';
import { Nav, NavLink } from 'react-bootstrap';


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

const Menu =  ({ location, history })  => {

    // Extraer la información de autentificación del usuario
    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado, cerrarSesión } = authContext

    useEffect(() => {
        usuarioAutenticado()
    }, [])
    
    const classes = useStyles();

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
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    {/* Poner LOGO E-NCENDIO */}
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    E-ncendio
                </Typography>
                <div className="container"  >
                    <Nav justify variant="tabs" className={classes.nav} activeKey={location.pathname}  >
                        <Nav.Item>
                            <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} href="/home" > Inicio </NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} href="/games" > Juegos </NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} href="/rank" > Ranking </NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} href="/profile" > Perfil </NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} href="/about" > Conócenos </NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            <NavLink className={classes.navlink} onMouseUp={MouseEnter} onMouseOver={MouseOver} onMouseOut={MouseOut} href="/help" > Ayuda </NavLink>
                        </Nav.Item>
                    </Nav>
                </div>
                { usuario ? <p className="nombre-usuario" > Hola <span> {usuario.firstname} </span> </p> : null }
                <Link color="inherit" >
                    <ExitToAppIcon fontSize='large' onClick={logout} />
                </Link>
            </Toolbar>
        </AppBar>
    );
}
 
export default withRouter(Menu);