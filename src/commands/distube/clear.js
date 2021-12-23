const {MessageEmbed} = require('discord.js')
const {color} = require('../../../config.json')
const distubeQueues = require('../../schemas/distube-queue-schema')

module.exports.run = async (client, message, args) =>
{
    const queue = await client.distube.getQueue(message);

    if(queue && message.member.voice.channel && client.voice.adapters.size > 0)
    {
        await queue.songs.splice(1)
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Cleared the queue`)

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
}

module.exports.config = 
{
  name: 'clear',
  aliases: []
}