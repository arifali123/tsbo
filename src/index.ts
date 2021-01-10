#!/usr/bin/env node
import { prompt } from "inquirer";
import { readdir, copy } from "fs-extra";
import { join } from "path";
async function main() {
  let targetdir = "";
  if (!process.argv[2]) {
    targetdir = process.cwd();
  }
  targetdir = process.argv[2];
  const destination = join(process.cwd(), targetdir);
  console.log(destination);
  const { project } = await prompt([
    {
      type: "list",
      name: "project",
      choices: await readdir(join(__dirname, "../templates")),
    },
  ]);
  console.log(project);
  console.log(join(__dirname, "../templates", project));
  await copy(join(__dirname, "../templates", project), destination);
}
main();
