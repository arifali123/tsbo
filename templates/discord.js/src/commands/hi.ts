import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
export default class GlobalCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      description: "Says hi",
      group: "hi",
      memberName: "hi",
      name: "hi",
    });
  }
  async run(message: CommandoMessage) {
    return message.say("hi");
  }
}
