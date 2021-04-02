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

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card'

import './home.css';

import { FaGamepad, FaFire, FaCog, FaUserFriends, FaQuestionCircle } from 'react-icons/fa';


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
            text: 'Rango Etario de los participantes'
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

                case "Bronce":
                    backgroundColors.push('#cd7f32')
                    borderColors.push('#a86624')
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
                    <Grid container xs={12} direction="row" justify="center" alignItems="center" spacing={0}>
                        <Grid  xs={12} className="mt-5" style={{  }} >

                            <Carousel>
                                <Carousel.Item>
                                    <img
                                    className="slides-carousel"
                                    src="https://cdn.pixabay.com/photo/2018/08/21/23/29/fog-3622519__340.jpg"
                                    alt="First slide"
                                    // width="100%"
                                    // height="600px"
                                    />
                                    <Carousel.Caption>
                                    <h2> ¡Bienvenid@ a E-ncendio! </h2>
                                    <subtitle1> Navega y ayúdanos a recaudar información de la comunidad. </subtitle1>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-1000"
                                    src="https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__340.jpg"
                                    alt="Second slide"
                                    width="100%"
                                    height="600px"
                                    />

                                    <Carousel.Caption>
                                    <h2> Apóyanos Jugando </h2>
                                    <subtitle1> Tu participación es vital para dimensionar el estado actual de la ciudadanía para enfrentar los incendios. </subtitle1>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="d-block w-1000"
                                    src="https://cdn.pixabay.com/photo/2015/12/01/20/28/forest-1072828__340.jpg"
                                    alt="Third slide"
                                    width="100%"
                                    height="600px"
                                    />

                                    <Carousel.Caption>
                                    <h2> ¡Recompensas a los mejores participantes! </h2>
                                    <subtitle1> Al final de este proyecto, se premiarán a los participantes más destacados. </subtitle1>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>

                        </Grid>

                        {/* tarjetas */}
                        <Grid container xs={12} >
                            <Card
                                bg="light"
                                key="1"
                                text="dark"
                                style={{ width: '18rem', textAlign: "center", marginLeft: "100px"  }}
                                className="mt-5"
                            >
                                <FaGamepad className="card-icons" />
                                <Card.Header> Diversión </Card.Header>
                                <Card.Body>
                                <Card.Title> Interactúa en los juegos </Card.Title>
                                <Card.Text>
                                    Puedes colaborar jugando en uno de los 3 tipos de juegos disponibles.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card
                                bg="light"
                                key="1"
                                text="dark"
                                style={{ width: '18rem', textAlign: "center" }}
                                className="mt-5 ml-5"
                            >
                                <FaFire className="card-icons" />
                                <Card.Header> Competitividad </Card.Header>
                                <Card.Body>
                                <Card.Title> Rivaliza con los demás </Card.Title>
                                <Card.Text>
                                    Logra la mejor posición del ranking de jugadores.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card
                                bg="light"
                                key="1"
                                text="dark"
                                style={{ width: '18rem', textAlign: "center" }}
                                className="mt-5 ml-5"
                            >
                                <FaCog className="card-icons" />
                                <Card.Header> Personalización </Card.Header>
                                <Card.Body>
                                <Card.Title> Edita tu perfil </Card.Title>
                                <Card.Text>
                                    Puedes ajustar tus configuraciones del perfil de la manera que gustes.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card
                                bg="light"
                                key="1"
                                text="dark"
                                style={{ width: '18rem', textAlign: "center" }}
                                className="mt-5 ml-5"
                            >
                                <FaUserFriends className="card-icons" />
                                <Card.Header> Conócenos </Card.Header>
                                <Card.Body>
                                <Card.Title> Averigua quienes somos </Card.Title>
                                <Card.Text>
                                    Podrás saber quienes están detrás del proyecto E-ncendio y del porqué de este.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card
                                bg="light"
                                key="1"
                                text="dark"
                                style={{ width: '18rem', textAlign: "center" }}
                                className="mt-5 ml-5"
                            >
                                <FaQuestionCircle className="card-icons" />
                                <Card.Header> Ayuda </Card.Header>
                                <Card.Body>
                                <Card.Title> Conoce el funcionamiento básico de la Aplicación </Card.Title>
                                <Card.Text>
                                    Si tienes dudas de como jugar, cómo ganar puntos y de qué manera poder editar tu Perfil puedes ir a "Ayuda".
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </Grid>
                        {/* Gráficas */}
                        {/* Barras */}
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

                        <Grid container direction="row" justify="center" alignItems="center" xs={8} className="mt-5" >
                            <h2> Contáctanos </h2>

                            <Typography variant="subtitle1" gutterBottom>
                                Si tienes alguna observación sobre algún problema que se te presentó en la Aplicación, no dudes
                                en decirnos, ¡recibirás recompensas!, contáctanos aquí:
                            </Typography>
                        </Grid>
                        <Grid container item xs={12}  className="mt-4  " >
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