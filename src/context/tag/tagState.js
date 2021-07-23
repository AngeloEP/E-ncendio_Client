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
    VER_TIP,
    VER_TIP_ERROR,
    OBTENER_TIPS_VISTOS,
    OBTENER_TIPS_VISTOS_CARGANDO,
    OBTENER_TIPS_VISTOS_ERROR,
    ELIMINAR_TIPS_VISTOS,
    ELIMINAR_TIPS_VISTOS_CARGANDO,
    ELIMINAR_TIPS_VISTOS_ERROR,
    ELIMINAR_RECOMPENSAS_ETIQUETAS,
    ELIMINAR_RECOMPENSAS_ETIQUETAS_TAREA,
} from '../../types';
import clienteAxios from '../../config/axios';

const TagState = props => {
    const initialState = {
        recompensas: null,
        recompensasTareas: null,
        imagenesEtiquetadas: [],
        palabrasEtiquetadas: [],
        ahorcadosEtiquetados: [],
        tipsVistos: [],
        errores: [],
        cargandoImagenesEtiquetadasUsuarioDesdeAdmin: false,
        cargandoPalabrasEtiquetadasUsuarioDesdeAdmin: false,
        cargandoAhorcadosEtiquetadosUsuarioDesdeAdmin: false,
        cargandoTipsVistosUsuarioDesdeAdmin: false,
        cargandoResetearEtiquetasPalabras: false,
        cargandoResetearEtiquetasImagenes: false,
        cargandoResetearEtiquetasAhorcados: false,
        cargandoResetearTipsVistos: false,
    }

    const [ state, dispatch ] = useReducer(tagReducer, initialState)

    const etiquetarImagen = async ( image_id, category_id ) => {
        try {
            const respuesta = await clienteAxios.post(`/api/tag-images/${image_id}/category/${category_id}`)
            dispatch({
                type: ETIQUETAR_IMAGEN,
                payload: respuesta.data
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
                payload: respuesta.data
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
                payload: respuesta.data
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: ETIQUETAR_AHORCADO_ERROR,
                payload: error
            })
        }
    }

    const verTip = async ( tip_id ) => {
        try {
            const respuesta = await clienteAxios.post(`/api/view-tips/${tip_id}`)
            dispatch({
                type: VER_TIP,
                payload: respuesta.data
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: VER_TIP_ERROR,
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

    const obtenerTipsVistosPorUsuario = async ( user_id ) => {
        try {
            dispatch({
                type: OBTENER_TIPS_VISTOS_CARGANDO,
            })
            const respuesta = await clienteAxios.get(`/api/view-tips/user/${user_id}`)
            dispatch({
                type: OBTENER_TIPS_VISTOS,
                payload: respuesta.data.asociacionesTips
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_TIPS_VISTOS_ERROR,
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

    const eliminarTipsVistosPorUsuario = async ( user_id ) => {
        try {
            dispatch({
                type: ELIMINAR_TIPS_VISTOS_CARGANDO,
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
                    const respuesta = await clienteAxios.delete(`/api/view-tips/user/${user_id}`)
                    Swal.fire({
                        icon: 'success',
                        title: 'Reseteo de tips vistos exitosa',
                        text: respuesta.data,
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: ELIMINAR_TIPS_VISTOS,
                        })
                    }, 1000);
                }
                else if (result.isDenied) {
                    Swal.fire('No se eliminaron los tips vistos', '', 'info')
                    dispatch({
                        type: ELIMINAR_TIPS_VISTOS_ERROR,
                    })
                }
            })

        } catch (error) {
            // console.log(error)
            dispatch({
                type: ELIMINAR_TIPS_VISTOS_ERROR,
                payload: error
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo eliminar los tips vistos, inténtelo nuevamente!',
            })
        }
    }

    // Eliminar recompensas
    const borrarRecompensasEtiquetas = async () => {
        try {
            dispatch({
                type: ELIMINAR_RECOMPENSAS_ETIQUETAS
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'Ocurrió un error al intentar eliminar su recompensa!',
            })
        }
    }

    // Eliminar recompensas tareas
    const borrarRecompensasEtiquetasTareas = async () => {
        try {
            dispatch({
                type: ELIMINAR_RECOMPENSAS_ETIQUETAS_TAREA
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'Ocurrió un error al intentar eliminar su recompensa de tarea!',
            })
        }
    }


    return (
        <tagContext.Provider
            value={{
                recompensas: state.recompensas,
                recompensasTareas: state.recompensasTareas,
                imagenesEtiquetadas: state.imagenesEtiquetadas,
                palabrasEtiquetadas: state.palabrasEtiquetadas,
                ahorcadosEtiquetados: state.ahorcadosEtiquetados,
                cargandoImagenesEtiquetadasUsuarioDesdeAdmin: state.cargandoImagenesEtiquetadasUsuarioDesdeAdmin,
                cargandoPalabrasEtiquetadasUsuarioDesdeAdmin: state.cargandoPalabrasEtiquetadasUsuarioDesdeAdmin,
                cargandoAhorcadosEtiquetadosUsuarioDesdeAdmin: state.cargandoAhorcadosEtiquetadosUsuarioDesdeAdmin,
                cargandoResetearEtiquetasPalabras: state.cargandoResetearEtiquetasPalabras,
                cargandoResetearEtiquetasImagenes: state.cargandoResetearEtiquetasImagenes,
                cargandoResetearEtiquetasAhorcados: state.cargandoResetearEtiquetasAhorcados,
                tipsVistos: state.tipsVistos,
                cargandoTipsVistosUsuarioDesdeAdmin: state.cargandoTipsVistosUsuarioDesdeAdmin,
                cargandoResetearTipsVistos: state.cargandoResetearTipsVistos,
                etiquetarImagen,
                etiquetarPalabra,
                obtenerImagenesEtiquetadasPorUsuario,
                obtenerPalabrasEtiquetadasPorUsuario,
                eliminarPalabrasEtiquetadasPorUsuario,
                eliminarImagenesEtiquetadasPorUsuario,
                etiquetarAhorcado,
                obtenerAhorcadosEtiquetadosPorUsuario,
                eliminarAhorcadosEtiquetadosPorUsuario,
                verTip,
                obtenerTipsVistosPorUsuario,
                eliminarTipsVistosPorUsuario,
                borrarRecompensasEtiquetas,
                borrarRecompensasEtiquetasTareas,
            }}
        >
            {props.children}
        </tagContext.Provider>
    )
}

export default TagState;