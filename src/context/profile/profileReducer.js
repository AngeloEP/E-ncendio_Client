import {
    OBTENER_PERFIL_USUARIO,
    OBTENER_PERFIL_USUARIO_ERROR
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_PERFIL_USUARIO:
            return {
                ...state,
                perfil: action.payload,
                loading: false
            }

        case OBTENER_PERFIL_USUARIO_ERROR:
            return {
                ...state,
                errores: action.payload,
                loading: false
            }
    
        default:
            return state;
    }
}