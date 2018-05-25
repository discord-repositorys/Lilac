const util = require("util");
exports.run = async (client, message, args = []) => {
  const suffix = args.join(" ");
  if (!suffix) return client.embed(message, 0xff0000, "Invalid Evaluation:", "Please provide something to evaluate.");
  try {
    let evaled = await eval(suffix);
    const type = typeof evaled;
    const insp = util.inspect(evaled, {depth: 0});
    const tosend = [];

    if (evaled === null) evaled = "null";

    tosend.push("**EVAL:**");
    tosend.push("\`\`\`js");
    tosend.push(clean(suffix));
    tosend.push("\`\`\`");
    tosend.push("**Evaluates to:**");
    tosend.push("\`\`\`LDIF");
    tosend.push(clean(evaled.toString().replace(client.token, "Redacted").replace(client.user.email, "Redacted")));
    tosend.push("\`\`\`");
    if (evaled instanceof Object) {
      tosend.push("**Inspect:**");
      tosend.push("\`\`\`js");
      tosend.push(insp.toString().replace(client.token, "Redacted").replace(client.user.email, "Redacted"));
      tosend.push("\`\`\`");
    } else {
      tosend.push("**Type:**");
      tosend.push("\`\`\`js");
      tosend.push(type);
      tosend.push("\`\`\`");
    }
    await message.channel.send(tosend, {split: true});
  } catch (err) {
    const tosend = [];
    tosend.push("**EVAL:** \`\`\`js");
    tosend.push(clean(suffix));
    tosend.push("\`\`\`");
    tosend.push("**Error:** \`\`\`LDIF");
    tosend.push(clean(err.message));
    tosend.push("\`\`\`");
    await message.channel.send(tosend, {split: true});
  }
};

exports.conf = {
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "seval",
  description: "Evaluates arbitrary Javascript.",
  usage: "seval [expression]",
};

function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return text;
  }
}