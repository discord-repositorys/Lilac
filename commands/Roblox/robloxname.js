const Discord = require('discord.js')
const request = require('request')
const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args, level) => {
  let link = `https://www.roblox.com/UserCheck/DoesUsernameExist?username=${args[0]}`;
  request(link, function (error, response, body) {
    if(body.includes("false")) {
      const embed = new Discord.MessageEmbed()
        .setTitle('ROBLOX Notification')
        .setAuthor("ROBLOX", client.user.avatarURL)
        .setDescription(`${args[0]} -> Avaliable!`)
        .setColor(0xFF0000)
        .setThumbnail(client.user.avatarURL)
      message.channel.send(embed);
    }else if(body.includes("true")) {
      const embed = new Discord.MessageEmbed()
        .setTitle('ROBLOX Notification')
        .setAuthor("ROBLOX", client.user.avatarURL)
        .setDescription(`${args[0]} -> Unavaliable!`)
        .setColor(0xFF0000)
        .setThumbnail(client.user.avatarURL)
      message.channel.send(embed);
    }
  });
};

exports.conf = {
    aliases: [],
    permLevel: "User"
  };
    
  exports.help = {
    name: 'robloxname',
    category: "Roblox",
    description: 'See if you can take a roblox account.',
    usage: 'roblox name'
  };