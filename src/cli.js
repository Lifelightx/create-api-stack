// src/cli.js
import { askQuestions } from "./prompts.js";
import { generateProject } from "./generator.js";

const args = process.argv.slice(2);
const projectNameArg = args[0]; // Could be '.', 'my-app', or undefined

const answers = await askQuestions(projectNameArg);
await generateProject(answers.projectName, answers);
