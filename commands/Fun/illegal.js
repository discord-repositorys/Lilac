const request = require('request');

exports.run = (client, message, word, level) => {
  if (!word[0]) return message.channel.send(':negative_squared_cross_mark: What would you like to be illegal?');
  if (word.join('').length > 10) return message.channel.send(`:negative_squared_cross_mark: \`${word.join('')}\` is too long. Max 10 charaters.`);
  requestIllegal();
  function requestIllegal() {
    request.get({
      url: `https://is-now-illegal.firebaseio.com/gifs/${word.join('').toUpperCase()}.json`,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error: ' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status: ' + res.statusCode);
      } else {
        if (data === null) {
          var postData = {
            task: 'gif',
            word: word.join('').toUpperCase()
          };
          var options = {
            method: 'post',
            body: postData,
            json: true,
            url: 'https://is-now-illegal.firebaseio.com/queue/tasks.json'
          };
          request(options, function (err, res, body) {
            if (err) {
              return message.channel.send(':negative_squared_cross_mark: Error: ' + err);
            } else if (res.statusCode !== 200) {
              return message.channel.send(':negative_squared_cross_mark: Status: ' + res.statusCode);
            }
            setTimeout(function() {
              requestIllegal();
            }, 5000)
          });
        } else {
          return message.channel.send({'files': [data.url]});
        }
      }
    });
  }
};

exports.conf = {
    aliases: [],
    permLevel: "User"
};
      
exports.help = {
    name: 'illegal',
    category: "Fun",
    description: 'Make something illegal!',
    usage: 'illegal'
};