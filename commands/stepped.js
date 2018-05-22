const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require("discord.js");
exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.API.stepped(message.mentions.users.first().displayAvatarURL({ format: "png", size: 128 })),
        "facepalm.png"));
    }



exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'stepped',
    category: "Image Manipulation",
    description: 'Step in something',
    usage: 'stepped <user>'
};