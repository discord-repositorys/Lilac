const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require("discord.js");
exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.API.beautiful(message.mentions.users.first().displayAvatarURL({ format: "png", size: 128 })),
        "beautiful.png"));
    }



exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'beautiful',
    category: "Image Manipulation",
    description: 'Make someone beautiful',
    usage: 'beautiful <user>'
};