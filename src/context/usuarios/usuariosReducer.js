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
    HABILITAR_INHABILITAR_IMAGEN,
    HABILITAR_INHABILITAR_IMAGEN_CARGANDO,
    HABILITAR_INHABILITAR_IMAGEN_ERROR,
    ELIMINAR_IMAGEN_DESDE_ADMIN,
    ELIMINAR_IMAGEN_DESDE_ADMIN_CARGANDO,
    ELIMINAR_IMAGEN_DESDE_ADMIN_ERROR,
    HABILITAR_INHABILITAR_PALABRA,
    HABILITAR_INHABILITAR_PALABRA_CARGANDO,
    HABILITAR_INHABILITAR_PALABRA_ERROR,
    ELIMINAR_PALABRA_DESDE_ADMIN,
    ELIMINAR_PALABRA_DESDE_ADMIN_CARGANDO,
    ELIMINAR_PALABRA_DESDE_ADMIN_ERROR,
    MODIFICAR_DIFICULTAD_PUNTOS_IMAGEN,
    MODIFICAR_DIFICULTAD_PUNTOS_IMAGEN_CARGANDO,
    MODIFICAR_DIFICULTAD_PUNTOS_IMAGEN_ERROR,
    MODIFICAR_DIFICULTAD_PUNTOS_PALABRA,
    MODIFICAR_DIFICULTAD_PUNTOS_PALABRA_CARGANDO,
    MODIFICAR_DIFICULTAD_PUNTOS_PALABRA_ERROR,
    OBTENER_AHORCADOS_POR_USUARIO_ADMIN,
    OBTENER_AHORCADOS_POR_USUARIO_ADMIN_CARGANDO,
    OBTENER_AHORCADOS_POR_USUARIO_ADMIN_ERROR,
    HABILITAR_INHABILITAR_AHORCADO,
    HABILITAR_INHABILITAR_AHORCADO_CARGANDO,
    HABILITAR_INHABILITAR_AHORCADO_ERROR,
    ELIMINAR_AHORCADO_DESDE_ADMIN,
    ELIMINAR_AHORCADO_DESDE_ADMIN_CARGANDO,
    ELIMINAR_AHORCADO_DESDE_ADMIN_ERROR,
    MODIFICAR_DIFICULTAD_PUNTOS_AHORCADO,
    MODIFICAR_DIFICULTAD_PUNTOS_AHORCADO_CARGANDO,
    MODIFICAR_DIFICULTAD_PUNTOS_AHORCADO_ERROR,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_DISTRIBUCION_EDADES_USUARIOS:
            return {
                ...state,
                distribucion: action.payload,
            }

        case MODIFICAR_DIFICULTAD_PUNTOS_AHORCADO_ERROR:
        case HABILITAR_INHABILITAR_AHORCADO_ERROR:
        case ELIMINAR_AHORCADO_DESDE_ADMIN_ERROR:
        case OBTENER_AHORCADOS_POR_USUARIO_ADMIN_ERROR:
        case MODIFICAR_DIFICULTAD_PUNTOS_PALABRA_ERROR:
        case HABILITAR_INHABILITAR_PALABRA_ERROR:
        case ELIMINAR_PALABRA_DESDE_ADMIN_ERROR:
        case OBTENER_PALABRAS_POR_USUARIO_ADMIN_ERROR:
        case MODIFICAR_DIFICULTAD_PUNTOS_IMAGEN_ERROR:
        case ELIMINAR_IMAGEN_DESDE_ADMIN_ERROR:
        case HABILITAR_INHABILITAR_IMAGEN_ERROR:
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
                cargandoHabilitarInhabilitarImagen: false,
                cargandoEliminarImagenPorAdmin: false,
                cargandoHabilitarInhabilitarPalabra: false,
                cargandoEliminarPalabraPorAdmin: false,
                cargandoModificarDificultadPuntosImagenPorAdmin: false,
                cargandoModificarDificultadPuntosPalabraPorAdmin: false,
                cargandoAhorcadosUsuarioDesdeAdmin: false,
                cargandoHabilitarInhabilitarAhorcado: false,
                cargandoEliminarAhorcadoPorAdmin: false,
                cargandoModificarDificultadPuntosAhorcadoPorAdmin: false,        
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

        case OBTENER_AHORCADOS_POR_USUARIO_ADMIN_CARGANDO:
            return {
                ...state,
                cargandoAhorcadosUsuarioDesdeAdmin: true,
            }

        case OBTENER_AHORCADOS_POR_USUARIO_ADMIN:
            return {
                ...state,
                ahorcadosPorUsuario: action.payload,
                cargandoAhorcadosUsuarioDesdeAdmin: false,
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

        case HABILITAR_INHABILITAR_IMAGEN_CARGANDO:
            return {
                ...state,
                cargandoHabilitarInhabilitarImagen: true
            }

        case HABILITAR_INHABILITAR_IMAGEN:
            // const index = state.imagenesPorUsuario.findIndex(imagen => imagen._id === action.payload[0]._id);
            // const newArray = [...state.imagenesPorUsuario];
            // newArray[index] = action.payload[0]
            return {
                ...state,
                // imagenesPorUsuario: newArray,
                imagenesPorUsuario: state.imagenesPorUsuario.map(imagen => imagen._id ===
                    action.payload[0]._id ? action.payload[0] : imagen ),
                cargandoHabilitarInhabilitarImagen: false
            }

        case HABILITAR_INHABILITAR_AHORCADO_CARGANDO:
            return {
                ...state,
                cargandoHabilitarInhabilitarAhorcado: true
            }

        case HABILITAR_INHABILITAR_AHORCADO:
            return {
                ...state,
                ahorcadosPorUsuario: state.ahorcadosPorUsuario.map(ahorcado => ahorcado._id ===
                    action.payload[0]._id ? action.payload[0] : ahorcado ),
                cargandoHabilitarInhabilitarAhorcado: false
            }

        case ELIMINAR_IMAGEN_DESDE_ADMIN_CARGANDO:
            return {
                ...state,
                cargandoEliminarImagenPorAdmin: true
            }

        case ELIMINAR_IMAGEN_DESDE_ADMIN:
            return {
                ...state,
                imagenesPorUsuario: state.imagenesPorUsuario.filter(
                    imagen => imagen._id !== action.payload
                    ),
                cargandoEliminarImagenPorAdmin: false
            }

        case ELIMINAR_AHORCADO_DESDE_ADMIN_CARGANDO:
            return {
                ...state,
                cargandoEliminarAhorcadoPorAdmin: true
            }

        case ELIMINAR_AHORCADO_DESDE_ADMIN:
            return {
                ...state,
                ahorcadosPorUsuario: state.ahorcadosPorUsuario.filter(
                    ahorcado => ahorcado._id !== action.payload
                    ),
                cargandoEliminarAhorcadoPorAdmin: false
            }

        case HABILITAR_INHABILITAR_PALABRA_CARGANDO:
            return {
                ...state,
                cargandoHabilitarInhabilitarPalabra: true
            }

        case HABILITAR_INHABILITAR_PALABRA:
            return {
                ...state,
                palabrasPorUsuario: state.palabrasPorUsuario.map(palabra => palabra._id ===
                    action.payload[0]._id ? action.payload[0] : palabra ),
                cargandoHabilitarInhabilitarPalabra: false
            }

        case ELIMINAR_PALABRA_DESDE_ADMIN_CARGANDO:
            return {
                ...state,
                cargandoEliminarPalabraPorAdmin: true
            }

        case ELIMINAR_PALABRA_DESDE_ADMIN:
            return {
                ...state,
                palabrasPorUsuario: state.palabrasPorUsuario.filter(
                    palabra => palabra._id !== action.payload
                    ),
                cargandoEliminarPalabraPorAdmin: false
            }

        case MODIFICAR_DIFICULTAD_PUNTOS_IMAGEN_CARGANDO:
            return {
                ...state,
                cargandoModificarDificultadPuntosImagenPorAdmin: true
            }

        case MODIFICAR_DIFICULTAD_PUNTOS_IMAGEN:
            return {
                ...state,
                imagenesPorUsuario: state.imagenesPorUsuario.map(imagen => imagen._id ===
                    action.payload[0]._id ? action.payload[0] : imagen ),
                cargandoModificarDificultadPuntosImagenPorAdmin: false
            }

        case MODIFICAR_DIFICULTAD_PUNTOS_AHORCADO_CARGANDO:
            return {
                ...state,
                cargandoModificarDificultadPuntosAhorcadoPorAdmin: true
            }

        case MODIFICAR_DIFICULTAD_PUNTOS_AHORCADO:
            return {
                ...state,
                ahorcadosPorUsuario: state.ahorcadosPorUsuario.map(ahorcado => ahorcado._id ===
                    action.payload[0]._id ? action.payload[0] : ahorcado ),
                cargandoModificarDificultadPuntosAhorcadoPorAdmin: false
            }

        case MODIFICAR_DIFICULTAD_PUNTOS_PALABRA_CARGANDO:
            return {
                ...state,
                cargandoModificarDificultadPuntosPalabraPorAdmin: true
            }

        case MODIFICAR_DIFICULTAD_PUNTOS_PALABRA:
            return {
                ...state,
                palabrasPorUsuario: state.palabrasPorUsuario.map(palabra => palabra._id ===
                    action.payload[0]._id ? action.payload[0] : palabra ),
                cargandoModificarDificultadPuntosPalabraPorAdmin: false
            }

        default:
            return state;
    }
}