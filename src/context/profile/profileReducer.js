import {
    OBTENER_TODOS_LOS_PERFILES,
    OBTENER_TODOS_LOS_PERFILES_ERROR,
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

        case OBTENER_TODOS_LOS_PERFILES_ERROR:
        case ACTUALIZAR_PERFIL_ERROR:
        case OBTENER_PERFIL_USUARIO_ERROR:
            return {
                ...state,
                errores: action.payload,
                loading: false
            }
    
        case OBTENER_TODOS_LOS_PERFILES:
            return {
                ...state,
                perfiles: action.payload,
                loading: false
            }

        default:
            return state;
    }
}