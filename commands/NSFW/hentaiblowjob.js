const Discord = require("discord.js");
const superagent = require("superagent");
const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args, level) => {
    
    let {body} = await superagent
    .get(`https://nekos.life/api/v2/img/blowjob`);
    if (!message.channel.nsfw) return message.reply("You must be in a N.S.F.W channel to use this command.");
  
    let hentaiEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Hentai")
    .setImage(body.url)
    .setFooter("Powered by nekos.life");


    message.channel.send(hentaiEmbed);

}

exports.conf = {
    aliases: [],
    permLevel: "User"
  };
    
  exports.help = {
    name: 'hentaiblowjob',
    category: "NSFW",
    description: 'Get a pic of hentai.',
    usage: 'hentaiblowjob'
  };