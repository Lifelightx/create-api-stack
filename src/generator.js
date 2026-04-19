import fs from "fs-extra";
import path from "path";
import { execa } from "execa";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateProject(name, options) {
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    options.db
  );

  const targetPath = path.join(process.cwd(), name);

  if (await fs.pathExists(targetPath)) {
    throw new Error(`Folder "${name}" already exists`);
  }

  await fs.copy(templatePath, targetPath);

  const packageJsonPath = path.join(targetPath, "package.json");

  if (await fs.pathExists(packageJsonPath)) {
    const pkg = await fs.readJson(packageJsonPath);

    pkg.name = name.toLowerCase().replace(/\s+/g, "-");
    pkg.version = "1.0.0";

    await fs.writeJson(packageJsonPath, pkg, { spaces: 2 });
  }

  console.log("Installing packages...");

  await execa("npm", ["install"], {
    cwd: targetPath,
    stdio: "inherit"
  });

  console.log(`Project ${name} created successfully.`);

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
    console.log(`Next steps:
cd ${name}
npm run dev`);
  }
}