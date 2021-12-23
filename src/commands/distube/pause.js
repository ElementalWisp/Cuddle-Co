const {MessageEmbed} = require('discord.js')
const {color} = require('../../../config.json')

module.exports.run = async (client, message, args) =>
{
    const queue = await client.distube.getQueue(message);

    if(queue && message.member.voice.channel && client.voice.adapters.size > 0 && !queue.paused) 
    {
        await client.distube.pause(message)
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Paused [${queue.songs[0].name}](${queue.songs[0].url})`)
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
    else if(queue && message.member.voice.channel && client.voice.adapters.size > 0 && queue.paused) 
    {
        await client.distube.resume(message)
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Paused [${queue.songs[0].name}](${queue.songs[0].url})`)
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
  name: 'pause',
  aliases: []
}