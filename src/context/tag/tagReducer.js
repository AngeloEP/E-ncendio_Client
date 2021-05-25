import {
    ETIQUETAR_IMAGEN,
    ETIQUETAR_IMAGEN_ERROR,
    ETIQUETAR_PALABRA,
    ETIQUETAR_PALABRA_ERROR,
    OBTENER_IMAGENES_ETIQUETADAS,
    OBTENER_IMAGENES_ETIQUETADAS_CARGANDO,
    OBTENER_IMAGENES_ETIQUETADAS_ERROR,
    OBTENER_PALABRAS_ETIQUETADAS,
    OBTENER_PALABRAS_ETIQUETADAS_CARGANDO,
    OBTENER_PALABRAS_ETIQUETADAS_ERROR,
    ELIMINAR_ETIQUETAS_PALABRAS,
    ELIMINAR_ETIQUETAS_PALABRAS_CARGANDO,
    ELIMINAR_ETIQUETAS_PALABRAS_ERROR,
    ELIMINAR_ETIQUETAS_IMAGENES,
    ELIMINAR_ETIQUETAS_IMAGENES_CARGANDO,
    ELIMINAR_ETIQUETAS_IMAGENES_ERROR,
    ETIQUETAR_AHORCADO,
    ETIQUETAR_AHORCADO_ERROR,
    OBTENER_AHORCADOS_ETIQUETADOS,
    OBTENER_AHORCADOS_ETIQUETADOS_CARGANDO,
    OBTENER_AHORCADOS_ETIQUETADOS_ERROR,
    ELIMINAR_ETIQUETAS_AHORCADOS,
    ELIMINAR_ETIQUETAS_AHORCADOS_CARGANDO,
    ELIMINAR_ETIQUETAS_AHORCADOS_ERROR,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case ETIQUETAR_PALABRA:
        case ETIQUETAR_IMAGEN:
        case ETIQUETAR_AHORCADO:
            return {
                ...state,
            }

        case ELIMINAR_ETIQUETAS_AHORCADOS_ERROR:
        case ELIMINAR_ETIQUETAS_IMAGENES_ERROR:
        case ELIMINAR_ETIQUETAS_PALABRAS_ERROR:
        case OBTENER_PALABRAS_ETIQUETADAS_ERROR:
        case OBTENER_IMAGENES_ETIQUETADAS_ERROR:
        case OBTENER_AHORCADOS_ETIQUETADOS_ERROR:
        case ETIQUETAR_PALABRA_ERROR:
        case ETIQUETAR_IMAGEN_ERROR:
        case ETIQUETAR_AHORCADO_ERROR:
            return {
                ...state,
                errores: action.payload,
                cargandoImagenesEtiquetadasUsuarioDesdeAdmin: false,
                cargandoPalabrasEtiquetadasUsuarioDesdeAdmin: false,
                cargandoResetearEtiquetasImagenes: false,
                cargandoResetearEtiquetasPalabras: false,
                cargandoAhorcadosEtiquetadosUsuarioDesdeAdmin: false,
                cargandoResetearEtiquetasAhorcados: false,
            }
    
        case OBTENER_IMAGENES_ETIQUETADAS:
            return {
                ...state,
                imagenesEtiquetadas: action.payload,
                cargandoImagenesEtiquetadasUsuarioDesdeAdmin: false,
            }

        case OBTENER_IMAGENES_ETIQUETADAS_CARGANDO:
            return {
                ...state,
                cargandoImagenesEtiquetadasUsuarioDesdeAdmin: true,
            }

        case OBTENER_PALABRAS_ETIQUETADAS:
            return {
                ...state,
                palabrasEtiquetadas: action.payload,
                cargandoPalabrasEtiquetadasUsuarioDesdeAdmin: false,
            }

        case OBTENER_PALABRAS_ETIQUETADAS_CARGANDO:
            return {
                ...state,
                cargandoPalabrasEtiquetadasUsuarioDesdeAdmin: true,
            }

        case OBTENER_AHORCADOS_ETIQUETADOS:
            return {
                ...state,
                ahorcadosEtiquetados: action.payload,
                cargandoAhorcadosEtiquetadosUsuarioDesdeAdmin: false,
            }

        case OBTENER_AHORCADOS_ETIQUETADOS_CARGANDO:
            return {
                ...state,
                cargandoAhorcadosEtiquetadosUsuarioDesdeAdmin: true,
            }

        case ELIMINAR_ETIQUETAS_PALABRAS:
            return {
                ...state,
                palabrasEtiquetadas: [],
                cargandoResetearEtiquetasPalabras: false,
            }

        case ELIMINAR_ETIQUETAS_PALABRAS_CARGANDO:
            return {
                ...state,
                cargandoResetearEtiquetasPalabras: action.payload
            }

        case ELIMINAR_ETIQUETAS_IMAGENES:
            return {
                ...state,
                imagenesEtiquetadas: [],
                cargandoResetearEtiquetasImagenes: false,
            }

        case ELIMINAR_ETIQUETAS_IMAGENES_CARGANDO:
            return {
                ...state,
                cargandoResetearEtiquetasImagenes: action.payload
            }

        case ELIMINAR_ETIQUETAS_AHORCADOS:
            return {
                ...state,
                ahorcadosEtiquetados: [],
                cargandoResetearEtiquetasAhorcados: false,
            }

        case ELIMINAR_ETIQUETAS_AHORCADOS_CARGANDO:
            return {
                ...state,
                cargandoResetearEtiquetasAhorcados: action.payload
            }

        default:
            return state;
    }
}