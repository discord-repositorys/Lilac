exports.run = function(client, message, level) {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return client.embed(message, client.hex, "Invalid command exception:", "You need to be in a voice channel to resume the music");
    }
    if (!client.playlists.get(message.guild.id).dispatcher.paused) return client.embed(message, client.hex, "Invalid command exception:", "Music stream is not paused for this guild.");
    client.embed(message, client.hex, "Resuming music stream playback:", "Successfully resumed music playback.");
    client.playlists.get(message.guild.id).dispatcher.resume();
  };
  
  exports.conf = {
    aliases: [],
    permLevel: "User"
  };
    
  exports.help = {
    name: 'resume',
    description: 'Resumes audio playback for the guild.',
    usage: 'resume',
    category: "Music",
  };