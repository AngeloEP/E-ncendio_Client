import React, { useReducer } from 'react';
import storeContext from './storeContext';
import storeReducer from './storeReducer';
import Swal from 'sweetalert2';

import {
    OBTENER_PRODUCTOS_TIENDA,
    OBTENER_PRODUCTOS_TIENDA_ERROR,
    OBTENER_PRODUCTOS_USUARIO_TIENDA,
    OBTENER_PRODUCTOS_USUARIO_TIENDA_ERROR,
    COMPRAR_MARCO_TIENDA_CARGANDO,
    COMPRAR_MARCO_TIENDA_ERROR,
    COMPRAR_MARCO_TIENDA,
    COMPRAR_APODO_TIENDA_CARGANDO,
    COMPRAR_APODO_TIENDA_ERROR,
    COMPRAR_APODO_TIENDA,
} from '../../types';
import clienteAxios from '../../config/axios';

const StoreState = props => {
    const initialState = {
        marcos: [],
        apodos: [],
        marcosUsuario: [],
        apodosUsuario: [],
        errores: [],
        cargandoComprarMarco: false,
        cargandoComprarApodo: false,
    }

    const [ state, dispatch ] = useReducer(storeReducer, initialState)

    const obtenerProductosEnTienda = async () => {
        try {
            const respuesta = await clienteAxios.get(`/api/stores`)
            dispatch({
                type: OBTENER_PRODUCTOS_TIENDA,
                payload: respuesta.data
            })

        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_PRODUCTOS_TIENDA_ERROR,
                payload: error
            })
        }
    }

    const obtenerProductosUsuarioEnTienda = async () => {
        try {
            const respuesta = await clienteAxios.get(`/api/userBuyStores`)
            dispatch({
                type: OBTENER_PRODUCTOS_USUARIO_TIENDA,
                payload: respuesta.data
            })

        } catch (error) {
            // console.log(error)
            dispatch({
                type: OBTENER_PRODUCTOS_USUARIO_TIENDA_ERROR,
                payload: error
            })
        }
    }

    const comprarMarco = async (store_id) => {
        
            dispatch({
                type: COMPRAR_MARCO_TIENDA_CARGANDO,
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
                title: 'Confirmar compra de marco',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: `Comprar`,
                allowOutsideClick: false,
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                    try {
                        const respuesta = await clienteAxios.post(`/api/userBuyStores/buy/frame/${store_id}`)
                        Swal.fire({
                            icon: 'success',
                            title: 'Proceso exitoso',
                            text: "Su marco se compró exitosamente",
                        })
                        
                        setTimeout(() => {
                            dispatch({
                                type: COMPRAR_MARCO_TIENDA,
                                payload: respuesta.data
                            })
                        }, 1000);
                    } catch (error) {
                        dispatch({
                            type: COMPRAR_MARCO_TIENDA_ERROR,
                            payload: error
                        })
                        Swal.fire({
                            icon: 'error',
                            title: 'Lo sentimos',
                            text: error.response.data.msg ? error.response.data.msg : 'No se pudo comprar, inténtelo nuevamente!',
                        })
                    }
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('No se compró el marco', '', 'info')
                    dispatch({
                        type: COMPRAR_MARCO_TIENDA_ERROR,
                    })
                }
            })

        
    }

    const comprarApodo = async (store_id) => {
            dispatch({
                type: COMPRAR_APODO_TIENDA_CARGANDO,
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
                title: 'Confirmar compra de apodo',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: `Comprar`,
                allowOutsideClick: false,
            }).then(async (result) =>  {
                if (result.isConfirmed) {
                        try {
                            const respuesta = await clienteAxios.post(`/api/userBuyStores/buy/nickname/${store_id}`)
                            Swal.fire({
                                icon: 'success',
                                title: 'Proceso exitoso',
                                text: "Su apodo se compró exitosamente",
                            })
                            
                            setTimeout(() => {
                                dispatch({
                                    type: COMPRAR_APODO_TIENDA,
                                    payload: respuesta.data
                                })
                            }, 1000);
                        } catch (error) {
                            // console.log(error.response.data)
                            dispatch({
                                type: COMPRAR_APODO_TIENDA_ERROR,
                                payload: error
                            })
                            Swal.fire({
                                icon: 'error',
                                title: 'Lo sentimos',
                                text: error.response.data.msg ? error.response.data.msg : 'No se pudo comprar, inténtelo nuevamente!',
                            })
                        }
                    }
                    else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire('No se compró el apodo', '', 'info')
                        dispatch({
                            type: COMPRAR_APODO_TIENDA_ERROR,
                        })
                    }
            })

       
    }

    // const obtenerTodosLosPerfiles = async () => {
    //     try {
    //         const respuesta = await clienteAxios.get(`/api/profiles`)
    //         let newProfiles = respuesta.data.perfiles
    //         for (const [ index, ] of Object.entries(respuesta.data.perfiles) ) {
    //             newProfiles[index] = {
    //                 user_id: newProfiles[index].user_id._id,
    //                 Nombre: newProfiles[index].user_id.firstname,
    //                 Liga: newProfiles[index].league_id.league,
    //                 Edad: newProfiles[index].user_id.age,
    //                 Puntuación: newProfiles[index].score
    //             }
    //         }
    //         dispatch({
    //             type: OBTENER_TODOS_LOS_PERFILES,
    //             payload: newProfiles
    //         })

    //     } catch (error) {
    //         console.log(error)
    //         dispatch({
    //             type: OBTENER_TODOS_LOS_PERFILES_ERROR,
    //             payload: error
    //         })
    //     }
    // }

    return(
        <storeContext.Provider
            value={{
                marcos: state.marcos,
                apodos: state.apodos,
                marcosUsuario: state.marcosUsuario,
                apodosUsuario: state.apodosUsuario,
                errores: state.errores,
                cargandoComprarMarco: state.cargandoComprarMarco,
                cargandoComprarApodo: state.cargandoComprarApodo,
                obtenerProductosEnTienda,
                obtenerProductosUsuarioEnTienda,
                comprarMarco,
                comprarApodo,
            }}
        >
            { props.children }
        </storeContext.Provider>
    )
}

export default StoreState;