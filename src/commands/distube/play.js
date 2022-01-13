const {MessageEmbed} = require('discord.js')
const {color} = require('../../../config.json')

let mediaTypes = ['audio/mpeg', 'audio/mp3', 'audio/midi', 'video/mp4', 'audio/x-wav', 'video/webm', 'video/quicktime']

module.exports.run = async (client, message, args) =>
{
    if(message.member.voice.channel)
    {
        if(message.attachments.size > 0)
        {
            const attachment = await message.attachments.first()
            if(mediaTypes.includes(attachment.contentType))
            {
                await client.distube.voices.join(message.member.voice.channel)
                await client.distube.play(message, attachment.proxyURL)
                return
            }
            else
            {
                let contentType = await attachment.contentType
                if(contentType)
                {
                    const embed = new MessageEmbed()
                        .setColor(color)
                        .setDescription(`Unknown message type: ${contentType}`)
                    await message.channel.send({ embeds: [embed] })
                }
                else
                {
                    const embed = new MessageEmbed()
                        .setColor(color)
                        .setDescription(`Unknown message type`)
                    await message.channel.send({ embeds: [embed] })
                }
                return
            }
        }
        
        await client.distube.voices.join(message.member.voice.channel)
        client.distube.options.searchSongs = 6
        await client.distube.play(message, args.join(" "))
    }
    else if(!message.member.voice.channel)
    {
        message.channel.send('You must be in a voice channel to use this command')
    }
}

module.exports.config = 
{
  name: 'play',
  aliases: ['p']
}