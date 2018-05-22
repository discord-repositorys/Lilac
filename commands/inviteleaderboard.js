
const Discord = require('discord.js');
const arraySort = require('array-sort');
const table = require('table'); 
const { MessageEmbed } = require("discord.js");
const send = require("webhooks4discord");
exports.run = async (client, message, args, level) => {



  let invites = await message.guild.fetchInvites().catch(error => { 

      return message.channel.send('Sorry, I don\'t have the proper permissions to view invites!');
  }) 


  invites = invites.array();

  arraySort(invites, 'uses', { reverse: true }); 

 
  let possibleInvites = [['User', 'Uses']]; 
  invites.forEach(function(invite) {
      possibleInvites.push([invite.inviter.username, invite.uses]); 
  })

  const embed = new MessageEmbed()
  .setColor(0xCB5A5E)
  .addField('Leaderboard', `\`\`\`${table.table(possibleInvites)}\`\`\``); // This will be the field holding the leaderboard
  // Be sure to put the table in a codeblock for proper formatting

send(message.channel, embed, {
  name: 'Server Invites',
  icon: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/trophy-128.png'
})
}

exports.conf = {
    aliases: [],
    permLevel: "Server Owner"
};
      
exports.help = {
    name: 'inviteleaderboard',
    category: "Misc",
    description: 'see the leaderboard for invites',
    usage: 'inviteleaderboard'
};