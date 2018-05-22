const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require("discord.js");
exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.API.respect(message.mentions.users.first().displayAvatarURL({ format: "png", size: 128 })),
        "respect.png"));
    }



exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'respect',
    category: "Image Manipulation",
    description: 'respect',
    usage: 'respect <user>'
};