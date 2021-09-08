import React, { useContext, useEffect, useState } from 'react';
import './analytic.css';

import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/autentificacion/authContext';
import AnalyticsContext from '../../context/analytics/analyticsContext';

import Paper from '@material-ui/core/Paper';

import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";

import ClipLoader from "react-spinners/ClipLoader";

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
    } = analyticsContext

    useEffect(() => {
        usuarioAutenticado()
        obtenerPerfil()
        traerDistribucionDeCategorias()
        traerDistribucionDeCategoriasPalabras()
        // eslint-disable-next-line
    }, [])

    const [checkValue, setCheckValue] = useState('')
    const [ checkValueWord, setCheckValueWord ] = useState('')

    const handleChange = event => {
        setCheckValue(event);
        traerDistribucionDeCategoriasPorImagen(event)
    };

    const handleChangeWords = event => {
        setCheckValueWord(event);
        traerDistribucionDeCategoriasPorPalabra(event)
    };

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
                <h3 className="title-images-distribution-analytics" > Distribución de categorías por imágenes </h3>
                <div className="container-fluid ml-2 mt-4 mr-2" >
                    <div className="row divCategories" >
                        { !cargandoDistribucionCategorias && distribucionCategoriasImagenes.length > 0
                        ?
                            <RadioGroup defaultValue="" onChange={handleChange} >
                                <Stack spacing={0} direction="row">
                                        <>
                                            {distribucionCategoriasImagenes.map((category, index) =>
                                                index !== 7
                                                ?
                                                    <div key={index} className="col" >
                                                        <Radio colorScheme="red" value={category.category} >
                                                            {`${category.category} ${Math.round(category.count/distribucionCategoriasImagenes[7].total * 100)}%`}
                                                        </Radio>
                                                    </div>
                                                :
                                                    null
                                                
                                            )}
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
                                        distribucionCategoriasPorImagen.map((imagen, index) => 
                                            <div key={index} className="col-3" >
                                                <div className="card text-white tarjeta-analytic-image" >
                                                    <img className="card-img-top imagen-tarjeta-analytic" src={imagen.image.imageUrl} alt="" />
                                                    <div className="card-body text-center">
                                                        <h5 className="card-title titulo-distribucion-card-analytic-image"> Distribución </h5>
                                                        <div className="card-text distribucion-card-analytic-image"> 
                                                            <div className="row mb-2 justify-content-between" >
                                                                <Tooltip label="Impacto" >
                                                                    <span className='boxDist red'>    <span> {imagen.impacto} </span> </span> 
                                                                </Tooltip>
                                                                <Tooltip label="Riesgo" >
                                                                    <span className='boxDist green'>  <span> {imagen.riesgo} </span> </span> 
                                                                </Tooltip>
                                                                <Tooltip label="Recuperación" >
                                                                    <span className='boxDist blue'>   <span> {imagen.recuperacion} </span> </span> 
                                                                </Tooltip>
                                                                <Tooltip label="Prevención" >
                                                                    <span className='boxDist orange'> <span> {imagen.prevencion} </span> </span> 
                                                                </Tooltip>
                                                                <Tooltip label="Combate" >
                                                                    <span className='boxDist yellow'> <span> {imagen.combate} </span> </span> 
                                                                </Tooltip>
                                                                <Tooltip label="Mitigación" >
                                                                    <span className='boxDist purple'> <span> {imagen.mitigacion} </span> </span> 
                                                                </Tooltip>
                                                                <Tooltip label="Amenaza" >
                                                                    <span className='boxDist aqua'>   <span> {imagen.amenaza} </span> </span> 
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                :
                                    <div className="text-center position-relative w-100" style={{ top: "50%" }} >
                                        <h3 className="withoutCategory" > Seleccione una categoría  </h3>
                                    </div>
                                }
                            </div>

                        </div>

                    {/* <div className="text-center ml-auto mr-auto" >
                        Aún no ha etiquetado imágenes
                    </div> */}
                    </div>
                
                </div>
                {/* PALABRAS */}
                <h3 className="title-words-distribution-analytics" > Distribución de categorías por palabras </h3>
                <div className="container-fluid ml-2 mt-5 mr-2" >
                    <div className="row divCategories" >
                        { !cargandoDistribucionCategoriasPalabras && distribucionCategoriasPalabras.length > 0
                        ?
                            <RadioGroup defaultValue="" onChange={handleChangeWords} >
                                <Stack spacing={0} direction="row">
                                        <>
                                            {distribucionCategoriasPalabras.map((category, index) =>
                                                index !== 7
                                                ?
                                                    <div key={index} className="col" >
                                                        <Radio colorScheme="red" value={category.category} >
                                                            {`${category.category} ${Math.round(category.count/distribucionCategoriasPalabras[7].total * 100)}%`}
                                                        </Radio>
                                                    </div>
                                                :
                                                    null
                                                
                                            )}
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
                                        distribucionCategoriasPorPalabra.map((palabra, index) => 
                                            <div key={index} className="col-3" >
                                                <div className="card text-white tarjeta-analytic-image" >
                                                    <Paper className="card-img-top palabra-tarjeta" elevation={10} variant="outlined"  >
                                                            {palabra.word.name}
                                                    </Paper>
                                                    <div className="card-body text-center">
                                                        <h5 className="card-title titulo-distribucion-card-analytic-image"> Distribución </h5>
                                                        <div className="card-text distribucion-card-analytic-image"> 
                                                            <div className="row mb-2 justify-content-between" >
                                                                <Tooltip label="Impacto" >
                                                                    <span className='boxDist red'>    <span> {palabra.impacto} </span> </span> 
                                                                </Tooltip>
                                                                <Tooltip label="Riesgo" >
                                                                    <span className='boxDist green'>  <span> {palabra.riesgo} </span> </span> 
                                                                </Tooltip>
                                                                <Tooltip label="Recuperación" >
                                                                    <span className='boxDist blue'>   <span> {palabra.recuperacion} </span> </span> 
                                                                </Tooltip>
                                                                <Tooltip label="Prevención" >
                                                                    <span className='boxDist orange'> <span> {palabra.prevencion} </span> </span> 
                                                                </Tooltip>
                                                                <Tooltip label="Combate" >
                                                                    <span className='boxDist yellow'> <span> {palabra.combate} </span> </span> 
                                                                </Tooltip>
                                                                <Tooltip label="Mitigación" >
                                                                    <span className='boxDist purple'> <span> {palabra.mitigacion} </span> </span> 
                                                                </Tooltip>
                                                                <Tooltip label="Amenaza" >
                                                                    <span className='boxDist aqua'>   <span> {palabra.amenaza} </span> </span> 
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                :
                                    <div className="text-center position-relative w-100" style={{ top: "50%" }} >
                                        <h3 className="withoutCategory" > Seleccione una categoría  </h3>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                
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