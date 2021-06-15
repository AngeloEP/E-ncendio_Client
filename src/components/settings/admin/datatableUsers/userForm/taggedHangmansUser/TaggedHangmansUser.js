import React, { } from 'react';
import './taggedHangmansUser.css';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";

const TaggedHangmansUser = ({ usuario, ahorcadosEtiquetados, funcionResetear, cargandoResetearEtiquetasAhorcados }) => {
    return (
        <div className="cards-tag-hangmans" >
            <div className="div-reset-tag-hangmans" >
                <Button
                    variant="contained"
                    color="secondary"
                    // style={{ width: "90%" }}
                    startIcon={<DeleteIcon />}
                    onClick={() => funcionResetear(usuario._id)}
                    disabled={cargandoResetearEtiquetasAhorcados || ahorcadosEtiquetados.length === 0 ? true : false }
                >
                    {
                        cargandoResetearEtiquetasAhorcados
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
                        "Resetear etiquetas de ahorcados"
                    }
                </Button>
            </div>
            <div className="row">
                { ahorcadosEtiquetados.length !== 0
                    ?
                        ahorcadosEtiquetados.map((ahorcadoEtiquetado, index) =>

                            <div key={index} className="col-sm-6 col-md-6" >
                                
                                <div className="card text-white tarjeta-tag-hangman" >
                                    <div className="fila">
                                        <div className="columna">
                                                <img className="imagenes-tarjeta" src={ahorcadoEtiquetado.hangman_id.imageUrl_1} alt="" />
                                        </div>
                                        <div className="columna">
                                                <img className="imagenes-tarjeta" src={ahorcadoEtiquetado.hangman_id.imageUrl_2} alt="" />
                                        </div>
                                    </div>
                                    <div className="fila">
                                            <div className="columna">
                                                <img className="imagenes-tarjeta" src={ahorcadoEtiquetado.hangman_id.imageUrl_3} alt="" />
                                            </div>
                                            <div className="columna">
                                                <img className="imagenes-tarjeta" src={ahorcadoEtiquetado.hangman_id.imageUrl_4} alt="" />
                                            </div>
                                    </div>
                                    <div className="card-body text-center">
                                        <h5 className="card-title titulo-nombre-card-hangman"> Palabra </h5>
                                        <p className="card-text nombre-card-hangman"> {ahorcadoEtiquetado.hangman_id.associatedWord} </p>
                                        <h5 className="card-title titulo-fecha-card-hangman"> Subido el </h5>
                                        <p className="card-text fecha-card-hangman"> {ahorcadoEtiquetado.hangman_id.createdAt} </p>
                                    </div>
                                </div>
                            </div>
                        )
                    :
                    <div className="text-center ml-auto mr-auto" >
                        Aún no ha etiquetado ahorcados
                    </div>
                }
            </div>             
                    
        </div>
    );
}
 
export default TaggedHangmansUser;