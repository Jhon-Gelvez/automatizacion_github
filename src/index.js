/**
 * Barril de importaciones - Centraliza todos los módulos
 * Facilita la importación de funciones y datos desde app.js
 */

// Funciones
const ruleset = require("./functions/ruleset");
const createFirmaMilestone = require("./functions/createFirmaMilestone");
const inviteCollaborator = require("./functions/inviteCollaborator");
const createNamingIssue = require("./functions/createNamingIssue");
const createMilestone = require("./functions/createMilestone");
const addIssue = require("./functions/addIssue");

// Datos
const addIssueText = require("./data/addIssueText");
const createMilestoneText = require("./data/createMilestoneText");

module.exports = {
    // Funciones
    ruleset,
    createFirmaMilestone,
    inviteCollaborator,
    createNamingIssue,
    createMilestone,
    addIssue,

    // Datos
    addIssueText,
    createMilestoneText,
};
