const {MessageEmbed} = require('discord.js')
const {color} = require('../../config.json')
const distubeQueues = require('../schemas/distube-queue-schema')

module.exports = async (distube, queue, playlist) =>
{
    const embed = new MessageEmbed()
        .setColor(color)
        .setDescription(`Added [${playlist.name}](${playlist.url}) (${playlist.songs.length} songs) to the queue`)
    queue.textChannel.send({ embeds: [embed] })

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