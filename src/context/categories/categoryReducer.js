import {
    OBTENER_CATEGORIAS,
    OBTENER_CATEGORIAS_ERROR
} from '../../types';

const categoryReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_CATEGORIAS:
            return {
                ...state,
                categorias: action.payload,
            }

        case OBTENER_CATEGORIAS_ERROR:
            return {
                ...state,
                errores: action.payload
            }
    
        default:
            return state;
    }
}

export default categoryReducer;