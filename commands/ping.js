const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const Discord = require("discord.js");
  const embed = new MessageEmbed()
  .setColor(15400990)
  .setDescription(`:ping_pong: Pong! Time - **${Date.now() - message.createdTimestamp}ms** API Latency is **${Math.round(client.ping)}ms**`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Misc",
  description: "Pong!",
  usage: "ping"
};