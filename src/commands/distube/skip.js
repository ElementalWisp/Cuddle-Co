const {MessageEmbed} = require('discord.js')
const {color} = require('../../../config.json')
const distubeQueues = require('../../schemas/distube-queue-schema')

module.exports.run = async (client, message, args) =>
{
    const queue = await client.distube.getQueue(message);

    if(queue && message.member.voice.channel && client.voice.adapters.size > 0 && queue.songs.length > 1) 
    {
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`<@${message.member.id}> skipped [${queue.songs[0].name}](${queue.songs[0].url})`)
        await message.channel.send({ embeds: [embed] })
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
        await client.distube.skip(message)
        message.delete().catch(error =>
            {
                if(error.code !== 10008)
                {
                    console.error('Failed to delete the message:', error)
                }
            })
    } 
    else if(queue && message.member.voice.channel && client.voice.adapters.size > 0 && queue.songs.length === 1) 
    {
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`<@${message.member.id}> skipped [${queue.songs[0].name}](${queue.songs[0].url})`)
        await message.channel.send({ embeds: [embed] })
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
        client.distube.options.leaveOnStop = false
        await client.distube.stop(message)
        client.distube.options.leaveOnStop = true
        message.delete().catch(error =>
            {
                if(error.code !== 10008)
                {
                    console.error('Failed to delete the message:', error)
                }
            })

        if(sent != 0)
        {
            const msg = await queue.textChannel.messages.fetch(sent.id).catch(error =>
                {
                    if(error.code !== 10008)
                    {
                        console.error('Failed to fetch the message:', error)
                    }
                })
    
            if(msg)
            {
                msg.delete().catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to delete the message:', error)
                        }
                    })
            }
        }

            let songsurls = []
            
            try
            {
                await distubeQueues.findOneAndUpdate
                ({
                    _id: queue.id
                },
                {
                    _id: queue.id,
                    channelId: "",
                    voicechannelId: "",
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
  name: 'skip',
  aliases: ['s']
}