// Autentificación de Usuarios
export const VALIDAR_EMAIL = 'VALIDAR_EMAIL';
export const VALIDAR_PASSWORD = 'VALIDAR_PASSWORD';
export const EMAIL_SUCCESS = 'EMAIL_SUCCESS';
export const PASSWORD_SUCCESS = 'PASSWORD_SUCCESS';
export const VALIDAR_EMAIL_RESET_PASSWORD = 'VALIDAR_EMAIL_RESET_PASSWORD';
export const VALIDAR_EMAIL_RESET_PASSWORD_CARGANDO = 'VALIDAR_EMAIL_RESET_PASSWORD_CARGANDO';
export const VALIDAR_EMAIL_RESET_PASSWORD_ERROR = 'VALIDAR_EMAIL_RESET_PASSWORD_ERROR';
export const VALIDAR_PASSWORD_RESET_PASSWORD = 'VALIDAR_PASSWORD_RESET_PASSWORD';
export const VALIDAR_PASSWORD_RESET_PASSWORD_CARGANDO = 'VALIDAR_PASSWORD_RESET_PASSWORD_CARGANDO';
export const VALIDAR_PASSWORD_RESET_PASSWORD_ERROR = 'VALIDAR_PASSWORD_RESET_PASSWORD_ERROR';
export const CAMBIAR_RETURN = 'CAMBIAR_RETURN';

// Alertas
export const MOSTRAR_ALERTA = 'MOSTRAR_ALERTA';
export const OCULTAR_ALERTA = 'OCULTAR_ALERTA';

// Tareas Diarias
export const OBTENER_TAREAS_DIARIAS_CARGANDO = 'OBTENER_TAREAS_DIARIAS_CARGANDO'; 
export const OBTENER_TAREAS_DIARIAS_ERROR = 'OBTENER_TAREAS_DIARIAS_ERROR'; 
export const OBTENER_TAREAS_DIARIAS = 'OBTENER_TAREAS_DIARIAS'; 
export const ELIMINAR_RECOMPENSAS_LOGIN_TAREA = 'ELIMINAR_RECOMPENSAS_LOGIN_TAREA';
export const ELIMINAR_RECOMPENSAS_ETIQUETAS_TAREA = 'ELIMINAR_RECOMPENSAS_ETIQUETAS_TAREA';
export const ELIMINAR_RECOMPENSAS_SUBIR_IMAGEN_TAREA = 'ELIMINAR_RECOMPENSAS_SUBIR_IMAGEN_TAREA';
export const ELIMINAR_RECOMPENSAS_SUBIR_PALABRA_TAREA = 'ELIMINAR_RECOMPENSAS_SUBIR_PALABRA_TAREA';
export const ELIMINAR_RECOMPENSAS_SUBIR_AHORCADO_TAREA = 'ELIMINAR_RECOMPENSAS_SUBIR_AHORCADO_TAREA';
export const ELIMINAR_RECOMPENSAS_SUBIR_SELECCION_UNICA_TAREA = 'ELIMINAR_RECOMPENSAS_SUBIR_SELECCION_UNICA_TAREA';
export const ELIMINAR_RECOMPENSAS_SUBIR_TIP_TAREA = 'ELIMINAR_RECOMPENSAS_SUBIR_TIP_TAREA';
export const ELIMINAR_RECOMPENSAS_MODIFICAR_PERFIL_TAREA = 'ELIMINAR_RECOMPENSAS_MODIFICAR_PERFIL_TAREA';

// Recompensas
export const ELIMINAR_RECOMPENSAS_LOGIN = 'ELIMINAR_RECOMPENSAS_LOGIN';
export const ELIMINAR_RECOMPENSAS_ETIQUETAS = 'ELIMINAR_RECOMPENSAS_ETIQUETAS';
export const ELIMINAR_RECOMPENSAS_SUBIR_IMAGEN = 'ELIMINAR_RECOMPENSAS_SUBIR_IMAGEN';
export const ELIMINAR_RECOMPENSAS_SUBIR_PALABRA = 'ELIMINAR_RECOMPENSAS_SUBIR_PALABRA';
export const ELIMINAR_RECOMPENSAS_SUBIR_AHORCADO = 'ELIMINAR_RECOMPENSAS_SUBIR_AHORCADO';
export const ELIMINAR_RECOMPENSAS_SUBIR_SELECCION_UNICA = 'ELIMINAR_RECOMPENSAS_SUBIR_SELECCION_UNICA';
export const ELIMINAR_RECOMPENSAS_SUBIR_TIP = 'ELIMINAR_RECOMPENSAS_SUBIR_TIP';
export const ELIMINAR_RECOMPENSAS_MODIFICAR_PERFIL = 'ELIMINAR_RECOMPENSAS_MODIFICAR_PERFIL';

