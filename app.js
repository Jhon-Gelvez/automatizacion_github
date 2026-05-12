require("dotenv").config();
const { Octokit } = require("octokit");
const path = require("path");
const fs = require("fs");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const REPO_OWNER = process.env.GITHUB_USER;

// 1. CONFIGURATION: Repositories and Milestone Mapping
const REPOSITORIES = ["DOM"];

const milestones = [
    {
        title: "Actividades de transferencia del conocimiento.",
        tasks: [
            {
                title: "Componente de Búsqueda de Usuario",
                content:
                    "**Requerimientos:**\n• **UI:** Crear el contenedor superior con un input para el ID y un botón de búsqueda.\n• **JS:** Capturar el evento del formulario, realizar la petición a `/users` y gestionar el estado de carga.\n**Datos de entrada:** Input de texto, Botón de acción, API Fetch.",
            },
            {
                title: "Componente de Feedback y Perfil",
                content:
                    "**Requerimientos:**\n• **UI:** Diseñar el área central para mostrar los datos del usuario (Nombre, Email, etc.) o un mensaje de 'Error: Usuario no encontrado'.\n• **JS:** Inyectar los datos del usuario en el DOM si la respuesta es exitosa; de lo contrario, mostrar el mensaje de error visualmente.\n**Datos de entrada:** Objeto de usuario de la API, Contenedor de alertas.",
            },
            {
                title: "Componente Formulario de Nueva Tarea (Parte faltante)",
                content:
                    "**Requerimientos:**\n• **UI:** Crear un formulario intermedio con campos para Título y Descripción que permanezca habilitado solo si hay un usuario activo.\n• **JS:** Validar que los campos no estén vacíos y prevenir el envío si no hay un ID de usuario vinculado.\n**Datos de entrada:** Inputs de formulario, Estado del usuario activo.",
            },
            {
                title: "Componente de Lista de Tareas (Tasks)",
                content:
                    "**Requerimientos:**\n• **UI:** Crear el contenedor inferior representado en image_8f46e0.png para el listado dinámico.\n• **JS:** Implementar la función de renderizado que tome cada tarea nueva y la agregue al final de la lista sin recargar la página.\n**Datos de entrada:** Array de tareas locales, Plantilla de fila/item de tarea.",
            },

            {
                title: "Lógica de Búsqueda y Consumo de API (JS)",
                content:
                    "**Requerimientos:**\n• Implementar `fetch` para consultar `/users` en JSONPlaceholder.\n• Crear la función de búsqueda que compare el valor del input con los datos del servidor.\n• Desarrollar la lógica para alternar la visibilidad del formulario de tareas basado en el resultado de la búsqueda.\n• Manejar promesas y errores de red.\n**Datos de entrada:** Event Listener (submit), Endpoint `/users`, Funciones asíncronas.",
            },
            {
                title: "Gestión de Eventos y Validación (JS)",
                content:
                    "**Requerimientos:**\n• Prevenir el comportamiento por defecto de los formularios con `preventDefault()`.\n• Validar que los campos de la tarea no estén vacíos antes de procesar.\n• Capturar los datos del formulario de tareas y asociarlos al ID del usuario actual en memoria.\n• Implementar lógica para limpiar los inputs después de cada inserción exitosa.\n**Datos de entrada:** FormData API, Objetos de JavaScript, Validaciones condicionales.",
            },
            {
                title: "Inserción Dinámica en el DOM (JS/UI)",
                content:
                    "**Requerimientos:**\n• Crear una función que reciba el objeto de la tarea y genere nodos de Element (tr, td) usando `createElement`.\n• Inyectar las nuevas filas en el `tbody` de la tabla sin afectar los datos existentes.\n• Asegurar que la interfaz se actualice inmediatamente (Real-time) tras el registro.\n• Manejar la actualización visual del estado de la tarea (completada/pendiente).\n**Datos de entrada:** Métodos `appendChild` o `insertAdjacentHTML`, Selectores del DOM.",
            },
        ],
    },
];

// Read the template file
const templatePath = path.join(__dirname, "feature_request.md");
const templateBody = fs.readFileSync(templatePath, "utf8");

const placeholder = "{{CONTENT_PLACEHOLDER}}";

const rulset = async (repo) => {
    octokit.request("POST /repos/{owner}/{repo}/rulesets", {
        owner: REPO_OWNER,
        repo: repo,
        name: "Blindaje Develop y Main",
        target: "branch",
        enforcement: "active",
        // Add the bypass configuration here
        bypass_actors: [
            {
                actor_id: 5,
                actor_type: "RepositoryRole",
                bypass_mode: "always",
            },
        ],
        conditions: {
            ref_name: {
                include: ["refs/heads/main", "refs/heads/develop"],
                exclude: [],
            },
        },
        rules: [
            { type: "deletion" },
            { type: "non_fast_forward" }, // This corresponds to "Block force pushes" in your image
            {
                type: "pull_request",
                parameters: {
                    required_approving_review_count: 1,
                    dismiss_stale_reviews_on_push: false,
                    require_code_owner_review: false,
                    require_last_push_approval: false,
                    required_review_thread_resolution: false,
                },
            },
        ],
    });
    console.log(`✅ Ruleset 'Blindaje' created.`);
};

