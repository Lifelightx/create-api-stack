import { askQuestions } from "./prompts.js";
import { generateProject } from "./generator.js";

const args = process.argv.slice(2);
const defaultProjectName = args[0] || "my-app";

const answers = await askQuestions(defaultProjectName);

await generateProject(answers.projectName, answers);