const {MessageEmbed} = require('discord.js')
const {color} = require('../../../config.json')

module.exports.run = async (client, message, args) =>
{
    const queue = await client.distube.getQueue(message);

    if(queue && message.member.voice.channel && client.voice.adapters.size > 0 && args[0])
    {
        var p = args[0].split(':')
        for(let i = 0 ; i < p.length ; i++)
            var num = parseInt(p[i])
            if (isNaN(num) || num < 0)
            {
                const embed = new MessageEmbed()
                    .setColor(color)
                    .setDescription(`Time has to be in \`HH:MM:SS\` | \`MM:SS\` | \`SS\` format`)
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

        s = 0
        m = 1

        while (p.length > 0) 
        {
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }

        client.distube.seek(message, queue.currentTime + s)

        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Time set to \`${queue.formattedCurrentTime}\` for [${queue.songs[0].name}](${queue.songs[0].url})`)
        queue.textChannel.send({ embeds: [embed] })
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
        message.delete().catch(error =>
            {
                if(error.code !== 10008)
                {
                    console.error('Failed to delete the message:', error)
                }
            })
    }
    else if(queue && message.member.voice.channel && client.voice.adapters.size > 0 && !args[0])
    {
        const embed = new MessageEmbed()
        .setColor(color)
        .setDescription(`Time has to be in \`HH:MM:SS\` | \`MM:SS\` | \`SS\` format`)
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
  name: 'fastforward',
  aliases: ['ff']
}