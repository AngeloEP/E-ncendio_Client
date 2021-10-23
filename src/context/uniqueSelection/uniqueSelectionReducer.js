import {
    OBTENER_SELECCIONES_UNICAS,
    OBTENER_SELECCIONES_UNICAS_ERROR,
    GUARDAR_SELECCION_UNICA,
    GUARDAR_SELECCION_UNICA_CARGANDO,
    GUARDAR_SELECCION_UNICA_ERROR,
    OBTENER_SELECCIONES_UNICAS_POR_USUARIO,
    OBTENER_SELECCIONES_UNICAS_POR_USUARIO_ERROR,
    ELIMINAR_SELECCION_UNICA,
    ELIMINAR_SELECCION_UNICA_CARGANDO,
    ELIMINAR_SELECCION_UNICA_ERROR,
    MODIFICAR_SELECCION_UNICA,
    MODIFICAR_SELECCION_UNICA_CARGANDO,
    MODIFICAR_SELECCION_UNICA_ERROR,
    ELIMINAR_RECOMPENSAS_SUBIR_SELECCION_UNICA,
    ELIMINAR_RECOMPENSAS_SUBIR_SELECCION_UNICA_TAREA,
} from '../../types';

const uniqueSelectionReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_SELECCIONES_UNICAS:
            return {
                ...state,
                seleccionesUnicas: action.payload,
                largoSeleccionesUnicas: action.payload.length
            }

        case MODIFICAR_SELECCION_UNICA_ERROR:
        case ELIMINAR_SELECCION_UNICA_ERROR:
        case GUARDAR_SELECCION_UNICA_ERROR:
        case OBTENER_SELECCIONES_UNICAS_POR_USUARIO_ERROR:
        case OBTENER_SELECCIONES_UNICAS_ERROR:
            return {
                ...state,
                errores: action.payload,
                cargandoSubirSeleccionUnica: false,
                cargandoEliminarSeleccionUnica: false,
                cargandoModificarSeleccionUnica: false,
            }

        case GUARDAR_SELECCION_UNICA_CARGANDO:
            return {
                ...state,
                cargandoSubirSeleccionUnica: true
            }

        case GUARDAR_SELECCION_UNICA:
            return {
                ...state,
                seleccionUnica: action.payload.uniqueSelection,
                recompensasSubirSeleccionUnica: action.payload.reward,
                recompensasTareasSubirSeleccionUnica: action.payload.rewardTasks,
                cargandoSubirSeleccionUnica: false
            }

        case OBTENER_SELECCIONES_UNICAS_POR_USUARIO:
            return {
                ...state,
                seleccionesUnicas: action.payload
            }
            
        case ELIMINAR_SELECCION_UNICA_CARGANDO:
            return {
                ...state,
                cargandoEliminarSeleccionUnica: true
            }

        case ELIMINAR_SELECCION_UNICA:
            return {
                ...state,
                seleccionesUnicas: state.seleccionesUnicas.filter(seleccionUnica => seleccionUnica._id !== action.payload ),
                cargandoEliminarSeleccionUnica: false
            }

        case MODIFICAR_SELECCION_UNICA_CARGANDO:
            return {
                ...state,
                cargandoModificarSeleccionUnica: true
            }

        case MODIFICAR_SELECCION_UNICA:
            return {
                ...state,
                seleccionesUnicas: state.seleccionesUnicas.map(seleccionUnica => seleccionUnica._id ===
                    action.payload._id ? seleccionUnica : action.payload ),
                cargandoModificarSeleccionUnica: false
            }

        case ELIMINAR_RECOMPENSAS_SUBIR_SELECCION_UNICA:
            return {
                ...state,
                recompensasSubirSeleccionUnica: null
            }

        case ELIMINAR_RECOMPENSAS_SUBIR_SELECCION_UNICA_TAREA:
            return {
                ...state,
                recompensasTareasSubirSeleccionUnica: null
            }
    
        default:
            return state;
    }
}

export default uniqueSelectionReducer;