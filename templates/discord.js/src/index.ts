import { CommandoClient } from "discord.js-commando";
require("dotenv").config();
import { join } from "path";
const client = new CommandoClient({
  owner: process.env.BOT_OWNER,
  commandPrefix: process.env.BOT_PREFIX,
});
client.registry
  .registerDefaults()
  .registerGroups([["hi"]])
  .registerCommandsIn({
    filter: /^([^.].*)\.(js|ts)$/,
    dirname: join(__dirname, "commands"),
  });

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});
client.login(process.env.BOT_TOKEN);
