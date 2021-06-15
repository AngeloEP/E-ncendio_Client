import {
    OBTENER_NIVEL_IMAGENES_USUARIO,
    OBTENER_NIVEL_IMAGENES_USUARIO_ERROR
} from '../../types';

const levelReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_NIVEL_IMAGENES_USUARIO:
            return {
                ...state,
                nivel: action.payload,
                loadingLevel: false
            }

        case OBTENER_NIVEL_IMAGENES_USUARIO_ERROR:
            return {
                ...state,
                errores: action.payload,
                loadingLevel: false
            }
    
        default:
            return state;
    }
}

export default levelReducer;