module.exports.run = async (client, message, args) =>
{
    const queue = await client.distube.getQueue(message);

    if(queue && message.member.voice.channel && client.voice.adapters.size > 0) //If queue exists and user is in voice channel and bot is in voice channel
    {
        const mode = await client.distube.setRepeatMode(message)
        message.channel.send(`Set repeat mode to \`${mode ? mode === 2 ? 'All Queue' : 'This Song' : 'Off'}\``)
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
    else if (!queue && message.member.voice.channel && client.voice.adapters.size > 0) 
    {
        message.channel.send('Nothing in the queue to loop')
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
  name: 'loop',
  aliases: ['repeat']
}