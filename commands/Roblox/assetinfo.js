const Discord = require('discord.js')
const request = require('request')
const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args, level) => {
  let link = `https://api.roblox.com/Marketplace/ProductInfo?assetId=${args[0]}`
  request(link, function(error, response, body) {
    if(body.includes("BadRequest") || body.includes("InternalServerError")) {
      message.reply("The entered asset does not exist in roblox.")
      return;
    }else{
      let asset = JSON.parse(body)
      let link2 = `http://assetgame.roblox.com/asset-thumbnail/json?width=420&height=420&assetId=${asset.AssetId}`
      request(link2, function(error, response, body) {
        let thumbnail = JSON.parse(body).Url
        const embed = new MessageEmbed()
          .setTitle('ROBLOX Notification')
          .setAuthor("ROBLOX", client.user.avatarURL)
          .setFooter('Thanks for using Lilac!', client.user.avatarURL)
          .setDescription(`Grabbed detailed information about the entered asset.`)
          .addField('General Information', `Name: ${asset.Name}\nIdentification Number: ${asset.ProductId}\nDescription: ${asset.Description}\nPrice: ${asset.PriceInRobux}\nLimited: ${asset.IsLimited}\nRemaining: ${asset.Remaining}\nSales: ${asset.Sales}\nFor Sale: ${asset.IsForSale}`)
          .addField('Creator Information', `Owner: ${asset.Creator.Name}\nOwner Identification Number: ${asset.Creator.Id}`)
          .setColor(0xFF0000)
          .setThumbnail(thumbnail)
        message.channel.send(embed);
      });
    }
  });
};

exports.conf = {
    aliases: [],
    permLevel: "User"
  };
    
  exports.help = {
    name: 'assetinfo',
    category: "Roblox",
    description: 'Get asset info from roblox.',
    usage: 'assetinfo <id>'
  };