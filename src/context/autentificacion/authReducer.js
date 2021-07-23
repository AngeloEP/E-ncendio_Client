import {
    REGISTRO_EXITOSO_CARGANDO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    MODIFICAR_USUARIO_CARGANDO,
    MODIFICAR_USUARIO,
    MODIFICAR_USUARIO_ERROR,
    MODIFICAR_USUARIO_SALIR,
    ELIMINAR_RECOMPENSAS_LOGIN,
    ELIMINAR_RECOMPENSAS_MODIFICAR_PERFIL,
    ELIMINAR_RECOMPENSAS_MODIFICAR_PERFIL_TAREA,
} from '../../types/';

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTRO_EXITOSO_CARGANDO:
            return {
                ...state,
                cargandoRegistroUsuario: true
            }

        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false,
                recompensas: action.payload.reward,
                recompensasTareas: action.payload.rewardTasks,
                cargandoRegistroUsuario: false
            }
        
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: false,
                mensaje: action.payload,
                cargando: false,
                cargandoRegistroUsuario: false
            }

        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }

        case MODIFICAR_USUARIO_CARGANDO:
            return {
                ...state,
                cargandoModificacionUsuario: true
            }

        case MODIFICAR_USUARIO:
            return {
                ...state,
                cargandoModificacionUsuario: false,
                mensaje: null,
                usuario: action.payload.usuarioAntiguo,
                recompensasModificarPerfil: action.payload.reward,
                recompensasTareas: action.payload.rewardTasks,
                modificacionUsuarioExitosa: true
            }

        case MODIFICAR_USUARIO_ERROR:
            return {
                ...state,
                cargandoModificacionUsuario: false,
                mensaje: action.payload,
                modificacionUsuarioExitosa: false
            }

        case MODIFICAR_USUARIO_SALIR:
            return {
                ...state,
                modificacionUsuarioExitosa: false
            }

        case ELIMINAR_RECOMPENSAS_LOGIN:
            return {
                ...state,
                recompensas: null
            }

        case ELIMINAR_RECOMPENSAS_MODIFICAR_PERFIL:
            return {
                ...state,
                recompensasModificarPerfil: null
            }

        case ELIMINAR_RECOMPENSAS_MODIFICAR_PERFIL_TAREA:
            return {
                ...state,
                recompensasTareas: null,
            }

        default:
            return state;
    }
}

export default authReducer;