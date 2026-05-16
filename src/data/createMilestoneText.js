/**
 * Array de contenidos para crear milestones con sus issues asociados
 */
const createMilestoneText = [
    {
        title: "Actividades de transferencia del conocimiento.",
        tasks: [
            {
                title: "Componente de Búsqueda de Usuario",
                content: "**Requerimientos:**\n• **UI:** Crear el contenedor superior con un input para el ID y un botón de búsqueda.\n• **JS:** Capturar el evento del formulario, realizar la petición a `/users` y gestionar el estado de carga.\n**Datos de entrada:** Input de texto, Botón de acción, API Fetch.",
            },
            {
                title: "Componente de Feedback y Perfil",
                content: "**Requerimientos:**\n• **UI:** Diseñar el área central para mostrar los datos del usuario (Nombre, Email, etc.) o un mensaje de 'Error: Usuario no encontrado'.\n• **JS:** Inyectar los datos del usuario en el DOM si la respuesta es exitosa; de lo contrario, mostrar el mensaje de error visualmente.\n**Datos de entrada:** Objeto de usuario de la API, Contenedor de alertas.",
            },
            {
                title: "Componente Formulario de Nueva Tarea (Parte faltante)",
                content: "**Requerimientos:**\n• **UI:** Crear un formulario intermedio con campos para Título y Descripción que permanezca habilitado solo si hay un usuario activo.\n• **JS:** Validar que los campos no estén vacíos y prevenir el envío si no hay un ID de usuario vinculado.\n**Datos de entrada:** Inputs de formulario, Estado del usuario activo.",
            },
            {
                title: "Componente de Lista de Tareas (Tasks)",
                content: "**Requerimientos:**\n• **UI:** Crear el contenedor inferior representado en image_8f46e0.png para el listado dinámico.\n• **JS:** Implementar la función de renderizado que tome cada tarea nueva y la agregue al final de la lista sin recargar la página.\n**Datos de entrada:** Array de tareas locales, Plantilla de fila/item de tarea.",
            },

            {
                title: "Lógica de Búsqueda y Consumo de API (JS)",
                content: "**Requerimientos:**\n• Implementar `fetch` para consultar `/users` en JSONPlaceholder.\n• Crear la función de búsqueda que compare el valor del input con los datos del servidor.\n• Desarrollar la lógica para alternar la visibilidad del formulario de tareas basado en el resultado de la búsqueda.\n• Manejar promesas y errores de red.\n**Datos de entrada:** Event Listener (submit), Endpoint `/users`, Funciones asíncronas.",
            },
            {
                title: "Gestión de Eventos y Validación (JS)",
                content: "**Requerimientos:**\n• Prevenir el comportamiento por defecto de los formularios con `preventDefault()`.\n• Validar que los campos de la tarea no estén vacíos antes de procesar.\n• Capturar los datos del formulario de tareas y asociarlos al ID del usuario actual en memoria.\n• Implementar lógica para limpiar los inputs después de cada inserción exitosa.\n**Datos de entrada:** FormData API, Objetos de JavaScript, Validaciones condicionales.",
            },
            {
                title: "Inserción Dinámica en el DOM (JS/UI)",
                content: "**Requerimientos:**\n• Crear una función que reciba el objeto de la tarea y genere nodos de Element (tr, td) usando `createElement`.\n• Inyectar las nuevas filas en el `tbody` de la tabla sin afectar los datos existentes.\n• Asegurar que la interfaz se actualice inmediatamente (Real-time) tras el registro.\n• Manejar la actualización visual del estado de la tarea (completada/pendiente).\n**Datos de entrada:** Métodos `appendChild` o `insertAdjacentHTML`, Selectores del DOM.",
            },
        ],
    },
];

module.exports = createMilestoneText;
