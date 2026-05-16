/**
 * Crea un ruleset para proteger ramas principales
 */
const { octokit, REPO_OWNER } = require("./config");

const ruleset = async (repo) => {
    await octokit.request("POST /repos/{owner}/{repo}/rulesets", {
        owner: REPO_OWNER,
        repo: repo,
        name: "Blindaje Develop y Main",
        target: "branch",
        enforcement: "active",
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
            { type: "non_fast_forward" },
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

module.exports = ruleset;
