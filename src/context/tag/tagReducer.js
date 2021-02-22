import {
    ETIQUETAR_IMAGEN,
    ETIQUETAR_IMAGEN_ERROR,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case ETIQUETAR_IMAGEN:
            return {
                ...state,
            }

        case ETIQUETAR_IMAGEN_ERROR:
            return {
                ...state,
                errores: action.payload
            }
    
        default:
            return state;
    }
}