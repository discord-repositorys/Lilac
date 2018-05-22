const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.delete();
    const embed = new MessageEmbed()
        .setColor(15400990)
        .setDescription(`**${message.author.username}** says ` + (args.join(' ')))
    message.channel.send({embed})
}
exports.conf = {
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: 'say',
    category: "Misc",
    description: 'Say something as the bot',
    usage: 'say <message>'
  };
