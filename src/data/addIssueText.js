/**
 * Array de contenidos para añadir issues a un milestone existente
 */
const addIssueText = [
    {
        title: "RF-01 – Visualización Completa de Tareas (READ)",
        content:
            "El sistema debe permitir visualizar todas las tareas asociadas al usuario previamente identificado, consultando la información directamente desde la API RESTful.\n• La información debe actualizarse dinámicamente.\n• No se debe recargar la página.\n• La representación debe construirse completamente mediante manipulación del DOM.",
    },
    {
        title: "RF-02 – Creación de Tareas (CREATE)",
        content:
            "El sistema debe permitir registrar nuevas tareas asociadas al usuario.\n• El envío debe realizarse mediante petición HTTP a la API.\n• El formulario debe validar que los campos obligatorios estén completos antes de enviar la información.\n• Si existe un campo incompleto, se debe informar claramente al usuario:\n  o Qué campo presenta el error.\n  o Qué acción debe realizar para corregirlo.\n• Al finalizar correctamente la operación, se debe notificar que la tarea fue registrada exitosamente.\n• Si ocurre un error del sistema o de red, debe mostrarse un mensaje claro indicando la situación.",
    },
    {
        title: "RF-03 – Actualización de Tareas (UPDATE)",
        content:
            "El sistema debe permitir modificar la información de una tarea existente.\n• Cada tarea debe contar con una opción visible para editar.\n• La modificación debe enviarse mediante PUT o PATCH a la API.\n• No se debe recargar la página.\n• Después de recibir respuesta exitosa del servidor, el DOM debe actualizarse automáticamente.\n• Se debe informar al usuario si la actualización fue exitosa o si ocurrió algún error.",
    },
    {
        title: "RF-04 – Eliminación de Tareas (DELETE)",
        content:
            "El sistema debe permitir eliminar tareas asociadas al usuario.\n• Cada tarea debe contar con una opción para eliminar.\n• La eliminación debe confirmarse antes de ejecutarse.\n• La petición debe enviarse a la API mediante el método correspondiente.\n• El DOM debe actualizarse sin recargar la página.\n• Se debe mostrar un mensaje indicando si la eliminación fue exitosa o si ocurrió algún inconveniente.",
    },
    {
        title: "RNF-01 – Sin Recarga de Página",
        content:
            "Todas las operaciones deben realizarse utilizando JavaScript (Vanilla JS) y manipulación del DOM.\nNo está permitido utilizar recargas completas de la página para actualizar información.",
    },
    {
        title: "RNF-02 – Validación de Formularios",
        content:
            "Todo formulario debe:\n• Validar campos obligatorios.\n• Evitar el envío de datos incompletos.\n• Mostrar mensajes claros de validación.\n• Informar al usuario cuando la operación se realice correctamente.\n• Notificar errores de red o fallos del sistema.",
    },
    {
        title: "RNF-03 – Comunicación Clara con el Usuario",
        content:
            "El sistema debe proporcionar retroalimentación constante:\n• Confirmación de creación.\n• Confirmación de actualización.\n• Confirmación de eliminación.\n• Advertencias de validación.\n• Mensajes de error cuando la API no responda correctamente.",
    },
    {
        title: "RNF-04 – Buenas Prácticas de Trabajo Colaborativo",
        content:
            "Cada integrante del equipo deberá:\n• Crear una nueva rama para implementar los cambios.\n• Realizar commits descriptivos.\n• Subir los cambios a su fork.\n• Crear un Pull Request correctamente documentado.\n• Esperar revisión antes de la integración final.",
    },
];

module.exports = addIssueText;
