const {prefix, color, helpmenuicon} = require('../../../config.json')
const {MessageEmbed} = require('discord.js')

module.exports.run = async (client, message, args) =>
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
    .setAuthor('Help Menu', `${helpmenuicon}`)
    //.setDescription('Some description here')
    //.setThumbnail('https://cdn.discordapp.com/attachments/328391017403252737/890151510422482974/doge.png')
    .addFields(
        { name: 'Media commands', value: '\`help\`, \`play`\, \`qplay\`, \`stop\`, \`skip\`, \`queue\`, \`volume\`, \`fastforward\`, \`rewind\`, \`seek\`, \`repeat\`, \`loop\`, \`shuffle\`, \`remove\`, \`clear\`'},
        { name: 'Aliases', value: `\`p, play\`, \`qp, qplay\`, \`skip, s\`, \`queue, q\`, \`volume, v\`, \`fastforward, ff\`, \n\`rewind, rw\`, \`shuffle, sh\`, \`reset, r\``},
        { name: 'Effect commands', value: '\`3d\`, \`bassboost`\, \`echo`\, \`karaoke`\, \`nightcore`\, \`vaporwave\`, \`reset\`'},
        { name: 'Other commands', value: `\`admin\``}, 
    )
    .setFooter(`Prefix is ${prefix}`)
    message.channel.send({ embeds: [Embed] })
}

module.exports.config = 
{
  name: 'help',
  aliases: []
}