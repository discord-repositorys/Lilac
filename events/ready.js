const { MessageEmbed } = require("discord.js");
const { post } = require("snekfetch");
const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START", "TYPING_STOP", "GUILD_SYNC", "RELATIONSHIP_ADD", "RELATIONSHIP_REMOVE", "USER_SETTINGS_UPDATE", "USER_NOTE_UPDATE"], reconnect: true }); //ice
module.exports = async (client) => {

    client.color = 0x36393F;

client.embed = function clientEmbed(options = {}) {
    const title = options.title ? options.title : undefined;
    const thumbnail = options.thumbnail ? options.thumbnail : undefined;
    const image = options.image ? options.image : undefined;
    const description = options.description ? options.description : undefined;
    const footer = options.footer ? options.footer : undefined;
    const timestamp = options.timestamp ? options.timestamp : false;
    const footerIcon = options.footerIcon ? options.footerIcon : null;
    const fields = options.fields ? options.fields : undefined;
    const color = options.color ? options.color : client.color;
    const author = options.author ? options.author : undefined;
    const e = new MessageEmbed();

    if (fields === undefined) {} else { for (const field of fields) e.addField(field.name, field.value, field.inline ? field.inline : false); }
    if (title === undefined) {} else { e.setTitle(title); }
    if (description === undefined) {} else { e.setDescription(description); }
    if (color === undefined) {} else { e.setColor(color); }
    if (author === undefined) {} else { e.setAuthor(author.name, author.icon, author.url ? author.url : null); }
    if (timestamp === false) {} else { e.setTimestamp(); }
    if (footer === undefined) {} else { e.setFooter(footer, footerIcon); }
    if (thumbnail === undefined) {} else { e.setThumbnail(thumbnail); }
    if (image === undefined) {} else { e.setImage(image); }

    return e;
  };
}

client.haste = function clientHaste(text) {
    const promise = new Promise(async (res, rej) => {
        if (!text) return rej("Text needs to be provided!");
        post("https://hastebin.com/documents")
            .send(text)
            .then(r => res(`https://hastebin.com/${r.body.key}`)).catch(e => rej(e));
    });
    return promise;
};