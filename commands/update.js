const exec = require('child_process').exec;

exports.run = async (client, message, args, level) => {
    exec("git pull", (error, stdout) => {
        const response = (error || stdout);
    });
    // let resp = await client.unloadCommand(args[0]);
    // if (resp) return message.reply(`Error Unloading: ${resp}`);

    // let r = client.loadCommand(args[0]);
    // if (r) return message.reply(`Error Loading: ${r}`);
    
    message.channel.send("Bot is updated :white_check_mark:").catch(console.error);
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "pull",
    category: "Owner",
    description: "pull",
    usage: "pull"
};
