import React, { Fragment, useContext, useEffect } from 'react';
import FormContact from './formContact/FormContact';

import AuthContext from '../../context/autentificacion/authContext';
import LeagueContext from '../../context/leagues/leagueContext';

import incendio from '../../assets/img/incendio.png';
import {useStyles} from './homeStyles';

import { Image } from 'react-bootstrap';
import { Bar, Doughnut, Line } from '@reactchartjs/react-chart.js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Label, Typography } from '@material-ui/core';


const Home = () => {

    // Extraer la información de autentificación
    const authContext = useContext(AuthContext)
    const { usuarioAutenticado } = authContext

    // Extraer la información de las ligas
    const leagueContext = useContext(LeagueContext)
    const { ligas, obtenerDistribucionDeLigas } = leagueContext

    useEffect(() => {
        usuarioAutenticado()

        obtenerDistribucionDeLigas();
    }, [])

    const classes = useStyles()

    // Gráfico de barras
    const dataBar = {
        labels: [ 'Estados unidos', 'México', 'Italia', 'Colombia', 'España' ],
        datasets: [{
            label: 'Habitantes',
            backgroundColor: 'rgba(0,255,0,1)',
            borderColor: 'black',
            borderWidth: 1,
            hoverBorderColor: '#FFFF00',
            data: [ 327.16, 126.19, 60.43, 49.64, 46.72 ]
        }]
    }
    const opcionesBar = {
        maintainAspectRatio: false,
        responsive: true
    }

    // Gráfico de dona(doughnut)
    let labelsLigas = []
    let dataLigas = []
    let dataDoughnut = {}
    if (ligas) {
        labelsLigas = ligas.map((liga) => liga._id)
        dataLigas = ligas.map((liga) => liga.Total)
        dataDoughnut = {
            labels: labelsLigas,
            datasets: [
                {
                    label: "sadads# of Votes",
                    data: dataLigas,
                    backgroundColor: [
                        '#d7d7d7',
                        '#ffbf00',
                    ],
                    borderColor: [
                        '#b4b6b9',
                        '#cc9900',
                    ],
                    borderWidth: 1,
                    hoverBorderColor: '#231A18'
                }
            ]
        }
    }

    const optionsDoughnut = {
            title: {
                display: true,
                text: 'Descripción de Ligas'
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
            <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                <Grid item xs={10} className="mt-5" style={{ backgroundColor: 'red' }}>
                    <h3> xs=10 </h3>
                </Grid>
                
                {/* Gráficas */}
                {/* El Barras */}
                <Grid item xs={5} className="mt-5 mr-5" style={{ width: '100%', height: '100%' }} >
                    <Bar data={dataBar} options={opcionesBar} />
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
        </div>
        
    );
}
 
export default Home;