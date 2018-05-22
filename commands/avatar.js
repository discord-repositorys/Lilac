const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to get their avatar. :x:').catch(console.error);
    const embed = new MessageEmbed()
        .setDescription('Here is the avatar for,' + user.username)
        .setImage(user.avatarURL)
        .setColor(15400990)
    message.channel.send(embed)
};

exports.conf = {
  aliases: [],
  permLevel: "User"
};
  
exports.help = {
  name: 'avatar',
  category: "Misc",
  description: 'Get someones avatar.',
  usage: 'avatar'
};