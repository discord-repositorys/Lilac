const Discord = require("discord.js");
const { MessageAttachment } = require("discord.js");
const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(await client.API.snapchat(args.join(' ')), 'snapchat.png'))
}
exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'snapchat',
    category: "Image Manipulation",
    description: 'Snapchat something',
    usage: 'shapchat <user>'
};