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

const storeReducer = (state, action) => {
    switch (action.type) {
        case COMPRAR_MARCO_TIENDA_ERROR:
        case COMPRAR_APODO_TIENDA_ERROR:
        case OBTENER_PRODUCTOS_USUARIO_TIENDA_ERROR:
        case OBTENER_PRODUCTOS_TIENDA_ERROR:
            return {
                ...state,
                errores: action.payload,
                cargandoComprarMarco: false,
                cargandoComprarApodo: false,
            }
        
        case OBTENER_PRODUCTOS_TIENDA:
            return {
                ...state,
                marcos: action.payload.marcos,
                apodos: action.payload.apodos,
            }

        case COMPRAR_MARCO_TIENDA_CARGANDO:
            return {
                ...state,
                cargandoComprarMarco: true,
            }

        case COMPRAR_APODO_TIENDA_CARGANDO:
            return {
                ...state,
                cargandoComprarApodo: true,
            }

        case COMPRAR_MARCO_TIENDA:
            return {
                ...state,
                marcosUsuario: [...state.marcosUsuario, action.payload.marcoComprado],
                cargandoComprarMarco: false,
            }
        
        case COMPRAR_APODO_TIENDA:
            return {
                ...state,
                apodosUsuario: [...state.apodosUsuario, action.payload.apodoComprado],
                cargandoComprarApodo: false,
            }

        case OBTENER_PRODUCTOS_USUARIO_TIENDA:
            return {
                ...state,
                marcosUsuario: action.payload.marcosUsuario,
                apodosUsuario: action.payload.apodosUsuario,
            }

        default:
            return state;
    }
}

export default storeReducer;