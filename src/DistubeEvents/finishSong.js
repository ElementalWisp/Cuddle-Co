const distubeQueues = require('../schemas/distube-queue-schema')

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

    let songsurls = []

    for(i = 0; i < queue.songs.length; i++)
    {
        if(queue.songs[i] !== song)
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