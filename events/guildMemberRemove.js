const Guild = require("../models/guild.js");

module.exports = async(client, member) => {
  try {
    const g = await Guild.findById(member.guild.id);
    if(!g || g.leaveChannel === "null") return;
    const chan = client.channels.get(g.leaveChannel);
    if(!chan) return; // deleted channel or something.
    await chan.send(g.leaveMessage.replace(/{{user}}/g, member.user.toString()).replace(/{{server}}/g, member.guild.name).replace(/{{count}}/g, member.guild.memberCount));
  } catch(err) {
    client.logger.error(err);
  }
};