const ms = require("ms");
exports.run = function(client, message, args, level) {
if(!message.member.permissions.has("MANAGE_SERVER")) return message.reply("You need `Manage Server` Permissions to use this!");
  try {
    let time = args[0];
    if (!time) return client.embed(message, client.hex, "Invalid Exception:", "Please specify a time for the giveaway!");
    if (ms(time) <= 0) return client.embed(message, client.hex, "Invalid Exception:", "Please specify a realistic time.");
    if (ms(time) > client.settings.weekOverflow) return client.embed(message, client.hex, "Invalid Exception:", "Time overflow detected, please provide a time that's less than a week. \nThis will be improved with database storage in the future for longer times.");
    if (Math.floor(ms(time)) <= 0) return client.embed(message, client.hex, "Invalid Exception:", "Please specify a realistic time.");
    let amountOfWinners = args[1];
    if (isNaN(amountOfWinners)) return client.embed(message, client.hex, "Invalid Exception:", "Please specify a number for amount of winners.");
    if (amountOfWinners < 1) return client.embed(message, client.hex, "Invalid Exception:", "Please specify an amount of winners, that's larger than or equal to 1.");
    let prize = args.slice(2).join(" ");
    if (!prize) return client.embed(message, client.hex, "Invalid Exception:", "Please specify a prize that the user will win from the giveaway.");
    returnReactionUsers(client, message, amountOfWinners, time, prize);
  }catch (error){
    console.log(error)
  }
};

exports.conf = {
  aliases: [],
  permLevel: "User"
};
  
exports.help = {
  name: 'giveaway',
  description: 'Starts a giveaway with specific arguments.',
  usage: 'giveaway [time] [number of winners] [prize]'
};

function returnReactionUsers(client, message, amountOfWinners, amountOfTime, giveawayItem) {
  if (!amountOfWinners || amountOfWinners < 1) throw new Error("Invalid amount of winners.");
  message.channel.send("React with the :tada: emoji to enter the giveaway:", {embed: {
    author: {name: client.user.tag, icon_url: client.user.avatarURL},
    color: 0xff0000,
    title: `Giving away: **${giveawayItem.toString()}**`,
    description: `• This giveaway is going on for ${ms(ms(amountOfTime), {long: true})} \n• There can be only ${amountOfWinners} winner(s)!`,
    timestamp: new Date()
  }}).then(function(message) {
    setTimeout(function() {
      if (message.reactions.filter(r => r.emoji.toString() == "🎉").size == 0) {
        return message.edit("", {embed: {
          author: {name: client.user.tag, icon_url: client.user.avatarURL},
          color: 0xff0000,
          title: `Giveaway ended for: **${giveawayItem.toString()}**`,
          description: `Nobody voted with the designated emoji!`,
          timestamp: new Date()
        }});
      }
      message.reactions.filter(reaction => reaction.emoji.toString() == "🎉").map(function(r) {
        var selectedUsers = r.users.random(parseInt(amountOfWinners));
        if (r.users.size < amountOfWinners) selectedUsers = r.users.random(r.users.size);
        message.edit("", {embed: {
          author: {name: client.user.tag, icon_url: client.user.avatarURL},
          color: 0xff0000,
          title: `Giveaway ended for: **${giveawayItem.toString()}**`,
          description: `Winners: ${selectedUsers}`,
          timestamp: new Date()
        }});
      });
    }, ms(amountOfTime));
  }).catch(error => console.error(error));
}