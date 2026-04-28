import inquirer from "inquirer";

// Validate project name helper
function validateProjectName(input) {
  const trimmed = input.trim();

  if (!trimmed) {
    return "Project name is required";
  }

  if (trimmed === ".") {
    return true; // Allow current directory
  }

  // No spaces, no special chars except - and _
  const validName = /^[a-zA-Z0-9_-]+$/.test(trimmed);
  if (!validName) {
    return "Project name can only contain letters, numbers, hyphens and underscores";
  }

  return true;
}

export async function askQuestions(passedName) {
  const questions = [];

  // Ask name only if not passed via CLI argument
  if (!passedName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-app",
      validate: validateProjectName
    });
  } else {
    // Validate the passed CLI argument too
    const validationResult = validateProjectName(passedName);
    if (validationResult !== true) {
      throw new Error(`Invalid project name "${passedName}": ${validationResult}`);
    }
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

  // Merge passed name into answers
  if (!answers.projectName) {
    answers.projectName = passedName;
  }

  return answers;
}