const { Client, Intents, Channel } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.on("ready", () => {
  const time = new Date()
  console.log(`(${client.user.tag})ログイン完了しました\n${time}`);
});

client.on('messageCreate', message => {

	
	if (message.content.startsWith("!m"+" ") && !message.author.bot) {
		const { MessageEmbed } = require('discord.js');
		const time = new Date()

		var server = message.content.replace("!m"+" ","");

		let url = `https://mcstatus.snowdev.com.br/api/query/v3/${server}`;
        let icon = `https://api.mcsrvstat.us/icon/${server}`;

		message.channel.sendTyping()
		console.log(server);
		const https = require("https");
		const req = https.request(url, (res) => {
			res.on("data", (url_text) => {
				var motd = JSON.parse(url_text).motd.replace(/§./g, "");
				console.log(JSON.parse(url_text));





            if(JSON.parse(url_text).online == true){
			const minecraft_server_embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(server)
			.setDescription(`プレイヤー数 : ${JSON.parse(url_text).players_online}/${JSON.parse(url_text).max_players}`)
			.setThumbnail(icon)
			.addField(`${motd}`, `バージョン : ${JSON.parse(url_text).version}`, true)
			.setFooter( `${time}`)
		      message.channel.send({ embeds: [minecraft_server_embed] });
			} else {
				const minecraft_server_embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle("そのサーバーの存在を確認できませんでした")
				.setFooter( `${time}`)
				  message.channel.send({ embeds: [minecraft_server_embed] });
			}
			});
		})		
		req.end();
	}
});
client.login('ここに自分のbotのTOKENをいれて');