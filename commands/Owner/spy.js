const { inspect } = require("util");

exports.run = (client, message, [ugc], level) => {
  ugc = inspect(ugc, { depth: 0 });
  return message.channel.send(client.funcs.clean(client, ugc), { code: "js" });
};

exports.conf = {
    aliases: [],
    permLevel: "Bot Admin"
};
      
exports.help = {
    name: 'spy',
    category: "Owner",
    description: 'spy',
    usage: 'spy'
};