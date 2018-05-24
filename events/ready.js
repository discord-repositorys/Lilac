module.exports = function(client, message) {
    client.hex = 0x36393F; //Example Hex colour to export with your module.
    client.embed = function(message, colour, title, description) {
      return new Promise(function(resolve, reject) {
        if (!title) title = "";
        if (!description) description = "";
        message.channel.send("", {embed: {
          color: colour,
          title: title,
          description: description,
          timestamp: new Date(),
          footer: {text: "Command successfully executed."}
        }}).catch(error => reject(error));
      });
    };
  
    client.embedDM = function(client, message, colour, title, description, userID) {
      return new Promise(function(resolve, reject) {
        if (!title) title = "";
        if (!description) description = "";
        if (!userID) reject("No ID provided!");
        client.users.get(userID).send("", {embed: {
          color: colour,
          title: title,
          description: description,
          timestamp: new Date(),
          footer: {text: "Command successfully executed."}
        }}).catch(error => reject(error));
      });
    };
  
    client.embedID = function(message, colour, title, description, channelID) {
      return new Promise(function(resolve, reject) {
        if (!title) title = "";
        if (!description) description = "";
        if (!channelID) reject("No ID provided!");
        message.guild.channels.get(channelID).send("", {embed: {
          color: colour,
          title: title,
          description: description,
          timestamp: new Date(),
          footer: {text: "Command successfully executed."}
        }}).catch(error => reject(error));
      });
    };
  
    client.embedGID = function(message, colour, title, description, channelID) {
      return new Promise(function(resolve, reject) {
        if (!title) title = "";
        if (!description) description = "";
        if (!channelID) reject("No ID provided!");
        client.channels.get(channelID).send("", {embed: {
          color: colour,
          title: title,
          description: description,
          timestamp: new Date(),
          footer: {text: "Command successfully executed."}
        }}).catch(error => reject(error));
      });
    };
  };