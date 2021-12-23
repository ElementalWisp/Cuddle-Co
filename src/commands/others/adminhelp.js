const {prefix, color, helpmenuicon} = require('../../../config.json')
const {MessageEmbed, Permissions} = require('discord.js')

module.exports.run = async (client, message, args) =>
{
    if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
    {
        message.delete().catch(error =>
            {
                if(error.code !== 10008)
                {
                    console.error('Failed to delete the message:', error)
                }
            })

        const Embed = new MessageEmbed()
            .setColor(color)
            .setAuthor('Admin Help Menu', `${helpmenuicon}`)
            .addFields(
                { name: 'Welcome message', value: `${prefix}welcome <channel> <message>`, inline: true},
                { name: 'Example', value: `${prefix}greet #general Welcome <user> to <server>!`, inline: true},

                { name: '\u200B', value: '\u200B' },

                { name: 'Auto Deletion Disclaimer: ', value: 'Must be entered in CST timezone' },
                { name: 'Auto Deletion', value: `${prefix}autodelete <channel> <time> <AM/PM>`, inline: true},
                { name: 'Example', value: `${prefix}autodelete #general 4:30 PM`, inline: true},

                { name: 'Auto Deletion List', value: `${prefix}deletelist`},

                { name: '\u200B', value: '\u200B' },

                { name: 'Auto Roles', value: `${prefix}autorole [list of roles]`, inline: true},
                { name: 'Example', value: `${prefix}autorole @role1 @role2 @role3`, inline: true},
                { name: '\u200B', value: '\u200B' },

                { name: 'Aliases', value: `\`welcome, greet\`, \`autodelete, autod, ad\`, \`deletelist, dl\`, \`autorole, ar\``},    
            )
        message.channel.send({ embeds: [Embed] })
    }
}

module.exports.config = 
{
  name: 'admin',
  aliases: ['adminhelp', 'adminh']
}