import React, { useContext, useEffect } from 'react';
import useState from 'react-usestateref';
import FormContact from './formContact/FormContact';

import AuthContext from '../../context/autentificacion/authContext';
import LeagueContext from '../../context/leagues/leagueContext';
import UsuariosContext from '../../context/usuarios/usuariosContext';

import settingIcon from '../../assets/vectorial graphics/gear2.svg';
import rankingIcon from '../../assets/vectorial graphics/flame.svg';
import gamesIcon from '../../assets/vectorial graphics/gamepad2.svg';
import contentIcon from '../../assets/vectorial graphics/upload.svg';
import aboutIcon from '../../assets/vectorial graphics/people.svg';
import helpIcon from '../../assets/vectorial graphics/help.svg';
import buyIcon from '../../assets/vectorial graphics/buy.svg';

import contacUs from '../../assets/img/contactUs.jpg';
import Banner1 from '../../assets/img/Banner1.png';
import Banner2 from '../../assets/img/Banner2.png';
import Banner3 from '../../assets/img/Banner3.png';

import {useStyles} from './homeStyles';



import { Image } from 'react-bootstrap';
// import { Bar, Doughnut, Line } from '@reactchartjs/react-chart.js';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import HashLoader from "react-spinners/HashLoader";

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

import './home.css';
import RewardNotification from '../common/fire/RewardNotification';


