const commandDeleteSchema = require('../schemas/command-autodelete-schema')
const {MessageEmbed, Permissions} = require('discord.js')
const {color, partyfindericon} = require('../../config.json')

module.exports.cleanChannelMessages = async (client) =>
{
    try
    {
        const results = await commandDeleteSchema.find()

        for(const result of results)
        {
            let intervals = []
            i = 0
            const {guildId, channelId, time, messageId} = result

            const guild = await client.guilds.cache.get(guildId)

            if(!guild)
            {
                console.log(`Removing guild ID "${guildId}" from the database`)
                try
                {
                    await commandDeleteSchema.deleteOne({guildId: guildId})
                }
                catch(e)
                {
                    console.log(e)
                }
                continue
            }

            const channel = await guild.channels.cache.get(channelId)

            if(!channel)
            {
                console.log(`Removing channel ID "${channelId}" from the database`)
                try
                {
                    await commandDeleteSchema.deleteOne({channelId: channelId})
                }
                catch(e)
                {
                    console.log(e)
                }
                continue   
            }
            
            intervals[i] = setInterval(async () =>
            {
                var perm = true
                var d = new Date()
                var today = d.toTimeString()
                var currentTime = today.split(' ')[0]
                currentTime = currentTime.slice(0, 5)
                
                var temp = time
                temp = temp.replace(/^0+/, '');
                currentTime = currentTime.replace(/^0+/, '');
                if(temp === currentTime)
                {
                    const channelPerms = await channel.permissionsFor(client.user)
    
                    if(!channelPerms.has(Permissions.FLAGS.MANAGE_MESSAGES))
                    {
                        const embed = new MessageEmbed()
                            .setColor(color)
                            .setDescription(`I do not have permission to delete messages in ${args[0]}`)
                        channel.send({ embeds: [embed] }).catch(error =>
                            {
                                if(error.code !== 50013)
                                {
                                    console.error('Missing Permissions', error)
                                }
                            })
                        perm = false
                    }
    
                    if(perm)
                    {
                        try
                        {
                            const result = await commandDeleteSchema.findOne({channelId: channelId})
                            if(!result)
                            {
                                clearInterval(intervals[i])
                                return
                            }
                        }
                        catch(e)
                        {
                            console.log(e)
                        }
        
                        let deleted
                        do
                        {   
                            const fetchedMessages = await channel.messages.fetch({limit: 100}).catch(error =>
                                {
                                    if(error.code !== 10008)
                                    {
                                        console.error('Failed to fetch the messages:', error)
                                    }
                                })
                            let messages = fetchedMessages.filter(msg => msg.id !== messageId)
        
                            deleted = await channel.bulkDelete(messages, true).catch(error =>
                                {
                                    if(error.code !== 10008)
                                    {
                                        console.error('Failed to delete the message:', error)
                                    }
                                })
                        }
                        while(deleted.size !== 0)
                    }
                }
            }, 60000)
        }
    }
    catch(e)
    {
        console.log(e)
    }
}