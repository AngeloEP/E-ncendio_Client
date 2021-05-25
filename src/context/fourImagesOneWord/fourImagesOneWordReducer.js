import {
    OBTENER_AHORCADOS,
    OBTENER_AHORCADOS_ERROR,
    GUARDAR_AHORCADO,
    GUARDAR_AHORCADO_CARGANDO,
    GUARDAR_AHORCADO_ERROR,
    OBTENER_AHORCADOS_POR_USUARIO,
    OBTENER_AHORCADOS_POR_USUARIO_ERROR,
    ELIMINAR_AHORCADO,
    ELIMINAR_AHORCADO_CARGANDO,
    ELIMINAR_AHORCADO_ERROR,
    MODIFICAR_AHORCADO,
    MODIFICAR_AHORCADO_CARGANDO,
    MODIFICAR_AHORCADO_ERROR,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_AHORCADOS:
            return {
                ...state,
                ahorcados: action.payload,
                largoAhorcados: action.payload.length
            }

        case MODIFICAR_AHORCADO_ERROR:
        case ELIMINAR_AHORCADO_ERROR:
        case GUARDAR_AHORCADO_ERROR:
        case OBTENER_AHORCADOS_POR_USUARIO_ERROR:
        case OBTENER_AHORCADOS_ERROR:
            return {
                ...state,
                errores: action.payload,
                cargandoSubirAhorcado: false,
                cargandoEliminarAhorcado: false,
                cargandoModificarAhorcado: false,
            }

        case GUARDAR_AHORCADO_CARGANDO:
            return {
                ...state,
                cargandoSubirAhorcado: true
            }

        case GUARDAR_AHORCADO:
            return {
                ...state,
                ahorcado: action.payload,
                cargandoSubirAhorcado: false
            }

        case OBTENER_AHORCADOS_POR_USUARIO:
            return {
                ...state,
                ahorcados: action.payload
            }
            
        case ELIMINAR_AHORCADO_CARGANDO:
            return {
                ...state,
                cargandoEliminarAhorcado: true
            }

        case ELIMINAR_AHORCADO:
            return {
                ...state,
                ahorcados: state.ahorcados.filter(ahorcado => ahorcado._id !== action.payload ),
                cargandoEliminarAhorcado: false
            }

        case MODIFICAR_AHORCADO_CARGANDO:
            return {
                ...state,
                cargandoModificarAhorcado: true
            }

        case MODIFICAR_AHORCADO:
            return {
                ...state,
                ahorcados: state.ahorcados.map(ahorcado => ahorcado._id ===
                    action.payload._id ? ahorcado : action.payload ),
                cargandoModificarAhorcado: false
            }
    
        default:
            return state;
    }
}