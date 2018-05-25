exports.run = function(client, message, args, level) {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return client.embed(message, client.hex, "Invalid command exception:", "You need to be in a voice channel to pause the stream.");
    }
    if (client.playlists.get(message.guild.id).dispatcher.paused) return client.embed(message, client.hex, "Invalid command exception:", "Music stream is already paused for this guild.");
    client.embed(message, client.hex, "Pausing music stream playback:", "Successfully paused music playback.");
    client.playlists.get(message.guild.id).dispatcher.pause();
  };
  
  exports.conf = {
    aliases: [],
    permLevel: "User"
  };
    
  exports.help = {
    name: 'pause',
    description: 'Pauses the stream within current guild.',
    usage: 'pause',
    category: "Music"
  };