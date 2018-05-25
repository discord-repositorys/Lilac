const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const embed = new Discord.MessageEmbed();
const embedCheck = require("../../musicfiles/embedPerms.js");
const playNext = require("../../musicfiles/playNext.js");
const ytapi = require("simple-youtube-api");
const { parse } = require("url");
const youtube = new ytapi(require("../../tokens.js").youtubeAPIKey);
exports.run = async (client, message, args, level) => {
  const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
  if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
    return client.embed(message, client.hex, "Invalid command exception:", "You need to be in a voice channel to play a song.");
  }

  const song = args.join(" ");
  if (!song.length) return client.embed(message, client.hex, "Invalid song argument:", "You need to supply a youtube URL or a search term to play a song.");
  const playlist = "&list="
  if (song.includes(playlist.toLowerCase())) return client.embed(message, client.hex, "Invalid song request:", "Playlist support will soon be added.");

  if (!client.playlists.in(message.guild.id)) {
    var firstSong = true;
    client.playlists.set(message.guild.id, {
      dispatcher: null,
      queue: [],
      connection: null,
      position: -1
    });
    await voiceChannel.join();
  }

  let id = (() => {
    const parsed = parse(song, true);
    if (/^(www\.)?youtube\.com/.test(parsed.hostname)) {
      return parsed.query.v;
    } else if (/^(www\.)?youtu\.be/.test(parsed.hostname)) {
      return parsed.pathname.slice(1);
    }
  })();

  if (!id) {
    const results = await youtube.searchVideos(song, 4);
    id = results[0].id;
  }

  let info;
  try {
    info = await youtube.getVideoByID(id);
  } catch (e) {
    return message.channel.send(`\`An error occurred: ${e}\``);
  }

  if (message.author.permLevel < 2 && parseInt(info.durationSeconds) > 900) return message.reply("Songs can be no longer than 15 minutes.").catch(console.error);
  const time = parseInt(info.durationSeconds, 10);
  const minutes = Math.floor(time / 60);

  let seconds = time % 60;

  if (seconds < 10) seconds = "0" + seconds;
  client.playlists.get(message.guild.id).queue.push({
    url: `https://www.youtube.com/watch?v=${info.id}`,
    id: info.id,
    channName: info.channel.title,
    songTitle: info.title,
    playTime: `${minutes}:${seconds}`,
    playTimeSeconds: info.durationSeconds,
    requester: message.guild.member(message.author).displayName,
    requesterIcon: message.author.avatarURL
  });

  if (firstSong) {
    playNext(message);
  } else {
    embed
      .setTitle(`**${info.title}** (${minutes}:${seconds}) has been added to the queue.`)
      .setColor(client.hex)
      .setFooter(`Requested by ${message.guild.member(message.author).displayName}`, message.author.avatarURL)
      .setImage(`https://i.ytimg.com/vi/${info.id}/mqdefault.jpg`)
      .setTimestamp()
      .setURL(`https://www.youtube.com/watch?v=${info.id}`);
    if (embedCheck(message)) {
      message.channel.send({embed}).catch(console.error);
    } else {
      message.channel.send(`**${info.title}** (${minutes}:${seconds}) has been added to the queue.`);
    }
  }
};

exports.conf = {
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "play",
  description: "Plays a specified youtube URL or search term.",
  usage: "play [YouTube Video URL] or [Search Term]",
  category: "Music"
};