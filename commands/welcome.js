const Guild = require("../models/guild.js");

exports.run = async(client, message, [action, ...args], level) => {
  if(!message.member.permissions.has("MANAGE_SERVER")) return message.reply("You need `Manage Server` Permissions to use this!");
  if(!action) return message.reply(`Specify the action! \`${message.prefix}welcome enable <message>\` or \`${message.prefix}welcome off\`\nYou may use placeholders that is replaced on send time, available placeholders:\n{{user}} - Mention user\n{{server}} - The server name\n{{count}} - member count\nExample: \`${message.prefix}welcome enable Welcome {{user}} to {{server}}, we now have {{count}} members!\``);
  switch(action.toLowerCase()) {
    case "enable": {
      if(!args.length || !(message.mentions.channels.first())) {
        message.reply("You must provide a channel and message to use");
        break;
      }
      const chan = message.mentions.channels.first();
      const msg = args.slice(1).join(" ");
      if(!msg) return message.reply("Mention a message to use!");
      try {
        await Guild.findByIdAndUpdate(message.guild.id, { welcomeMessage: msg, welcomeChannel: chan.id });
        message.reply("Welcome message set!");
      } catch(err) {
        message.reply("Something went wrong, try again later.");
        client.logger.error(err);
      }
      break;
    } case "off": {
      try {
        const g = await Guild.findByIdAndUpdate(message.guild.id, { welcomeChannel: "null" });
        if(!g || g.welcomeChannel === "null") return message.reply("Welcome is not enabled for this server!");
        return message.reply("Welcome turned off successfully!");
      } catch(err) {
        message.reply("Something went wrong try again later.");
        client.logger.error(err);
      }
      break;
    }
    default: {
      return message.reply(`Invalid action, usage: \`${message.prefix}welcome enable <message>\` or \`${message.prefix}welcome off\`\nYou may use placeholders that is replaced on send time, available placeholders:\n{{user}} - Mention user\n{{server}} - The server name\n{{count}} - member count\nExample: \`${message.prefix}welcome enable Welcome {{user}} to {{server}}, we now have {{count}} members!\``);
    }
  }
};


exports.conf = {
  permLevel: "User",
  guildOnly: true,
  aliases: ["join", "joinmessage", "welcomemessage"]
};

exports.help = {
  name: "welcome",
  usage: "welcome <off|on> [msg]",
  description: "Enabled/Disable welcome messages for this server",
  category: "Config"
};