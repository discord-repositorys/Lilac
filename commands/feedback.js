var cooldownUsers = [];
const CyricID = "349674631260667925"
const Discord = require("discord.js");
const checkCooldown = ((userId) => {
    if (cooldownUsers.indexOf(userId) > -1) {
        return true;
    } else {
        return false;
    }
  });
  
  const removeCooldown = ((userId, timeInSeconds) => {
    let index = cooldownUsers.indexOf(userId);
    if (index > -1) {
        setTimeout(() => {
            cooldownUsers = cooldownUsers.splice(index, 0);
        }, timeInSeconds * 1000)
    }
  });
exports.run = async (client, message, args, level) => {
let feedback = args.join(' ');
if (feedback.length < 10) return message.reply('Feedback is to short minimum of 10 characters.').catch(console.error);
if (checkCooldown(message.author.id)) {
    message.channel.send("Sorry! Please wait another 60 mins to give more feedback but this is to prevent spamming of this feature.");
    return;
}
cooldownUsers.push(message.author.id);
removeCooldown(message.author.id, 3600);
client.users.get(CyricID).send("Cyric, a user has given feedback on the bot: " + feedback + " | Sent in by: " + message.author.username);
message.reply("Thanks for choosing to give feedback it has been sent!")
}


exports.conf = {
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: 'feedback',
    category: "Misc",
    description: 'Send some feedback to the devs.',
    usage: 'feedback <feedback>'
  };