exports.run = (client, message, args) => {
    const cleverbot = require("cleverbot.io");
    const clever = new cleverbot(process.env.CLEVERBOT_USER, process.env.CLEVERBOT_APIKEY);
    message.channel.startTyping();
    clever.setNick("Lilac");
    clever.create(function(err, session) {
        clever.ask(args.join(' '), function(err, res) {
            message.channel.send(res);
            message.channel.stopTyping();
        });
    });
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "cleverbot",
    category: "Fun",
    description: "cleverbot.",
    usage: "cleverbot"
  };
