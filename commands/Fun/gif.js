const { MessageEmbed } = require("discord.js");
const gifSearch = require("gif-search");
exports.run = (client, message, args, level) => {

      gifSearch.random(args[0]).then(
          gifUrl => {
  
          let randomcolor = ((1 << 24) * Math.random() | 0).toString(16) //Optional
          var embed = new MessageEmbed()
              .setColor(`#${randomcolor}`)
              .setImage(gifUrl)
          message.channel.send(embed);
      });
    }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "gif",
    description: "Search for a gif.",
    category: "Fun",
    usage: "gif"
  };
  