// Registro de Usuarios
export const REGISTRO_EXITOSO_CARGANDO = 'REGISTRO_EXITOSO_CARGANDO';
export const REGISTRO_EXITOSO = 'REGISTRO_EXITOSO';
export const REGISTRO_ERROR = 'REGISTRO_ERROR';
export const OBTENER_USUARIO = 'OBTENER_USUARIO';
export const LOGIN_EXITOSO = 'LOGIN_EXITOSO';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CERRAR_SESION = 'CERRAR_SESION';

// Imágenes
export const OBTENER_IMAGENES = 'OBTENER_IMAGENES'; 
export const OBTENER_IMAGENES_ERROR = 'OBTENER_IMAGENES_ERROR';
export const MODIFICAR_DIFICULTAD_PUNTOS_IMAGEN = 'MODIFICAR_DIFICULTAD_PUNTOS_IMAGEN';
export const MODIFICAR_DIFICULTAD_PUNTOS_IMAGEN_CARGANDO = 'MODIFICAR_DIFICULTAD_PUNTOS_IMAGEN_CARGANDO';
export const MODIFICAR_DIFICULTAD_PUNTOS_IMAGEN_ERROR = 'MODIFICAR_DIFICULTAD_PUNTOS_IMAGEN_ERROR';

// 4 Imágenes y una palabra
export const OBTENER_AHORCADOS = 'OBTENER_AHORCADOS'; 
export const OBTENER_AHORCADOS_ERROR = 'OBTENER_AHORCADOS_ERROR';
export const GUARDAR_AHORCADO = 'GUARDAR_AHORCADO';
export const GUARDAR_AHORCADO_CARGANDO = 'GUARDAR_AHORCADO_CARGANDO';
export const GUARDAR_AHORCADO_ERROR = 'GUARDAR_AHORCADO_ERROR';
export const OBTENER_AHORCADOS_POR_USUARIO = 'OBTENER_AHORCADOS_POR_USUARIO'; 
export const OBTENER_AHORCADOS_POR_USUARIO_ERROR = 'OBTENER_AHORCADOS_POR_USUARIO_ERROR';
export const ELIMINAR_AHORCADO = 'ELIMINAR_AHORCADO';
export const ELIMINAR_AHORCADO_CARGANDO = 'ELIMINAR_AHORCADO_CARGANDO';
export const ELIMINAR_AHORCADO_ERROR = 'ELIMINAR_AHORCADO_ERROR';
export const MODIFICAR_AHORCADO = 'MODIFICAR_AHORCADO';
export const MODIFICAR_AHORCADO_CARGANDO = 'MODIFICAR_AHORCADO_CARGANDO';
export const MODIFICAR_AHORCADO_ERROR = 'MODIFICAR_AHORCADO_ERROR';
export const HABILITAR_INHABILITAR_AHORCADO = 'HABILITAR_INHABILITAR_AHORCADO';
export const HABILITAR_INHABILITAR_AHORCADO_CARGANDO = 'HABILITAR_INHABILITAR_AHORCADO_CARGANDO';
export const HABILITAR_INHABILITAR_AHORCADO_ERROR = 'HABILITAR_INHABILITAR_AHORCADO_ERROR';
export const ELIMINAR_AHORCADO_DESDE_ADMIN = 'ELIMINAR_AHORCADO_DESDE_ADMIN';
export const ELIMINAR_AHORCADO_DESDE_ADMIN_CARGANDO = 'ELIMINAR_AHORCADO_DESDE_ADMIN_CARGANDO';
export const ELIMINAR_AHORCADO_DESDE_ADMIN_ERROR = 'ELIMINAR_AHORCADO_DESDE_ADMIN_ERROR';
export const MODIFICAR_DIFICULTAD_PUNTOS_AHORCADO = 'MODIFICAR_DIFICULTAD_PUNTOS_AHORCADO';
export const MODIFICAR_DIFICULTAD_PUNTOS_AHORCADO_CARGANDO = 'MODIFICAR_DIFICULTAD_PUNTOS_AHORCADO_CARGANDO';
export const MODIFICAR_DIFICULTAD_PUNTOS_AHORCADO_ERROR = 'MODIFICAR_DIFICULTAD_PUNTOS_AHORCADO_ERROR';

