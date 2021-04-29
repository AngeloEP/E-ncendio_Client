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
    HABILITAR_INHABILITAR_IMAGEN,
    HABILITAR_INHABILITAR_IMAGEN_CARGANDO,
    HABILITAR_INHABILITAR_IMAGEN_ERROR,
    ELIMINAR_IMAGEN_DESDE_ADMIN,
    ELIMINAR_IMAGEN_DESDE_ADMIN_CARGANDO,
    ELIMINAR_IMAGEN_DESDE_ADMIN_ERROR,
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
        cargandoHabilitarInhabilitar: false,
        cargandoEliminarImagenPorAdmin: false,
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

    const habilitarInhabilitarImagenPorUsuario = async ( image_id, datos ) => {
        try {
            dispatch({
                type: HABILITAR_INHABILITAR_IMAGEN_CARGANDO,
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
                    const respuesta = await clienteAxios.put(`/api/images/user/image/isEnabled/${image_id}`, datos)
                    Swal.fire({
                        icon: 'success',
                        title: 'Modificación exitosa',
                        text: "La propiedad se cambió exitosamente",
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: HABILITAR_INHABILITAR_IMAGEN,
                        })
                    }, 1000);
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('No se modificó la imagen', '', 'info')
                    dispatch({
                        type: HABILITAR_INHABILITAR_IMAGEN,
                    })
                }
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: HABILITAR_INHABILITAR_IMAGEN_ERROR,
                payload: error
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo modificar la propiedad, inténtelo nuevamente!',
            })
        }
    }

    const eliminarImagenPorUsuarioDesdeAdmin = async ( image_id ) => {
        try {
            dispatch({
                type: ELIMINAR_IMAGEN_DESDE_ADMIN_CARGANDO,
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
                title: 'Al eliminarla, también eliminará sus asociaciones a esa imagen',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: `Eliminar`,
                allowOutsideClick: false,
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                    const respuesta = await clienteAxios.delete(`/api/images/user/image/${image_id}`)
                    Swal.fire({
                        icon: 'success',
                        title: 'Proceso exitoso',
                        text: "La imagen se eliminó exitosamente",
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: ELIMINAR_IMAGEN_DESDE_ADMIN,
                        })
                    }, 1000);
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('No se eliminó la imagen', '', 'info')
                    dispatch({
                        type: ELIMINAR_IMAGEN_DESDE_ADMIN,
                    })
                }
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: ELIMINAR_IMAGEN_DESDE_ADMIN_ERROR,
                payload: error
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo eliminar la imagen, inténtelo nuevamente!',
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
                cargandoHabilitarInhabilitar: state.cargandoHabilitarInhabilitar,
                cargandoEliminarImagenPorAdmin: state.cargandoEliminarImagenPorAdmin,
                obtenerImagenes,
                guardarImagen,
                traerImagenesPorUsuario,
                eliminarImagen,
                modificarImagen,
                habilitarInhabilitarImagenPorUsuario,
                eliminarImagenPorUsuarioDesdeAdmin,
            }}
        >
            {props.children}
        </imageContext.Provider>
    )
}

export default ImageState;