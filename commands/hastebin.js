const hastebin = require('hastebin-gen');
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
exports.run = (client, message, args, level) => {
  hastebin(args.join(' '), "js").then(r => {
      var hastLink = r
      const hastEmb = new MessageEmbed()
      .setColor(0xFFF000)

      .setURL(hastLink)
      .addField('Link: ', `${hastLink}`)
       message.channel.send({embed: hastEmb})
  }).catch(console.error);  
}

exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'hastebin',
    category: "Misc",
    description: 'hastebin something',
    usage: 'hastebin <text>'
};