// Selecciones únicas
export const OBTENER_SELECCIONES_UNICAS = 'OBTENER_SELECCIONES_UNICAS'; 
export const OBTENER_SELECCIONES_UNICAS_ERROR = 'OBTENER_SELECCIONES_UNICAS_ERROR';
export const GUARDAR_SELECCION_UNICA = 'GUARDAR_SELECCION_UNICA';
export const GUARDAR_SELECCION_UNICA_CARGANDO = 'GUARDAR_SELECCION_UNICA_CARGANDO';
export const GUARDAR_SELECCION_UNICA_ERROR = 'GUARDAR_SELECCION_UNICA_ERROR';
export const OBTENER_SELECCIONES_UNICAS_POR_USUARIO = 'OBTENER_SELECCIONES_UNICAS_POR_USUARIO'; 
export const OBTENER_SELECCIONES_UNICAS_POR_USUARIO_ERROR = 'OBTENER_SELECCIONES_UNICAS_POR_USUARIO_ERROR';
export const ELIMINAR_SELECCION_UNICA = 'ELIMINAR_SELECCION_UNICA';
export const ELIMINAR_SELECCION_UNICA_CARGANDO = 'ELIMINAR_SELECCION_UNICA_CARGANDO';
export const ELIMINAR_SELECCION_UNICA_ERROR = 'ELIMINAR_SELECCION_UNICA_ERROR';
export const MODIFICAR_SELECCION_UNICA = 'MODIFICAR_SELECCION_UNICA';
export const MODIFICAR_SELECCION_UNICA_CARGANDO = 'MODIFICAR_SELECCION_UNICA_CARGANDO';
export const MODIFICAR_SELECCION_UNICA_ERROR = 'MODIFICAR_SELECCION_UNICA_ERROR';
export const HABILITAR_INHABILITAR_SELECCION_UNICA = 'HABILITAR_INHABILITAR_SELECCION_UNICA';
export const HABILITAR_INHABILITAR_SELECCION_UNICA_CARGANDO = 'HABILITAR_INHABILITAR_SELECCION_UNICA_CARGANDO';
export const HABILITAR_INHABILITAR_SELECCION_UNICA_ERROR = 'HABILITAR_INHABILITAR_SELECCION_UNICA_ERROR';
export const ELIMINAR_SELECCION_UNICA_DESDE_ADMIN = 'ELIMINAR_SELECCION_UNICA_DESDE_ADMIN';
export const ELIMINAR_SELECCION_UNICA_DESDE_ADMIN_CARGANDO = 'ELIMINAR_SELECCION_UNICA_DESDE_ADMIN_CARGANDO';
export const ELIMINAR_SELECCION_UNICA_DESDE_ADMIN_ERROR = 'ELIMINAR_SELECCION_UNICA_DESDE_ADMIN_ERROR';
export const MODIFICAR_DIFICULTAD_PUNTOS_SELECCION_UNICA = 'MODIFICAR_DIFICULTAD_PUNTOS_SELECCION_UNICA';
export const MODIFICAR_DIFICULTAD_PUNTOS_SELECCION_UNICA_CARGANDO = 'MODIFICAR_DIFICULTAD_PUNTOS_SELECCION_UNICA_CARGANDO';
export const MODIFICAR_DIFICULTAD_PUNTOS_SELECCION_UNICA_ERROR = 'MODIFICAR_DIFICULTAD_PUNTOS_SELECCION_UNICA_ERROR';
export const ETIQUETAR_SELECCION_UNICA = 'ETIQUETAR_SELECCION_UNICA';
export const ETIQUETAR_SELECCION_UNICA_ERROR = 'ETIQUETAR_SELECCION_UNICA_ERROR';
export const OBTENER_SELECCIONES_UNICAS_ETIQUETADAS = 'OBTENER_SELECCIONES_UNICAS_ETIQUETADAS';
export const OBTENER_SELECCIONES_UNICAS_ETIQUETADAS_CARGANDO = 'OBTENER_SELECCIONES_UNICAS_ETIQUETADAS_CARGANDO';
export const OBTENER_SELECCIONES_UNICAS_ETIQUETADAS_ERROR = 'OBTENER_SELECCIONES_UNICAS_ETIQUETADAS_ERROR';
export const ELIMINAR_ETIQUETAS_SELECCIONES_UNICAS = 'ELIMINAR_ETIQUETAS_SELECCIONES_UNICAS';
export const ELIMINAR_ETIQUETAS_SELECCIONES_UNICAS_CARGANDO = 'ELIMINAR_ETIQUETAS_SELECCIONES_UNICAS_CARGANDO';
export const ELIMINAR_ETIQUETAS_SELECCIONES_UNICAS_ERROR = 'ELIMINAR_ETIQUETAS_SELECCIONES_UNICAS_ERROR';


