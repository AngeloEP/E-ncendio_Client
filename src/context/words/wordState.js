import React, { useReducer } from 'react';
import wordContext from './wordContext';
import wordReducer from './wordReducer';

import Swal from 'sweetalert2';

import {
    OBTENER_PALABRAS,
    OBTENER_PALABRAS_ERROR,
    OBTENER_PALABRAS_POR_USUARIO,
    OBTENER_PALABRAS_POR_USUARIO_ERROR,
    GUARDAR_PALABRA,
    GUARDAR_PALABRA_CARGANDO,
    GUARDAR_PALABRA_ERROR,
    MODIFICAR_PALABRA,
    MODIFICAR_PALABRA_CARGANDO,
    MODIFICAR_PALABRA_ERROR,
    ELIMINAR_PALABRA,
    ELIMINAR_PALABRA_CARGANDO,
    ELIMINAR_PALABRA_ERROR,
    HABILITAR_INHABILITAR_PALABRA,
    HABILITAR_INHABILITAR_PALABRA_CARGANDO,
    HABILITAR_INHABILITAR_PALABRA_ERROR,
    ELIMINAR_PALABRA_DESDE_ADMIN,
    ELIMINAR_PALABRA_DESDE_ADMIN_CARGANDO,
    ELIMINAR_PALABRA_DESDE_ADMIN_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const WordState = props => {
    const initialState = {
        palabra: null,
        palabras: [],
        largoPalabras: 0,
        errores: [],
        cargandoSubirPalabra: false,
        cargandoEliminarPalabra: false,
        cargandoModificarPalabra: false,
        cargandoHabilitarInhabilitarPalabra: false,
        cargandoEliminarPalabraPorAdmin: false,
    }

    const [ state, dispatch ] = useReducer(wordReducer, initialState)

    const obtenerPalabras = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/words')
            dispatch({
                type: OBTENER_PALABRAS,
                payload: respuesta.data.palabras
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_PALABRAS_ERROR,
                payload: error
            })
        }
    }

    const guardarPalabra = async (datos) => {
        try {
            dispatch({
                type: GUARDAR_PALABRA_CARGANDO,
            })

            const respuesta = await clienteAxios.post('/api/words', datos)
            console.log(respuesta.data)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su palabra se guardó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: GUARDAR_PALABRA,
                    payload: respuesta.data.palabra
                })
            }, 1500);
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: GUARDAR_PALABRA_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    const traerPalabrasPorUsuario = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/words/user')
            dispatch({
                type: OBTENER_PALABRAS_POR_USUARIO,
                payload: respuesta.data.palabras
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_PALABRAS_POR_USUARIO_ERROR,
                payload: error
            })
        }
    }

    const eliminarPalabra = async (id_palabra) => {
        try {
            dispatch({
                type: ELIMINAR_PALABRA_CARGANDO,
            })
            const respuesta = await clienteAxios.delete(`/api/words/user/${id_palabra}`)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su palabra se eliminó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: ELIMINAR_PALABRA,
                    payload: respuesta.data
                })
            }, 1500);
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: ELIMINAR_PALABRA_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    const modificarPalabra = async (id_palabra, datos) => {
        try {
            dispatch({
                type: MODIFICAR_PALABRA_CARGANDO,
            })
            console.log(datos)
            const respuesta = await clienteAxios.put(`/api/words/user/word/${id_palabra}`, datos)
            console.log(respuesta.data)
            // return

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su palabra se modificó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: MODIFICAR_PALABRA,
                    payload: respuesta.data.palabraAntigua
                })
                traerPalabrasPorUsuario()
            }, 1000);
            
        } catch (error) {
            console.log(error.response.data)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: MODIFICAR_PALABRA_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    const habilitarInhabilitarPalabraPorUsuario = async ( word_id, datos ) => {
        try {
            dispatch({
                type: HABILITAR_INHABILITAR_PALABRA_CARGANDO,
                payload: true
            })
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger ml-4'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Confirme su decisión',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `Modificar`,
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false,
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                    const respuesta = await clienteAxios.put(`/api/words/user/word/isEnabled/${word_id}`, datos)
                    Swal.fire({
                        icon: 'success',
                        title: 'Modificación exitosa',
                        text: "La propiedad se cambió exitosamente",
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: HABILITAR_INHABILITAR_PALABRA,
                        })
                    }, 1000);
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('No se modificó la palabra', '', 'info')
                    dispatch({
                        type: HABILITAR_INHABILITAR_PALABRA,
                    })
                }
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: HABILITAR_INHABILITAR_PALABRA_ERROR,
                payload: error
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo modificar la propiedad, inténtelo nuevamente!',
            })
        }
    }

    const eliminarPalabraPorUsuarioDesdeAdmin = async ( word_id ) => {
        try {
            dispatch({
                type: ELIMINAR_PALABRA_DESDE_ADMIN_CARGANDO,
                payload: true
            })
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger ml-4'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Al eliminarla, también eliminará sus asociaciones a esa palabra',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: `Eliminar`,
                allowOutsideClick: false,
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                    const respuesta = await clienteAxios.delete(`/api/words/user/word/${word_id}`)
                    Swal.fire({
                        icon: 'success',
                        title: 'Proceso exitoso',
                        text: "La palabra se eliminó exitosamente",
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: ELIMINAR_PALABRA_DESDE_ADMIN,
                        })
                    }, 1000);
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('No se eliminó la palabra', '', 'info')
                    dispatch({
                        type: ELIMINAR_PALABRA_DESDE_ADMIN,
                    })
                }
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: ELIMINAR_PALABRA_DESDE_ADMIN_ERROR,
                payload: error
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo eliminar la palabra, inténtelo nuevamente!',
            })
        }
    }

    return (
        <wordContext.Provider
            value={{
                palabra: state.palabra,
                palabras: state.palabras,
                largoPalabras: state.largoPalabras,
                cargandoSubirPalabra: state.cargandoSubirPalabra,
                cargandoEliminarPalabra: state.cargandoEliminarPalabra,
                cargandoModificarPalabra: state.cargandoModificarPalabra,
                cargandoHabilitarInhabilitarPalabra: state.cargandoHabilitarInhabilitarPalabra,
                cargandoEliminarPalabraPorAdmin: state.cargandoEliminarPalabraPorAdmin,
                obtenerPalabras,
                guardarPalabra,
                traerPalabrasPorUsuario,
                eliminarPalabra,
                modificarPalabra,
                habilitarInhabilitarPalabraPorUsuario,
                eliminarPalabraPorUsuarioDesdeAdmin,
            }}
        >
            {props.children}
        </wordContext.Provider>
    )
}

export default WordState;