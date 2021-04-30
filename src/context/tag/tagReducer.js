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
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case ETIQUETAR_PALABRA:
        case ETIQUETAR_IMAGEN:
            return {
                ...state,
            }

        case OBTENER_IMAGENES_ETIQUETADAS_CARGANDO:
        case OBTENER_PALABRAS_ETIQUETADAS_CARGANDO:
        case ELIMINAR_ETIQUETAS_IMAGENES_ERROR:
        case ELIMINAR_ETIQUETAS_PALABRAS_ERROR:
        case OBTENER_PALABRAS_ETIQUETADAS_ERROR:
        case OBTENER_IMAGENES_ETIQUETADAS_ERROR:
        case ETIQUETAR_PALABRA_ERROR:
        case ETIQUETAR_IMAGEN_ERROR:
            return {
                ...state,
                errores: action.payload,
                cargandoImagenesEtiquetadasUsuarioDesdeAdmin: false,
                cargandoPalabrasEtiquetadasUsuarioDesdeAdmin: false,
                cargandoResetearEtiquetasImagenes: false,
                cargandoResetearEtiquetasPalabras: false,
            }
    
        case OBTENER_IMAGENES_ETIQUETADAS:
            return {
                ...state,
                imagenesEtiquetadas: action.payload,
                cargandoImagenesEtiquetadasUsuarioDesdeAdmin: false,
            }

        case OBTENER_PALABRAS_ETIQUETADAS:
            return {
                ...state,
                palabrasEtiquetadas: action.payload,
                cargandoPalabrasEtiquetadasUsuarioDesdeAdmin: false,
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

        default:
            return state;
    }
}