import {
    OBTENER_TIPS,
    OBTENER_TIPS_ERROR,
    OBTENER_TIPS_POR_USUARIO,
    OBTENER_TIPS_POR_USUARIO_ERROR,
    GUARDAR_TIP,
    GUARDAR_TIP_CARGANDO,
    GUARDAR_TIP_ERROR,
    MODIFICAR_TIP,
    MODIFICAR_TIP_CARGANDO,
    MODIFICAR_TIP_ERROR,
    ELIMINAR_TIP,
    ELIMINAR_TIP_CARGANDO,
    ELIMINAR_TIP_ERROR,
    ELIMINAR_RECOMPENSAS_SUBIR_TIP,
    ELIMINAR_RECOMPENSAS_SUBIR_TIP_TAREA,
} from '../../types';

const tipReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_TIPS:
            return {
                ...state,
                tips: action.payload,
                largoTips: action.payload.length
            }

        case MODIFICAR_TIP_ERROR:
        case ELIMINAR_TIP_ERROR:
        case GUARDAR_TIP_ERROR:
        case OBTENER_TIPS_POR_USUARIO_ERROR:
        case OBTENER_TIPS_ERROR:
            return {
                ...state,
                errores: action.payload,
                cargandoSubirTip: false,
                cargandoEliminarTip: false,
                cargandoModificarTip: false,
            }
    
        case GUARDAR_TIP_CARGANDO:
            return {
                ...state,
                cargandoSubirTip: true
            }

        case GUARDAR_TIP:
            return {
                ...state,
                tip: action.payload.tip,
                recompensasSubirTip: action.payload.reward,
                recompensasTareasSubirTip: action.payload.rewardTasks,
                cargandoSubirTip: false
            }

        case OBTENER_TIPS_POR_USUARIO:
            return {
                ...state,
                tips: action.payload
            }
            
        case ELIMINAR_TIP_CARGANDO:
            return {
                ...state,
                cargandoEliminarTip: true
            }

        case ELIMINAR_TIP:
            return {
                ...state,
                tip: action.payload,
                cargandoEliminarTip: false
            }

        case MODIFICAR_TIP_CARGANDO:
            return {
                ...state,
                cargandoModificarTip: true
            }

        case MODIFICAR_TIP:
            return {
                ...state,
                tips: state.tips.map(tip => tip._id ===
                    action.payload._id ? tip : action.payload ),
                cargandoModificarTip: false
            }

        case ELIMINAR_RECOMPENSAS_SUBIR_TIP:
            return {
                ...state,
                recompensasSubirTip: null
            }

        case ELIMINAR_RECOMPENSAS_SUBIR_TIP_TAREA:
            return {
                ...state,
                recompensasTareasSubirTip: null
            }

        default:
            return state;
    }
}

export default tipReducer;