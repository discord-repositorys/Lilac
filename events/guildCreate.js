const G = require("../models/guild.js");
module.exports = (client, guild) => {
   G.create({ _id: guild.id, prefix: "d." }, (err, g) => {
  if(err) client.logger.error(err);
  else client.logger.log(`Added config for ${guild.name} (${guild.id})`);
  client.channels.get("447177859857907732").send(`i just joined ${guild.name} im in  ${client.guilds.size} servers`);
  });
};