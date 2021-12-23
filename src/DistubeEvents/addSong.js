const {MessageEmbed} = require('discord.js')
const {color} = require('../../config.json')
const distubeQueues = require('../schemas/distube-queue-schema')

module.exports = async (distube, queue, song) =>
{
    const position = queue.songs.length
    if(position > 1)
    {
        if(song.formattedDuration === "00:00")
        {
            const embed = new MessageEmbed()
                .setColor(color)
                .addField(`Track Queue - Position ${position}`, `[${song.name}](${song.url})`)
            queue.textChannel.send({ embeds: [embed] })
        }
        else
        {
            const embed = new MessageEmbed()
                .setColor(color)
                .addField(`Track Queue - Position ${position}`, `[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
            queue.textChannel.send({ embeds: [embed] })
        }
    }

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