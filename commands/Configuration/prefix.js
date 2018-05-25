const Guild = require("../models/guild.js");

exports.run = async (client, message, [prefix], level) => {
  if (!message.guild.member(message.author).hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry you are not an Administrator so you can't use this command. Administrators are the people who possess the `Manage_Server` permission.")
  if(!prefix) return message.reply("Mention a prefix!");
  try {
    await Guild.findByIdAndUpdate(message.guild.id, { prefix }, { upsert: true });
    message.channel.send(`Changed prefix to \`${prefix}\``);
  } catch(err) {
    console.error(err);
    message.reply("Something went wrong try again later");
  }
};

exports.conf = {
  aliases: [],
  permLevel: "User",
  guildOnly: true
};
      
exports.help = {
  name: 'prefix',
  category: "Config",
  description: 'Change prefix for your server.',
  usage: 'prefix <pre>'
};