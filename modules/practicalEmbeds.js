module.exports = {
    embed: async function(message, colour, title, description) {
      try {
        await message.channel.send("", {embed: {
          author: {
            name: message.author.username,
            icon_url: message.author.avatarURL
          },
          color: colour,
          title: title,
          description: description,
          timestamp: new Date(),
          footer: {
            text: "Command executed!"
          }
        }});
      } catch(e) {
      console.error(e);
      }
    },
    embedID: async function(message, id, colour, title, description) {
      if (!id) return console.log("Invalid embed construction, required to have a channel id to send to.");
      try {
        await message.guild.channels.get(id).send("", {embed: {
          author: {
            name: message.author.username,
            icon_url: message.author.avatarURL
          },
          color: colour,
          title: title,
          description: description,
          timestamp: new Date(),
          footer: {
            text: "Command executed!"
          }
        }});
      } catch(e) {
        console.error(e);
      }
    },   
    embedDM: async function(message, userid, colour, title, description) {
      if (!userid) return console.log("Invalid embed construction, required to have a user id to send to.");
      try {
        await message.guild.members.get(userid).send("", {embed: {
          author: {
            name: message.author.username,
            icon_url: message.author.avatarURL
          },
          color: colour,
          title: title,
          description: description,
          timestamp: new Date(),
        }});
      } catch(e) {
        console.error(e);
      }
    },
    embedGID: async function(client, message, channelid, colour, title, description) {
      if (!channelid) return console.log("Invalid embed construction, required to have a channel id to send to.");
      try {
        await client.channels.get(channelid).send("", {embed: {
          author: {
            name: message.author.username,
            icon_url: message.author.avatarURL
          },
          color: colour,
          title: title,
          description: description,
          timestamp: new Date(),
        }});
      } catch(e) {
        console.error(e);
      }
    },
    embedWithImage: async function(message, colour, title, description, imageLink) {
      try {
        await message.channel.send("", {embed: {
          author: {
            name: message.author.username,
            icon_url: message.author.avatarURL
          },
          color: colour,
          title: title,
          description: description,
          timestamp: new Date(),
          image: {
            url: imageLink
          },
          footer: {
            text: "Command executed!"
          }
        }});
      } catch(e) {
      console.error(e);
      }
    },
    hex: 0xff0000
  };