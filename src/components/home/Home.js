import React, { Fragment, useContext, useEffect, useState } from 'react';
import FormContact from './formContact/FormContact';

import AuthContext from '../../context/autentificacion/authContext';
import LeagueContext from '../../context/leagues/leagueContext';
import UsuariosContext from '../../context/usuarios/usuariosContext';

import incendio from '../../assets/img/incendio.png';
import {useStyles} from './homeStyles';

import { Image } from 'react-bootstrap';
import { Bar, Doughnut, Line } from '@reactchartjs/react-chart.js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Label, Typography } from '@material-ui/core';
import HashLoader from "react-spinners/HashLoader";


const Home = () => {

    // Extraer la información de autentificación
    const authContext = useContext(AuthContext)
    const { usuarioAutenticado } = authContext

    // Extraer la información de las ligas
    const leagueContext = useContext(LeagueContext)
    const { ligas, obtenerDistribucionDeLigas } = leagueContext

    // Extraer la información de los usuarios
    const usuariosContext = useContext(UsuariosContext)
    const { distribucion, obtenerDistribucionEdadesUsuarios } = usuariosContext

    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        setLoading(true);

        usuarioAutenticado()

        obtenerDistribucionDeLigas();

        obtenerDistribucionEdadesUsuarios();

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    const classes = useStyles()

    // Gráfico de barras
    let labelsEdades = []
    let dataEdades = []
    let dataBar = []
    if ( distribucion.length != 0 ) {
        dataBar = {
            labels: distribucion.range,
            datasets: [{
                label: 'Rango etario',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
                hoverBorderColor: '#FFFF00',
                data: distribucion.total
            }]
        }
    }
    const opcionesBar = {
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 1,
        title: {
            display: true,
            text: 'Rango Etario'
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: -12,
                bottom: -10
            }
        },
        legend: {
            display: false,
        }
    }

    // Gráfico de dona(doughnut)
    let labelsLigas = []
    let dataLigas = []
    let backgroundColors = []
    let borderColors = []
    let dataDoughnut = {}
    if (ligas.length != 0) {
        ligas.map((liga) => {
            labelsLigas.push(liga._id)
            dataLigas.push(liga.Total)
            switch (liga._id) {
                case "Oro":
                    backgroundColors.push('#ffbf00')
                    borderColors.push('#cc9900')
                    break;

                case "Plata":
                    backgroundColors.push('#d7d7d7')
                    borderColors.push('#b4b6b9')
                    break;
            
                default:
                    break;
            }
        })
        dataDoughnut = {
            labels: labelsLigas,
            datasets: [
                {
                    data: dataLigas,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                    hoverBorderColor: '#231A18'
                }
            ]
        }
    }

    const optionsDoughnut = {
        title: {
            display: true,
            text: 'Distribución de Ligas'
        }
    }


    const dataLine = {
        labels: [ "1", "2", "3", "4", "5", "6" ],
        datasets: [
            {
                label: "# of votes",
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: 'y-axis-1',
            },
            {
                label: '# of No Votes',
                data: [1, 2, 1, 1, 2, 2],
                fill: false,     // colorear con el backgroundColor debajo de la curva
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                yAxisID: 'y-axis-2',
            },
        ]
    }
    
    const optionsLine = {
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Y text'
                    },
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                },
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Y2 text'
                    },
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                      drawOnArea: false,
                    },
                }
            ],
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'X text'
                    }
                }
            ]
        }
    }

    return (
        
        <div className={classes.divContent} >
            {
                loading
                ?
                    <div className={classes.loading} >
                        <HashLoader
                            color={"#7ED321"}
                            loading={loading}
                            size={150}
                        />
                    </div>
                :
                    <Grid container xs={12} direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={10} className="mt-5" style={{ backgroundColor: 'red' }}>
                            <h3> xs=10 </h3>
                        </Grid>
                        
                        {/* Gráficas */}
                        {/* El Barras */}
                        <Grid item xs={5} className="mt-5 mr-5" style={{ height: "30vh" }} >
                                <Bar data={dataBar} options={opcionesBar} height={140} />
                        </Grid>

                        <Grid item xs={5} className="mt-5" style={{ width: '100%', height: '100%' }} >
                            <Doughnut data={dataDoughnut} options={optionsDoughnut} />
                        </Grid>

                        <Grid item xs={5} className="mt-5 mr-5" style={{ width: '100%', height: '100%' }} >
                            <Line data={dataLine} options={optionsLine} />
                        </Grid>
                        
                        <Grid item xs={5} className="mt-5" >
                            <Paper >xs=12</Paper>
                        </Grid>
                        {/*          */}

                        <Grid item xs={10} className="mt-5" >
                            <h2> Contáctanos </h2>

                            <Typography variant="subtitle1" gutterBottom>
                                Si tienes alguna observación sobre algún problema que se te presentó en la Aplicación, no dudes
                                en decirnos, ¡recibirás recompensas!, contáctanos aquí:
                            </Typography>
                        </Grid>
                        <Grid container item xs={11}  className="mt-4  " >
                            <Grid item xs={6} >
                                <Image src={incendio} />
                            </Grid>

                            <Grid item xs={6} className={classes.formContact} >    
                                <FormContact />
                            </Grid>
                            
                        </Grid>
                        
                    </Grid>
            }
        </div>
        
    );
}
 
export default Home;