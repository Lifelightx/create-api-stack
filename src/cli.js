import { askQuestions } from "./prompts.js";
import { generateProject } from "./generator.js";

const args = process.argv.slice(2);
const projectNameArg = args[0] || null;

try {
  const answers = await askQuestions(projectNameArg);
  await generateProject(answers.projectName, answers);
} catch (error) {
  console.error(`\n Error: ${error.message}`);
  process.exit(1);
}