const Discord = require("discord.js");
const { MessageAttachment } = require("discord.js");
const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(await client.API.blame(args.join(' ')), 'blame.png'))
}
exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'blame',
    category: "Image Manipulation",
    description: 'blame someone',
    usage: 'blame <user>'
};