exports.run = function(client, message, args, level) {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return client.embed(message, client.hex, "Invalid command exception:", "You need to be in a voice channel to set the volume.");
    }
    const volume = args.join(" ");
    if (!volume) return client.embed(message, client.hex, "Fetched current volume:", `Current volume for this guild is: ${client.playlists.get(message.guild.id).dispatcher.volume * 100}%`);
    if (volume < 0 || volume > 100) return client.embed(message, client.hex, "Invalid volume value:", "Volume must be a value between 0 and 100.");
    client.embed(message, client.hex, "Setting volume:", `Setting guild volume to ${volume}%`).then(() => {
      message.guild.voiceConnection.volume = volume / 100;
      client.playlists.get(message.guild.id).dispatcher.setVolume(volume / 100);
    });
  };
  
  exports.conf = {
    aliases: ["v"],
    permLevel: "User"
  };
    
  exports.help = {
    name: 'volume',
    description: 'Sets the streams current volume.',
    usage: 'volume <between 0 - 100>',
    category: "Music",
  };