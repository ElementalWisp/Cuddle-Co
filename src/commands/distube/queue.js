const {pagination} = require('reconlx')
const {MessageEmbed} = require('discord.js')
const config = require('../../../config.json')

module.exports.run = async (client, message, args) =>
{
    const queue = await client.distube.getQueue(message)

   if(queue && message.member.voice.channel && client.voice.adapters.size > 0)
    {
        let embedArray = []
        let k = 10
        for(let i = 0; i < queue.songs.length; i += 10)
        {
            const current = queue.songs.slice(i, k)
            let j = i
            k += 10
            const info = current.map(song => `**${++j}**. [${song.name}](${song.url})`).join('\n')
            const embed = new MessageEmbed()
                .setColor(config.color)
                .setDescription(`**[Current Song: ${queue.songs[0].name}](${queue.songs[0].url})**\n${info}`)
                embedArray.push(embed)
        }

        pagination
        ({
            embeds: embedArray,
            channel: message.channel,
            author: message.author,
            time: 20000,
            fastSkip: true,
        }).catch(console.error)

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
  name: 'queue',
  aliases: ['q']
}