// Palabras
export const OBTENER_PALABRAS = 'OBTENER_PALABRAS';
export const OBTENER_PALABRAS_ERROR = 'OBTENER_PALABRAS_ERROR';
export const OBTENER_PALABRAS_POR_USUARIO = 'OBTENER_PALABRAS_POR_USUARIO';
export const OBTENER_PALABRAS_POR_USUARIO_ERROR = 'OBTENER_PALABRAS_POR_USUARIO_ERROR';
export const GUARDAR_PALABRA = 'GUARDAR_PALABRA';
export const GUARDAR_PALABRA_CARGANDO = 'GUARDAR_PALABRA_CARGANDO';
export const GUARDAR_PALABRA_ERROR = 'GUARDAR_PALABRA_ERROR';
export const MODIFICAR_PALABRA = 'MODIFICAR_PALABRA';
export const MODIFICAR_PALABRA_CARGANDO = 'MODIFICAR_PALABRA_CARGANDO';
export const MODIFICAR_PALABRA_ERROR = 'MODIFICAR_PALABRA_ERROR';
export const ELIMINAR_PALABRA = 'ELIMINAR_PALABRA';
export const ELIMINAR_PALABRA_CARGANDO = 'ELIMINAR_PALABRA_CARGANDO';
export const ELIMINAR_PALABRA_ERROR = 'ELIMINAR_PALABRA_ERROR';
export const HABILITAR_INHABILITAR_PALABRA = 'HABILITAR_INHABILITAR_PALABRA';
export const HABILITAR_INHABILITAR_PALABRA_CARGANDO = 'HABILITAR_INHABILITAR_PALABRA_CARGANDO';
export const HABILITAR_INHABILITAR_PALABRA_ERROR = 'HABILITAR_INHABILITAR_PALABRA_ERROR';
export const ELIMINAR_PALABRA_DESDE_ADMIN = 'ELIMINAR_PALABRA_DESDE_ADMIN';
export const ELIMINAR_PALABRA_DESDE_ADMIN_CARGANDO = 'ELIMINAR_PALABRA_DESDE_ADMIN_CARGANDO';
export const ELIMINAR_PALABRA_DESDE_ADMIN_ERROR = 'ELIMINAR_PALABRA_DESDE_ADMIN_ERROR';
export const MODIFICAR_DIFICULTAD_PUNTOS_PALABRA = 'MODIFICAR_DIFICULTAD_PUNTOS_PALABRA';
export const MODIFICAR_DIFICULTAD_PUNTOS_PALABRA_CARGANDO = 'MODIFICAR_DIFICULTAD_PUNTOS_PALABRA_CARGANDO';
export const MODIFICAR_DIFICULTAD_PUNTOS_PALABRA_ERROR = 'MODIFICAR_DIFICULTAD_PUNTOS_PALABRA_ERROR';

// Tips
export const OBTENER_TIPS = 'OBTENER_TIPS';
export const OBTENER_TIPS_ERROR = 'OBTENER_TIPS_ERROR';
export const OBTENER_TIPS_POR_USUARIO = 'OBTENER_TIPS_POR_USUARIO';
export const OBTENER_TIPS_POR_USUARIO_ERROR = 'OBTENER_TIPS_POR_USUARIO_ERROR';
export const GUARDAR_TIP = 'GUARDAR_TIP';
export const GUARDAR_TIP_CARGANDO = 'GUARDAR_TIP_CARGANDO';
export const GUARDAR_TIP_ERROR = 'GUARDAR_TIP_ERROR';
export const MODIFICAR_TIP = 'MODIFICAR_TIP';
export const MODIFICAR_TIP_CARGANDO = 'MODIFICAR_TIP_CARGANDO';
export const MODIFICAR_TIP_ERROR = 'MODIFICAR_TIP_ERROR';
export const ELIMINAR_TIP = 'ELIMINAR_TIP';
export const ELIMINAR_TIP_CARGANDO = 'ELIMINAR_TIP_CARGANDO';
export const ELIMINAR_TIP_ERROR = 'ELIMINAR_TIP_ERROR';
export const HABILITAR_INHABILITAR_TIP = 'HABILITAR_INHABILITAR_TIP';
export const HABILITAR_INHABILITAR_TIP_CARGANDO = 'HABILITAR_INHABILITAR_TIP_CARGANDO';
export const HABILITAR_INHABILITAR_TIP_ERROR = 'HABILITAR_INHABILITAR_TIP_ERROR';
export const ELIMINAR_TIP_DESDE_ADMIN = 'ELIMINAR_TIP_DESDE_ADMIN';
export const ELIMINAR_TIP_DESDE_ADMIN_CARGANDO = 'ELIMINAR_TIP_DESDE_ADMIN_CARGANDO';
export const ELIMINAR_TIP_DESDE_ADMIN_ERROR = 'ELIMINAR_TIP_DESDE_ADMIN_ERROR';
export const MODIFICAR_DIFICULTAD_PUNTOS_TIP = 'MODIFICAR_DIFICULTAD_PUNTOS_TIP';
export const MODIFICAR_DIFICULTAD_PUNTOS_TIP_CARGANDO = 'MODIFICAR_DIFICULTAD_PUNTOS_TIP_CARGANDO';
export const MODIFICAR_DIFICULTAD_PUNTOS_TIP_ERROR = 'MODIFICAR_DIFICULTAD_PUNTOS_TIP_ERROR';


