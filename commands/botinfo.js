const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
const embed = new MessageEmbed()
.setColor(15400990)
.setThumbnail(client.user.avatarURL)
.setTitle("Bot Info")
.addField("Memory Usage", (process.memoryUsage().heapUsed / 2048 / 2048).toFixed(2) + "MB/2048MB")
.addField("Bot's Prefix: ", "d.", true)
.addField("Bot's ID: ", "435111581878059008", true)
.addField("Created by: ", "CyRIC#0847")
.addField("Bot's uptime: ", (Math.round(client.uptime / (1000 * 60 * 60 * 24)) % 30) + " days, " + (Math.round(client.uptime / (1000 * 60 * 60)) % 24) + " hours, " + (Math.round(client.uptime / (1000 * 60)) % 60) + " minutes, and " + (Math.round(client.uptime / 1000) % 60) + " seconds.")
//.addField("Shards running: ", client.shard.count, true)
//.addField("Shard ID: ", client.shard.id + 1, true)
//.addField("Shards Helping: ", (Math.round(client.guilds.size + 5)) + " servers.", true)
//.addField("Shards Helping: ", client.channels.size + " channels", true)
//.addField("Shards Helping: ", client.users.size + " users", true)
// ^ Dont need this again unless sharding and bots in 2,500 servers
.addField("Library: ", "Discord.js", true);
message.channel.send({embed})
}
exports.conf = {
    aliases: [],
    permLevel: "User"
};
  
  exports.help = {
    name: 'botinfo',
    category: "Info",
    description: 'Get info about the bot',
    usage: 'botinfo'
};