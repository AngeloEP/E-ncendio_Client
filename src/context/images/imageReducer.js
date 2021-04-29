import {
    OBTENER_IMAGENES,
    OBTENER_IMAGENES_ERROR,
    GUARDAR_IMAGEN,
    GUARDAR_IMAGEN_CARGANDO,
    GUARDAR_IMAGEN_ERROR,
    OBTENER_IMAGENES_POR_USUARIO,
    OBTENER_IMAGENES_POR_USUARIO_ERROR,
    ELIMINAR_IMAGEN,
    ELIMINAR_IMAGEN_CARGANDO,
    ELIMINAR_IMAGEN_ERROR,
    MODIFICAR_IMAGEN,
    MODIFICAR_IMAGEN_CARGANDO,
    MODIFICAR_IMAGEN_ERROR,
    HABILITAR_INHABILITAR_IMAGEN,
    HABILITAR_INHABILITAR_IMAGEN_CARGANDO,
    HABILITAR_INHABILITAR_IMAGEN_ERROR,
    ELIMINAR_IMAGEN_DESDE_ADMIN,
    ELIMINAR_IMAGEN_DESDE_ADMIN_CARGANDO,
    ELIMINAR_IMAGEN_DESDE_ADMIN_ERROR,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_IMAGENES:
            return {
                ...state,
                imagenes: action.payload,
                largoImagenes: action.payload.length
            }

        case HABILITAR_INHABILITAR_IMAGEN_ERROR:
        case ELIMINAR_IMAGEN_DESDE_ADMIN_ERROR:
        case MODIFICAR_IMAGEN_ERROR:
        case ELIMINAR_IMAGEN_ERROR:
        case GUARDAR_IMAGEN_ERROR:
        case OBTENER_IMAGENES_POR_USUARIO_ERROR:
        case OBTENER_IMAGENES_ERROR:
            return {
                ...state,
                errores: action.payload,
                cargandoSubirImagen: false,
                cargandoEliminarImagen: false,
                cargandoModificarImagen: false,
                cargandoHabilitarInhabilitar: false,
                cargandoEliminarImagenPorAdmin: false,
            }

        case GUARDAR_IMAGEN_CARGANDO:
            return {
                ...state,
                cargandoSubirImagen: true
            }

        case GUARDAR_IMAGEN:
            return {
                ...state,
                imagen: action.payload,
                cargandoSubirImagen: false
            }

        case OBTENER_IMAGENES_POR_USUARIO:
            return {
                ...state,
                imagenes: action.payload
            }
            
        case ELIMINAR_IMAGEN_CARGANDO:
            return {
                ...state,
                cargandoEliminarImagen: true
            }

        case ELIMINAR_IMAGEN:
            return {
                ...state,
                imagen: action.payload,
                cargandoEliminarImagen: false
            }

        case MODIFICAR_IMAGEN_CARGANDO:
            return {
                ...state,
                cargandoModificarImagen: true
            }

        case MODIFICAR_IMAGEN:
            return {
                ...state,
                imagenes: state.imagenes.map(imagen => imagen._id ===
                    action.payload._id ? imagen : action.payload ),
                cargandoModificarImagen: false
            }

        case HABILITAR_INHABILITAR_IMAGEN_CARGANDO:
            return {
                ...state,
                cargandoHabilitarInhabilitar: true
            }

        case HABILITAR_INHABILITAR_IMAGEN:
            return {
                ...state,
                imagenes: state.imagenes.map(imagen => imagen._id ===
                    action.payload._id ? imagen : action.payload ),
                cargandoHabilitarInhabilitar: false
            }

        case ELIMINAR_IMAGEN_DESDE_ADMIN_CARGANDO:
            return {
                ...state,
                cargandoEliminarImagenPorAdmin: true
            }

        case ELIMINAR_IMAGEN_DESDE_ADMIN:
            return {
                ...state,
                cargandoEliminarImagenPorAdmin: false
            }
    
        default:
            return state;
    }
}