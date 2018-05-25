const Discord = require("discord.js");
const embedCheck = require("../../musicfiles/embedPerms.js");
exports.run = (client, message, args, level) => {
  if (!client.playlists.has(message.guild.id)) return client.embed(message, client.hex, "Invalid queue request:", "Queue is empty.");

  let playlist = client.playlists.get(message.guild.id);
  playlist = playlist.queue.slice(playlist.position);

  const current = playlist.shift();
  const singular = playlist.length === 1;
  const embed = new Discord.RichEmbed();

  embed.setTitle(`Currently playing **${current.songTitle.substring(0, 50)}** (${current.playTime})`)
    .setColor(client.hex)
    .setFooter(`Requested by ${current.requester}`, current.requesterIcon)
    .setDescription(`There ${singular ? "is" : "are"} currently ${playlist.length} song${singular ? "" : "s"} in the queue.\n`)
    .setThumbnail(`https://i.ytimg.com/vi/${current.id}/mqdefault.jpg`)
    .setTimestamp()
    .setURL(current.url);

  if (embedCheck(message)) {
    for (let i = 0; i < playlist.length && i < 5; i++) {
      embed.addField(`🎧 ${playlist[i].songTitle.substring(0, 50)} (${playlist[i].playTime})`, `🤘 Requested by **${playlist[i].requester}**`);
    }
    message.channel.send({embed});
  } else {
    message.channel.send(`Currently playing **${current.songTitle.substring(0, 50)}** (${current.playTime})\n\nThere ${singular ? "is" : "are"} currently ${playlist.length} song${singular ? "" : "s"} in the queue.\n${playlist.map.size === 0 ? "" : "🎧" + playlist.map(i => "_" + i.songTitle+"_ (" + i.playTime + ") requested by **" + i.requester + "**\n🔗 <https://www.youtube.com/watch?v="+i.id+">\n").join("\n🎧 ")}`);
  }
};

exports.conf = {
  aliases: ["playlist"],
  permLevel: "User"
};

exports.help = {
  name: "queue",
  description: "Displays all songs in the queue.",
  usage: "queue",
  category: "Music",
};