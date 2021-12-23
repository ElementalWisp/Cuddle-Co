const deleteSchema = require('../../schemas/command-autodelete-schema')
const {color} = require('../../../config.json')
const {MessageEmbed, Permissions} = require('discord.js')

module.exports.run = async (client, message, args) =>
{
    if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && args[0] && args[1] && args[2])
    {
        const channelId = args[0].replace('<#','').replace('>','')

        const channel = await message.guild.channels.fetch(channelId).catch(error =>
			{
				if(error.code !== 10003 && error.code !== 50035)
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

        try
        {
            const guildId = message.guildId

            const results = await deleteSchema.find({guildId: guildId})
            for(const result of results)
            {
                const {channelId: channeleyedee} = result
                if(channelId === channeleyedee)
                {
                    const embed = new MessageEmbed()
                        .setColor(color)
                        .setDescription(`${args[0]} is already on the auto deletion list`)
                    message.channel.send({ embeds: [embed] })
                    return
                }
            }
        }
        catch(e)
        {
            console.log(e)
        }

        const channelPerms = await channel.permissionsFor(client.user)

        if(!channelPerms.has(Permissions.FLAGS.MANAGE_MESSAGES))
        {
            const embed = new MessageEmbed()
                .setColor(color)
                .setDescription(`I do not have permission to delete messages in ${args[0]}`)
            message.channel.send({ embeds: [embed] })
            return 
        }
        else if(!channelPerms.has(Permissions.FLAGS.VIEW_CHANNEL))
        {
            const embed = new MessageEmbed()
                .setColor(color)
                .setDescription(`I do not have permission to view ${args[0]}`)
            message.channel.send({ embeds: [embed] })
            return   
        }
        else if(!channelPerms.has(Permissions.FLAGS.SEND_MESSAGES))
        {
            const embed = new MessageEmbed()
                .setColor(color)
                .setDescription(`I do not have permission to send messages in ${args[0]}`)
            message.channel.send({ embeds: [embed] })
            return   
        }

        var time = args[1].split(':')
		if(time.length < 2)
		{
			const embed = new MessageEmbed()
				.setColor(color)
				.setDescription(`\`${args[1]}\` is not the correct format, you must specify a time in format \`HH:MM\``)
			return message.channel.send({ embeds: [embed] })
		}

		if(args[2].length < 2)
		{
			const embed = new MessageEmbed()
                .setColor(color)
                .setDescription(`\`${args[2]}\` is not the correct format, you must add AM or PM after time`)
			return message.channel.send({ embeds: [embed] })	
		}

		else if(args[2] !== 'AM' && args[2] !== 'PM')
		{
			const embed = new MessageEmbed()
                .setColor(color)
                .setDescription(`\`${args[2]}\` is not the correct format, you must add AM or PM after time`)
			return message.channel.send({ embeds: [embed] })
		}

		for(let i = 0 ; i < time.length ; i++)
		{
			var num = parseInt(time[i])
			if (isNaN(num))
			{
				const embed = new MessageEmbed()
					.setColor(color)
					.setDescription(`\`${args[1]}\` is not the correct format, you must specify a time in format \`HH:MM\``)
				message.channel.send({ embeds: [embed] })
				return 
			}
			else if (i === 0 && (num > 12 || num < 0))
			{
				const embed = new MessageEmbed()
					.setColor(color)
					.setDescription(`\`${args[1]}\` is not the correct format, you must specify a time in format \`HH:MM\``)
				message.channel.send({ embeds: [embed] })
				return 
			}
			else if (i === 1 && (num > 59 || num < 0))
			{
				const embed = new MessageEmbed()
					.setColor(color)
					.setDescription(`\`${args[1]}\` is not the correct format, you must specify a time in format \`HH:MM\``)
				message.channel.send({ embeds: [embed] })
				return 
			}
		}



		var time12 = (args[1] + ' ' + args[2])
		var hours = Number(time12.match(/^(\d+)/)[1])
		var minutes = Number(time12.match(/:(\d+)/)[1])
		var AMPM = time12.match(/\s(.*)$/)[1]
		if(AMPM == "PM" && hours<12) hours = hours+12
		if(AMPM == "AM" && hours==12) hours = hours-12
		var sHours = hours.toString()
		var sMinutes = minutes.toString()
		if(hours<10) sHours = "0" + sHours
		if(minutes<10) sMinutes = "0" + sMinutes
		var newtime = sHours + ":" + sMinutes

        var fulldate = new Date('01/01/2000' + ' ' + newtime)
		var fulldate2 = fulldate.getTime()
		fulldate2 = fulldate2 / 1000
        
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Successfully added ${args[0]} to the auto deletion list`)
        message.channel.send({ embeds: [embed] })

        const Newembed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Messages will be deleted every day at <t:${fulldate2}:t>`)
        const savedMessage = await channel.send({ embeds: [Newembed] }) 
        
        try
        {
            const insert = new deleteSchema 
            ({
                guildId: message.guildId,
                channelId: channelId,
                channel: args[0],
                time: newtime,
                messageId: savedMessage.id,
                epoch: fulldate2
            })

            await insert.save().catch((e) =>
            {
                message.channel.send(`Failed to save to the database :( ${e}`)
                return
            })
            
        }
        catch(e)
        {
            console.log(e)
        }
        
        interval = setInterval(async () =>
        {
            var perm = true
            var d = new Date()
            var today = d.toTimeString()
            var currentTime = today.split(' ')[0]
            currentTime = currentTime.slice(0, 5)
            
            var temp = newtime
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
                    message.channel.send({ embeds: [embed] }).catch(error =>
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
                        const result = await deleteSchema.findOne({channelId: channelId})
                        if(!result)
                        {
                            clearInterval(interval)
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
                        let messages = fetchedMessages.filter(msg => msg.id !== savedMessage.id)
    
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
    else if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && !args[0])
    {
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription("You must specify a channel")
        message.channel.send({ embeds: [embed] })
    }
    else if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && args[0] && !args[1])
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

        try
        {
            const result = await deleteSchema.findOne({channelId: channelId})

            if(result)
            {
                const {messageId} = result

                const message = await channel.messages.fetch(messageId).catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to fetch the message:', error)
                        }
                    })
    
                if(message)
                {
                    await message.delete().catch(error =>
                        {
                            if(error.code !== 10008)
                            {
                                console.error('Failed to delete the message:', error)
                            }
                        })
                }
            }
        }
        catch(e)
        {
            console.log(e)
        }

        try
        {
            await deleteSchema.deleteOne({channelId: channelId})
        }
        catch(e)
        {
            console.log(e)
        }
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Removed ${args[0]} from auto deletion`)
        message.channel.send({ embeds: [embed] })
    }
    else if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && !args[2])
    {
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription("You must add AM or PM after time")
        message.channel.send({ embeds: [embed] })
    }
}

module.exports.config = 
{
  name: 'autodelete',
  aliases: ['ad', 'autod']
}