const Discord = require("discord.js");
const { MessageAttachment } = require("discord.js");
const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.API.batSlap(message.author.displayAvatarURL({ format: "png", size: 128 }),
          message.mentions.users.first().displayAvatarURL({ format: "png", size: 128 })),
        "batslap.png"));
}
exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'batslap',
    category: "Image Manipulation",
    description: 'Bat-slap someone',
    usage: 'batslap <user>'
};