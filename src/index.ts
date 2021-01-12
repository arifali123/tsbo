#!/usr/bin/env node
import { prompt } from "inquirer";
import {
  readdir,
  copy,
  createWriteStream,
  readFileSync,
  writeFile,
} from "fs-extra";
import { join } from "path";
import { promisify } from "util";
import gitignore from "gitignore";
import { projectInstall } from "pkg-install";
import { bold, green } from "chalk";
const wgitignore = promisify(gitignore.writeFile);
async function main() {
  let targetdir = "";
  if (!process.argv[2]) {
    targetdir = process.cwd();
  }
  targetdir = process.argv[2];
  const destination = join(process.cwd(), targetdir);
  console.log(destination);
  const tempdir = join(__dirname, "../templates");
  const { project } = await prompt([
    {
      type: "list",
      name: "project",
      choices: await readdir(tempdir),
    },
  ]);
  const projectdir = join(tempdir, project);
  await copy(projectdir, destination);
  wgitignore({
    type: "Node",
    file: createWriteStream(join(destination, ".gitignore"), { flags: "a" }),
  });
  await projectInstall({ cwd: destination });
  const targetpkg = join(destination, "package.json");
  let contents = JSON.parse(readFileSync(targetpkg).toString());
  contents.name = targetdir;
  await writeFile(targetpkg, JSON.stringify(contents, null, 2));
  console.log(
    bold(
      green(
        `Success Project Created\nProject Name: ${targetdir}\nTemplate Used: ${project}`
      )
    )
  );
}
main();
