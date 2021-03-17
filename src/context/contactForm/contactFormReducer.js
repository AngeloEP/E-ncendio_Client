import {
    ENVIAR_FORMULARIO_DE_CONTACTO,
    ENVIAR_FORMULARIO_DE_CONTACTO_CARGANDO,
    ENVIAR_FORMULARIO_DE_CONTACTO_ERROR
} from '../../types/';

export default (state, action) => {
    switch (action.type) {
        case ENVIAR_FORMULARIO_DE_CONTACTO:
            return {
                ...state,
                mensaje: null,
                cargandoEnvioCorreo: false,
            }

        case ENVIAR_FORMULARIO_DE_CONTACTO_ERROR:
            return {
                ...state,
                mensaje: action.payload,
                cargandoEnvioCorreo: false,
            }

        case ENVIAR_FORMULARIO_DE_CONTACTO_CARGANDO:
            return {
                ...state,
                cargandoEnvioCorreo: action.payload,
            }

        default:
            return state;
    }
}