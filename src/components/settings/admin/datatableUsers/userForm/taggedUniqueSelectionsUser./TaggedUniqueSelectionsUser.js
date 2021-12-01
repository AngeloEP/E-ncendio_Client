import React, { } from 'react';
import './taggedUniqueSelectionsUser.css';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";

const TaggedUniqueSelectionsUser = ({ usuario, seleccionesUnicasEtiquetadas, funcionResetear, cargandoResetearEtiquetasSeleccionesUnicas }) => {
    return (
        <div className="cards-tag-uniqueSelections" >
            <div className="div-reset-tag-uniqueSelections" >
                <Button
                    variant="contained"
                    color="secondary"
                    className="btnResetTagContent"
                    startIcon={<DeleteIcon />}
                    onClick={() => funcionResetear(usuario._id)}
                    disabled={cargandoResetearEtiquetasSeleccionesUnicas || seleccionesUnicasEtiquetadas.length === 0 ? true : false }
                >
                    {
                        cargandoResetearEtiquetasSeleccionesUnicas
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
                        "Resetear etiquetas de selecciones únicas"
                    }
                </Button>
            </div>
            <div className="row">
                { seleccionesUnicasEtiquetadas.length !== 0
                    ?
                        seleccionesUnicasEtiquetadas.map((seleccionUnicaEtiquetada, index) =>

                            <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-4" >
                                
                                <div className="card text-white tarjeta-tag-uniqueSelection" >
                                    <div className="fila">
                                        <div className="columna">
                                                <img className="imagenes-tarjeta-uniqueSelections" src={seleccionUnicaEtiquetada.uniqueSelection_id.imageUrl_1} alt="" />
                                        </div>
                                        <div className="columna">
                                                <img className="imagenes-tarjeta-uniqueSelections" src={seleccionUnicaEtiquetada.uniqueSelection_id.imageUrl_2} alt="" />
                                        </div>
                                    </div>
                                    <div className="fila ml-2 mr-2">
                                        <img className="imagenes-tarjeta-uniqueSelections" src={seleccionUnicaEtiquetada.uniqueSelection_id.imageUrl_3} alt="" />
                                    </div>
                                    <div className="card-body text-center">
                                        <h5 className="card-title titulo-nombre-card-uniqueSelection"> Palabra </h5>
                                        <p className="card-text nombre-card-uniqueSelection"> {seleccionUnicaEtiquetada.uniqueSelection_id.keyWord} </p>
                                        <h5 className="card-title titulo-nombre-card-uniqueSelection mt-4"> Escogida </h5>
                                        <img className="imagenes-tarjeta-uniqueSelections" src={seleccionUnicaEtiquetada.imageSelected} alt="" />
                                        {/* <h5 className="card-title titulo-fecha-card-uniqueSelection"> Subido el </h5>
                                        <p className="card-text fecha-card-uniqueSelection"> {seleccionUnicaEtiquetada.uniqueSelection_id.createdAt} </p> */}
                                    </div>
                                </div>
                            </div>
                        )
                    :
                    <div className="text-center ml-auto mr-auto" >
                        Aún no ha etiquetado selecciones únicas
                    </div>
                }
            </div>             
                    
        </div>
    );
}
 
export default TaggedUniqueSelectionsUser;