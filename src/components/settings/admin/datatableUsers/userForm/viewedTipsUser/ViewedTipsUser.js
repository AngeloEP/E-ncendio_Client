import React, {  } from 'react';
import './viewedTipsUser.css';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";

import Paper from '@material-ui/core/Paper';

const ViewedTipsUser = ({
    usuario,
    tipsVistos,
    funcionResetear,
    cargandoResetearTipsVistos,
    cargandoTipsVistosUsuarioDesdeAdmin,
}) => {

    return (
        <div className="cards-tag-tips" >
            <div className="div-reset-tag-tips" >
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => funcionResetear(usuario._id)}
                    disabled={cargandoResetearTipsVistos || tipsVistos.length == 0 ? true : false }
                >
                    {
                        cargandoResetearTipsVistos
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
                        "Resetear tips vistos"
                    }
                </Button>
            </div>
            <div className="row">
                { cargandoTipsVistosUsuarioDesdeAdmin === false
                    ? 
                        tipsVistos.length != 0
                        ?
                            <>
                                {tipsVistos.map((tipVisto, index) =>

                                    <div key={index} className="col-sm-3 col-md-4" >
                                        
                                        <div className="card text-white tarjeta-tag-tips" >
                                            <Paper className="card-img-top palabra-tarjeta-vista" elevation={10} variant="outlined"  >
                                                {tipVisto.tip_id.text}
                                            </Paper>
                                            <div className="card-body text-center">
                                                <h5 className="card-title titulo-fecha-card-tip"> Subido el </h5>
                                                <p className="card-text fecha-card-tip"> {tipVisto.tip_id.createdAt} </p>
                                                <h5 className="card-title titulo-points-card-tip"> Puntos </h5>
                                                <p className="card-text points-card-tip"> {tipVisto.tip_id.points} </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        :
                        <div className="text-center ml-auto mr-auto" >
                            Aún no ha visto Tips
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
 
export default ViewedTipsUser;