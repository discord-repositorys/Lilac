const exec = require("child_process").exec;

exports.run = async (client, message, args, level) => {
    exec("git pull", (error, stdout) => {
        const response = (error || stdout);
    });

    
    message.channel.send("Bot is updated").catch(console.error);
};



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "update",
    category: "Owner",
    description: "Update the bot",
    usage: "update"
};
