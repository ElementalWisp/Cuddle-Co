const ClientManager = require('./src/ClientManager')
const DisTube = require('distube')
const {SoundCloudPlugin} = require('@distube/soundcloud')
const {SpotifyPlugin} = require('@distube/spotify')
const {COOKIE, TOKEN, color, helpmenuicon} = require('./config.json')
const {MessageEmbed} = require('discord.js')
require('dotenv').config()
require('./src/utils/mongo')

const client = new ClientManager
({
    intents: 
    [
		'GUILDS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'GUILD_MEMBERS',
		'GUILD_PRESENCES'
	],
	partials: 
    [
		'MESSAGE',
		'CHANNEL',
		'REACTION'
	]
})

client.distube = new DisTube.default(client, 
{
	searchSongs: 6,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 5,
	leaveOnFinish: false,
	leaveOnStop: true,
    nsfw: true,
	youtubeCookie: COOKIE,
	youtubeIdentityToken: TOKEN,
	plugins: [
		new SoundCloudPlugin(), 
		new SpotifyPlugin({
		parallel: true,
		emitEventsAfterFetching: true/*,
		api: {
		  clientId: "563c1ce6f9f74fa189b759ba44fa5e7d",
		  clientSecret: "f3282bf67d7547d78319550f1c0ce7dd",
		},*/
	  })],
})

const checkdiscordqueue = require('./src/utils/CheckDistubeQueue')
checkdiscordqueue.checkDistubeQueue(client.distube)

client.distube
	.on('searchResult', (message, result) => 
	{
		let i = 0
		const one = '1️⃣'
		const two = '2️⃣'
		const three = '3️⃣'
		const four = '4️⃣'
		const five = '5️⃣'
		const six = '6️⃣'
		let emojis = [one,two,three,four,five,six]

		//const testRole = message.guild.roles.cache.find(role => role.name === 'Test Role')

		const embed = new MessageEmbed()
		.setColor(color)
		.setAuthor('Search Menu', `${helpmenuicon}`)
		.addFields(
			{ name: 'Songs', value: `\n${result.map(song => `${emojis[i++]} ${song.name} - \`${song.formattedDuration}\``).join("\n\n")}\n\n*React to a number or wait 30 secconds to cancel*`},
		)
		message.channel.send({ embeds: [embed] }).then(msg => 
		{
			setTimeout(() => msg.delete().catch(error =>
                {
                    if(error.code !== 10008)
                    {
                        console.error('Failed to react to the message:', error)
                    }
                }), 30000)
			msg.react('1️⃣').catch(error =>
                {
                    if(error.code !== 10008)
                    {
                        console.error('Failed to react to the message:', error)
                    }
                })
			msg.react('2️⃣').catch(error =>
                {
                    if(error.code !== 10008)
                    {
                        console.error('Failed to react to the message:', error)
                    }
                })
			msg.react('3️⃣').catch(error =>
                {
                    if(error.code !== 10008)
                    {
                        console.error('Failed to react to the message:', error)
                    }
                })
			msg.react('4️⃣').catch(error =>
                {
                    if(error.code !== 10008)
                    {
                        console.error('Failed to react to the message:', error)
                    }
                })
			msg.react('5️⃣').catch(error =>
                {
                    if(error.code !== 10008)
                    {
                        console.error('Failed to react to the message:', error)
                    }
                })
			msg.react('6️⃣').catch(error =>
                {
                    if(error.code !== 10008)
                    {
                        console.error('Failed to react to the message:', error)
                    }
                })
			client.on('messageReactionAdd', async (reaction, user) =>
			{
				if(reaction.message.partial) await reaction.message.fetch()
				if(reaction.partial) await reaction.fetch()
				if(user.bot) return
				if(!reaction.message.guild) return

				if(reaction.message.id == msg.id && message.member.voice.channel)
				{
					if(reaction.emoji.name === one)
					{
						i = 0
						client.distube.play(message.member.voice.channel, result[i].url, 
							{
								member: message.member,
								textChannel: message.channel,
								message
							})
						msg.delete().catch(error =>
							{
								if(error.code !== 10008)
								{
									console.error('Failed to delete the message:', error)
								}
							})
						message.delete().catch(error =>
							{
								if(error.code !== 10008)
								{
									console.error('Failed to delete the message:', error)
								}
							})
					}
					else if(reaction.emoji.name === two)
					{
						i = 1
						client.distube.play(message.member.voice.channel, result[i].url, 
							{
								member: message.member,
								textChannel: message.channel,
								message
							})
						msg.delete().catch(error =>
							{
								if(error.code !== 10008)
								{
									console.error('Failed to delete the message:', error)
								}
							})
						message.delete().catch(error =>
							{
								if(error.code !== 10008)
								{
									console.error('Failed to delete the message:', error)
								}
							})
					}
					else if(reaction.emoji.name === three)
					{
						i = 2
						client.distube.play(message.member.voice.channel, result[i].url, 
							{
								member: message.member,
								textChannel: message.channel,
								message
							})
						msg.delete().catch(error =>
							{
								if(error.code !== 10008)
								{
									console.error('Failed to delete the message:', error)
								}
							})
						message.delete().catch(error =>
							{
								if(error.code !== 10008)
								{
									console.error('Failed to delete the message:', error)
								}
							})
					}
					else if(reaction.emoji.name === four)
					{
						i = 3
						client.distube.play(message.member.voice.channel, result[i].url, 
							{
								member: message.member,
								textChannel: message.channel,
								message
							})
						msg.delete().catch(error =>
							{
								if(error.code !== 10008)
								{
									console.error('Failed to delete the message:', error)
								}
							})
						message.delete().catch(error =>
							{
								if(error.code !== 10008)
								{
									console.error('Failed to delete the message:', error)
								}
							})
					}
					else if(reaction.emoji.name === five)
					{
						i = 4
						client.distube.play(message.member.voice.channel, result[i].url, 
							{
								member: message.member,
								textChannel: message.channel,
								message
							})
						msg.delete().catch(error =>
							{
								if(error.code !== 10008)
								{
									console.error('Failed to delete the message:', error)
								}
							})
						message.delete().catch(error =>
							{
								if(error.code !== 10008)
								{
									console.error('Failed to delete the message:', error)
								}
							})
					}
					else if(reaction.emoji.name === six)
					{
						i = 5
						client.distube.play(message.member.voice.channel, result[i].url, 
							{
								member: message.member,
								textChannel: message.channel,
								message
							})
						msg.delete().catch(error =>
							{
								if(error.code !== 10008)
								{
									console.error('Failed to delete the message:', error)
								}
							})
						message.delete().catch(error =>
							{
								if(error.code !== 10008)
								{
									console.error('Failed to delete the message:', error)
								}
							})
					}
				}
				else
				{
					return
				}
			})
		})
	})

process.on('unhandledRejection', error => 
{

})


client.setup()