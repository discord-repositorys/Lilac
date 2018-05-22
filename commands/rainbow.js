const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require("discord.js");
exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.API.rainbow(message.mentions.users.first().displayAvatarURL({ format: "png", size: 128 })),
        "bobross.png"));
    }



exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'rainbow',
    category: "Image Manipulation",
    description: 'Put a rainbow on someones profile picture',
    usage: 'rainbow <user>'
};