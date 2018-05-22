const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require("discord.js");
exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.API.wanted(message.mentions.users.first().displayAvatarURL({ format: "png", size: 128 })),
        "wanted.png"));
    }



exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'wanted',
    category: "Image Manipulation",
    description: 'Make a wanted poster of someone!',
    usage: 'wanted <user>'
};