// Perfiles
export const OBTENER_TODOS_LOS_PERFILES = 'OBTENER_TODOS_LOS_PERFILES';
export const OBTENER_TODOS_LOS_PERFILES_ERROR = 'OBTENER_TODOS_LOS_PERFILES_ERROR';
export const OBTENER_PERFIL_USUARIO = 'OBTENER_PERFIL_USUARIO';
export const OBTENER_PERFIL_USUARIO_ERROR = 'OBTENER_PERFIL_USUARIO_ERROR'; 
export const ACTUALIZAR_PERFIL = 'ACTUALIZAR_PERFIL'; 
export const ACTUALIZAR_PERFIL_ERROR = 'ACTUALIZAR_PERFIL_ERROR'; 

// Categorías
export const OBTENER_CATEGORIAS = 'OBTENER_CATEGORIAS'; 
export const OBTENER_CATEGORIAS_ERROR = 'OBTENER_CATEGORIAS_ERROR';
export const OBTENER_CATEGORIAS_VISIBLES = 'OBTENER_CATEGORIAS_VISIBLES'; 
export const OBTENER_CATEGORIAS_VISIBLES_ERROR = 'OBTENER_CATEGORIAS_VISIBLES_ERROR';
export const GUARDAR_CATEGORIA = 'GUARDAR_CATEGORIA';
export const GUARDAR_CATEGORIA_CARGANDO = 'GUARDAR_CATEGORIA_CARGANDO';
export const GUARDAR_CATEGORIA_ERROR = 'GUARDAR_CATEGORIA_ERROR';
export const MODIFICAR_CATEGORIA = 'MODIFICAR_CATEGORIA';
export const MODIFICAR_CATEGORIA_CARGANDO = 'MODIFICAR_CATEGORIA_CARGANDO';
export const MODIFICAR_CATEGORIA_ERROR = 'MODIFICAR_CATEGORIA_ERROR';

// Ligas
export const OBTENER_DISTRIBUCION_LIGAS = 'OBTENER_DISTRIBUCION_LIGAS'; 
export const OBTENER_DISTRIBUCION_LIGAS_ERROR = 'OBTENER_DISTRIBUCION_LIGAS_ERROR'; 

// Niveles de los juegos
// Imágenes
export const OBTENER_IMAGENES_POR_USUARIO = 'OBTENER_IMAGENES_POR_USUARIO';
export const OBTENER_IMAGENES_POR_USUARIO_ERROR = 'OBTENER_IMAGENES_POR_USUARIO_ERROR';
export const OBTENER_NIVEL_IMAGENES_USUARIO = 'OBTENER_NIVEL_IMAGENES_USUARIO';
export const OBTENER_NIVEL_IMAGENES_USUARIO_ERROR = 'OBTENER_NIVEL_IMAGENES_USUARIO_ERROR';
export const GUARDAR_IMAGEN = 'GUARDAR_IMAGEN';
export const GUARDAR_IMAGEN_CARGANDO = 'GUARDAR_IMAGEN_CARGANDO';
export const GUARDAR_IMAGEN_ERROR = 'GUARDAR_IMAGEN_ERROR';
export const MODIFICAR_IMAGEN = 'MODIFICAR_IMAGEN';
export const MODIFICAR_IMAGEN_CARGANDO = 'MODIFICAR_IMAGEN_CARGANDO';
export const MODIFICAR_IMAGEN_ERROR = 'MODIFICAR_IMAGEN_ERROR';
export const ELIMINAR_IMAGEN = 'ELIMINAR_IMAGEN';
export const ELIMINAR_IMAGEN_CARGANDO = 'ELIMINAR_IMAGEN_CARGANDO';
export const ELIMINAR_IMAGEN_ERROR = 'ELIMINAR_IMAGEN_ERROR';
export const HABILITAR_INHABILITAR_IMAGEN = 'HABILITAR_INHABILITAR_IMAGEN';
export const HABILITAR_INHABILITAR_IMAGEN_CARGANDO = 'HABILITAR_INHABILITAR_IMAGEN_CARGANDO';
export const HABILITAR_INHABILITAR_IMAGEN_ERROR = 'HABILITAR_INHABILITAR_IMAGEN_ERROR';
export const ELIMINAR_IMAGEN_DESDE_ADMIN = 'ELIMINAR_IMAGEN_DESDE_ADMIN';
export const ELIMINAR_IMAGEN_DESDE_ADMIN_CARGANDO = 'ELIMINAR_IMAGEN_DESDE_ADMIN_CARGANDO';
export const ELIMINAR_IMAGEN_DESDE_ADMIN_ERROR = 'ELIMINAR_IMAGEN_DESDE_ADMIN_ERROR';

