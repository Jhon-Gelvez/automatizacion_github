/**
 * Crea un issue para nombrar el proyecto
 */
const { octokit, REPO_OWNER } = require("./config");

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

module.exports = createNamingIssue;
