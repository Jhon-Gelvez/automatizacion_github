/**
 * Invita a un colaborador al repositorio
 */
const { octokit, REPO_OWNER } = require("./config");

const inviteCollaborator = async (repo, username = "falconsebas23-prog", permission = "push") => {
    await octokit.request("PUT /repos/{owner}/{repo}/collaborators/{username}", {
        owner: REPO_OWNER,
        repo: repo,
        username: username,
        permission: permission,
    });

    console.log(`✉️ Invitation sent to ${username}`);
};

module.exports = inviteCollaborator;
