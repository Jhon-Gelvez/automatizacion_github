# Estructura de `src/`

Este directorio contiene toda la lógica modular del proyecto de automatización de GitHub.

## 📁 Estructura

```
src/
├── index.js                  # Barril - Archivo centralizado de exportaciones
├── functions/               # Funciones modulares
│   ├── config.js           # Configuración compartida (octokit, REPO_OWNER, templates)
│   ├── ruleset.js          # Crear rulesets de protección en ramas
│   ├── createFirmaMilestone.js  # Crear milestone de firma de contrato
│   ├── inviteCollaborator.js    # Invitar colaboradores
│   ├── createNamingIssue.js     # Crear issue de nombrado del proyecto
│   ├── createMilestone.js       # Crear milestones con issues asociados
│   └── addIssue.js              # Añadir issues a milestone existente
└── data/                    # Arrays de datos (fáciles de editar)
    ├── addIssueText.js      # Array para issues a añadir
    └── createMilestoneText.js # Array para crear milestones
```

## 🔄 Cómo usar desde `app.js`

```javascript
const { ruleset, createFirmaMilestone, inviteCollaborator, createNamingIssue, createMilestone, addIssue, addIssueText, createMilestoneText } = require("./src");

// Usar las funciones
await ruleset(repo);
await createMilestone(repo, createMilestoneText);
await addIssue(repo, "Milestone Name", addIssueText);
```

## 📝 Modularidad

- **Cada función es independiente** y recibe solo los parámetros que necesita
- **config.js** centraliza la configuración compartida (octokit, REPO_OWNER, templates)
- **Arrays de datos** están separados para fácil edición sin tocar código
- **index.js** actúa como punto único de importación

## 🛠️ Editar datos

Para editar el contenido de issues y milestones, edita directamente:

- `src/data/addIssueText.js` - Issues a añadir
- `src/data/createMilestoneText.js` - Milestones con sus tasks

## 🔧 Editar funciones

Cada función está en un archivo separado bajo `src/functions/` para facilitar el mantenimiento.
