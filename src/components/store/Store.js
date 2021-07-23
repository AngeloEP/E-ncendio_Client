import React, { useContext, useEffect, Fragment } from 'react';
// import useState from 'react-usestateref';

import AuthContext from '../../context/autentificacion/authContext';
import ProfileContext from '../../context/profile/profileContext';
import StoreContext from '../../context/store/storeContext';

import Grid from '@material-ui/core/Grid';

import ProfileDefault from '../../assets/img/profile_default.png';
import './store.css';

import ClipLoader from "react-spinners/ClipLoader";
import Button from '@material-ui/core/Button';

const Store = () => {

    const authContext = useContext(AuthContext)
    const {
        usuario,
        usuarioAutenticado,
    } = authContext

    const profileContext = useContext(ProfileContext)
    const { perfil, obtenerPerfil } = profileContext

    const storeContext = useContext(StoreContext)
    const {
        marcos,
        apodos,
        marcosUsuario,
        apodosUsuario,
        cargandoComprarMarco,
        cargandoComprarApodo,
        obtenerProductosEnTienda,
        obtenerProductosUsuarioEnTienda,
        comprarMarco,
        comprarApodo,
    } = storeContext

    useEffect(() => {

        usuarioAutenticado()
        obtenerPerfil()
        obtenerProductosEnTienda()
        obtenerProductosUsuarioEnTienda()
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <h1 className="settings-title" > Bienvenido a la tienda de E-ncendio </h1>
            <div className="date-settings" >
                <span>
                    { new Date().getDate() + '-' + new Date().toLocaleDateString(undefined, { month: 'long'}) + '-' + new Date().getFullYear() }
                </span>
            </div>
            {perfil != null && perfil.league_id.league !== "Bronce"
            ?
                <div>
                    
                    <div className="frame-section-store" >
                        <h3 className="title-frame-section-store" > Marco de imagen de perfil </h3>
                        { usuario != null && perfil != null && marcos.length > 0 && apodos.length > 0
                        ?
                            <Fragment>
                                <div className="row ml-4 mr-0">
                                    {marcos.map((marco, indexFrame) =>
                                        <div key={indexFrame} className="col-sm-4 col-md-4 col-lg-3" >         
                                            <div className="card-store text-white tarjeta-store" >
                                                <div
                                                    className={`div-imageUser-store ${marco.nameCss}`}
                                                >
                                                    <img src={ usuario.urlFile ? usuario.urlFile : ProfileDefault }
                                                        className="imageUser-navigation" 
                                                        alt="" 
                                                        />
                                                </div>
                                                <div className="card-body text-center">
                                                    <h5 className="card-title titulo-nombre-card-frame"> Nombre </h5>
                                                    <p className="card-text nombre-card-frame"> {marco.name} </p>
                                                    <h5 className="card-title titulo-costo-card-frame"> Costo: </h5>
                                                    <p className="card-text costo-card-frame"> {marco.firePoints} Fire Points </p>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        style={ marcosUsuario.some(item => item.name === marco.name)
                                                            ? {height: "15%", width: "65%", marginTop: "5%", color: "#fff", backgroundColor: "#8BA1B1", borderColor: "#8BA1B1" }
                                                            :
                                                            {height: "15%", width: "65%", marginTop: "5%", color: "#fff", backgroundColor: "#28a745", borderColor: "#28a745" }
                                                        }
                                                        disabled={cargandoComprarMarco | marcosUsuario.some(item => item.name === marco.name) ? true : false}
                                                        onClick={() => comprarMarco(marco._id)}
                                                    >
                                                        {
                                                            cargandoComprarMarco && !(marcosUsuario.some(item => item.name === marco.name))
                                                            ?
                                                            <Grid container
                                                                direction="row"
                                                                justify="center"
                                                                alignItems="center"
                                                            >
                                                                <Grid item xs={11} style={{color:"#fff", fontSize:"1em"}}  >
                                                                    comprando...
                                                                </Grid>
                                                                <Grid item xs={1} >
                                                                <ClipLoader
                                                                    color={"#fff"}
                                                                    loading={true}
                                                                    size={20}
                                                                />
                                                                </Grid>
                                                            </Grid>
                                                                
                                                            :
                                                                marcosUsuario.some(item => item.name === marco.name)
                                                                ? "Comprado"
                                                                : "Comprar"
                                                        }
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Fragment>
                            
                        :
                            <div className="text-center position-relative" style={{ top: "50%" }} >
                                <ClipLoader
                                    color={"#000"}
                                    loading={true}
                                    size={70}
                                    />
                            </div>
                        }
                    </div>

                    {/* Apodos */}
                    <div className="nickname-section-store" >
                        <h3 className="title-nickname-section-store" > Apodos para mostrar en Ranking </h3>
                            {usuario != null && perfil != null && marcos.length > 0 && apodos.length > 0
                            ?
                                <Fragment>
                                    <div className="row ml-4 mr-0">
                                        {apodos.map((apodo, indexNickname) =>
                                            <div key={indexNickname} className="col-sm-3 col-md-2 col-lg-3" >         
                                                <div className="card-store text-white tarjeta-store" >
                                                    <div className="div-nickname" >
                                                        <h2 className="nickname"> {apodo.name} </h2>
                                                    </div>
                                                    <div className="card-body text-center">
                                                        <h5 className="card-title titulo-costo-card-frame"> Costo: </h5>
                                                        <p className="card-text costo-card-frame"> {apodo.firePoints} Fire Points </p>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            style={ apodosUsuario.some(item => item.name === apodo.name)
                                                                ? {height: "15%", width: "65%", marginTop: "5%", color: "#fff", backgroundColor: "#8BA1B1", borderColor: "#8BA1B1" }
                                                                :
                                                                {height: "15%", width: "65%", marginTop: "5%", color: "#fff", backgroundColor: "#28a745", borderColor: "#28a745" }
                                                            }
                                                            disabled={cargandoComprarApodo | apodosUsuario.some(item => item.name === apodo.name) ? true : false}
                                                            onClick={() => comprarApodo(apodo._id)}
                                                        >
                                                            {
                                                                cargandoComprarApodo && !(apodosUsuario.some(item => item.name === apodo.name))
                                                                ?
                                                                <Grid container
                                                                    direction="row"
                                                                    justify="center"
                                                                    alignItems="center"
                                                                >
                                                                    <Grid item xs={11} style={{color:"#fff", fontSize:"1em"}}  >
                                                                        comprando...
                                                                    </Grid>
                                                                    <Grid item xs={1} >
                                                                    <ClipLoader
                                                                        color={"#fff"}
                                                                        loading={true}
                                                                        size={20}
                                                                    />
                                                                    </Grid>
                                                                </Grid>
                                                                    
                                                                :
                                                                    apodosUsuario.some(item => item.name === apodo.name)
                                                                    ? "Comprado"
                                                                    : "Comprar"
                                                            }
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Fragment>
                            :
                                <div className="text-center position-relative" style={{ top: "50%" }} >
                                    <ClipLoader
                                        color={"#000"}
                                        loading={true}
                                        size={70}
                                        />
                                </div>
                            }
                        </div>
                    </div>
                :
                    <div className="container w-100" >
                        <div className="blockContentStore" >
                            <span className="spansito-no-words" > Usted aún no puede entrar a la tienda de E-ncendio, ¡Debe estar mínimo en liga de Plata! </span>
                        </div>
                    </div>
                }
        </div>
    );
}
 
export default Store;