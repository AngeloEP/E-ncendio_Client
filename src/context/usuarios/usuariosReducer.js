import {
    OBTENER_DISTRIBUCION_EDADES_USUARIOS,
    OBTENER_DISTRIBUCION_EDADES_USUARIOS_ERROR,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_DISTRIBUCION_EDADES_USUARIOS:
            return {
                ...state,
                distribucion: action.payload,
            }

        case OBTENER_DISTRIBUCION_EDADES_USUARIOS_ERROR:
            return {
                ...state,
                errores: action.payload
            }
    
        default:
            return state;
    }
}