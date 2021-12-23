const commandAutorole = require('../../schemas/command-autorole-schema')
const {color} = require('../../../config.json')
const {MessageEmbed, Permissions} = require('discord.js')

module.exports.run = async (client, message, args) =>
{
    if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && args[0])
    {
        let roles = []
        let roleslist = ''
        for(i = 0; i < args.length; i++)
        {
            const roleId = args[i].replace('<@&','').replace('>','')

            const role = await message.guild.roles.fetch(roleId).catch(error =>
                {
                    if(error.code !== 10011 && error.code !== 50028)
                    {
                        console.error('Failed to fetch the role:', error)
                    }
                })
            if(!role)
            {
                const embed = new MessageEmbed()
                    .setColor(color)
                    .setDescription(`Invalid role: ${args[i]}. Please try again`)
                return message.channel.send({ embeds: [embed] })
            }
            roleslist += args[i] + '\n'
            roles.push(role.id)
        }
        try
        {
            await commandAutorole.findOneAndUpdate
            ({
                _id: message.guildId
            },
            {
                _id: message.guildId,
                roles: roles
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
            .setDescription(`Successfully changed the Auto Roles list:\n\n ${roleslist}`)
        message.channel.send({ embeds: [embed] })
    }
    else if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && !args[0])
    {
        try
        {
            await commandAutorole.deleteOne({_id: message.guildId})
        }
        catch(e)
        {
            console.log(e)
        }

        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Removed autoroles for ${message.guild.name}`)
        message.channel.send({ embeds: [embed] })
    }
}

module.exports.config = 
{
  name: 'autorole',
  aliases: ['ar']
}