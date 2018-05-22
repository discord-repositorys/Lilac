const Discord = require("discord.js");
const { MessageAttachment } = require("discord.js");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.API.pls((message.mentions.members.first() || message.member).displayName),
        "pls.png"));
    }
exports.conf = {
    aliases: [],
    permLevel: "User"
};
          
exports.help = {
    name: 'pls',
    category: "Image Manipulation",
    description: 'pls someone',
    usage: 'pls <user>'
};