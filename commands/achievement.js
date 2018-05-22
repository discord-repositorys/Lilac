const Discord = require("discord.js");
const superagent = require('superagent')


exports.run = async (client, message, args, level) => {
  const text = args.join(" ");
  if (text === null) return message.channel.send("You need to provide text for the achievement");
  if (text.length > 25) return message.reply('Text must be under 25 characters.');
  const { body } = await superagent
    .get('https://www.minecraftskinstealer.com/achievement/a.php')
    .query({
        i: 1,
        h: 'Achievement Get!',
        t: text
    });
  return message.channel.send({
    files: [{
      attachment: body,
      name: 'achievement.png'
    }]
  });
}

exports.conf = {
  aliases: [],
  permLevel: "User"
};
  
exports.help = {
  name: 'achievement',
  category: "Fun",
  description: 'Make a minecraft achievement.',
  usage: 'achievement <text>'
};