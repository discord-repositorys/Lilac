exports.run = async (client, message, args, level) => {
    message.channel.send("https://discord.gg/zV8sN9j")
}
exports.conf = {
    aliases: [],
    permLevel: "User"
};
  
  exports.help = {
    name: 'support',
    category: "Info",
    description: 'Join the support server',
    usage: 'support'
};