import React, { useReducer } from 'react';
import imageContext from './imageContext';
import imageReducer from './imageReducer';

import Swal from 'sweetalert2';

import {
    OBTENER_IMAGENES,
    OBTENER_IMAGENES_ERROR,
    GUARDAR_IMAGEN,
    GUARDAR_IMAGEN_CARGANDO,
    GUARDAR_IMAGEN_ERROR,
    OBTENER_IMAGENES_POR_USUARIO,
    OBTENER_IMAGENES_POR_USUARIO_ERROR,
    MODIFICAR_IMAGEN,
    MODIFICAR_IMAGEN_CARGANDO,
    MODIFICAR_IMAGEN_ERROR,
    ELIMINAR_IMAGEN,
    ELIMINAR_IMAGEN_CARGANDO,
    ELIMINAR_IMAGEN_ERROR,
    ELIMINAR_RECOMPENSAS_SUBIR_IMAGEN,
    ELIMINAR_RECOMPENSAS_SUBIR_IMAGEN_TAREA,
} from '../../types';
import clienteAxios from '../../config/axios';

const ImageState = props => {
    const initialState = {
        imagen: null,
        imagenes: [],
        recompensasSubirImagen: null,
        recompensasTareasSubirImagen: null,
        largoImagenes: 0,
        errores: [],
        cargandoSubirImagen: false,
        cargandoEliminarImagen: false,
        cargandoModificarImagen: false,
    }

    const [ state, dispatch ] = useReducer(imageReducer, initialState)

    const obtenerImagenes = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/images')
            dispatch({
                type: OBTENER_IMAGENES,
                payload: respuesta.data.imagenes
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_IMAGENES_ERROR,
                payload: error
            })
        }
    }

    const guardarImagen = async (datos) => {
        try {
            dispatch({
                type: GUARDAR_IMAGEN_CARGANDO,
            })

            const respuesta = await clienteAxios.post('/api/images', datos)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su imagen se agrego exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: GUARDAR_IMAGEN,
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
                type: GUARDAR_IMAGEN_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    const traerImagenesPorUsuario = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/images/user')
            dispatch({
                type: OBTENER_IMAGENES_POR_USUARIO,
                payload: respuesta.data.imagenes
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: OBTENER_IMAGENES_POR_USUARIO_ERROR,
                payload: error
            })
        }
    }

    const eliminarImagen = async (id_imagen) => {
        try {
            dispatch({
                type: ELIMINAR_IMAGEN_CARGANDO,
            })
            Swal.fire({
                title: 'Al eliminarla, también eliminará sus asociaciones a esa imagen',
                showDenyButton: true,
                confirmButtonText: `Eliminar`,
                denyButtonText: `Cancelar`,
                allowOutsideClick: false
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                    await clienteAxios.delete(`/api/images/user/${id_imagen}`)
                    Swal.fire({
                        icon: 'success',
                        title: 'Su Imagen se eliminó exitosamente!',
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: ELIMINAR_IMAGEN,
                        })
                    }, 1000);
                }
                else if (result.isDenied) {
                    Swal.fire('No se eliminó la Imagen', '', 'info')
                    dispatch({
                        type: ELIMINAR_IMAGEN_ERROR,
                    })
                }
            })

        } catch (error) {
            // console.log(error)
            dispatch({
                type: ELIMINAR_IMAGEN_ERROR,
                payload: error
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'Hubo un error, inténtelo nuevamente!',
            })
        }
    }

    const modificarImagen = async (id_imagen, datos) => {
        try {
            dispatch({
                type: MODIFICAR_IMAGEN_CARGANDO,
            })
            const respuesta = await clienteAxios.put(`/api/images/user/image/${id_imagen}`, datos)
            // return

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su imagen se modificó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: MODIFICAR_IMAGEN,
                    payload: respuesta.data.imagenAntigua
                })
                traerImagenesPorUsuario()
            }, 1000);
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: MODIFICAR_IMAGEN_ERROR,
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
    const borrarRecompensasSubirImagen = async () => {
        try {
            dispatch({
                type: ELIMINAR_RECOMPENSAS_SUBIR_IMAGEN
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

    // Eliminar recompensas
    const borrarRecompensasTareasSubirImagen = async () => {
        try {
            dispatch({
                type: ELIMINAR_RECOMPENSAS_SUBIR_IMAGEN_TAREA
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
        <imageContext.Provider
            value={{
                imagen: state.imagen,
                imagenes: state.imagenes,
                recompensasSubirImagen: state.recompensasSubirImagen,
                recompensasTareasSubirImagen: state.recompensasTareasSubirImagen,
                largoImagenes: state.largoImagenes,
                imagenActual: state.imagenActual,
                cargandoSubirImagen: state.cargandoSubirImagen,
                cargandoEliminarImagen: state.cargandoEliminarImagen,
                cargandoModificarImagen: state.cargandoModificarImagen,
                cargandoHabilitarInhabilitar: state.cargandoHabilitarInhabilitar,
                cargandoEliminarImagenPorAdmin: state.cargandoEliminarImagenPorAdmin,
                obtenerImagenes,
                guardarImagen,
                traerImagenesPorUsuario,
                eliminarImagen,
                modificarImagen,
                borrarRecompensasSubirImagen,
                borrarRecompensasTareasSubirImagen,
            }}
        >
            {props.children}
        </imageContext.Provider>
    )
}

export default ImageState;