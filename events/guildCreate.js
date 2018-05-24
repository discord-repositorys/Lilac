const G = require("../models/guild.js");
module.exports = (client, guild) => {
   G.create({ _id: guild.id, prefix: "d." }, (err, g) => {
  if(err) client.logger.error(err);
  else client.logger.log(`Added config for ${guild.name} (${guild.id})`);
  });
};