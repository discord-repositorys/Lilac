exports.run = function (client, message, level) {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return client.embed(message, client.hex, "Invalid command exception:", "You need to be in a voice channel to stop the music");
    }
    if (client.playlists.has(message.guild.id)) {
        let queue = client.playlists.get(message.guild.id);
        queue.queue = [];
        queue.dispatcher.end();
        client.embed(message, client.hex, "Successfully stopped music:", "Stopped the music and cleared the queue");
    } else return client.embed(message, client.hex, "Invalid command exception:", "No music is being played currently");

};

exports.conf = {
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: 'stop',
    description: 'Stops audio playback immediately.',
    usage: 'stop',
    category: "Music",
};