// Usuarios
export const OBTENER_DISTRIBUCION_EDADES_USUARIOS = 'OBTENER_DISTRIBUCION_EDADES_USUARIOS';
export const OBTENER_DISTRIBUCION_EDADES_USUARIOS_ERROR = 'OBTENER_DISTRIBUCION_EDADES_USUARIOS_ERROR';
export const MODIFICAR_USUARIO_CARGANDO = 'MODIFICAR_USUARIO_CARGANDO';
export const MODIFICAR_USUARIO = 'MODIFICAR_USUARIO';
export const MODIFICAR_USUARIO_ERROR = 'MODIFICAR_USUARIO_ERROR';
export const MODIFICAR_USUARIO_SALIR = 'MODIFICAR_USUARIO_SALIR';
export const OBTENER_USUARIOS = 'OBTENER_USUARIOS';
export const OBTENER_USUARIOS_ERROR = 'OBTENER_USUARIOS_ERROR';
export const MODIFICAR_USUARIO_ADMIN_BLOQUEO_CARGANDO = 'MODIFICAR_USUARIO_ADMIN_BLOQUEO_CARGANDO';
export const MODIFICAR_USUARIO_ADMIN_BLOQUEO = 'MODIFICAR_USUARIO_ADMIN_BLOQUEO';
export const MODIFICAR_USUARIO_ADMIN_BLOQUEO_ERROR = 'MODIFICAR_USUARIO_ADMIN_BLOQUEO_ERROR';
export const OBTENER_IMAGENES_POR_USUARIO_ADMIN = 'OBTENER_IMAGENES_POR_USUARIO_ADMIN';
export const OBTENER_IMAGENES_POR_USUARIO_ADMIN_CARGANDO = 'OBTENER_IMAGENES_POR_USUARIO_ADMIN_CARGANDO';
export const OBTENER_IMAGENES_POR_USUARIO_ADMIN_ERROR = 'OBTENER_IMAGENES_POR_USUARIO_ADMIN_ERROR';
export const OBTENER_PALABRAS_POR_USUARIO_ADMIN = 'OBTENER_PALABRAS_POR_USUARIO_ADMIN';
export const OBTENER_PALABRAS_POR_USUARIO_ADMIN_CARGANDO = 'OBTENER_PALABRAS_POR_USUARIO_ADMIN_CARGANDO';
export const OBTENER_PALABRAS_POR_USUARIO_ADMIN_ERROR = 'OBTENER_PALABRAS_POR_USUARIO_ADMIN_ERROR';
export const OBTENER_AHORCADOS_POR_USUARIO_ADMIN = 'OBTENER_AHORCADOS_POR_USUARIO_ADMIN';
export const OBTENER_AHORCADOS_POR_USUARIO_ADMIN_CARGANDO = 'OBTENER_AHORCADOS_POR_USUARIO_ADMIN_CARGANDO';
export const OBTENER_AHORCADOS_POR_USUARIO_ADMIN_ERROR = 'OBTENER_AHORCADOS_POR_USUARIO_ADMIN_ERROR';
export const OBTENER_SELECCIONES_UNICAS_POR_USUARIO_ADMIN = 'OBTENER_SELECCIONES_UNICAS_POR_USUARIO_ADMIN';
export const OBTENER_SELECCIONES_UNICAS_POR_USUARIO_ADMIN_CARGANDO = 'OBTENER_SELECCIONES_UNICAS_POR_USUARIO_ADMIN_CARGANDO';
export const OBTENER_SELECCIONES_UNICAS_POR_USUARIO_ADMIN_ERROR = 'OBTENER_SELECCIONES_UNICAS_POR_USUARIO_ADMIN_ERROR';
export const OBTENER_TIPS_POR_USUARIO_ADMIN = 'OBTENER_TIPS_POR_USUARIO_ADMIN';
export const OBTENER_TIPS_POR_USUARIO_ADMIN_CARGANDO = 'OBTENER_TIPS_POR_USUARIO_ADMIN_CARGANDO';
export const OBTENER_TIPS_POR_USUARIO_ADMIN_ERROR = 'OBTENER_TIPS_POR_USUARIO_ADMIN_ERROR';

