import {
    OBTENER_IMAGENES,
    OBTENER_IMAGENES_ERROR
} from '../../types/';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_IMAGENES:
            return {
                ...state,
                imagenes: action.payload
            }

        case OBTENER_IMAGENES_ERROR:
            return {
                ...state,
                errores: action.payload
            }
    
        default:
            return state;
    }
}