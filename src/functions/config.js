/**
 * Configuración compartida y utilidades globales
 */
const { Octokit } = require("octokit");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const REPO_OWNER = process.env.GITHUB_USER;

// Leer el template para usar en issues
const templatePath = path.join(__dirname, "../..", "feature_request.md");
const templateBody = fs.readFileSync(templatePath, "utf8");
const placeholder = "{{CONTENT_PLACEHOLDER}}";

module.exports = {
    octokit,
    REPO_OWNER,
    templateBody,
    placeholder,
};
