const {MessageEmbed} = require('discord.js')
const {color} = require('../../../config.json')
const distubeQueues = require('../../schemas/distube-queue-schema')

module.exports.run = async (client, message, args) =>
{
    const queue = await client.distube.getQueue(message);

    if(queue && message.member.voice.channel && client.voice.adapters.size > 0 && args[0])
    {
        let pos = parseInt(args[0])
		if (isNaN(pos) || pos < 2)
		{
			message.channel.send(`Please enter a valid number greater than 1`)
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

        pos--

        if(queue.songs.length > pos)
        {
            let song = await queue.songs[pos]

            await queue.songs.splice(pos, 1)

            const embed = new MessageEmbed()
                .setColor(color)
                .addField('Removed', `${pos+1} - [${song.name}](${song.url})`)

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

            let songsurls = []

            for(i = 0; i < queue.songs.length; i++)
            {
                songsurls.push(queue.songs[i].url)
            }
    
            try
            {
                await distubeQueues.findOneAndUpdate
                ({
                    _id: queue.id
                },
                {
                    _id: queue.id,
                    channelId: queue.textChannel.id,
                    voicechannelId: queue.voiceChannel.id,
                    urls: songsurls
                },
                {
                    upsert: true
                }
                )
            }
            catch(e)
            {
                console.log(e)
            }
        }
        else
        {
            message.channel.send('Please enter a valid position in the queue greater than 1')
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
    }
    else if(queue && message.member.voice.channel && client.voice.adapters.size > 0 && !args[0])
    {
        message.channel.send(`Please enter a valid position in the queue greater than 1`)
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
}

module.exports.config = 
{
  name: 'remove',
  aliases: []
}