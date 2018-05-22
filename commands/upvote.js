exports.run = (client, message, args, level) => {
    message.channel.send("Like my features? To show that you do please upvote me here! https://discordbots.org/bot/435111581878059008")
}

exports.conf = {
    aliases: [],
    permLevel: "User"
  };
    
  exports.help = {
    name: 'upvote',
    category: "Misc",
    description: 'Upvote me on dbl.',
    usage: 'upvote'
  };