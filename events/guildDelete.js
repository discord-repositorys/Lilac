const G = require("../models/guild.js");
module.exports = (client, guild) => {
    G.remove({ _id: guild.id }, (err) => {
        if(err) client.logger.error(err);
        else client.logger.log(`Deleted shit guild from db ${guild.name} (${guild.id})`);
        client.channels.get("447177859857907732").send(`i just left ${guild.name} im in ${client.guilds.size} servers`);
    })
}