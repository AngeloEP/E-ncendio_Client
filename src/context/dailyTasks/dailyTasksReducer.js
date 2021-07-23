import {
    OBTENER_TAREAS_DIARIAS_CARGANDO,
    OBTENER_TAREAS_DIARIAS_ERROR,
    OBTENER_TAREAS_DIARIAS,
} from '../../types/';

const dailyTasksReducer = (state, action) => {
    switch (action.type) {

        case OBTENER_TAREAS_DIARIAS_ERROR:
            return {
                ...state,
                cargandoTraerTareasDiarias: false
            }

        case OBTENER_TAREAS_DIARIAS_CARGANDO:
            return {
                ...state,
                cargandoTraerTareasDiarias: true
            }

        case OBTENER_TAREAS_DIARIAS:
            return {
                ...state,
                tareasDiarias: action.payload.tareas,
                cargandoTraerTareasDiarias: false
            }

        default:
            return state;
    }
}

export default dailyTasksReducer;