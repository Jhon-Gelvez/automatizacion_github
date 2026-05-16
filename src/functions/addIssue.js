/**
 * Añade issues a un milestone existente
 */
const { octokit, REPO_OWNER, templateBody, placeholder } = require("./config");

const addIssue = async (repo, matchMilestone, contentIssueList) => {
    const { data: allMilestones } = await octokit.request("GET /repos/{owner}/{repo}/milestones", {
        owner: REPO_OWNER,
        repo: repo,
        state: "all",
    });

    // 1. Find the milestone in GitHub (using the name as it appears there)
    const targetMilestone = allMilestones.find((m) => m.title.trim() === matchMilestone);

    if (!targetMilestone) {
        console.error("❌ Milestone not found try checking your spelling");
        return;
    }

    console.log(`📂 Found Milestone: ${targetMilestone.title} (ID: ${targetMilestone.number})`);

    // 2. Add each issue to the milestone
    for (const item of contentIssueList) {
        const finalBody = templateBody.replace(placeholder, item.content);

        await octokit.request("POST /repos/{owner}/{repo}/issues", {
            owner: REPO_OWNER,
            repo: repo,
            title: `[FEAT]: ${item.title}`,
            body: finalBody,
            milestone: targetMilestone.number,
            labels: ["enhancement"],
            headers: {
                "X-GitHub-Api-Version": "2026-03-10",
            },
        });
        console.log(`   📌 Issue added: ${item.title}`);
    }
};

module.exports = addIssue;
