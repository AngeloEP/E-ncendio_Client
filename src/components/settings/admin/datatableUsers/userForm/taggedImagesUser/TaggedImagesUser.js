import React, { } from 'react';
import './taggedImagesUser.css';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";

const TaggedImagesUser = ({ usuario, imagenesEtiquetadas, funcionResetear, cargandoResetearEtiquetasImagenes }) => {

    return (
        <div className="cards-images" >
            <div className="div-reset-tag-images" >
                <Button
                    variant="contained"
                    color="secondary"
                    className="btnResetTagContent"
                    startIcon={<DeleteIcon />}
                    onClick={() => funcionResetear(usuario._id)}
                    disabled={cargandoResetearEtiquetasImagenes || imagenesEtiquetadas.length === 0 ? true : false }
                >
                    {
                        cargandoResetearEtiquetasImagenes
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
                        "Resetear etiquetas de imágenes"
                    }
                </Button>
            </div>
            <div className="row">
                { imagenesEtiquetadas.length !== 0
                    ?
                        imagenesEtiquetadas.map((imagenEtiquetada, index) =>

                            <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-4" >
                                
                                <div className="card text-white tarjeta-tag-image" >
                                    <img className="card-img-top imagen-tarjeta-etiquetada" src={imagenEtiquetada.urlImagen} alt="" />
                                    <div className="card-body text-center">
                                        <h5 className="card-title titulo-nombre-card-tag-image"> Eligió etiqueta </h5>
                                        <p className="card-text nombre-card-tag-image"> {imagenEtiquetada.categoria} </p>
                                        {/* <h5 className="card-title titulo-fecha-card-tag-image"> Subido el </h5> */}
                                        {/* <p className="card-text fecha-card-tag-image"> {imagenEtiquetada.Creadoel} </p> */}
                                    </div>
                                </div>
                            </div>
                        )
                    :
                    <div className="text-center ml-auto mr-auto" >
                        Aún no ha etiquetado imágenes
                    </div>
                }
            </div>             
                    
        </div>
    );
}
 
export default TaggedImagesUser;