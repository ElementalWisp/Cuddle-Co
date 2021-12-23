const {MessageEmbed} = require('discord.js')
const {color, prefix} = require('../../../config.json')

module.exports.run = async (client, message, args) =>
{
    const queue = await client.distube.getQueue(message);

    if(queue && message.member.voice.channel && client.voice.adapters.size > 0) 
    {
        const command = message.content.slice(prefix.length).trim().split(' ')
        const effect = command.shift().toLowerCase()

        const filter = await client.distube.setFilter(message, effect)
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Current queue filter: \`${filter.join(', ') || 'Off'}\``)
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
}

module.exports.config = 
{
  name: '3d',
  aliases: ['bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave']
}