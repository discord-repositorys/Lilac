exports.run = async function(client, message, args) {
    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry you do not have the ban members permission.")
    const user = message.mentions.users.first() || client.users.get(args[0]);
    if (!user) return client.embed(message, 0xff0000, "Invalid user mention:", "Couldn't find mention or user is invalid.");
    var reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason was provided!";
  
    client.fetchMember(message, user).then(function(member) {
      const commandUser = message.member.highestRole.position;
      const targetUser = member.highestRole.position;
      const clientUser = client.highestRole(message);
      if (commandUser <= targetUser) return client.embed(message, 0xff0000, "Invalid Permissions:", "User has a higher role then you.");
      if (clientUser <= targetUser) return client.embed(message, 0xff0000, "Invalid Permissions:", "User has a higher role then me.");
      member.ban({days: 1, reason: `${reason} = Ban performed by: ${message.author.tag}`});
      client.embed(message, 0xff0000, "Successfully banned user:", `User: ${user.tag} \nReason: ${reason}`);
    }).catch(error => client.embed(message, 0xff0000, "Encountered an error", `\`\`\`${error.stack}\`\`\``));
  }
  
  exports.conf = {
    aliases: [],
    permLevel: "User"
  };
    
  exports.help = {
    name: 'ban',
    description: 'Bans mentioned user with specified reason.',
    usage: 'ban [mention/id] [reason]'
  };