const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  prefix: { type: String, required: true },
  
  // we will treat null as welcome/leave disabled.
  welcomeChannel: { type: String, default: "null" },
  leaveChannel: { type: String, default: "null" },
  
  // some default messages.
  welcomeMessage: { type: String, default: "Welcome {{user}} to {{server}} we now have {{count}} user!"},
  leaveMessage: { type: String, default: "{{user}} left {{server}} bye, we now have {{count}} members"}
});


const guildModel = mongoose.model("guild", GuildSchema);
module.exports = guildModel;
