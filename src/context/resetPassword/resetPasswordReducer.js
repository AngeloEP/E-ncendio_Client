import {
    VALIDAR_EMAIL_RESET_PASSWORD,
    VALIDAR_EMAIL_RESET_PASSWORD_CARGANDO,
    VALIDAR_EMAIL_RESET_PASSWORD_ERROR,
    VALIDAR_PASSWORD_RESET_PASSWORD,
    VALIDAR_PASSWORD_RESET_PASSWORD_CARGANDO,
    VALIDAR_PASSWORD_RESET_PASSWORD_ERROR
} from '../../types';

const resetPasswordReducer = (state, action) => {
    switch (action.type) {

        case VALIDAR_PASSWORD_RESET_PASSWORD_ERROR:
        case VALIDAR_EMAIL_RESET_PASSWORD_ERROR:
            return {
                ...state,
                cargandoEnviarCodigo: false,
                cargandoResetearContraseña: false,
            }

        case VALIDAR_EMAIL_RESET_PASSWORD:
            return {
                ...state,
                correoUsuario: action.payload.correo,
                code: action.payload.codigo,
                cargandoEnviarCodigo: false,
            }

        case VALIDAR_EMAIL_RESET_PASSWORD_CARGANDO:
            return {
                ...state,
                cargandoEnviarCodigo: action.payload,
            }

        case VALIDAR_PASSWORD_RESET_PASSWORD:
            return {
                ...state,
                correoUsuario: "",
                code: "",
                cargandoResetearContraseña: false,
            }

        case VALIDAR_PASSWORD_RESET_PASSWORD_CARGANDO:
            return {
                ...state,
                cargandoResetearContraseña: action.payload,
            }

        default:
            return state;
    }
}

export default resetPasswordReducer;