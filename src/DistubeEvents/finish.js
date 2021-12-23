const distubeQueues = require('../schemas/distube-queue-schema')

module.exports = async (distube, queue) => 
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