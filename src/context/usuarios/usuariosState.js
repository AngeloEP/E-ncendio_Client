import React, { useReducer } from 'react';
import usuariosContext from './usuariosContext';
import usuariosReducer from './usuariosReducer';

import Swal from 'sweetalert2';


import {
    OBTENER_DISTRIBUCION_EDADES_USUARIOS,
    OBTENER_DISTRIBUCION_EDADES_USUARIOS_ERROR,
    OBTENER_USUARIOS,
    OBTENER_USUARIOS_ERROR,
    MODIFICAR_USUARIO_ADMIN_BLOQUEO,
    MODIFICAR_USUARIO_ADMIN_BLOQUEO_CARGANDO,
    MODIFICAR_USUARIO_ADMIN_BLOQUEO_ERROR,
    OBTENER_IMAGENES_POR_USUARIO_ADMIN,
    OBTENER_IMAGENES_POR_USUARIO_ADMIN_ERROR,
    OBTENER_PALABRAS_POR_USUARIO_ADMIN,
    OBTENER_PALABRAS_POR_USUARIO_ADMIN_ERROR,
    OBTENER_IMAGENES_POR_USUARIO_ADMIN_CARGANDO,
    OBTENER_PALABRAS_POR_USUARIO_ADMIN_CARGANDO,
    HABILITAR_INHABILITAR_IMAGEN,
    HABILITAR_INHABILITAR_IMAGEN_CARGANDO,
    HABILITAR_INHABILITAR_IMAGEN_ERROR,
    ELIMINAR_IMAGEN_DESDE_ADMIN,
    ELIMINAR_IMAGEN_DESDE_ADMIN_CARGANDO,
    ELIMINAR_IMAGEN_DESDE_ADMIN_ERROR,
    HABILITAR_INHABILITAR_PALABRA,
    HABILITAR_INHABILITAR_PALABRA_CARGANDO,
    HABILITAR_INHABILITAR_PALABRA_ERROR,
    ELIMINAR_PALABRA_DESDE_ADMIN,
    ELIMINAR_PALABRA_DESDE_ADMIN_CARGANDO,
    ELIMINAR_PALABRA_DESDE_ADMIN_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const UsuariosState = props => {
    const initialState = {
        usuarios: [],
        distribucion: [],
        errores: [],
        mensajeUsuarios: null,
        cargandoAdminYBloqueo: false,
        cargandoImagenesUsuarioDesdeAdmin: false,
        cargandoPalabrasUsuarioDesdeAdmin: false,
        imagenesPorUsuario: [],
        palabrasPorUsuario: [],
        cargandoHabilitarInhabilitarImagen: false,
        cargandoEliminarImagenPorAdmin: false,
        cargandoHabilitarInhabilitarPalabra: false,
        cargandoEliminarPalabraPorAdmin: false,
    }

    const [ state, dispatch ] = useReducer(usuariosReducer, initialState)

    const obtenerDistribucionEdadesUsuarios = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/usuarios/rangeAge')
            dispatch({
                type: OBTENER_DISTRIBUCION_EDADES_USUARIOS,
                payload: respuesta.data
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_DISTRIBUCION_EDADES_USUARIOS_ERROR,
                payload: error
            })
        }
    }

    const obtenerTodosLosUsuarios = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/usuarios')
            dispatch({
                type: OBTENER_USUARIOS,
                payload: respuesta.data.usuarios
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_USUARIOS_ERROR,
                payload: error
            })
        }
    }

    const modificarAdminYBloqueo = async (user_id, data) => {
        try {
            dispatch({
                type: MODIFICAR_USUARIO_ADMIN_BLOQUEO_CARGANDO,
                payload: true
            })
            const respuesta = await clienteAxios.put(`/api/usuarios/${user_id}/adminYbloqueo`, data)

            Swal.fire({
                icon: 'success',
                title: 'Modificación exitosa',
                text: respuesta.data.msg,
            })
            setTimeout(() => {
                dispatch({
                    type: MODIFICAR_USUARIO_ADMIN_BLOQUEO,
                    payload: respuesta.data.msg
                })
            }, 1000);

        } catch (error) {
            console.log(error.response.data)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: MODIFICAR_USUARIO_ADMIN_BLOQUEO_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'No se pudo modificar su usuario, inténtelo nuevamente!',
            })

            
            
        }
    }

    const obtenerImagenesUsuarioAdmin = async (user_id) => {
        try {
            dispatch({
                type: OBTENER_IMAGENES_POR_USUARIO_ADMIN_CARGANDO,
            })
            const respuesta = await clienteAxios.get(`/api/usuarios/${user_id}/images`)
            dispatch({
                type: OBTENER_IMAGENES_POR_USUARIO_ADMIN,
                payload: respuesta.data.imagenes
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_IMAGENES_POR_USUARIO_ADMIN_ERROR,
                payload: error
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
                            payload: respuesta.data.imagenAntigua
                        })
                    }, 1000);
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('No se modificó la imagen', '', 'info')
                    dispatch({
                        type: HABILITAR_INHABILITAR_IMAGEN_ERROR,
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
                            payload: image_id
                        })
                    }, 1000);
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('No se eliminó la imagen', '', 'info')
                    dispatch({
                        type: ELIMINAR_IMAGEN_DESDE_ADMIN_ERROR,
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

    const obtenerPalabrasUsuarioAdmin = async (user_id) => {
        try {
            dispatch({
                type: OBTENER_PALABRAS_POR_USUARIO_ADMIN_CARGANDO,
            })
            const respuesta = await clienteAxios.get(`/api/usuarios/${user_id}/words`)
            dispatch({
                type: OBTENER_PALABRAS_POR_USUARIO_ADMIN,
                payload: respuesta.data.palabras
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_PALABRAS_POR_USUARIO_ADMIN_ERROR,
                payload: error
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
                    console.log(respuesta.data.palabraAntigua)
                    Swal.fire({
                        icon: 'success',
                        title: 'Modificación exitosa',
                        text: "La propiedad se cambió exitosamente",
                    })
                    
                    setTimeout(() => {
                        dispatch({
                            type: HABILITAR_INHABILITAR_PALABRA,
                            payload: respuesta.data.palabraAntigua
                        })
                    }, 1000);
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('No se modificó la palabra', '', 'info')
                    dispatch({
                        type: HABILITAR_INHABILITAR_PALABRA_ERROR,
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
                            payload: word_id
                        })
                    }, 1000);
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('No se eliminó la palabra', '', 'info')
                    dispatch({
                        type: ELIMINAR_PALABRA_DESDE_ADMIN_ERROR,
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
        <usuariosContext.Provider
            value={{
                usuarios: state.usuarios,
                distribucion: state.distribucion,
                mensajeUsuarios: state.mensajeUsuarios,
                cargandoAdminYBloqueo: state.cargandoAdminYBloqueo,
                imagenesPorUsuario: state.imagenesPorUsuario,
                cargandoImagenesUsuarioDesdeAdmin: state.cargandoImagenesUsuarioDesdeAdmin,
                palabrasPorUsuario: state.palabrasPorUsuario,
                cargandoPalabrasUsuarioDesdeAdmin: state.cargandoPalabrasUsuarioDesdeAdmin,
                cargandoHabilitarInhabilitarImagen: state.cargandoHabilitarInhabilitarImagen,
                cargandoEliminarImagenPorAdmin: state.cargandoEliminarImagenPorAdmin,
                cargandoHabilitarInhabilitarPalabra: state.cargandoHabilitarInhabilitarPalabra,
                cargandoEliminarPalabraPorAdmin: state.cargandoEliminarPalabraPorAdmin,
                obtenerDistribucionEdadesUsuarios,
                obtenerTodosLosUsuarios,
                modificarAdminYBloqueo,
                obtenerImagenesUsuarioAdmin,
                obtenerPalabrasUsuarioAdmin,
                habilitarInhabilitarImagenPorUsuario,
                eliminarImagenPorUsuarioDesdeAdmin,
                habilitarInhabilitarPalabraPorUsuario,
                eliminarPalabraPorUsuarioDesdeAdmin,
            }}
        >
            {props.children}
        </usuariosContext.Provider>
    )
}

export default UsuariosState;