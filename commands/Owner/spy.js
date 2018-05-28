const { inspect } = require("util");

exports.run = (client, message, [ugc], level) => {
  ugc = inspect(ugc, { depth: 0 });
  return message.channel.send(clean(client, ugc), { code: "js" });
};

function clean(text)  {
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  }


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