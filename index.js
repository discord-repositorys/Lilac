const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START", "TYPING_STOP", "GUILD_SYNC", "RELATIONSHIP_ADD", "RELATIONSHIP_REMOVE", "USER_SETTINGS_UPDATE", "USER_NOTE_UPDATE"], reconnect: true }); //ice
//client.tokens = require("./tokens.js");
const { promisify } = require("util");
const { stringify } = require('querystring');
const Guild = require('./models/guild.js');
const { request } = require('https');
const readdir = promisify(require("fs").readdir);
let cooldownUsers = [];
const webhooks4discord = require("webhooks4discord");
const CyricID = "411683912729755649"
const fs = require("fs")
const moment = require('moment');
const mongoose = require('mongoose');
require("./modules/functions.js")(client);
require("./embed.js")(client);



function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

const checkCooldown = ((userId) => {
  if (cooldownUsers.indexOf(userId) > -1) {
      return true;
  } else {
      return false;
  }
});

const removeCooldown = ((userId, timeInSeconds) => {
  let index = cooldownUsers.indexOf(userId);
  if (index > -1) {
      setTimeout(() => {
          cooldownUsers = cooldownUsers.splice(index, 0);
      }, timeInSeconds * 1000)
  }
});



mongoose.connect(process.env.MONGODB);
client.db = mongoose.connection;
client.db.once("open", () => console.log("Connected to MongoDB"));
client.db.on("error", (err) => console.error(err));

client.on("guildCreate", guild => {
  console.log(`Someone added Lilac to their discord! ${guild.name} Member count: ${guild.memberCount}!`)
});

client.on('guildDelete', guild => {
  console.log(`Someone removed Lilac from their discord! ${guild.name} Member count: ${guild.memberCount}!`)
});


client.on("ready", () => {
  client.user.setActivity(`Getting ready baby!`);
})



client.on("ready", () => {
  console.log(`
#####{ Bot Ready! }#####
Users: ${client.user.tag}
Bot Id: ${client.user.id}
Servers: ${client.guilds.size}
Users: ${client.users.size}
########################`.trim());
  console.log("guide bot is in: " + client.guilds.size + " servers.");
});

client.config = require("./config.js");

client.logger = require("./util/Logger");

require("./modules/functions.js")(client);

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.settings = new Discord.Collection()




const init = async () => {


//    const cmdFiles = await readdir("./commands/");
//    client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
//    cmdFiles.forEach(f => {
//      if (!f.endsWith(".js")) return;
//      const response = client.loadCommand(f);
//      if (response) console.log(response);
//    });

//if(message.content.match(new RegExp(`^<@!?${client.user.id}>$`))) {
//  message.channel.send(`Hi im Lilac! My features include welcome/leave messages, changeable prefix, Moderation commands, And much much more!`)
//}


//const klaw = require("klaw");
//const path = require("path");

//const cmdList = [];
//klaw("./commands/")
//  .on("data", (file) => {
//    const cmdFile = path.parse(file.path);
//    if(!cmdFile.ext || cmdFile.ext !== ".js") return; // ignore non js files/folders
//    const cmd = require(cmdFile.dir + path.sep + cmdFile.name + cmdFile.ext);
//   client.commands.set(cmd.help.name, cmd);
//  cmd.conf.aliases.forEach(x => client.aliases.set(x, cmd.name));
//  cmdList.push(cmd);
//})
//  .on("end", () => console.log(`Loaded a total of ${cmdList.length} commands!`))
//  .on("error", (err) => console.error(err));
  

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});
  
  const update = () => {
    const data = stringify({ server_count: client.guilds.size });
    const req = request({
      host: 'discordbots.org',
      path: `/api/bots/${client.user.id}/stats`,
      method: 'POST',
      headers: {
        'Authorization': client.config.DBLAPI,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      }
    });
    req.write(data);
    req.end();
  
  client.on('ready', update);
  
  

client.on("ready", async() => {
  const g = await Guild.find({}).exec();
  const c = client.guilds.array();
  c.forEach(x => {
    if(!(g.find(v => v._id === x.id))) { 
      const v = new Guild({ _id: x.id, prefix: "l.", });
      v.save((e) => {
        if(e) client.logger.error(e);
        else client.logger.log(`Found a server without config, added default settings: ${x.name} (${x.id})`);
      });
    }
  });
})
            }

  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    })
  });


  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }


client.login(process.env.TOKEN);
};

init();
