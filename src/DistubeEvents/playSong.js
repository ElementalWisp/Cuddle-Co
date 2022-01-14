const {MessageEmbed} = require('discord.js')
const {color} = require('../../config.json')

global.sent = 0

module.exports = async (distube, queue, song) =>
{
    if(sent != 0)
    {
        const message = await queue.textChannel.messages.fetch(sent.id).catch(error =>
            {
                if(error.code !== 10008)
                {
                    console.error('Failed to fetch the message:', error)
                }
            })

        if(message)
        {
            message.delete().catch(error =>
                {
                    if(error.code !== 10008)
                    {
                        console.error('Failed to delete the message:', error)
                    }
                })
        }
    }

    if(song.formattedDuration === "00:00")
    {
        const embed = new MessageEmbed()
            .setColor(color)
            .addField('Now Playing', `[${song.name}](${song.url})`)
            .setFooter({text: `Requested by ${song.member.displayName}`})
        sent = await queue.textChannel.send({ embeds: [embed] }).catch(error =>
        {
            if(error.code !== 10008)
            {
                console.error('Failed to send the message:', error)
            }
        }) 
    }
    else
    {
        const embed = new MessageEmbed()
            .setColor(color)
            .addField('Now Playing', `[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
            .setFooter({text: `Requested by ${song.member.displayName}`})
        sent = await queue.textChannel.send({ embeds: [embed] }).catch(error =>
        {
            if(error.code !== 10008)
            {
                console.error('Failed to send the message:', error)
            }
        })
    }
}
