require("dotenv").config();
const { Octokit } = require("octokit");
const path = require("path");
const fs = require("fs");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const REPO_OWNER = process.env.GITHUB_USER;

// 1. CONFIGURATION: Repositories and Milestone Mapping
const REPOSITORIES = [""];

const milestones = [
    {
        title: "Firmar contrato.",
        tasks: [
            {
                title: "Parte 1 - Solicitudes de consulta (GET)",
                content: "• Solicitud 1: Realice una solicitud GET para obtener la lista completa de usuarios disponibles en el servicio.\n• Solicitud 2: Realice una solicitud GET para consultar la información de un usuario específico, utilizando su identificador.\n• Solicitud 3: Realice una solicitud GET para obtener todas las publicaciones (posts) asociadas a un usuario determinado.",
            },
            {
                title: "Parte 2 - Creación de información (POST)",
                content: "• Solicitud 4: Realice una solicitud POST para crear una nueva publicación asociada a un usuario existente. Incluya información como título y contenido.\n• Solicitud 5: Realice una solicitud POST para registrar un nuevo comentario relacionado con una publicación.",
            },
        ],
    },
    {
        title: "Actividades de transferencia del conocimiento.",
        tasks: [
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
    const { data: milestone } = await octokit.request("POST /repos/{owner}/{repo}/milestones", {
        owner: REPO_OWNER,
        repo: repo,
        title: "Firma Contrato",
        state: "open",
    });

    console.log(`📂 Milestone 'Firma Contrato' creado.`);

    // 2. Datos en crudo para las issues
    const issuesContrato = ["[DOCS]: Firma de contrato - Jhon Sebastian Falcon Ruiz", "[DOCS]: Firma de contrato - Jhon Jairo Gelvez Gomez"];

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
    await octokit.request("PUT /repos/{owner}/{repo}/collaborators/{username}", {
        owner: REPO_OWNER,
        repo: repo,
        username: "falconsebas23-prog",
        permission: "push",
    });

    console.log(`✉️ Invitation sent`);
};

const createMilestone = async (repo) => {
    for (const item of milestones) {
        // Create the Milestone
        const { data: milestone } = await octokit.request("POST /repos/{owner}/{repo}/milestones", {
            owner: REPO_OWNER,
            repo: repo,
            title: item.title,
            state: "open",
        });

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
            });

            console.log(`   📌 Issue created: ${task.title}`);
        }
    }
};

async function automateProject(repo) {
    try {
        console.log(`\n🚀 Processing: ${repo}`);

        // 1. Create Ruleset (Updated with Bypass Actors)
        await rulset(repo);

        await inviteCollaborator(repo)

        // 2. Create Milsitone signed contract
        await createFirmaMilestone(repo);

        // 3. Create Milestones and their specific Issues
        await createMilestone(repo);
    } catch (error) {
        console.error(`❌ Error in ${repo}:`, error.response?.data?.message || error.message);
    }
}

async function runAll() {
    for (const repo of REPOSITORIES) {
        await automateProject(repo);
    }
    console.log("\n✨ All tasks finished!");
}

runAll();
