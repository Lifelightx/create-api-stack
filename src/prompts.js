// src/prompts.js
import inquirer from "inquirer";

export async function askQuestions(passedName) {
  const questions = [];

  // Only ask for project name if it wasn't passed as a CLI argument
  if (!passedName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-app",
      validate: (input) => {
        if (!input.trim()) {
          return "Project name is required";
        }
        return true;
      }
    });
  }

  questions.push(
    {
      type: "rawlist",
      name: "db",
      message: "Choose database:",
      choices: [
        { name: "MongoDB", value: "mongo" },
        { name: "PostgreSQL", value: "postgres" }
      ],
      default: 0
    },
    {
      type: "confirm",
      name: "docker",
      message: "Include Docker?",
      default: false
    },
    {
      type: "confirm",
      name: "typescript",
      message: "Use TypeScript?",
      default: false
    }
  );

  const answers = await inquirer.prompt(questions);

  // If we didn't ask for the name, add the passed name to the answers object
  if (!answers.projectName) {
    answers.projectName = passedName;
  }

  return answers;
}
