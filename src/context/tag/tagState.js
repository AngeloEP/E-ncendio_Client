import React, { useReducer } from 'react';
import tagContext from './tagContext';
import tagReducer from './tagReducer';

import Swal from 'sweetalert2';

import {
    ETIQUETAR_IMAGEN,
    ETIQUETAR_IMAGEN_ERROR,
    OBTENER_IMAGENES_ETIQUETADAS,
    OBTENER_IMAGENES_ETIQUETADAS_CARGANDO,
    OBTENER_IMAGENES_ETIQUETADAS_ERROR,
    ELIMINAR_ETIQUETAS_IMAGENES,
    ELIMINAR_ETIQUETAS_IMAGENES_CARGANDO,
    ELIMINAR_ETIQUETAS_IMAGENES_ERROR,
    ETIQUETAR_PALABRA,
    ETIQUETAR_PALABRA_ERROR,
    OBTENER_PALABRAS_ETIQUETADAS,
    OBTENER_PALABRAS_ETIQUETADAS_CARGANDO,
    OBTENER_PALABRAS_ETIQUETADAS_ERROR,
    ELIMINAR_ETIQUETAS_PALABRAS,
    ELIMINAR_ETIQUETAS_PALABRAS_CARGANDO,
    ELIMINAR_ETIQUETAS_PALABRAS_ERROR,
    ETIQUETAR_AHORCADO,
    ETIQUETAR_AHORCADO_ERROR,
    OBTENER_AHORCADOS_ETIQUETADOS,
    OBTENER_AHORCADOS_ETIQUETADOS_CARGANDO,
    OBTENER_AHORCADOS_ETIQUETADOS_ERROR,
    ELIMINAR_ETIQUETAS_AHORCADOS,
    ELIMINAR_ETIQUETAS_AHORCADOS_CARGANDO,
    ELIMINAR_ETIQUETAS_AHORCADOS_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const TagState = props => {
    const initialState = {
        imagenesEtiquetadas: [],
        palabrasEtiquetadas: [],
        ahorcadosEtiquetados: [],
        errores: [],
        cargandoImagenesEtiquetadasUsuarioDesdeAdmin: false,
        cargandoPalabrasEtiquetadasUsuarioDesdeAdmin: false,
        cargandoAhorcadosEtiquetadosUsuarioDesdeAdmin: false,
        cargandoResetearEtiquetasPalabras: false,
        cargandoResetearEtiquetasImagenes: false,
        cargandoResetearEtiquetasAhorcados: false,
    }

    const [ state, dispatch ] = useReducer(tagReducer, initialState)

    const etiquetarImagen = async ( image_id, category_id ) => {
        try {
            const respuesta = await clienteAxios.post(`/api/tag-images/${image_id}/category/${category_id}`)
            dispatch({
                type: ETIQUETAR_IMAGEN,
                payload: []
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: ETIQUETAR_IMAGEN_ERROR,
                payload: error
            })
        }
    }

    const etiquetarPalabra = async ( palabra_id, category_id ) => {
        try {
            const respuesta = await clienteAxios.post(`/api/tag-words/${palabra_id}/category/${category_id}`)
            dispatch({
                type: ETIQUETAR_PALABRA,
                payload: []
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: ETIQUETAR_PALABRA_ERROR,
                payload: error
            })
        }
    }

    const etiquetarAhorcado = async ( hangman_id, associatedWord ) => {
        try {
            const respuesta = await clienteAxios.post(`/api/tag-hangmans/${hangman_id}/word/${associatedWord}`)
            dispatch({
                type: ETIQUETAR_AHORCADO,
                payload: []
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: ETIQUETAR_AHORCADO_ERROR,
                payload: error
            })
        }
    }

    const obtenerImagenesEtiquetadasPorUsuario = async ( user_id ) => {
        try {
            dispatch({
                type: OBTENER_IMAGENES_ETIQUETADAS_CARGANDO,
            })
            const respuesta = await clienteAxios.get(`/api/tag-images/user/${user_id}`)
            dispatch({
                type: OBTENER_IMAGENES_ETIQUETADAS,
                payload: respuesta.data.asociacionesImagenes
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_IMAGENES_ETIQUETADAS_ERROR,
                payload: error
            })
        }
    }

    const obtenerPalabrasEtiquetadasPorUsuario = async ( user_id ) => {
        try {
            dispatch({
                type: OBTENER_PALABRAS_ETIQUETADAS_CARGANDO,
            })
            const respuesta = await clienteAxios.get(`/api/tag-words/user/${user_id}`)
            dispatch({
                type: OBTENER_PALABRAS_ETIQUETADAS,
                payload: respuesta.data.asociacionesPalabras
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_PALABRAS_ETIQUETADAS_ERROR,
                payload: error
            })
        }
    }

    const obtenerAhorcadosEtiquetadosPorUsuario = async ( user_id ) => {
        try {
            dispatch({
                type: OBTENER_AHORCADOS_ETIQUETADOS_CARGANDO,
            })
            const respuesta = await clienteAxios.get(`/api/tag-hangmans/user/${user_id}`)
            dispatch({
                type: OBTENER_AHORCADOS_ETIQUETADOS,
                payload: respuesta.data.asociacionesAhorcados
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_AHORCADOS_ETIQUETADOS_ERROR,
                payload: error
            })
        }
    }

    const eliminarPalabrasEtiquetadasPorUsuario = async ( user_id ) => {
        try {
            dispatch({
                type: ELIMINAR_ETIQUETAS_PALABRAS_CARGANDO,
                payload: true
            })
            Swal.fire({
                title: 'Confirme su decisión',
                showDenyButton: true,
                // showCancelButton: true,
                confirmButtonText: `Eliminar`,
                denyButtonText: `Cancelar`,
                allowOutsideClick: false
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                    const respuesta = await clienteAxios.delete(`/api/tag-words/user/${user_id}`)
                    Swal.fire({
                        icon: 'success',
                        title: 'Reseteo de etiquetas exitosa',
                        text: respuesta.data,
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: ELIMINAR_ETIQUETAS_PALABRAS,
                        })
                    }, 1000);
                }
                else if (result.isDenied) {
                    Swal.fire('No se eliminaron las etiquetas', '', 'info')
                    dispatch({
                        type: ELIMINAR_ETIQUETAS_PALABRAS_ERROR,
                    })
                }
            })

        } catch (error) {
            // console.log(error)
            dispatch({
                type: ELIMINAR_ETIQUETAS_PALABRAS_ERROR,
                payload: error
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo eliminar las etiquetas, inténtelo nuevamente!',
            })
        }
    }

    const eliminarImagenesEtiquetadasPorUsuario = async ( user_id ) => {
        try {
            dispatch({
                type: ELIMINAR_ETIQUETAS_IMAGENES_CARGANDO,
                payload: true
            })
            Swal.fire({
                title: 'Confirme su decisión',
                showDenyButton: true,
                // showCancelButton: true,
                confirmButtonText: `Eliminar`,
                denyButtonText: `Cancelar`,
                allowOutsideClick: false
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                    const respuesta = await clienteAxios.delete(`/api/tag-images/user/${user_id}`)
                    console.log(respuesta.data)
                    Swal.fire({
                        icon: 'success',
                        title: 'Reseteo de etiquetas exitosa',
                        text: respuesta.data,
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: ELIMINAR_ETIQUETAS_IMAGENES,
                        })
                    }, 1000);
                }
                else if (result.isDenied) {
                    Swal.fire('No se eliminaron las etiquetas', '', 'info')
                    dispatch({
                        type: ELIMINAR_ETIQUETAS_IMAGENES_ERROR,
                    })
                }
            })

        } catch (error) {
            // console.log(error)
            dispatch({
                type: ELIMINAR_ETIQUETAS_IMAGENES_ERROR,
                payload: error
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo eliminar las etiquetas, inténtelo nuevamente!',
            })
        }
    }

    const eliminarAhorcadosEtiquetadosPorUsuario = async ( user_id ) => {
        try {
            dispatch({
                type: ELIMINAR_ETIQUETAS_AHORCADOS_CARGANDO,
                payload: true
            })
            Swal.fire({
                title: 'Confirme su decisión',
                showDenyButton: true,
                confirmButtonText: `Eliminar`,
                denyButtonText: `Cancelar`,
                allowOutsideClick: false
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                    const respuesta = await clienteAxios.delete(`/api/tag-hangmans/user/${user_id}`)
                    console.log(respuesta.data)
                    Swal.fire({
                        icon: 'success',
                        title: 'Reseteo de etiquetas exitosa',
                        text: respuesta.data,
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: ELIMINAR_ETIQUETAS_AHORCADOS,
                        })
                    }, 1000);
                }
                else if (result.isDenied) {
                    Swal.fire('No se eliminaron las etiquetas', '', 'info')
                    dispatch({
                        type: ELIMINAR_ETIQUETAS_AHORCADOS_ERROR,
                    })
                }
            })

        } catch (error) {
            // console.log(error)
            dispatch({
                type: ELIMINAR_ETIQUETAS_AHORCADOS_ERROR,
                payload: error
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo eliminar las etiquetas, inténtelo nuevamente!',
            })
        }
    }

    return (
        <tagContext.Provider
            value={{
                imagenesEtiquetadas: state.imagenesEtiquetadas,
                palabrasEtiquetadas: state.palabrasEtiquetadas,
                ahorcadosEtiquetados: state.ahorcadosEtiquetados,
                cargandoImagenesEtiquetadasUsuarioDesdeAdmin: state.cargandoImagenesEtiquetadasUsuarioDesdeAdmin,
                cargandoPalabrasEtiquetadasUsuarioDesdeAdmin: state.cargandoPalabrasEtiquetadasUsuarioDesdeAdmin,
                cargandoAhorcadosEtiquetadosUsuarioDesdeAdmin: state.cargandoAhorcadosEtiquetadosUsuarioDesdeAdmin,
                cargandoResetearEtiquetasPalabras: state.cargandoResetearEtiquetasPalabras,
                cargandoResetearEtiquetasImagenes: state.cargandoResetearEtiquetasImagenes,
                cargandoResetearEtiquetasAhorcados: state.cargandoResetearEtiquetasAhorcados,
                etiquetarImagen,
                etiquetarPalabra,
                obtenerImagenesEtiquetadasPorUsuario,
                obtenerPalabrasEtiquetadasPorUsuario,
                eliminarPalabrasEtiquetadasPorUsuario,
                eliminarImagenesEtiquetadasPorUsuario,
                etiquetarAhorcado,
                obtenerAhorcadosEtiquetadosPorUsuario,
                eliminarAhorcadosEtiquetadosPorUsuario,
            }}
        >
            {props.children}
        </tagContext.Provider>
    )
}

export default TagState;