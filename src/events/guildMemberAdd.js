const welcomeSchema = require('../schemas/command-welcome-schema')
const commandAutorole = require('../schemas/command-autorole-schema')

module.exports = async (client, member) =>
{
	if(!member.user.bot)
	{
        welcomeMessage: try
        {
            const result = await welcomeSchema.findOne({_id: member.guild.id})

            if(!result)
            {
                break welcomeMessage
            }

            const guild = await client.guilds.fetch(member.guild.id).catch(error =>
                {
                    if(error.code !== 50001)
                    {
                        console.error('Failed to fetch the guild:', error)
                    }
                })

            if(!guild)
            {
                console.log(`Removing guild ID "${member.guild.id}" from the database`)
                try
                {
                    await welcomeSchema.deleteOne({guildId: member.guild.id})
                }
                catch(e)
                {
                    console.log(e)
                }
                return
            }

            const {channelId, text} = result
    
            const channel = await member.guild.channels.fetch(channelId).catch(error =>
            {
                if(error.code !== 10003)
                {
                    console.error('Failed to fetch the channel:', error)
                }
            })

            if(!channel)
                break welcomeMessage

            var userExpression = /<user>/igm
            var guildExpression = /<server>/igm
            const welcomeMessage = await text.replace(userExpression, `<@${member.id}>`).replace(guildExpression, `${member.guild.name}`)

            channel.send(welcomeMessage)
        }
        catch(e)
        {
            console.log(e)
        }

        try
        {
            const result = await commandAutorole.findOne({_id: member.guild.id})

            if(!result)
            {
                return
            }

            const {roles} = result

            for(i = 0; i < roles.length; i++)
            {
                await member.roles.add(roles[i]).catch(error =>
                    {
                        if(error.code !== 10011 && error.code !== 50028 && error.code !== 50013 && error.code !== 50001)
                        {
                            console.error('Failed to add the role:', error)
                        }
                    })
            }
        }
        catch(e)
        {
            console.log(e)
        }
	}
}