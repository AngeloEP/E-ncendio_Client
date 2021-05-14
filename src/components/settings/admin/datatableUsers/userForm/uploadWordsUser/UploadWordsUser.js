import React, { useState, useEffect, useContext } from 'react';
import './uploadWordsUser.css';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ClipLoader from "react-spinners/ClipLoader";

const UploadWordsUser = ({ usuario,
    palabras,
    funcionHabilitarInhabilitar,
    cargandoHabilitarInhabilitarPalabra,
    funcionEliminar,
    cargandoEliminarPalabraPorAdmin,
    cargandoPalabrasUsuarioDesdeAdmin
}) => {
    const keyDiv = 1;

    return (
        <div className="cards-words" >
            <div className="row">
                { cargandoPalabrasUsuarioDesdeAdmin === false
                    ?
                        palabras.length != 0
                        ?
                            palabras.map((palabra, index) =>

                                <div key={index} className="col-sm-3 col-md-4" >
                                    
                                    <div className="card text-white tarjeta-words" >
                                        <Paper className="card-img-top palabra-tarjeta" elevation={10} variant="outlined"  >
                                            {palabra.Palabra}
                                        </Paper>
                                        <div className="card-body text-center">
                                            <h5 className="card-title titulo-nombre-card-word"> Nombre </h5>
                                            <p className="card-text nombre-card-word"> {palabra.Palabra} </p>
                                            <h5 className="card-title titulo-fecha-card-word"> Subido el </h5>
                                            <p className="card-text fecha-card-word"> {palabra.Creadoel} </p>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                style={{height: "15%", width: "45%", marginLeft: "2%" }}
                                                disabled={cargandoEliminarPalabraPorAdmin}
                                                onClick={() => funcionEliminar(palabra._id)}
                                            >
                                                {
                                                    cargandoEliminarPalabraPorAdmin
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
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                style={palabra.Habilitada ?
                                                        { backgroundColor: "#ffc107",
                                                        borderColor: "#ffc107", height: "15%", width: "45%", marginLeft: "2%" }
                                                        :
                                                        { color: "#fff", backgroundColor: "#28a745", borderColor: "#28a745",
                                                            height: "15%", width: "45%", marginLeft: "2%" }
                                                    }
                                                disabled={cargandoHabilitarInhabilitarPalabra}
                                                onClick={() => funcionHabilitarInhabilitar(palabra._id, !palabra.Habilitada)}
                                            >
                                                {
                                                    cargandoHabilitarInhabilitarPalabra
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
                                                        palabra.Habilitada ? "Inhabilitar" : "Habilitar"
                                                }
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        :
                        <div className="text-center ml-auto mr-auto" >
                            No hay palabras
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
 
export default UploadWordsUser;