import React, { useReducer } from 'react';
import uniqueSelectionContext from './uniqueSelectionContext';
import uniqueSelectionReducer from './uniqueSelectionReducer';

import Swal from 'sweetalert2';

import {
    OBTENER_SELECCIONES_UNICAS,
    OBTENER_SELECCIONES_UNICAS_ERROR,
    GUARDAR_SELECCION_UNICA,
    GUARDAR_SELECCION_UNICA_CARGANDO,
    GUARDAR_SELECCION_UNICA_ERROR,
    OBTENER_SELECCIONES_UNICAS_POR_USUARIO,
    OBTENER_SELECCIONES_UNICAS_POR_USUARIO_ERROR,
    ELIMINAR_SELECCION_UNICA,
    ELIMINAR_SELECCION_UNICA_CARGANDO,
    ELIMINAR_SELECCION_UNICA_ERROR,
    MODIFICAR_SELECCION_UNICA,
    MODIFICAR_SELECCION_UNICA_CARGANDO,
    MODIFICAR_SELECCION_UNICA_ERROR,
    ELIMINAR_RECOMPENSAS_SUBIR_SELECCION_UNICA,
    ELIMINAR_RECOMPENSAS_SUBIR_SELECCION_UNICA_TAREA,
} from '../../types';
import clienteAxios from '../../config/axios';

const UniqueSelectionState = props => {
    const initialState = {
        seleccionUnica: null,
        seleccionesUnicas: [],
        recompensasSubirSeleccionUnica: null,
        recompensasTareasSubirSeleccionUnica: null,
        largoSeleccionesUnicas: 0,
        errores: [],
        cargandoSubirSeleccionUnica: false,
        cargandoEliminarSeleccionUnica: false,
        cargandoModificarSeleccionUnica: false,
    }

    const [ state, dispatch ] = useReducer(uniqueSelectionReducer, initialState)

    const obtenerSeleccionesUnicas = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/uniqueSelections')
            dispatch({
                type: OBTENER_SELECCIONES_UNICAS,
                payload: respuesta.data.seleccionesUnicas
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_SELECCIONES_UNICAS_ERROR,
                payload: error
            })
        }
    }

    const guardarSeleccionUnica = async (datos) => {
        try {
            dispatch({
                type: GUARDAR_SELECCION_UNICA_CARGANDO,
            })

            const respuesta = await clienteAxios.post('/api/uniqueSelections', datos)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su contenido se agrego exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: GUARDAR_SELECCION_UNICA,
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
                type: GUARDAR_SELECCION_UNICA_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    const traerSeleccionesUnicasPorUsuario = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/uniqueSelections/user')
            dispatch({
                type: OBTENER_SELECCIONES_UNICAS_POR_USUARIO,
                payload: respuesta.data.seleccionesUnicas
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_SELECCIONES_UNICAS_POR_USUARIO_ERROR,
                payload: error
            })
        }
    }

    const eliminarSeleccionUnica = async (id_seleccionUnica) => {
        try {
            dispatch({
                type: ELIMINAR_SELECCION_UNICA_CARGANDO,
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
                    await clienteAxios.delete(`/api/uniqueSelections/user/${id_seleccionUnica}`)
                    Swal.fire({
                        icon: 'success',
                        title: 'Proceso exitoso',
                        text: "Su contenido se eliminó exitosamente!",
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: ELIMINAR_SELECCION_UNICA,
                            payload: id_seleccionUnica
                        })
                    }, 1500);
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('No se eliminó el contenido', '', 'info')
                    dispatch({
                        type: ELIMINAR_SELECCION_UNICA_ERROR,
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
                type: ELIMINAR_SELECCION_UNICA_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    const modificarSeleccionUnica = async (id_seleccionUnica, datos) => {
        try {
            dispatch({
                type: MODIFICAR_SELECCION_UNICA_CARGANDO,
            })
            const respuesta = await clienteAxios.put(`/api/uniqueSelections/user/uniqueSelection/${id_seleccionUnica}`, datos)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su contenido se modificó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: MODIFICAR_SELECCION_UNICA,
                    payload: respuesta.data.seleccionUnicaAntigua
                })
                traerSeleccionesUnicasPorUsuario()
            }, 1000);
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: MODIFICAR_SELECCION_UNICA_ERROR,
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
    const borrarRecompensasSubirSeleccionUnica = async () => {
        try {
            dispatch({
                type: ELIMINAR_RECOMPENSAS_SUBIR_SELECCION_UNICA
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

    const borrarRecompensasTareasSubirSeleccionUnica = async () => {
        try {
            dispatch({
                type: ELIMINAR_RECOMPENSAS_SUBIR_SELECCION_UNICA_TAREA
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
        <uniqueSelectionContext.Provider
            value={{
                seleccionUnica: state.seleccionUnica,
                seleccionesUnicas: state.seleccionesUnicas,
                recompensasSubirSeleccionUnica: state.recompensasSubirSeleccionUnica,
                recompensasTareasSubirSeleccionUnica: state.recompensasTareasSubirSeleccionUnica,
                largoSeleccionesUnicas: state.largoSeleccionesUnicas,
                cargandoSubirSeleccionUnica: state.cargandoSubirSeleccionUnica,
                cargandoEliminarSeleccionUnica: state.cargandoEliminarSeleccionUnica,
                cargandoModificarSeleccionUnica: state.cargandoModificarSeleccionUnica,
                obtenerSeleccionesUnicas,
                guardarSeleccionUnica,
                traerSeleccionesUnicasPorUsuario,
                eliminarSeleccionUnica,
                modificarSeleccionUnica,
                borrarRecompensasSubirSeleccionUnica,
                borrarRecompensasTareasSubirSeleccionUnica,
            }}
        >
            {props.children}
        </uniqueSelectionContext.Provider>
    )
}

export default UniqueSelectionState;