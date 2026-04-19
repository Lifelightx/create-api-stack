import inquirer from "inquirer";

export async function askQuestions(defaultProjectName = "my-app") {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: defaultProjectName,
      validate: (input) => {
        if (!input.trim()) {
          return "Project name is required";
        }
        return true;
      }
    },
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
      default: true
    },
    {
      type: "confirm",
      name: "typescript",
      message: "Use TypeScript?",
      default: false
    }
  ]);

  return answers;
}