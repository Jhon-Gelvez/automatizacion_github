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
        title: "Actividades de apropiación del conocimiento.",
        tasks: [
            {
                title: "1. Explorando la asincronía básica",
                content: "**Ejercicio:** Escribe un código que imprima 'Inicio', luego una operación con setTimeout que tarde 2 segundos y finalmente 'Fin'.\n**Meta:** Que reconozcan el orden real de ejecución.",
            },
            {
                title: "2. Identificando código bloqueante",
                content: "**Ejercicio:** Crea un ciclo muy grande (por ejemplo, uno que cuente hasta millones) y observa cómo afecta la ejecución del programa.\n**Meta:** Evidenciar cómo una tarea pesada bloquea el hilo principal.",
            },
            {
                title: "3. Manejo de asincronía con Callbacks",
                content: "**Ejercicio:** Crear una función llamada `procesarPedido` que simule un pedido de comida con un setTimeout de 3 segundos y que reciba un callback para mostrar un mensaje final, por ejemplo: 'Pedido entregado'.\n**Meta:** Comprender la ejecución diferida.",
            },
            {
                title: "4. Encadenamiento de Callbacks (Callback Hell controlado)",
                content: "**Ejercicio:** Crear tres procesos consecutivos (por ejemplo: tomar datos → procesar datos → mostrar resultado), cada uno con un setTimeout, y enlazarlos mediante callbacks.\n**Meta:** Mostrar la complejidad que aparece cuando las tareas dependen unas de otras.",
            },
            {
                title: "5. Transformando Callbacks en Promesas",
                content: "**Ejercicio:** Convertir el ejercicio anterior en una estructura basada en Promesas con `.then()`.\n**Meta:** Visualizar cómo mejora la legibilidad.",
            },
            {
                title: "6. Manejo de errores con Promesas",
                content: "**Ejercicio:** Crear una promesa que simule un proceso que puede fallar 50% de las veces usando `resolve` y `reject`.\n**Meta:** Entender `.catch()` y la importancia del manejo de errores.",
            },
            {
                title: "7. Uso de Async/Await",
                content: "**Ejercicio:** Crear una función async que espere una promesa de 2 segundos y luego muestre el resultado.\n**Meta:** Comprender cómo await pausa la ejecución sin bloquear el hilo.",
            },
            {
                title: "8. Comparación práctica final - Integrador 1",
                content: "**Ejercicio integrador 1:**\nSimular un proceso de 'consulta de usuario', que requiere:\n1. 'Buscar usuario' (promesa de 1 segundo)\n2. 'Consultar permisos' (promesa de 2 segundos)\n3. 'Generar reporte final' (promesa de 1 segundo)\n\nRealizarlo en tres versiones: Con callbacks, Con promesas, Con async/await.\n**Meta:** Identificar ventajas y desventajas reales de cada técnica.",
            },
            {
                title: "9. Centro de Procesamiento de Órdenes - Integrador 2",
                content: "**Ejercicio integrador 2:**\nSimular un centro que procesa órdenes. Cada orden pasa por: verificación (1500ms), procesamiento (2000ms), registro (1000ms) y notificación (500ms).\n\n**Tareas:**\n1. Implementar el flujo de una orden usando callbacks (identificar callback hell).\n2. Reescribir usando promesas (validar claridad).\n3. Implementar con async/await (procesar en serie y luego en paralelo).\n\n**Meta:** Comparar tiempos, identificar tareas paralelas y explicar el event loop.",
            },
            {
                title: "10. Simulador de Consulta de Usuarios - Integrador 3",
                content: "**Ejercicio integrador 3:**\nSimular una aplicación que consulta: Datos básicos (1200ms), Seguridad (800ms) y Roles (2000ms), Registro final (600ms).\n\n**Tareas:**\n1. Construir versión bloqueante (demostración).\n2. Versión asincrónica con Promesas (secuencial por usuario, paralelo entre usuarios).\n3. Versión final con Async/Await midiendo tiempos reales.\n\n**Meta:** Reconstruir el flujo completo y validar que no se bloquee.",
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

        // 2. Create Ruleset (Updated with Bypass Actors)
        await rulset(repo);
        
        await createMilestone(repo);
        
        // 3. Create Milestones and their specific Issues
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
