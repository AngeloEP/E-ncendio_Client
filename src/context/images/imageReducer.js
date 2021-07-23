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
    ELIMINAR_RECOMPENSAS_SUBIR_IMAGEN,
    ELIMINAR_RECOMPENSAS_SUBIR_IMAGEN_TAREA,
} from '../../types';

const imageReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_IMAGENES:
            return {
                ...state,
                imagenes: action.payload,
                largoImagenes: action.payload.length
            }

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
                imagen: action.payload.imagen,
                recompensasSubirImagen: action.payload.reward,
                recompensasTareasSubirImagen: action.payload.rewardTasks,
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
    
        case ELIMINAR_RECOMPENSAS_SUBIR_IMAGEN:
            return {
                ...state,
                recompensasSubirImagen: null
            }

        case ELIMINAR_RECOMPENSAS_SUBIR_IMAGEN_TAREA:
            return {
                ...state,
                recompensasTareasSubirImagen: null
            }

        default:
            return state;
    }
}

export default imageReducer;