const distubeQueues = require('../schemas/distube-queue-schema')
const {MessageEmbed} = require('discord.js')
const {color, partyfindericon} = require('../../config.json')

module.exports.checkDistubeQueue = async (distube) =>
{
    let distubeI = setInterval(async function()
    {
        if(distube.client.isReady())
        {
            clearInterval(distubeI)
            try
            {
                const results = await distubeQueues.find()
                
                for(const result of results)
                {
                    const {_id: guildId, channelId, voicechannelId, urls} = result
        
                    const guild = await distube.client.guilds.fetch(guildId).catch(error =>
                        {
                            if(error.code !== 50001)
                            {
                                console.error('Failed to fetch the guild:', error)
                            }
                        })
        
                    if(!guild)
                    {
                        continue
                    }
        
                    const voicechannel = await guild.channels.fetch(voicechannelId).catch(error =>
                    {
                        if(error.code !== 10003)
                        {
                            console.error('Failed to fetch the voice channel:', error)
                        }
                    })
        
                    const textchannel = await guild.channels.fetch(channelId).catch(error =>
                    {
                        if(error.code !== 10003)
                        {
                            console.error('Failed to fetch the text channel:', error)
                        }
                    })
        
                    if(!textchannel)
                    {
                        console.log(`Distube: Removing textchannel ID "${channelId}" from the database`)
                        try
                        {
                            await distubeQueues.deleteOne({channelId: channelId})
                        }
                        catch(e)
                        {
                            console.log(e)
                        }
                        continue
                    }
        
                    if(!voicechannel)
                    {
                        console.log(`Distube: Removing voicechannel ID "${voicechannelId}" from the database`)
                        try
                        {
                            await distubeQueues.deleteOne({voicechannelId: voicechannelId})
                        }
                        catch(e)
                        {
                            console.log(e)
                        }
                        continue
                    }
        
                    if(urls[0])
                    {
                        const embed = new MessageEmbed()
                            .setColor(color)
                            .setDescription('Recovering from restart, one second while I fetch your queue')
                        textchannel.send({ embeds: [embed] })
                        const playlist = await distube.handler.createCustomPlaylist(distube.client, urls, {name: "Recovery Queue"})
                        distube.playVoiceChannel(voicechannel, playlist, {name: "Recovery Queue", textChannel: textchannel})
                    }
                }
            }
            catch(e)
            {
                console.log(e)
            }
        }
    }, 1000)
}