module.exports.run = async (client, message, args) =>
{
    if(message.member.voice.channel)
    {
        await client.distube.voices.join(message.member.voice.channel)
        client.distube.options.searchSongs = 1
        await client.distube.play(message.member.voice.channel, args.join(" "), 
        {
            member: message.member,
            textChannel: message.channel,
            message
        })
    }
    else if(!message.member.voice.channel)
    {
        message.channel.send('You must be in a voice channel to use this command')
    }
}

module.exports.config = 
{
  name: 'qplay',
  aliases: ['qp']
}