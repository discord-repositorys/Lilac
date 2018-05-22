const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require("discord.js");
exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.API.wreckIt(message.mentions.users.first().displayAvatarURL({ format: "png", size: 128 })),
        "scare.png"));
    }



exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'scare',
    category: "Image Manipulation",
    description: 'Scare a kid!',
    usage: 'scare <user>'
};