import {
    OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES,
    OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_CARGANDO,
    OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_ERROR,
    OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN,
    OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_CARGANDO,
    OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_ERROR,
    OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS,
    OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_CARGANDO,
    OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_ERROR,
    OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA,
    OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_CARGANDO,
    OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_ERROR,
    OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES,
    OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES_CARGANDO,
    OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES_ERROR,
    OBTENER_CSV,
    OBTENER_CSV_CARGANDO,
    OBTENER_CSV_ERROR,
} from '../../types';

const analyticsReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_CSV_ERROR:
        case OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES_ERROR:
        case OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_ERROR:
        case OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_ERROR:
        case OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_ERROR:
        case OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_ERROR:
            return {
                ...state,
                errores: action.payload,
                cargandoDistribucionCategorias: false,
                cargandoDistribucionCategoriasPalabras: false,
                cargandoDistribucionCategoriasPorImagen: false,
                cargandoDistribucionCategoriasPorPalabra: false,
                cargandoDistribucionUsoFuncionalidades: false,
                cargandoPrimerCSV: false,
            }

        case OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES:
            return {
                ...state,
                distribucionCategoriasImagenes: action.payload,
                cargandoDistribucionCategorias: false
            }
    
        case OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_CARGANDO:
            return {
                ...state,
                cargandoDistribucionCategorias: true
            }

        case OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN:
            return {
                ...state,
                distribucionCategoriasPorImagen: action.payload,
                cargandoDistribucionCategoriasPorImagen: false
            }
    
        case OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_CARGANDO:
            return {
                ...state,
                cargandoDistribucionCategoriasPorImagen: true
            }

        case OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS:
            return {
                ...state,
                distribucionCategoriasPalabras: action.payload,
                cargandoDistribucionCategoriasPalabras: false
            }
    
        case OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_CARGANDO:
            return {
                ...state,
                cargandoDistribucionCategoriasPalabras: true
            }

        case OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA:
            return {
                ...state,
                distribucionCategoriasPorPalabra: action.payload,
                cargandoDistribucionCategoriasPorPalabra: false
            }
    
        case OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_CARGANDO:
            return {
                ...state,
                cargandoDistribucionCategoriasPorPalabra: true
            }

        case OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES:
            return {
                ...state,
                distribucionUsoFuncionalidades: action.payload,
                cargandoDistribucionUsoFuncionalidades: false
            }
    
        case OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES_CARGANDO:
            return {
                ...state,
                cargandoDistribucionUsoFuncionalidades: true
            }

        case OBTENER_CSV_CARGANDO:
            return {
                ...state,
                cargandoPrimerCSV: true
            }

        case OBTENER_CSV:
            return {
                ...state,
                dataPrimerCSV: action.payload
            }

        default:
            return state;
    }
}

export default analyticsReducer;