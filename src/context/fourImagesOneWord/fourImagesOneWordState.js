import React, { useReducer } from 'react';
import fourImagesOneWordContext from './fourImagesOneWordContext';
import fourImagesOneWordReducer from './fourImagesOneWordReducer';

import Swal from 'sweetalert2';

import {
    OBTENER_AHORCADOS,
    OBTENER_AHORCADOS_ERROR,
    GUARDAR_AHORCADO,
    GUARDAR_AHORCADO_CARGANDO,
    GUARDAR_AHORCADO_ERROR,
    OBTENER_AHORCADOS_POR_USUARIO,
    OBTENER_AHORCADOS_POR_USUARIO_ERROR,
    MODIFICAR_AHORCADO,
    MODIFICAR_AHORCADO_CARGANDO,
    MODIFICAR_AHORCADO_ERROR,
    ELIMINAR_AHORCADO,
    ELIMINAR_AHORCADO_CARGANDO,
    ELIMINAR_AHORCADO_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const FourImagesOneWordState = props => {
    const initialState = {
        ahorcado: null,
        ahorcados: [],
        largoAhorcados: 0,
        errores: [],
        cargandoSubirAhorcado: false,
        cargandoEliminarAhorcado: false,
        cargandoModificarAhorcado: false,
    }

    const [ state, dispatch ] = useReducer(fourImagesOneWordReducer, initialState)

    const obtenerAhorcados = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/hangmans')
            dispatch({
                type: OBTENER_AHORCADOS,
                payload: respuesta.data.ahorcados
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_AHORCADOS_ERROR,
                payload: error
            })
        }
    }

    const guardarAhorcado = async (datos) => {
        try {
            dispatch({
                type: GUARDAR_AHORCADO_CARGANDO,
            })

            const respuesta = await clienteAxios.post('/api/hangmans', datos)
            console.log(respuesta.data)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su contenido se agrego exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: GUARDAR_AHORCADO,
                    payload: respuesta.data.ahorcado
                })
            }, 1500);
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: GUARDAR_AHORCADO_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    const traerAhorcadosPorUsuario = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/hangmans/user')
            dispatch({
                type: OBTENER_AHORCADOS_POR_USUARIO,
                payload: respuesta.data.ahorcados
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_AHORCADOS_POR_USUARIO_ERROR,
                payload: error
            })
        }
    }

    const eliminarAhorcado = async (id_ahorcado) => {
        try {
            dispatch({
                type: ELIMINAR_AHORCADO_CARGANDO,
            })
            
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger ml-4'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¡Eliminará este contenido!',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: `Eliminar`,
                allowOutsideClick: false,
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                    const respuesta = await clienteAxios.delete(`/api/hangmans/user/${id_ahorcado}`)
                    Swal.fire({
                        icon: 'success',
                        title: 'Proceso exitoso',
                        text: "Su contenido se eliminó exitosamente!",
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: ELIMINAR_AHORCADO,
                            payload: id_ahorcado
                        })
                    }, 1500);
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('No se eliminó el contenido', '', 'info')
                    dispatch({
                        type: ELIMINAR_AHORCADO_ERROR,
                    })
                }
            })
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: ELIMINAR_AHORCADO_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    const modificarAhorcado = async (id_ahorcado, datos) => {
        try {
            dispatch({
                type: MODIFICAR_AHORCADO_CARGANDO,
            })
            const respuesta = await clienteAxios.put(`/api/hangmans/user/hangman/${id_ahorcado}`, datos)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su contenido se modificó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: MODIFICAR_AHORCADO,
                    payload: respuesta.data.ahorcadoAntiguo
                })
                traerAhorcadosPorUsuario()
            }, 1000);
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: MODIFICAR_AHORCADO_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    return (
        <fourImagesOneWordContext.Provider
            value={{
                ahorcado: state.ahorcado,
                ahorcados: state.ahorcados,
                largoAhorcados: state.largoAhorcados,
                ahorcadoActual: state.ahorcadoActual,
                cargandoSubirAhorcado: state.cargandoSubirAhorcado,
                cargandoEliminarAhorcado: state.cargandoEliminarAhorcado,
                cargandoModificarAhorcado: state.cargandoModificarAhorcado,
                cargandoHabilitarInhabilitar: state.cargandoHabilitarInhabilitar,
                cargandoEliminarAhorcadoPorAdmin: state.cargandoEliminarAhorcadoPorAdmin,
                obtenerAhorcados,
                guardarAhorcado,
                traerAhorcadosPorUsuario,
                eliminarAhorcado,
                modificarAhorcado,
            }}
        >
            {props.children}
        </fourImagesOneWordContext.Provider>
    )
}

export default FourImagesOneWordState;