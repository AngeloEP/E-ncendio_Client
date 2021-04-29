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

export default (state, action) => {
    switch (action.type) {
        case OBTENER_PALABRAS:
            return {
                ...state,
                palabras: action.payload,
                largoPalabras: action.payload.length
            }

        case HABILITAR_INHABILITAR_PALABRA_ERROR:
        case ELIMINAR_PALABRA_DESDE_ADMIN_ERROR:
        case MODIFICAR_PALABRA_ERROR:
        case ELIMINAR_PALABRA_ERROR:
        case GUARDAR_PALABRA_ERROR:
        case OBTENER_PALABRAS_POR_USUARIO_ERROR:
        case OBTENER_PALABRAS_ERROR:
            return {
                ...state,
                errores: action.payload,
                cargandoSubirPalabra: false,
                cargandoEliminarPalabra: false,
                cargandoModificarPalabra: false,
            }
    
        case GUARDAR_PALABRA_CARGANDO:
            return {
                ...state,
                cargandoSubirPalabra: true
            }

        case GUARDAR_PALABRA:
            return {
                ...state,
                palabra: action.payload,
                cargandoSubirPalabra: false
            }

        case OBTENER_PALABRAS_POR_USUARIO:
            return {
                ...state,
                palabras: action.payload
            }
            
        case ELIMINAR_PALABRA_CARGANDO:
            return {
                ...state,
                cargandoEliminarPalabra: true
            }

        case ELIMINAR_PALABRA:
            return {
                ...state,
                palabra: action.payload,
                cargandoEliminarPalabra: false
            }

        case MODIFICAR_PALABRA_CARGANDO:
            return {
                ...state,
                cargandoModificarPalabra: true
            }

        case MODIFICAR_PALABRA:
            return {
                ...state,
                palabras: state.palabras.map(palabra => palabra._id ===
                    action.payload._id ? palabra : action.payload ),
                cargandoModificarPalabra: false
            }

        case HABILITAR_INHABILITAR_PALABRA_CARGANDO:
            return {
                ...state,
                cargandoHabilitarInhabilitarPalabra: true
            }

        case HABILITAR_INHABILITAR_PALABRA:
            return {
                ...state,
                cargandoHabilitarInhabilitarPalabra: false
            }

        case ELIMINAR_PALABRA_DESDE_ADMIN_CARGANDO:
            return {
                ...state,
                cargandoEliminarPalabraPorAdmin: true
            }

        case ELIMINAR_PALABRA_DESDE_ADMIN:
            return {
                ...state,
                cargandoEliminarPalabraPorAdmin: false
            }

        default:
            return state;
    }
}