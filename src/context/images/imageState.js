import React, { useReducer } from 'react';
import imageContext from './imageContext';
import imageReducer from './imageReducer';

import Swal from 'sweetalert2';

import {
    OBTENER_IMAGENES,
    OBTENER_IMAGENES_ERROR,
    SIGUIENTE_IMAGEN,
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
} from '../../types';
import clienteAxios from '../../config/axios';

const ImageState = props => {
    const initialState = {
        imagen: null,
        imagenes: [],
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
            console.log(respuesta.data)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su imagen se agrego exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: GUARDAR_IMAGEN,
                    payload: respuesta.data.imagen
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
            const respuesta = await clienteAxios.delete(`/api/images/user/${id_imagen}`)

            Swal.fire({
                icon: 'success',
                title: 'Proceso exitoso',
                text: 'Su imagen se eliminó exitosamente!',
            });
            setTimeout(() => {
                dispatch({
                    type: ELIMINAR_IMAGEN,
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
                type: ELIMINAR_IMAGEN_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos, hubo un error',
                text: `${alerta.msg}`,
            })
        }
    }

    const modificarImagen = async (id_imagen, datos) => {
        try {
            dispatch({
                type: MODIFICAR_IMAGEN_CARGANDO,
            })
            const respuesta = await clienteAxios.put(`/api/images/user/image/${id_imagen}`, datos)
            console.log(respuesta.data)
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

    return (
        <imageContext.Provider
            value={{
                imagen: state.imagen,
                imagenes: state.imagenes,
                largoImagenes: state.largoImagenes,
                imagenActual: state.imagenActual,
                cargandoSubirImagen: state.cargandoSubirImagen,
                cargandoEliminarImagen: state.cargandoEliminarImagen,
                cargandoModificarImagen: state.cargandoModificarImagen,
                obtenerImagenes,
                guardarImagen,
                traerImagenesPorUsuario,
                eliminarImagen,
                modificarImagen,
            }}
        >
            {props.children}
        </imageContext.Provider>
    )
}

export default ImageState;