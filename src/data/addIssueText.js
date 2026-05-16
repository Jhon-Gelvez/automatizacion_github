/**
 * Array de contenidos para añadir issues a un milestone existente
 */
const addIssueText = [
    {
        title: "Parte 1 - Solicitudes de consulta (GET)",
        content: "• Solicitud 1: Realice una solicitud GET para obtener la lista completa de usuarios disponibles en el servicio.\n• Solicitud 2: Realice una solicitud GET para consultar la información de un usuario específico, utilizando su identificador.\n• Solicitud 3: Realice una solicitud GET para obtener todas las publicaciones (posts) asociadas a un usuario determinado.",
    },
    {
        title: "Parte 2 - Creación de información (POST)",
        content: "• Solicitud 4: Realice una solicitud POST para crear una nueva publicación asociada a un usuario existente. Incluya información como título y contenido.\n• Solicitud 5: Realice una solicitud POST para registrar un nuevo comentario relacionado con una publicación.",
    },
    {
        title: "Enunciado 1 (Usuarios activos y sus publicaciones)",
        content: "**Requerimientos:**\n• Consultar la lista completa de usuarios.\n• Consultar la lista de publicaciones.\n• Identificar cuáles usuarios tienen publicaciones asociadas.\n• Calcular la cantidad de publicaciones por usuario.\n• Mostrar también los usuarios que no tienen publicaciones.\n**Datos de entrada:** Endpoint de usuarios (users), Endpoint de publicaciones (posts), Identificador del usuario (userId).",
    },
    {
        title: "Enunciado 2 (Publicaciones con y sin comentarios)",
        content: "**Requerimientos:**\n• Consultar todas las publicaciones.\n• Consultar todos los comentarios.\n• Relacionar comentarios con sus publicaciones.\n• Identificar publicaciones sin comentarios.\n• Clasificar publicaciones según tengan o no comentarios.\n**Datos de entrada:** Endpoint de publicaciones (posts), Endpoint de comentarios (comments), Identificador de la publicación (postId).",
    },
    {
        title: "Enunciado 3 (Búsqueda específica de información)",
        content: "**Requerimientos:**\n• Consultar todas las publicaciones.\n• Buscar una publicación específica por su identificador.\n• Consultar los comentarios relacionados con esa publicación.\n• Validar si existen o no comentarios asociados.\n**Datos de entrada:** ID de la publicación, Endpoint de publicaciones (posts), Endpoint de comentarios (comments).",
    },
    {
        title: "Enunciado 4 (Eliminación lógica y validación de datos)",
        content: "**Requerimientos:**\n• Consultar las publicaciones.\n• Consultar los comentarios.\n• Verificar si una publicación específica tiene comentarios.\n• Si no tiene comentarios, ejecutar la eliminación.\n• Validar el resultado mediante una nueva consulta.\n**Datos de entrada:** ID de la publicación, Endpoint de publicaciones (posts), Endpoint de comentarios (comments).",
    },
];

module.exports = addIssueText;
