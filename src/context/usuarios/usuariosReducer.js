import {
    OBTENER_DISTRIBUCION_EDADES_USUARIOS,
    OBTENER_DISTRIBUCION_EDADES_USUARIOS_ERROR,
    OBTENER_USUARIOS,
    OBTENER_USUARIOS_ERROR,
    MODIFICAR_USUARIO_ADMIN_BLOQUEO_CARGANDO,
    MODIFICAR_USUARIO_ADMIN_BLOQUEO,
    MODIFICAR_USUARIO_ADMIN_BLOQUEO_ERROR,
    OBTENER_IMAGENES_POR_USUARIO_ADMIN,
    OBTENER_IMAGENES_POR_USUARIO_ADMIN_ERROR,
    OBTENER_PALABRAS_POR_USUARIO_ADMIN,
    OBTENER_IMAGENES_POR_USUARIO_ADMIN_CARGANDO,
    OBTENER_PALABRAS_POR_USUARIO_ADMIN_ERROR,
    OBTENER_PALABRAS_POR_USUARIO_ADMIN_CARGANDO,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_DISTRIBUCION_EDADES_USUARIOS:
            return {
                ...state,
                distribucion: action.payload,
            }

        case OBTENER_PALABRAS_POR_USUARIO_ADMIN_ERROR:
        case OBTENER_IMAGENES_POR_USUARIO_ADMIN_ERROR:
        case MODIFICAR_USUARIO_ADMIN_BLOQUEO_ERROR:
        case OBTENER_USUARIOS_ERROR:
        case OBTENER_DISTRIBUCION_EDADES_USUARIOS_ERROR:
            return {
                ...state,
                errores: action.payload,
                cargandoAdminYBloqueo: false,
                cargandoImagenesUsuarioDesdeAdmin: false,
                cargandoPalabrasUsuarioDesdeAdmin: false,
            }
    
        case OBTENER_USUARIOS:
            return {
                ...state,
                usuarios: action.payload,
            }

        case MODIFICAR_USUARIO_ADMIN_BLOQUEO_CARGANDO:
            return {
                ...state,
                cargandoAdminYBloqueo: true,
            }

        case MODIFICAR_USUARIO_ADMIN_BLOQUEO:
            return {
                ...state,
                mensajeUsuarios: action.payload,
                cargandoAdminYBloqueo: false,
            }

        case OBTENER_IMAGENES_POR_USUARIO_ADMIN_CARGANDO:
            return {
                ...state,
                cargandoImagenesUsuarioDesdeAdmin: true,
            }

        case OBTENER_IMAGENES_POR_USUARIO_ADMIN:
            return {
                ...state,
                imagenesPorUsuario: action.payload,
                cargandoImagenesUsuarioDesdeAdmin: false,
            }

        case OBTENER_PALABRAS_POR_USUARIO_ADMIN_CARGANDO:
            return {
                ...state,
                cargandoPalabrasUsuarioDesdeAdmin: true,
            }

        case OBTENER_PALABRAS_POR_USUARIO_ADMIN:
            return {
                ...state,
                palabrasPorUsuario: action.payload,
                cargandoPalabrasUsuarioDesdeAdmin: false,
            }

        default:
            return state;
    }
}