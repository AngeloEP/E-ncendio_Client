import {
    OBTENER_PALABRAS,
    OBTENER_PALABRAS_ERROR,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_PALABRAS:
            return {
                ...state,
                palabras: action.payload,
                largoPalabras: action.payload.length
            }

        case OBTENER_PALABRAS_ERROR:
            return {
                ...state,
                errores: action.payload
            }
    
        default:
            return state;
    }
}