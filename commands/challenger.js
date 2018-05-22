const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require("discord.js");
exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.API.challenger(message.mentions.users.first().displayAvatarURL({ format: "png", size: 128 })),
        "challenger.png"));
    }



exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'challenger',
    category: "Image Manipulation",
    description: 'Make someone a challenger',
    usage: 'challenger <user>'
};