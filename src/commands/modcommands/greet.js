const welcomeSchema = require('../../schemas/command-welcome-schema')
const {color} = require('../../../config.json')
const {MessageEmbed, Permissions, MessageMentions: {CHANNELS_PATTERN}} = require('discord.js')

module.exports.run = async (client, message, args) =>
{
    if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && args[0] && args[1])
    {
        const channelId = args[0].replace('<#','').replace('>','')

        const channel = await message.guild.channels.fetch(channelId).catch(error =>
			{
				if(error.code !== 10003)
				{
					console.error('Failed to fetch the channel:', error)
				}
			})

        if(!channel)
        {
            const embed = new MessageEmbed()
                .setColor(color)
                .setDescription("Invalid channel")
            message.channel.send({ embeds: [embed] })
            return
        }

        var text = args.slice(1).toString()
        text = await text.replace(/,/g, ' ')

        if(text.length > 2000)
        {
            message.channel.send('Welcome message cannot be longer than Discord\'s limit of 2000 characters')
            return
        }

        try
        {
            await welcomeSchema.findOneAndUpdate
            ({
                _id: message.guildId
            },
            {
                _id: message.guildId,
                channelId: channelId,
                text: text
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
        
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription("Successfully changed the welcome message")

        message.channel.send({ embeds: [embed] })
    }
    else if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && !args[0])
    {
        try
        {
            await welcomeSchema.deleteOne({_id: message.guildId})
        }
        catch(e)
        {
            console.log(e)
        }

        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription("Removed welcome message")
        message.channel.send({ embeds: [embed] })
    }
    else if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && !args[1])
    {
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription("Please enter a welcome message")
        message.channel.send({ embeds: [embed] })
    }
}

module.exports.config = 
{
  name: 'greet',
  aliases: ['welcome']
}