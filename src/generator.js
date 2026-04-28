import fs from "fs-extra";
import path from "path";
import { execa } from "execa";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateProject(name, options) {
  //   Step 1: Build template name
  const templateName = options.db === "mongo"
    ? (options.typescript ? "mongo-ts" : "mongo-js")
    : (options.typescript ? "postgres-ts" : "postgres-js");

  const templatePath = path.join(__dirname, "..", "templates", templateName);

  //   Step 2: Validate template exists
  if (!(await fs.pathExists(templatePath))) {
    throw new Error(
      `Template "${templateName}" not found at path: ${templatePath}`
    );
  }

  //   Step 3: Resolve target path
  const isCurrentDir = name === ".";
  const projectName = isCurrentDir
    ? path.basename(process.cwd())
    : name;
  const targetPath = isCurrentDir
    ? process.cwd()
    : path.join(process.cwd(), name);

  //   Step 4: Check if folder already exists (only for named projects)
  if (!isCurrentDir && (await fs.pathExists(targetPath))) {
    throw new Error(`Folder "${name}" already exists. Choose a different name.`);
  }

  //   Step 5: Copy template to target
  console.log(`\n Creating project in: ${targetPath}\n`);

  try {
    await fs.copy(templatePath, targetPath, {
      overwrite: true,
      filter: (src) => !src.includes("node_modules")
    });
  } catch (err) {
    throw new Error(`Failed to copy template files: ${err.message}`);
  }

  //   Step 6: Remove docker files if not needed
  if (!options.docker) {
    await fs.remove(path.join(targetPath, "Dockerfile"));
    await fs.remove(path.join(targetPath, "docker-compose.yml"));
    await fs.remove(path.join(targetPath, ".dockerignore"));
  }

  //   Step 7: Auto copy .env.example to .env if it exists
  const envExamplePath = path.join(targetPath, ".env.example");
  const envPath = path.join(targetPath, ".env");

  if ((await fs.pathExists(envExamplePath)) && !(await fs.pathExists(envPath))) {
    await fs.copy(envExamplePath, envPath);
    console.log(" Created .env from .env.example");
  }

  //   Step 8: Update package.json name and version
  const packageJsonPath = path.join(targetPath, "package.json");

  if (await fs.pathExists(packageJsonPath)) {
    const pkg = await fs.readJson(packageJsonPath);
    pkg.name = projectName.toLowerCase().replace(/\s+/g, "-");
    pkg.version = "1.0.0";
    await fs.writeJson(packageJsonPath, pkg, { spaces: 2 });
  } else {
    //   If no package.json exists after copy, something is wrong
    throw new Error(
      `package.json not found in template "${templateName}". Template may be broken.`
    );
  }

  //   Step 9: Install packages
  console.log(" Installing packages...\n");

  let installSuccess = false;

  try {
    await execa("npm", ["install"], {
      cwd: targetPath,
      stdio: "inherit"
    });
    installSuccess = true;
    console.log("\n  Packages installed successfully.");
  } catch (error) {
    console.error("\n Failed to install packages automatically.");
    console.error(`   You can install manually:\n   cd ${name}\n   npm install`);
  }

  console.log(`\n  Project "${projectName}" created successfully!\n`);

  //   Step 10: Ask to start dev server ONLY if install succeeded
  if (installSuccess) {
    const { startDev } = await inquirer.prompt([
      {
        type: "confirm",
        name: "startDev",
        message: "Start development server now?",
        default: true
      }
    ]);

    if (startDev) {
      console.log("\n Starting development server...\n");
      try {
        await execa("npm", ["run", "dev"], {
          cwd: targetPath,
          stdio: "inherit"
        });
      } catch (err) {
        console.error(`\n Failed to start dev server: ${err.message}`);
        console.error(`   Try manually:\n   cd ${name}\n   npm run dev`);
      }
    } else {
      printNextSteps(name, isCurrentDir);
    }
  } else {
    //   If install failed, show manual steps
    printNextSteps(name, isCurrentDir);
  }
}

//   Helper to print next steps
function printNextSteps(name, isCurrentDir) {
  console.log(" Next steps:");
  if (!isCurrentDir) console.log(`   cd ${name}`);
  console.log("   npm install");
  console.log("   npm run dev");
  console.log("");
}