// Nueva función para el Milestone de contratos
const createFirmaMilestone = async (repo) => {
    // 1. Crear el Milestone específico
    const { data: milestone } = await octokit.request(
        "POST /repos/{owner}/{repo}/milestones",
        {
            owner: REPO_OWNER,
            repo: repo,
            title: "Firma Contrato",
            state: "open",
        },
    );

    console.log(`📂 Milestone 'Firma Contrato' creado.`);

    // 2. Datos en crudo para las issues
    const issuesContrato = [
        "[DOCS]: Firma de contrato - Jhon Sebastian Falcon Ruiz",
        "[DOCS]: Firma de contrato - Jhon Jairo Gelvez Gomez",
    ];

    // 3. Crear las issues relacionadas
    for (const title of issuesContrato) {
        await octokit.request("POST /repos/{owner}/{repo}/issues", {
            owner: REPO_OWNER,
            repo: repo,
            title: title,
            body: "Firmar el contrato.",
            milestone: milestone.number,
            labels: ["documentation"], // Etiqueta de tipo DOCS
        });

        console.log(`   📌 Issue creado: ${title}`);
    }
};

const inviteCollaborator = async (repo) => {
    await octokit.request(
        "PUT /repos/{owner}/{repo}/collaborators/{username}",
        {
            owner: REPO_OWNER,
            repo: repo,
            username: "falconsebas23-prog",
            permission: "push",
        },
    );

    console.log(`✉️ Invitation sent`);
};

const createNamingIssue = async (repo) => {
    await octokit.request("POST /repos/{owner}/{repo}/issues", {
        owner: REPO_OWNER,
        repo: repo,
        title: "docs: nombrar el proyecto",
        body: "Definir un nombre oficial para el proyecto y actualizar la documentación inicial.",
        labels: ["documentation"],
    });

    console.log(`📌 Issue 'nombrar el proyecto' creada.`);
};

const createMilestone = async (repo) => {
    for (const item of milestones) {
        // Create the Milestone
        const { data: milestone } = await octokit.request(
            "POST /repos/{owner}/{repo}/milestones",
            {
                owner: REPO_OWNER,
                repo: repo,
                title: item.title,
                state: "open",
            },
        );

        console.log(`📂 Milestone created: ${milestone.title}`);

        // Create all tasks belonging to THIS specific milestone
        for (const task of item.tasks) {
            const finalBody = templateBody.replace(placeholder, task.content);

            await octokit.request("POST /repos/{owner}/{repo}/issues", {
                owner: REPO_OWNER,
                repo: repo,
                title: `[FEAT]: ${task.title}`,
                body: finalBody,
                milestone: milestone.number,
                labels: ["enhancement"],
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28", // Versión obligatoria para evitar deprecation
                },
            });

            console.log(`   📌 Issue created: ${task.title}`);
        }
    }
};

const addTransferenciaIssues = async (repo) => {
    const { data: allMilestones } = await octokit.request(
        "GET /repos/{owner}/{repo}/milestones",
        {
            owner: REPO_OWNER,
            repo: repo,
            state: "all", 
        },
    );

    // 1. Find the milestone in GitHub (using the name as it appears there)
    const targetMilestone = allMilestones.find(
        (m) => m.title.trim() === "Actividades de transferencia del conocimiento",
    );

    if (!targetMilestone) {
        console.error("❌ Milestone not found even in 'all' state.");
        return;
    }

    console.log(`📂 Found Milestone: ${targetMilestone.title} (ID: ${targetMilestone.number})`);

    // 2. Find the data in your local 'milestones' array. 
    // Make sure this string matches your config exactly (with the dot)!
    const transferenciaData = milestones.find(
        (m) => m.title === "Actividades de transferencia del conocimiento.",
    );

    if (!transferenciaData) {
        console.error("❌ Error: Could not find task data in the 'milestones' array. Check the title spelling!");
        return;
    }

    for (const task of transferenciaData.tasks) {
        const finalBody = templateBody.replace(placeholder, task.content);

        await octokit.request("POST /repos/{owner}/{repo}/issues", {
            owner: REPO_OWNER,
            repo: repo,
            title: `[FEAT]: ${task.title}`,
            body: finalBody,
            milestone: targetMilestone.number,
            labels: ["enhancement"],
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
            },
        });

        console.log(`   📌 Issue added: ${task.title}`);
    }
};

async function automateProject(repo) {
    try {
        console.log(`\n🚀 Processing: ${repo}`);

        // 1. Create Ruleset (Updated with Bypass Actors)
        // await rulset(repo);

        // await inviteCollaborator(repo);

        // 2. Create Milsitone signed contract
        // await createFirmaMilestone(repo);

        // await createNamingIssue(repo);

        // 3. Create Milestones and their specific Issues
        // await createMilestone(repo);

        await addTransferenciaIssues(repo);
    } catch (error) {
        console.error(
            `❌ Error in ${repo}:`,
            error.response?.data?.message || error.message,
        );
    }
}

async function runAll() {
    for (const repo of REPOSITORIES) {
        await automateProject(repo);
    }
    console.log("\n✨ All tasks finished!");
}

runAll();
