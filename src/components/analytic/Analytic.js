import React, { useContext, useEffect } from 'react';
import useState from 'react-usestateref';
import './analytic.css';

import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/autentificacion/authContext';
import AnalyticsContext from '../../context/analytics/analyticsContext';

import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Doughnut } from '@reactchartjs/react-chart.js';

import Whatshot from '@material-ui/icons/Whatshot';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";

import ClipLoader from "react-spinners/ClipLoader";

import { CSVLink } from 'react-csv';

const Analytic = () => {

    const authContext = useContext(AuthContext)
    const { usuarioAutenticado, usuario } = authContext

    const profilecontext = useContext(ProfileContext)
    const { obtenerPerfil } = profilecontext

    const analyticsContext = useContext(AnalyticsContext)
    const {
        distribucionCategoriasImagenes,
        distribucionCategoriasPorImagen,
        cargandoDistribucionCategorias,
        cargandoDistribucionCategoriasPorImagen,
        traerDistribucionDeCategorias,
        traerDistribucionDeCategoriasPorImagen,

        distribucionCategoriasPalabras,
        distribucionCategoriasPorPalabra,
        cargandoDistribucionCategoriasPalabras,
        cargandoDistribucionCategoriasPorPalabra,
        traerDistribucionDeCategoriasPalabras,
        traerDistribucionDeCategoriasPorPalabra,

        distribucionUsoFuncionalidades,
        cargandoDistribucionUsoFuncionalidades,
        traerDistribucionDeUsoDeFuncionalidades,

        dataCSVTagImages,
        dataCSVTagWords,
        dataCSVTagUniqueSelections,
        obtenerCSVImagenesEtiquetadas,
        obtenerCSVPalabrasEtiquetadas,
        obtenerCSVSeleccionesUnicasEtiquetadas,
    } = analyticsContext

    const [ queryImages, guardarQueryImages, queryImagesRef ] = useState({
        cityImages: '',
        isFireRelatedImages: "", // bool
    })

    const [ queryWords, guardarQueryWords, queryWordsRef ] = useState({
        cityWords: '',
        isFireRelatedWords: "", // bool
    })

    const [ queryDistributionFuncionalities, guardarQueryDistributionFuncionalities, queryDistributionFuncionalitiesRef ] = useState({
        cityDistributionFuncionalities: '',
        isFireRelatedDistributionFuncionalities: "", // bool
    })

    useEffect(() => {
        usuarioAutenticado()
        obtenerPerfil()
        traerDistribucionDeCategorias(queryImagesRef.current)
        traerDistribucionDeCategoriasPalabras(queryWordsRef.current)
        traerDistribucionDeUsoDeFuncionalidades(queryDistributionFuncionalitiesRef.current)
        obtenerCSVImagenesEtiquetadas()
        obtenerCSVPalabrasEtiquetadas()
        obtenerCSVSeleccionesUnicasEtiquetadas()
        // eslint-disable-next-line
    }, [])

    // Gráfico de dona(doughnut)
    let labelsFuncionalidades = []
    let dataFuncionalidades = []
    let backgroundColors = []
    let borderColors = []
    let dataDoughnut = {}
    if (distribucionUsoFuncionalidades.length !== 0) {
        labelsFuncionalidades.push(
            "Etiquetar Imágenes",
            "Etiquetar Palabras",
            "Ahorcados Completados",
            "S. Únicas Completadas",
            "Ver Tips",
            "Editar Perfil",
            "Subir Imagen",
            "Subir Palabra",
            "Subir Ahorcado",
            "Subir S. Única",
            "Subir Tip",
        )
        dataFuncionalidades.push(
            ((distribucionUsoFuncionalidades[0].totalImageTagCount/distribucionUsoFuncionalidades[0].total)*100).toFixed(1),
            ((distribucionUsoFuncionalidades[0].totalWordTagCount/distribucionUsoFuncionalidades[0].total)*100).toFixed(1),
            ((distribucionUsoFuncionalidades[0].totalHangmanTagCount/distribucionUsoFuncionalidades[0].total)*100).toFixed(1),
            ((distribucionUsoFuncionalidades[0].totalUniqueSelectionTagCount/distribucionUsoFuncionalidades[0].total)*100).toFixed(1),
            ((distribucionUsoFuncionalidades[0].totalTipTagCount/distribucionUsoFuncionalidades[0].total)*100).toFixed(1),
            ((distribucionUsoFuncionalidades[0].totalEditProfileCount/distribucionUsoFuncionalidades[0].total)*100).toFixed(1),
            ((distribucionUsoFuncionalidades[0].totalUploadImageCount/distribucionUsoFuncionalidades[0].total)*100).toFixed(1),
            ((distribucionUsoFuncionalidades[0].totalUploadWordCount/distribucionUsoFuncionalidades[0].total)*100).toFixed(1),
            ((distribucionUsoFuncionalidades[0].totalUploadHangmanCount/distribucionUsoFuncionalidades[0].total)*100).toFixed(1),
            ((distribucionUsoFuncionalidades[0].totalUploadUniqueSelectionCount/distribucionUsoFuncionalidades[0].total)*100).toFixed(1),
            ((distribucionUsoFuncionalidades[0].totalUploadTipCount/distribucionUsoFuncionalidades[0].total)*100).toFixed(1),
        )
        backgroundColors.push(
            '#F70202',
            '#FE9F02',
            '#FBEC00',
            '#959595',
            '#B2FF00',
            '#01CE20',
            '#00FFD4',
            '#00B6FF',
            '#0059FF',
            '#9B00FF',
            '#CD02FF'
        )
        borderColors.push(
            '#B60101',
            '#D28400',
            '#D9CC01',
            '#747474',
            '#90CE01',
            '#01C41F',
            '#00D1AD',
            '#00A3E4',
            '#0046CA',
            '#8700DE',
            '#9601BB'
        )
        dataDoughnut = {
            labels: labelsFuncionalidades,
            datasets: [
                {
                    data: dataFuncionalidades,
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
            text: 'Uso de funcionalidades en porcentaje %'
        },
        
        // radius: "40%",
        responsive: true,
        maintainAspectRatio: true,
    }

    const { cityImages,  } = queryImages
    const { cityWords,  } = queryWords
    const { cityDistributionFuncionalities,  } = queryDistributionFuncionalities
    const [checkValue, setCheckValue] = useState('')
    const [ checkValueWord, setCheckValueWord ] = useState('')
    const [allCities, ] = useState(
        ["Gran Santiago", "Gran Concepción", "Gran Valparaíso", "Gran La Serena", "Gran Temuco", "Antofagasta", "Gran Iquique", "Gran Puerto Montt",
        "Gran Talca", "Arica", "Gran Rancagua", "Gran Chillán", "Los Ángeles", "Calama", "Colina", "Valdivia", "Gran Quillota", "Osorno", "Copiapó", "Curicó",
        "Punta Arenas", "Melipilla", "Gran San Antonio", "Lampa", "Ovalle", "Buin", "Los Andes-Calle Larga-San Esteban", "Linares", "Peñaflor", "Villarrica", "San Felipe", "Paine",
        "Talagante", "San Fernando", "Limache-Olmué","Rengo", "Coyhaique", "Vallenar", "San Carlos", "Angol", "San Vicente de Tagua Tagua", "Cauquenes"
        ]
    )
    const onChangeImages = e => {
        guardarQueryImages({
            ...queryImages,
            [e.target.name]: e.target.value
        })
        setCheckValue("");
        traerDistribucionDeCategorias( queryImagesRef.current )
    }

    const onChangeRadioImages = e => {
        guardarQueryImages({
            ...queryImages,
            isFireRelatedImages: e === "Si"? true : false
        })
        setCheckValue("");
        traerDistribucionDeCategorias( queryImagesRef.current )
    }

    const onChangeWords = e => {
        guardarQueryWords({
            ...queryWords,
            [e.target.name]: e.target.value
        })
        setCheckValueWord("");
        traerDistribucionDeCategoriasPalabras( queryWordsRef.current )
    }

    const onChangeRadioWords = e => {
        guardarQueryWords({
            ...queryWords,
            isFireRelatedWords: e === "Si"? true : false
        })
        setCheckValueWord("");
        traerDistribucionDeCategoriasPalabras( queryWordsRef.current )
    }

    const handleChange = event => {
        setCheckValue(event);
        traerDistribucionDeCategoriasPorImagen(event, queryImagesRef.current)
    };

    const handleChangeWords = event => {
        setCheckValueWord(event);
        traerDistribucionDeCategoriasPorPalabra(event, queryWordsRef.current)
    };

    const onChangeDistributionFuncionalities = e => {
        guardarQueryDistributionFuncionalities({
            ...queryDistributionFuncionalities,
            [e.target.name]: e.target.value
        })
        traerDistribucionDeUsoDeFuncionalidades( queryDistributionFuncionalitiesRef.current )
    }

    const onChangeRadioDistributionFuncionalities = e => {
        guardarQueryDistributionFuncionalities({
            ...queryDistributionFuncionalities,
            isFireRelatedDistributionFuncionalities: e === "Si"? true : false
        })
        traerDistribucionDeUsoDeFuncionalidades( queryDistributionFuncionalitiesRef.current )
    }

    // const descargarPrimerCSV = () => {
    //     const headers = [
    //         {label: "Nombre", key: "name"},
    //         {label: "Visible", key: "isVisible"}
    //     ];
        
    //     const csvReport = {
    //         filename: 'Report.csv',
    //         headers: headers,
    //         data: dataCSVTagImages
    //     };
    // }
    
    let headers = []
    let csvReport = []
    if (dataCSVTagImages.length !== 0 ) {
        
        headers = [
            {label: "Usuario", key: "Usuario"},
            {label: "Relacionado a incendios", key: "Relacionado a incendios"},
            {label: "Relación", key: "Relación"},
            {label: "Imagen", key: "Imagen"},
            {label: "Categoría", key: "Categoría"},
            {label: "Ubicación", key: "Ubicación"},
        ];
        
        csvReport = {
            filename: 'Report_Tag_Images.csv',
            headers: headers,
            data: dataCSVTagImages.data
        };
    }

    let headersWords = []
    let csvReportWords = []
    if (dataCSVTagWords.length !== 0 ) {
        
        headersWords = [
            {label: "Usuario", key: "Usuario"},
            {label: "Relacionado a incendios", key: "Relacionado a incendios"},
            {label: "Relación", key: "Relación"},
            {label: "Palabra", key: "Palabra"},
            {label: "Categoría", key: "Categoría"},
            {label: "Ubicación", key: "Ubicación"},
        ];
        
        csvReportWords = {
            filename: 'Report_Tag_Words.csv',
            headers: headersWords,
            data: dataCSVTagWords.data
        };
    }

    let headersUniqueSelections = []
    let csvReportUniqueSelections = []
    if (dataCSVTagUniqueSelections.length !== 0 ) {
        
        headersUniqueSelections = [
            {label: "Usuario", key: "Usuario"},
            {label: "Relacionado a incendios", key: "Relacionado a incendios"},
            {label: "Relación", key: "Relación"},
            {label: "Imagen 1", key: "Imagen 1"},
            {label: "Imagen 2", key: "Imagen 2"},
            {label: "Imagen 3", key: "Imagen 3"},
            {label: "Palabra Clave", key: "Palabra Clave"},
            {label: "Imagen Escogida", key: "Imagen Escogida"},
            {label: "Ubicación", key: "Ubicación"},
        ];
        
        csvReportUniqueSelections = {
            filename: 'Report_Tag_UniqueSelections.csv',
            headers: headersUniqueSelections,
            data: dataCSVTagUniqueSelections.data
        };
    }

    return (
        <div>
            <h1 className="analytics-title" > Analíticas </h1>
            <div className="date-analytics" >
                <span>
                    { new Date().getDate() + '-' + new Date().toLocaleDateString(undefined, { month: 'long'}) + '-' + new Date().getFullYear() }
                </span>
            </div>
            { usuario && usuario.isAdmin
            ?
            <>
                {/* IMÁGENES */}
                <h3 className="title-images-distribution-analytics" > Distribución de categorías por imágenes </h3>
                <Grid container direction="row" spacing={0} className="divFiltersAnalytics" >
                    <Grid item xs={6} container spacing={1} alignItems="flex-end" className="radioIsFireSES">
                        <Grid item>
                            <Typography variant="subtitle2" color="textPrimary" align="center" className="mt-1" >
                                ¿Pertenece a FireSES?  <Whatshot />
                            </Typography>
                            <RadioGroup defaultValue="" onChange={onChangeRadioImages} >
                                <Stack spacing={0} direction="row">
                                    <div className="col" >
                                        <Radio colorScheme="red" value={""} >
                                            Todos
                                        </Radio>
                                    </div>
                                    <div className="col" >
                                        <Radio colorScheme="red" value={"Si"} >
                                            Si
                                        </Radio>
                                    </div>
                                    <div className="col" >
                                        <Radio colorScheme="red" value={"No"} >
                                            No
                                        </Radio>
                                    </div>
                                </Stack>
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} className="gridSelectCity" >
                        <FormControl variant="outlined" id="select-cityAnalytics" className="selectCity" >
                            <InputLabel id="demo-simple-select-outlined-label"> Ciudad </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="cityImages"
                                value={cityImages}
                                name="cityImages"
                                onChange={onChangeImages}
                                label="Ciudad"
                                MenuProps={{
                                    anchorOrigin: {
                                      vertical: "bottom",
                                      horizontal: "left"
                                    },
                                    transformOrigin: {
                                      vertical: "top",
                                      horizontal: "left"
                                    },
                                    getContentAnchorEl: null
                                }}
                            >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            { allCities.map( (city, index) =>
                                <MenuItem key={index} value={city}> {city} </MenuItem>
                            )}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <div className="container-fluid mt-4" >
                    <div className="row divCategories" >
                        { !cargandoDistribucionCategorias && distribucionCategoriasImagenes.length > 0
                        ?
                            <RadioGroup defaultValue="" onChange={handleChange} >
                                <Stack spacing={0} direction="row">
                                        <>
                                            {distribucionCategoriasImagenes.length !== 1
                                                ?
                                                distribucionCategoriasImagenes.map((category, index) =>
                                                    index !== distribucionCategoriasImagenes.length -1
                                                    ?
                                                        <div key={index} className="col" >
                                                            <Radio colorScheme="red" value={category.category} >
                                                                {`${category.category} ${Math.round(category.count/distribucionCategoriasImagenes.at(-1).total * 100)}%`}
                                                            </Radio>
                                                        </div>
                                                    :
                                                        null
                                                    
                                                )
                                                :
                                                    <div className="text-center position-relative" style={{ top: "50%", left: "65%" }} >
                                                        <h3 className="withoutCategory" > ¡No se encontraron resultados!  </h3>
                                                    </div>
                                            }
                                        </>
                                </Stack>
                            </RadioGroup>
                        :
                            <div className="w-100 display" >
                                <ClipLoader
                                    color={"#000"}
                                    loading={true}
                                    size={70}
                                />
                            </div>
                        }
                    </div>

                    <div className="row ml-0 mr-0" >
                        <div className="col">
                            <div className="row mb-4 mt-5" style={{ overflowY: "scroll", height: "26rem" }} >
                                { checkValue !== ""
                                ? 
                                    cargandoDistribucionCategoriasPorImagen
                                    ?
                                        <div className="text-center w-100" style={{ top: "50%" }} >
                                            <ClipLoader
                                                color={"#000"}
                                                loading={true}
                                                size={70}
                                            />
                                        </div>
                                    :
                                        distribucionCategoriasImagenes.length !== 1
                                        ?
                                            distribucionCategoriasPorImagen.map((imagen, index) => 
                                                <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-4" >
                                                    <div className="card text-white tarjeta-analytic-image" >
                                                        <img className="card-img-top imagen-tarjeta-analytic" src={imagen.image.imageUrl} alt="" />
                                                        <div className="card-body text-center">
                                                            <h5 className="card-title titulo-distribucion-card-analytic-image"> Distribución </h5>
                                                            <div className="card-text distribucion-card-analytic-image"> 
                                                                <div className="row mb-2 divDistribucionCajasAnaliticas" >
                                                                    {imagen.categories.map((imagensita, indexImg) =>
                                                                        <Tooltip label={imagensita.name} key={indexImg} >
                                                                            <span className='boxDist blue'>
                                                                                <span> {imagensita.count} </span>
                                                                                <div className="nameBoxAnalytic" >
                                                                                    {imagensita.name.substr(0,2)}    
                                                                                </div>
                                                                            </span> 
                                                                        </Tooltip>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        :
                                            <div className="text-center position-relative w-100" style={{ top: "50%" }} >
                                                <h3 className="withoutCategory" > La búsqueda no arrojó resultados  </h3>
                                            </div>
                                :
                                    <div className="text-center position-relative w-100" style={{ top: "50%" }} >
                                        <h3 className="withoutCategory" > Seleccione una categoría  </h3>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                
                </div>
                {/* PALABRAS */}
                <h3 className="title-words-distribution-analytics" > Distribución de categorías por palabras </h3>
                <Grid container direction="row" spacing={0} className="divFiltersAnalytics" >
                    <Grid item xs={6} container spacing={1} alignItems="flex-end" className="radioIsFireSES" >
                        <Grid item>
                            <Typography variant="subtitle2" color="textPrimary" align="center" className="mt-1" >
                                ¿Pertenece a FireSES?  <Whatshot />
                            </Typography>
                            <RadioGroup defaultValue="" onChange={onChangeRadioWords} >
                                <Stack spacing={0} direction="row">
                                    <div className="col" >
                                        <Radio colorScheme="red" value={""} >
                                            Todos
                                        </Radio>
                                    </div>
                                    <div className="col" >
                                        <Radio colorScheme="red" value={"Si"} >
                                            Si
                                        </Radio>
                                    </div>
                                    <div className="col" >
                                        <Radio colorScheme="red" value={"No"} >
                                            No
                                        </Radio>
                                    </div>
                                </Stack>
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} className="gridSelectCity" >
                        <FormControl variant="outlined" id="select-cityAnalytics" className="selectCity" >
                            <InputLabel id="demo-simple-select-outlined-label"> Ciudad </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="cityWords"
                                value={cityWords}
                                name="cityWords"
                                onChange={onChangeWords}
                                label="Ciudad"
                                MenuProps={{
                                    anchorOrigin: {
                                      vertical: "bottom",
                                      horizontal: "left"
                                    },
                                    transformOrigin: {
                                      vertical: "top",
                                      horizontal: "left"
                                    },
                                    getContentAnchorEl: null
                                }}
                            >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            { allCities.map( (city, index) =>
                                <MenuItem key={index} value={city}> {city} </MenuItem>
                            )}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <div className="container-fluid mt-5" >
                    <div className="row divCategories" >
                        { !cargandoDistribucionCategoriasPalabras && distribucionCategoriasPalabras.length > 0
                        ?
                            <RadioGroup defaultValue="" onChange={handleChangeWords} >
                                <Stack spacing={0} direction="row">
                                        <>
                                            {distribucionCategoriasPalabras.length !== 1
                                                ?
                                                distribucionCategoriasPalabras.map((category, index) =>
                                                    index !== distribucionCategoriasPalabras.length -1
                                                    ?
                                                        <div key={index} className="col" >
                                                            <Radio colorScheme="red" value={category.category} >
                                                                {`${category.category} ${Math.round(category.count/distribucionCategoriasPalabras[7].total * 100)}%`}
                                                            </Radio>
                                                        </div>
                                                    :
                                                        null
                                                    
                                                )
                                                :
                                                    <div className="text-center position-relative" style={{ top: "50%", left: "65%" }} >
                                                        <h3 className="withoutCategory" > ¡No se encontraron resultados!  </h3>
                                                    </div>
                                            }
                                        </>
                                </Stack>
                            </RadioGroup>
                        :
                            <div className="w-100 display" >
                                <ClipLoader
                                    color={"#000"}
                                    loading={true}
                                    size={70}
                                />
                            </div>
                        }
                    </div>

                    <div className="row mt-4" >
                        <div className="col">
                            <div className="row mb-4 mt-5" style={{ overflowY: "scroll", height: "26rem" }} >
                                { checkValueWord !== ""
                                ? 
                                    cargandoDistribucionCategoriasPorPalabra
                                    ?
                                        <div className="text-center w-100" style={{ top: "50%" }} >
                                            <ClipLoader
                                                color={"#000"}
                                                loading={true}
                                                size={70}
                                            />
                                        </div>
                                    :
                                        distribucionCategoriasPalabras.length !== 1
                                        ?
                                            distribucionCategoriasPorPalabra.map((palabra, index) => 
                                                <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-4" >
                                                    <div className="card text-white tarjeta-analytic-image" >
                                                        <Paper className="card-img-top palabra-tarjeta" elevation={10} variant="outlined"  >
                                                                {palabra.word.name}
                                                        </Paper>
                                                        <div className="card-body text-center">
                                                            <h5 className="card-title titulo-distribucion-card-analytic-image"> Distribución </h5>
                                                            <div className="card-text distribucion-card-analytic-image"> 
                                                                <div className="row mb-2 divDistribucionCajasAnaliticas" >
                                                                    {palabra.categories.map((palabrita, indexPal) =>
                                                                               
                                                                        <Tooltip label={palabrita.name} key={indexPal} >
                                                                            <span className='boxDist blue'>
                                                                                <span> {palabrita.count} </span>
                                                                                <div className="nameBoxAnalytic" >
                                                                                    {palabrita.name.substr(0,2)}    
                                                                                </div>
                                                                            </span> 
                                                                        </Tooltip>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        :
                                            <div className="text-center position-relative w-100" style={{ top: "50%" }} >
                                                <h3 className="withoutCategory" > La búsqueda no arrojó resultados  </h3>
                                            </div>
                                :
                                    <div className="text-center position-relative w-100" style={{ top: "50%" }} >
                                        <h3 className="withoutCategory" > Seleccione una categoría  </h3>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                
                </div>
                <h3 className="title-words-distribution-analytics" > Distribución de uso de las funcionalidades </h3>
                <Grid container direction="row" spacing={0} className="divFiltersAnalytics" >
                    <Grid item xs={6} container spacing={1} alignItems="flex-end" className="radioIsFireSES">
                        <Grid item>
                            <Typography variant="subtitle2" color="textPrimary" align="center" className="mt-1" >
                                ¿Pertenece a FireSES?  <Whatshot />
                            </Typography>
                            <RadioGroup defaultValue="" onChange={onChangeRadioDistributionFuncionalities} >
                                <Stack spacing={0} direction="row">
                                    <div className="col" >
                                        <Radio colorScheme="red" value={""} >
                                            Todos
                                        </Radio>
                                    </div>
                                    <div className="col" >
                                        <Radio colorScheme="red" value={"Si"} >
                                            Si
                                        </Radio>
                                    </div>
                                    <div className="col" >
                                        <Radio colorScheme="red" value={"No"} >
                                            No
                                        </Radio>
                                    </div>
                                </Stack>
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} className="gridSelectCity" >
                        <FormControl variant="outlined" id="select-cityAnalytics" className="selectCity" >
                            <InputLabel id="demo-simple-select-outlined-label"> Ciudad </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="cityDistributionFuncionalities"
                                value={cityDistributionFuncionalities}
                                name="cityDistributionFuncionalities"
                                onChange={onChangeDistributionFuncionalities}
                                label="Ciudad"
                                MenuProps={{
                                    anchorOrigin: {
                                      vertical: "bottom",
                                      horizontal: "left"
                                    },
                                    transformOrigin: {
                                      vertical: "top",
                                      horizontal: "left"
                                    },
                                    getContentAnchorEl: null
                                }}
                            >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            { allCities.map( (city, index) =>
                                <MenuItem key={index} value={city}> {city} </MenuItem>
                            )}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <div className="funcionalidades-analytics" >
                    { !cargandoDistribucionUsoFuncionalidades && distribucionUsoFuncionalidades
                    ?
                        distribucionUsoFuncionalidades.length !== 0
                        ?
                            <Grid className="graficoDistribucionFuncionalidades" >
                                <Doughnut data={dataDoughnut} options={optionsDoughnut}  />
                            </Grid>
                        :
                                <h3 className="withoutCategory mt-5" > ¡No se encontraron resultados!  </h3>
                    :
                        <div className="w-100 display" >
                            <ClipLoader
                                color={"#000"}
                                loading={true}
                                size={70}
                            />
                            
                        </div>
                    }
                </div>

                <h3 className="title-words-distribution-analytics" > Exportar contenido de E-ncendio </h3>
                <div className="text-center mb-3" >
                    {dataCSVTagImages.length !== 0 && dataCSVTagWords.length !== 0 && dataCSVTagUniqueSelections.length !== 0
                    ?
                        <>
                            <CSVLink {...csvReport} >
                                <Button className="btnExportAnalytics" color="primary" variant="contained" >
                                    Exportar Etiquetas Imágenes
                                </Button>
                            </CSVLink>

                            <CSVLink {...csvReportWords} >
                                <Button className="btnExportAnalytics ml-2" color="primary" variant="contained" >
                                    Exportar Etiquetas Palabras
                                </Button>
                            </CSVLink>

                            <CSVLink {...csvReportUniqueSelections} >
                                <Button className="btnExportAnalytics ml-2" color="primary" variant="contained" >
                                    Exportar S. Únicas
                                </Button>
                            </CSVLink>
                        </>
                        :   null
                    }
                </div>
            </>
            :
                <div className="text-center ml-auto mr-auto mt-4" >
                    Usted no puede ver el contenido de esta vista
                </div>
            }
        </div>
    );
}
 
export default Analytic;