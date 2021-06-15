import {
    OBTENER_DISTRIBUCION_LIGAS,
    OBTENER_DISTRIBUCION_LIGAS_ERROR,
} from '../../types';

const leagueReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_DISTRIBUCION_LIGAS:
            return {
                ...state,
                ligas: action.payload,
            }

        case OBTENER_DISTRIBUCION_LIGAS_ERROR:
            return {
                ...state,
                errores: action.payload
            }
    
        default:
            return state;
    }
}

export default leagueReducer;