const Home = () => {

    // Extraer la información de autentificación
    const authContext = useContext(AuthContext)
    const {
        recompensas,
        recompensasTareas,
        usuarioAutenticado,
        borrarRecompensas,
        borrarRecompensasModificarPerfilTareas,
    } = authContext

    // Extraer la información de las ligas
    const leagueContext = useContext(LeagueContext)
    const { obtenerDistribucionDeLigas } = leagueContext

    // Extraer la información de los usuarios
    const usuariosContext = useContext(UsuariosContext)
    const { obtenerDistribucionEdadesUsuarios } = usuariosContext

    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        setLoading(true);

        usuarioAutenticado()

        obtenerDistribucionDeLigas();

        obtenerDistribucionEdadesUsuarios();


        setTimeout(() => {
            setLoading(false);
        }, 1500);
        // eslint-disable-next-line
    }, [])

    const classes = useStyles()

    // Gráfico de barras
    // let labelsEdades = []
    // let dataEdades = []
    // let dataBar = []
    // if ( distribucion.length !== 0 ) {
    //     dataBar = {
    //         labels: distribucion.range,
    //         datasets: [{
    //             label: 'Rango etario',
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //             ],
    //             borderWidth: 1,
    //             hoverBorderColor: '#FFFF00',
    //             data: distribucion.total
    //         }]
    //     }
    // }
    // const opcionesBar = {
    //     maintainAspectRatio: false,
    //     responsive: true,
    //     aspectRatio: 1,
    //     title: {
    //         display: true,
    //         text: 'Rango Etario de los participantes'
    //     },
    //     layout: {
    //         padding: {
    //             left: 0,
    //             right: 0,
    //             top: -12,
    //             bottom: -10
    //         }
    //     },
    //     legend: {
    //         display: false,
    //     }
    // }

    // Gráfico de dona(doughnut)
    // let labelsLigas = []
    // let dataLigas = []
    // let backgroundColors = []
    // let borderColors = []
    // // let dataDoughnut = {}
    // if (ligas.length !== 0) {
    //     ligas.map((liga) => {
    //         labelsLigas.push(liga._id)
    //         dataLigas.push(liga.Total)
    //         switch (liga._id) {
    //             case "Oro":
    //                 backgroundColors.push('#ffbf00')
    //                 borderColors.push('#cc9900')
    //                 break;

    //             case "Plata":
    //                 backgroundColors.push('#d7d7d7')
    //                 borderColors.push('#b4b6b9')
    //                 break;

    //             case "Bronce":
    //                 backgroundColors.push('#cd7f32')
    //                 borderColors.push('#a86624')
    //                 break;
            
    //             default:
    //                 break;
    //         }
    //     })
    //     dataDoughnut = {
    //         labels: labelsLigas,
    //         datasets: [
    //             {
    //                 data: dataLigas,
    //                 backgroundColor: backgroundColors,
    //                 borderColor: borderColors,
    //                 borderWidth: 1,
    //                 hoverBorderColor: '#231A18'
    //             }
    //         ]
    //     }
    // }

    // const optionsDoughnut = {
    //     title: {
    //         display: true,
    //         text: 'Distribución de Ligas'
    //     }
    // }


    // const dataLine = {
    //     labels: [ "1", "2", "3", "4", "5", "6" ],
    //     datasets: [
    //         {
    //             label: "# of votes",
    //             data: [12, 19, 3, 5, 2, 3],
    //             fill: false,
    //             backgroundColor: 'rgb(255, 99, 132)',
    //             borderColor: 'rgba(255, 99, 132, 0.2)',
    //             yAxisID: 'y-axis-1',
    //         },
    //         {
    //             label: '# of No Votes',
    //             data: [1, 2, 1, 1, 2, 2],
    //             fill: false,     // colorear con el backgroundColor debajo de la curva
    //             backgroundColor: 'rgb(54, 162, 235)',
    //             borderColor: 'rgba(54, 162, 235, 0.2)',
    //             yAxisID: 'y-axis-2',
    //         },
    //     ]
    // }
    
    // const optionsLine = {
    //     scales: {
    //         yAxes: [
    //             {
    //                 scaleLabel: {
    //                     display: true,
    //                     labelString: 'Y text'
    //                 },
    //                 type: 'linear',
    //                 display: true,
    //                 position: 'left',
    //                 id: 'y-axis-1',
    //             },
    //             {
    //                 scaleLabel: {
    //                     display: true,
    //                     labelString: 'Y2 text'
    //                 },
    //                 type: 'linear',
    //                 display: true,
    //                 position: 'right',
    //                 id: 'y-axis-2',
    //                 gridLines: {
    //                   drawOnArea: false,
    //                 },
    //             }
    //         ],
    //         xAxes: [
    //             {
    //                 scaleLabel: {
    //                     display: true,
    //                     labelString: 'X text'
    //                 }
    //             }
    //         ]
    //     }
    // }
    
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
                <>
                    <h1 className="home-title" > Inicio </h1>
                    <div className="author" >
                        <span>
                            { new Date().getDate() + '-' + new Date().toLocaleDateString(undefined, { month: 'long'}) + '-' + new Date().getFullYear() }
                        </span>
                    </div>
                
                    <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                        <Grid item xs={10} className="" style={{ marginTop: "0em" }} >

                            {recompensas !== null
                            ?
                                <RewardNotification
                                    recompensas={recompensas}
                                    borrarRecompensas={borrarRecompensas}
                                />
                            : null
                            }

                            {recompensasTareas !== null
                            ?
                                <RewardNotification
                                    recompensas={recompensasTareas}
                                    borrarRecompensas={borrarRecompensasModificarPerfilTareas}
                                />
                            : null
                            }

                            <Carousel>
                                <Carousel.Item>
                                    <img
                                    className="slides-carousel"
                                    src={Banner1}
                                    alt="First slide"
                                    />
                                    <Carousel.Caption className="carousel-caption1" >
                                    {/* <h2 className="carousel-title" > ¡Bienvenid@ a E-ncendio! </h2> */}
                                    {/* <p className="carousel-subtitle" > Navega y ayúdanos a recaudar información de la comunidad. </p> */}
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="slides-carousel"
                                    src={Banner2}
                                    alt="Second slide"
                                    />

                                    <Carousel.Caption className="carousel-caption2" >
                                    {/* <h2 className="carousel-title" > Apóyanos Jugando </h2> */}
                                    {/* <p className="carousel-subtitle" > Tu participación es vital para dimensionar el estado actual de la ciudadanía para enfrentar los incendios. </p> */}
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    className="slides-carousel"
                                    src={Banner3}
                                    alt="Third slide"
                                    />

                                    <Carousel.Caption className="carousel-caption3" >
                                    {/* <h2 className="carousel-title" > ¡Recompensas a los mejores participantes! </h2> */}
                                    {/* <p className="carousel-subtitle" > Al final de este proyecto, se premiarán a los participantes más destacados. </p> */}
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>

                        </Grid>

                        {/* tarjetas */}
                        <Grid container style={{ justifyContent: "center", marginTop: "3%", marginBottom: "3%" }} >
                            <Card
                                bg="light"
                                key="1"
                                text="dark"
                                className="card-other"
                            >
                                <img className="profileImageCard" src={settingIcon} alt="" />
                                <Card.Header className="card-header" >
                                    <a className="nav-link" href="/profile"> Perfil </a> 
                                </Card.Header>
                                <Card.Body>
                                <Card.Title className="card-title" > Edita tu perfil </Card.Title>
                                <Card.Text className="card-text texto-tarjeta-home" >
                                    Puedes ajustar tus configuraciones del perfil de la manera que gustes desde que te encuentres en la liga de <span style={{ color: "gray" }} > Plata </span>.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card
                                bg="light"
                                key="2"
                                text="dark"
                                className="card-other"
                            >
                                <img className="rankImageCard" src={rankingIcon} alt="" />
                                <Card.Header className="card-header" > <a className="nav-link" href="/rank"> Ranking </a> </Card.Header>
                                <Card.Body>
                                <Card.Title className="card-title" > Alcanza la más alta posición </Card.Title>
                                <Card.Text className="card-text texto-tarjeta-home" >
                                    Logra la mejor posición del ranking de jugadores de E-ncendio para ir obteniendo Fire points
                                     y así poder comprar objetos en la tienda de la aplicación.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card
                                bg="light"
                                key="3"
                                text="dark"
                                className="card-other"
                            >
                                <img className="gamesImageCard" src={gamesIcon} alt="" />
                                <Card.Header className="card-header" > <a className="nav-link" href="/games"> Juegos </a> </Card.Header>
                                <Card.Body>
                                <Card.Title className="card-title" > Interactúa en los juegos </Card.Title>
                                <Card.Text as="div" className="card-text texto-tarjeta-home" >
                                    Puedes colaborar jugando en uno de los 4 tipos de juegos:
                                    <ul>
                                        <li> <a href="/games/images"> Etiquetando imágenes</a>. </li>
                                        <li> <a href="/games/words"> Etiquetando palabras </a> desde la liga de <span style={{ color: "#8A9597" }} > Plata</span>. </li>
                                        <li> Descubriendo la palabra incógnita en <a href="/games/four-images-one-word"> 4 imágenes y 1 palabra. </a> a partir de la liga de <span style={{ color: "#FFBF00" }} > Oro</span>.
                                        </li>
                                        <li>
                                            Escogiendo la imagen más relacionada a la palabra clave en <a href="/games/unique-selection"> Selección Única </a> a partir de la liga de <span style={{ color: "#FFBF00" }} > Oro</span>.
                                        </li>
                                    </ul>
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card
                                bg="light"
                                key="4"
                                text="dark"
                                className="card-other"
                            >
                                <img className="contentImageCard" src={contentIcon} alt="" />
                                <Card.Header className="card-header" > <a className="nav-link" href="/settings"> Contenido </a> </Card.Header>
                                <Card.Body>
                                <Card.Title className="card-title" > Sube tu propio contenido </Card.Title>
                                <Card.Text className="card-text texto-tarjeta-home" >
                                    Puedes aportar tu granito de arena y colaborar con el objetivo de E-ncendio 
                                    subiendo imágenes, agregar palabras desde la liga de <span style={{ color: "#8A9597" }} > Plata </span> y también subir contenido para el juego
                                    de 4 palabras y 1 imagen o el juego de Selección Única o incluso los tips de información desde la liga de <span style={{ color: "#FFBF00" }} > Oro </span>,
                                    cada uno de estos serán evaluadas por los administradores para ver si cumplen con los requisitos.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card
                                bg="light"
                                key="5"
                                text="dark"
                                className="card-other"
                            >
                                <img className="buyImageCard" src={buyIcon} alt="" />
                                <Card.Header className="card-header" > <a className="nav-link" href="/store"> Tienda </a> </Card.Header>
                                <Card.Body>
                                <Card.Title className="card-title" > Comprar atículos en Tienda </Card.Title>
                                <Card.Text className="card-text texto-tarjeta-home" >
                                    A medida que cumplas con tus tareas diarias obtendrás FirePoints, al igual que consiguiendo logros
                                    o quedando entre los 3 primeros lugares del Ranking cada día. Estos FirePoints le permitirán comprar
                                    ciertos artículos en Tienda.
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            <div className="card-other" >
                                {/* NADA */}
                            </div>
                          
                        </Grid>

                        <Grid container  style={{ marginTop: "3%" }} >
                            <Grid item xs={12} >
                                <div className="párrafo-ligas" >
                                    <h2 className="section-title"> E-ncendio y su objetivo </h2>
                                    <p className="parrafo-home" >
                                    Deseamos obtener la percepción de la ciudadanía sobre el impacto ecológico de
                                    los incendios mediante una plataforma web interactiva, divertida, intuitiva y simple. Es importante
                                    recalcar que también:
                                    </p>
                                    <ul className="ul-home" style={{ marginLeft: "10%" }} >
                                        <li className="li-home" > <span > Buscamos enseñarle a la comunidad sobre los incendios. </span> </li>
                                        <li className="li-home" > <span > Queremos dimensionar el alcance del conocimiento de las personas. </span> </li>
                                        <li className="li-home" > <span > Necesitamos de un alto compromiso y colaboración de cada usuario. </span> </li>
                                        <li className="li-home" > <span > Deseamos que en primera instancia se desempeñen en los juegos. </span> </li>
                                    </ul>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container  style={{ marginTop: "5%", marginBottom: "3%" }} >
                            <Grid item xs={12} >
                                <div className="párrafo-ligas" >
                                    <h2 className="section-title"> ¡Sigue subiendo y apoyando! </h2>
                                    <p className="parrafo-home" >
                                        No te conformes con tu nivel actual, sigue escalando en la tabla de clasificaciones, 
                                        ya puedes subir imágenes o tips al sitio para que sean evaluados, 
                                        si llegas a la liga de Plata podrás subir palabras para que los administradores 
                                        consideren si puedan ser etiquetadas por los demás, en la liga de Oro ya podrás hacerlo con las imágenes para el juego Ahorcado, 
                                        para obtener más puntaje y subir de ligas tienes las siguientes opciones:
                                    </p>
                                    <ul className="ul-home" style={{ marginLeft: "10%" }} >
                                        <li className="li-home" > <span > Desempeñándote en los juegos de la plataforma, etiquetando imágenes/palabras o en el Ahorcado. </span> </li>
                                        <li className="li-home" > <span > Modificando el contenido de tu perfil desde la liga de plata. </span> </li>
                                        <li className="li-home" > <span > Subiendo contenido al sitio E-ncendio. </span> </li>
                                        <li className="li-home" > <span > Subiendo en el ranking de los participantes de E-ncendio, donde los 3 primeros lugares tendrán FirePoints al final del día que servirán para comprar artículos en Tienda. </span> </li>
                                    </ul>
                                </div>
                            </Grid>
                            {/* <Grid item xs={5} >
                                <Doughnut data={dataDoughnut} options={optionsDoughnut} />
                            </Grid> */}
                        </Grid>

                        
                        {/* Gráficas */}
                        {/* Barras */}
                        {/* <Grid item xs={7} className="mt-5 mr-5" style={{ height: "30vh" }} >
                                <Bar data={dataBar} options={opcionesBar} height={140} />
                        </Grid>

                        <Grid item xs={5} className="mt-5 mr-5" style={{ width: '100%', height: '100%' }} >
                            <Line data={dataLine} options={optionsLine} />
                        </Grid>
                        
                        <Grid item xs={5} className="mt-5" >
                            <Paper >xs=12</Paper>
                        </Grid> */}
                        {/*          */}

                        <Grid container direction="row" justify="center" alignItems="center" className="mt-5" >
                            <h2 className="about-home-title" > Contáctanos </h2>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" className="mt-2" >
                            <Typography variant="subtitle1" className="text-about" gutterBottom>
                                Si tienes alguna observación sobre algún problema que se te presentó en la Aplicación, no dudes
                                en decirnos, ¡recibirás recompensas!, contáctanos aquí:
                            </Typography>
                        </Grid>
                        <Grid container  className="mt-4  " >
                            <Grid item xs={6} >
                                <Image className="contactUsHome" src={contacUs} />
                            </Grid>

                            <Grid item xs={6} className="formContact" >    
                                <FormContact />
                            </Grid>
                            
                        </Grid>

                        <Grid container style={{ justifyContent: "center" }} >
                            <Card
                                bg="light"
                                key="5"
                                text="dark"
                                className="card-other"
                            >
                                <img className="aboutImageCard" src={aboutIcon} alt="" />
                                <Card.Header className="card-header" > <a className="nav-link" href="/about"> Conócenos </a> </Card.Header>
                                <Card.Body>
                                <Card.Title className="card-title" > Averigua quienes somos </Card.Title>
                                <Card.Text className="card-text texto-tarjeta-home" >
                                    Podrás saber quienes están detrás del proyecto E-ncendio y del porqué de este.
                                </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card
                                bg="light"
                                key="6"
                                text="dark"
                                className="card-other"
                            >
                                <img className="helpImageCard" src={helpIcon} alt="" />
                                <Card.Header className="card-header" > <a className="nav-link" href="/help"> Ayuda </a> </Card.Header>
                                <Card.Body>
                                <Card.Title className="card-title" > Conoce el funcionamiento básico de la Aplicación </Card.Title>
                                <Card.Text className="card-text texto-tarjeta-home" >
                                    Si tienes dudas de como jugar, cómo ganar puntos y de qué manera poder editar tu Perfil puedes ir a "Ayuda".
                                </Card.Text>
                                </Card.Body>
                            </Card>

                        </Grid>
                        
                    </Grid>
                    </>
            }
        </div>
        
    );
}
 
export default Home;