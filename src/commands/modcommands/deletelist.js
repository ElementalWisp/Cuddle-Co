const deleteSchema = require('../../schemas/command-autodelete-schema')
const {color} = require('../../../config.json')
const {MessageEmbed, Permissions} = require('discord.js')

module.exports.run = async (client, message, args) =>
{
    if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
    {
        var list = ''
        try
        {
            const guildId = message.guildId

            const results = await deleteSchema.find({guildId: guildId})
            for(const result of results)
            {
                const {channel, time} = result

                var timesplit = time.split(':')

                var AmOrPm = timesplit[0] >= 12 ? 'PM' : 'AM';
                var hours = (timesplit[0] % 12) || 12;
                var minutes = timesplit[1] ;
                var finalTime = hours + ":" + minutes + " " + AmOrPm + " " + "CST"; 

                list = list + channel + "           @           " + finalTime + '\n'
            }
        }
        catch(e)
        {
            console.log(e)
        }

        if(list !== '')
        {
            const embed = new MessageEmbed()
                .setColor(color)
                .setDescription(list)
            message.channel.send({ embeds: [embed] })
        }
        else
        {
            const embed = new MessageEmbed()
                .setColor(color)
                .setDescription(`${message.guild.name} does not have any channels set to auto delete`)
             message.channel.send({ embeds: [embed] }) 
        }
    }
}

module.exports.config = 
{
  name: 'deletelist',
  aliases: ['dl']
}