import React, { useReducer } from 'react';
import tipContext from './tipContext';
import tipReducer from './tipReducer';

import Swal from 'sweetalert2';

import {
    OBTENER_TIPS,
    OBTENER_TIPS_ERROR,
    OBTENER_TIPS_POR_USUARIO,
    OBTENER_TIPS_POR_USUARIO_ERROR,
    GUARDAR_TIP,
    GUARDAR_TIP_CARGANDO,
    GUARDAR_TIP_ERROR,
    MODIFICAR_TIP,
    MODIFICAR_TIP_CARGANDO,
    MODIFICAR_TIP_ERROR,
    ELIMINAR_TIP,
    ELIMINAR_TIP_CARGANDO,
    ELIMINAR_TIP_ERROR,
    ELIMINAR_RECOMPENSAS_SUBIR_TIP,
    ELIMINAR_RECOMPENSAS_SUBIR_TIP_TAREA,
} from '../../types';
import clienteAxios from '../../config/axios';

const TipState = props => {
    const initialState = {
        tip: null,
        tips: [],
        recompensasSubirTip: null,
        recompensasTareasSubirTip: null,
        largoTips: 0,
        errores: [],
        cargandoSubirTip: false,
        cargandoEliminarTip: false,
        cargandoModificarTip: false,
    }

    const [ state, dispatch ] = useReducer(tipReducer, initialState)

    const obtenerTips = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/tips')
            dispatch({
                type: OBTENER_TIPS,
                payload: respuesta.data.tips
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_TIPS_ERROR,
                payload: error
            })
        }
    }

    const guardarTip = async (datos) => {
        try {
            dispatch({
                type: GUARDAR_TIP_CARGANDO,
            })

            const respuesta = await clienteAxios.post('/api/tips', datos)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su Tip se guardó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: GUARDAR_TIP,
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
                type: GUARDAR_TIP_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    const traerTipsPorUsuario = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/tips/user')
            dispatch({
                type: OBTENER_TIPS_POR_USUARIO,
                payload: respuesta.data.tips
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_TIPS_POR_USUARIO_ERROR,
                payload: error
            })
        }
    }

    const eliminarTip = async (id_tip) => {
        try {
            dispatch({
                type: ELIMINAR_TIP_CARGANDO,
            })
            Swal.fire({
                title: 'Al eliminarlo, también eliminará las vistas de este Tip',
                showDenyButton: true,
                confirmButtonText: `Eliminar`,
                denyButtonText: `Cancelar`,
                allowOutsideClick: false
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                    await clienteAxios.delete(`/api/tips/user/${id_tip}`)
                    Swal.fire({
                        icon: 'success',
                        title: 'Su Tip se eliminó exitosamente!',
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: ELIMINAR_TIP,
                        })
                    }, 1000);
                }
                else if (result.isDenied) {
                    Swal.fire('No se eliminó el tip', '', 'info')
                    dispatch({
                        type: ELIMINAR_TIP_ERROR,
                    })
                }
            })

        } catch (error) {
            // console.log(error)
            dispatch({
                type: ELIMINAR_TIP_ERROR,
                payload: error
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'Hubo un error, inténtelo nuevamente!',
            })
        }
    }

    const modificarTip = async (id_tip, datos) => {
        try {
            dispatch({
                type: MODIFICAR_TIP_CARGANDO,
            })
            // console.log(datos)
            const respuesta = await clienteAxios.put(`/api/tips/user/tip/${id_tip}`, datos)
            // console.log(respuesta.data)
            // return

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su Tip se modificó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: MODIFICAR_TIP,
                    payload: respuesta.data.tipAntiguo
                })
                traerTipsPorUsuario()
            }, 1000);
            
        } catch (error) {
            console.log(error.response.data)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: MODIFICAR_TIP_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    // Eliminar recompensas
    const borrarRecompensasSubirTip = async () => {
        try {
            dispatch({
                type: ELIMINAR_RECOMPENSAS_SUBIR_TIP
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

    const borrarRecompensasTareasSubirTip = async () => {
        try {
            dispatch({
                type: ELIMINAR_RECOMPENSAS_SUBIR_TIP_TAREA
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
        <tipContext.Provider
            value={{
                tip: state.tip,
                tips: state.tips,
                recompensasSubirTip: state.recompensasSubirTip,
                recompensasTareasSubirTip: state.recompensasTareasSubirTip,
                largoTips: state.largoTips,
                cargandoSubirTip: state.cargandoSubirTip,
                cargandoEliminarTip: state.cargandoEliminarTip,
                cargandoModificarTip: state.cargandoModificarTip,
                cargandoHabilitarInhabilitarTip: state.cargandoHabilitarInhabilitarTip,
                cargandoEliminarTipPorAdmin: state.cargandoEliminarTipPorAdmin,
                obtenerTips,
                guardarTip,
                traerTipsPorUsuario,
                eliminarTip,
                modificarTip,
                borrarRecompensasSubirTip,
                borrarRecompensasTareasSubirTip,
            }}
        >
            {props.children}
        </tipContext.Provider>
    )
}

export default TipState;