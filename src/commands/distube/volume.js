const {MessageEmbed} = require('discord.js')
const {color} = require('../../../config.json')

module.exports.run = async (client, message, args) =>
{
    const queue = await client.distube.getQueue(message);

    if(queue && message.member.voice.channel && client.voice.adapters.size > 0 && args[0]) 
    {
		volume = parseInt(args[0])
		if (isNaN(volume))
		{
			message.channel.send(`Please enter a valid number`)
			.then(msg =>
				{
					setTimeout(() => msg.delete().catch(error =>
                        {
                            if(error.code !== 10008)
                            {
                                console.error('Failed to delete the message:', error)
                            }
                        }), 10000)
				})
            return
		}
		if (volume < 1) return volume = 1
		else if (volume > 250)
		{
			message.channel.send('Value has to be between 1 and 250')
			.then(msg =>
				{
					setTimeout(() => msg.delete().catch(error =>
                        {
                            if(error.code !== 10008)
                            {
                                console.error('Failed to delete the message:', error)
                            }
                        }), 10000)
				})
            message.delete().catch(error =>
                {
                    if(error.code !== 10008)
                    {
                        console.error('Failed to delete the message:', error)
                    }
                })
            return
		}
		
		await client.distube.setVolume(message, volume)
		const embed = new MessageEmbed()
			.setColor(color)
			.setDescription(`Volume set to \`${volume}%\` for [${queue.songs[0].name}](${queue.songs[0].url})`)

        message.channel.send({ embeds: [embed] })
        .then(msg =>
            {
                setTimeout(() => msg.delete().catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to delete the message:', error)
                        }
                    }), 10000)
            })
        message.delete().catch(error =>
            {
                if(error.code !== 10008)
                {
                    console.error('Failed to delete the message:', error)
                }
            })
    }
    else if(queue && !message.member.voice.channel && client.voice.adapters.size > 0)
    {
        message.channel.send('You must be in a voice channel to use this command')
        .then(msg =>
            {
                setTimeout(() => msg.delete().catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to delete the message:', error)
                        }
                    }), 10000)
            })
    }
    else if(queue && message.member.voice.channel && client.voice.adapters.size > 0 && !args[0])
    {
		const embed = new MessageEmbed()
			.setColor(color)
			.setDescription(`Current volume is \`${queue.volume}%\` for [${queue.songs[0].name}](${queue.songs[0].url})`)

        message.channel.send({ embeds: [embed] })
        .then(msg =>
            {
                setTimeout(() => msg.delete().catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to delete the message:', error)
                        }
                    }), 10000)
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

module.exports.config = 
{
  name: 'volume',
  aliases: ['v']
}