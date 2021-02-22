import {
    OBTENER_PERFIL_USUARIO,
    OBTENER_PERFIL_USUARIO_ERROR,
    ACTUALIZAR_PERFIL,
    ACTUALIZAR_PERFIL_ERROR
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case ACTUALIZAR_PERFIL:
        case OBTENER_PERFIL_USUARIO:
            return {
                ...state,
                perfil: action.payload,
                loading: false
            }

        case ACTUALIZAR_PERFIL_ERROR:
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