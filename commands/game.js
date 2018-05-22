const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
        if (message.author.id == "349674631260667925") {
            var argresult = args.join(' ');
            if (!argresult) argresult = null;
            client.user.setGame(argresult);
            message.reply("Game changed");
        } else {
            message.reply("Bot creator only! :x:");
        }

}

exports.conf = {
    aliases: [],
    permLevel: "Bot admin"
  };
  
  exports.help = {
    name: 'game',
    category: "Owner",
    description: 'Sets the bots playing status',
    usage: 'game <game>'
  };