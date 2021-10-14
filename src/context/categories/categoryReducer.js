import {
    OBTENER_CATEGORIAS,
    OBTENER_CATEGORIAS_ERROR,
    OBTENER_CATEGORIAS_VISIBLES,
    OBTENER_CATEGORIAS_VISIBLES_ERROR,
    GUARDAR_CATEGORIA,
    GUARDAR_CATEGORIA_CARGANDO,
    GUARDAR_CATEGORIA_ERROR,
    MODIFICAR_CATEGORIA,
    MODIFICAR_CATEGORIA_CARGANDO,
    MODIFICAR_CATEGORIA_ERROR,
} from '../../types';

const categoryReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_CATEGORIAS:
            return {
                ...state,
                categorias: action.payload,
            }

        case OBTENER_CATEGORIAS_VISIBLES:
            return {
                ...state,
                categoriasVisibles: action.payload,
            }

        case GUARDAR_CATEGORIA_ERROR:
        case MODIFICAR_CATEGORIA_ERROR:
        case OBTENER_CATEGORIAS_VISIBLES_ERROR:
        case OBTENER_CATEGORIAS_ERROR:
            return {
                ...state,
                errores: action.payload,
                cargandoModificarCategoria: false,
                cargandoSubirCategoria: false,
            }

        case GUARDAR_CATEGORIA_CARGANDO:
            return {
                ...state,
                cargandoSubirCategoria: true
            }

        case GUARDAR_CATEGORIA:
            return {
                ...state,
                categorias: [action.payload, ...state.categorias],
                cargandoSubirCategoria: false
            }

        case MODIFICAR_CATEGORIA_CARGANDO:
            return {
                ...state,
                cargandoModificarCategoria: true
            }

        case MODIFICAR_CATEGORIA:
            return {
                ...state,
                categorias: state.categorias.map(categoria => categoria._id ===
                    action.payload._id ? categoria : action.payload ),
                cargandoModificarCategoria: false
            }
    
        default:
            return state;
    }
}

export default categoryReducer;