// Formularios de Contacto
export const ENVIAR_FORMULARIO_DE_CONTACTO = 'ENVIAR_FORMULARIO_DE_CONTACTO';
export const ENVIAR_FORMULARIO_DE_CONTACTO_CARGANDO = 'ENVIAR_FORMULARIO_DE_CONTACTO_CARGANDO';
export const ENVIAR_FORMULARIO_DE_CONTACTO_ERROR = 'ENVIAR_FORMULARIO_DE_CONTACTO_ERROR';

// Etiquetado de Imágenes, Palabras y Ahorcados
// Imágenes
export const ETIQUETAR_IMAGEN = 'ETIQUETAR_IMAGEN';
export const ETIQUETAR_IMAGEN_ERROR = 'ETIQUETAR_IMAGEN_ERROR';
export const ELIMINAR_PORCENTAJE_ETIQUETA_IMAGEN = 'ELIMINAR_PORCENTAJE_ETIQUETA_IMAGEN';
export const ETIQUETAR_PALABRA = 'ETIQUETAR_PALABRA';
export const ETIQUETAR_PALABRA_ERROR = 'ETIQUETAR_PALABRA_ERROR';
export const ELIMINAR_PORCENTAJE_ETIQUETA_PALABRA = 'ELIMINAR_PORCENTAJE_ETIQUETA_PALABRA';
export const ETIQUETAR_CUATRO_IMAGENES = 'ETIQUETAR_CUATRO_IMAGENES';
export const ETIQUETAR_CUATRO_IMAGENES_ERROR = 'ETIQUETAR_CUATRO_IMAGENES_ERROR';
export const OBTENER_IMAGENES_ETIQUETADAS = 'OBTENER_IMAGENES_ETIQUETADAS';
export const OBTENER_IMAGENES_ETIQUETADAS_CARGANDO = 'OBTENER_IMAGENES_ETIQUETADAS_CARGANDO';
export const OBTENER_IMAGENES_ETIQUETADAS_ERROR = 'OBTENER_IMAGENES_ETIQUETADAS_ERROR';
export const ELIMINAR_ETIQUETAS_IMAGENES = 'ELIMINAR_ETIQUETAS_IMAGENES';
export const ELIMINAR_ETIQUETAS_IMAGENES_CARGANDO = 'ELIMINAR_ETIQUETAS_IMAGENES_CARGANDO';
export const ELIMINAR_ETIQUETAS_IMAGENES_ERROR = 'ELIMINAR_ETIQUETAS_IMAGENES_ERROR';

// Palabras
export const OBTENER_PALABRAS_ETIQUETADAS = 'OBTENER_PALABRAS_ETIQUETADAS';
export const OBTENER_PALABRAS_ETIQUETADAS_CARGANDO = 'OBTENER_PALABRAS_ETIQUETADAS_CARGANDO';
export const OBTENER_PALABRAS_ETIQUETADAS_ERROR = 'OBTENER_PALABRAS_ETIQUETADAS_ERROR';
export const ELIMINAR_ETIQUETAS_PALABRAS = 'ELIMINAR_ETIQUETAS_PALABRAS';
export const ELIMINAR_ETIQUETAS_PALABRAS_CARGANDO = 'ELIMINAR_ETIQUETAS_PALABRAS_CARGANDO';
export const ELIMINAR_ETIQUETAS_PALABRAS_ERROR = 'ELIMINAR_ETIQUETAS_PALABRAS_ERROR';

// Ahorcados
export const ETIQUETAR_AHORCADO = 'ETIQUETAR_AHORCADO';
export const ETIQUETAR_AHORCADO_ERROR = 'ETIQUETAR_AHORCADO_ERROR';
export const OBTENER_AHORCADOS_ETIQUETADOS = 'OBTENER_AHORCADOS_ETIQUETADOS';
export const OBTENER_AHORCADOS_ETIQUETADOS_CARGANDO = 'OBTENER_AHORCADOS_ETIQUETADOS_CARGANDO';
export const OBTENER_AHORCADOS_ETIQUETADOS_ERROR = 'OBTENER_AHORCADOS_ETIQUETADOS_ERROR';
export const ELIMINAR_ETIQUETAS_AHORCADOS = 'ELIMINAR_ETIQUETAS_AHORCADOS';
export const ELIMINAR_ETIQUETAS_AHORCADOS_CARGANDO = 'ELIMINAR_ETIQUETAS_AHORCADOS_CARGANDO';
export const ELIMINAR_ETIQUETAS_AHORCADOS_ERROR = 'ELIMINAR_ETIQUETAS_AHORCADOS_ERROR';

