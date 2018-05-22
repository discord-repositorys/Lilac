exports.run = async (client, message, args, level) => {
    message.channel.send("https://cyric21.github.io/")
}

exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'website',
    category: "Misc",
    description: 'Get the cryptide website!',
    usage: 'website'
};