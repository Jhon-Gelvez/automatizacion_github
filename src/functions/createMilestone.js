/**
 * Crea milestones con sus issues asociados usando el template
 */
const { octokit, REPO_OWNER, templateBody, placeholder } = require("./config");

const createMilestone = async (repo, milestonesData) => {
    for (const item of milestonesData) {
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
                headers: {
                    "X-GitHub-Api-Version": "2026-03-10",
                },
            });

            console.log(`   📌 Issue created: ${task.title}`);
        }
    }
};

module.exports = createMilestone;
