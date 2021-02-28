import {
    ETIQUETAR_IMAGEN,
    ETIQUETAR_IMAGEN_ERROR,
    ETIQUETAR_PALABRA,
    ETIQUETAR_PALABRA_ERROR
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case ETIQUETAR_PALABRA:
        case ETIQUETAR_IMAGEN:
            return {
                ...state,
            }

        case ETIQUETAR_PALABRA_ERROR:
        case ETIQUETAR_IMAGEN_ERROR:
            return {
                ...state,
                errores: action.payload
            }
    
        default:
            return state;
    }
}