const Discord = require("discord.js");
const embedCheck = require("./embedPerms.js");
const yt = require("ytdl-core");
const e = require("../modules/practicalEmbeds.js");
const playNext = (message) => {
  const thisPlaylist = message.client.playlists.get(message.guild.id);
  const nextSong = thisPlaylist.queue[++thisPlaylist.position];
  const dispatcher = message.guild.voiceConnection.playStream(yt(nextSong.url, {quality:"lowest", filter:"audioonly"}), {passes: 3, volume: message.guild.voiceConnection.volume || 0.2});
  message.guild.voiceConnection.dispatcher.setBitrate(96);
  thisPlaylist.dispatcher = dispatcher;
  if (embedCheck(message)) {
    e.embedWithImage(message, e.hex, `Now playing **${nextSong.songTitle}** (${nextSong.playTime})`, `Requested by ${nextSong.requester}`, `https://i.ytimg.com/vi/${nextSong.id}/mqdefault.jpg`);
  } else {
    e.embed(message, e.hex, `Now playing **${nextSong.songTitle}** (${nextSong.playTime})`, null, `https://i.ytimg.com/vi/${nextSong.id}/mqdefault.jpg`);
  }

  dispatcher.on("end", () => {
    if (thisPlaylist.position + 1 < thisPlaylist.queue.length) {
      playNext(message);
    } else {
      e.embed(message, e.hex, "Queue is finished:", "Please play more songs :D");
      message.guild.voiceConnection.disconnect();
      message.client.playlists.delete(message.guild.id);
    }
  });

};
module.exports = playNext;