// Tips
export const VER_TIP = 'VER_TIP';
export const VER_TIP_ERROR = 'VER_TIP_ERROR';
export const OBTENER_TIPS_VISTOS = 'OBTENER_TIPS_VISTOS';
export const OBTENER_TIPS_VISTOS_CARGANDO = 'OBTENER_TIPS_VISTOS_CARGANDO';
export const OBTENER_TIPS_VISTOS_ERROR = 'OBTENER_TIPS_VISTOS_ERROR';
export const ELIMINAR_TIPS_VISTOS = 'ELIMINAR_TIPS_VISTOS';
export const ELIMINAR_TIPS_VISTOS_CARGANDO = 'ELIMINAR_TIPS_VISTOS_CARGANDO';
export const ELIMINAR_TIPS_VISTOS_ERROR = 'ELIMINAR_TIPS_VISTOS_ERROR';

// Tienda
export const OBTENER_PRODUCTOS_TIENDA = 'OBTENER_PRODUCTOS_TIENDA';
export const OBTENER_PRODUCTOS_TIENDA_ERROR = 'OBTENER_PRODUCTOS_TIENDA_ERROR';
export const OBTENER_PRODUCTOS_USUARIO_TIENDA = 'OBTENER_PRODUCTOS_USUARIO_TIENDA';
export const OBTENER_PRODUCTOS_USUARIO_TIENDA_ERROR = 'OBTENER_PRODUCTOS_USUARIO_TIENDA_ERROR';
export const COMPRAR_MARCO_TIENDA_CARGANDO = 'COMPRAR_MARCO_TIENDA_CARGANDO';
export const COMPRAR_MARCO_TIENDA_ERROR = 'COMPRAR_MARCO_TIENDA_ERROR';
export const COMPRAR_MARCO_TIENDA = 'COMPRAR_MARCO_TIENDA';
export const COMPRAR_APODO_TIENDA_CARGANDO = 'COMPRAR_APODO_TIENDA_CARGANDO';
export const COMPRAR_APODO_TIENDA_ERROR = 'COMPRAR_APODO_TIENDA_ERROR';
export const COMPRAR_APODO_TIENDA = 'COMPRAR_APODO_TIENDA';

// Analíticas
export const OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES = "OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES"; 
export const OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_CARGANDO = "OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_CARGANDO"; 
export const OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_ERROR = "OBTENER_DISTRIBUCION_CATEGORIAS_IMAGENES_ERROR"; 
export const OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN = "OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN";
export const OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_CARGANDO = "OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_CARGANDO";
export const OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_ERROR = "OBTENER_DISTRIBUCION_CATEGORIAS_POR_IMAGEN_ERROR";
export const OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS = "OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS"; 
export const OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_CARGANDO = "OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_CARGANDO"; 
export const OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_ERROR = "OBTENER_DISTRIBUCION_CATEGORIAS_PALABRAS_ERROR"; 
export const OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA = "OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA";
export const OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_CARGANDO = "OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_CARGANDO";
export const OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_ERROR = "OBTENER_DISTRIBUCION_CATEGORIAS_POR_PALABRA_ERROR";
export const OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES = "OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES"; 
export const OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES_CARGANDO = "OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES_CARGANDO"; 
export const OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES_ERROR = "OBTENER_DISTRIBUCION_USO_FUNCIONALIDADES_ERROR"; 
export const OBTENER_CSV_ETIQUETAS_IMAGENES = "OBTENER_CSV_ETIQUETAS_IMAGENES"; 
export const OBTENER_CSV_ETIQUETAS_IMAGENES_CARGANDO = "OBTENER_CSV_ETIQUETAS_IMAGENES_CARGANDO"; 
export const OBTENER_CSV_ETIQUETAS_IMAGENES_ERROR = "OBTENER_CSV_ETIQUETAS_IMAGENES_ERROR"; 
export const OBTENER_CSV_ETIQUETAS_PALABRAS = "OBTENER_CSV_ETIQUETAS_PALABRAS"; 
export const OBTENER_CSV_ETIQUETAS_PALABRAS_CARGANDO = "OBTENER_CSV_ETIQUETAS_PALABRAS_CARGANDO"; 
export const OBTENER_CSV_ETIQUETAS_PALABRAS_ERROR = "OBTENER_CSV_ETIQUETAS_PALABRAS_ERROR"; 
export const OBTENER_CSV_ETIQUETAS_SELECCIONES_UNICAS = "OBTENER_CSV_ETIQUETAS_SELECCIONES_UNICAS"; 
export const OBTENER_CSV_ETIQUETAS_SELECCIONES_UNICAS_CARGANDO = "OBTENER_CSV_ETIQUETAS_SELECCIONES_UNICAS_CARGANDO"; 
export const OBTENER_CSV_ETIQUETAS_SELECCIONES_UNICAS_ERROR = "OBTENER_CSV_ETIQUETAS_SELECCIONES_UNICAS_ERROR"; 
