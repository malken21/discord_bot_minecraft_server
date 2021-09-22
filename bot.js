const { Client, Intents, Channel } = require("discord.js");
const fs = require("fs");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});





fs.readFile("Config.txt", "utf-8", (err, data) => {
  if (err) throw err;
  client.login(JSON.parse(data).TOKEN);
});



const cron = require('node-cron')
fs.readFile("Config.txt", "utf-8", (err, data) => {
	if (err) throw err;

cron.schedule(JSON.parse(data).time, () => {

	const message_list = JSON.parse(data).messages;

	const message_random = Math.floor( Math.random()*message_list.length);
	client.guilds.cache.get(JSON.parse(data).server_name).channels.cache.find(ch => ch.name === JSON.parse(data).channel_name).send(message_list[message_random])

});
})







client.on("ready", () => {
  const time = new Date()
  console.log(`(${client.user.tag})ログイン完了しました\n${time}`);
});
