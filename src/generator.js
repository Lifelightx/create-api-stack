import fs from "fs-extra";
import path from "path";
import { execa } from "execa";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateProject(name, options) {
  const templateName = options.db === "mongo" ?
    (options.typescript ? "mongo-ts" : "mongo-js")
    : (options.typescript ? "postgres-ts" : "postgres-js");

  const templatePath = path.join(__dirname, "..", "templates", templateName);

  const isCurrentDir = name === ".";
  const projectName = isCurrentDir ? path.basename(process.cwd()) : name;
  const targetPath = isCurrentDir ? process.cwd() : path.join(process.cwd(), name);

  if (!isCurrentDir && await fs.pathExists(targetPath)) {
    throw new Error(`Folder "${name}" already exists`);
  }

  await fs.copy(templatePath, targetPath, {
    overwrite: true,
    filter: (src) => !src.includes("node_modules")
  });

  if (!options.docker) {
    await fs.remove(path.join(targetPath, "Dockerfile"));
    await fs.remove(path.join(targetPath, "docker-compose.yml"));
    await fs.remove(path.join(targetPath, ".dockerignore"));
  }

  const packageJsonPath = path.join(targetPath, "package.json");

  if (await fs.pathExists(packageJsonPath)) {
    const pkg = await fs.readJson(packageJsonPath);

    pkg.name = projectName.toLowerCase().replace(/\s+/g, "-");
    pkg.version = "1.0.0";

    await fs.writeJson(packageJsonPath, pkg, { spaces: 2 });
  }

  console.log("Installing packages...");

  try {
    await execa("npm", ["install"], {
      cwd: targetPath,
      stdio: "inherit"
    });
  } catch (error) {
    console.error("Failed to install packages. You may need to run 'npm install' manually.");
  }

  console.log(`Project ${projectName} created successfully.`);

  const { startDev } = await inquirer.prompt([
    {
      type: "confirm",
      name: "startDev",
      message: "Start development server now?",
      default: true
    }
  ]);

  if (startDev) {
    await execa("npm", ["run", "dev"], {
      cwd: targetPath,
      stdio: "inherit"
    });
  } else {
    console.log(`Next steps:`);
    if (!isCurrentDir) console.log(`cd ${name}`);
    console.log(`npm run dev`);
  }
}