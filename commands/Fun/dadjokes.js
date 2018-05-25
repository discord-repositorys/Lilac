const discord = require ("discord.js");
const { MessageEmbed } = require("discord.js");


exports.run = async (client, msg, args, level) => {

	 let sa = require ("superagent");

    let {body} = await sa
    .get(`https://icanhazdadjoke.com/slack`);

    let o = new MessageEmbed()
        .setColor(0xFFFFFF)
        .setDescription("**" + body.attachments.map(a => a.text) + "**")
    msg.channel.send(o)
	
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "dadjoke",
    description: "Get a dad joke.",
    category: "Fun",
    usage: "dadjoke"
  };
  