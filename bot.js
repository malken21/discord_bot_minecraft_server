const { Client, Intents, Channel } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.on("ready", () => {
  console.log(`ログイン完了しました\n${client.user.tag}`);
});

client.on('messageCreate', message => {
	if (message.content === 'まるまさ 反応して!!' && !message.author.bot) {
		message.reply({ content: '反応した!!', allowedMentions: { repliedUser: false }})
		console.log(`反応完了 ${client.user.tag}`);
	}



	
	if (message.content.startsWith('!m ') && !message.author.bot) {
		const { MessageEmbed } = require('discord.js');

		var server = message.content.replace("!m ", "");

		let url = `https://api.mcsrvstat.us/2/${server}`;
        let icon = `https://api.mcsrvstat.us/icon/${server}`;




		console.log(server);





		const https = require('https');


		const req = https.request(url, (res) => {
			res.on('data', (url_text) => {
				
				var url_json = JSON.parse(url_text);
				console.log(url_json);

if(url_json.online == true){


			const minecraft_server_embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(server)
			.setDescription(`プレイヤー数 : ${url_json.players.online}/${url_json.players.max}`)
			.setThumbnail(icon)
			.addField(`${url_json.motd.clean}`, `バージョン : ${url_json.version}\nIP : ${url_json.ip}`, true);
		      message.channel.send({ embeds: [minecraft_server_embed] });

			} else {

				const minecraft_server_embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle("そのサーバーの存在を確認できませんでした")
				  message.channel.send({ embeds: [minecraft_server_embed] });



			}
			});
		})	
			
		req.end();

	

	}
});
client.login('t');