const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
message.channel.send("https://discordapp.com/oauth2/authorize?client_id=435111581878059008&scope=bot&permissions=8");
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "invite",
    category: "Misc",
    description: "invite the bot!",
    usage: "invite"
  };