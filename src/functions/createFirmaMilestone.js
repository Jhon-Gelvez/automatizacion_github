/**
 * Crea un milestone de firma de contrato con issues asociados
 */
const { octokit, REPO_OWNER } = require("./config");

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
            labels: ["documentation"],
        });

        console.log(`   📌 Issue creado: ${title}`);
    }
};

module.exports = createFirmaMilestone;
