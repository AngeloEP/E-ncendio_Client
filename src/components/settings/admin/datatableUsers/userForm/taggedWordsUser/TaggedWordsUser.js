import React, { useState, useEffect, useContext } from 'react';
import './taggedWordsUser.css';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";

import Paper from '@material-ui/core/Paper';

const TaggedWordsUser = ({ usuario,
    palabrasEtiquetadas,
    funcionResetear,
    cargandoResetearEtiquetasPalabras,
    cargandoPalabrasEtiquetadasUsuarioDesdeAdmin,
}) => {

    return (
        <div className="cards-tag-words" >
            <div className="div-reset-tag-words" >
                <Button
                    variant="contained"
                    color="secondary"
                    // style={{ width: "90%" }}
                    startIcon={<DeleteIcon />}
                    onClick={() => funcionResetear(usuario._id)}
                    disabled={cargandoResetearEtiquetasPalabras || palabrasEtiquetadas.length == 0 ? true : false }
                >
                    {
                        cargandoResetearEtiquetasPalabras
                        ?
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={11} style={{color:"#000"}} >
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
                        "Resetear etiquetas de palabras"
                    }
                </Button>
            </div>
            <div className="row">
                { cargandoPalabrasEtiquetadasUsuarioDesdeAdmin === false
                    ? 
                        palabrasEtiquetadas.length != 0
                        ?
                            <>
                                {palabrasEtiquetadas.map((palabraEtiquetada, index) =>

                                    <div key={index} className="col-sm-3 col-md-4" >
                                        
                                        <div className="card text-white tarjeta-tag-words" >
                                            <Paper className="card-img-top palabra-tarjeta-etiqueta" elevation={10} variant="outlined"  >
                                                {palabraEtiquetada.palabra}
                                            </Paper>
                                            <div className="card-body text-center">
                                                <h5 className="card-title titulo-nombre-card-tag-word"> Eligió etiqueta </h5>
                                                <p className="card-text nombre-card-tag-word"> {palabraEtiquetada.categoria} </p>
                                                {/* <h5 className="card-title titulo-fecha-card-tag-word"> Subido el </h5>
                                                <p className="card-text fecha-card-tag-word"> {palabraEtiquetada.Creadoel} </p> */}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        :
                        <div className="text-center ml-auto mr-auto" >
                            Aún no ha etiquetado palabras
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
 
export default TaggedWordsUser;