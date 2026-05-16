require("dotenv").config();

// Importar funciones y datos desde src
const { ruleset, createFirmaMilestone, inviteCollaborator, createNamingIssue, createMilestone, addIssue, addIssueText, createMilestoneText } = require("./src");

// 1. CONFIGURATION: Repositories
const REPOSITORIES = ["prueba_automatizacion"];

/**
 * Orquesta las operaciones de automatización para un repositorio
 * @param {string} repo - Nombre del repositorio
 */
async function automateProject(repo) {
    try {
        console.log(`\n🚀 Processing: ${repo}`);

        // Descomentar según sea necesario:
        // await ruleset(repo);
        // await inviteCollaborator(repo);
        // await createFirmaMilestone(repo);
        // await createNamingIssue(repo);
        // await addTransferenciaIssues(repo);
        // await createMilestone(repo, createMilestoneText);
    } catch (error) {
        console.error(
            `❌ Error in ${repo}:`,
            error.response?.data?.message || error.message,
        );
    }
}

/**
 * Ejecuta el proceso de automatización para todos los repositorios
 */
async function runAll() {
    for (const repo of REPOSITORIES) {
        await automateProject(repo);
    }
    console.log("\n✨ All tasks finished!");
}

runAll();
