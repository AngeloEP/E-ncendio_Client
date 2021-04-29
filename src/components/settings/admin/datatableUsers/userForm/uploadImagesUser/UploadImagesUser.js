import React, { useState, useEffect, useContext } from 'react';
import './uploadImagesUser.css';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ClipLoader from "react-spinners/ClipLoader";

const UploadImagesUser = ({ usuario,
    imagenes,
    funcionHabilitarInhabilitar,
    cargandoHabilitarInhabilitar,
    funcionEliminar,
    cargandoEliminarImagenPorAdmin,
    cargandoImagenesUsuarioDesdeAdmin,
}) => {

    console.log(cargandoImagenesUsuarioDesdeAdmin)

    return (
        <div className="cards-images" >
            <div className="row">
                { cargandoImagenesUsuarioDesdeAdmin === false
                    ?
                        imagenes.length != 0
                        ?
                            imagenes.map((imagen, index) =>

                                <div key={index} className="col-sm-3 col-md-4" >
                                    
                                    <div className="card text-white tarjeta" >
                                        <img className="card-img-top imagen-tarjeta" src={imagen.Imagen} alt="Card image cap" />
                                        <div className="card-body text-center">
                                            <h5 className="card-title titulo-nombre-card-image"> Nombre </h5>
                                            <p className="card-text nombre-card-image"> {imagen.Nombre} </p>
                                            <h5 className="card-title titulo-fecha-card-image"> Subido el </h5>
                                            <p className="card-text fecha-card-image"> {imagen.Creadoel} </p>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                style={{height: "1%", width: "45%", marginLeft: "2%" }}
                                                disabled={cargandoEliminarImagenPorAdmin}
                                                onClick={() => funcionEliminar(imagen._id)}
                                            >
                                                {
                                                    cargandoEliminarImagenPorAdmin
                                                    ?
                                                    <Grid container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                    >
                                                        <Grid item xs={11} style={{color:"#000", fontSize:"0.9em"}}  >
                                                            Cargando...
                                                        </Grid>
                                                        <Grid item xs={1} >
                                                        <ClipLoader
                                                            color={"#000"}
                                                            loading={true}
                                                            size={20}
                                                        />
                                                        </Grid>
                                                    </Grid>
                                                        
                                                    :
                                                        "Eliminar"
                                                }
                                            </Button>
                                            {/* <a  className={imagen.Habilitada ?
                                                        "btn ml-2 btn-success"
                                                        : "btn ml-2 btn-success" }
                                                        onClick={() => funcionHabilitarInhabilitar(imagen._id)}
                                                        > {imagen.Habilitada ? "Inhabilitar" : "Habilitar"} </a> */}
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                style={imagen.Habilitada ?
                                                        { backgroundColor: "#ffc107",
                                                        borderColor: "#ffc107", height: "1%", width: "45%", marginLeft: "2%" }
                                                        :
                                                        { color: "#fff", backgroundColor: "#28a745", borderColor: "#28a745",
                                                            height: "1%", width: "45%", marginLeft: "2%" }
                                                    }
                                                disabled={cargandoHabilitarInhabilitar}
                                                onClick={() => funcionHabilitarInhabilitar(imagen._id, !imagen.Habilitada)}
                                            >
                                                {
                                                    cargandoHabilitarInhabilitar
                                                    ?
                                                    <Grid container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                    >
                                                        <Grid item xs={11} style={{color:"#000", fontSize:"0.9em"}}  >
                                                            Cargando...
                                                        </Grid>
                                                        <Grid item xs={1} >
                                                        <ClipLoader
                                                            color={"#000"}
                                                            loading={true}
                                                            size={20}
                                                        />
                                                        </Grid>
                                                    </Grid>
                                                        
                                                    :
                                                        imagen.Habilitada ? "Inhabilitar" : "Habilitar"
                                                }
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        :
                        <div className="text-center ml-auto mr-auto" >
                            No hay imágenes
                        </div>
                    :
                        <div className="text-center ml-auto mr-auto" >
                            <ClipLoader
                                color={"#000"}
                                loading={true}
                                size={30}
                            />
                        </div>
                }
            </div>             
                    
        </div>
    );
}
 
export default UploadImagesUser;